import React, { useState, useEffect } from "react";
import MainPage from "./MainPage";
import "./App.css";
import Navbar from './Navbar';
import Config from './Config';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
    const defaultBrewingMethods = ['Aeropress', 'V60', 'Origami', 'Kalita', 'Plinc', 'Graycano', 'UFO', 'Brewista Tornado'];
    const defaultCoffeeTypes = ['Red Catuai Natural', 'Marsellesa Termico', 'Geisha Red Honey', 'Pacamara Honey', 'Pacamara Blackmoon', 'Anaerobic H15'];

    const [brewingMethods, setBrewingMethods] = useState(() => {
        const storedMethods = JSON.parse(localStorage.getItem('brewingMethods'));
        return storedMethods || defaultBrewingMethods;
    });

    const [coffeeTypes, setCoffeeTypes] = useState(() => {
        const storedTypes = JSON.parse(localStorage.getItem('coffeeTypes'));
        return storedTypes || defaultCoffeeTypes;
    });

    const [darkMode, setDarkMode] = useState(() => {
        return localStorage.getItem('theme') === 'dark';
    });

    useEffect(() => {
        localStorage.setItem('brewingMethods', JSON.stringify(brewingMethods));
    }, [brewingMethods]);

    useEffect(() => {
        localStorage.setItem('coffeeTypes', JSON.stringify(coffeeTypes));
    }, [coffeeTypes]);

    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
        localStorage.setItem('theme', darkMode ? 'dark' : 'light');
    }, [darkMode]);

    const addBrewingMethod = (newMethod) => {
        if (newMethod && !brewingMethods.includes(newMethod)) {
            setBrewingMethods([...brewingMethods, newMethod]);
        }
    };

    const addCoffeeType = (newCoffee) => {
        if (newCoffee && !coffeeTypes.includes(newCoffee)) {
            setCoffeeTypes([...coffeeTypes, newCoffee]);
        }
    };

    const toggleDarkMode = () => setDarkMode(prev => !prev);

    return (
        <Router>
            <div className="min-h-screen bg-surface-50 dark:bg-surface-900 text-neutral-800 dark:text-neutral-100 transition-colors duration-300">
                <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
                <main className="max-w-lg mx-auto px-4 pt-6 pb-20">
                    <Routes>
                        <Route path="/pourly" element={
                            <MainPage brewingMethods={brewingMethods} coffeeTypes={coffeeTypes} />
                        } />
                        <Route path="/config" element={
                            <Config
                                onAddBrewingMethod={addBrewingMethod}
                                onAddCoffeeType={addCoffeeType}
                                darkMode={darkMode}
                                toggleDarkMode={toggleDarkMode}
                            />
                        } />
                    </Routes>
                </main>
            </div>
        </Router>
    );
}

export default App;
