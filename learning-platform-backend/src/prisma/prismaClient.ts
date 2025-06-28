import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default prisma;
// This file initializes a Prisma Client instance that can be used throughout the application.
// It is a singleton instance to avoid multiple connections to the database.