import { Navigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { isAuthenticated, getUserRole, clearAuth, isTokenExpired } from "@/lib/auth";

interface ProtectedRouteProps {
  children: JSX.Element;
  requiredRole?: "student" | "organizer";
}

export default function ProtectedRoute({ children, requiredRole }: ProtectedRouteProps) {
  const [isValidating, setIsValidating] = useState(true);
  const [isAuth, setIsAuth] = useState(false);
  const [hasValidRole, setHasValidRole] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const validateAuth = async () => {
      // First check if token is expired (quick client-side check)
      if (isTokenExpired()) {
        clearAuth();
        setIsAuth(false);
        setIsValidating(false);
        toast.error("Session expired", {
          description: "Please login again to continue.",
        });
        return;
      }

      // Validate token with backend
      const isValid = await isAuthenticated();

      if (!isValid) {
        clearAuth();
        setIsAuth(false);
        setIsValidating(false);
        toast.error("Authentication required", {
          description: "Please login to access this page.",
        });
        return;
      }

      // Token is valid
      setIsAuth(true);

      // Check role if required
      if (requiredRole) {
        const userRole = getUserRole();
        if (userRole === requiredRole) {
          setHasValidRole(true);
        } else {
          setHasValidRole(false);
          toast.error("Access denied", {
            description: `This page is only accessible to ${requiredRole}s.`,
          });
        }
      } else {
        setHasValidRole(true);
      }

      setIsValidating(false);
    };

    validateAuth();
  }, [requiredRole]);

  // Show loading while validating
  if (isValidating) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Verifying access...</p>
        </div>
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!isAuth) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Redirect to appropriate dashboard if role doesn't match
  if (!hasValidRole) {
    const userRole = getUserRole();
    const redirectPath = userRole === "student" ? "/student-dashboard" : "/organizer-dashboard";
    return <Navigate to={redirectPath} replace />;
  }

  return children;
}
