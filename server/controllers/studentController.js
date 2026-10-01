import Student from '../models/Student.js';
import { sendAdminRegistrationEmail } from '../services/emailService.js';

/**
 * @desc    Register a new student
 * @route   POST /api/students/register
 * @access  Public
 */
export const registerStudent = async (req, res, next) => {
  try {
    const {
      studentName,
      fatherName,
      motherName,
      rollNo,
      rollNumber,
      phoneNo,
      phoneNumber,
      email,
      marks10,
      marks10th,
      marks12,
      marks12th
    } = req.body;

    const finalRollNo = (rollNo || rollNumber || '').toString().trim();
    const finalPhoneNo = (phoneNo || phoneNumber || '').toString().trim();
    const finalMarks10 = marks10 !== undefined ? Number(marks10) : Number(marks10th);
    const finalMarks12 = marks12 !== undefined ? Number(marks12) : Number(marks12th);

    if (
      !studentName ||
      !fatherName ||
      !motherName ||
      !finalRollNo ||
      !finalPhoneNo ||
      !email ||
      isNaN(finalMarks10) ||
      isNaN(finalMarks12)
    ) {
      res.status(400);
      throw new Error('Please fill in all required fields accurately');
    }

    if (finalMarks10 < 0 || finalMarks10 > 100) {
      res.status(400);
      throw new Error('Marks in 10th must be between 0 and 100');
    }

    if (finalMarks12 < 0 || finalMarks12 > 100) {
      res.status(400);
      throw new Error('Marks in 12th must be between 0 and 100');
    }

    const existingStudent = await Student.findOne({ rollNo: finalRollNo });
    if (existingStudent) {
      res.status(400);
      throw new Error(`Student with Roll Number '${finalRollNo}' is already registered.`);
    }

    const student = await Student.create({
      studentName: studentName.trim(),
      fatherName: fatherName.trim(),
      motherName: motherName.trim(),
      rollNo: finalRollNo,
      phoneNo: finalPhoneNo,
      email: email.trim().toLowerCase(),
      marks10: finalMarks10,
      marks12: finalMarks12
    });

    sendAdminRegistrationEmail(student).catch((err) =>
      console.error('[Email Notify Alert]', err.message)
    );

    res.status(201).json({
      success: true,
      message: 'Student registered successfully',
      data: {
        id: student._id,
        studentName: student.studentName,
        rollNo: student.rollNo,
        email: student.email,
        createdAt: student.createdAt
      }
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get all registered students
 * @route   GET /api/students
 * @access  Private (Admin only)
 */
export const getStudents = async (req, res, next) => {
  try {
    const students = await Student.find({}).sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: students.length,
      data: students
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get single student details by ID
 * @route   GET /api/students/:id
 * @access  Private (Admin only)
 */
export const getStudentById = async (req, res, next) => {
  try {
    const student = await Student.findById(req.params.id);

    if (!student) {
      res.status(404);
      throw new Error(`Student not found with ID '${req.params.id}'`);
    }

    res.status(200).json({
      success: true,
      data: student
    });
  } catch (error) {
    next(error);
  }
};
