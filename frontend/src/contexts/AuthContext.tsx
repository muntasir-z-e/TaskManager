"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";

// Define the user type
export interface User {
  id: string;
  email: string;
}

interface DecodedToken {
  sub: string;
  email: string;
  exp: number;
  iat: number;
}

// Define the login response type
interface LoginResponse {
  token?: string;
  access_token?: string;
  user?: {
    id: string;
    email: string;
  };
  [key: string]: unknown;
}

// Define the context value type
interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

// Create the context with default values
const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  error: null,
  login: async () => {},
  signup: async () => {},
  logout: () => {},
});

// Auth provider component
export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  // Check for existing token on mount
  useEffect(() => {
    const initAuth = () => {
      try {
        const token = Cookies.get("token");
        if (token) {
          // Decode token to get user info
          const decoded = jwtDecode(token) as DecodedToken;

          // Check if token is expired
          if (decoded && decoded.exp * 1000 > Date.now()) {
            setUser({
              id: decoded.sub,
              email: decoded.email,
            });
          } else {
            // Token expired, remove it
            Cookies.remove("token");
          }
        }
      } catch {
        // Silently handle error - no need to alarm user
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, []);

  // Login function
  const login = async (email: string, password: string) => {
    setLoading(true);
    setError(null);

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
      const url = `${apiUrl}/api/auth/login`;

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error(`Status: ${response.status}`);
      }

      const data = await response.json();
      return processLoginResponse(data);
    } catch {
      setError(
        "Login failed. Please check your credentials or try again later."
      );
    } finally {
      setLoading(false);
    }
  };

  // Helper function to process login response
  const processLoginResponse = (data: LoginResponse) => {
    // Check if the response has either token or access_token
    const authToken = data.token || data.access_token;

    if (authToken) {
      // Store token in cookie
      Cookies.set("token", authToken, { expires: 7 }); // 7 days expiry

      // Decode token to get user info
      const decoded = jwtDecode(authToken) as DecodedToken;
      setUser({
        id: decoded.sub,
        email: decoded.email,
      });

      // Redirect to dashboard
      router.push("/dashboard");
    } else {
      throw new Error("Invalid response from server - missing token");
    }
  };

  // Signup function
  const signup = async (email: string, password: string) => {
    setLoading(true);
    setError(null);

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

      // Use query parameters as this works with the backend
      const url = new URL(`${apiUrl}/api/auth/signup`);
      url.searchParams.append("email", email);
      url.searchParams.append("password", password);

      const response = await fetch(url.toString(), {
        method: "POST",
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error(`Status: ${response.status}`);
      }

      // Just get the response, we don't need to use the userData
      await response.json();

      // After successful registration, redirect to login
      setError(null);
      router.push("/login?registered=true");
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message || "Failed to create account");
      } else {
        setError("Failed to create account");
      }
    } finally {
      setLoading(false);
    }
  };

  // Logout function
  const logout = () => {
    Cookies.remove("token");
    setUser(null);
    router.push("/login");
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, error, login, signup, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Hook to use the auth context
export const useAuth = () => useContext(AuthContext);

export default AuthContext;
