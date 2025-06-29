import { Router } from 'express';
import { registerUser, getAllUsers } from '../controllers/userController';
import { protect, requireAdminByRole } from '../middleware/authMiddleware';

const router = Router();

router.post('/register', registerUser);
router.get('/', protect, requireAdminByRole, getAllUsers);

export default router;
