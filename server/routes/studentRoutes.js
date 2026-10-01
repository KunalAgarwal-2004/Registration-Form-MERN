import express from 'express';
import {
  registerStudent,
  getStudents,
  getStudentById
} from '../controllers/studentController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public route for Student Registration
router.post('/register', registerStudent);

// Protected Admin routes (Requires JWT Token)
router.get('/', protect, getStudents);
router.get('/:id', protect, getStudentById);

export default router;
