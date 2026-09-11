/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { verifyEmail } from "../../services/auth.service";
import SEO from "../../components/SEO/SEO";
import { CheckCircle, XCircle, Loader2 } from "lucide-react";

const VerifyEmail: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get("token");

  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!token) {
      setError("No verification token found.");
      setLoading(false);
      return;
    }

    const verify = async () => {
      try {
        await verifyEmail({ token });
        setSuccess(true);
      } catch (err: any) {
        setError(err.response?.data?.message || "Verification failed. The token may be invalid or expired.");
      } finally {
        setLoading(false);
      }
    };

    verify();
  }, [token]);

  return (
    <>
      <SEO title="Verify Email" description="Verify your DataBiz account" path="/verify-email" noindex />
      <div className="min-h-screen relative flex items-center justify-center bg-[#050505] overflow-hidden font-sans">
        <div className="relative z-10 w-full max-w-[440px] px-6 py-12 text-center">
          <div className="bg-white/[0.02] backdrop-blur-[32px] border border-white/[0.08] rounded-[2.5rem] p-10 md:p-12 shadow-[0_22px_70px_4px_rgba(0,0,0,0.56)] ring-1 ring-white/10 group">
            
            {loading && (
              <div className="flex flex-col items-center">
                <Loader2 className="w-16 h-16 text-blue-500 animate-spin mb-6" />
                <h2 className="text-2xl font-bold text-white mb-2">Verifying Email...</h2>
                <p className="text-gray-400">Please wait while we verify your account.</p>
              </div>
            )}

            {!loading && success && (
              <div className="flex flex-col items-center animate-fade-in">
                <CheckCircle className="w-16 h-16 text-green-500 mb-6" />
                <h2 className="text-2xl font-bold text-white mb-2">Email Verified!</h2>
                <p className="text-gray-400 mb-8">Your account has been successfully verified.</p>
                <button
                  onClick={() => navigate("/login")}
                  className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold py-3 px-6 rounded-xl transition-all"
                >
                  Continue to Login
                </button>
              </div>
            )}

            {!loading && !success && (
              <div className="flex flex-col items-center animate-fade-in">
                <XCircle className="w-16 h-16 text-red-500 mb-6" />
                <h2 className="text-2xl font-bold text-white mb-2">Verification Failed</h2>
                <p className="text-gray-400 mb-8">{error}</p>
                <button
                  onClick={() => navigate("/login")}
                  className="w-full bg-white/10 hover:bg-white/20 text-white font-bold py-3 px-6 rounded-xl transition-all"
                >
                  Return to Login
                </button>
              </div>
            )}

          </div>
        </div>
      </div>
    </>
  );
};

export default VerifyEmail;

