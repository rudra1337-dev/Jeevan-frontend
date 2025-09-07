import React from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/LandingPage.css";
import Logo from "../assets/ab.jpg";
import LandImg from "../assets/aa.jpg";

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="container py-4">
      {/* Logo */}
      <div className="d-flex justify-content-start mb-4">
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

      <div className="row align-items-start">
        {/* Left content */}
        <div
          className="col-12 col-md-6 mb-4 mb-md-0"
          style={{
            textAlign: "left",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
          }}
        >
          <h2 className="fw-bold text-danger">🚨 Connect to Save Your Life</h2>

          <div className="d-flex flex-column gap-3 mt-4" style={{ maxWidth: "500px" }}>
            <button
              className="btn btn-danger btn-lg fw-bold shadow w-100"
              onClick={() => navigate("/signup")}
            >
              📝 Sign Up
            </button>
            <button
              className="btn btn-warning btn-lg fw-bold shadow w-100"
              onClick={() => navigate("/signin")}
            >
              🔑 Sign In
            </button>
          </div>
        </div>

        {/* Right image */}
        <div className="col-12 col-md-6 text-center">
          <img
            src={LandImg}
            alt="Emergency"
            className="img-fluid rounded shadow"
            style={{
              maxWidth: "70%", // Desktop 70%
              width: "100%",    // Mobile adjusts automatically
              height: "auto",
            }}
          />
        </div>
      </div>
    </div>
  );
}