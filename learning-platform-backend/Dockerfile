FROM node:20-alpine

# התקנת ספריות דרושות
RUN apk update && apk add --no-cache openssl libc6-compat

WORKDIR /app

# התקנת תלויות
COPY package*.json ./
RUN npm install

# העתקת כל הפרויקט
COPY . .

# הרצת Prisma Generate כחלק מהבנייה!
RUN npx prisma generate --schema=./src/prisma/schema.prisma

# בניית TypeScript
RUN npm run build

EXPOSE 5000

CMD ["npm", "start"]
