import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

/**
 * Mock JWT token generator
 */
function generateMockToken(username) {
  const payload = {
    username,
    exp: Date.now() + 3600000, // 1 hour
    iat: Date.now(),
  };
  return btoa(JSON.stringify(payload));
}

/**
 * Mock JWT token decoder
 */
function decodeToken(token) {
  try {
    const payload = JSON.parse(atob(token));
    return payload;
  } catch {
    return null;
  }
}

/**
 * Check if token is expired
 */
function isTokenExpired(token) {
  const payload = decodeToken(token);
  if (!payload || !payload.exp) return true;
  return Date.now() >= payload.exp;
}

/**
 * Auth Provider Component
 */
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('swapi_token'));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if token exists and is valid
    if (token) {
      const payload = decodeToken(token);
      if (payload && !isTokenExpired(token)) {
        setUser({ username: payload.username });
      } else {
        // Token expired, try to refresh
        refreshToken();
      }
    }
    setLoading(false);
  }, []);

  // Silent token refresh
  useEffect(() => {
    if (token && user) {
      const interval = setInterval(() => {
        if (isTokenExpired(token)) {
          refreshToken();
        }
      }, 300000); // Check every 5 minutes

      return () => clearInterval(interval);
    }
  }, [token, user]);

  function refreshToken() {
    if (user) {
      const newToken = generateMockToken(user.username);
      setToken(newToken);
      localStorage.setItem('swapi_token', newToken);
    }
  }

  function login(username, password) {
    // Mock authentication - accept any credentials
    // In a real app, this would call an API
    if (username && password) {
      const newToken = generateMockToken(username);
      setToken(newToken);
      setUser({ username });
      localStorage.setItem('swapi_token', newToken);
      return true;
    }
    return false;
  }

  function logout() {
    setUser(null);
    setToken(null);
    localStorage.removeItem('swapi_token');
  }

  const value = {
    user,
    token,
    login,
    logout,
    isAuthenticated: !!user && !!token && !isTokenExpired(token),
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

/**
 * Hook to use auth context
 */
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}


