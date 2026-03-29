import axios from "axios";
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { text } from "stream/consumers";

interface User {
  id: string;
  email: string;
  name: string;
  role: "admin" | "creator" | "user";
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, name: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get("/api/auth/me");
        if (response.status === 200) {
          const userData = response.data;
          setUser(userData);
        }
      } catch (error) {
        console.error("Auth check failed:", error);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string) => {
    const response = await axios.post("http://localhost:4000/api/auth/login", {
      email,
      password,
    });
    const contentType = response.headers["content-type"];
    const text = response.data ? JSON.stringify(response.data) : "";
    if (response.status === 200) {
      if (contentType && contentType.includes("application/json") && text) {
        const userData = JSON.parse(text);
        setUser(userData);
      } else if (!text) {
        throw new Error("Server returned success but empty response");
      } else {
        throw new Error("Server returned success but invalid content type");
      }
    } else {
      if (contentType && contentType.includes("application/json") && text) {
        const errorData = JSON.parse(text);
        throw new Error(errorData.message || "Login failed");
      } else {
        throw new Error(
          `Login failed (${response.status}): ${text.substring(0, 100) || "Empty response"}`,
        );
      }
    }
  };

  const signup = async (email: string, password: string, name: string) => {
    const response = await axios.post("http://localhost:4000/api/auth/signup", {
      email,
      password,
      name,
    });

    if (response.status === 201) {
      const contentType = response.headers["content-type"];
      const text = response.data ? JSON.stringify(response.data) : "";
      if (contentType && contentType.includes("application/json") && text) {
        const userData = response.data;
        setUser(userData);
      } else if (!text) {
        throw new Error("Server returned success but empty response");
      } else {
        throw new Error("Server returned success but invalid content type");
      }
    } else {
      const contentType = response.headers["content-type"];
      const text = response.data ? JSON.stringify(response.data) : "";
      if (contentType && contentType.includes("application/json") && text) {
        const errorData = response.data;
        throw new Error(errorData.message || "Signup failed");
      } else {
        throw new Error(
          `Signup failed (${response.status}): ${text.substring(0, 100) || "Empty response"}`,
        );
      }
    }
  };

  const logout = async () => {
    await axios.post("/api/auth/logout");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
