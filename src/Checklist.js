import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './styles.scss';

function Checklist() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get('/api/tasks');
      setTasks(response.data.tasks);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const handleStatusChange = async (index, newStatus) => {
    try {
      await axios.put(`/api/tasks/${index}`, { status: newStatus });
      const updatedTasks = tasks.map((task, i) =>
        i === index ? { ...task, taskStatus: newStatus } : task
      );
      setTasks(updatedTasks);
    } catch (error) {
      console.error('Error updating task status:', error);
    }
  };

  return (
    <div className="container">
      <h1>Checklist</h1>
      <ul>
        {tasks.map((task, index) => (
          <li key={index}>
            <span className="task-name">{task.taskName}</span>
            <select
              value={task.taskStatus}
              onChange={(e) => handleStatusChange(index, e.target.value)}
            >
              <option value="not-done">Not Done</option>
              <option value="done">Done</option>
              <option value="N/A">N/A</option>
            </select>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Checklist;