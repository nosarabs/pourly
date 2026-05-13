// ThemeToggle.js — Theme toggling is now handled in App.js via Navbar
// This component is kept for backward compatibility but no longer used directly.
import React from 'react';

const ThemeToggle = ({ darkMode, toggleDarkMode }) => {
  return (
    <button
      onClick={toggleDarkMode}
      className="px-4 py-2 rounded-xl text-sm font-medium bg-neutral-100 dark:bg-surface-700 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-surface-700/80 transition-all duration-200"
    >
      {darkMode ? 'Light' : 'Dark'} Mode
    </button>
  );
};

export default ThemeToggle;
