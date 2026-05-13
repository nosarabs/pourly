import React, { useState, useMemo } from 'react';

const RangeInput = ({ min, max, step, initialValue, onChange }) => {
    const [value, setValue] = useState(initialValue || min);

    const handleChange = (event) => {
        const newValue = event.target.value;
        setValue(newValue);
        if (onChange) {
            onChange(newValue);
        }
    };

    const percentage = useMemo(() => {
        return ((value - min) / (max - min)) * 100;
    }, [value, min, max]);

    return (
        <div className="relative w-full">
            <input
                type="range"
                min={min}
                max={max}
                step={step}
                value={value}
                onChange={handleChange}
                className="w-full h-1.5 rounded-full appearance-none cursor-pointer bg-neutral-200 dark:bg-surface-700 accent-brand-500
                    [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-brand-500 [&::-webkit-slider-thumb]:shadow-md [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:dark:border-surface-800 [&::-webkit-slider-thumb]:transition-transform [&::-webkit-slider-thumb]:duration-150 [&::-webkit-slider-thumb]:hover:scale-110
                    [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-brand-500 [&::-moz-range-thumb]:shadow-md [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-white [&::-moz-range-thumb]:dark:border-surface-800"
                style={{
                    background: `linear-gradient(to right, rgb(166, 114, 67) 0%, rgb(166, 114, 67) ${percentage}%, transparent ${percentage}%, transparent 100%)`,
                }}
            />
        </div>
    );
};

export default RangeInput;
