import { useContext } from "react";
import { AuthContext } from "../context/Auth.context";

export const useAuth = () => {
  const { state, dispatch } = useContext(AuthContext);
  
  return { state, dispatch };
};
