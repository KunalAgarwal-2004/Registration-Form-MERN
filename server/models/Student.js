import mongoose from 'mongoose';

const studentSchema = new mongoose.Schema(
  {
    studentName: {
      type: String,
      required: [true, 'Student Name is required'],
      trim: true
    },
    fatherName: {
      type: String,
      required: [true, 'Father Name is required'],
      trim: true
    },
    motherName: {
      type: String,
      required: [true, 'Mother Name is required'],
      trim: true
    },
    rollNo: {
      type: String,
      required: [true, 'Roll Number is required'],
      unique: true,
      trim: true
    },
    phoneNo: {
      type: String,
      required: [true, 'Phone Number is required'],
      match: [/^[0-9]{10}$/, 'Please provide a valid 10-digit phone number'],
      trim: true
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      trim: true,
      lowercase: true,
      match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Please provide a valid email address']
    },
    marks10: {
      type: Number,
      required: [true, 'Marks in 10th are required'],
      min: [0, 'Marks in 10th cannot be less than 0'],
      max: [100, 'Marks in 10th cannot exceed 100']
    },
    marks12: {
      type: Number,
      required: [true, 'Marks in 12th are required'],
      min: [0, 'Marks in 12th cannot be less than 0'],
      max: [100, 'Marks in 12th cannot exceed 100']
    }
  },
  {
    timestamps: true
  }
);

const Student = mongoose.model('Student', studentSchema);

export default Student;
