// src/routes/categoryRoutes.ts
import { Router } from 'express';
import { getAllCategoriesController, getSubCategoriesByCategoryIdController, createCategory, createSubCategory } from '../controllers/categoryController';

const router = Router();

// נתיב לקבלת כל הקטגוריות
router.get('/', getAllCategoriesController);

// נתיב לקבלת תתי-קטגוריות עבור קטגוריה מסוימת לפי מזהה
router.get('/:id/subcategories', getSubCategoriesByCategoryIdController);
router.post('/', createCategory);
router.post('/subcategories', createSubCategory);
export default router;
