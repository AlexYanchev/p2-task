import jwt, { JwtPayload } from 'jsonwebtoken';
import UserModel from '../models/userModel.js';
import { NextFunction, Request, Response } from 'express';

const protect = async (req: Request, res: Response, next: NextFunction) => {
    let token;
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer') &&
        process.env.JWT_SECRET
    ) {
        try {
            token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(
                token,
                process.env.JWT_SECRET
            ) as JwtPayload;
            req.user = await UserModel.findById(decoded.id).select('-password');
            if (!req.user) {
                res.status(401);
                next('You are not auth');
            }
            next();
        } catch (e) {
            console.log(e);
            res.status(401);
            next('You are not auth!');
        }
    }

    if (!token) {
        console.log('No token');
        res.status(401);
        next('Not auth, no token');
    }
};

export default protect;
