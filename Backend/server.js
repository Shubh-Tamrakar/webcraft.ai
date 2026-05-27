import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import session from 'express-session';
import passport from 'passport';
import mongoose from 'mongoose';
import MongoStore from 'connect-mongo';
import { GoogleGenerativeAI } from '@google/generative-ai';
import configurePassport from './config/passport.js';
import authRoutes from './routes/auth.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// ─── MongoDB Connection ───────────────────────────────────────────
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB connected'))
  .catch((err) => console.error('❌ MongoDB error:', err));

// ─── Middleware ───────────────────────────────────────────────────
app.use(cors({
  origin:'https://webcraftai-eight.vercel.app',
  credentials: true,   // cookies ke liye zaroori
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ─── Session ─────────────────────────────────────────────────────
app.use(session({
  secret: process.env.SESSION_SECRET || 'webcraft_secret_key',
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }),
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 7, // 7 din
    httpOnly: true,
    secure: true, // production me true karna (HTTPS)
    sameSite: 'none', 
  }
}));

// ─── Passport ────────────────────────────────────────────────────
configurePassport(passport);
app.use(passport.initialize());
app.use(passport.session());

// ─── Auth Routes ─────────────────────────────────────────────────
app.use('/auth', authRoutes);

// ─── Gemini Setup ────────────────────────────────────────────────
const genAI = new GoogleGenerativeAI(process.env.API_KEY);

// ─── Protected: Website Generate ─────────────────────────────────
app.post('/generate', (req, res, next) => {
  // Sirf logged-in users generate kar sakte hain
  if (!req.isAuthenticated()) {
    return res.status(401).json({ error: 'Please login to generate websites' });
  }
  next();
}, async (req, res) => {
  try {
    if (!req.body?.prompt) {
      return res.status(400).json({ error: 'Prompt is required' });
    }

    const { prompt } = req.body;
    console.log('PROMPT:', prompt);

    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

    const result = await model.generateContent(`
You are an expert web developer.
Create a complete responsive website for: "${prompt}"

Return ONLY valid JSON in this exact format:
{
  "html": "complete html code",
  "css": "complete css code",
  "js": "complete javascript code"
}

Rules:
1. No markdown
2. No triple backticks
3. Return raw JSON only
4. Make website modern and responsive
`);

    const response = await result.response;
    const text = response.text();

    const cleanedText = text.replace(/```json/gi, '').replace(/```/g, '').trim();

    let code;
    try {
      const firstBrace = cleanedText.indexOf('{');
      const lastBrace = cleanedText.lastIndexOf('}');
      console.log(text);
      code = JSON.parse(cleanedText.slice(firstBrace, lastBrace + 1));

      if (!code.html || !code.css || !code.js) {
        throw new Error('Missing html/css/js fields');
      }
    } catch (err) {
      console.error('JSON Parse Error:', err);
      return res.status(500).json({ error: 'Invalid JSON from AI', details: err.message });
    }

    res.json(code);
  } catch (error) {
    console.error('SERVER ERROR:', error.message);
    res.status(500).json({ error: 'Failed to generate website', details: error.message });
  }
});

// ─── Test Route ───────────────────────────────────────────────────
app.get('/', (req, res) => res.send('Backend running 🚀'));

// ─── Start ────────────────────────────────────────────────────────
app.listen(port, () => console.log(`✅ Server running on port ${port}`));