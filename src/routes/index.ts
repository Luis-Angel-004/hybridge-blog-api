import { Router } from 'express';
import postRouter from './post.routes.js';
import authRouter from './auth.routes.js';

const router = Router();

router.use('/auth', authRouter);
router.use('/posts', postRouter);

export default router;