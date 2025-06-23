"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { useRouter } from "next/navigation";
import { verifyToken } from "@/lib/auth";

// Define types
type User = {
  id: number;
  name: string;
  email: string;
};

interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (
    email: string,
    password: string
  ) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  checkAuthStatus: () => boolean;
}

// Create the context with a default value
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Auth provider component
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  // Function to check token validity
  const checkAuthStatus = (): boolean => {
    const storedToken = localStorage.getItem("token");

    if (!storedToken) {
      // No token found
      return false;
    }

    // Verify token
    const { valid, expired } = verifyToken(storedToken);

    if (!valid || expired) {
      // Token invalid or expired - clear auth state
      setUser(null);
      setToken(null);
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      return false;
    }

    return true;
  };

  // Check for stored user data on initial load
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");

    if (storedToken) {
      // Verify token
      const { valid, expired } = verifyToken(storedToken);

      if (!valid || expired) {
        // Token invalid or expired - clear auth state and redirect
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        router.push("/auth/login");
      } else {
        // Token valid
        setToken(storedToken);

        // Set user if available
        if (storedUser) {
          try {
            setUser(JSON.parse(storedUser));
          } catch (error) {
            console.error("Failed to parse stored user", error);
            localStorage.removeItem("user");
          }
        }
      }
    } else if (
      window.location.pathname !== "/auth/login" &&
      window.location.pathname !== "/auth/register" 
    ) {
      // No token and not on auth pages - redirect to login
      router.push("/auth/login");
    }

    setIsLoading(false);
  }, [router]);

  // Periodically check token validity (every 5 minutes)
  useEffect(() => {
    const interval = setInterval(() => {
      if (token) {
        const isValid = checkAuthStatus();
        if (!isValid && window.location.pathname !== "/auth/login") {
          router.push("/auth/login");
        }
      }
    }, 300000); // 5 minutes in milliseconds

    return () => clearInterval(interval);
  }, [token, router]);

  // Login function
  const login = async (email: string, password: string) => {
    setIsLoading(true);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setIsLoading(false);
        return {
          success: false,
          error: data.error || "Login failed",
        };
      }

      // Store user in state and localStorage
      setUser(data.user);
      localStorage.setItem("user", JSON.stringify(data.user));

      // If the API returns a token (currently it doesn't in the route.ts),
      // store it too
      if (data.token) {
        setToken(data.token);
        localStorage.setItem("token", data.token);
      }

      setIsLoading(false);
      return { success: true };
    } catch (error) {
      console.error("Login error:", error);
      setIsLoading(false);
      return {
        success: false,
        error: "An unexpected error occurred",
      };
    }
  };

  // Logout function
  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    router.push("/auth/login");
  };

  // Create the context value
  const value = {
    user,
    token,
    isAuthenticated: !!user,
    isLoading,
    login,
    logout,
    checkAuthStatus,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// Custom hook to use the auth context
export function useAuth() {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}
