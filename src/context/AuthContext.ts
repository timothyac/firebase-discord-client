import { createContext } from "react";

// TODO: Redefine as user object
type State = any;

export const AuthStateContext = createContext<State>({
  isAuthenticated: false,
});
