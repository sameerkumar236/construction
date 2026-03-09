import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user,         setUser]         = useState(null);
  const [checkingAuth, setCheckingAuth] = useState(true);

  // ── On mount: verify cookie session with server ──────────────────────────
  useEffect(() => {
    const verifySession = async () => {
      try {
        const res = await fetch("/api/auth/me", { credentials: "include" });
        if (res.ok) {
          const data = await res.json();
          setUser(data.user);
        } else {
          setUser(null);
        }
      } catch {
        // Network error — keep null, don't crash
        setUser(null);
      } finally {
        setCheckingAuth(false);
      }
    };
    verifySession();
  }, []);

  const login = (userData) => {
    setUser(userData); // cookie already set by server on login response
  };

  const logout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST", credentials: "include" });
    } catch {}
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, checkingAuth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// ── Custom hook ──────────────────────────────────────────────────────────────
export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
  return ctx;
}