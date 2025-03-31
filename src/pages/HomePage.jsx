import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import TaskInput from '../components/Tasks/TaskInput';
import LogoutButton from '../components/Auth/LogoutButton';
import { Link } from 'react-router-dom';
import TaskListWithFilter from '../components/Tasks/TaskListWithFilter.jsx';
import { Menu, X } from 'lucide-react';

const HomePage = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-blue-300 p-4 font-[Poppins] sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-xl overflow-hidden">
        {/* Header Section */}
        <div className="flex justify-between items-center p-6 sm:p-8 border-b border-blue-100">
          <h1 className="text-2xl font-bold text-blue-600 sm:text-3xl md:text-4xl">To-Do List</h1>
          
          {/* Desktop Logout Button */}
          {isLoggedIn && (
            <div className="hidden sm:block">
              <LogoutButton className="px-4 py-2 text-sm sm:text-base" />
            </div>
          )}

          {/* Mobile Hamburger Button */}
          {isLoggedIn && (
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)} 
              className="sm:hidden p-2 text-blue-600 rounded-md hover:bg-blue-50 transition-colors"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          )}
        </div>

        {/* Mobile Menu */}
        {isLoggedIn && isMenuOpen && (
          <div className="sm:hidden bg-blue-50 px-6 py-4 flex flex-col space-y-3">
            <div className="flex justify-end">
              <LogoutButton className="w-full max-w-xs" />
            </div>
          </div>
        )}

        {/* Main Content */}
        <div className="p-6 sm:p-8 md:p-10">
          {isLoggedIn ? (
            <>
              {/* Task Input Section - Always visible except when mobile menu is open */}
              {(!isMenuOpen || window.innerWidth >= 640) && (
                <div className="mb-8 sm:mb-10">
                  <TaskInput />
                </div>
              )}

              {/* Task List Section */}
              <div className="mt-2 sm:mt-4">
                <TaskListWithFilter />
              </div>
            </>
          ) : (
            <div className="text-center py-10 sm:py-14 md:py-16">
              <h2 className="text-lg text-gray-700 mb-5 sm:text-xl sm:mb-6">
                Please sign in to manage your tasks.
              </h2>
              <Link to="/login">
                <button className="px-6 py-3 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition-all duration-200 hover:shadow-lg sm:px-8">
                  Sign In
                </button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;