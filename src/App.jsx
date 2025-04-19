import React, { useState, useEffect, useRef } from 'react';
import TodoForm from './TodoForm';
import TodoList from './TodoList';
import Filter from './Filter';
import SearchBar from './SearchBar';
import ThemeToggle from './ThemeToggle';
import StatsBar from './StatsBar'; // Import StatsBar
import Footer from './Footer'; // Import Footer
import useLocalStorage from './useLocalStorage';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
// Import Modal component from react-bootstrap or use standard Bootstrap attributes
// For simplicity, we'll use standard Bootstrap attributes here.

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
  const [taskToDeleteId, setTaskToDeleteId] = useState(null);
  const modalRef = useRef(null); // Ref to access the modal element

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

  // Prepare for deletion by setting the ID (called by TodoItem button)
  const prepareDeleteTask = (id) => {
    setTaskToDeleteId(id);
  };

  // Confirm deletion (called by modal button)
  const confirmDeleteTask = () => {
    if (taskToDeleteId !== null) {
      setTasks(prev => prev.filter(task => task.id !== taskToDeleteId));
      // Resetting ID is handled by useEffect cleanup
    }
  };

  // Effect to listen for modal close events and reset the ID
  useEffect(() => {
    const modalElement = modalRef.current;
    if (!modalElement) return;

    const handleModalHidden = () => {
      // Check if the modal still exists and doesn't have the 'show' class
      const currentModal = document.getElementById('deleteConfirmModal');
      if (currentModal && !currentModal.classList.contains('show')) {
         setTaskToDeleteId(null);
      }
    };

    modalElement.addEventListener('hidden.bs.modal', handleModalHidden);

    // Cleanup function to remove the event listener
    return () => {
      modalElement.removeEventListener('hidden.bs.modal', handleModalHidden);
    };
  }, []); // Empty dependency array ensures this runs once on mount

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
        onDelete={prepareDeleteTask} // Ensure this passes prepareDeleteTask
        onToggleComplete={handleToggleComplete}
      />

      {/* Add Footer */}
      <Footer />

      {/* Delete Confirmation Modal (Bootstrap 5) */}
      <div className="modal fade" id="deleteConfirmModal" tabIndex="-1" aria-labelledby="deleteModalLabel" aria-hidden="true" ref={modalRef}>
        <div className="modal-dialog modal-dialog-centered"> {/* Add modal-dialog-centered */}
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="deleteModalLabel">Confirm Deletion</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              Are you sure you want to delete this task?
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
              <button type="button" className="btn btn-danger" data-bs-dismiss="modal" onClick={confirmDeleteTask}>Delete Task</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
