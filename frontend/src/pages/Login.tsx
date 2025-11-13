import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, Mail, Lock, LogIn } from "lucide-react";
import { toast } from "sonner";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const location = useLocation();

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateForm = (): boolean => {
    const newErrors = { email: "", password: "" };
    let isValid = true;

    if (!email) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!validateEmail(email)) {
      newErrors.email = "Please enter a valid email address";
      isValid = false;
    }

    if (!password) {
      newErrors.password = "Password is required";
      isValid = false;
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Clear previous errors
    setErrors({ email: "", password: "" });
    
    // Validate form
    if (!validateForm()) {
      return;
    }
    
    setIsLoading(true);
    
    try {
      const response = await fetch("http://localhost:5000/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || data.error || "Login failed");
      }
      
      // Store auth data
      localStorage.setItem("tce_token", data.token);
      localStorage.setItem("tce_isAuthenticated", "true");
      localStorage.setItem("tce_user_email", data.user.email);
      localStorage.setItem("tce_user_role", data.user.role);
      localStorage.setItem("tce_user_id", data.user.id);
      window.dispatchEvent(new Event("storage"));
      
      // Show success toast
      toast.success("Login successful!", {
        description: `Welcome back, ${data.user.email}`,
      });
      
      setIsLoading(false);
      
      // Redirect to the page they were trying to access, or dashboard
      const from = (location.state as any)?.from?.pathname;
      const targetPath = from || (
        data.user.role === "student"
          ? "/student-dashboard"
          : "/organizer-dashboard"
      );
      window.location.href = targetPath;
    } catch (err: any) {
      setIsLoading(false);
      toast.error("Login failed", {
        description: err.message || "Please check your credentials and try again.",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5 flex items-center justify-center px-4 sm:px-6 py-8 sm:py-12">
      <div className="w-full max-w-md">
        {/* Logo Section */}
        <div className="text-center mb-6 sm:mb-8 animate-fade-in">
          <a href="/" className="inline-flex items-center gap-3 group mb-4">
            <div className="relative">
              <div className="absolute inset-0 bg-primary/20 rounded-full blur-lg group-hover:bg-primary/30 transition-all"></div>
              <img
                src="/tce-logo.png"
                alt="TCE Logo"
                className="h-12 w-12 sm:h-16 sm:w-16 object-contain relative z-10 group-hover:scale-110 transition-transform duration-300"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }}
              />
            </div>
          </a>
          <h1 className="text-2xl sm:text-3xl font-bold text-primary mb-2 px-2">
            Welcome to <span className="text-primary">TCE</span> Connect
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground px-2">
            Sign in to explore campus events and clubs
          </p>
        </div>

        {/* Login Card */}
        <Card
          className="shadow-2xl border-primary/10 animate-slide-up opacity-0"
          style={{
            animationDelay: "0.2s",
            animationFillMode: "forwards",
          }}
        >
          <div className="p-6 sm:p-8">
            <div className="mb-6">
              <h2 className="text-xl sm:text-2xl font-bold text-foreground flex items-center gap-2">
                <LogIn className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                Sign In
              </h2>
              <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                Enter your credentials to continue
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4 sm:space-y-5">
              {/* Email Field */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium">
                  Email Address
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="your@student.tce.edu"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setErrors(prev => ({ ...prev, email: "" }));
                    }}
                    className={`pl-10 h-11 transition-colors ${
                      errors.email 
                        ? "border-red-500 focus:border-red-500" 
                        : "border-border focus:border-primary"
                    }`}
                    disabled={isLoading}
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? "email-error" : undefined}
                  />
                </div>
                {errors.email && (
                  <p id="email-error" className="text-sm text-red-500 flex items-center gap-1">
                    <span className="text-red-500">⚠</span> {errors.email}
                  </p>
                )}
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium">
                  Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setErrors(prev => ({ ...prev, password: "" }));
                    }}
                    className={`pl-10 pr-10 h-11 transition-colors ${
                      errors.password 
                        ? "border-red-500 focus:border-red-500" 
                        : "border-border focus:border-primary"
                    }`}
                    disabled={isLoading}
                    aria-invalid={!!errors.password}
                    aria-describedby={errors.password ? "password-error" : undefined}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors disabled:opacity-50"
                    disabled={isLoading}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p id="password-error" className="text-sm text-red-500 flex items-center gap-1">
                    <span className="text-red-500">⚠</span> {errors.password}
                  </p>
                )}
              </div>

              {/* Role Selection */}
              <div className="space-y-2">
                <Label htmlFor="role" className="text-sm font-medium">
                  Select Role
                </Label>
                <select
                  id="role"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full h-11 border-border focus:border-primary transition-colors rounded-md px-3 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={isLoading}
                  required
                >
                  <option value="student">Student</option>
                  <option value="organizer">Event Organizer</option>
                </select>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full h-11 bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300 font-semibold text-base btn-shine disabled:opacity-70 disabled:cursor-not-allowed"
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin"></div>
                    Signing in...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <LogIn className="h-5 w-5" />
                    Sign In
                  </span>
                )}
              </Button>

              {/* Register Link */}
              <p className="text-center text-sm text-muted-foreground">
                Don't have an account?{" "}
                <a 
                  href="/register" 
                  className="text-primary hover:underline font-medium transition-colors"
                >
                  Create one
                </a>
              </p>
            </form>
          </div>
        </Card>

        {/* Footer Note */}
        <p
          className="text-center text-xs sm:text-sm text-muted-foreground mt-4 sm:mt-6 px-4 animate-fade-in"
          style={{ animationDelay: "0.4s" }}
        >
          By signing in, you agree to our{" "}
          <a href="#" className="text-primary hover:underline">
            Terms of Service
          </a>{" "}
          and{" "}
          <a href="#" className="text-primary hover:underline">
            Privacy Policy
          </a>
        </p>
      </div>
    </div>
  );
}
