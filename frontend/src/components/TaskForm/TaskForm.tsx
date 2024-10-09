import styles from './TaskForm.module.css';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { createTask } from '../../features/tasks/taskSlice';
import { useNavigate } from 'react-router-dom';
import Spinner from '../Spinner/Spinner';
import { reset } from '../../features/auth/authSlice';

const TaskForm = () => {
  const [text, setText] = useState('');
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isLoading, isSuccess } = useAppSelector((state) => state.tasks);

  useEffect(() => {
    if (isSuccess) {
      navigate('/allTasks');
    }

    return () => {
      dispatch(reset());
    };
  }, [navigate, dispatch, isSuccess]);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(createTask({ text }));
    setText('');
  };
  return isLoading ? (
    <Spinner />
  ) : (
    <section className='form'>
      <form onSubmit={onSubmit}>
        <div className='form-group'>
          <label htmlFor='text'>Task</label>
          <input
            type='text'
            id='text'
            name='text'
            value={text}
            onChange={(e) => {
              setText(e.target.value);
            }}
          />
        </div>
        <button type='submit' className='btn btn-block'>
          Add Task
        </button>
      </form>
    </section>
  );
};
export default TaskForm;
