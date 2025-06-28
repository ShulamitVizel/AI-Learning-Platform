# AI-Driven Learning Platform - Backend

## תיאור הפרויקט
זהו ה-backend עבור מערכת למידה מונחית AI. המערכת מאפשרת למשתמשים:
- הרשמה וניהול משתמשים
- בחירת קטגוריות ותת-קטגוריות ללמידה
- שליחת פרומפט (Prompt) וקבלת תגובה (רמה של לימוד מה-AI)
- אחזור היסטוריית הלמידה של המשתמש

## טכנולוגיות
- Node.js עם Express (TypeScript)
- Prisma ORM לחיבור PostgreSQL
- Docker & Docker Compose
- אינטגרציה עם OpenAI API

## מבנה הפרויקט
learning-platform-backend/ ├── .env                   # משתני סביבה ├── .env.example           # דוגמה למשתני סביבה ├── .dockerignore          # רשימת קבצים לא לחבילה ├── docker-compose.yml     # קובץ Docker Compose ├── Dockerfile             # קובץ Docker לבניית התמונה ├── package.json ├── tsconfig.json ├── README.md              # קובץ זה ├── prisma/ │   └── schema.prisma      # הסכמה עבור Prisma └── src/ ├── config/ ├── controllers/ │   ├── userController.ts │   ├── promptController.ts │   ├── categoryController.ts │   └── subCategoryController.ts    # אופציונלי ├── middleware/ │   ├── errorMiddleware.ts │   └── validateMiddleware.ts         # אופציונלי ├── prisma/ │   └── prismaClient.ts ├── routes/ │   ├── userRoutes.ts │   ├── promptRoutes.ts │   ├── categoryRoutes.ts │   └── subCategoryRoutes.ts          # אופציונלי ├── services/ │   └── openaiService.ts └── index.ts

## הרצת הפרויקט

### מקומית:
1. התקיני את התלויות:
npm install

2. הגדרי קובץ `.env` (ראה `.env.example`).

3. הריצי את המיגרציות:
npx prisma migrate dev --name init npx prisma generate

4. הריצי את השרת:
npm run dev

### עם Docker:
1. ודאי שיש לך Docker מותקן.

2. בהרצת הפקודה:
docker-compose up --build
- זה יריץ את ה-backend ו-מסד הנתונים בו זמנית.

## API Endpoints מרכזיים
- **/api/users/register** – הרשמת משתמש.
- **/api/prompts** – יצירת פרומפט וקבלת תגובה.
- **/api/categories** – ניהול קטגוריות.
- **/api/subcategories** – (אופציונלי) ניהול תתי קטגוריות.

## הערות
- Middleware לטיפול בשגיאות מופעל בכל הנתיבים.
- יש אינטגרציה עם OpenAI באמצעות openaiService.







