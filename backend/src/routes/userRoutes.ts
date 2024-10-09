import express from 'express';
import {
    getCurrentUser,
    loginUser,
    registerUser,
} from '../controllers/userController.js';
import protect from '../middlewares/authMiddleware.js';

const userRouter = express.Router();

userRouter.post('/', registerUser);

userRouter.post('/login', loginUser);

userRouter.get('/current', protect, getCurrentUser);

export default userRouter;
