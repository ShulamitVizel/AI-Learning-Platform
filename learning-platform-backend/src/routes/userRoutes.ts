import { Router } from 'express';
import { registerUser, getAllUsers } from '../controllers/userController';
import { protect, adminOnly } from '../middleware/authMiddleware';

const router = Router();

// רישום משתמש חדש
router.post('/register', registerUser);

// שליפת כל המשתמשים - למנהלים בלבד
router.get('/', protect, adminOnly);

export default router;
