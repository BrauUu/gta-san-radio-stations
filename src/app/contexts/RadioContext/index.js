import { createContext } from 'react';
import { useState } from 'react';

export const RadioContext = createContext();

export const RadioProvider = ({ children }) => {
    const [actualRadioId, setActualRadioId] = useState(1)
  
    return (
      <RadioContext.Provider value={{ actualRadioId, setActualRadioId }}>
        {children}
      </RadioContext.Provider>
    );
  };