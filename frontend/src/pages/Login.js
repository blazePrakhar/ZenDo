import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      return toast.error("Please fill all fields");
    }

    try {
      setLoading(true);

      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        { email, password }
      );

      localStorage.setItem("token", res.data.token);

      toast.success("Login successful 🚀");

      navigate("/dashboard");
    } catch (err) {
      toast.error("Invalid credentials ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 relative overflow-hidden px-4">

      {/* 🌿 Background shapes */}
      <div className="absolute w-72 h-72 bg-blue-300 blur-3xl opacity-30 top-10 left-10 rounded-full"></div>
      <div className="absolute w-72 h-72 bg-purple-300 blur-3xl opacity-30 bottom-10 right-10 rounded-full"></div>

      {/* 🧊 Form container */}
      <form
        onSubmit={handleLogin}
        className="relative z-10 bg-white/70 backdrop-blur-lg p-8 rounded-xl shadow-md border border-white/30 w-full max-w-sm space-y-5"
      >
        {/* 🧘 Branding */}
        <h1 className="text-3xl font-bold text-center mb-2">
          ZenDo 🧘
        </h1>

        <p className="text-center text-gray-500 text-sm mb-4">
          Stay calm. Stay productive.
        </p>

        {/* Title */}
        <h2 className="text-xl font-semibold text-center">
          Welcome Back 👋
        </h2>

        {/* Email */}
        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* Password */}
        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* Button */}
        <button
          disabled={loading}
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition duration-200 active:scale-95 disabled:opacity-50"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        {/* Link */}
        <p className="text-sm text-center text-gray-500">
          Don’t have an account?{" "}
          <span
            className="text-blue-500 cursor-pointer hover:underline"
            onClick={() => navigate("/register")}
          >
            Register
          </span>
        </p>
      </form>
    </div>
  );
}