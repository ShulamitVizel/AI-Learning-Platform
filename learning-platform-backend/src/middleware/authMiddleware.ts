import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const protect = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.split(' ')[1];
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET || '') as {
        userId: number;
        role?: string;
      };
      // Log to check what role is being decoded
      console.log("Decoded token:", decoded);

      req.user = { id: decoded.userId, role: decoded.role };
      next();
    } catch (err) {
      return res.status(401).json({ message: 'Not authorized, token failed' });
    }
  } else {
    res.status(401).json({ message: 'Not authorized, no token' });
  }
};

export const requireAdminByRole = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Check if the role is 'admin' and log
  console.log("User role:", req.user?.role);
  if (req.user?.role === 'admin') {
    next();
  } else {
    res.status(403).json({ message: 'Access denied: Admins only' });
  }
};
