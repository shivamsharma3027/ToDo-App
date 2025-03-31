// Validate username and password
export const validateLogin = (username, password) => {
  if (!username || !password) {
    return 'Username and password are required.';
  }
  if (username.length < 3) {
    return 'Username must be at least 3 characters long.';
  }
  if (password.length < 5) {
    return 'Password must be at least 5 characters long.';
  }
  return null;
};

// Validate task input
export const validateTask = (task, priority) => {
  if (!task.trim()) {
    return 'Task cannot be empty.';
  }
  if (!['High', 'Medium', 'Low'].includes(priority)) {
    return 'Invalid priority. Choose High, Medium, or Low.';
  }
  return null;
};
