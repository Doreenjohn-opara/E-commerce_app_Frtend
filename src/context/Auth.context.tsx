import React, { createContext, useReducer, ReactNode, useEffect } from "react";
import { authReducer } from "../reducer/Auth.reducer";
import { AuthAction, AuthContextType, AuthState } from "../utils/types.utils";

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
};

export const AuthContext = createContext<AuthContextType>({
  state: initialState,
  dispatch: () => null,
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      dispatch({ type: "AUTH_SUCCESS", payload: {} });
    } else {
      dispatch({ type: "AUTH_FAILURE", payload: "Authentication failed" });
    }
  }, []);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
