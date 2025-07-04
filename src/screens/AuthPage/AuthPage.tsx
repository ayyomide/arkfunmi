import React, { useState } from "react";
import { ArrowLeftIcon, EyeIcon, EyeOffIcon, MailIcon, LockIcon, UserIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { Input } from "../../components/ui/input";

export const AuthPage = (): JSX.Element => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    profession: '',
    agreeToTerms: false
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : undefined;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters long';
    }

    // Signup specific validations
    if (!isLogin) {
      if (!formData.firstName) {
        newErrors.firstName = 'First name is required';
      }
      if (!formData.lastName) {
        newErrors.lastName = 'Last name is required';
      }
      if (!formData.profession) {
        newErrors.profession = 'Please select your profession';
      }
      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
      if (!formData.agreeToTerms) {
        newErrors.agreeToTerms = 'You must agree to the terms and conditions';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      if (isLogin) {
        console.log('Login attempt:', { email: formData.email, password: formData.password });
        // Handle successful login - redirect to dashboard
        window.location.href = '/dashboard';
      } else {
        console.log('Signup attempt:', formData);
        // Handle successful signup - redirect to verification or dashboard
        window.location.href = '/dashboard';
      }
    } catch (error) {
      console.error('Authentication error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const professions = [
    'Architect',
    'Civil Engineer',
    'Structural Engineer',
    'Construction Manager',
    'Project Manager',
    'Interior Designer',
    'Urban Planner',
    'Mechanical Engineer',
    'Electrical Engineer',
    'Quantity Surveyor',
    'Other'
  ];

  return (
    <div className="bg-black min-h-screen">
      {/* Header */}
      <header className="w-full bg-[#ffb000] relative z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 lg:py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                className="hover:bg-black/10 rounded-full"
                onClick={() => window.history.back()}
              >
                <ArrowLeftIcon className="h-6 w-6 text-black" />
              </Button>
              <Link to="/">
                <img
                  className="h-10 sm:h-12 lg:h-16 w-auto object-contain"
                  alt="Arcfunmi Logo"
                  src="/asset-43-700x-1.png"
                />
              </Link>
            </div>
            
            <div className="text-black font-semibold text-lg">
              {isLogin ? "Welcome Back" : "Join Our Community"}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="min-h-screen bg-black py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md mx-auto">
          {/* Auth Toggle */}
          <div className="text-center mb-8">
            <div className="inline-flex bg-gray-800 rounded-full p-1 shadow-lg">
              <button
                onClick={() => setIsLogin(true)}
                className={`px-6 py-3 rounded-full font-semibold transition-all ${
                  isLogin 
                    ? 'bg-[#ffb000] text-black shadow-md' 
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                Login
              </button>
              <button
                onClick={() => setIsLogin(false)}
                className={`px-6 py-3 rounded-full font-semibold transition-all ${
                  !isLogin 
                    ? 'bg-[#ffb000] text-black shadow-md' 
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                Sign Up
              </button>
            </div>
          </div>

          {/* Auth Form */}
          <Card className="shadow-2xl border-none bg-gray-900">
            <CardContent className="p-8">
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-white mb-2">
                  {isLogin ? "Welcome Back!" : "Join Arcfunmi"}
                </h1>
                <p className="text-gray-300 text-lg">
                  {isLogin 
                    ? "Sign in to access your account and continue building with the best minds." 
                    : "Create your account and start sharing knowledge with professionals worldwide."
                  }
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Signup Fields */}
                {!isLogin && (
                  <>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="firstName" className="block text-sm font-semibold text-gray-300 mb-2">
                          First Name *
                        </label>
                        <div className="relative">
                          <UserIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                          <Input
                            id="firstName"
                            name="firstName"
                            type="text"
                            value={formData.firstName}
                            onChange={handleInputChange}
                            className={`pl-10 h-12 bg-gray-800 border-gray-700 text-white placeholder:text-gray-400 focus:border-[#ffb000] focus:ring-[#ffb000] ${errors.firstName ? 'border-red-500' : ''}`}
                            placeholder="John"
                          />
                        </div>
                        {errors.firstName && <p className="text-red-400 text-sm mt-1">{errors.firstName}</p>}
                      </div>
                      
                      <div>
                        <label htmlFor="lastName" className="block text-sm font-semibold text-gray-300 mb-2">
                          Last Name *
                        </label>
                        <div className="relative">
                          <UserIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                          <Input
                            id="lastName"
                            name="lastName"
                            type="text"
                            value={formData.lastName}
                            onChange={handleInputChange}
                            className={`pl-10 h-12 bg-gray-800 border-gray-700 text-white placeholder:text-gray-400 focus:border-[#ffb000] focus:ring-[#ffb000] ${errors.lastName ? 'border-red-500' : ''}`}
                            placeholder="Doe"
                          />
                        </div>
                        {errors.lastName && <p className="text-red-400 text-sm mt-1">{errors.lastName}</p>}
                      </div>
                    </div>

                    <div>
                      <label htmlFor="profession" className="block text-sm font-semibold text-gray-300 mb-2">
                        Profession *
                      </label>
                      <select
                        id="profession"
                        name="profession"
                        value={formData.profession}
                        onChange={handleInputChange}
                        className={`w-full h-12 px-3 bg-gray-800 border border-gray-700 text-white rounded-lg focus:ring-2 focus:ring-[#ffb000] focus:border-[#ffb000] ${errors.profession ? 'border-red-500' : ''}`}
                      >
                        <option value="">Select your profession</option>
                        {professions.map((prof) => (
                          <option key={prof} value={prof}>{prof}</option>
                        ))}
                      </select>
                      {errors.profession && <p className="text-red-400 text-sm mt-1">{errors.profession}</p>}
                    </div>
                  </>
                )}

                {/* Email Field */}
                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-gray-300 mb-2">
                    Email Address *
                  </label>
                  <div className="relative">
                    <MailIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`pl-10 h-12 bg-gray-800 border-gray-700 text-white placeholder:text-gray-400 focus:border-[#ffb000] focus:ring-[#ffb000] ${errors.email ? 'border-red-500' : ''}`}
                      placeholder="your.email@example.com"
                    />
                  </div>
                  {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
                </div>

                {/* Password Field */}
                <div>
                  <label htmlFor="password" className="block text-sm font-semibold text-gray-300 mb-2">
                    Password *
                  </label>
                  <div className="relative">
                    <LockIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      value={formData.password}
                      onChange={handleInputChange}
                      className={`pl-10 pr-10 h-12 bg-gray-800 border-gray-700 text-white placeholder:text-gray-400 focus:border-[#ffb000] focus:ring-[#ffb000] ${errors.password ? 'border-red-500' : ''}`}
                      placeholder="Enter your password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300"
                    >
                      {showPassword ? <EyeOffIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
                    </button>
                  </div>
                  {errors.password && <p className="text-red-400 text-sm mt-1">{errors.password}</p>}
                </div>

                {/* Confirm Password Field (Signup only) */}
                {!isLogin && (
                  <div>
                    <label htmlFor="confirmPassword" className="block text-sm font-semibold text-gray-300 mb-2">
                      Confirm Password *
                    </label>
                    <div className="relative">
                      <LockIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <Input
                        id="confirmPassword"
                        name="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        className={`pl-10 pr-10 h-12 bg-gray-800 border-gray-700 text-white placeholder:text-gray-400 focus:border-[#ffb000] focus:ring-[#ffb000] ${errors.confirmPassword ? 'border-red-500' : ''}`}
                        placeholder="Confirm your password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300"
                      >
                        {showConfirmPassword ? <EyeOffIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
                      </button>
                    </div>
                    {errors.confirmPassword && <p className="text-red-400 text-sm mt-1">{errors.confirmPassword}</p>}
                  </div>
                )}

                {/* Terms and Conditions (Signup only) */}
                {!isLogin && (
                  <div>
                    <label className="flex items-start gap-3">
                      <input
                        type="checkbox"
                        name="agreeToTerms"
                        checked={formData.agreeToTerms}
                        onChange={handleInputChange}
                        className="mt-1 h-4 w-4 text-[#ffb000] bg-gray-800 border-gray-600 rounded focus:ring-[#ffb000]"
                      />
                      <span className="text-sm text-gray-300">
                        I agree to the{" "}
                        <a href="#" className="text-[#ffb000] hover:underline font-semibold">
                          Terms of Service
                        </a>{" "}
                        and{" "}
                        <a href="#" className="text-[#ffb000] hover:underline font-semibold">
                          Privacy Policy
                        </a>
                      </span>
                    </label>
                    {errors.agreeToTerms && <p className="text-red-400 text-sm mt-1">{errors.agreeToTerms}</p>}
                  </div>
                )}

                {/* Forgot Password (Login only) */}
                {isLogin && (
                  <div className="text-right">
                    <a href="#" className="text-[#ffb000] hover:underline font-semibold text-sm">
                      Forgot your password?
                    </a>
                  </div>
                )}

                {/* Submit Button */}
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-[#ffb000] text-black hover:bg-[#e6a000] rounded-lg py-4 h-auto text-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 border-2 border-black/20 border-t-black rounded-full animate-spin"></div>
                      {isLogin ? "Signing In..." : "Creating Account..."}
                    </div>
                  ) : (
                    isLogin ? "Sign In" : "Create Account"
                  )}
                </Button>
              </form>

              {/* Social Login */}
              <div className="mt-8">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-700" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-gray-900 text-gray-400">Or continue with</span>
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-2 gap-3">
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full h-12 bg-gray-800 border-gray-700 text-gray-300 hover:bg-gray-700 hover:text-white"
                  >
                    <img className="w-5 h-5 mr-2" src="/icon-1.svg" alt="Google" />
                    Google
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full h-12 bg-gray-800 border-gray-700 text-gray-300 hover:bg-gray-700 hover:text-white"
                  >
                    <img className="w-5 h-5 mr-2" src="/icon-3.svg" alt="LinkedIn" />
                    LinkedIn
                  </Button>
                </div>
              </div>

              {/* Switch Auth Mode */}
              <div className="mt-8 text-center">
                <p className="text-gray-300">
                  {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
                  <button
                    type="button"
                    onClick={() => setIsLogin(!isLogin)}
                    className="text-[#ffb000] hover:underline font-semibold"
                  >
                    {isLogin ? "Sign up" : "Sign in"}
                  </button>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};