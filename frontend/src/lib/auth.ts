import { toast } from "sonner";

/**
 * Check if user is authenticated with valid JWT token
 */
export const isAuthenticated = async (): Promise<boolean> => {
  const token = localStorage.getItem("tce_token");
  
  if (!token) {
    return false;
  }

  try {
    const response = await fetch("http://localhost:5000/api/users/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.ok;
  } catch (error) {
    return false;
  }
};

/**
 * Clear all authentication data from localStorage
 */
export const clearAuth = (): void => {
  localStorage.removeItem("tce_token");
  localStorage.removeItem("tce_isAuthenticated");
  localStorage.removeItem("tce_user_email");
  localStorage.removeItem("tce_user_role");
  localStorage.removeItem("tce_user_id");
  window.dispatchEvent(new Event("storage"));
};

/**
 * Handle token expiration - clear auth and redirect to login
 */
export const handleTokenExpired = (): void => {
  clearAuth();
  toast.error("Session expired", {
    description: "Your session has expired. Please login again.",
  });
};

/**
 * Get current user's role
 */
export const getUserRole = (): "student" | "organizer" | null => {
  const role = localStorage.getItem("tce_user_role");
  return role as "student" | "organizer" | null;
};

/**
 * Get current user's token
 */
export const getToken = (): string | null => {
  return localStorage.getItem("tce_token");
};

/**
 * Check if token is expired (basic check - actual validation happens on backend)
 */
export const isTokenExpired = (): boolean => {
  const token = getToken();
  if (!token) return true;

  try {
    // JWT tokens are base64 encoded with 3 parts separated by dots
    const payload = JSON.parse(atob(token.split('.')[1]));
    const expirationTime = payload.exp * 1000; // Convert to milliseconds
    return Date.now() >= expirationTime;
  } catch (error) {
    // If we can't parse the token, consider it expired
    return true;
  }
};

/**
 * Make authenticated API request with automatic token handling
 */
export const authenticatedFetch = async (
  url: string,
  options: RequestInit = {}
): Promise<Response> => {
  const token = getToken();

  if (!token) {
    throw new Error("No authentication token found");
  }

  // Check if token is expired before making request
  if (isTokenExpired()) {
    handleTokenExpired();
    throw new Error("Token expired");
  }

  const headers = {
    ...options.headers,
    Authorization: `Bearer ${token}`,
  };

  try {
    const response = await fetch(url, { ...options, headers });

    // Handle 401 Unauthorized (token expired or invalid)
    if (response.status === 401) {
      handleTokenExpired();
      throw new Error("Unauthorized");
    }

    return response;
  } catch (error) {
    if (error instanceof Error && error.message === "Unauthorized") {
      throw error;
    }
    throw error;
  }
};
