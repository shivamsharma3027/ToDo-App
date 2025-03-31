import React from 'react';
import { useDispatch } from 'react-redux';
import { removeTask } from '../../features/taskSlice';
import { MESSAGES } from '../../utils/constants';

const TaskItem = ({ task }) => {
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(removeTask(task.id));
    alert(MESSAGES.TASK_DELETED);
  };

  return (
    <div className="flex justify-between items-center p-4 bg-gray-100 mb-2 rounded">
      <div>
        <p>{task.task}</p>
        <p className={`text-sm ${task.priority === 'High' ? 'text-red-500' : task.priority === 'Medium' ? 'text-yellow-500' : 'text-green-500'}`}>
          {task.priority} Priority
        </p>
      </div>
      <button className="bg-red-500 text-white px-4 py-2 rounded" onClick={handleDelete}>
        Delete
      </button>
    </div>
  );
};

export default TaskItem;
