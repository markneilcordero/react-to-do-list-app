import React from 'react';

const StatsBar = ({ tasks }) => {
  const total = tasks.length;
  const completed = tasks.filter(task => task.completed).length;
  const remaining = total - completed;

  return (
    <div className="alert alert-info d-flex justify-content-between align-items-center mt-3">
      <span><strong>Total:</strong> {total}</span>
      <span><strong>Completed:</strong> {completed}</span>
      <span><strong>Remaining:</strong> {remaining}</span>
    </div>
  );
};

export default StatsBar;
