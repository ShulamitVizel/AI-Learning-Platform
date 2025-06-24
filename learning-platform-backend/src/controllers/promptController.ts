import { Request, Response } from 'express';
import prisma from '../prisma/prismaClient';
import { generateLesson } from '../services/openaiService';

export const createPrompt = async (req: Request, res: Response) => {
  try {
    const { userId, categoryId, subCategoryId, prompt } = req.body;

    // קריאה לשירות OpenAI לקבלת "שיעור" המתאים לקלט המשתמש
    const lesson = await generateLesson(prompt);

    const newPrompt = await prisma.prompt.create({
      data: {
        userId,
        categoryId,
        subCategoryId,
        prompt,
        response: lesson
      }
    });

    res.status(201).json(newPrompt);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getUserPrompts = async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.userId);
    const prompts = await prisma.prompt.findMany({
      where: { userId }
    });
    res.status(200).json(prompts);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
