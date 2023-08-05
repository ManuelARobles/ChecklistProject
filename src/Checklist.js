import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './styles.scss';

function Checklist() {
  const [tasks, setTasks] = useState([]);
  const [newTaskName, setNewTaskName] = useState('');
  const [newTaskStatus, setNewTaskStatus] = useState('not-done');

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get('https://checklistproject-31482afaf05a.herokuapp.com/api/tasks');
      setTasks(response.data.tasks);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const handleStatusChange = async (index, newStatus) => {
    try {
      await axios.put(`https://checklistproject-31482afaf05a.herokuapp.com/api/tasks/${index}`, { status: newStatus });
      const updatedTasks = tasks.map((task, i) =>
        i === index ? { ...task, taskStatus: newStatus } : task
      );
      setTasks(updatedTasks);
    } catch (error) {
      console.error('Error updating task status:', error);
    }
  };

  const handleAddTask = async () => {
    try {
      await axios.post('https://checklistproject-31482afaf05a.herokuapp.com/api/tasks', {
        taskName: newTaskName,
        taskStatus: newTaskStatus,
      });
      setNewTaskName('');
      setNewTaskStatus('not-done');
      fetchTasks();
    } catch (error) {
      console.error('Error adding new task:', error);
    }
  };

  return (
    <div className="container">
      <h1>Checklist</h1>
      <form>
        <input
          type="text"
          value={newTaskName}
          onChange={(e) => setNewTaskName(e.target.value)}
          placeholder="Enter new task name"
        />
        <select
          value={newTaskStatus}
          onChange={(e) => setNewTaskStatus(e.target.value)}
        >
          <option value="not-done">Not Done</option>
          <option value="done">Done</option>
          <option value="N/A">N/A</option>
        </select>
        <button type="button" onClick={handleAddTask}>Add Task</button>
      </form>
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
