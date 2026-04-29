import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../utils/api";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/auth/login", form);
      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");
    } catch (err) {
      alert(err.response?.data?.msg || "Invalid credentials");
    }
  };

  return (
  <form onSubmit={handleSubmit}>
    <h2>Login</h2>

    <input
      placeholder="Email"
      onChange={(e) => setForm({ ...form, email: e.target.value })}
    />

    <input
      type="password"
      placeholder="Password"
      onChange={(e) => setForm({ ...form, password: e.target.value })}
    />

    <button>Login</button>

    <p style={{ textAlign: "center" }}>
      Don't have an account? <a href="/register">Register</a>
    </p>
  </form>
);
}