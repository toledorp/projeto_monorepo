import { Router } from 'express';
import { AuthController } from '../controllers/AuthController';

const router = Router();

// Rot publica
router.post('/login', AuthController.login);

export { router as authRoutes };
