import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { performLogin } from '../../features/authSlice';
import { validateLogin } from '../../utils/validate';
import { MESSAGES } from '../../utils/constants';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const error = useSelector((state) => state.auth.error);
  
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    const validationError = validateLogin(username, password);
    if (validationError) {
      alert(validationError);
      return;
    }

    dispatch(performLogin(username, password));
    if (!error) {
      alert(MESSAGES.LOGIN_SUCCESS);
      navigate('/home');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold mb-6">Login</h1>
      <input
        type="text"
        placeholder="Username"
        className="border p-2 rounded mb-4 w-80"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        className="border p-2 rounded mb-4 w-80"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button
        className="bg-black text-white py-2 px-4 rounded"
        onClick={handleLogin}
      >
        Login
      </button>
      {error && <p className="text-red-500 mt-4">{error}</p>}
    </div>
  );
};

export default Login;
