
// This file defines the prompt-related routes for the application.
// It imports the necessary controller functions and sets up the routes for creating prompts and retrieving user prompts
import { Router } from 'express';
import { createPrompt, getUserPrompts } from '../controllers/promptController';
import { protect } from '../middleware/authMiddleware';

const router = Router();

// נדרש טוקן תקני ליצירת prompt
router.post('/', protect, createPrompt);

// נדרש טוקן תקני לצפייה בהיסטוריית prompt (רק של עצמו)
router.get('/user/:userId', protect, getUserPrompts);

export default router;
