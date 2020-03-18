import React, { createContext, useReducer, useContext } from 'react';

export const GlobalContext = createContext();

export const GlobalProvider = GlobalContext.Provider;

export const GlobalConsumer = GlobalContext.Consumer;
