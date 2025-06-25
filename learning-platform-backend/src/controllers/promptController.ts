import { Request, Response } from 'express';
import prisma from '../prisma/prismaClient';
import { generateLesson } from '../services/openaiService';

export const createPrompt = async (req: Request, res: Response) => {
  try {
    const userId = Number(req.body.userId);
    const categoryId = Number(req.body.categoryId);
    const subCategoryId = Number(req.body.subCategoryId);
    const prompt = req.body.prompt;

    // בדיקה בסיסית לקלט
    if (!userId || !categoryId || !subCategoryId || !prompt) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // קריאה לשירות OpenAI לקבלת "שיעור"
    const lesson = await generateLesson(prompt);

    // יצירת ה-Prompt במסד
    const newPrompt = await prisma.prompt.create({
      data: {
        userId,
        categoryId,
        subCategoryId,
        prompt,
        response: lesson,
      },
    });

    res.status(201).json(newPrompt);
  } catch (error: any) {
    console.error('❌ Error creating prompt:', error);
    res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
};

export const getUserPrompts = async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.userId);
    if (isNaN(userId)) {
      return res.status(400).json({ error: 'Invalid user ID' });
    }

    const prompts = await prisma.prompt.findMany({
      where: { userId },
    });

    res.status(200).json(prompts);
  } catch (error: any) {
    console.error('❌ Error fetching prompts:', error);
    res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
};
