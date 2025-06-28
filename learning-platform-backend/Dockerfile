FROM node:18-bullseye

WORKDIR /app

# התקנת תלויות מערכת
RUN apt-get update && \
    apt-get install -y openssl libssl1.1 netcat && \
    rm -rf /var/lib/apt/lists/*

# העתקת package.json והתקנת תלויות
COPY package*.json ./
RUN npm install

# העתקת כל שאר הקבצים כולל src/, prisma/, entrypoint.sh
COPY . .

# בניית TypeScript
RUN npm run build

# הפיכת סקריפט ל־executable
RUN chmod +x entrypoint.sh

CMD ["./entrypoint.sh"]
