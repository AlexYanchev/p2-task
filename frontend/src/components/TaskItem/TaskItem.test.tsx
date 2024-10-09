import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import TaskItem from './TaskItem';

describe('TaskItem', () => {
  const task = {
    _id: 'task-test',
    createdAt: '2023-07-09T10:00:00',
    updatedAt: '2023-07-09T10:00:00',
    text: 'Learn',
    user: 'any',
  };

  const mockStore = configureStore([]);
  const store = mockStore({});

  test('render task details correctly', () => {
    render(
      <Provider store={store}>
        <TaskItem task={task} />
      </Provider>
    );
    expect(screen.getByText(task.text)).toBeInTheDocument();
    expect(
      screen.getByText(new Date(task.createdAt).toLocaleString('ru-RU'))
    ).toBeInTheDocument();
  });
});
