import express from 'express';
import connectMongo from '../config/db.js';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import authRoute from '../routes/auth.route.js';
import cors from 'cors';
import aiRoute from '../routes/geminiRoute.js';
import path from 'path';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;
const FRONTEND_URL = process.env.URL || process.env.FRONTEND_URL || 'http://localhost:5173';
const __dirname = path.resolve();

// ===== CORS Configuration =====
const allowedOrigins = [
  FRONTEND_URL,
  process.env.RENDER_EXTERNAL_URL,
  'http://localhost:5173',
  'https://localhost:5173'
].filter(Boolean);

app.use(cors({
  origin: (origin, callback) => {
    if (!origin) return callback(null, true); // allow non-browser tools/health checks
    const isAllowed = allowedOrigins.some(o => origin === o);
    return isAllowed ? callback(null, true) : callback(new Error('Not allowed by CORS'));
  },
  credentials: true
}));
// ===== Security Middleware =====
// Validate URL encoding to prevent malformed requests
app.use((req, res, next) => {
  try { 
    decodeURIComponent(req.path); 
  } catch (err) {
    return res.status(400).send("Malformed URL");
  }
  next();
});

// Block malformed route patterns
app.use((req, res, next) => {
  const invalidPattern = /\/:[^\w]/;
  if (invalidPattern.test(req.path)) {
    return res.status(400).send("Malformed route pattern");
  }
  next();
});

// ===== Application Middleware =====
app.use(express.json());
app.use(cookieParser());

// ===== Database Connection =====
if (!process.env.MONGO_URI) {
  console.error('❌ Missing MONGO_URI in environment');
}
connectMongo();

// ===== Routes =====
app.get('/hello', (req, res) => {
  res.send('Welcome to the Virtual Assistant API');
});

app.use('/api/auth', authRoute);
app.use('/api/VA', aiRoute);

// ===== Static File Serving (Production) =====
if (process.env.NODE_ENV === 'production') {
  const distPath = path.join(__dirname, "../frontend/dist");
  app.use(express.static(distPath));

  // Serve index.html for all non-API routes (SPA routing)
  app.get(/^\/(?!api).*/, (req, res) => {
    res.sendFile(path.join(distPath, 'index.html'));
  });
}

// ===== Start Server =====
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
