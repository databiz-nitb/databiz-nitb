import  { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { User } from "lucide-react";
import { getUser } from "../../utils/auth"; // adjust path as needed

export default function Profile() {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const storedUser = getUser();
    if (!storedUser) {
      navigate("/login");
    } else {
      setUser(storedUser);
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  if (!user) return null;

  return (
    <div className="min-h-[80vh] flex justify-center items-center bg-gradient-to-b from-white to-indigo-50 px-6">
      <motion.div
        className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md text-center border border-gray-100"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Profile Icon */}
        <div className="flex justify-center mb-6">
          <div className="bg-indigo-100 p-4 rounded-full">
            <User className="text-indigo-600 w-10 h-10" />
          </div>
        </div>

        {/* User Info */}
        <h1 className="text-2xl font-semibold text-gray-900">
          {user.name || "DataBiz Member"}
        </h1>
        <p className="text-gray-600 mt-1">{user.email}</p>

        <div className="mt-6 text-left space-y-2">
          <p className="text-sm text-gray-500">Role</p>
          <p className="font-medium text-gray-800">
            {user.role || "Club Member"}
          </p>
        </div>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="mt-8 w-full py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-md shadow-md transition-all"
        >
          Logout
        </button>
      </motion.div>
    </div>
  );
}
