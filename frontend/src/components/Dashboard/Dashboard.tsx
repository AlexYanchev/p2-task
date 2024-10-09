import styles from './Dashboard.module.css';
import { useEffect } from 'react';
import { useAppSelector } from '../../hooks/redux';
import { useNavigate } from 'react-router-dom';
import TaskForm from '../TaskForm/TaskForm';

const Dashboard = () => {
  const navigate = useNavigate();
  const { user } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (!user) navigate('/login');
  }, [user, navigate]);

  return (
    <>
      <section className='heading'>
        <h1>Welcome {user && user.name}</h1>
        <div className={styles.checkTasksContainer}>
          <button
            type='button'
            className='btn'
            onClick={(e) => {
              navigate('/allTasks');
            }}
          >
            Check Tasks
          </button>
        </div>

        <p>Dashboard</p>
      </section>
      <TaskForm />
    </>
  );
};
export default Dashboard;
