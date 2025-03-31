import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createTask } from '../../features/taskSlice';
import { getWeather } from '../../api/weatherService.js';
import { Plus, X, MapPin, ChevronDown, Flag, Zap, Flame, Circle } from 'lucide-react';

const TaskInput = () => {
  const [task, setTask] = useState('');
  const [priority, setPriority] = useState('Medium');
  const [isOutdoor, setIsOutdoor] = useState(false);
  const [city, setCity] = useState('');
  const [showForm, setShowForm] = useState(false);
  const dispatch = useDispatch();

  const handleAddTask = async () => {
    if (!task.trim()) return alert('Task cannot be empty!');
    
    let weatherDetails = '';
    if (isOutdoor && city.trim()) {
      try {
        const weatherData = await getWeather(city);
        weatherDetails = `${weatherData.weather[0].main}, ${Math.round(weatherData.main.temp)}°C`;
      } catch (error) {
        weatherDetails = 'Weather unavailable';
      }
    } else if (isOutdoor && !city.trim()) {
      return alert('Please enter a city to fetch weather data!');
    }

    const capitalizeCity = (city) => city.charAt(0).toUpperCase() + city.slice(1).toLowerCase();
    dispatch(createTask({ 
      task, 
      priority, 
      isOutdoor, 
      city: capitalizeCity(city), 
      weatherInfo: weatherDetails 
    }));

    setTask('');
    setPriority('Medium');
    setIsOutdoor(false);
    setCity('');
    setShowForm(false);
  };

  const renderPriorityIcon = (priority) => {
    switch(priority) {
      case 'High': return <Flame className="w-4 h-4 text-red-500" />;
      case 'Medium': return <Zap className="w-4 h-4 text-amber-500" />;
      default: return <Circle className="w-4 h-4 text-emerald-500" />;
    }
  };

  return (
    <div className="max-w-md mx-auto mb-8">
      {!showForm ? (
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center space-x-2 px-4 py-2.5 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-all duration-200 shadow-sm hover:shadow-md"
        >
          <Plus className="w-5 h-5" />
          <span className="text-sm font-medium tracking-wide">New Task</span>
        </button>
      ) : (
        <div className="p-6 bg-white rounded-xl shadow-lg border border-gray-100 transform transition-all duration-200">
          <div className="flex justify-between items-center mb-5">
            <h3 className="text-xl font-semibold text-gray-800 flex items-center">
              <Plus className="w-5 h-5 text-indigo-600 mr-2" />
              Create Task
            </h3>
            <button 
              onClick={() => setShowForm(false)}
              className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-500 transition-colors"
              aria-label="Close form"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="space-y-5">
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">Task Name</label>
              <input
                type="text"
                placeholder="e.g. Buy groceries, Call client"
                value={task}
                onChange={(e) => setTask(e.target.value)}
                className="w-full px-4 py-3 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-200 focus:border-indigo-300 placeholder-gray-400"
                autoFocus
              />
            </div>

            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">Priority</label>
              <div className="relative">
                <select
                  value={priority}
                  onChange={(e) => setPriority(e.target.value)}
                  className="w-full pl-10 pr-8 py-3 text-sm border border-gray-200 rounded-lg appearance-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-300 bg-white"
                >
                  <option>High</option>
                  <option>Medium</option>
                  <option>Low</option>
                </select>
                <div className="absolute left-3 top-3.5">
                  {renderPriorityIcon(priority)}
                </div>
                <ChevronDown className="absolute right-3 top-3.5 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>
            </div>

            <div className="flex items-center space-x-3 p-3.5 bg-gray-50 rounded-lg border border-gray-200">
              <input
                type="checkbox"
                id="outdoor-activity"
                checked={isOutdoor}
                onChange={(e) => setIsOutdoor(e.target.checked)}
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <label htmlFor="outdoor-activity" className="text-sm font-medium text-gray-700">
                Outdoor Activity
              </label>
            </div>

            {isOutdoor && (
              <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-700">Location</label>
                <div className="flex items-center space-x-2 bg-gray-50 px-4 py-3 rounded-lg border border-gray-200 focus-within:ring-2 focus-within:ring-indigo-200 focus-within:border-indigo-300">
                  <MapPin className="text-gray-500 w-5 h-5 flex-shrink-0" />
                  <input
                    type="text"
                    placeholder="e.g. New York, London"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full bg-transparent focus:outline-none text-sm placeholder-gray-400"
                  />
                </div>
              </div>
            )}
          </div>

          <div className="flex space-x-3 mt-6 pt-2">
            <button
              onClick={handleAddTask}
              className="flex-1 flex items-center justify-center py-3 px-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors text-sm font-medium shadow-sm hover:shadow-md"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Task
            </button>
            <button
              onClick={() => setShowForm(false)}
              className="flex-1 flex items-center justify-center py-3 px-4 bg-white text-gray-700 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors text-sm font-medium"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskInput;