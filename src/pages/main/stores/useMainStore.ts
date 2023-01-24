import React from 'react';
import { MainStore } from './MainStore';

const storesContext = React.createContext(new MainStore());
export const useMainStore = () => React.useContext(storesContext);
