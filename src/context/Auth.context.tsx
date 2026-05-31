import React, {
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";

import { AxiosProvider } from "../Constant";

export interface AuthUser {
  _id: string;
  name: string;
  email: string;
  role: "user" | "admin";
}

interface AuthContextType {
  user: AuthUser | null;
  token: string | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (
    name: string,
    email: string,
    password: string,
    role?: string,
  ) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  token: null,
  isLoading: true,
  login: async () => {},
  register: async () => {},
  logout: () => {},
});

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Restore session from localStorage
  useEffect(() => {
    const savedToken = localStorage.getItem("nb_token");
    const savedUser = localStorage.getItem("nb_user");

    if (savedToken && savedUser) {
      setToken(savedToken);
      setUser(JSON.parse(savedUser));
      // No need to set Axios header — interceptor reads from localStorage automatically
    }

    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    const { data } = await AxiosProvider.post("/auth/login", {
      email,
      password,
    });

    const { token: newToken, user: newUser } = data;

    setToken(newToken);
    setUser(newUser);

    localStorage.setItem("nb_token", newToken);
    localStorage.setItem("nb_user", JSON.stringify(newUser));
    // Interceptor will pick up the token on the next request automatically
  };

  const register = async (
    name: string,
    email: string,
    password: string,
    role = "user",
  ) => {
    await AxiosProvider.post("/auth/register", {
      name,
      email,
      password,
      role,
    });
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("nb_token");
    localStorage.removeItem("nb_user");
  };

  return (
    <AuthContext.Provider
      value={{ user, token, isLoading, login, register, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
