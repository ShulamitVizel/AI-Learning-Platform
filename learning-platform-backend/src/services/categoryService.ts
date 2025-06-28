// src/services/categoryService.ts
import prisma from '../prisma/prismaClient';

// פונקציה לקבלת כל הקטגוריות (כוללת תתי אם רוצים)
export const getAllCategories = async () => {
  const categories = await prisma.category.findMany({
    include: { subCategories: true }
  });
  return categories;
};

// פונקציה לקבלת תתי הקטגוריות עבור קטגוריה מסוימת
export const getSubCategoriesByCategoryId = async (categoryId: number) => {
  const subCategories = await prisma.subCategory.findMany({
    where: { categoryId }
  });
  return subCategories;
};
// פונקציה ליצירת קטגוריה חדשה