// ✅ src/controllers/userController.ts
import { Request, Response, NextFunction } from 'express';
import prisma from '../prisma/prismaClient';
import jwt from 'jsonwebtoken';

const generateToken = (userId: number, role: string) => {
  return jwt.sign({ userId, role }, process.env.JWT_SECRET || 'secret', {
    expiresIn: '7d',
  });
};

export const registerUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { name, phone, role } = req.body;

  if (!name || !phone) {
    res.status(400).json({ message: 'Name and phone are required' });
    return;
  }

  try {
    const trimmedPhone = phone.trim();
    const trimmedName = name.trim();

    let user = await prisma.user.findFirst({ where: { phone: trimmedPhone } });

    if (!user) {
      user = await prisma.user.create({
        data: {
          name: trimmedName,
          phone: trimmedPhone,
          role: role || 'user',
        },
      });
    } else {
      console.log('ℹ️ User already exists. Returning existing user.');
    }

    const token = generateToken(user.id, user.role);
    console.log('✅ Generated token for user ID', user.id);
    console.log('TOKEN:', token);

    res.status(201).json({
      id: user.id,
      name: user.name,
      phone: user.phone,
      role: user.role,
      token,
    });
  } catch (error: any) {
    console.error('❌ Registration error:', error.message || error);
    res.status(500).json({ message: 'Server error: ' + error.message });
  }
};

export const getAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const users = await prisma.user.findMany({ include: { prompts: true } });
    res.json(users);
  } catch (err) {
    console.error('Error fetching users:', err);
    res.status(500).json({ message: 'Failed to fetch users' });
  }
};
