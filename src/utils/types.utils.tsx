export type AuthState = {
    user: any | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    error: string | null;
  };
  
  export type AuthAction =
    | { type: "AUTH_START" }
    | { type: "AUTH_SUCCESS"; payload: any }
    | { type: "AUTH_FAILURE"; payload: string }
    | { type: "LOGOUT" }
    | { type: 'CLEAR_ERROR'};

export type AuthContextType = {
        state: AuthState;
        dispatch: React.Dispatch<AuthAction>;
};