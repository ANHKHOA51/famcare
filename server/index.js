import express from 'express';
import cors from 'cors';
import multer from 'multer';
import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Root health check
app.get('/', (req, res) => {
  res.send('✅ HealScan Scribe Backend is Running!');
});

// Configure Multer to use Memory Storage for demo purposes (no files saved to disk)
const upload = multer({ storage: multer.memoryStorage() });

// Initialize Gemini API
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

app.post('/api/scan', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No image file provided' });
    }

    // Using gemini-3.1-flash-lite-preview as confirmed by the user's active quota table
    const model = genAI.getGenerativeModel({ model: 'gemini-3.1-flash-lite-preview' });

    // Access the image data directly from memory buffer
    const base64Image = req.file.buffer.toString('base64');

    const prompt = `You are a medical data extractor and a certified nutritionist. Analyze the provided prescription image. Extract the diagnosis and medications. Then, based on the diagnosis and medications, provide a tailored nutrition plan. You MUST return ONLY a valid JSON object with the following schema: { "diagnosis": "string", "medications": [{ "name": "string", "dosage": "string" }], "nutrition": { "recommended_foods": ["string"], "foods_to_avoid": ["string"] } }. Do not include markdown tags like \`\`\`json. IMPORTANT: You MUST return all values inside the JSON object in natural and fluent Vietnamese. Do NOT include English translations in parentheses. For medical terms, use the standard Vietnamese equivalent.`;

    const result = await model.generateContent([
      prompt,
      {
        inlineData: {
          data: base64Image,
          mimeType: req.file.mimetype,
        },
      },
    ]);

    const response = await result.response;
    const text = response.text();
    
    // Clean up text and parse JSON
    const cleanedText = text.replace(/```json|```/g, '').trim();
    const jsonResponse = JSON.parse(cleanedText);
    
    res.json(jsonResponse);
  } catch (error) {
    console.error('SERVER ERROR:', error);
    res.status(500).json({ error: error.message || 'Error processing the image' });
  }
});

// Endpoint for generating a 7-day meal plan
app.post('/api/generate-meal-plan', async (req, res) => {
  try {
    const { diagnosis, recommended_foods } = req.body;

    if (!diagnosis) {
      return res.status(400).json({ error: 'Diagnosis is required' });
    }

    const model = genAI.getGenerativeModel({ model: 'gemini-3.1-flash-lite-preview' });

    const prompt = `You are an expert nutritionist. Based on the patient's diagnosis: "${diagnosis}" and allowed foods: "${recommended_foods?.join(', ')}", create a detailed, healthy 7-day meal plan (Monday to Sunday). For each day, provide Breakfast (Sáng), Lunch (Trưa), and Dinner (Tối). 
    You MUST return ONLY a valid JSON object with this schema: 
    { 
      "meal_plan": [ 
        { 
          "day": "Thứ 2", 
          "meals": [ 
            { "type": "Sáng", "dish_name_vi": "string", "search_keyword_en": "string (e.g., grilled salmon salad)" },
            { "type": "Trưa", "dish_name_vi": "string", "search_keyword_en": "string" },
            { "type": "Tối", "dish_name_vi": "string", "search_keyword_en": "string" }
          ] 
        } 
      ] 
    } 
    Ensure 'dish_name_vi' is in natural and appetizing Vietnamese. 'search_keyword_en' must be a highly descriptive English keyword for high-quality food image generation (e.g., "steamed salmon with lemon and herbs", "healthy quinoa salad bowl"). Do not include markdown tags like \`\`\`json.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    try {
      const jsonResponse = JSON.parse(text.replace(/```json|```/g, '').trim());
      res.json(jsonResponse);
    } catch (parseError) {
      console.error('Error parsing Meal Plan JSON:', text);
      res.status(500).json({ error: 'Failed to parse Meal Plan AI response', raw: text });
    }
  } catch (error) {
    console.error('SERVER MEAL PLAN ERROR:', error);
    res.status(500).json({ error: error.message || 'Error generating meal plan' });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
