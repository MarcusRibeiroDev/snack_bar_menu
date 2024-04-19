import { createContext, useContext } from "react";

// Criação do contexto de autenticação
const AuthContext = createContext();

// Provedor de contexto de autenticação
export function AuthProvider({ children, value }) {
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// Hook personalizado para usar o contexto de autenticação
export function useAuthValue() {
  return useContext(AuthContext);
}
