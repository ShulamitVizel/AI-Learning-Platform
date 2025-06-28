FROM node:20-alpine

# מוסיף ספריות נדרשות ל-Prisma על Alpine
RUN apk update && apk add --no-cache openssl libc6-compat

# הגדרת תיקיית עבודה
WORKDIR /app

# התקנת תלויות
COPY package*.json ./
RUN npm install

# העתקת כל שאר הקוד
COPY . .

# בניית קוד TypeScript
RUN npm run build

# פתיחת הפורט
EXPOSE 5000

# הרצת השרת
CMD ["npm", "start"]
