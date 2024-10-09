import express, { Request, Response } from 'express';
import {
    getTasks,
    createTask,
    updateTask,
    deleteTask,
} from '../controllers/taskController.js';
import protect from '../middlewares/authMiddleware.js';

const taskRouter = express.Router();

taskRouter.get('/', protect, getTasks);

taskRouter.post('/', protect, createTask);

taskRouter.put('/:id', protect, updateTask);

taskRouter.delete('/:id', protect, deleteTask);

export default taskRouter;
