import React, {useState, useEffect} from "react";
import MainPage from "./MainPage";
import "./App.css";
import Navbar from './Navbar';
import Config from './Config';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {

    // Default values for brewing methods and coffee types
    const defaultBrewingMethods = ['Aeropress', 'V60', 'Origami', 'Kalita', 'Plinc','Graycano','UFO','Brewista Tornado'];
    const defaultCoffeeTypes = ['Red Catuai Natural', 'Marsellesa Termico', 'Geisha Red Honey', 'Pacamara Honey', 'Pacamara Blackmoon', 'Anaerobic H15'];

    // Initialize state with values from local storage or defaults
    const [brewingMethods, setBrewingMethods] = useState(() => {
        const storedMethods = JSON.parse(localStorage.getItem('brewingMethods'));
        return storedMethods || defaultBrewingMethods;
    });

    const [coffeeTypes, setCoffeeTypes] = useState(() => {
        const storedTypes = JSON.parse(localStorage.getItem('coffeeTypes'));
        return storedTypes || defaultCoffeeTypes;
    });

    // Update local storage whenever brewingMethods or coffeeTypes changes
    useEffect(() => {
        localStorage.setItem('brewingMethods', JSON.stringify(brewingMethods));
    }, [brewingMethods]);

    useEffect(() => {
        localStorage.setItem('coffeeTypes', JSON.stringify(coffeeTypes));
    }, [coffeeTypes]);

    // Function to add a new brewing method
    const addBrewingMethod = (newMethod) => {
        if (newMethod && !brewingMethods.includes(newMethod)) {
            setBrewingMethods([...brewingMethods, newMethod]);
        }
    };

    // Function to add a new coffee type
    const addCoffeeType = (newCoffee) => {
        if (newCoffee && !coffeeTypes.includes(newCoffee)) {
            setCoffeeTypes([...coffeeTypes, newCoffee]);
        }
    };

    return (
        <Router>
            <Navbar />
            <div className="container mt-4">
                <Routes>
                    <Route path="/pourly" element={<MainPage brewingMethods={brewingMethods} coffeeTypes={coffeeTypes} />} />
                    <Route path="/config" element={<Config onAddBrewingMethod={addBrewingMethod} onAddCoffeeType={addCoffeeType}/>} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
