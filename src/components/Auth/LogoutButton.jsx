import React from 'react';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../../features/authSlice';
import { useNavigate } from 'react-router-dom';
import { LogOut } from 'lucide-react';

const LogoutButton = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate('/login');
  };

  return (
    <div className="relative group">
      <button
        onClick={handleLogout}
        className="flex items-center space-x-2 px-4 py-2.5 bg-white text-rose-500 rounded-xl border border-rose-200 shadow-sm hover:shadow-md transition-all duration-200 hover:bg-rose-50 hover:border-rose-300 focus:outline-none focus:ring-2 focus:ring-rose-100"
      >
        <div className="p-1.5 bg-rose-100 rounded-lg">
          <LogOut className="w-4 h-4 text-rose-600" />
        </div>
        <span className="font-medium text-sm">Sign Out</span>
      </button>
      
      {/* Elegant tooltip */}
      <div className="absolute -top-9 left-1/2 transform -translate-x-1/2 bg-gray-700 text-white text-xs font-normal py-1.5 px-2.5 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-150 pointer-events-none shadow-sm z-10 whitespace-nowrap">
         logout
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full w-2 h-2 bg-gray-700 rotate-45"></div>
      </div>
    </div>
  );
};

export default LogoutButton;