import { createContext } from 'react';
import { useState, useRef } from 'react';

import radiosList from '../data/radiosList';

export const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
    const [currentRadio, setCurrentRadio] = useState(radiosList[5])
    const [player, setPlayer] = useState(null);

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
          currentRadio,
          setCurrentRadio,
          player, 
          setPlayer,
          registerMethod, 
          unregisterMethod, 
          callMethod
        }
        }>
        {children}
      </GlobalContext.Provider>
    );
  };