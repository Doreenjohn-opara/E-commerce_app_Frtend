import { AuthAction, AuthState } from "../utils/types.utils";

export const authReducer = (state: AuthState, action: AuthAction): AuthState => {
    switch (action.type) {
      case "AUTH_START":
        return { ...state, isLoading: true, error: null };
      case "AUTH_SUCCESS":
        return { ...state, isLoading: false, user: action.payload, isAuthenticated: true };
      case "AUTH_FAILURE":
        return { ...state, isLoading: false, error: action.payload };
      case "LOGOUT":
        return { ...state, user: null, isAuthenticated: false };
      case 'CLEAR_ERROR':
        return { ...state, error: null };
      default:
        return state;
    }
  };