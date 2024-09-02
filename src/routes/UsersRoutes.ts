import { Router } from 'express';
import { createUser, getUsers } from '../controllers/UserController';
import { authMiddleware } from '../middleware/auth';

const router = Router();

//  router.use(authMiddleware);

router.post('/users', createUser);
router.get('/users', getUsers);

export default router;
