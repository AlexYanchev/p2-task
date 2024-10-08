import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import taskReducer from '../features/tasks/taskSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    tasks: taskReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;

export default store;
