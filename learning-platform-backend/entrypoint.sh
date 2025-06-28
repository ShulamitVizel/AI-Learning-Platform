#!/bin/sh

echo "⏳ Waiting for DB..."

# בדיקה אם הדאטאבייס מוכן
until nc -z db 5432; do
  echo "❌ DB is unavailable - sleeping"
  sleep 1
done

echo "✅ DB is up - continuing..."

# יצירת לקוח prisma
npx prisma generate

# הפעלת מיגרציות (מדריכה את Prisma ליצור את הטבלאות)
npx prisma migrate deploy

# מילוי נתוני דוגמה
npx ts-node ./src/prisma/seed.ts

# הרצת השרת
echo "🚀 Starting backend server"
exec node dist/index.js  # שנה ל-server.js אם שם הקובץ שונה
