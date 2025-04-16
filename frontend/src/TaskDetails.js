const TaskDetails = ({ task, onTaskChange }) => {
  const formatDate = (d) => new Date(d).toLocaleDateString();

  const handleStatusChange = async (e) => {
    const newStatus = e.target.checked ? "Completed" : "Pending";

    await fetch(`https://cs348taskplanner.uc.r.appspot.com/api/tasks/${task._id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: newStatus })
    });

    onTaskChange(); // Refresh task list
  };

  const handleDelete = async () => {
    await fetch(`https://cs348taskplanner.uc.r.appspot.com/api/tasks/${task._id}`, {
      method: 'DELETE'
    });

    onTaskChange();
  };

  return (
    <div className="task-details">
      <h4>{task.title}</h4>
      <p><strong>Description:</strong> {task.description}</p>
      <p><strong>Due Date:</strong> {formatDate(task.dueDate)}</p>
      <p><strong>Category:</strong> {task.category}</p>

      <label style={{ display: 'block', marginTop: '1rem' }}>
        <input
          type="checkbox"
          checked={task.status === 'Completed'}
          onChange={handleStatusChange}
          style={{ marginRight: '8px' }}
        />
        Mark as Completed
      </label>

      <p><strong>Status:</strong> 
        <span className={`task-status status-${task.status.replace(' ', '').toLowerCase()}`}>
          {task.status}
        </span>
      </p>

      {task.status === 'Completed' && (
        <button
          onClick={handleDelete}
          style={{ backgroundColor: '#f44336', color: 'white', marginTop: '10px' }}
        >
          Delete
        </button>
      )}
    </div>
  );
};
