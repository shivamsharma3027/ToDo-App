import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001';

// Create axios instance with base config
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  }
});

// Get Tasks
export const getTasks = async () => {
  try {
    const response = await api.get('/tasks');
    return response.data;
  } catch (error) {
    console.error('Error fetching tasks:', error);
    throw error;
  }
};

// Add Task
export const addTask = async (task) => {
  try {
    const response = await api.post('/tasks', task);
    return response.data;
  } catch (error) {
    console.error('Error adding task:', error);
    throw error;
  }
};

// Delete Task
export const deleteTask = async (id) => {
  try {
    await api.delete(`/tasks/${id}`);
    return id; // Return the deleted ID for Redux
  } catch (error) {
    console.error(`Error deleting task ${id}:`, error);
    throw error;
  }
};

// Update Task
export const updateTask = async (task) => {
  try {
    const response = await api.put(`/tasks/${task.id}`, task);
    return response.data;
  } catch (error) {
    console.error(`Error updating task ${task.id}:`, error);
    throw error;
  }
};