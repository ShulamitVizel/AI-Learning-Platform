// src/controllers/categoryController.ts
import { Request, Response } from 'express';
import { getAllCategories, getSubCategoriesByCategoryId } from '../services/categoryService';

// קריאה לקבלת כל הקטגוריות
export const getAllCategoriesController = async (req: Request, res: Response): Promise<void> => {
  try {
    const categories = await getAllCategories();
    res.status(200).json(categories);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// קריאה לקבלת תתי-קטגוריות על פי מזהה קטגוריה
export const getSubCategoriesByCategoryIdController = async (req: Request, res: Response): Promise<void> => {
  try {
    const categoryId = Number(req.params.id);
    if (isNaN(categoryId)) {
      res.status(400).json({ error: 'Invalid category ID' });
      return;
    }
    const subCategories = await getSubCategoriesByCategoryId(categoryId);
    res.status(200).json(subCategories);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
