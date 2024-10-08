import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import taskService from './taskService';
import { CreateTaskData } from 'backend/src/types/app/tasks';
import { RootState } from '../../store/store';

type InitialState = {
  tasks: Array<any>;
  isError: boolean;
  isLoading: boolean;
  isSuccess: boolean;
  isDeleted: boolean;
  message: string;
};

const initialState: InitialState = {
  tasks: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  isDeleted: false,
  message: '',
};

export const createTask = createAsyncThunk(
  'tasks/create',
  async (taskData: CreateTaskData, thunkAPI) => {
    try {
      const state = thunkAPI.getState() as RootState;
      const token = state.auth.user.token;
      return await taskService.createTask(taskData, token);
    } catch (e: any) {
      const message =
        (e.response && e.response.data && e.response.data.message) ||
        e.message ||
        e.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getAllTasks = createAsyncThunk(
  'tasks/getAll',
  async (_, thunkAPI) => {
    try {
      const state = thunkAPI.getState() as RootState;
      const token = state.auth.user.token;
      return await taskService.getAllTasks(token);
    } catch (e: any) {
      const message =
        (e.response && e.response.data && e.response.data.message) ||
        e.message ||
        e.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const deleteTask = createAsyncThunk(
  'tasks/deleteTask',
  async (idTask: string, thunkAPI) => {
    try {
      const state = thunkAPI.getState() as RootState;
      const token = state.auth.user.token;
      return await taskService.deleteTask(idTask, token);
    } catch (e: any) {
      const message =
        (e.response && e.response.data && e.response.data.message) ||
        e.message ||
        e.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    reset: (state) => initialState,
    resetFlags: (state) => {
      state.isDeleted = false;
      state.isError = false;
      state.isLoading = false;
      state.isSuccess = false;
    },
    resetIsDeletedFlag: (state) => {
      state.isDeleted = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createTask.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(createTask.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.tasks.push(action.payload);
    });
    builder.addCase(createTask.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload as string;
      state.tasks = [];
    });

    builder.addCase(getAllTasks.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getAllTasks.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.tasks = action.payload.tasks;
    });
    builder.addCase(getAllTasks.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload as string;
    });

    builder.addCase(deleteTask.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(deleteTask.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isDeleted = true;
      state.tasks = state.tasks.filter(
        (task) => task._id !== action.payload.idTask
      );
    });
    builder.addCase(deleteTask.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload as string;
    });
  },
});

export const { reset, resetIsDeletedFlag, resetFlags } = taskSlice.actions;
const taskReducer = taskSlice.reducer;
export default taskReducer;
