import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../../services/auth.service";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import { saveUser } from "../../utils/auth";

const Register: React.FC = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

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
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8 border border-gray-200">
        <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">
          Create Your Account
        </h1>

        {error && (
          <p className="text-red-500 text-center text-sm font-medium mb-3">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <Input
            label="Full Name"
            value={name}
            placeholder="John Doe"
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            label="Email Address"
            type="email"
            placeholder="john@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            label="Password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <Button
            type="submit"
            disabled={loading}
            className="w-full py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors"
          >
            {loading ? "Creating Account..." : "Register"}
          </Button>
        </form>

        <p className="text-sm text-center text-gray-600 mt-6">
          Already have an account?{" "}
          <button
            onClick={() => navigate("/login")}
            className="text-blue-600 hover:underline font-medium"
          >
            Login here
          </button>
        </p>
      </div>
    </div>
  );
};

export default Register;
