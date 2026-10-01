import jwt from 'jsonwebtoken';

/**
 * Generate JWT token using secret and expiration from environment variables
 * @param {string|Object} payload 
 * @returns {string}
 */
const generateToken = (payload) => {
  const secret = process.env.JWT_SECRET;
  const expiresIn = process.env.JWT_EXPIRES_IN || '30d';

  if (!secret) {
    throw new Error('JWT_SECRET is not configured in environment variables');
  }

  return jwt.sign(
    typeof payload === 'object' ? payload : { id: payload, role: 'admin' },
    secret,
    { expiresIn }
  );
};

export default generateToken;
