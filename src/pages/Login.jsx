import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { signIn } from "../API/auth";
import Logo from "../assets/ab.jpg"; 
import "../styles/Login.css";

function Login({ setLogin, setRole }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setLocalRole] = useState("citizen");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const data = await signIn(email, password);
      localStorage.setItem("authToken", data.token);
      setLogin(true);
      if (setRole) setRole(data.payload.role);
      console.log("Logged in:", data);
    } catch (err) {
      setError(err.msg || "Invalid login credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-fluid min-vh-100 d-flex flex-column p-4">
      {/* Logo on top-left */}
      <div className="mb-4">
        <img
          src={Logo}
          alt="Logo"
          className="img-fluid"
          style={{
            maxWidth: "80px",
            borderRadius: "8px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
          }}
        />
      </div>

      {/* Login Form */}
      <div className="row justify-content-center align-items-center flex-grow-1">
        <div className="col-12 col-lg-6 d-flex justify-content-center">
          {/* Card for Desktop */}
          <div className="login-card p-4 shadow-lg w-100 d-none d-lg-block">
            <h1 style={{ color: 'red', fontSize: '24px', fontWeight: 'bold' }}>Login</h1>
            <FormContent
              email={email}
              setEmail={setEmail}
              password={password}
              setPassword={setPassword}
              role={role}
              setLocalRole={setLocalRole}
              loading={loading}
              error={error}
              handleSubmit={handleSubmit}
            />
          </div>

          {/* No card for Tablet & Mobile */}
          <div className="d-block d-lg-none w-100">
          <h1 style={{ color: 'red', fontSize: '24px', fontWeight: 'bold'
          }}>Login</h1>
            <FormContent
              email={email}
              setEmail={setEmail}
              password={password}
              setPassword={setPassword}
              role={role}
              setLocalRole={setLocalRole}
              loading={loading}
              error={error}
              handleSubmit={handleSubmit}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

// Extracted form content
function FormContent({ email, setEmail, password, setPassword, role, setLocalRole, loading, error, handleSubmit }) {
  return (
    <form onSubmit={handleSubmit}>
      {/* Email */}
      <div className="mb-3">
        <label className="form-label">Email</label>
        <input
          type="email"
          className="form-control"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      {/* Password */}
      <div className="mb-3">
        <label className="form-label">Password</label>
        <input
          type="password"
          className="form-control"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>

      {/* Role */}
      <div className="mb-3">
        <label className="form-label fw-bold">Login As</label>
        <div className="d-flex gap-3">
          <div className="form-check">
            <input
              type="radio"
              id="citizen"
              name="role"
              value="citizen"
              className="form-check-input"
              checked={role === "citizen"}
              onChange={(e) => setLocalRole(e.target.value)}
            />
            <label htmlFor="citizen" className="form-check-label">Citizen</label>
          </div>
          <div className="form-check">
            <input
              type="radio"
              id="member"
              name="role"
              value="member"
              className="form-check-input"
              checked={role === "member"}
              onChange={(e) => setLocalRole(e.target.value)}
            />
            <label htmlFor="member" className="form-check-label">Member</label>
          </div>
        </div>
      </div>

      {/* Error */}
      {error && <div className="alert alert-danger">{error}</div>}

      {/* Button */}
      <button type="submit" className="btn btn-primary w-100" disabled={loading}>
        {loading ? "Logging in..." : "Login"}
      </button>
    </form>
  );
}

export default Login;