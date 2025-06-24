# Dockerfile בתוך learning-platform-backend
FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# ✅ בשורה הבאה חובה לציין את הנתיב המלא לסכמה:
RUN npx prisma generate --schema=./src/prisma/schema.prisma
# ✅ בשורה הבאה חובה לציין את הנתיב המלא לקובץ ה-Seed:
COPY seed.ts ./seed.ts
RUN npm run build

CMD ["sh", "-c", "npx prisma migrate deploy --schema=./src/prisma/schema.prisma && npx ts-node seed.ts && node dist/index.js"]

