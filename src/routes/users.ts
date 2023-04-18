import express, { RequestHandler } from 'express';
import * as UsersController from '../controllers/users';
import authenticateToken from '../middleware/authenticate-token';
import imageUpload from '../middleware/image-upload';

const router = express.Router();

router.post('/register', imageUpload, UsersController.registerUser);
router.post('/login', UsersController.loginUser);
router.delete('/:userId', authenticateToken, UsersController.deleteUser);

export default router;
