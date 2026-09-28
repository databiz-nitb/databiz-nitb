/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { User, Mail, Lock, UserPlus, Eye, EyeOff, ArrowRight } from "lucide-react";
import { register } from "../../services/auth.service";
import { saveUser } from "../../utils/auth";
import SEO from "../../components/SEO/SEO";
import AuthShell from "../../components/AuthShell/AuthShell";

const Register: React.FC = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [successMsg, setSuccessMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccessMsg("");
    setLoading(true);

    try {
      const response = await register({ name, email, password });
      const { user, token, message } = response.data;
      
      saveUser(user, token);
      
      setSuccessMsg(message || "Registration successful! Please check your email to verify your account.");
      
      // Navigate to dashboard after short delay
      setTimeout(() => navigate("/"), 2000);
    } catch (err: any) {
      setError(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <SEO title="Register" description="Create your DataBiz account" path="/register" noindex />
      <AuthShell>

      {/* Register Card */}
      <div className="w-full max-w-md">
        <div className="w-full">
          <div className="mb-8 text-center">
            <div className="mb-5 inline-flex rounded-lg bg-white p-2.5">
              <img src="/DataBiz Logo.png" alt="DataBiz" className="h-11 w-auto" />
            </div>
            <div className="mx-auto mb-4 flex h-11 w-11 items-center justify-center rounded-lg border border-sky-200/15 bg-sky-200/[0.07] text-sky-200">
              <UserPlus className="h-5 w-5" aria-hidden="true" />
            </div>
            <h1 className="text-3xl font-semibold tracking-tight text-white">
              Join us today
            </h1>
            <p className="mt-2 text-sm text-slate-400">
              Start your journey with DataBiz
            </p>
          </div>

          {error && (
            <div role="alert" className="mb-6 flex items-center gap-3 rounded-lg border border-rose-200/15 bg-rose-200/[0.05] p-4">
              <div className="h-2 w-2 rounded-full bg-rose-300"></div>
              <p className="text-sm font-medium text-rose-100">{error}</p>
            </div>
          )}

          {successMsg && (
            <div role="status" className="mb-6 flex items-center gap-3 rounded-lg border border-emerald-200/15 bg-emerald-200/[0.05] p-4">
              <div className="h-2 w-2 rounded-full bg-emerald-300"></div>
              <p className="text-sm font-medium text-emerald-100">{successMsg}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Full Name Field */}
            <div className="space-y-2">
              <label className="block px-1 text-xs font-medium text-slate-300">
                Full Name
              </label>
              <div className="relative group/input">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-slate-500 transition-colors group-focus-within/input:text-sky-200">
                  <User size={18} aria-hidden="true" />
                </div>
                <input
                  type="text"
                  className="min-h-12 w-full rounded-lg border border-white/10 bg-[#080c11] py-3 pl-11 pr-4 text-sm text-white placeholder:text-slate-500 transition focus:border-sky-200/50 focus:outline-none focus:ring-2 focus:ring-sky-200/20"
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Email Field */}
            <div className="space-y-2">
              <label className="block px-1 text-xs font-medium text-slate-300">
                Email
              </label>
              <div className="relative group/input">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-slate-500 transition-colors group-focus-within/input:text-sky-200">
                  <Mail size={18} aria-hidden="true" />
                </div>
                <input
                  type="email"
                  className="min-h-12 w-full rounded-lg border border-white/10 bg-[#080c11] py-3 pl-11 pr-4 text-sm text-white placeholder:text-slate-500 transition focus:border-sky-200/50 focus:outline-none focus:ring-2 focus:ring-sky-200/20"
                  placeholder="john@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label className="block px-1 text-xs font-medium text-slate-300">
                Password
              </label>
              <div className="relative group/input">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-slate-500 transition-colors group-focus-within/input:text-sky-200">
                  <Lock size={18} aria-hidden="true" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  className="min-h-12 w-full rounded-lg border border-white/10 bg-[#080c11] py-3 pl-11 pr-12 text-sm text-white placeholder:text-slate-500 transition focus:border-sky-200/50 focus:outline-none focus:ring-2 focus:ring-sky-200/20"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="absolute inset-y-0 right-0 flex min-w-11 items-center justify-center pr-3 text-slate-400 transition-colors hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-sky-300"
                >
                  {showPassword ? <EyeOff size={19} /> : <Eye size={19} />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="inline-flex min-h-12 w-full items-center justify-center gap-3 rounded-lg bg-sky-300 py-3 text-sm font-semibold text-slate-950 transition-colors hover:bg-sky-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-300 disabled:cursor-wait disabled:opacity-60"
            >
                {loading ? (
                  <span className="h-5 w-5 animate-spin rounded-full border-2 border-slate-950/25 border-t-slate-950" />
                ) : (
                  <>
                    <span>Create Account</span>
                    <ArrowRight size={17} aria-hidden="true" />
                  </>
                )}
            </button>
          </form>

          {/* Login Footer */}
          <div className="mt-10 text-center">
            <p className="text-sm text-slate-400">
              Already a member?
              <button
                onClick={() => navigate("/login")}
                className="ml-2 font-semibold text-sky-200 underline decoration-sky-300/30 underline-offset-4 transition-colors hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-sky-300"
              >
                Sign In
              </button>
            </p>
          </div>
        </div>
      </div>
      </AuthShell>
    </>
  );
};

export default Register;
