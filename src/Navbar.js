import React from 'react';
import { Link } from 'react-router-dom';
import { FiSettings, FiSun, FiMoon } from 'react-icons/fi';

const Navbar = ({ darkMode, toggleDarkMode }) => {
    return (
        <nav className="sticky top-0 z-50 backdrop-blur-xl bg-white/80 dark:bg-surface-900/80 border-b border-neutral-200/60 dark:border-neutral-700/60">
            <div className="max-w-lg mx-auto px-4 h-14 flex items-center justify-between">
                <Link
                    to="/pourly"
                    className="font-display text-xl font-bold tracking-tight text-neutral-900 dark:text-white no-underline hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
                >
                    pourly
                </Link>

                <div className="flex items-center gap-2">
                    <button
                        onClick={toggleDarkMode}
                        className="p-2 rounded-xl text-neutral-500 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-surface-700 hover:text-neutral-700 dark:hover:text-neutral-200 transition-all duration-200"
                        aria-label="Toggle dark mode"
                    >
                        {darkMode ? <FiSun size={18} /> : <FiMoon size={18} />}
                    </button>
                    <Link
                        to="/config"
                        className="p-2 rounded-xl text-neutral-500 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-surface-700 hover:text-neutral-700 dark:hover:text-neutral-200 transition-all duration-200"
                    >
                        <FiSettings size={18} />
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
