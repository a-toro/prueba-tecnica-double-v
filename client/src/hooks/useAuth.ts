import { useContext } from "react";
import AuthContext from "../context/AuthProvider";

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) throw new Error("No existe un contexto para usar el useAuth");
  return context;
};
