import { createContext } from 'react';
import { useState } from 'react';

export const RadioContext = createContext();

export const RadioProvider = ({ children }) => {
    const [actualRadioId, setActualRadioId] = useState(1)
    const [isPlaying, setIsPlaying] = useState(false)
  
    return (
      <RadioContext.Provider value={
        { 
          actualRadioId, 
          setActualRadioId, 
          isPlaying,
          setIsPlaying
        }
        }>
        {children}
      </RadioContext.Provider>
    );
  };