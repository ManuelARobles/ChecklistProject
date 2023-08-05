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

  const handleAddTask = async () => {
    try {
      const response = await axios.post('https://checklistproject-31482afaf05a.herokuapp.com/api/tasks', {
        taskName: newTaskName,
        taskStatus: newTaskStatus,
      });

      const newTask = response.data.task;
      setTasks([...tasks, newTask]);

      setNewTaskName('');
      setNewTaskStatus('not-done');
    } catch (error) {
      console.error('Error adding new task:', error);
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

  return (
    <div className="container">
      <h1>Checklist</h1>
      <div className="add-task">
        <input
          type="text"
          value={newTaskName}
          onChange={(e) => setNewTaskName(e.target.value)}
          placeholder="Task Name"
        />
        <select
          value={newTaskStatus}
          onChange={(e) => setNewTaskStatus(e.target.value)}
        >
          <option value="not-done">Not Done</option>
          <option value="done">Done</option>
          <option value="N/A">N/A</option>
        </select>
        <button onClick={handleAddTask}>Add Task</button>
      </div>
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

