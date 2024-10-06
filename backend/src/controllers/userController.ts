import { NextFunction, Request, Response } from 'express';
import UserModel from '../models/userModel.js';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '../.env') });

const JWT_SECRET = process.env.JWT_SECRET;

const generateJWTToken = (id: string, JWTSecret: string) =>
    jwt.sign({ id }, JWTSecret, { expiresIn: '5d' });

const registerUser = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        res.status(400);
        next('All fields are mandatory!');
    }
    try {
        const userExist = await UserModel.findOne({ email });
        if (userExist) {
            res.status(400);
            next('User already exist!');
        }

        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);
        const createdUser = await UserModel.create({
            name,
            email,
            password: hashedPassword,
        });

        if (createdUser && JWT_SECRET) {
            res.status(201).json({
                id: createdUser._id,
                email: createdUser.email,
                name: createdUser.name,
                token: generateJWTToken(createdUser._id.toString(), JWT_SECRET),
            });
        } else {
            next('Invalid user data.');
        }
    } catch (e) {
        next('Something is wrong.');
    }
};

const loginUser = async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });
    if (user) {
        const comparePassword = await bcryptjs.compare(password, user.password);
        if (comparePassword && JWT_SECRET) {
            res.status(200).json({
                id: user._id,
                email: user.email,
                name: user.name,
                token: generateJWTToken(user._id.toString(), JWT_SECRET),
            });
        } else {
            res.status(400);
            next('Invalid data.');
        }
    } else {
        next('Something wrong.');
    }
};

const getCurrentUser = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const {
        _id: id,
        name,
        email,
    } = req.user as { _id: string; name: string; email: string };
    res.status(200).json({ id, name, email });
};

export { registerUser, loginUser, getCurrentUser };
