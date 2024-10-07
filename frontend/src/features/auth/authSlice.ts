import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authService from './authService';
import { RegisterUserData } from 'backend/src/types/app/users';

const localStorageUser = localStorage.getItem('user');

const localUser = localStorageUser ? JSON.parse(localStorageUser) : null;

const initialState = {
  user: localUser,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

export const register = createAsyncThunk(
  'auth/register',
  async (user: RegisterUserData, thunkAPI) => {
    try {
      return await authService.register(user);
    } catch (e: any) {
      const message =
        (e.response && e.response.data && e.response.data.message) ||
        e.message ||
        e.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    reset: (state) => {
      state.isError = false;
      state.isSuccess = false;
      state.isLoading = false;
      state.message = '';
    },
  },
  extraReducers: (builder) => {
    builder.addCase(register.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(register.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.user = action.payload;
    });
    builder.addCase(register.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload as string;
      state.user = null;
    });
  },
});

export const { reset } = authSlice.actions;
const authReducer = authSlice.reducer;
export default authReducer;
