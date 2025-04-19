import React, { useState, useEffect } from 'react';
import TodoForm from './TodoForm';
import TodoList from './TodoList';
import Filter from './Filter';
import SearchBar from './SearchBar';
import ThemeToggle from './ThemeToggle';
import StatsBar from './StatsBar'; // Import StatsBar
import Footer from './Footer'; // Import Footer
import useLocalStorage from './useLocalStorage';

// LocalStorage key
const STORAGE_KEY = 'react_todo_list';

// Sample tasks for first-time users
const sampleTutorialTasks = [
  { id: Date.now() + 1, title: 'Welcome to your To-Do List!', description: 'This is a sample task to get you started.', completed: false },
  { id: Date.now() + 2, title: 'Add new tasks using the form above', description: 'Enter a title and optional description.', completed: false },
  { id: Date.now() + 3, title: 'Mark tasks as complete', description: 'Click the checkbox next to a task.', completed: true },
  { id: Date.now() + 4, title: 'Edit or Delete tasks', description: 'Use the buttons on the right of each task.', completed: false },
  { id: Date.now() + 5, title: 'Filter tasks', description: 'Use the "All", "Completed", "Incomplete" buttons.', completed: false },
  { id: Date.now() + 6, title: 'Search your tasks', description: 'Use the search bar to find specific tasks.', completed: false },
  { id: Date.now() + 7, title: 'Toggle Dark/Light Mode', description: 'Use the button in the top right.', completed: false },
];


const App = () => {
  // State declarations - Use sample tasks as the initial value for the hook
  const [tasks, setTasks] = useLocalStorage(STORAGE_KEY, sampleTutorialTasks);
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [editingTask, setEditingTask] = useState(null);

  // Add or update a task
  const handleSaveTask = (task) => {
    if (editingTask) {
      setTasks(prev =>
        prev.map(t => (t.id === editingTask.id ? { ...task, id: editingTask.id, completed: editingTask.completed } : t)) // Preserve completion status on edit
      );
      setEditingTask(null);
    } else {
      // Ensure new tasks get a unique ID even if added quickly after initial load
      const newId = tasks.length > 0 ? Math.max(...tasks.map(t => t.id)) + 1 : 1; // Safer ID generation
      setTasks(prev => [...prev, { ...task, id: newId, completed: false }]);
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
    <div className="container">
      <div className="d-flex justify-content-between align-items-center mb-4">
         <h1 className="mb-0">📝 To-Do List</h1>
         <ThemeToggle />
      </div>

      <TodoForm
        onSubmit={handleSaveTask}
        editingTask={editingTask}
        onCancel={() => setEditingTask(null)}
      />

      {/* Add StatsBar */}
      <StatsBar tasks={tasks} />

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

      {/* Add Footer */}
      <Footer />
    </div>
  );
};

export default App;
