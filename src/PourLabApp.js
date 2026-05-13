import React, { useState } from "react";
import Groq from "groq-sdk";

const coffees = ['Red Catuai Natural', 'Marsellesa Termico', 'Geisha Red Honey', 'Pacamara Honey', 'Random'];

function getRandomNum(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function PourLabApp() {
  const [method, setMethod] = useState(null);
  const [coffee, setCoffee] = useState(null);
  const [grams, setGrams] = useState(null);
  const [ratio, setRatio] = useState(null);
  const [recipe, setRecipe] = useState(null);
  const [aiRecipe, setAiRecipe] = useState(null);

  const handleCoffeeSelect = (option) => {
    setCoffee(option === "Random" ? coffees[getRandomNum(0, coffees.length - 1)] : option);
  };

  const generateRecipe = () => {
    const gramsValue = getRandomNum(12, 30);
    const ratioValue = getRandomNum(10, 20);
    setGrams(gramsValue);
    setRatio(ratioValue);
    const pours = getRecipe(method, coffee, ratioValue, gramsValue);
    setRecipe(pours);
  };

  const getAiRecipe = async () => {
    const prompt = `Suggest a grind size in Comandante C40 clicks for a ${method} ${coffee} coffee with a ratio of 1:${ratio}`;
    try {
      const client = new Groq({
        apiKey: process.env.REACT_APP_GROQ_KEY,
        dangerouslyAllowBrowser: true,
      });
      const response = await client.chat.completions.create({
        messages: [
          { role: 'system', content: 'You are a coffee expert assistant.' },
          { role: 'user', content: prompt },
        ],
        model: 'gemma-7b-it',
      });
      setAiRecipe(response.choices[0].message.content);
    } catch (error) {
      console.error('Error fetching AI recipe:', error);
    }
  };

  return (
    <div className="max-w-lg mx-auto px-4 py-8 space-y-6">
      <h1 className="text-2xl font-display font-bold text-neutral-800 dark:text-neutral-100">Pour Lab</h1>

      <div className="space-y-3">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-neutral-500">Select a Coffee Process</h3>
        <div className="flex flex-wrap gap-2">
          {coffees.map((coffeeOption) => (
            <button
              key={coffeeOption}
              onClick={() => handleCoffeeSelect(coffeeOption)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200
                ${coffee === coffeeOption
                  ? 'bg-brand-500 text-white shadow-md'
                  : 'bg-white dark:bg-surface-800 border border-neutral-200 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 hover:border-brand-300 dark:hover:border-brand-600'
                }`}
            >
              {coffeeOption}
            </button>
          ))}
        </div>
      </div>

      {method && coffee && (
        <div className="rounded-2xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-surface-800 p-5 shadow-soft space-y-4">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div><span className="text-neutral-400">Method</span><p className="font-medium">{method}</p></div>
            <div><span className="text-neutral-400">Process</span><p className="font-medium">{coffee}</p></div>
            <div><span className="text-neutral-400">Grams</span><p className="font-medium">{grams}</p></div>
            <div><span className="text-neutral-400">Ratio</span><p className="font-medium">{ratio}</p></div>
          </div>

          <button
            onClick={generateRecipe}
            className="w-full py-2.5 rounded-xl bg-brand-500 hover:bg-brand-600 text-white text-sm font-semibold shadow-sm transition-all duration-200 active:scale-[0.98]"
          >
            Generate Recipe
          </button>

          {recipe && (
            <div className="space-y-3">
              <h4 className="text-sm font-semibold text-neutral-600 dark:text-neutral-300">Recipe Steps</h4>
              <ul className="space-y-1">
                {recipe.map((step, index) => (
                  <li key={index} className="flex items-center gap-2 text-sm text-neutral-700 dark:text-neutral-300">
                    <span className="w-5 h-5 flex items-center justify-center rounded-full bg-neutral-100 dark:bg-surface-700 text-[10px] font-semibold text-neutral-500">{index + 1}</span>
                    {step}g
                  </li>
                ))}
              </ul>

              <button
                onClick={getAiRecipe}
                className="w-full py-2.5 rounded-xl bg-neutral-100 dark:bg-surface-700 hover:bg-neutral-200 dark:hover:bg-surface-700/80 text-sm font-medium text-neutral-700 dark:text-neutral-300 transition-all duration-200"
              >
                Get AI Suggestion
              </button>

              {aiRecipe && (
                <p className="text-sm text-neutral-600 dark:text-neutral-400 bg-neutral-50 dark:bg-surface-700 rounded-xl p-3">
                  {aiRecipe}
                </p>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function getRecipe(method, coffee, ratio, grams) {
  const totalWater = ratio * grams;
  const bloom = 3 * grams;
  let pours = [];

  pours.push(bloom);
  pours.push(totalWater * 0.4);

  if (coffee === "Red Catuai Natural" || coffee === "Marsellesa Termico") {
    for (let i = 0; i < 2; i++) {
      const halfs = (totalWater * 0.6) / 2;
      pours.push(pours[pours.length - 1] + halfs);
    }
  } else if (coffee === "Geisha Red Honey" || coffee === "Pacamara Honey") {
    for (let i = 0; i < 2; i++) {
      const thirds = (totalWater * 0.6) / 3;
      pours.push(pours[pours.length - 1] + thirds);
    }
  }

  return pours;
}

export default PourLabApp;
