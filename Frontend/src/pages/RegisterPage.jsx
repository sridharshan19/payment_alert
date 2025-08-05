import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

function RegisterPage() {
  const [formData, setFormData] = useState({ username: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8080/api/auth/register", formData);
      alert("🎉 Registered successfully! Please login.");
      navigate("/login");
    } catch (error) {
      console.error("Registration error:", error);
      alert("❌ Registration failed. Try again.");
    }
  };

  return (
    <div className="d-flex align-items-center justify-content-center min-vh-100" style={{
      background: "linear-gradient(to right, #00c6ff, #0072ff)",
      backgroundSize: "cover"
    }}>
      <div className="card shadow-lg p-4" style={{
        width: "100%",
        maxWidth: "420px",
        borderRadius: "1rem",
        backgroundColor: "#ffffffee"
      }}>
        <h2 className="text-center text-primary mb-4">Create Account</h2>
        <form onSubmit={handleRegister}>
          <div className="mb-3">
            <label className="form-label">Username</label>
            <input
              type="text"
              className="form-control"
              value={formData.username}
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              placeholder="Enter your name"
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="Enter email address"
              required
            />
          </div>
          <div className="mb-4">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              placeholder="Enter a strong password"
              required
            />
          </div>
          <button className="btn btn-primary w-100">Register</button>
        </form>
        <div className="text-center mt-3">
          Already registered?{" "}
          <Link to="/login" className="text-decoration-none text-primary">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
