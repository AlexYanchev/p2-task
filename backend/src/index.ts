import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import path from 'path';
import taskRouter from './routes/taskRoutes.js';
import userRouter from './routes/userRoutes.js';
import { errorHandler } from './middlewares/errorMiddleware.js';
import connectMongoDB from './connect/database.js';
import cors from 'cors';

dotenv.config({ path: path.resolve(process.cwd(), '../../.env') });

connectMongoDB(process.env.MONGO_URI || '');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(
    cors({
        origin: ['https://tangerine-madeleine-cb4275.netlify.app'],
    })
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/tasks', taskRouter);
app.use('/api/users', userRouter);

app.use(errorHandler);

app.listen(PORT, () => {
    console.log('Server is runnig on', PORT);
});
