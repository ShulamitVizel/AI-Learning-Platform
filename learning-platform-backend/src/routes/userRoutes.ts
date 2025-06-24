import { Router } from 'express';
import { registerUser } from '../controllers/userController';

const router = Router();

router.post('/register', registerUser);

export default router;
// This file defines the user-related routes for the application.
// It imports the necessary controller functions and sets up the routes for user registration.