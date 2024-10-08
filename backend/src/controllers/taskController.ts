import { NextFunction, Request, Response } from 'express';
import TaskModel from '../models/taskModel.js';

const getTasks = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const tasks = await TaskModel.find({ user: req.user!.id });
        res.status(200).json({ tasks });
    } catch (e) {
        res.status(400);
        next('Error to find all tasks');
    }
};

const createTask = async (req: Request, res: Response, next: NextFunction) => {
    if (!req.body.text) {
        res.status(400);
        next('Please enter a task.');
    }

    try {
        const task = await TaskModel.create({
            text: req.body.text,
            user: req.user!.id,
        });
        res.status(200).json(task);
    } catch (e) {
        res.status(400);
        next('Error by create task.');
    }
};

const updateTask = async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    try {
        const updatedTask = await TaskModel.findOneAndUpdate(
            { _id: id, user: req.user!.id },
            {
                text: req.body.text,
            },
            { new: true }
        );
        if (!updatedTask) {
            res.status(401);
            next('Task cannot be updated.');
        } else {
            res.status(200).json(updatedTask);
        }
    } catch (e) {
        res.status(400);
        next('Error by updated task.');
    }
};

const deleteTask = async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    try {
        const deletedTask = await TaskModel.findOneAndDelete({
            _id: id,
            user: req.user!.id,
        });

        if (!deletedTask) {
            res.status(401);
            next('Task cannot be deleted.');
        } else {
            res.status(200).json({
                success: true,
                idTask: deletedTask._id,
                message: `Task ${deletedTask._id} deleted.`,
            });
        }
    } catch (e) {
        res.status(400);
        next('Error by deleted task.');
    }
};

export { getTasks, createTask, updateTask, deleteTask };
