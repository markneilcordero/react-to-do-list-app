import { useState, useEffect } from 'react';

/**
 * Custom Hook: useLocalStorage
 * 
 * @param {string} key - The localStorage key
 * @param {*} initialValue - Default value if nothing is in localStorage
 * @returns [value, setValue] - Getter and setter synced with localStorage
 */
const useLocalStorage = (key, initialValue) => {
  // Load from localStorage or fallback to initialValue
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = localStorage.getItem(key);
      return item !== null ? JSON.parse(item) : initialValue;
    } catch (err) {
      console.error('Error reading from localStorage:', err);
      return initialValue;
    }
  });

  // Update localStorage whenever value changes
  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (err) {
      console.error('Error writing to localStorage:', err);
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue];
};

export default useLocalStorage;
