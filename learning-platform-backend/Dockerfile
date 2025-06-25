FROM node:18-bullseye

WORKDIR /app

# התקנת תלויות מערכת
RUN apt-get update && \
    apt-get install -y openssl libssl1.1 netcat && \
    rm -rf /var/lib/apt/lists/*

# העתקת תלויות והתקנתן
COPY package*.json ./
RUN npm install

# העתקת שאר הקוד
COPY . .

# בניית TypeScript (כולל יצירת dist/)
RUN npm run build

# הפעלת Prisma generate לפני seed והרצת השרת
COPY entrypoint.sh ./entrypoint.sh
RUN chmod +x ./entrypoint.sh

CMD ["sh", "./entrypoint.sh"]
