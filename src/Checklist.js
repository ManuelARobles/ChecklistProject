import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get('/api/tasks');
      setTasks(response.data.tasks);
    } catch (error) {
      console.error(error);
    }
  };

  const updateTaskStatus = async (index, status) => {
    try {
      await axios.put(`/api/tasks/${index}`, { status });
      fetchTasks(); // Fetch updated tasks from the backend
    } catch (error) {
      console.error(error);
    }
  };

  const submitTasks = async () => {
    try {
      await axios.post('/api/tasks/submit');
      console.log('Tasks submitted successfully');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container">
      <h1>Checklist</h1>
      <form>
        {/* Job Number */}
        <div>
          <label htmlFor="jobNumber">Job Number:</label>
          <input type="text" id="jobNumber" />
        </div>
        {/* Customer Name */}
        <div>
          <label htmlFor="customerName">Customer Name:</label>
          <input type="text" id="customerName" />
        </div>
        {/* Date */}
        <div>
          <label htmlFor="date">Date:</label>
          <input type="text" id="date" />
        </div>
      </form>
      <ul>
        {tasks.map((task, index) => (
          <li key={index}>
            <span className="task-name">{task.task}</span>
            <select
              value={task.status}
              onChange={(e) => updateTaskStatus(index, e.target.value)}
            >
              <option value="not-done">Not Done</option>
              <option value="done">Done</option>
              <option value="N/A">N/A</option>
            </select>
          </li>
        ))}
      </ul>
      <button onClick={submitTasks}>Submit Tasks</button>
    </div>
  );
};

export default App;

