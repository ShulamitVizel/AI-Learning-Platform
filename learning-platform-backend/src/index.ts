import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import morgan from 'morgan';
dotenv.config();

import userRoutes from './routes/userRoutes';
import promptRoutes from './routes/promptRoutes';
import categoryRoutes from './routes/categoryRoutes';

import { errorHandler,notFoundHandler } from './middleware/errorMiddleware';

const app = express();
const port = process.env.PORT || 5000;

// Middlewares
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

// Routes
app.use('/api/users', userRoutes);
app.use('/api/prompts', promptRoutes);
app.use('/api/categories', categoryRoutes);

// Fallback for 404
app.use(notFoundHandler);

// Error handling
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
