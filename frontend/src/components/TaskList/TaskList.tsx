import styles from './TaskList.module.css';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import {
  getAllTasks,
  reset,
  resetFlags,
  resetIsDeletedFlag,
} from '../../features/tasks/taskSlice';
import Spinner from '../Spinner/Spinner';
import TaskItem from '../TaskItem/TaskItem';
import { toast } from 'react-toastify';

const TaskList = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { tasks, isError, isLoading, message, isSuccess, isDeleted } =
    useAppSelector((state) => state.tasks);

  useEffect(() => {
    if (isDeleted) {
      toast.success('Task deleted');
      dispatch(resetIsDeletedFlag());
    }
  }, [isDeleted, dispatch]);

  useEffect(() => {
    if (isSuccess) {
      dispatch(resetFlags());
    }
  }, [isSuccess, dispatch]);

  useEffect(() => {
    if (isError) console.log(message);
    dispatch(getAllTasks());

    return () => {
      dispatch(reset());
    };
  }, [navigate, dispatch, isError, message]);

  return isLoading ? (
    <Spinner />
  ) : (
    <section className='content'>
      {tasks.length && (
        <div className='goals'>
          {tasks.map((task) => (
            <TaskItem key={task._id} task={task} />
          ))}
        </div>
      )}
    </section>
  );
};
export default TaskList;
