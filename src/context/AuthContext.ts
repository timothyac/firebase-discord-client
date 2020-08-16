import { createContext } from "react";

type State = { isAuthenticated: any };

export const AuthStateContext = createContext<State | undefined>(undefined);
export const AuthFunctionContext = createContext<any>(undefined);
