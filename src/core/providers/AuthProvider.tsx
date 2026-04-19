"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { AUTH_CHANGE_EVENT, tokenStorage } from "@/core/utils/local_storage";

interface AuthContextValue {
  isSignedIn: boolean;
  token: string | null;
}

const AuthContext = createContext<AuthContextValue>({
  isSignedIn: false,
  token: null,
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    setToken(tokenStorage.get());

    function handleAuthChange() {
      setToken(tokenStorage.get());
    }

    window.addEventListener(AUTH_CHANGE_EVENT, handleAuthChange);
    return () =>
      window.removeEventListener(AUTH_CHANGE_EVENT, handleAuthChange);
  }, []);

  return (
    <AuthContext.Provider value={{ isSignedIn: !!token, token }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
