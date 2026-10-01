console.log("🔥🔥🔥 THIS SERVER.JS IS RUNNING 🔥🔥🔥");

import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import connectDB from './config/db.js';
import studentRoutes from './routes/studentRoutes.js';
import authRoutes from './routes/authRoutes.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';

const app = express();

// ================================
// ENVIRONMENT TEST
// ================================
console.log('========== ENV TEST ==========');
console.log('NODE ENV:', process.env.NODE_ENV);
console.log('SMTP HOST:', process.env.SMTP_HOST);
console.log('SMTP PORT:', process.env.SMTP_PORT);
console.log('SMTP USER:', process.env.SMTP_USER);
console.log('ADMIN EMAIL:', process.env.ADMIN_EMAIL);
console.log('MONGO URI:', process.env.MONGO_URI ? 'Loaded ✅' : 'Missing ❌');
console.log('JWT SECRET:', process.env.JWT_SECRET ? 'Loaded ✅' : 'Missing ❌');
console.log('===============================');

// ================================
// CORS
// ================================
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3000',
  process.env.FRONTEND_URL
].filter(Boolean);

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests without an origin
    // (Postman, server-to-server requests, etc.)
    if (!origin) {
      return callback(null, true);
    }

    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    return callback(new Error('Not allowed by CORS'));
  },
  credentials: true
}));

// ================================
// BODY PARSERS
// ================================
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ================================
// HEALTH CHECK
// ================================
app.get('/', (req, res) => {
  res.json({
    message: 'Student Registration API is running',
    version: '1.0.0'
  });
});

// ================================
// ROUTES
// ================================
app.use('/api/students', studentRoutes);
app.use('/api/auth', authRoutes);

// ================================
// ERROR HANDLING
// ================================
app.use(notFound);
app.use(errorHandler);

// ================================
// PORT
// ================================
const PORT = process.env.PORT || 5000;

// ================================
// START SERVER
// ================================
const startServer = async () => {
  try {
    await connectDB();

    app.listen(PORT, '0.0.0.0', () => {
      console.log(
        `Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`
      );

      console.log(`Server started successfully 🚀`);
    });
  } catch (error) {
    console.error('Failed to start server:', error.message);
    process.exit(1);
  }
};

startServer();