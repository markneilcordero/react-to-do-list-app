import React, { useState, useEffect } from 'react';
import TodoForm from './TodoForm';
import TodoList from './TodoList';
import Filter from './Filter';
import SearchBar from './SearchBar';
import ThemeToggle from './ThemeToggle';
import useLocalStorage from './useLocalStorage';

// LocalStorage key
const STORAGE_KEY = 'react_todo_list';

const App = () => {
  // State declarations
  const [tasks, setTasks] = useLocalStorage('react_todo_list', []);
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [editingTask, setEditingTask] = useState(null);

  // Load tasks from localStorage on initial render
  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    setTasks(storedTasks);
  }, []);

  // Save tasks to localStorage when tasks change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks]);

  // Add or update a task
  const handleSaveTask = (task) => {
    if (editingTask) {
      setTasks(prev =>
        prev.map(t => (t.id === editingTask.id ? { ...task, id: editingTask.id } : t))
      );
      setEditingTask(null);
    } else {
      setTasks(prev => [...prev, { ...task, id: Date.now(), completed: false }]);
    }
  };

  // Delete task
  const handleDeleteTask = (id) => {
    setTasks(prev => prev.filter(task => task.id !== id));
  };

  // Toggle complete/incomplete
  const handleToggleComplete = (id) => {
    setTasks(prev =>
      prev.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  // Edit task
  const handleEditTask = (task) => {
    setEditingTask(task);
  };

  // Filter and search logic
  const filteredTasks = tasks.filter(task => {
    const matchesFilter =
      filter === 'all' ||
      (filter === 'completed' && task.completed) ||
      (filter === 'incomplete' && !task.completed);
    const matchesSearch =
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (task.description && task.description.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="container py-5">
      <h1 className="text-center mb-4">📝 To-Do List</h1>
      <div className="d-flex justify-content-end mb-3">
        <ThemeToggle />
      </div>


      <TodoForm
        onSubmit={handleSaveTask}
        editingTask={editingTask}
        onCancel={() => setEditingTask(null)}
      />

      <div className="d-flex justify-content-between align-items-center my-3">
        <Filter currentFilter={filter} onFilterChange={setFilter} />
        <SearchBar searchQuery={searchQuery} onSearchChange={setSearchQuery} />
      </div>

      <TodoList
        tasks={filteredTasks}
        onEdit={handleEditTask}
        onDelete={handleDeleteTask}
        onToggleComplete={handleToggleComplete}
      />
    </div>
  );
};

export default App;
