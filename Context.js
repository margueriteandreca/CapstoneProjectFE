import { createContext } from "react";

export const TokenContext = createContext({
  token: null,
  setToken: () => {},
});

export const UserContext = createContext({});
