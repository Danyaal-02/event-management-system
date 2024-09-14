import express from 'express';
import { getCurrentUser, updateUser, getUsers } from '../controllers/userController.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.get('/me', auth, getCurrentUser);
router.put('/me', auth, updateUser);
router.get('/', auth, getUsers);

export default router;
