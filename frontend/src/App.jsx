// frontend/src/App.jsx// App.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TodoList from './components/TodoList';

const App = () => {
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    const response = await axios.get('http://localhost:5000/api/todos');
    setTasks(response.data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-4xl mx-auto py-8 px-4">
        <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">
          Todo List
        </h1>
        <div className="bg-white rounded-lg shadow-lg p-6">
          <TodoList tasks={tasks} refreshTasks={fetchTasks} /> {/* Pass tasks and refreshTasks */}
        </div>
      </div>
    </div>
  );
};

export default App;


//