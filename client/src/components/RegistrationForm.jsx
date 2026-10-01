import React, { useState } from 'react';
import { User, CreditCard, Phone, Mail, BarChart2, Send, CheckCircle, AlertCircle } from 'lucide-react';
import { registerStudent } from '../services/api';

const RegistrationForm = ({ onSuccess }) => {
  const [formData, setFormData] = useState({
    studentName: '',
    fatherName: '',
    motherName: '',
    rollNumber: '',
    phoneNumber: '',
    email: '',
    marks10th: '',
    marks12th: ''
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // { type: 'success' | 'error', message: string }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));

    // Clear field specific error on change
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // 1. Student Name
    if (!formData.studentName.trim()) {
      newErrors.studentName = 'Student name is required';
    }

    // 2. Father Name
    if (!formData.fatherName.trim()) {
      newErrors.fatherName = "Father's name is required";
    }

    // 3. Mother Name
    if (!formData.motherName.trim()) {
      newErrors.motherName = "Mother's name is required";
    }

    // 4. Roll Number
    if (!formData.rollNumber.trim()) {
      newErrors.rollNumber = 'Roll number is required';
    }

    // 5. Phone Number (10 digits)
    const phoneRegex = /^[0-9]{10}$/;
    const cleanPhone = formData.phoneNumber.replace(/[\s-]/g, '');
    if (!cleanPhone) {
      newErrors.phoneNumber = 'Phone number is required';
    } else if (!phoneRegex.test(cleanPhone)) {
      newErrors.phoneNumber = 'Please enter a valid 10-digit phone number';
    }

    // 6. Email ID
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!emailRegex.test(formData.email.trim())) {
      newErrors.email = 'Please enter a valid email address';
    }

    // 7. Marks in 10th (0 - 100)
    if (formData.marks10th === '' || formData.marks10th === null) {
      newErrors.marks10th = '10th marks are required';
    } else {
      const num10th = Number(formData.marks10th);
      if (isNaN(num10th) || num10th < 0 || num10th > 100) {
        newErrors.marks10th = 'Marks must be between 0 and 100';
      }
    }

    // 8. Marks in 12th (0 - 100)
    if (formData.marks12th === '' || formData.marks12th === null) {
      newErrors.marks12th = '12th marks are required';
    } else {
      const num12th = Number(formData.marks12th);
      if (isNaN(num12th) || num12th < 0 || num12th > 100) {
        newErrors.marks12th = 'Marks must be between 0 and 100';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitStatus(null);

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      // API Call using services/api.js
      const response = await registerStudent({
        studentName: formData.studentName.trim(),
        fatherName: formData.fatherName.trim(),
        motherName: formData.motherName.trim(),
        rollNumber: formData.rollNumber.trim(),
        phoneNumber: formData.phoneNumber.trim(),
        email: formData.email.trim().toLowerCase(),
        marks10th: Number(formData.marks10th),
        marks12th: Number(formData.marks12th)
      });

      setSubmitStatus({
        type: 'success',
        message: response.message || 'Registration submitted successfully!'
      });

      // Reset form
      setFormData({
        studentName: '',
        fatherName: '',
        motherName: '',
        rollNumber: '',
        phoneNumber: '',
        email: '',
        marks10th: '',
        marks12th: ''
      });

      if (onSuccess) onSuccess(response);
    } catch (err) {
      // In Phase 1 UI mode without live backend server, display demo success simulation or error notification
      if (err.message.includes('Backend server is not reachable')) {
        // Phase 1 preview simulated submission delay
        setTimeout(() => {
          setLoading(false);
          setSubmitStatus({
            type: 'success',
            message: 'Phase 1 Demo Success: Form validation passed! (Backend API will connect in Phase 2)'
          });
        }, 1000);
        return;
      }

      setSubmitStatus({
        type: 'error',
        message: err.message || 'Something went wrong during registration.'
      });
      setLoading(false);
    }
  };

  return (
    <div className="registration-card">
      {/* Header Section */}
      <div className="form-header">
        <div className="header-icon-container">
          <svg className="graduation-cap-icon" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 3L1 9L12 15L21 10.09V17H23V9M5 13.18V17.18C5 19.4 8.13 21.18 12 21.18C15.87 21.18 19 19.4 19 17.18V13.18L12 17L5 13.18Z" />
          </svg>
        </div>
        <h1 className="form-title">Student Registration Form</h1>
        <p className="form-subtitle">Fill in your details to create your account</p>
        <div className="title-underline"></div>
      </div>

      {/* Form Feedback Alert */}
      {submitStatus && (
        <div className={`status-alert ${submitStatus.type}`}>
          {submitStatus.type === 'success' ? (
            <CheckCircle className="alert-icon" size={20} />
          ) : (
            <AlertCircle className="alert-icon" size={20} />
          )}
          <span>{submitStatus.message}</span>
        </div>
      )}

      {/* Main Registration Form */}
      <form onSubmit={handleSubmit} noValidate>
        {/* Student Name */}
        <div className="form-group">
          <label htmlFor="studentName">
            Student Name <span className="required-star">*</span>
          </label>
          <div className={`input-wrapper ${errors.studentName ? 'has-error' : ''}`}>
            <span className="input-icon-box">
              <User size={18} />
            </span>
            <input
              type="text"
              id="studentName"
              name="studentName"
              value={formData.studentName}
              onChange={handleChange}
              placeholder="Enter your full name"
            />
          </div>
          {errors.studentName && <p className="error-text">{errors.studentName}</p>}
        </div>

        {/* Father Name */}
        <div className="form-group">
          <label htmlFor="fatherName">
            Father Name <span className="required-star">*</span>
          </label>
          <div className={`input-wrapper ${errors.fatherName ? 'has-error' : ''}`}>
            <span className="input-icon-box">
              <User size={18} />
            </span>
            <input
              type="text"
              id="fatherName"
              name="fatherName"
              value={formData.fatherName}
              onChange={handleChange}
              placeholder="Enter your father's name"
            />
          </div>
          {errors.fatherName && <p className="error-text">{errors.fatherName}</p>}
        </div>

        {/* Mother Name */}
        <div className="form-group">
          <label htmlFor="motherName">
            Mother Name <span className="required-star">*</span>
          </label>
          <div className={`input-wrapper ${errors.motherName ? 'has-error' : ''}`}>
            <span className="input-icon-box">
              <User size={18} />
            </span>
            <input
              type="text"
              id="motherName"
              name="motherName"
              value={formData.motherName}
              onChange={handleChange}
              placeholder="Enter your mother's name"
            />
          </div>
          {errors.motherName && <p className="error-text">{errors.motherName}</p>}
        </div>

        {/* Roll Number */}
        <div className="form-group">
          <label htmlFor="rollNumber">
            Roll Number <span className="required-star">*</span>
          </label>
          <div className={`input-wrapper ${errors.rollNumber ? 'has-error' : ''}`}>
            <span className="input-icon-box">
              <CreditCard size={18} />
            </span>
            <input
              type="text"
              id="rollNumber"
              name="rollNumber"
              value={formData.rollNumber}
              onChange={handleChange}
              placeholder="Enter your roll number"
            />
          </div>
          {errors.rollNumber && <p className="error-text">{errors.rollNumber}</p>}
        </div>

        {/* Phone Number */}
        <div className="form-group">
          <label htmlFor="phoneNumber">
            Phone Number <span className="required-star">*</span>
          </label>
          <div className={`input-wrapper ${errors.phoneNumber ? 'has-error' : ''}`}>
            <span className="input-icon-box phone-prefix-box">
              <Phone size={18} />
              <span className="country-code">+91</span>
            </span>
            <input
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              placeholder="Enter your phone number"
              maxLength={10}
            />
          </div>
          {errors.phoneNumber && <p className="error-text">{errors.phoneNumber}</p>}
        </div>

        {/* Email ID */}
        <div className="form-group">
          <label htmlFor="email">
            Email ID <span className="required-star">*</span>
          </label>
          <div className={`input-wrapper ${errors.email ? 'has-error' : ''}`}>
            <span className="input-icon-box">
              <Mail size={18} />
            </span>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email address"
            />
          </div>
          {errors.email && <p className="error-text">{errors.email}</p>}
        </div>

        {/* Marks in 10th */}
        <div className="form-group">
          <label htmlFor="marks10th">
            Marks in 10th <span className="required-star">*</span>
          </label>
          <div className={`input-wrapper ${errors.marks10th ? 'has-error' : ''}`}>
            <span className="input-icon-box">
              <BarChart2 size={18} />
            </span>
            <input
              type="number"
              id="marks10th"
              name="marks10th"
              value={formData.marks10th}
              onChange={handleChange}
              placeholder="Enter your 10th marks"
              min="0"
              max="100"
              step="0.01"
            />
            <span className="input-suffix">/ 100</span>
          </div>
          {errors.marks10th && <p className="error-text">{errors.marks10th}</p>}
        </div>

        {/* Marks in 12th */}
        <div className="form-group">
          <label htmlFor="marks12th">
            Marks in 12th <span className="required-star">*</span>
          </label>
          <div className={`input-wrapper ${errors.marks12th ? 'has-error' : ''}`}>
            <span className="input-icon-box">
              <BarChart2 size={18} />
            </span>
            <input
              type="number"
              id="marks12th"
              name="marks12th"
              value={formData.marks12th}
              onChange={handleChange}
              placeholder="Enter your 12th marks"
              min="0"
              max="100"
              step="0.01"
            />
            <span className="input-suffix">/ 100</span>
          </div>
          {errors.marks12th && <p className="error-text">{errors.marks12th}</p>}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className={`submit-btn ${loading ? 'loading' : ''}`}
          disabled={loading}
        >
          {loading ? (
            <>
              <span className="spinner"></span>
              <span>SUBMITTING...</span>
            </>
          ) : (
            <>
              <Send size={18} className="send-icon" />
              <span>SUBMIT REGISTRATION</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default RegistrationForm;
