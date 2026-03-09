import { createContext, useContext, useEffect, useMemo, useState, type PropsWithChildren } from "react";
import { initialAppData } from "@shared/mocks/data";
import type { DemoUser } from "@shared/types/domain";

const STORAGE_KEY = "primeo-demo-session";

interface AuthContextValue {
  user: DemoUser | null;
  isAuthenticated: boolean;
  login: (email: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: PropsWithChildren) {
  const [user, setUser] = useState<DemoUser | null>(null);

  useEffect(() => {
    const storedEmail = localStorage.getItem(STORAGE_KEY);
    if (!storedEmail) {
      return;
    }

    const matchedUser = initialAppData.users.find((item) => item.email === storedEmail);
    if (matchedUser) {
      setUser(matchedUser);
    }
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      isAuthenticated: Boolean(user),
      login: (email: string) => {
        const matchedUser = initialAppData.users.find((item) => item.email === email);
        if (!matchedUser) {
          return false;
        }

        localStorage.setItem(STORAGE_KEY, matchedUser.email);
        setUser(matchedUser);
        return true;
      },
      logout: () => {
        localStorage.removeItem(STORAGE_KEY);
        setUser(null);
      },
    }),
    [user],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe usarse dentro de AuthProvider");
  }

  return context;
}
