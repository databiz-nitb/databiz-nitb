import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Mail, Shield, LogOut } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

export default function Profile() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  if (!user) return null;

  return (
    <div className="min-h-screen relative flex items-center justify-center bg-[#050505] overflow-hidden font-sans pt-20 pb-10">
      {/* Dynamic Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -left-[10%] w-[60%] h-[60%] bg-indigo-600/20 rounded-full blur-[140px] animate-blob"></div>
        <div className="absolute -bottom-[10%] -right-[10%] w-[60%] h-[60%] bg-purple-600/20 rounded-full blur-[140px] animate-blob animation-delay-2000"></div>

        {/* Subtle Noise Texture */}
        <div className="absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] brightness-100 contrast-150"></div>
      </div>

      <div className="relative z-10 w-full max-w-2xl px-6">
        <div className="bg-white/[0.02] backdrop-blur-[32px] border border-white/[0.08] rounded-[2.5rem] p-8 md:p-12 shadow-[0_22px_70px_4px_rgba(0,0,0,0.56)] ring-1 ring-white/10">

          {/* Header / Avatar */}
          <div className="flex flex-col items-center mb-12">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full opacity-70 blur group-hover:opacity-100 transition duration-500"></div>
              <div className="relative w-32 h-32 rounded-full bg-[#0a0a0a] border-4 border-[#1a1a1a] flex items-center justify-center overflow-hidden">
                <div className="text-4xl font-bold text-white bg-clip-text text-transparent bg-gradient-to-br from-indigo-400 to-purple-400">
                  {user.name ? user.name.charAt(0).toUpperCase() : "U"}
                </div>
              </div>
            </div>

            <h1 className="mt-6 text-3xl md:text-4xl font-bold text-white tracking-tight">
              {user.name || "DataBiz Member"}
            </h1>
            <p className="mt-2 text-gray-400 font-medium tracking-wide">
              Member since 2024
            </p>
          </div>

          {/* Info Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
            <div className="bg-white/[0.03] p-5 rounded-2xl border border-white/5 hover:border-white/10 transition-colors group">
              <div className="flex items-center gap-4 mb-2">
                <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-400 group-hover:bg-indigo-500/20 transition-colors">
                  <Mail size={20} />
                </div>
                <span className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Email</span>
              </div>
              <p className="text-white font-medium truncate ml-[52px]">
                {user.email}
              </p>
            </div>

            <div className="bg-white/[0.03] p-5 rounded-2xl border border-white/5 hover:border-white/10 transition-colors group">
              <div className="flex items-center gap-4 mb-2">
                <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-400 group-hover:bg-purple-500/20 transition-colors">
                  <Shield size={20} />
                </div>
                <span className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Role</span>
              </div>
              <p className="text-white font-medium ml-[52px]">
                {user.role || "Club Member"}
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-center">
            <button
              onClick={handleLogout}
              className="group relative px-8 py-3.5 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 hover:text-red-300 border border-red-500/20 hover:border-red-500/40 transition-all duration-300 font-semibold tracking-wide flex items-center gap-3"
            >
              <LogOut size={18} />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
