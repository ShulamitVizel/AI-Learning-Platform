// src/routes/categoryRoutes.ts
import { Router } from 'express';
import { getAllCategoriesController, getSubCategoriesByCategoryIdController } from '../controllers/categoryController';

const router = Router();

// נתיב לקבלת כל הקטגוריות
router.get('/', getAllCategoriesController);

// נתיב לקבלת תתי-קטגוריות עבור קטגוריה מסוימת לפי מזהה
router.get('/:id/subcategories', getSubCategoriesByCategoryIdController);

export default router;
// This file defines the category-related routes for the application.
// It imports the necessary controller functions and sets up the routes for retrieving all categories and subcategories