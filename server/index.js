import express from 'express';
import cors from 'cors';
import multer from 'multer';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { OpenAI } from 'openai';
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

const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
  throw new Error('JWT_SECRET is required');
}

// --- Authentication Middleware ---
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.status(401).json({ error: 'Unauthorized', code: 'no_token' });

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      console.error('JWT verify failed:', err.name, err.message);
      if (err.name === 'TokenExpiredError') {
        return res.status(401).json({ error: 'Token expired', code: 'token_expired' });
      }
      return res.status(403).json({ error: 'Forbidden', code: 'token_invalid' });
    }
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
        ownedMembers: { 
          include: { 
            linkedUser: { 
              select: { id: true, name: true, email: true, dob: true, allergies: true, chronicIllness: true } 
            } 
          } 
        },
        linkedMembers: { 
          include: { 
            user: { 
              select: { id: true, name: true, email: true, dob: true, allergies: true, chronicIllness: true } 
            } 
          } 
        }
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
    // 1. Identify all "Heads" (users who have linked the current user)
    const memberLinks = await prisma.familyMember.findMany({
      where: { linkedUserId: req.user.userId },
      select: { userId: true }
    });
    const headIds = memberLinks.map(link => link.userId);

    // 2. Identify all people linked to those Heads (Siblings)
    const siblingLinks = await prisma.familyMember.findMany({
      where: { userId: { in: headIds }, linkedUserId: { not: null } },
      select: { linkedUserId: true }
    });
    const siblingUserIds = siblingLinks.map(link => link.linkedUserId);

    // 3. Identify all people the current user has linked (Children/Members)
    const myLinkedMembers = await prisma.familyMember.findMany({
      where: { userId: req.user.userId, linkedUserId: { not: null } },
      select: { linkedUserId: true }
    });
    const myLinkedUserIds = myLinkedMembers.map(link => link.linkedUserId);

    // 4. Consolidated Family Cluster
    const familyClusterUserIds = [...new Set([
      req.user.userId,
      ...headIds,
      ...siblingUserIds,
      ...myLinkedUserIds
    ])];

    const medications = await prisma.medication.findMany({
      where: {
        familyMember: {
          userId: { in: familyClusterUserIds }
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
const groq = new OpenAI({
  apiKey: process.env.GROQ_API_KEY,
  baseURL: 'https://api.groq.com/openai/v1',
});

const OCR_SPACE_API_KEY = process.env.OCR_SPACE_API_KEY;

const GEMINI_MODEL_CANDIDATES = [
  process.env.GEMINI_MODEL_PRIMARY || 'gemini-3.1-flash-lite-preview'
].filter(Boolean);

const GROQ_MODEL_CANDIDATES = [
  'llama-3.3-70b-versatile',      // Good for reasoning
  'llama-3.1-8b-instant'          // High limits
];

// ── PERF: In-memory TTL cache for AI responses ──────────────────────────────
// Avoid re-calling AI for identical (diagnosis + filters) within 10 minutes.
// Bounded to 100 entries to prevent memory growth on serverless instances.
const aiCache = new Map();
const AI_CACHE_TTL_MS = 10 * 60 * 1000;
const AI_CACHE_MAX = 100;

const getCached = (key) => {
  const entry = aiCache.get(key);
  if (!entry) return null;
  if (Date.now() - entry.t > AI_CACHE_TTL_MS) {
    aiCache.delete(key);
    return null;
  }
  // LRU touch
  aiCache.delete(key);
  aiCache.set(key, entry);
  return entry.v;
};

const setCached = (key, value) => {
  if (aiCache.size >= AI_CACHE_MAX) {
    // Evict oldest
    const firstKey = aiCache.keys().next().value;
    if (firstKey) aiCache.delete(firstKey);
  }
  aiCache.set(key, { v: value, t: Date.now() });
};

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
  formData.append('language', 'vie'); // Đổi sang tiếng Việt để đọc đơn thuốc chuẩn xác
  formData.append('OCREngine', '1'); // Engine 1 is required for Asian languages

  // Use base64Image directly to avoid Node.js Blob/File FormData serialization issues
  const base64Data = `data:${file.mimetype || 'image/jpeg'};base64,${file.buffer.toString('base64')}`;
  formData.append('base64Image', base64Data);

  const response = await fetch('https://api.ocr.space/parse/image', {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    throw new Error(`OCR.space request failed (${response.status})`);
  }

  const data = await response.json();
  
  if (data.IsErroredOnProcessing) {
    console.error('OCR.space API Processing Error:', data.ErrorMessage);
    throw new Error(`OCR.space API Error: ${data.ErrorMessage}`);
  }

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
  const { task = 'generic', strictJson = false } = options;
  let lastError;

  // Step 1: Try Gemini models
  for (const modelName of GEMINI_MODEL_CANDIDATES) {
    try {
      // PERF: Force native JSON output for faster + safer parsing (no markdown wrapper).
      const generationConfig = strictJson
        ? { responseMimeType: 'application/json', temperature: 0.7 }
        : { temperature: 0.7 };
      const model = genAI.getGenerativeModel({ model: modelName, generationConfig });
      const result = await model.generateContent(contents);
      console.info(`[AI][Gemini][${task}] success model=${modelName}`);
      return {
        text: () => result.response.text(),
        provider: 'gemini',
        model: modelName
      };
    } catch (error) {
      lastError = error;
      const errorMsg = error?.message || '';
      console.warn(`[AI][Gemini][${task}] failed model=${modelName}:`, error?.status || errorMsg);

      // If intentional error (safety, etc), don't retry same provider but maybe move to fallback
      if (errorMsg.includes('safety') || errorMsg.includes('blocked')) {
        break;
      }
      continue;
    }
  }

  // Step 2: Try Groq as fallback
  if (process.env.GROQ_API_KEY) {
    console.info(`[AI][Fallback][${task}] Trying Groq...`);

    // Prepare prompt and data for OpenAI format
    let messages = [];
    let textPrompt = '';
    let imageBase64 = null;
    let imageMime = '';

    if (Array.isArray(contents)) {
      contents.forEach(part => {
        if (typeof part === 'string') textPrompt += part;
        if (part.inlineData) {
          imageBase64 = part.inlineData.data;
          imageMime = part.inlineData.mimeType;
        }
      });
    } else {
      textPrompt = contents;
    }

    if (imageBase64) {
      messages.push({
        role: 'user',
        content: [
          { type: 'text', text: textPrompt },
          { type: 'image_url', image_url: { url: `data:${imageMime};base64,${imageBase64}` } }
        ]
      });
    } else {
      messages.push({ role: 'user', content: textPrompt });
    }

    // Target specific models for specific tasks:
    // Meal Plan: Prioritize 8B-Instant for speed on Vercel, then fallback to 70B.
    // Generic tasks: 8B is fine
    const groqModelsToTry = (task === 'meal-plan')
      ? ['llama-3.1-8b-instant', 'llama-3.3-70b-versatile']
      : ['llama-3.1-8b-instant'];

    if (imageBase64) {
      // Groq text models cannot process images directly in this tier.
      // Throw an error to bubble up to the route's OCR + Groq text parsing fallback.
      throw new Error(`Groq text models do not support vision. Falling back to OCR.`);
    }

    for (const groqModel of groqModelsToTry) {
      try {
        const completion = await groq.chat.completions.create({
          model: groqModel,
          messages: messages,
          response_format: strictJson ? { type: 'json_object' } : undefined,
        });

        console.info(`[AI][Groq][${task}] success model=${groqModel}`);
        return {
          text: () => completion.choices[0].message.content,
          provider: 'groq',
          model: groqModel
        };
      } catch (groqError) {
        lastError = groqError;
        console.warn(`[AI][Groq][${task}] failed model=${groqModel}:`, groqError?.message || groqError);
      }
    }
  }

  throw lastError;
};

app.post('/api/scan', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: 'No image file provided' });
    const base64Image = req.file.buffer.toString('base64');

    // PERF: cache identical images (same buffer) for 10 min — same scan = instant.
    const imageHash = crypto.createHash('sha256').update(req.file.buffer).digest('hex');
    const cacheKey = `scan:${imageHash}`;
    const cached = getCached(cacheKey);
    if (cached) {
      console.info('[AI][scan] cache HIT');
      return res.json(cached);
    }

    // PERF: prompt rút gọn ~40% — vẫn giữ đầy đủ schema và rule.
    const prompt = `Phân tích ảnh đơn thuốc (tiếng Việt).
Nếu ảnh quá mờ, không đọc được, hoặc KHÔNG phải đơn thuốc/nhãn thuốc/tài liệu y tế, trả về DUY NHẤT: {"error":"Ảnh không phải là đơn thuốc, nhãn thuốc hoặc đã quá mờ. Vui lòng chụp lại."}

Nếu hợp lệ, trích xuất chẩn đoán + thuốc + tương tác nguy hiểm. Mỗi thuốc có confidence_score (0-100); nếu <80, BẮT BUỘC có suggested_alternatives 1-3 thuốc tương tự phù hợp chẩn đoán.

Trả về DUY NHẤT JSON:
{"diagnosis":"string","prescription_code":"string|null","hospital_name":"string|null","medications":[{"name":"string","dosage":"string","instructions":"string","suggested_symptoms":["string"],"confidence_score":95,"suggested_alternatives":["string"]}],"ai_interactions":[{"meds":["a","b"],"severity":"Cao/Trung bình/Thấp","reason":"string"}]}`;

    const result = await generateWithFallbackModels([prompt, { inlineData: { data: base64Image, mimeType: req.file.mimetype } }], { task: 'scan', strictJson: true });

    // Bug fix: parseJsonStrict is inside try — SyntaxError from bad AI JSON also hits catch and triggers OCR
    const jsonResponse = parseJsonStrict(result.text());
    if (jsonResponse.error) {
      return res.status(400).json({ error: jsonResponse.error === 'BLURRY' ? 'Ảnh quá mờ hoặc không phải là đơn thuốc y tế. Vui lòng thử lại.' : jsonResponse.error });
    }
    setCached(cacheKey, jsonResponse);
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

          if (process.env.GROQ_API_KEY) {
            console.info('[AI][Fallback][scan] Parsing OCR text with Groq...');

            // Optimization for Vercel speed: Skip 70b and use Instant model directly for OCR cleanup
            const groqOcrModels = ['llama-3.1-8b-instant'];

            for (const gModel of groqOcrModels) {
              try {
                const groqPrompt = `Đây là văn bản được quét (OCR) từ một đơn thuốc hoặc nhãn thuốc y tế bằng tiếng Việt. Có thể có lỗi nhận diện chính tả. Bạn là một dược sĩ thông minh, hãy đọc hiểu và sửa lỗi từ ngữ.
                  Trích xuất các thông tin sau và trả về DUY NHẤT một JSON hợp lệ:
                  {
                    "diagnosis": "Chẩn đoán bệnh (nếu có, không thì để 'Không rõ')",
                    "prescription_code": "Mã đơn thuốc (nếu có)",
                    "hospital_name": "Tên bệnh viện/phòng khám (nếu có)",
                    "medications": [
                      {
                        "name": "Tên thuốc chính xác",
                        "dosage": "Liều lượng và cách dùng",
                        "instructions": "Hướng dẫn sử dụng",
                        "suggested_symptoms": ["Triệu chứng thuốc này điều trị"],
                        "confidence_score": 90,
                        "suggested_alternatives": ["Thuốc A", "Thuốc B"]
                      }
                    ],
                    "ai_interactions": [
                      {
                        "meds": ["Tên thuốc 1", "Tên thuốc 2"],
                        "severity": "Cao/Trung bình/Thấp",
                        "reason": "Lý do kỵ nhau"
                      }
                    ]
                  }
                  
                  Văn bản OCR:\n"""\n${ocrText}\n"""`;

                const completion = await groq.chat.completions.create({
                  model: gModel,
                  messages: [{ role: 'user', content: groqPrompt }],
                  response_format: { type: 'json_object' }
                });

                console.info(`[AI][Fallback][scan] Groq parsing success model=${gModel}`);
                return res.json(parseJsonStrict(completion.choices[0].message.content));
              } catch (groqOcrErr) {
                console.warn(`[AI][Fallback][scan] Groq parsing failed model=${gModel}:`, groqOcrErr?.message);
              }
            }

            console.warn('[AI][Fallback][scan] All Groq models failed, falling back to dumb mapping');
          }

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
    const { diagnosis, memberProfile, budget, isElderly, isVegetarian } = req.body;

    if (!diagnosis || typeof diagnosis !== 'string' || !diagnosis.trim()) {
      return res.status(400).json({ error: 'Vui lòng nhập tình trạng/bệnh lý cần tư vấn dinh dưỡng.' });
    }

    // PERF: Cache key — same input within 10 min returns instantly (no AI call).
    const allergies = memberProfile?.allergies || '';
    const chronic = memberProfile?.chronicIllness || '';
    const cacheKey = `meal:${diagnosis.trim().toLowerCase()}|${budget}|${isElderly?1:0}|${isVegetarian?1:0}|${allergies}|${chronic}`;
    const cached = getCached(cacheKey);
    if (cached) {
      console.info('[AI][meal-plan] cache HIT');
      return res.json(cached);
    }

    let contextStr = '';
    if (memberProfile) {
      contextStr = `\n[Hồ sơ: ${memberProfile.name || 'Bản thân'}]`;
      if (allergies) contextStr += ` Dị ứng: ${allergies}.`;
      if (chronic) contextStr += ` Bệnh nền: ${chronic}.`;
      if (memberProfile.height && memberProfile.weight) {
        const heightM = memberProfile.height > 3 ? memberProfile.height / 100 : memberProfile.height;
        const bmi = (memberProfile.weight / (heightM * heightM)).toFixed(1);
        contextStr += ` BMI: ${bmi}.`;
      }
      if (memberProfile.age) contextStr += ` Tuổi: ${memberProfile.age}.`;
    }

    // Compact constraints
    const constraints = [];
    if (isElderly) constraints.push('NGƯỜI CAO TUỔI (món mềm, dễ nhai, ít gia vị)');
    if (isVegetarian) constraints.push('ĂN CHAY (không thịt/cá/hải sản)');
    if (budget === 'tiet-kiem') constraints.push('Ngân sách TIẾT KIỆM (nguyên liệu bình dân)');
    if (budget === 'cao-cap') constraints.push('Ngân sách CAO CẤP (nguyên liệu bổ dưỡng)');
    const personalConstraints = constraints.length ? `Ràng buộc: ${constraints.join('; ')}.` : '';

    // PERF: Prompt rút gọn ~60% tokens, vẫn giữ logic validate đầu vào và cấu trúc JSON.
    // Giảm 2 ngày → 1 ngày 4 món (UI chỉ hiển thị "gợi ý hôm nay") → AI nhanh ~2x.
    const prompt = `Bạn là chuyên gia dinh dưỡng. Kiểm tra "${diagnosis}" có phải tình trạng/bệnh lý hợp lệ không. Nếu vô nghĩa/không liên quan sức khoẻ, trả về DUY NHẤT: {"error":"Vui lòng nhập một tình trạng sức khỏe hoặc bệnh lý hợp lệ để AI có thể tư vấn."}.

Nếu hợp lệ, xây thực đơn 1 NGÀY gồm 4 món (Sáng, Trưa-Mặn, Trưa-Canh, Tối) CHUYÊN BIỆT cho "${diagnosis}".${contextStr} ${personalConstraints}
Quy tắc: tránh nguyên liệu dị ứng tuyệt đối; nếu BMI cao thì giảm calo; tuỳ biến đúng bệnh (vd dạ dày: mềm, không cay; gout: không thịt đỏ/hải sản).

Trả về DUY NHẤT JSON đúng cấu trúc:
{"general_dietary_advice":["lời khuyên 1","lời khuyên 2","lời khuyên 3"],"meal_plan":[{"day":"Hôm nay","meals":[{"type":"Sáng","tags":["món mặn"],"name":"Tên món","reason":"Vì sao tốt cho bệnh","macros":{"calories":300,"protein":15,"carbs":40,"fat":10,"sugar":5},"ingredients":["100g X","50g Y"],"instructions":["Bước 1...","Bước 2..."],"alternatives":["Món thay thế"]}]}]}

tags CHỈ chứa 1 trong: "món mặn","món canh","tráng miệng","ăn vặt". Tiếng Việt tự nhiên. KHÔNG markdown.`;

    const result = await generateWithFallbackModels(prompt, { task: 'meal-plan', strictJson: true });
    const rawText = result.text();
    const cleanJson = parseJsonStrict(rawText);

    if (cleanJson.error) {
      return res.status(400).json({ error: cleanJson.error });
    }

    const payload = {
      general_dietary_advice: cleanJson.general_dietary_advice || [],
      meal_plan: cleanJson.meal_plan || []
    };
    setCached(cacheKey, payload);
    res.json(payload);
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
    res.json(parseJsonStrict(result.text()));
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

// --- Article View Routes ---
app.post('/api/articles/:slug/view', async (req, res) => {
  try {
    const { slug } = req.params;
    const article = await prisma.article.upsert({
      where: { slug },
      update: { views: { increment: 1 } },
      create: { id: slug, slug, views: 1 },
    });
    res.json(article);
  } catch (error) {
    console.error('ARTICLE VIEW ERROR:', error);
    res.status(500).json({ error: 'Failed to update article view' });
  }
});

app.get('/api/articles/views', async (req, res) => {
  try {
    const articles = await prisma.article.findMany();
    const viewMap = articles.reduce((acc, art) => {
      acc[art.slug] = art.views;
      return acc;
    }, {});
    res.json(viewMap);
  } catch (error) {
    console.error('GET ARTICLE VIEWS ERROR:', error);
    res.status(500).json({ error: 'Failed to fetch article views' });
  }
});

export default app;

if (process.env.VERCEL !== '1') {
  app.listen(port, () => console.log(`Server running at http://localhost:${port}`));
}
