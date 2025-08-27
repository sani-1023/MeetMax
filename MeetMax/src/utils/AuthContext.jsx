import { createContext, useContext, useState, useEffect } from "react";
import { fakeApi } from "./Fakeapi";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const currentUser = fakeApi.getCurrentUser();
  
    setUser(currentUser);
    setLoading(false);
  }, []);

  const signUp = async (data) => {
    return fakeApi.signUp(data);
  };

  const signIn = async (data) => {
    const res = await fakeApi.signIn(data);
    setUser(res.user);
    return res;
  };

  const signOut = () => {
    fakeApi.signOut();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, signUp, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
