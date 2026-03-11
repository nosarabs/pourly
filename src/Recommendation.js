import React, { useEffect, useReducer } from 'react';
import Papa from 'papaparse';
import recs from './recs.csv';

// Define the reducer function
const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_CSV_DATA':
      return { ...state, csvData: action.payload };
    case 'SET_FILTERED_DATA':
      return { 
        ...state, 
        filteredData: action.payload, 
        temp: action.payload.map(item => item.temp), 
        grind: action.payload.map(item => item.C40) 
      };
    default:
      return state;
  }
};

// Initial state
const initialState = {
  csvData: [],
  filteredData: [],
  temp: [],
  grind: []
};

const Recommendation = ({ type, method, coffee, grams, ratio }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Helper function to parse a range string like "10-20"
  const isWithinRange = (range, value) => {
    if (!range || !value) return false;
    const [min, max] = range.split('-').map(Number);
    const numValue = parseFloat(value);
    return numValue >= min && numValue < max;
  };

  // Load and parse the CSV file on component mount
  useEffect(() => {
    Papa.parse(recs, {
      download: true,
      header: true,
      complete: (result) => {
        dispatch({ type: 'SET_CSV_DATA', payload: result.data });
      },
    });
  }, []);

  // Dynamically filter the data when any filter input changes
  useEffect(() => {
    const filtered = state.csvData.filter((item) => {
      const matchesMethod = method ? item.Method === method : true;
      const matchesRatio = ratio ? isWithinRange(item.Ratio, ratio) : true;
      const matchesGrams = grams ? isWithinRange(item.Grams, grams) : true;

      return matchesMethod && matchesRatio && matchesGrams;
    });

    dispatch({ type: 'SET_FILTERED_DATA', payload: filtered });
  }, [method, ratio, grams, state.csvData]);

  return (
    <div>
      {type === "TMP" && (
        <div className="alert alert-primary" role="alert">
          <strong>TMP</strong> {state.temp}
        </div>
      )}
      {type === "C40" && (
        <div className="alert alert-success" role="alert">
          <strong>C40</strong> {state.grind}
        </div>
      )}
    </div>
  );
};

export default Recommendation;
