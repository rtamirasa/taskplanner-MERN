import { useState } from 'react';

const TaskForm = ({ onTaskCreated }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [category, setCategory] = useState('Work');
  const [status, setStatus] = useState('Pending');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const task = { title, description, dueDate, category, status };

    const res = await fetch('http://localhost:4000/api/tasks', {
      method: 'POST',
      body: JSON.stringify(task),
      headers: { 'Content-Type': 'application/json' }
    });

    if (res.ok) {
      setTitle('');
      setDescription('');
      setDueDate('');
      setCategory('Work');
      setStatus('Pending');
      onTaskCreated(); // refresh task list
    }
  };

  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>Add a New Task</h3>

      <label>Title:</label>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />

      <label>Description:</label>
      <input
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <label>Due Date:</label>
      <input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
        required
      />

      <label>Category:</label>
      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="Work">Work</option>
        <option value="Personal">Personal</option>
        <option value="Health">Health</option>
        <option value="Others">Others</option>
      </select>

      <label>Status:</label>
      <select value={status} onChange={(e) => setStatus(e.target.value)}>
        <option value="Pending">Pending</option>
        <option value="In Progress">In Progress</option>
        <option value="Completed">Completed</option>
      </select>

      <button type="submit">Add Task</button>
    </form>
  );
};

export default TaskForm;
