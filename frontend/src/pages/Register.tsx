import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { UserPlus, Mail, Lock, User, Building, Calendar, Hash } from "lucide-react";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [department, setDepartment] = useState("");
  const [year, setYear] = useState("");
  const [registerNumber, setRegisterNumber] = useState("");
  const [role, setRole] = useState("student");
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({ 
    name: "", 
    email: "", 
    password: "",
    confirmPassword: "",
    department: "",
    year: "",
    registerNumber: ""
  });
  const navigate = useNavigate();

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateForm = (): boolean => {
    const newErrors = { 
      name: "", 
      email: "", 
      password: "", 
      confirmPassword: "",
      department: "",
      year: "",
      registerNumber: ""
    };
    let isValid = true;

    if (!name || name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
      isValid = false;
    }

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

    if (!confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
      isValid = false;
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
      isValid = false;
    }

    if (role === "student") {
      if (!department || department.trim().length < 2) {
        newErrors.department = "Department is required for students";
        isValid = false;
      }

      if (!year) {
        newErrors.year = "Year of study is required for students";
        isValid = false;
      }

      if (!registerNumber || registerNumber.trim().length < 2) {
        newErrors.registerNumber = "Register number is required for students";
        isValid = false;
      }
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Clear previous errors
    setErrors({ 
      name: "", 
      email: "", 
      password: "", 
      confirmPassword: "",
      department: "",
      year: "",
      registerNumber: ""
    });
    
    // Validate form
    if (!validateForm()) {
      return;
    }
    
    setIsLoading(true);
    
    try {
      const response = await fetch("http://localhost:5000/api/users/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          name, 
          email, 
          password, 
          role,
          department,
          year,
          registerNumber
        })
      });
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || data.error || "Registration failed");
      }
      
      setIsLoading(false);
      toast.success("Registration successful!", {
        description: "You can now login with your credentials.",
      });
      
      // Navigate after a short delay
      setTimeout(() => navigate("/login"), 1000);
    } catch (err: any) {
      setIsLoading(false);
      toast.error("Registration failed", {
        description: err.message || "Please check your information and try again.",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-6 animate-fade-in">
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
          <h1 className="text-2xl sm:text-3xl font-bold text-primary mb-2">
            Join <span className="text-primary">TCE</span> Connect
          </h1>
          <p className="text-sm text-muted-foreground">
            Create your account to get started
          </p>
        </div>

        <Card className="shadow-2xl border-primary/10 animate-slide-up">
          <div className="p-6 sm:p-8">
            <div className="mb-6">
              <h2 className="text-xl sm:text-2xl font-bold flex items-center gap-2">
                <UserPlus className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                Register
              </h2>
              <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                Fill in your details to create an account
              </p>
            </div>

            <form onSubmit={handleRegister} className="space-y-4">
              {/* Name Field */}
              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm font-medium">Full Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input 
                    id="name" 
                    placeholder="Enter your full name"
                    value={name} 
                    onChange={e => {
                      setName(e.target.value);
                      setErrors(prev => ({ ...prev, name: "" }));
                    }}
                    className={`pl-10 h-11 transition-colors ${
                      errors.name 
                        ? "border-red-500 focus:border-red-500" 
                        : "border-border focus:border-primary"
                    }`}
                    disabled={isLoading}
                    aria-invalid={!!errors.name}
                  />
                </div>
                {errors.name && (
                  <p className="text-sm text-red-500 flex items-center gap-1">
                    <span>⚠</span> {errors.name}
                  </p>
                )}
              </div>

              {/* Email Field */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium">Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input 
                    id="email" 
                    type="email"
                    placeholder="your@student.tce.edu"
                    value={email} 
                    onChange={e => {
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
                  />
                </div>
                {errors.email && (
                  <p className="text-sm text-red-500 flex items-center gap-1">
                    <span>⚠</span> {errors.email}
                  </p>
                )}
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input 
                    id="password" 
                    type="password"
                    placeholder="Create a password (min 6 characters)"
                    value={password} 
                    onChange={e => {
                      setPassword(e.target.value);
                      setErrors(prev => ({ ...prev, password: "" }));
                    }}
                    className={`pl-10 h-11 transition-colors ${
                      errors.password 
                        ? "border-red-500 focus:border-red-500" 
                        : "border-border focus:border-primary"
                    }`}
                    disabled={isLoading}
                    aria-invalid={!!errors.password}
                  />
                </div>
                {errors.password && (
                  <p className="text-sm text-red-500 flex items-center gap-1">
                    <span>⚠</span> {errors.password}
                  </p>
                )}
              </div>

              {/* Confirm Password Field */}
              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-sm font-medium">Confirm Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input 
                    id="confirmPassword" 
                    type="password"
                    placeholder="Confirm your password"
                    value={confirmPassword} 
                    onChange={e => {
                      setConfirmPassword(e.target.value);
                      setErrors(prev => ({ ...prev, confirmPassword: "" }));
                    }}
                    className={`pl-10 h-11 transition-colors ${
                      errors.confirmPassword 
                        ? "border-red-500 focus:border-red-500" 
                        : "border-border focus:border-primary"
                    }`}
                    disabled={isLoading}
                    aria-invalid={!!errors.confirmPassword}
                  />
                </div>
                {errors.confirmPassword && (
                  <p className="text-sm text-red-500 flex items-center gap-1">
                    <span>⚠</span> {errors.confirmPassword}
                  </p>
                )}
              </div>

              {/* Role Selection */}
              <div className="space-y-2">
                <Label htmlFor="role" className="text-sm font-medium">I am a</Label>
                <select 
                  id="role" 
                  value={role} 
                  onChange={e => setRole(e.target.value)} 
                  className="w-full h-11 border border-border rounded-md px-3 focus:border-primary transition-colors disabled:opacity-50"
                  disabled={isLoading}
                >
                  <option value="student">Student</option>
                  <option value="organizer">Event Organizer</option>
                </select>
              </div>

              {/* Student-specific fields */}
              {role === "student" && (
                <>
                  {/* Department Field */}
                  <div className="space-y-2">
                    <Label htmlFor="department" className="text-sm font-medium">Department</Label>
                    <div className="relative">
                      <Building className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input 
                        id="department" 
                        placeholder="e.g., Computer Science & Engineering"
                        value={department} 
                        onChange={e => {
                          setDepartment(e.target.value);
                          setErrors(prev => ({ ...prev, department: "" }));
                        }}
                        className={`pl-10 h-11 transition-colors ${
                          errors.department 
                            ? "border-red-500 focus:border-red-500" 
                            : "border-border focus:border-primary"
                        }`}
                        disabled={isLoading}
                        aria-invalid={!!errors.department}
                      />
                    </div>
                    {errors.department && (
                      <p className="text-sm text-red-500 flex items-center gap-1">
                        <span>⚠</span> {errors.department}
                      </p>
                    )}
                  </div>

                  {/* Year Field */}
                  <div className="space-y-2">
                    <Label htmlFor="year" className="text-sm font-medium">Year of Study</Label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <select 
                        id="year" 
                        value={year} 
                        onChange={e => {
                          setYear(e.target.value);
                          setErrors(prev => ({ ...prev, year: "" }));
                        }}
                        className={`w-full h-11 border rounded-md px-3 pl-10 transition-colors disabled:opacity-50 ${
                          errors.year 
                            ? "border-red-500 focus:border-red-500" 
                            : "border-border focus:border-primary"
                        }`}
                        disabled={isLoading}
                        aria-invalid={!!errors.year}
                      >
                        <option value="">Select year</option>
                        <option value="I">I Year</option>
                        <option value="II">II Year</option>
                        <option value="III">III Year</option>
                        <option value="IV">IV Year</option>
                      </select>
                    </div>
                    {errors.year && (
                      <p className="text-sm text-red-500 flex items-center gap-1">
                        <span>⚠</span> {errors.year}
                      </p>
                    )}
                  </div>

                  {/* Register Number Field */}
                  <div className="space-y-2">
                    <Label htmlFor="registerNumber" className="text-sm font-medium">Register Number</Label>
                    <div className="relative">
                      <Hash className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input 
                        id="registerNumber" 
                        placeholder="e.g., 21CS045"
                        value={registerNumber} 
                        onChange={e => {
                          setRegisterNumber(e.target.value);
                          setErrors(prev => ({ ...prev, registerNumber: "" }));
                        }}
                        className={`pl-10 h-11 transition-colors ${
                          errors.registerNumber 
                            ? "border-red-500 focus:border-red-500" 
                            : "border-border focus:border-primary"
                        }`}
                        disabled={isLoading}
                        aria-invalid={!!errors.registerNumber}
                      />
                    </div>
                    {errors.registerNumber && (
                      <p className="text-sm text-red-500 flex items-center gap-1">
                        <span>⚠</span> {errors.registerNumber}
                      </p>
                    )}
                  </div>
                </>
              )}

              {/* Submit Button */}
              <Button 
                type="submit" 
                className="w-full h-11 font-semibold btn-shine disabled:opacity-70" 
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin"></div>
                    Creating Account...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <UserPlus className="h-5 w-5" />
                    Create Account
                  </span>
                )}
              </Button>

              {/* Login Link */}
              <p className="text-center text-sm text-muted-foreground">
                Already have an account?{" "}
                <a href="/login" className="text-primary hover:underline font-medium">
                  Sign in
                </a>
              </p>
            </form>
          </div>
        </Card>
      </div>
    </div>
  );
}
