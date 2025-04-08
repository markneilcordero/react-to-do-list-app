import React from 'react';
import TodoItem from './TodoItem';

const TodoList = ({ tasks, onEdit, onDelete, onToggleComplete }) => {
  if (tasks.length === 0) {
    return <p className="text-center text-muted">No tasks to show.</p>;
  }

  return (
    <ul className="list-group">
      {tasks.map((task) => (
        <TodoItem
          key={task.id}
          task={task}
          onEdit={onEdit}
          onDelete={onDelete}
          onToggleComplete={onToggleComplete}
        />
      ))}
    </ul>
  );
};

export default TodoList;
