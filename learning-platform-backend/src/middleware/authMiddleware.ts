import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// הרחבה ל-Request כדי להכיל את user
declare global {
  namespace Express {
    interface Request {
      user?: { id: number; isAdmin: boolean };
    }
  }
}

// Middleware לבדיקה האם המשתמש מחובר
export const protect = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.split(' ')[1];
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET || '') as {
        userId: number;
        isAdmin: boolean;
      };
      req.user = { id: decoded.userId, isAdmin: decoded.isAdmin };
      next();
    } catch (err) {
      return res.status(401).json({ message: 'Not authorized, token failed' });
    }
  } else {
    res.status(401).json({ message: 'Not authorized, no token' });
  }
};

// Middleware לבדיקה האם המשתמש הוא מנהל
export const adminOnly = (req: Request, res: Response, next: NextFunction) => {
  if (req.user?.isAdmin) {
    next();
  } else {
    return res.status(403).json({ message: 'Access denied: Admins only' });
  }
};
