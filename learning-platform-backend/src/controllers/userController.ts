import { Request, Response } from 'express';
import prisma from '../prisma/prismaClient';
import jwt from 'jsonwebtoken';

const generateToken = (userId: number, isAdmin: boolean) => {
  return jwt.sign({ userId, isAdmin }, process.env.JWT_SECRET || 'secret', {
    expiresIn: '7d',
  });
};

// POST /api/users/register
export const registerUser = async (req: Request, res: Response) => {
  const { name, phone } = req.body;

  if (!name || !phone) {
    return res.status(400).json({ message: 'Name and phone are required' });
  }

  try {
    // בדיקה אם קיים כבר משתמש עם אותו טלפון
    let user = await prisma.user.findFirst({ where: { phone } });

    if (!user) {
      // יצירת משתמש חדש
      user = await prisma.user.create({
        data: {
          name,
          phone,
          // isAdmin: false, // כברירת מחדל
        },
      });
    }

    const token = generateToken(user.id, false);

    res.status(201).json({
      id: user.id,
      name: user.name,
      phone: user.phone,
      // isAdmin: user.isAdmin, // Remove if not in model
      token,
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// GET /api/users/
export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany({
      include: {
        prompts: true,
      },
    });
    res.json(users);
  } catch (err) {
    console.error('Error fetching users:', err);
    res.status(500).json({ message: 'Failed to fetch users' });
  }
};
