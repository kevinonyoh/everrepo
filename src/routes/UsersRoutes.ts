import { Router } from 'express';
import { createUser, getUsers, loginUser } from '../controllers/UserController';
import auth from '../middleware/auth';


const router = Router();

//  router.use(authMiddleware);

router.post('/users', createUser);
router.get('/users', auth, getUsers);
router.post('/login', loginUser);

export default router;
