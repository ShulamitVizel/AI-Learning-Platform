#!/bin/sh

echo "⏳ Waiting for DB..."

until nc -z db 5432; do
  echo "❌ DB is unavailable - sleeping"
  sleep 1
done

echo "✅ DB is up - continuing..."

# ניצור את Prisma Client לפי המיקום שלך
npx prisma generate --schema=src/prisma/schema.prisma

# נפעיל את המיגרציות לפי המיקום שלך
npx prisma migrate deploy --schema=src/prisma/schema.prisma

# סיד נתונים
npx ts-node src/prisma/seed.ts

# נתחיל את השרת
echo "🚀 Starting backend server"
exec node dist/index.js
