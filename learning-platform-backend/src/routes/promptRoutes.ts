import { Router } from 'express';
import { createPrompt, getUserPrompts } from '../controllers/promptController';

const router = Router();

router.post('/', createPrompt);
router.get('/user/:userId', getUserPrompts);

export default router;
// This file defines the prompt-related routes for the application.
// It imports the necessary controller functions and sets up the routes for creating prompts and retrieving user prompts