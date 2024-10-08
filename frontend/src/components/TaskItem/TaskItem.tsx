import styles from './TaskItem.module.css';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { ReturnedTaskData } from 'backend/src/types/app/tasks';
import { FC, useEffect } from 'react';
import { deleteTask, resetIsDeletedFlag } from '../../features/tasks/taskSlice';
import { toast } from 'react-toastify';

type Props = {
  task: ReturnedTaskData;
};

const TaskItem: FC<Props> = ({ task }) => {
  const dispatch = useAppDispatch();

  return (
    <div className='goal'>
      <button className='close' onClick={(e) => dispatch(deleteTask(task._id))}>
        X
      </button>
      <div>{new Date(task.createdAt).toLocaleString('ru-RU')}</div>
      <h2>{task.text}</h2>
    </div>
  );
};
export default TaskItem;
