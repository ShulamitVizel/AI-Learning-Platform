import { Request, Response } from 'express';
import prisma from '../prisma/prismaClient';

export const registerUser = async (req: Request, res: Response) => {
  try {
    const { name, phone } = req.body;
    const user = await prisma.user.create({
      data: { name, phone }
    });
    res.status(201).json(user);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
