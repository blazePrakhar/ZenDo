import { useState } from "react";
import API from "../utils/api";

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/auth/register", form);
      alert("Registered! Now login.");
    } catch (err) {
      alert(err.response?.data?.msg || "Error");
    }
  };

  return (
  <form onSubmit={handleSubmit}>
    <h2>Register</h2>

    <input
      placeholder="Name"
      onChange={(e) => setForm({ ...form, name: e.target.value })}
    />

    <input
      placeholder="Email"
      onChange={(e) => setForm({ ...form, email: e.target.value })}
    />

    <input
      type="password"
      placeholder="Password"
      onChange={(e) => setForm({ ...form, password: e.target.value })}
    />

    <button>Register</button>

    <p style={{ textAlign: "center" }}>
      Already have an account? <a href="/">Login</a>
    </p>
  </form>
);
}