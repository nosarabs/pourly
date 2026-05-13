import React, { useState, useRef, useEffect } from 'react';
import { FiChevronDown } from 'react-icons/fi';

const Dropdown = ({ options, initialSelected, label, onSelect }) => {
    const [selectedOption, setSelectedOption] = useState(initialSelected || options[0]);
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    const handleSelect = (option) => {
        setSelectedOption(option);
        setIsOpen(false);
        if (onSelect) {
            onSelect(option);
        }
    };

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between px-4 py-3 bg-white dark:bg-surface-800 border border-neutral-200 dark:border-neutral-700 rounded-2xl shadow-soft hover:border-brand-300 dark:hover:border-brand-600 focus:outline-none focus:ring-2 focus:ring-brand-400/30 transition-all duration-200"
            >
                <div className="flex flex-col items-start">
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-neutral-400 dark:text-neutral-500">
                        {label}
                    </span>
                    <span className="text-sm font-medium text-neutral-800 dark:text-neutral-100 mt-0.5">
                        {selectedOption}
                    </span>
                </div>
                <FiChevronDown
                    size={16}
                    className={`text-neutral-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                />
            </button>

            {isOpen && (
                <div className="absolute z-50 mt-2 w-full bg-white dark:bg-surface-800 border border-neutral-200 dark:border-neutral-700 rounded-2xl shadow-lg overflow-hidden animate-in fade-in slide-in-from-top-1">
                    <div className="max-h-64 overflow-y-auto py-1">
                        {options.map((option, index) => (
                            <button
                                key={index}
                                onClick={() => handleSelect(option)}
                                className={`w-full text-left px-4 py-2.5 text-sm transition-colors duration-150
                                    ${option === selectedOption
                                        ? 'bg-brand-50 dark:bg-brand-900/30 text-brand-700 dark:text-brand-300 font-medium'
                                        : 'text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-surface-700'
                                    }`}
                            >
                                {option}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Dropdown;
