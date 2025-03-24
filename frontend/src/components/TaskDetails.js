import React from 'react';

const TaskDetails = ({ task, onStatusUpdate }) => {
  const formatDate = (d) => new Date(d).toLocaleDateString();

  const handleCheckboxChange = async (e) => {
    if (task.status === 'Completed') {
      // Delete the task
      await fetch(`http://localhost:4000/api/tasks/${task._id}`, {
        method: 'DELETE',
      });
    } else {
      // Mark as completed
      await fetch(`http://localhost:4000/api/tasks/${task._id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'Completed' }),
      });
    }

    // Refresh tasks in parent
    onStatusUpdate();
  };

  return (
    <div className="task-details">
      <h4>
        <input
          type="checkbox"
          checked={task.status === 'Completed'}
          onChange={handleCheckboxChange}
          title={
            task.status === 'Completed'
              ? 'Check to delete'
              : 'Check to mark as completed'
          }
          style={{ marginRight: '10px' }}
        />
        {task.title}
      </h4>

      <p><strong>Description:</strong> {task.description}</p>
      <p><strong>Due Date:</strong> {formatDate(task.dueDate)}</p>
      <p><strong>Category:</strong> {task.category}</p>
      <p>
        <strong>Status:</strong>{' '}
        <span
          className={`task-status status-${task.status
            .replace(' ', '')
            .toLowerCase()}`}
        >
          {task.status}
        </span>
      </p>
    </div>
  );
};

export default TaskDetails;
