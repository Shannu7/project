import React, { useState } from 'react';
import { Eye, EyeOff, Mail, Lock, User, Palette, Sparkles, Heart, AlertCircle } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { LoadingSpinner } from '../ui/LoadingSpinner';

export const LoginPage: React.FC = () => {
  const { login, register, state } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    // Basic validation
    if (!formData.email.trim()) {
      setError('Please enter your email address');
      return;
    }

    if (!formData.password.trim()) {
      setError('Please enter your password');
      return;
    }

    if (!isLogin && !formData.name.trim()) {
      setError('Please enter your name');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError('Please enter a valid email address');
      return;
    }

    try {
      let result;
      if (isLogin) {
        console.log('Attempting login with:', formData.email);
        result = await login(formData.email.trim(), formData.password);
      } else {
        console.log('Attempting registration with:', formData.name, formData.email);
        result = await register(formData.name.trim(), formData.email.trim(), formData.password);
      }

      console.log('Auth result:', result);

      if (!result.success) {
        setError(result.error || 'An error occurred');
      } else {
        setSuccess(isLogin ? 'Login successful!' : 'Account created successfully!');
        // Clear form on success
        setFormData({ name: '', email: '', password: '' });
      }
    } catch (error) {
      console.error('Auth error:', error);
      setError('An unexpected error occurred. Please try again.');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear errors when user starts typing
    if (error) setError(null);
    if (success) setSuccess(null);
  };

  const switchMode = () => {
    setIsLogin(!isLogin);
    setError(null);
    setSuccess(null);
    setFormData({ name: '', email: '', password: '' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-400 via-cyan-500 to-blue-600 flex items-center justify-center p-4">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-yellow-300/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-80 h-80 bg-pink-400/20 rounded-full blur-3xl animate-pulse delay-2000"></div>
        <div className="absolute top-1/2 right-1/2 w-72 h-72 bg-green-400/15 rounded-full blur-3xl animate-pulse delay-3000"></div>
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-4 bg-gradient-to-br from-orange-500 to-red-500 rounded-full shadow-lg">
              <Palette className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-yellow-200 bg-clip-text text-transparent">
              AI Mood Artist
            </h1>
            <Sparkles className="w-10 h-10 text-yellow-300 animate-bounce" />
          </div>
          <p className="text-white/90 text-lg font-medium">
            Transform your emotions into beautiful AI-generated art
          </p>
        </div>

        <Card className="p-8 bg-white/95 backdrop-blur-xl border-0 shadow-2xl">
          <div className="text-center mb-6">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent mb-2">
              {isLogin ? 'Welcome Back!' : 'Join Us Today'}
            </h2>
            <p className="text-gray-600 text-lg">
              {isLogin ? 'Continue your creative journey' : 'Start your artistic adventure'}
            </p>
          </div>

          {/* Error/Success Messages */}
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center">
              <AlertCircle className="w-5 h-5 text-red-500 mr-2 flex-shrink-0" />
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          )}

          {success && (
            <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg flex items-center">
              <Heart className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" />
              <p className="text-green-700 text-sm">{success}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {!isLogin && (
              <div className="relative">
                <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-emerald-500 w-5 h-5" />
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full pl-12 pr-4 py-4 bg-gray-50 border-2 border-gray-200 rounded-xl text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 text-lg"
                  required={!isLogin}
                  disabled={state.isLoading}
                />
              </div>
            )}

            <div className="relative">
              <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-blue-500 w-5 h-5" />
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full pl-12 pr-4 py-4 bg-gray-50 border-2 border-gray-200 rounded-xl text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-lg"
                required
                disabled={state.isLoading}
              />
            </div>

            <div className="relative">
              <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-purple-500 w-5 h-5" />
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                placeholder="Password (min. 6 characters)"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full pl-12 pr-12 py-4 bg-gray-50 border-2 border-gray-200 rounded-xl text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 text-lg"
                required
                minLength={6}
                disabled={state.isLoading}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
                disabled={state.isLoading}
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>

            <Button
              type="submit"
              disabled={state.isLoading}
              className="w-full py-4 text-xl font-semibold bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
              size="lg"
            >
              {state.isLoading ? (
                <>
                  <LoadingSpinner size="sm" color="text-white" />
                  <span className="ml-3">
                    {isLogin ? 'Signing In...' : 'Creating Account...'}
                  </span>
                </>
              ) : (
                <>
                  <Heart className="w-6 h-6 mr-3" />
                  {isLogin ? 'Sign In' : 'Create Account'}
                </>
              )}
            </Button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-gray-600 text-lg">
              {isLogin ? "Don't have an account?" : 'Already have an account?'}
              <button
                onClick={switchMode}
                className="ml-2 text-emerald-600 hover:text-emerald-700 font-semibold transition-colors text-lg"
                disabled={state.isLoading}
              >
                {isLogin ? 'Sign Up' : 'Sign In'}
              </button>
            </p>
          </div>

          {/* Demo Account Info */}
          <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <h4 className="font-semibold text-blue-800 mb-2">Demo Account</h4>
            <p className="text-blue-700 text-sm mb-2">
              You can create a new account or use these demo credentials:
            </p>
            <div className="text-blue-600 text-sm">
              <p><strong>Email:</strong> demo@example.com</p>
              <p><strong>Password:</strong> demo123</p>
            </div>
            <Button
              onClick={() => {
                setFormData({ name: '', email: 'demo@example.com', password: 'demo123' });
                setIsLogin(true);
              }}
              variant="outline"
              size="sm"
              className="mt-2 w-full"
              disabled={state.isLoading}
            >
              Use Demo Account
            </Button>
          </div>
        </Card>

        {/* Features preview */}
        <div className="mt-8 grid grid-cols-3 gap-6 text-center">
          <div className="text-white">
            <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg">
              <Palette className="w-8 h-8" />
            </div>
            <p className="text-lg font-medium">AI Art Generation</p>
          </div>
          <div className="text-white">
            <div className="w-16 h-16 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg">
              <Heart className="w-8 h-8" />
            </div>
            <p className="text-lg font-medium">Community</p>
          </div>
          <div className="text-white">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg">
              <Sparkles className="w-8 h-8" />
            </div>
            <p className="text-lg font-medium">Story Creation</p>
          </div>
        </div>
      </div>
    </div>
  );
};