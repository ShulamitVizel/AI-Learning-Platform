FROM node:18-slim

WORKDIR /app

RUN apt-get update && apt-get install -y openssl netcat-openbsd && rm -rf /var/lib/apt/lists/*

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

CMD ["sh", "-c", "npx prisma generate && npx prisma migrate deploy && npm run seed && npm run start"]
