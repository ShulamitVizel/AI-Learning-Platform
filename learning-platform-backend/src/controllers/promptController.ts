import { Request, Response } from 'express';
import prisma from '../prisma/prismaClient';
import { generateLesson } from '../services/openaiService';

// יצירת פרומפט חדש
export const createPrompt = async (req: Request, res: Response) => {
  try {
    console.log('📦 Incoming createPrompt request:', req.body);

    const userId = Number(req.body.userId);
    const categoryId = Number(req.body.categoryId);
    const subCategoryId = Number(req.body.subCategoryId);
    const prompt = req.body.prompt;

    // בדיקת שדות חובה
    if (!userId || !categoryId || !subCategoryId || !prompt) {
      console.warn('⚠️ Missing required fields');
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // בדיקת קיום המשתמש
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      console.warn(`🚫 User with ID ${userId} not found`);
      return res.status(404).json({ error: 'User not found' });
    }

    // שליחת הפרומפט ל־OpenAI
    let lesson = '';
    try {
      console.log('🧠 Generating lesson from AI...');
      lesson = await generateLesson(prompt);
      console.log('✅ AI responded with lesson.');
    } catch (openaiError) {
      console.error('❌ Error from OpenAI:', openaiError);
      return res.status(500).json({ error: 'AI generation failed' });
    }

    // שמירה במסד נתונים
    const newPrompt = await prisma.prompt.create({
      data: {
        userId,
        categoryId,
        subCategoryId,
        prompt,
        response: lesson,
      },
    });

    console.log('✅ Prompt saved successfully:', newPrompt.id);
    res.status(201).json(newPrompt);
  } catch (error: any) {
    console.error('🔥 General error in createPrompt:', error);
    res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
};

// שליפת ההיסטוריה של משתמש
export const getUserPrompts = async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.userId);
    console.log(`📥 Fetching prompts for user ID: ${userId}`);

    if (isNaN(userId)) {
      console.warn('⚠️ Invalid user ID format');
      return res.status(400).json({ error: 'Invalid user ID' });
    }

    const prompts = await prisma.prompt.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });

    console.log(`✅ Found ${prompts.length} prompts for user ${userId}`);
    res.status(200).json(prompts);
  } catch (error: any) {
    console.error('❌ Error fetching user prompts:', error);
    res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
};

// חיפוש בפרומפטים לפי מחרוזת ותאריך
export const searchPrompts = async (req: Request, res: Response) => {
  const { query, date } = req.query;
  const whereClause: any = {};

  console.log('🔍 Search query:', { query, date });

  if (query && typeof query === 'string') {
    whereClause.OR = [
      { prompt: { contains: query, mode: 'insensitive' } },
      { response: { contains: query, mode: 'insensitive' } },
    ];
  }

  if (date && typeof date === 'string') {
    const parsedDate = new Date(date);
    if (!isNaN(parsedDate.getTime())) {
      const start = new Date(parsedDate);
      start.setHours(0, 0, 0, 0);

      const end = new Date(parsedDate);
      end.setHours(23, 59, 59, 999);

      whereClause.createdAt = {
        gte: start,
        lte: end,
      };
    } else {
      console.warn('⚠️ Invalid date format:', date);
    }
  }

  try {
    const results = await prisma.prompt.findMany({
      where: whereClause,
      include: {
        user: true,
        category: true,
        subCategory: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    console.log(`✅ Found ${results.length} prompts matching search`);
    res.status(200).json(results);
  } catch (error: any) {
    console.error('❌ Error in searchPrompts:', error);
    res.status(500).json({ error: 'Server error', details: error.message });
  }
};
