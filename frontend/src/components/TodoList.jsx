// frontend/src/components/TodoList.jsx

// TodoList.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EditTask from './EditTask';
import { CheckCircle, Circle, Pencil, Trash2 } from 'lucide-react';

const TodoList = ({ tasks, refreshTasks }) => {
  const [editingTask, setEditingTask] = useState(null);
  const [newTask, setNewTask] = useState('');

  const handleAddTask = async (e) => {
    e.preventDefault();
    if (!newTask.trim()) return;

    await axios.post('http://localhost:5000/api/todos', 
      { task: newTask }
    );
    setNewTask('');
    refreshTasks();
  };

  const handleDeleteTask = async (id) => {
    console.log('delete', id);
    await axios.delete(`http://localhost:5000/api/todos/${id}`);
    refreshTasks(); // Refresh the task list after deletion
  };

  const handleUpdateTask = async (id) => {
    console.log('update', id);
    await axios.put(`http://localhost:5000/api/todos/${id}`);
    refreshTasks(); // Refresh the task list after deletion
  };

  const handleToggleComplete = async (task) => {
    await axios.put(`http://localhost:5000/api/todos/${task._id}`, {
      completed: !task.completed // Toggle completed status
    });
    refreshTasks(); // Refresh the task list after updating
  };

  return (
    <div>
      <form onSubmit={handleAddTask} className="mb-6">
        <div className="flex gap-2">
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Add a new task..."
            className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Add Task
          </button>
        </div>
      </form>

      <div className="space-y-2">
        {tasks.length === 0 ? (
          <p className="text-gray-500 text-center py-4">No tasks available.</p>
        ) : (
          tasks.map((task) => (
            <div
              key={task._id}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <div className="flex items-center gap-3">
                <button
                  onClick={() => handleToggleComplete(task)}
                  className="text-gray-500 hover:text-blue-500"
                >
                  {task.completed ? (
                    <CheckCircle className="w-6 h-6" />
                  ) : (
                    <Circle className="w-6 h-6" />
                  )}
                </button>
                <span className={task.completed ? 'line-through text-gray-500' : ''}>
                  {task.task}
                </span>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => setEditingTask(task)}
                  className="p-1 text-gray-500 hover:text-blue-500"
                >
                  <Pencil className="w-5 h-5" />
                </button>
                <button
                  onClick={() => handleDeleteTask(task._id)}
                  className="p-1 text-gray-500 hover:text-red-500"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {editingTask && (
        <EditTask
          taskId={editingTask._id}
          onClose={() => setEditingTask(null)}
          refreshTasks={refreshTasks}
          initialData={editingTask}
        />
      )}
    </div>
  );
};

export default TodoList;
