import React, { createContext, useContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

// Criação do contexto
const AuthContext = createContext();

// Hook para usar o contexto
export function useAuth() {
  return useContext(AuthContext);
}

// Provider do contexto
export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => {
    return sessionStorage.getItem("token") || null;
  });

  // NOVO ESTADO: Para armazenar os dados decodificados do usuário
  const [user, setUser] = useState(null); 

  // Efeito para sincronizar o token e decodificar os dados do usuário
  useEffect(() => {
    if (token) {
      sessionStorage.setItem("token", token);
      
      try {
        // 1. Decodifica o token
        const decoded = jwtDecode(token); 
        
        // 2. Armazena os dados do Payload no estado 'user'
        // Assumimos que o backend incluiu: 'sub' (email/id), 'nome' (opcional)
        console.log(decoded)
        setUser({
          email: decoded.sub, // O campo 'sub' (Subject) é o padrão para o ID/Email principal
          nome: decoded.nome || 'Usuário', // Use 'nome' se seu backend o incluiu. Se não, use um valor padrão.
          // Adicione aqui outros campos que seu backend incluiu no token (ex: roles, id, etc.)
        });

      } catch (e) {
        console.error("Erro ao decodificar o token:", e);
        // Se a decodificação falhar (token inválido), faz logout
        logout(); 
      }

    } else {
      sessionStorage.removeItem("token");
      setUser(null); // Reseta os dados do usuário ao fazer logout
    }
  }, [token]);

  // Função para login (inclusão do token)
  function login(newToken) {
    setToken(newToken);
  }

  // Função para logout (remoção do token)
  function logout() {
    setToken(null);
  }

  return (
    // Inclui 'user' no objeto value
    <AuthContext.Provider value={{ token, user, login, logout }}> 
      {children}
    </AuthContext.Provider>
  );
}