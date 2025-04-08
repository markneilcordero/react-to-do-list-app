import React, { useState, useEffect } from 'react';

const TodoForm = ({ onSubmit, editingTask, onCancel }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  // Pre-fill form when editing
  useEffect(() => {
    if (editingTask) {
      setTitle(editingTask.title);
      setDescription(editingTask.description || '');
    } else {
      setTitle('');
      setDescription('');
    }
  }, [editingTask]);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return alert('Task title is required.');

    const newTask = {
      title: title.trim(),
      description: description.trim(),
      completed: editingTask ? editingTask.completed : false,
    };

    onSubmit(newTask);
    setTitle('');
    setDescription('');
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <div className="mb-3">
        <label className="form-label">Task Title</label>
        <input
          type="text"
          className="form-control"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter task title"
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Description (optional)</label>
        <textarea
          className="form-control"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Add details about the task"
        ></textarea>
      </div>

      <div className="d-flex gap-2">
        <button type="submit" className="btn btn-primary">
          {editingTask ? 'Update Task' : 'Add Task'}
        </button>

        {editingTask && (
          <button
            type="button"
            className="btn btn-secondary"
            onClick={onCancel}
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export default TodoForm;
