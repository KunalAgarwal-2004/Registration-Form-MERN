import express from 'express';
import generateToken from '../utils/generateToken.js';

const router = express.Router();

/**
 * @desc    Admin Authentication / Login
 * @route   POST /api/auth/login
 * @access  Public
 */
router.post('/login', async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400);
      throw new Error('Please provide both email and password');
    }

    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPassword = process.env.ADMIN_PASSWORD;

    // Secure credentials check against environment variables
    if (email === adminEmail && password === adminPassword) {
      const token = generateToken({ email: adminEmail, role: 'admin' });

      return res.status(200).json({
        success: true,
        message: 'Admin authenticated successfully',
        token
      });
    }

    res.status(401);
    throw new Error('Invalid email or password');
  } catch (error) {
    next(error);
  }
});

export default router;
