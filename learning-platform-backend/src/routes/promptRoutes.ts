
import { Router } from 'express';
import { createPrompt, getUserPrompts, searchPrompts } from '../controllers/promptController';
import { protect, requireAdminByRole } from '../middleware/authMiddleware';

const router = Router();

router.post('/', protect, createPrompt);
router.get('/user/:userId', protect, getUserPrompts);
router.get('/admin/search', protect, requireAdminByRole, searchPrompts);

export default router;
