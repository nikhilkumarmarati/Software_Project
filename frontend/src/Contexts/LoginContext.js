import { createContext } from "react";
const initialContextValues = {
  isSignedIn: false,
  setSignedIn: () => {} 
};

export const LoginContext = createContext(initialContextValues);