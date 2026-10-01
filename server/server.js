console.log("🔥🔥🔥 THIS SERVER.JS IS RUNNING 🔥🔥🔥");


import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import studentRoutes from './routes/studentRoutes.js';
import authRoutes from './routes/authRoutes.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';

dotenv.config();

// ================================
// SMTP ENVIRONMENT TEST
// ================================
console.log('========== ENV TEST ==========');
console.log('SMTP HOST:', process.env.SMTP_HOST);
console.log('SMTP PORT:', process.env.SMTP_PORT);
console.log('SMTP USER:', process.env.SMTP_USER);
console.log('ADMIN EMAIL:', process.env.ADMIN_EMAIL);
console.log('===============================');

const app = express();

// Middleware
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health Check
app.get('/', (req, res) => {
  res.json({
    message: 'Student Registration API is running',
    version: '1.0.0'
  });
});

// Routes
app.use('/api/students', studentRoutes);
app.use('/api/auth', authRoutes);

// Error handling
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

// Start server
const startServer = async () => {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(
        `Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`
      );
      console.log(`http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error.message);
    process.exit(1);
  }
};

startServer();