import { useState, useEffect } from 'react';
import { createContainer } from 'react-tracked';

import { loadState, saveState } from './Helpers';

const globalState = {
  // Declare your global variable and functions here
  layoutMode: 'static',
  layoutColorMode: 'dark',
  currencies: [],
  currentCurrency: null,
  user: null
};

const useLocalState = () => {
  const [processedState, setProcessedState] = useState((loadState() || globalState));
  useEffect(() => {
    saveState(processedState);
  }, [processedState]);
  return [processedState, setProcessedState];
};

export const { Provider, useTracked } = createContainer(useLocalState);
