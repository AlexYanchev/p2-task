import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import path from 'path';
import taskRouter from './routes/taskRoutes.js';

dotenv.config({ path: path.resolve(process.cwd(), '../.env') });

const PORT = process.env.PORT || 3001;
const app = express();

app.use('/api/tasks', taskRouter);

app.listen(PORT, () => {
  console.log('Server is runnig on', PORT);
});
