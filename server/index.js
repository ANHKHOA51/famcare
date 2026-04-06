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

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let prisma;
try {
  prisma = new PrismaClient();
  console.log('✅ Database client initialized');
} catch (e) {
  console.warn('⚠️ Database unavailable - running in limited mode');
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
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const user = await prisma.user.create({
      data: { 
        email, 
        password: hashedPassword, 
        name,
        familyMembers: {
          create: { name: name || 'Bản thân', relationship: 'Bản thân' }
        }
      },
    });
    
    res.json({ message: 'User registered successfully', userId: user.id });
  } catch (error) {
    console.error('REGISTRATION ERROR:', error);
    res.status(400).json({ error: 'Email already exists or invalid data' });
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
      ownedMembers: { include: { linkedUser: { select: { id: true, name: true, email: true } } } } 
    }
  });
  res.json(user);
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
  res.json(ownedMembers);
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

// --- Cabinet Routes ---
app.post('/api/cabinet/save', authenticateToken, async (req, res) => {
  try {
    const { name, dosage, instructions, diagnosis, symptoms_treated, familyMemberId } = req.body;
    const medication = await prisma.medication.create({
      data: { 
        name, dosage, instructions, diagnosis, 
        symptoms_treated: Array.isArray(symptoms_treated) ? symptoms_treated.join(', ') : symptoms_treated,
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
  // Medications from families I own + medications from families I'm linked to
  const medications = await prisma.medication.findMany({
    where: {
      familyMember: {
        OR: [
          { userId: req.user.userId },          // families I own
          { linkedUserId: req.user.userId }    // families I'm linked to as a member
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
  res.json(medications);
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

app.post('/api/generate-meal-plan', async (req, res) => {
  try {
    const { diagnosis, recommended_foods } = req.body;
    const model = genAI.getGenerativeModel({ model: 'gemini-3.1-flash-lite-preview' });
    const prompt = `Create 7-day meal plan for diagnosis: "${diagnosis}". Return ONLY JSON: { "meal_plan": [ { "day": "Thứ 2", "meals": [ { "type": "Sáng", "dish_name_vi": "string", "search_keyword_en": "string" } ] } ] }.`;
    const result = await model.generateContent(prompt);
    res.json(JSON.parse(result.response.text().replace(/```json|```/g, '').trim()));
  } catch (error) {
    res.status(500).json({ error: 'Error generating meal plan' });
  }
});

app.post('/api/cabinet/search', authenticateToken, async (req, res) => {
  try {
    const { symptom } = req.body;
    const cabinet = await prisma.medication.findMany({
      where: { familyMember: { userId: req.user.userId } },
      include: { familyMember: true }
    });

    if (cabinet.length === 0) return res.json({ message: 'Tủ thuốc của bạn đang trống.' });

    const model = genAI.getGenerativeModel({ model: 'gemini-3.1-flash-lite-preview' });
    const cabinetList = cabinet.map(m => `- ${m.name}: Dùng cho ${m.symptoms_treated || m.diagnosis}. Liều lượng: ${m.dosage}. Người dùng: ${m.familyMember.name}`).join('\n');
    
    const prompt = `Based on this family medicine cabinet:\n${cabinetList}\n\nPatient symptom: "${symptom}". 
    Find the best medicine(s) to treat this symptom. Return ONLY JSON: { "top_match": { "name": "string", "reason": "string", "instructions": "string", "owner": "string" }, "alternatives": [{ "name": "string", "reason": "string" }], "warning": "string" }. If no match found, explain why. All text in natural Vietnamese.`;

    const result = await model.generateContent(prompt);
    res.json(JSON.parse(result.response.text().replace(/```json|```/g, '').trim()));
  } catch (error) {
    res.status(500).json({ error: 'Error searching cabinet' });
  }
});

app.listen(port, () => console.log(`Server running at http://localhost:${port}`));
