import { Router } from 'express';
import { createPrompt, getUserPrompts, getAllPrompts } from '../controllers/promptController';
import { protect, requireAdminByRole } from '../middleware/authMiddleware';

const router = Router();

router.post('/', protect, createPrompt);
router.get('/user/:userId', protect, getUserPrompts);
router.get('/admin/all', protect, requireAdminByRole, getAllPrompts);

export default router;
