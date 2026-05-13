import React, { useState } from 'react';
import { FiPlus, FiCoffee, FiDroplet } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const Config = ({ onAddBrewingMethod, onAddCoffeeType }) => {
    const [newMethod, setNewMethod] = useState('');
    const [newCoffeeType, setNewCoffeeType] = useState('');

    const handleAddMethod = () => {
        if (newMethod.trim()) {
            onAddBrewingMethod(newMethod.trim());
            setNewMethod('');
        }
    };

    const handleAddCoffeeType = () => {
        if (newCoffeeType.trim()) {
            onAddCoffeeType(newCoffeeType.trim());
            setNewCoffeeType('');
        }
    };

    const handleKeyDown = (e, handler) => {
        if (e.key === 'Enter') handler();
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-xl font-display font-bold text-neutral-800 dark:text-neutral-100">
                    Settings
                </h1>
                <Link
                    to="/pourly"
                    className="text-sm font-medium text-brand-600 dark:text-brand-400 hover:text-brand-700 dark:hover:text-brand-300 transition-colors no-underline"
                >
                    Done
                </Link>
            </div>

            {/* Add Brewing Method */}
            <div className="rounded-2xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-surface-800 p-5 shadow-soft space-y-3">
                <div className="flex items-center gap-2 text-neutral-600 dark:text-neutral-300">
                    <FiDroplet size={16} className="text-brand-500" />
                    <h2 className="text-sm font-semibold uppercase tracking-wider">Brewing Method</h2>
                </div>
                <div className="flex gap-2">
                    <input
                        type="text"
                        value={newMethod}
                        onChange={(e) => setNewMethod(e.target.value)}
                        onKeyDown={(e) => handleKeyDown(e, handleAddMethod)}
                        placeholder="e.g. Chemex"
                        className="flex-1 px-4 py-2.5 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-surface-700 text-sm text-neutral-800 dark:text-neutral-100 placeholder-neutral-400 dark:placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-brand-400/30 focus:border-brand-300 dark:focus:border-brand-600 transition-all"
                    />
                    <button
                        onClick={handleAddMethod}
                        className="flex items-center justify-center w-10 h-10 rounded-xl bg-brand-500 hover:bg-brand-600 text-white shadow-sm transition-all duration-200 hover:shadow-md active:scale-95"
                    >
                        <FiPlus size={18} />
                    </button>
                </div>
            </div>

            {/* Add Coffee Type */}
            <div className="rounded-2xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-surface-800 p-5 shadow-soft space-y-3">
                <div className="flex items-center gap-2 text-neutral-600 dark:text-neutral-300">
                    <FiCoffee size={16} className="text-brand-500" />
                    <h2 className="text-sm font-semibold uppercase tracking-wider">Coffee Type</h2>
                </div>
                <div className="flex gap-2">
                    <input
                        type="text"
                        value={newCoffeeType}
                        onChange={(e) => setNewCoffeeType(e.target.value)}
                        onKeyDown={(e) => handleKeyDown(e, handleAddCoffeeType)}
                        placeholder="e.g. Gesha Washed"
                        className="flex-1 px-4 py-2.5 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-surface-700 text-sm text-neutral-800 dark:text-neutral-100 placeholder-neutral-400 dark:placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-brand-400/30 focus:border-brand-300 dark:focus:border-brand-600 transition-all"
                    />
                    <button
                        onClick={handleAddCoffeeType}
                        className="flex items-center justify-center w-10 h-10 rounded-xl bg-brand-500 hover:bg-brand-600 text-white shadow-sm transition-all duration-200 hover:shadow-md active:scale-95"
                    >
                        <FiPlus size={18} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Config;
