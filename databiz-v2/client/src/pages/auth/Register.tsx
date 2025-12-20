import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { User, Mail, Lock, UserPlus, Eye, EyeOff, ArrowRight } from "lucide-react";
import { register } from "../../services/auth.service";
import { saveUser } from "../../utils/auth";

const Register: React.FC = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await register({ name, email, password });
      const { user, token } = response.data;
      saveUser(user, token);
      navigate("/");
    } catch (err: any) {
      setError(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center bg-[#050505] overflow-hidden font-sans">
      {/* Dynamic Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -right-[10%] w-[60%] h-[60%] bg-purple-600/30 rounded-full blur-[140px] animate-blob"></div>
        <div className="absolute -bottom-[10%] -left-[10%] w-[60%] h-[60%] bg-blue-600/30 rounded-full blur-[140px] animate-blob animation-delay-2000"></div>
        <div className="absolute top-[20%] right-[30%] w-[40%] h-[40%] bg-indigo-600/20 rounded-full blur-[120px] animate-blob animation-delay-4000"></div>

        {/* Subtle Noise Texture */}
        <div className="absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] brightness-100 contrast-150"></div>
      </div>

      {/* Register Card */}
      <div className="relative z-10 w-full max-w-[440px] px-6 py-12">
        <div className="bg-white/[0.02] backdrop-blur-[32px] border border-white/[0.08] rounded-[2.5rem] p-10 md:p-12 shadow-[0_22px_70px_4px_rgba(0,0,0,0.56)] ring-1 ring-white/10 group">
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-tr from-purple-600 to-indigo-600 mb-6 shadow-lg shadow-purple-500/20">
              <UserPlus className="text-white w-8 h-8" />
            </div>
            <h1 className="text-4xl font-bold tracking-tight mb-3 text-white">
              Join us today
            </h1>
            <p className="text-gray-400 font-medium">
              Start your journey with DataBiz
            </p>
          </div>

          {error && (
            <div className="mb-8 p-4 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center gap-3 animate-shake">
              <div className="w-2 h-2 rounded-full bg-red-500"></div>
              <p className="text-red-400 text-sm font-medium">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Full Name Field */}
            <div className="space-y-2">
              <label className="block text-gray-400 text-[13px] font-semibold uppercase tracking-widest px-1">
                Full Name
              </label>
              <div className="relative group/input">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-500 group-focus-within/input:text-purple-400 transition-colors">
                  <User size={19} />
                </div>
                <input
                  type="text"
                  className="w-full bg-white/[0.03] border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500/40 focus:border-purple-500/50 transition-all duration-300 hover:bg-white/[0.05]"
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Email Field */}
            <div className="space-y-2">
              <label className="block text-gray-400 text-[13px] font-semibold uppercase tracking-widest px-1">
                Email
              </label>
              <div className="relative group/input">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-500 group-focus-within/input:text-indigo-400 transition-colors">
                  <Mail size={19} />
                </div>
                <input
                  type="email"
                  className="w-full bg-white/[0.03] border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500/50 transition-all duration-300 hover:bg-white/[0.05]"
                  placeholder="john@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label className="block text-gray-400 text-[13px] font-semibold uppercase tracking-widest px-1">
                Password
              </label>
              <div className="relative group/input">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-500 group-focus-within/input:text-blue-400 transition-colors">
                  <Lock size={19} />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  className="w-full bg-white/[0.03] border border-white/10 rounded-2xl py-4 pl-12 pr-12 text-white placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500/50 transition-all duration-300 hover:bg-white/[0.05]"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-500 hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff size={19} /> : <Eye size={19} />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full relative group/btn overflow-hidden rounded-2xl p-px"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 animate-gradient-xy group-hover/btn:scale-110 transition-transform duration-500"></div>
              <div className="relative bg-[#050505]/80 group-hover/btn:bg-transparent transition-colors duration-300 flex items-center justify-center gap-3 py-4 rounded-[15px] text-white font-bold tracking-wide">
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                ) : (
                  <>
                    <span>Create Account</span>
                    <ArrowRight size={19} className="group-hover/btn:translate-x-1 transition-transform" />
                  </>
                )}
              </div>
            </button>
          </form>

          {/* Login Footer */}
          <div className="mt-10 text-center">
            <p className="text-gray-500 text-sm font-medium">
              Already a member?
              <button
                onClick={() => navigate("/login")}
                className="ml-2 text-white hover:text-purple-400 font-bold underline transition-colors decoration-purple-500/30 underline-offset-4"
              >
                Sign In
              </button>
            </p>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Register;
