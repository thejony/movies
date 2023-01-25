import { createContext, useContext } from 'react';

const Context = createContext();

export function useCustomContext() {
  return useContext(Context);
};

export default Context;