import jwt from 'jsonwebtoken';

/**
 * Middleware to protect admin-only routes by verifying JWT
 */
export const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer ')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];

      if (!token) {
        res.status(401);
        throw new Error('Not authorized, token missing');
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
      return next();
    } catch (error) {
      res.status(401);

      if (error.name === 'TokenExpiredError') {
        return next(new Error('Not authorized, token has expired'));
      }

      if (error.name === 'JsonWebTokenError') {
        return next(new Error('Not authorized, invalid token signature'));
      }

      return next(new Error(error.message || 'Not authorized, token validation failed'));
    }
  }

  res.status(401);
  return next(new Error('Not authorized, no token provided'));
};
