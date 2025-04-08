import React from 'react';

const TodoItem = ({ task, onEdit, onDelete, onToggleComplete }) => {
  const { id, title, description, completed } = task;

  return (
    <li className="list-group-item d-flex justify-content-between align-items-start">
      <div className="form-check">
        <input
          className="form-check-input me-2"
          type="checkbox"
          checked={completed}
          onChange={() => onToggleComplete(id)}
        />
        <label
          className={`form-check-label ${completed ? 'text-decoration-line-through text-muted' : ''}`}
        >
          <strong>{title}</strong>
          {description && (
            <div className="small mt-1 text-secondary">{description}</div>
          )}
        </label>
      </div>

      <div className="btn-group btn-group-sm" role="group">
        <button className="btn btn-outline-primary" onClick={() => onEdit(task)}>
          Edit
        </button>
        <button className="btn btn-outline-danger" onClick={() => onDelete(id)}>
          Delete
        </button>
      </div>
    </li>
  );
};

export default TodoItem;
