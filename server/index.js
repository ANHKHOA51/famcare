import express from 'express';
import cors from 'cors';
import multer from 'multer';
import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import pkg from '@prisma/client';
const { PrismaClient } = pkg;

import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';

dotenv.config();

// Bug #1: Enforce 32-byte encryption key. Pad or slice to ensure AES-256 compatibility.
const RAW_KEY = process.env.ENCRYPTION_KEY || 'aura_health_secret_key__2026_123';
const ENCRYPTION_KEY = Buffer.alloc(32);
Buffer.from(RAW_KEY).copy(ENCRYPTION_KEY); // fills exactly 32 bytes, safe for any key length
const IV_LENGTH = 16;

function encrypt(text) {
  if (!text) return text;
  try {
    const iv = crypto.randomBytes(IV_LENGTH);
    const cipher = crypto.createCipheriv('aes-256-cbc', ENCRYPTION_KEY, iv);
    let encrypted = cipher.update(text);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    return iv.toString('hex') + ':' + encrypted.toString('hex');
  } catch (err) {
    console.error('Encryption error:', err);
    return text;
  }
}

function decrypt(text) {
  if (!text) return text;
  if (!text.includes(':')) return text; // Not encrypted
  try {
    const textParts = text.split(':');
    const iv = Buffer.from(textParts.shift(), 'hex');
    const encryptedText = Buffer.from(textParts.join(':'), 'hex');
    const decipher = crypto.createDecipheriv('aes-256-cbc', ENCRYPTION_KEY, iv);
    let decrypted = decipher.update(encryptedText);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return decrypted.toString();
  } catch (err) {
    console.error('Decryption error:', err);
    return text;
  }
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let prisma;
try {
  prisma = new PrismaClient();
  console.log('✅ Database client initialized');
} catch (e) {
  console.warn('⚠️ Database unavailable - running in limited mode');
  console.warn('Prisma init detail:', e?.message || e);
}

const app = express();
const port = process.env.PORT || 3001;

// CORS: allow configured origins + Vercel preview domains + same-origin requests
const rawAllowedOrigins = process.env.ALLOWED_ORIGINS || '';
const allowedOrigins = rawAllowedOrigins
  ? rawAllowedOrigins.split(',').map(o => o.trim()).filter(Boolean)
  : [];

app.use(cors({
  origin: (origin, callback) => {
    // 1. Same-origin requests (no origin header) — always allow
    if (!origin) return callback(null, true);

    // 2. If ALLOWED_ORIGINS not configured → allow all and warn (dev/staging fallback)
    if (allowedOrigins.length === 0) {
      if (process.env.NODE_ENV === 'production') {
        console.warn('⚠️  CORS: ALLOWED_ORIGINS not set, allowing all origins in production!');
      }
      return callback(null, true);
    }

    // 3. Exact match against configured origins
    if (allowedOrigins.includes(origin)) return callback(null, true);

    // 4. Allow any *.vercel.app preview URL for the same project
    if (origin.endsWith('.vercel.app')) return callback(null, true);

    // 5. Allow localhost for local dev regardless of NODE_ENV
    if (origin.startsWith('http://localhost') || origin.startsWith('http://127.0.0.1')) {
      return callback(null, true);
    }

    callback(new Error(`CORS: origin ${origin} not allowed`));
  },
  credentials: true
}));
app.use(express.json());

const JWT_SECRET = process.env.JWT_SECRET || 'aura_health_secret_key_2026';

// --- Authentication Middleware ---
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.status(401).json({ error: 'Unauthorized' });

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: 'Forbidden' });
    req.user = user;
    next();
  });
};

// --- Auth Routes ---
  app.post('/api/auth/register', async (req, res) => {
  try {
    const { email, password, name } = req.body;

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: 'Email này đã được sử dụng' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    
    const user = await prisma.user.create({
      data: { 
        email, 
        password: hashedPassword, 
        name,
        ownedMembers: {
          create: { name: name || 'Bản thân', relationship: 'Bản thân' }
        }
      },
    });
    
    res.json({ message: 'User registered successfully', userId: user.id });
  } catch (error) {
    console.error('REGISTRATION ERROR:', error);
    res.status(400).json({ error: 'Đã có lỗi xảy ra hoặc dữ liệu không hợp lệ' });
  }
});

app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await prisma.user.findUnique({ where: { email } });
    
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }
    
    const token = jwt.sign({ userId: user.id, email: user.email }, JWT_SECRET, { expiresIn: '7d' });
    res.json({ token, user: { id: user.id, email: user.email, name: user.name } });
  } catch (error) {
    res.status(500).json({ error: 'Login error' });
  }
});

app.get('/api/auth/profile', authenticateToken, async (req, res) => {
  // Bug #2: Added try/catch + 404 guard to prevent crash on DB error or missing user
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.userId },
      include: { 
        ownedMembers: { include: { linkedUser: { select: { id: true, name: true, email: true } } } },
        linkedMembers: { include: { user: { select: { id: true, name: true, email: true } } } }
      }
    });
    
    if (!user) return res.status(404).json({ error: 'User not found' });
    
    delete user.password;
    if (user.height && user.weight) {
      user.bmi = parseFloat((user.weight / ((user.height / 100) * (user.height / 100))).toFixed(1));
    }
    
    res.json(user);
  } catch (error) {
    console.error('GET PROFILE ERROR:', error);
    res.status(500).json({ error: 'Failed to fetch profile' });
  }
});

app.post('/api/auth/change-password', authenticateToken, async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;
    
    // Find user to verify old password
    const user = await prisma.user.findUnique({ where: { id: req.user.userId } });
    if (!user || !(await bcrypt.compare(oldPassword, user.password))) {
      return res.status(401).json({ error: 'Mật khẩu cũ không đúng' });
    }

    // Hash and update new password
    const hashedNewPassword = await bcrypt.hash(newPassword, 10);
    await prisma.user.update({
      where: { id: req.user.userId },
      data: { password: hashedNewPassword }
    });

    res.json({ message: 'Đổi mật khẩu thành công' });
  } catch (error) {
    console.error('CHANGE PASSWORD ERROR:', error);
    res.status(500).json({ error: 'Lỗi khi đổi mật khẩu' });
  }
});

app.put('/api/auth/profile', authenticateToken, async (req, res) => {
  try {
    const { 
      name, phone, address, dob, gender,
      bloodType, allergies, chronicIllness, height, weight
    } = req.body;
    
    // Parse dob if provided
    let parsedDob = undefined;
    if (dob) {
      parsedDob = new Date(dob);
    }
    
    // Bug #5: Sanitize numeric fields — reject NaN to prevent Prisma crash
    const parsedHeight = height ? parseFloat(height) : null;
    const parsedWeight = weight ? parseFloat(weight) : null;
    if (parsedHeight !== null && isNaN(parsedHeight)) {
      return res.status(400).json({ error: 'Chiều cao không hợp lệ' });
    }
    if (parsedWeight !== null && isNaN(parsedWeight)) {
      return res.status(400).json({ error: 'Cân nặng không hợp lệ' });
    }

    const updatedUser = await prisma.user.update({
      where: { id: req.user.userId },
      data: {
        name, phone, address, dob: parsedDob, gender,
        bloodType, allergies, chronicIllness,
        height: parsedHeight,
        weight: parsedWeight
      }
    });
    
    delete updatedUser.password;
    if (updatedUser.height && updatedUser.weight) {
      updatedUser.bmi = parseFloat((updatedUser.weight / ((updatedUser.height / 100) * (updatedUser.height / 100))).toFixed(1));
    }
    res.json(updatedUser);
  } catch (error) {
    console.error('PROFILE UPDATE ERROR:', error);
    res.status(500).json({ error: 'Failed to update profile' });
  }
});

// --- Family Routes ---

// Search users by email or name to add as family member
app.get('/api/family/search', authenticateToken, async (req, res) => {
  try {
    const { q } = req.query;
    if (!q || q.length < 2) return res.json([]);
    
    const users = await prisma.user.findMany({
      where: {
        AND: [
          { id: { not: req.user.userId } }, // exclude self
          {
            OR: [
              { email: { contains: q, mode: 'insensitive' } },
              { name: { contains: q, mode: 'insensitive' } }
            ]
          }
        ]
      },
      select: { id: true, name: true, email: true },
      take: 5
    });
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Search error' });
  }
});

app.get('/api/family', authenticateToken, async (req, res) => {
  // Pass 3 Fix #1: added try/catch — previously would hang on DB error
  try {
    const ownedMembers = await prisma.familyMember.findMany({
      where: { userId: req.user.userId },
      include: { linkedUser: { select: { id: true, name: true, email: true } } }
    });

    const linkedMembers = await prisma.familyMember.findMany({
      where: { linkedUserId: req.user.userId },
      include: { user: { select: { id: true, name: true, email: true } } }
    });

    const formattedLinked = linkedMembers.map(m => ({
      id: m.id, 
      name: m.user.name || m.user.email,
      relationship: 'Chủ hộ',
      userId: m.userId,
      linkedUserId: m.linkedUserId,
      linkedUser: m.user,
      isLinked: true
    }));

    res.json([...ownedMembers, ...formattedLinked]);
  } catch (error) {
    console.error('GET FAMILY ERROR:', error);
    res.status(500).json({ error: 'Failed to fetch family members' });
  }
});

app.post('/api/family/add', authenticateToken, async (req, res) => {
  try {
    const { linkedUserId, relationship } = req.body;
    
    if (!linkedUserId) return res.status(400).json({ error: 'linkedUserId required' });

    // Check the target user exists
    const targetUser = await prisma.user.findUnique({ where: { id: linkedUserId } });
    if (!targetUser) return res.status(404).json({ error: 'User not found' });

    // Check not already in family
    const existing = await prisma.familyMember.findFirst({
      where: { userId: req.user.userId, linkedUserId }
    });
    if (existing) return res.status(409).json({ error: 'Already in your family' });

    const member = await prisma.familyMember.create({
      data: {
        name: targetUser.name || targetUser.email,
        relationship,
        userId: req.user.userId,
        linkedUserId
      },
      include: { linkedUser: { select: { id: true, name: true, email: true } } }
    });
    res.json(member);
  } catch (error) {
    console.error('ADD MEMBER ERROR:', error);
    res.status(400).json({ error: 'Error adding family member' });
  }
});

app.delete('/api/family/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    
    const member = await prisma.familyMember.findUnique({
      where: { id }
    });

    if (!member) {
      return res.status(404).json({ error: 'Family member not found' });
    }

    // Only owner of the family group or the linked user can delete/leave
    if (member.userId !== req.user.userId && member.linkedUserId !== req.user.userId) {
      return res.status(403).json({ error: 'You do not have permission to remove this member' });
    }

    // Also delete associated medications to avoid orphan records or handle cascade manually (schema doesn't have onDelete cascade)
    await prisma.medication.deleteMany({
      where: { familyMemberId: id }
    });

    await prisma.familyMember.delete({ where: { id } });
    res.json({ message: 'Family member removed successfully' });
  } catch (error) {
    console.error('DELETE MEMBER ERROR:', error);
    res.status(500).json({ error: 'Error removing family member' });
  }
});

// --- Cabinet Routes ---
app.post('/api/cabinet/save', authenticateToken, async (req, res) => {
  try {
    const { name, dosage, instructions, diagnosis, symptoms_treated, familyMemberId, prescriptionCode, hospitalName, isShared } = req.body;

    // Check if the user has permission to add to this family member
    const targetMember = await prisma.familyMember.findUnique({
      where: { id: familyMemberId }
    });

    if (!targetMember) {
      return res.status(404).json({ error: 'Family member not found' });
    }

    if (targetMember.userId !== req.user.userId && targetMember.linkedUserId !== req.user.userId) {
      // Allow if the user is linked to the owner of this targetMember
      const userLink = await prisma.familyMember.findFirst({
        where: { userId: targetMember.userId, linkedUserId: req.user.userId }
      });
      if (!userLink) {
        return res.status(403).json({ error: 'No permission to add medication for this member' });
      }
    }

    const medication = await prisma.medication.create({
      data: {
        name: encrypt(name),
        dosage, 
        instructions, 
        diagnosis: encrypt(diagnosis),
        symptoms_treated: Array.isArray(symptoms_treated) ? symptoms_treated.join(', ') : symptoms_treated,
        prescriptionCode,
        hospitalName,
        isShared: isShared !== undefined ? Boolean(isShared) : true,
        familyMemberId
      }
    });
    res.json(medication);
  } catch (error) {
    console.error('SAVE MEDICATION ERROR:', error);
    res.status(400).json({ error: 'Error saving to cabinet' });
  }
});

app.get('/api/cabinet', authenticateToken, async (req, res) => {
  // Pass 3 Fix #2: added try/catch — previously would hang on DB error
  try {
    const memberLinks = await prisma.familyMember.findMany({
      where: { linkedUserId: req.user.userId },
      select: { userId: true }
    });
    const ownerIds = memberLinks.map(link => link.userId);

    const medications = await prisma.medication.findMany({
      where: {
        familyMember: {
          OR: [
            { userId: req.user.userId },
            { linkedUserId: req.user.userId },
            { userId: { in: ownerIds } }
          ]
        }
      },
      include: {
        familyMember: {
          include: {
            user: { select: { id: true, name: true, email: true } },
            linkedUser: { select: { id: true, name: true, email: true } }
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    const formattedMedications = medications.reduce((acc, med) => {
      const isOwned = med.familyMember.userId === req.user.userId || med.familyMember.linkedUserId === req.user.userId;
      if (!isOwned && med.isShared === false) return acc;

      let displayName = med.familyMember.name;
      if (med.familyMember.userId !== req.user.userId && med.familyMember.linkedUserId === null) {
        displayName = med.familyMember.user?.name || med.familyMember.user?.email || 'Chủ gia đình';
      }

      acc.push({
        ...med,
        name: decrypt(med.name),
        diagnosis: decrypt(med.diagnosis),
        familyMember: { ...med.familyMember, name: displayName }
      });
      return acc;
    }, []);

    res.json(formattedMedications);
  } catch (error) {
    console.error('GET CABINET ERROR:', error);
    res.status(500).json({ error: 'Failed to fetch cabinet' });
  }
});

app.delete('/api/cabinet/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    
    // Check if medication exists and check permission
    const medication = await prisma.medication.findUnique({
      where: { id },
      include: { familyMember: true }
    });

    if (!medication) return res.status(404).json({ error: 'Medication not found' });

    // Only owner of the family or the linked user can delete
    if (medication.familyMember.userId !== req.user.userId && medication.familyMember.linkedUserId !== req.user.userId) {
      return res.status(403).json({ error: 'You do not have permission to delete this medication' });
    }

    await prisma.medication.delete({ where: { id } });
    res.json({ message: 'Medication deleted successfully' });
  } catch (error) {
    console.error('DELETE MEDICATION ERROR:', error);
    res.status(500).json({ error: 'Error deleting medication' });
  }
});

// --- AI & Scanner Routes ---
const upload = multer({ storage: multer.memoryStorage() });
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const OCR_SPACE_API_KEY = process.env.OCR_SPACE_API_KEY;
const GEMINI_MODEL_CANDIDATES = Array.from(new Set([
  process.env.GEMINI_MODEL_PRIMARY || 'gemini-3.1-flash-lite-preview',
  ...(process.env.GEMINI_MODEL_FALLBACKS || 'gemini-2.5-flash,gemini-3.1-pro')
    .split(',')
    .map(model => model.trim())
    .filter(Boolean)
]))
  .filter(Boolean);

const isRetryableGeminiError = (error) => {
  const status = error?.status ?? error?.response?.status;
  const message = `${error?.message || ''} ${error?.statusText || ''}`.toLowerCase();

  return (
    status === 429 ||
    status === 503 ||
    message.includes('service unavailable') ||
    message.includes('high demand') ||
    message.includes('overload') ||
    message.includes('quota') ||
    message.includes('temporarily unavailable')
  );
};

const isProviderTemporaryFailure = (error) => {
  const status = error?.status ?? error?.response?.status;
  const message = `${error?.message || ''}`.toLowerCase();
  return (
    status === 429 ||
    status === 503 ||
    message.includes('quota') ||
    message.includes('overload') ||
    message.includes('high demand') ||
    message.includes('service unavailable')
  );
};

const ocrSpaceExtractText = async (file) => {
  if (!OCR_SPACE_API_KEY || !file?.buffer) return '';

  const formData = new FormData();
  formData.append('apikey', OCR_SPACE_API_KEY);
  formData.append('language', 'eng');
  formData.append('OCREngine', '2');

  const blob = new Blob([file.buffer], { type: file.mimetype || 'image/jpeg' });
  formData.append('file', blob, file.originalname || 'prescription.jpg');

  const response = await fetch('https://api.ocr.space/parse/image', {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    throw new Error(`OCR.space request failed (${response.status})`);
  }

  const data = await response.json();
  const rawText = Array.isArray(data?.ParsedResults)
    ? data.ParsedResults.map(item => item?.ParsedText || '').join('\n')
    : '';

  return rawText.trim();
};

const buildFallbackScanJsonFromOcr = (ocrText) => {
  const lines = String(ocrText || '')
    .split(/\r?\n/)
    .map(line => line.trim())
    .filter(Boolean)
    .filter(line => /[a-zA-Z\u00C0-\u1EF9]/.test(line))
    .filter(line => line.length >= 3 && line.length <= 80)
    .slice(0, 5);

  const medications = lines.map((line) => ({
    name: line,
    dosage: 'Chưa rõ (OCR fallback)',
    instructions: 'Vui lòng kiểm tra và sửa lại thủ công',
    suggested_symptoms: [],
    confidence_score: 40,
  }));

  return {
    diagnosis: 'Chưa xác định (OCR fallback)',
    medications,
    nutrition: {
      general_dietary_advice: [
        'Kết quả OCR có thể thiếu chính xác, cần xác nhận lại với bác sĩ/dược sĩ.',
      ],
      recommended_foods: [],
      foods_to_avoid: [],
    },
    ocr_fallback: true,
  };
};

const extractJsonFromText = (text) => {
  const cleaned = String(text || '').replace(/```json|```/g, '').trim();
  if (!cleaned) return cleaned;

  const firstBrace = cleaned.indexOf('{');
  const lastBrace = cleaned.lastIndexOf('}');
  if (firstBrace >= 0 && lastBrace > firstBrace) {
    return cleaned.slice(firstBrace, lastBrace + 1);
  }

  const firstBracket = cleaned.indexOf('[');
  const lastBracket = cleaned.lastIndexOf(']');
  if (firstBracket >= 0 && lastBracket > firstBracket) {
    return cleaned.slice(firstBracket, lastBracket + 1);
  }

  return cleaned;
};

const parseJsonStrict = (text) => JSON.parse(extractJsonFromText(text));

const generateWithFallbackModels = async (contents, options = {}) => {
  const { task = 'generic' } = options;
  let lastError;

  for (const modelName of GEMINI_MODEL_CANDIDATES) {
    try {
      const model = genAI.getGenerativeModel({ model: modelName });
      const result = await model.generateContent(contents);
      console.info(`[AI][Gemini][${task}] success model=${modelName}`);
      return result;
    } catch (error) {
      lastError = error;
      console.warn(`[AI][Gemini][${task}] failed model=${modelName}:`, error?.status || error?.message || error);

      // Continue to next provider/model even on non-retryable Gemini errors (e.g. 404 model not found).
      continue;
    }
  }

  throw lastError;
};

app.post('/api/scan', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: 'No image file provided' });
    const base64Image = req.file.buffer.toString('base64');

    const prompt = `Analyze prescription image. 
    If the image is entirely blurry, unreadable, or clearly not a medical document, return ONLY this JSON: { "error": "BLURRY" }.
    Otherwise, extract diagnosis, prescription details and medications. 
    Return a confidence_score (integer 0-100) for each medication read, reflecting how certain you are about the medication name.
    Return ONLY JSON: { "diagnosis": "string", "prescription_code": "string or null", "hospital_name": "string or null", "medications": [{ "name": "string", "dosage": "string", "instructions": "string", "suggested_symptoms": ["string"], "confidence_score": 95 }] }. All text in natural Vietnamese.`;

    const result = await generateWithFallbackModels([prompt, { inlineData: { data: base64Image, mimeType: req.file.mimetype } }], { task: 'scan', strictJson: true });
    const response = await result.response;
    // Bug fix: parseJsonStrict is inside try — SyntaxError from bad Gemini JSON also hits catch and triggers OCR
    const jsonResponse = parseJsonStrict(response.text());
    res.json(jsonResponse);
  } catch (error) {
    console.error('SCAN ERROR:', error);

    // Bug fix 1: Try OCR on ANY type of Gemini failure, not just 429/503.
    // This covers: 500 internal error, 404 model not found, network timeout, SyntaxError from bad JSON, etc.
    if (OCR_SPACE_API_KEY && req.file) {
      try {
        const ocrText = await ocrSpaceExtractText(req.file);
        if (ocrText) {
          console.info('[AI][OCR][scan] success provider=ocr.space');
          return res.json(buildFallbackScanJsonFromOcr(ocrText));
        }
        // Bug fix 2: OCR ran but returned empty (unreadable image) — return explicit error instead of silently falling through
        console.warn('[AI][OCR][scan] returned empty text — image likely unreadable');
        return res.status(422).json({ error: 'Không thể đọc nội dung ảnh. Vui lòng chụp lại rõ hơn hoặc thử ảnh khác.' });
      } catch (ocrError) {
        console.warn('[AI][OCR][scan] failed provider=ocr.space:', ocrError?.message || ocrError);
        // OCR also failed — fall through to rate-limit check then generic error
      }
    }

    if (error?.status === 429 || error?.message?.toLowerCase().includes('quota') || error?.message?.toLowerCase().includes('overload')) {
      return res.status(429).json({ error: 'Hệ thống AI đang quá tải do nhu cầu cao. Vui lòng thử lại sau giây lát!' });
    }
    res.status(500).json({ error: 'Đã có lỗi xảy ra khi quét đơn thuốc' });
  }
});


const FOOD_DATABASE = [
  { id: 'pho-ga', name: 'Phở Gà', image: 'https://images.unsplash.com/photo-1503767835115-9ea6b58859ff', benefits: 'Giàu đạm, dễ tiêu hóa, phù hợp khi cơ thể mệt mỏi.' },
  { id: 'goi-cuon', name: 'Gỏi Cuốn Tôm Thịt', image: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe', benefits: 'Nhiều rau xanh, thanh mát, ít dầu mỡ.' },
  { id: 'chao-yen-mach', name: 'Cháo Yến Mạch', image: 'https://images.unsplash.com/photo-1501139083538-0139583c060f', benefits: 'Tốt cho tim mạch và tiêu hóa, cung cấp năng lượng bền bỉ.' },
  { id: 'ca-hoi-ap-chao', name: 'Cá Hồi Áp Chảo', image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288', benefits: 'Giàu Omega-3, hỗ trợ giảm viêm và bảo vệ tim mạch.' },
  { id: 'khoai-lang', name: 'Khoai Lang Luộc', image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d', benefits: 'Tinh bột chậm, tốt cho người tiểu đường và tiêu hóa.' },
  { id: 'sup-bi-do', name: 'Súp Bí Đỏ', image: 'https://images.unsplash.com/photo-1476718406336-bb5a9690ee2a', benefits: 'Giàu Vitamin A, hỗ trợ miễn dịch và mắt.' },
  { id: 'bong-cai-xanh', name: 'Bông Cải Xanh Luộc', image: 'https://images.unsplash.com/photo-1584270354949-c26b0d5b4a0c', benefits: 'Nhiều chất xơ và chất chống oxy hóa.' },
  { id: 'uc-ga-luoc', name: 'Ức Gà Luộc', image: 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d', benefits: 'Nguồn đạm sạch, ít chất béo xấu.' },
  { id: 'sua-chua-trai-cay', name: 'Sữa Chua Trái Cây', image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777', benefits: 'Cung cấp lợi khuẩn và vitamin từ hoa quả.' },
  { id: 'sup-ga-nam', name: 'Súp Gà Nấm', image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd', benefits: 'Ấm bụng, bổ dưỡng, hỗ trợ phục hồi sức khỏe.' },
  { id: 'salad-trai-cay', name: 'Salad Trái Cây', image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd', benefits: 'Vitamin tổng hợp tự nhiên, giúp đẹp da và tăng đề kháng.' },
  { id: 'ca-ro-kho-to', name: 'Cá Rô Kho Tộ', image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2', benefits: 'Nguồn đạm truyền thống, ít calorie.' },
  { id: 'trung-hap', name: 'Trứng Hấp Kiểu Nhật', image: 'https://images.unsplash.com/photo-1516684732162-798a0062be99', benefits: 'Mềm mịn, dễ nuốt, phù hợp cho người đau họng hoặc mệt.' }
];

app.post('/api/generate-meal-plan', authenticateToken, async (req, res) => {
  try {
    const { diagnosis, memberProfile } = req.body;
    
    let contextStr = '';
    if (memberProfile) {
      contextStr = `\n[Context - Hồ sơ sức khoẻ của người dùng (${memberProfile.name || 'Bản thân'})]\n`;
      if (memberProfile.allergies) contextStr += `- Dị ứng thực phẩm: ${memberProfile.allergies}\n`;
      if (memberProfile.chronicIllness) contextStr += `- Bệnh nền chuyên sâu: ${memberProfile.chronicIllness}\n`;
      if (memberProfile.height && memberProfile.weight) {
        const heightM = memberProfile.height > 3 ? memberProfile.height / 100 : memberProfile.height;
        const bmi = (memberProfile.weight / (heightM * heightM)).toFixed(1);
        contextStr += `- Chỉ số BMI: ${bmi} (Cân nặng: ${memberProfile.weight}kg, Chiều cao: ${memberProfile.height})\n`;
      }
      if (memberProfile.age) contextStr += `- Tuổi: ${memberProfile.age}\n`;
    }

    const prompt = `Bạn là chuyên gia dinh dưỡng xuất sắc. Hãy xây dựng thực đơn CHUYÊN BIỆT VÀ ĐẶC THÙ MỚI LẠ dành riêng cho người có tình trạng/bệnh lý: "${diagnosis}". ${contextStr}
    Đặc biệt lưu ý: Phân tích kỹ tình trạng bệnh và Thông tin Hồ sơ Sức khỏe (nếu có). 
    - Nếu có dị ứng: TUYỆT ĐỐI không dùng/đề xuất nguyên liệu gây dị ứng.
    - Nếu BMI phản ánh thừa cân/béo phì: Gợi ý thực đơn giảm calo, giảm tinh bột.
    - TUYỆT ĐỐI TÙY BIẾN CHO TỪNG BỆNH: Ví dụ đau dạ dày thì thức ăn phải mềm, không cay nóng; gout thì không thịt đỏ, hải sản... Hãy chứng minh năng lực y khoa của bạn qua cách chọn món. Đảm bảo bệnh khác nhau thì thực đơn CẦN KHÁC BIỆT HOÀN TOÀN.

    Tạo ra thực đơn 2 ngày. Mỗi ngày tạo ra từ 3 đến 4 món (gồm Bữa Sáng, Bữa Trưa có Mặn + Canh, Bữa Tối, Tráng miệng).
    Yêu cầu:
    1. Trả về ĐÚNG CẤU TRÚC JSON kèm số liệu macros, mảng alternative và general_dietary_advice: 
    { 
      "general_dietary_advice": ["Lời khuyên 1", "Lời khuyên 2"], 
      "meal_plan": [ 
        { 
          "day": "Ngày 1", 
          "meals": [ 
            { 
              "type": "Sáng", 
              "tags": ["món canh"], // CHỈ ĐƯỢC CHỨA 1 trong các loại này: "món mặn", "món canh", "tráng miệng", hoặc "ăn vặt" (để ứng dụng lọc được mặn, canh, tráng miệng)
              "name": "Tên món ăn cụ thể", 
              "reason": "Giải thích chi tiết tại sao món này tốt cho bệnh lý này?", 
              "macros": {"calories": 300, "protein": 15, "carbs": 40, "fat": 10, "sugar": 5}, 
              "ingredients": ["100g ức gà", "50g nấm", "1 muỗng dầu oliu"],
              "instructions": ["Bước 1: Rửa sạch nấm", "Bước 2: Áp chảo gà"],
              "alternatives": ["Tên món thay thế 1", "Tên món thay thế 2"] 
            } 
          ] 
        } 
      ] 
    }.
    2. Các món ăn tạo ra phải phong phú, đúng chuẩn dinh dưỡng, ghi rõ nguyên liệu và các bước làm.
    3. Trình bày bằng tiếng Việt tự nhiên.
    4. CHỈ TRẢ VỀ DUY NHẤT CHUỖI JSON, KHÔNG MARKDOWN, KHÔNG TEXT DƯ THỪA.`;

    const result = await generateWithFallbackModels(prompt, { task: 'meal-plan', strictJson: true });
    const rawText = result.response.text();
    const cleanJson = parseJsonStrict(rawText);
    
    // Pass raw AI data directly without hydrating from FOOD_DATABASE
    res.json({ 
      general_dietary_advice: cleanJson.general_dietary_advice || [],
      meal_plan: cleanJson.meal_plan || [] 
    });
  } catch (error) {
    console.error('MEAL PLAN ERROR:', error);
    if (error?.status === 429 || error?.message?.toLowerCase().includes('quota') || error?.message?.toLowerCase().includes('overload')) {
      return res.status(429).json({ error: 'Hệ thống AI tạo thực đơn đang quá tải. Vui lòng thử lại sau!' });
    }
    res.status(500).json({ error: 'Lỗi khi tạo thực đơn AI' });
  }
});

app.post('/api/cabinet/search', authenticateToken, async (req, res) => {
  try {
    const { symptom } = req.body;
    
    // Get owner IDs to access full family cabinet
    const memberLinks = await prisma.familyMember.findMany({
      where: { linkedUserId: req.user.userId },
      select: { userId: true }
    });
    const ownerIds = memberLinks.map(link => link.userId);

    const cabinet = await prisma.medication.findMany({
      where: {
        familyMember: {
          OR: [
            { userId: req.user.userId },
            { linkedUserId: req.user.userId },
            { userId: { in: ownerIds } }
          ]
        }
      },
      include: {
        familyMember: {
          include: {
            user: { select: { id: true, name: true, email: true } }
          }
        }
      }
    });

    const validCabinet = cabinet.reduce((acc, m) => {
      const isOwned = m.familyMember.userId === req.user.userId || m.familyMember.linkedUserId === req.user.userId;
      if (!isOwned && m.isShared === false) return acc;
      
      acc.push({
        ...m,
        name: decrypt(m.name),
        diagnosis: decrypt(m.diagnosis)
      });
      return acc;
    }, []);

    if (validCabinet.length === 0) return res.json({ message: 'Tủ thuốc của bạn đang trống.' });

    const cabinetList = validCabinet.map(m => {
      let ownerName = m.familyMember.name;
      if (m.familyMember.userId !== req.user.userId && m.familyMember.linkedUserId === null) {
        ownerName = m.familyMember.user?.name || m.familyMember.user?.email || 'Chủ gia đình';
      }
      return `- ${m.name}: Dùng cho ${m.symptoms_treated || m.diagnosis}. Liều lượng: ${m.dosage}. Người dùng: ${ownerName}`;
    }).join('\n');
    
    const prompt = `Based on this family medicine cabinet:\n${cabinetList}\n\nPatient symptom: "${symptom}". 
    Find the best medicine(s) to treat this symptom. Return ONLY JSON: { "top_match": { "name": "string", "reason": "string", "instructions": "string", "owner": "string" }, "alternatives": [{ "name": "string", "reason": "string" }], "warning": "string" }. If no match found, explain why. All text in natural Vietnamese.`;

    const result = await generateWithFallbackModels(prompt, { task: 'cabinet-search', strictJson: true });
    res.json(parseJsonStrict(result.response.text()));
  } catch (error) {
    console.error('AI SEARCH ERROR:', error);
    if (error?.status === 429 || error?.message?.toLowerCase().includes('quota') || error?.message?.toLowerCase().includes('overload')) {
      return res.status(429).json({ error: 'AI tìm kiếm của tủ thuốc đang quá tải. Vui lòng thử lại sau.' });
    }
    res.status(500).json({ error: 'Lỗi khi tìm kiếm với AI' });
  }
});

app.get('/api/foods', (req, res) => {
  res.json(FOOD_DATABASE);
});

export default app;

if (process.env.VERCEL !== '1') {
  app.listen(port, () => console.log(`Server running at http://localhost:${port}`));
}
