#!/bin/bash

# עצירת קונטיינר ה-backend אם רץ
echo "🛑 Stopping backend container (if running)..."
docker compose stop backend

# הפעלת Prisma Migrate
echo "📦 Running Prisma migrate..."
docker compose exec backend npx prisma migrate dev --name sync-schema

# בניית Prisma Client
echo "⚙️ Generating Prisma Client..."
docker compose exec backend npx prisma generate

# קומפילציה של TypeScript
echo "🛠 Building TypeScript project..."
docker compose exec backend npm run build

# הפעלת ה-backend מחדש
echo "🚀 Restarting backend..."
docker compose up -d backend

echo "✅ Done! Check logs with: docker compose logs -f backend"