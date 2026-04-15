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

const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY || 'aura_health_secret_key__2026_123'; // 32 bytes
const IV_LENGTH = 16;

function encrypt(text) {
  if (!text) return text;
  try {
    const iv = crypto.randomBytes(IV_LENGTH);
    const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(ENCRYPTION_KEY), iv);
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
    const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(ENCRYPTION_KEY), iv);
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

app.use(cors());
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
  const user = await prisma.user.findUnique({
    where: { id: req.user.userId },
    include: { 
      ownedMembers: { include: { linkedUser: { select: { id: true, name: true, email: true } } } },
      linkedMembers: { include: { user: { select: { id: true, name: true, email: true } } } }
    }
  });
  
  if (user) {
    delete user.password; // Don't send password hash
  }
  
  res.json(user);
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
    
    const updatedUser = await prisma.user.update({
      where: { id: req.user.userId },
      data: {
        name, phone, address, dob: parsedDob, gender,
        bloodType, allergies, chronicIllness, height: height ? parseFloat(height) : null, weight: weight ? parseFloat(weight) : null
      }
    });
    
    delete updatedUser.password;
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
  // Return members owned by user + members in other families where this user is linked
  const ownedMembers = await prisma.familyMember.findMany({
    where: { userId: req.user.userId },
    include: { linkedUser: { select: { id: true, name: true, email: true } } }
  });

  const linkedMembers = await prisma.familyMember.findMany({
    where: { linkedUserId: req.user.userId },
    include: { user: { select: { id: true, name: true, email: true } } }
  });

  // Format linkedMembers to be consumable by the frontend dropdowns
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
  // Find ownerIds of families I am linked to
  const memberLinks = await prisma.familyMember.findMany({
    where: { linkedUserId: req.user.userId },
    select: { userId: true }
  });
  const ownerIds = memberLinks.map(link => link.userId);

  // Medications from families I own + medications from families I'm linked to + medications of my owners
  const medications = await prisma.medication.findMany({
    where: {
      familyMember: {
        OR: [
          { userId: req.user.userId },          // families I own
          { linkedUserId: req.user.userId },    // families I'm linked to as a member
          { userId: { in: ownerIds } }          // families of people who linked me
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

  // Adjust display name for linked users seeing the owner's "Bản thân"
  // Filter out private meds and decrypt
  const formattedMedications = medications.reduce((acc, med) => {
    // A medication is "owned" by the user if it belongs to a family member they own, or if they are the linked user.
    // If not owned, it must be isShared === true
    const isOwned = med.familyMember.userId === req.user.userId || med.familyMember.linkedUserId === req.user.userId;
    
    if (!isOwned && med.isShared === false) {
      return acc;
    }

    let displayName = med.familyMember.name;
    if (med.familyMember.userId !== req.user.userId && med.familyMember.linkedUserId === null) {
      displayName = med.familyMember.user?.name || med.familyMember.user?.email || 'Chủ gia đình';
    }

    acc.push({
      ...med,
      name: decrypt(med.name),
      diagnosis: decrypt(med.diagnosis),
      familyMember: {
        ...med.familyMember,
        name: displayName
      }
    });
    
    return acc;
  }, []);

  res.json(formattedMedications);
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

app.post('/api/scan', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: 'No image file provided' });
    const model = genAI.getGenerativeModel({ model: 'gemini-3.1-flash-lite-preview' });
    const base64Image = req.file.buffer.toString('base64');

    const prompt = `Analyze prescription image. Extract diagnosis, medications, and nutrition advice. Return ONLY JSON: { "diagnosis": "string", "medications": [{ "name": "string", "dosage": "string", "instructions": "string", "suggested_symptoms": ["string"] }], "nutrition": { "recommended_foods": ["string"], "foods_to_avoid": ["string"] } }. All text in natural Vietnamese.`;

    const result = await model.generateContent([prompt, { inlineData: { data: base64Image, mimeType: req.file.mimetype } }]);
    const response = await result.response;
    const jsonResponse = JSON.parse(response.text().replace(/```json|```/g, '').trim());
    res.json(jsonResponse);
  } catch (error) {
    res.status(500).json({ error: 'Error scanning prescription' });
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

app.post('/api/generate-meal-plan', async (req, res) => {
  try {
    const { diagnosis } = req.body;
    const model = genAI.getGenerativeModel({ model: 'gemini-3.1-flash-lite-preview' });
    
    const dbList = FOOD_DATABASE.map(f => `- ID: "${f.id}", Tên: "${f.name}", Lợi ích: "${f.benefits}"`).join('\n');
    const prompt = `Bạn là chuyên gia dinh dưỡng. Dựa trên danh sách món ăn sau:
    ${dbList}
    
    Hãy xây dựng thực đơn 3 ngày cho người bệnh: "${diagnosis}". 
    Mỗi ngày chọn đúng 2 món (Sáng và Trưa/Tối) từ danh sách trên.
    Yêu cầu:
    1. Trả về đúng định dạng JSON: { "meal_plan": [ { "day": "Ngày 1", "meals": [ { "type": "Sáng", "food_id": "MÃ_ID_TRONG_DANH_SÁCH", "reason": "Tại sao món này tốt cho bệnh lý này?" } ] } ] }.
    2. "food_id" PHẢI khớp chính xác 100% với mã ID được cung cấp.
    3. Phần "reason" viết tự nhiên, thuyết phục.
    4. KHÔNG TRẢ VỀ BẤT KỲ VĂN BẢN NÀO NGOÀI JSON.`;

    const result = await model.generateContent(prompt);
    const rawText = result.response.text();
    const cleanJson = JSON.parse(rawText.replace(/```json|```/g, '').trim());
    
    // Inject full food data back with SAFETY FALLBACK
    const fullPlan = cleanJson.meal_plan.map(d => ({
      ...d,
      meals: d.meals.map(m => {
        // Find match or fallback to 'pho-ga' if AI messed up the ID
        const foodInfo = FOOD_DATABASE.find(f => f.id === m.food_id) || FOOD_DATABASE[0];
        return { 
          ...m, 
          name: foodInfo.name,
          image: foodInfo.image,
          benefits: foodInfo.benefits,
          reason: m.reason || `Món ăn này rất tốt cho tình trạng ${diagnosis}`
        };
      })
    }));

    res.json({ meal_plan: fullPlan });
  } catch (error) {
    console.error('MEAL PLAN ERROR:', error);
    res.status(500).json({ error: 'Error generating meal plan' });
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

    if (cabinet.length === 0) return res.json({ message: 'Tủ thuốc của bạn đang trống.' });

    const model = genAI.getGenerativeModel({ model: 'gemini-3.1-flash-lite-preview' });
    const cabinetList = cabinet.map(m => {
      let ownerName = m.familyMember.name;
      if (m.familyMember.userId !== req.user.userId && m.familyMember.linkedUserId === null) {
        ownerName = m.familyMember.user?.name || m.familyMember.user?.email || 'Chủ gia đình';
      }
      return `- ${m.name}: Dùng cho ${m.symptoms_treated || m.diagnosis}. Liều lượng: ${m.dosage}. Người dùng: ${ownerName}`;
    }).join('\n');
    
    const prompt = `Based on this family medicine cabinet:\n${cabinetList}\n\nPatient symptom: "${symptom}". 
    Find the best medicine(s) to treat this symptom. Return ONLY JSON: { "top_match": { "name": "string", "reason": "string", "instructions": "string", "owner": "string" }, "alternatives": [{ "name": "string", "reason": "string" }], "warning": "string" }. If no match found, explain why. All text in natural Vietnamese.`;

    const result = await model.generateContent(prompt);
    res.json(JSON.parse(result.response.text().replace(/```json|```/g, '').trim()));
  } catch (error) {
    res.status(500).json({ error: 'Error searching cabinet' });
  }
});

app.get('/api/foods', (req, res) => {
  res.json(FOOD_DATABASE);
});

export default app;

if (process.env.VERCEL !== '1') {
  app.listen(port, () => console.log(`Server running at http://localhost:${port}`));
}
