import { createContext } from 'react';
import { useState, useRef } from 'react';

export const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
    const [actualRadioId, setActualRadioId] = useState(1)
    const [isPlaying, setIsPlaying] = useState(false)

    const methods = useRef({});

    const registerMethod = (name, method) => {
      methods.current[name] = method;
    };
  
    const unregisterMethod = (name) => {
      delete methods.current[name];
    };
  
    const callMethod = (name, ...args) => {
      if (methods.current[name]) {
        methods.current[name](...args);
      } else {
        console.warn(`Método "${name}" não encontrado!`);
      }
    };
  
    return (
      <GlobalContext.Provider value={
        { 
          actualRadioId, 
          setActualRadioId, 
          isPlaying,
          setIsPlaying,
          registerMethod, 
          unregisterMethod, 
          callMethod
        }
        }>
        {children}
      </GlobalContext.Provider>
    );
  };