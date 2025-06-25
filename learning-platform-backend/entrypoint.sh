#!/bin/sh

echo "⏳ Waiting for DB..."

until nc -z db 5432; do
  echo "❌ DB is unavailable - sleeping"
  sleep 1
done

echo "✅ DB is up - continuing..."

# בניית prisma client
npx prisma generate

# הרצת מיגרציות
npx prisma migrate deploy

# הרצת seed
npx ts-node ./src/prisma/seed.ts

# הרצת השרת
echo "🚀 Starting backend server"
exec node dist/index.js
