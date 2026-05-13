import React from 'react';

function getPourSchedule(recipeName, method, coffee, grams, ratio) {
    const totalWater = ratio * grams;
    const bloom = 3 * grams;
    let pours = [];

    pours.push(bloom);

    if (method === "Plinc") {
        pours.push(totalWater)
    } else if (method === "Aeropress") {
        const bypass = totalWater - 200;
        if (bypass > 0) {
            pours.push(totalWater - bypass)
        } else {
            pours.push(totalWater)
        }

        pours.push('Stir 3x')
        pours.push('Remove Air, Close Lid')
        if (bypass > 0) {
            pours.push(`Bypass ${bypass}g`)
        }
    } else {
        pours.push(totalWater * 0.4);

        if (coffee === "Red Catuai Natural" || coffee === "Marsellesa Termico" || coffee === "Anaerobic H15") {
            for (let i = 0; i < 2; i++) {
                const halfs = (totalWater * 0.6) / 2;
                pours.push(pours[pours.length - 1] + halfs);
            }
        } else if (coffee === "Geisha Red Honey" || coffee === "Pacamara Honey" || coffee === "Pacamara Blackmoon") {
            for (let i = 0; i < 3; i++) {
                const thirds = (totalWater * 0.6) / 3;
                pours.push(pours[pours.length - 1] + thirds);
            }
        }
    }

    return pours;
}

function seconds2Minutes(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
}

const Recipe = ({ recipeName, method, coffee, grams, ratio }) => {
    const pours = getPourSchedule(recipeName, method, coffee, grams, ratio);

    return (
        <div className="space-y-0 overflow-hidden rounded-2xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-surface-800 shadow-soft">
            {pours.map((step, index) => (
                <div
                    key={index}
                    className={`flex items-center justify-between px-4 py-3 transition-colors
                        ${index !== pours.length - 1 ? 'border-b border-neutral-100 dark:border-neutral-700/50' : ''}
                        ${index === 0 ? 'bg-brand-50/50 dark:bg-brand-900/20' : ''}
                    `}
                >
                    <div className="flex items-center gap-3">
                        <span className="flex items-center justify-center w-6 h-6 rounded-full bg-neutral-100 dark:bg-surface-700 text-[11px] font-semibold text-neutral-500 dark:text-neutral-400">
                            {index + 1}
                        </span>
                        <span className="text-sm font-medium text-neutral-800 dark:text-neutral-100">
                            {step}{typeof step === "number" && 'g'}
                        </span>
                    </div>
                    <span className="text-xs font-mono text-neutral-400 dark:text-neutral-500">
                        {seconds2Minutes((index + 1) * 35)}
                    </span>
                </div>
            ))}
        </div>
    );
};

export default Recipe;
