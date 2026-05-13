import React, { useEffect, useReducer } from 'react';
import Papa from 'papaparse';
import recs from './recs.csv';
import { FiThermometer } from 'react-icons/fi';

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

const initialState = {
  csvData: [],
  filteredData: [],
  temp: [],
  grind: []
};

const Recommendation = ({ type, method, coffee, grams, ratio }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const isWithinRange = (range, value) => {
    if (!range || !value) return false;
    const [min, max] = range.split('-').map(Number);
    const numValue = parseFloat(value);
    return numValue >= min && numValue < max;
  };

  useEffect(() => {
    Papa.parse(recs, {
      download: true,
      header: true,
      complete: (result) => {
        dispatch({ type: 'SET_CSV_DATA', payload: result.data });
      },
    });
  }, []);

  useEffect(() => {
    const filtered = state.csvData.filter((item) => {
      const matchesMethod = method ? item.Method === method : true;
      const matchesRatio = ratio ? isWithinRange(item.Ratio, ratio) : true;
      const matchesGrams = grams ? isWithinRange(item.Grams, grams) : true;
      return matchesMethod && matchesRatio && matchesGrams;
    });
    dispatch({ type: 'SET_FILTERED_DATA', payload: filtered });
  }, [method, ratio, grams, state.csvData]);

  const isTmp = type === "TMP";
  const value = isTmp ? state.temp : state.grind;
  const label = isTmp ? "Temp" : "C40";
  const icon = isTmp ? <FiThermometer size={16} /> : (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3" />
      <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
    </svg>
  );

  return (
    <div className={`flex-1 flex items-center gap-3 px-4 py-3 rounded-2xl border transition-colors
      ${isTmp
        ? 'bg-blue-50/70 dark:bg-blue-900/20 border-blue-200/60 dark:border-blue-800/40'
        : 'bg-emerald-50/70 dark:bg-emerald-900/20 border-emerald-200/60 dark:border-emerald-800/40'
      }`}
    >
      <span className={`${isTmp ? 'text-blue-500 dark:text-blue-400' : 'text-emerald-500 dark:text-emerald-400'}`}>
        {icon}
      </span>
      <div>
        <p className={`text-[11px] font-semibold uppercase tracking-wider mb-0 ${isTmp ? 'text-blue-500/70 dark:text-blue-400/70' : 'text-emerald-500/70 dark:text-emerald-400/70'}`}>
          {label}
        </p>
        <p className={`text-sm font-bold mb-0 ${isTmp ? 'text-blue-700 dark:text-blue-300' : 'text-emerald-700 dark:text-emerald-300'}`}>
          {value.length > 0 ? value.join(', ') : '—'}
        </p>
      </div>
    </div>
  );
};

export default Recommendation;
