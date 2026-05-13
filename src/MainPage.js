import React, { useState } from 'react';
import Dropdown from './Dropdown';
import RangeInput from './RangeInput';
import Recipe from './Recipe';
import Recommendation from './Recommendation';

const MainPage = ({ brewingMethods, coffeeTypes }) => {
    const [method, setMethod] = useState(brewingMethods[1]);
    const [coffee, setCoffee] = useState(coffeeTypes[0]);

    const minGrams = 12;
    const maxGrams = 30;
    const [grams, setGrams] = useState(minGrams);

    const minRatio = 10;
    const maxRatio = 20;
    const [ratio, setRatio] = useState(minRatio);

    const recipeName = '4:6';

    const handleBrewingMethodSelect = (method) => setMethod(method);
    const handleCoffeeTypeSelect = (type) => setCoffee(type);
    const handleGramsChange = (value) => setGrams(value);
    const handleRatioChange = (value) => setRatio(value);

    return (
        <div className="space-y-6">
            {/* Dropdowns Section */}
            <div className="space-y-3">
                <Dropdown
                    label="Brewing Method"
                    options={brewingMethods}
                    initialSelected={method}
                    onSelect={handleBrewingMethodSelect}
                />
                <Dropdown
                    label="Variety & Process"
                    options={coffeeTypes}
                    initialSelected={coffee}
                    onSelect={handleCoffeeTypeSelect}
                />
            </div>

            {/* Sliders Section */}
            <div className="space-y-5 rounded-2xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-surface-800 p-5 shadow-soft">
                <div>
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-semibold uppercase tracking-wider text-neutral-400 dark:text-neutral-500">
                            Grams
                        </span>
                        <span className="text-sm font-bold text-brand-600 dark:text-brand-400 tabular-nums">
                            {grams}g
                        </span>
                    </div>
                    <RangeInput min={minGrams} max={maxGrams} step={0.1} initialValue={12} onChange={handleGramsChange} />
                </div>

                <div className="border-t border-neutral-100 dark:border-neutral-700/50" />

                <div>
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-semibold uppercase tracking-wider text-neutral-400 dark:text-neutral-500">
                            Ratio
                        </span>
                        <span className="text-sm font-bold text-brand-600 dark:text-brand-400 tabular-nums">
                            1:{ratio}
                        </span>
                    </div>
                    <RangeInput min={minRatio} max={maxRatio} step={1} initialValue={10} onChange={handleRatioChange} />
                </div>
            </div>

            {/* Recipe Section */}
            <div>
                <div className="flex items-center justify-between mb-3">
                    <h2 className="text-base font-display font-bold text-neutral-800 dark:text-neutral-100">
                        Recipe
                    </h2>
                    <span className="inline-flex items-center px-2.5 py-1 rounded-lg bg-brand-100 dark:bg-brand-900/40 text-brand-700 dark:text-brand-300 text-xs font-bold tracking-wide">
                        {recipeName}
                    </span>
                </div>
                <Recipe recipeName={recipeName} method={method} coffee={coffee} grams={grams} ratio={ratio} />
            </div>

            {/* Recommendations */}
            <div className="flex gap-3">
                <Recommendation type="TMP" method={method} coffee={coffee} grams={grams} ratio={ratio} />
                <Recommendation type="C40" method={method} coffee={coffee} grams={grams} ratio={ratio} />
            </div>
        </div>
    );
};

export default MainPage;
