import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeTask, modifyTask } from '../../features/taskSlice';
import { getWeather } from '../../api/weatherService';
import { 
  Edit, Trash, Sun, CloudRain, Cloud, Snowflake, 
  Filter, MapPin, Check, X, Flame, 
  Flag, Circle, ChevronDown, Calendar, Zap, Droplet, CloudSun
} from 'lucide-react';

const TaskListWithFilter = () => {
  const [filter, setFilter] = useState('All');
  const tasks = useSelector((state) => state.tasks.tasks);
  const dispatch = useDispatch();
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editedTask, setEditedTask] = useState({
    task: '',
    priority: 'Medium',
    isOutdoor: false,
    weatherInfo: '',
    city: ''
  });

  // Function to capitalize each word in city name
  const formatCityName = (city) => {
    if (!city) return '';
    return city
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  };

  const filteredTasks = filter === 'All' ? tasks : tasks.filter((task) => task.priority === filter);

  const handleDelete = (id) => dispatch(removeTask(id));

  const handleEdit = (task) => {
    setEditingTaskId(task.id);
    setEditedTask({
      task: task.task,
      priority: task.priority,
      isOutdoor: task.isOutdoor,
      weatherInfo: task.isOutdoor ? task.weatherInfo : '',
      city: task.isOutdoor ? task.city : ''
    });
  };

  const handleSave = async (id) => {
    let weatherDetails = '';
    let city = '';

    if (editedTask.isOutdoor && editedTask.city.trim()) {
      city = formatCityName(editedTask.city);
      try {
        const weatherData = await getWeather(city);
        weatherDetails = `${weatherData.weather[0].main}, ${Math.round(weatherData.main.temp)}°C`;
      } catch (error) {
        weatherDetails = 'Weather unavailable';
      }
    }

    dispatch(modifyTask({ 
      id, 
      ...editedTask, 
      weatherInfo: weatherDetails,
      city: city
    }));
    setEditingTaskId(null);
  };

  const renderWeatherIcon = (weather) => {
    if (!weather) return null;
    if (weather.includes('Clear')) return <Sun className="w-5 h-5 text-amber-400" />;
    if (weather.includes('Rain')) return <CloudRain className="w-5 h-5 text-blue-400" />;
    if (weather.includes('Snow')) return <Snowflake className="w-5 h-5 text-cyan-200" />;
    if (weather.includes('Cloud')) return <CloudSun className="w-5 h-5 text-gray-400" />;
    return <Cloud className="w-5 h-5 text-gray-400" />;
  };

  const renderPriorityIcon = (priority) => {
    switch(priority) {
      case 'High': 
        return <Flame className="w-4 h-4 text-red-500" />;
      case 'Medium': 
        return <Zap className="w-4 h-4 text-amber-500" />;
      default: 
        return <Circle className="w-4 h-4 text-emerald-500" />;
    }
  };

  return (
    <div className="p-6 bg-gray-50 rounded-2xl mx-auto max-w-7xl">
      {tasks.length > 0 && (
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
          <h2 className="text-3xl font-bold text-gray-900 flex items-center">
            <span className="bg-indigo-100 p-2 rounded-xl mr-3">
              <Calendar className="w-6 h-6 text-indigo-600" />
            </span>
            Task Dashboard
          </h2>
          <div className="flex items-center space-x-3 bg-white px-4 py-3 rounded-xl shadow-xs border border-gray-200">
            <Filter className="text-gray-500 w-5 h-5" />
            <div className="relative">
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="appearance-none pl-3 pr-8 py-2 text-sm border-none bg-transparent focus:outline-none focus:ring-2 focus:ring-indigo-100 rounded-lg font-medium"
              >
                <option value="All">All Tasks</option>
                <option value="High">High Priority</option>
                <option value="Medium">Medium Priority</option>
                <option value="Low">Low Priority</option>
              </select>
              <ChevronDown className="absolute right-2 top-2.5 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTasks.length > 0 ? (
          filteredTasks.map((task) => (
            <div 
              key={task.id} 
              className={`relative bg-white rounded-2xl shadow-sm transition-all duration-300 hover:shadow-md ${
                editingTaskId === task.id ? 'min-h-[400px]' : 'min-h-[200px]'
              } ${
                task.priority === 'High' ? 'border-t-4 border-red-500' : 
                task.priority === 'Medium' ? 'border-t-4 border-amber-500' : 
                'border-t-4 border-emerald-500'
              }`}
            >
              {editingTaskId === task.id ? (
                <div className="p-6 space-y-5 h-full flex flex-col">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-semibold text-gray-900">Edit Task</h3>
                    <button 
                      onClick={() => setEditingTaskId(null)}
                      className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <X className="w-5 h-5 text-gray-500" />
                    </button>
                  </div>
                  
                  <div className="space-y-4 flex-1">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Task Name</label>
                      <input
                        type="text"
                        value={editedTask.task}
                        onChange={(e) => setEditedTask({ ...editedTask, task: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-200 focus:border-indigo-300 text-sm placeholder-gray-400"
                        placeholder="Enter task name"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Priority</label>
                      <select
                        value={editedTask.priority}
                        onChange={(e) => setEditedTask({ ...editedTask, priority: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-200 focus:border-indigo-300 text-sm"
                      >
                        <option value="High">High</option>
                        <option value="Medium">Medium</option>
                        <option value="Low">Low</option>
                      </select>
                    </div>

                    <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-xl">
                      <input
                        type="checkbox"
                        id={`outdoor-${task.id}`}
                        checked={editedTask.isOutdoor}
                        onChange={(e) => {
                          const isOutdoor = e.target.checked;
                          setEditedTask({ 
                            ...editedTask, 
                            isOutdoor,
                            city: isOutdoor ? editedTask.city : '',
                            weatherInfo: isOutdoor ? editedTask.weatherInfo : ''
                          });
                        }}
                        className="h-5 w-5 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded-lg"
                      />
                      <label htmlFor={`outdoor-${task.id}`} className="block text-sm font-medium text-gray-700">
                        Outdoor Activity
                      </label>
                    </div>

                    {editedTask.isOutdoor && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                        <div className="flex items-center space-x-2 bg-gray-50 px-4 py-3 rounded-xl border border-gray-200">
                          <MapPin className="text-gray-500 w-5 h-5 flex-shrink-0" />
                          <input
                            type="text"
                            value={editedTask.city}
                            onChange={(e) => setEditedTask({ ...editedTask, city: e.target.value })}
                            className="w-full bg-transparent focus:outline-none text-sm placeholder-gray-400"
                            placeholder="Enter city name"
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="flex space-x-3 pt-2">
                    <button
                      onClick={() => handleSave(task.id)}
                      className="flex-1 flex items-center justify-center py-3 px-4 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors font-medium text-sm"
                    >
                      <Check className="w-5 h-5 mr-2" /> Save Changes
                    </button>
                  </div>
                </div>
              ) : (
                <div className="p-6 h-full flex flex-col">
                  <div className="flex-grow space-y-4">
                    <div className="flex justify-between items-start">
                      <h3 className="text-lg font-semibold text-gray-900">{task.task}</h3>
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium 
                        ${task.priority === 'High' ? 'bg-red-50 text-red-700' : 
                          task.priority === 'Medium' ? 'bg-amber-50 text-amber-700' : 
                          'bg-emerald-50 text-emerald-700'}`}>
                        {renderPriorityIcon(task.priority)}
                        <span className="ml-1.5">{task.priority}</span>
                      </span>
                    </div>

                    {task.city && (
                      <div className="flex items-center text-sm text-gray-700 bg-gray-50 px-3 py-2 rounded-lg border border-gray-100">
                        <MapPin className="w-4 h-4 mr-2 text-indigo-500" />
                        <span className="font-medium">
                          {formatCityName(task.city)}
                        </span>
                      </div>
                    )}

                    {task.isOutdoor && task.weatherInfo && (
                      <div className="flex items-center text-sm bg-indigo-50 text-indigo-800 px-3 py-2 rounded-lg border border-indigo-100">
                        {renderWeatherIcon(task.weatherInfo)}
                        <span className="ml-2 font-medium">{task.weatherInfo}</span>
                      </div>
                    )}
                  </div>

                  <div className="flex justify-end space-x-2 pt-5 mt-auto border-t border-gray-100">
                    <button 
                      onClick={() => handleEdit(task)} 
                      className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-xl transition-colors"
                      aria-label="Edit task"
                    >
                      <Edit className="w-5 h-5" />
                    </button>
                    <button 
                      onClick={() => handleDelete(task.id)} 
                      className="p-2 text-red-600 hover:bg-red-50 rounded-xl transition-colors"
                      aria-label="Delete task"
                    >
                      <Trash className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-16">
            <div className="bg-white p-8 rounded-2xl shadow-xs max-w-md mx-auto border border-gray-200">
              <CloudSun className="w-14 h-14 text-gray-300 mx-auto mb-5" />
              <h3 className="text-xl font-medium text-gray-800 mb-2">No tasks found</h3>
              <p className="text-gray-500 text-sm">
                {filter === 'All' ? 
                  "Create your first task to get started!" : 
                  `No tasks with ${filter.toLowerCase()} priority`}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskListWithFilter;