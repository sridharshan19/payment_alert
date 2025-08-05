import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/api/auth/login", {
        email,
        password,
      });

      console.log("Login success:", response.data);

      const token = response.data.token || response.data.jwt || response.data.accessToken;
      if (!token) {
        alert("Login response did not contain a token!");
        return;
      }

      localStorage.setItem("token", token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      navigate("/dashboard");
    } catch (error) {
      console.error("Login failed:", error.response?.data || error.message);
      alert("Invalid credentials or server error");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-gradient" style={{ background: "linear-gradient(to right, #00c6ff, #0072ff)" }}>
      <div className="card shadow-lg p-5" style={{ width: "100%", maxWidth: "400px", backgroundColor: "#f8f9fa", borderRadius: "20px" }}>
        <h2 className="text-center mb-4 text-primary">Login</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label className="form-label text-dark">Email</label>
            <input type="email" className="form-control" value={email}
              onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div className="mb-3">
            <label className="form-label text-dark">Password</label>
            <input type="password" className="form-control" value={password}
              onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <button className="btn btn-primary w-100 fw-bold">Login</button>
        </form>
        <div className="mt-3 text-center text-dark">
          Don't have an account? <Link to="/register" className="text-primary fw-bold">Register</Link>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
