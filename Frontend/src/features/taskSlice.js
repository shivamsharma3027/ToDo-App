import { createSlice } from '@reduxjs/toolkit';
import { getTasks, addTask, deleteTask, updateTask } from '../api/apiService';

const initialState = {
  tasks: [],
  loading: false,
  error: null
};

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    setTasks(state, action) {
      state.tasks = action.payload;
      state.loading = false;
      state.error = null;
    },
    addTaskSuccess(state, action) {
      state.tasks.push(action.payload);
      state.loading = false;
      state.error = null;
    },
    deleteTaskSuccess(state, action) {
      state.tasks = state.tasks.filter(task => task.id !== action.payload);
      state.loading = false;
      state.error = null;
    },
    updateTaskSuccess(state, action) {
      const index = state.tasks.findIndex(task => task.id === action.payload.id);
      if (index !== -1) {
        state.tasks[index] = action.payload;
      }
      state.loading = false;
      state.error = null;
    },
    taskRequest(state) {
      state.loading = true;
      state.error = null;
    },
    taskFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    }
  }
});

export const { 
  setTasks, 
  addTaskSuccess, 
  deleteTaskSuccess, 
  updateTaskSuccess,
  taskRequest,
  taskFailure
} = taskSlice.actions;

export const fetchTasks = () => async (dispatch) => {
  try {
    dispatch(taskRequest());
    const tasks = await getTasks();
    dispatch(setTasks(tasks));
  } catch (error) {
    dispatch(taskFailure(error.message));
  }
};

export const createTask = (task) => async (dispatch) => {
  try {
    dispatch(taskRequest());
    const newTask = await addTask(task);
    dispatch(addTaskSuccess(newTask));
  } catch (error) {
    dispatch(taskFailure(error.message));
  }
};

export const removeTask = (id) => async (dispatch) => {
  try {
    dispatch(taskRequest());
    await deleteTask(id);
    dispatch(deleteTaskSuccess(id));
  } catch (error) {
    dispatch(taskFailure(error.message));
    // Optionally: Show a notification to the user
  }
};

export const modifyTask = (task) => async (dispatch) => {
  try {
    dispatch(taskRequest());
    const updatedTask = await updateTask(task);
    dispatch(updateTaskSuccess(updatedTask));
  } catch (error) {
    dispatch(taskFailure(error.message));
  }
};

export default taskSlice.reducer;