/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, LogIn, Mail, Lock, ArrowRight } from "lucide-react";
import { login } from "../../services/auth.service";
import { useAuth } from "../../context/AuthContext";
import SEO from "../../components/SEO/SEO";
import AuthShell from "../../components/AuthShell/AuthShell";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { login_user } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [resendLoading, setResendLoading] = useState(false);
  const [resendMessage, setResendMessage] = useState("");
  const [needsVerification, setNeedsVerification] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setResendMessage("");
    setNeedsVerification(false);
    setLoading(true);

    try {
      const res = await login({ email, password });
      const { user, token } = res.data;

      if (!user || !token) throw new Error("Invalid response from server");

      login_user(user, token);
      navigate("/");
    } catch (err: any) {
      setError(err.response?.data?.message || "Invalid email or password");
      if (err.response?.data?.code === "EMAIL_NOT_VERIFIED" || err.response?.status === 403) {
        setError(err.response?.data?.message || "Please verify your email.");
        setNeedsVerification(true);
      } else {
        setError(err.response?.data?.message || "Invalid email or password");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    setResendLoading(true);
    setResendMessage("");
    setError("");
    try {
      const { resendVerification } = await import("../../services/auth.service");
      await resendVerification({ email });
      setResendMessage("Verification email sent! Please check your inbox.");
      setNeedsVerification(false);
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to resend verification email.");
    } finally {
      setResendLoading(false);
    }
  };

  return (
    <>
      <SEO title="Login" description="Sign in to DataBiz" path="/login" noindex />
      <AuthShell>

      {/* Login Card */}
      <div className="w-full max-w-md">
        <div className="w-full">
          <div className="mb-8 text-center">
            <div className="mb-5 inline-flex rounded-lg bg-white p-2.5">
              <img src="/DataBiz Logo.png" alt="DataBiz" className="h-11 w-auto" />
            </div>
            <div className="mx-auto mb-4 flex h-11 w-11 items-center justify-center rounded-lg border border-sky-200/15 bg-sky-200/[0.07] text-sky-200">
              <LogIn className="h-5 w-5" aria-hidden="true" />
            </div>
            <h1 className="text-3xl font-semibold tracking-tight text-white">
              Welcome back
            </h1>
            <p className="mt-2 text-sm text-slate-400">
              Access your DataBiz dashboard
            </p>
          </div>

          {error && (
            <div role="alert" className="mb-6 flex flex-col gap-3 rounded-lg border border-rose-200/15 bg-rose-200/[0.05] p-4">
              <div className="flex items-center gap-3">
                <div className="h-2 w-2 rounded-full bg-rose-300"></div>
                <p className="text-sm font-medium text-rose-100">{error}</p>
              </div>
              {needsVerification && (
                <button
                  type="button"
                  onClick={handleResend}
                  disabled={resendLoading}
                  className="mt-2 min-h-10 w-fit rounded-lg border border-white/15 px-3 text-sm font-medium text-sky-200 transition-colors hover:bg-white/[0.05] focus-visible:outline focus-visible:outline-2 focus-visible:outline-sky-300"
                >
                  {resendLoading ? "Sending..." : "Resend Verification Email"}
                </button>
              )}
            </div>
          )}

          {resendMessage && (
            <div role="status" className="mb-6 flex items-center gap-3 rounded-lg border border-emerald-200/15 bg-emerald-200/[0.05] p-4">
              <div className="h-2 w-2 rounded-full bg-emerald-300"></div>
              <p className="text-sm font-medium text-emerald-100">{resendMessage}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
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
                  placeholder="name@example.com"
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
                    <span>Sign In</span>
                    <ArrowRight size={17} aria-hidden="true" />
                  </>
                )}
            </button>
          </form>

          {/* Registration Footer */}
          <div className="mt-10 text-center">
            <p className="text-sm text-slate-400">
              New here?
              <button
                onClick={() => navigate("/register")}
                className="ml-2 font-semibold text-sky-200 underline decoration-sky-300/30 underline-offset-4 transition-colors hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-sky-300"
              >
                Create an account
              </button>
            </p>
          </div>
        </div>
      </div>
      </AuthShell>
    </>
  );
};

export default Login;
