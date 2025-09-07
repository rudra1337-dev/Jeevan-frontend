// src/pages/SendRequest.jsx
import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Form, Button, Alert } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import { sendRequest } from "../API/auth";

export default function RequestForm() {
  const location = useLocation();
  const navigate = useNavigate();
  const { profile } = location.state || {};
  const userProfile = profile;

  const [formData, setFormData] = useState({
    why: "",
    what: "",
    where: "",
    priority: "high", // ✅ Default high
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const handleClear = () => {
    setFormData({ why: "", what: "", where: "", priority: "high" });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.why || !formData.what || !formData.where || !formData.priority) {
      setError("⚠️ All fields are required!");
      return;
    }

    try {
      const payload = {
        why: formData.why,
        what: formData.what,
        where: formData.where,
        priority: formData.priority.toLowerCase(),
      };

      await sendRequest(payload);

      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        navigate("/");
      }, 2000);
    } catch (err) {
      setError("❌ Failed to send request. Try again!");
    }
  };

  return (
    <div className="container-fluid min-vh-100 p-4">
      <div className="row justify-content-center mt-3">
        <div className="col-12 col-lg-6">
          {/* Desktop Card */}
          <div
            className="p-4 shadow-lg w-100 d-none d-lg-block"
            style={{ background: "#fff", borderRadius: "10px" }}
          >
            <h3 className="text-danger fw-bold mb-4">🚨 Emergency Request</h3>
            <FormContent
              formData={formData}
              handleChange={handleChange}
              handleClear={handleClear}
              handleSubmit={handleSubmit}
              error={error}
              success={success}
            />
          </div>

          {/* Mobile/Tablet (No Card) */}
          <div className="d-block d-lg-none w-100">
            <h3 className="text-danger fw-bold mb-4">🚨 Emergency Request</h3>
            <FormContent
              formData={formData}
              handleChange={handleChange}
              handleClear={handleClear}
              handleSubmit={handleSubmit}
              error={error}
              success={success}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

// Extracted Form Component
function FormContent({ formData, handleChange, handleClear, handleSubmit, error, success }) {
  return (
    <form onSubmit={handleSubmit}>
      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">✅ Request Sent Successfully!</Alert>}

      {/* Why */}
      <div className="mb-3">
        <label className="form-label fw-bold">Why</label>
        <input
          type="text"
          name="why"
          className="form-control"
          placeholder="Reason for request"
          value={formData.why}
          onChange={handleChange}
        />
      </div>

      {/* What */}
      <div className="mb-3">
        <label className="form-label fw-bold">What</label>
        <input
          type="text"
          name="what"
          className="form-control"
          placeholder="What you need?"
          value={formData.what}
          onChange={handleChange}
        />
      </div>

      {/* Where */}
      <div className="mb-3">
        <label className="form-label fw-bold">Where</label>
        <input
          type="text"
          name="where"
          className="form-control"
          placeholder="Location of incident"
          value={formData.where}
          onChange={handleChange}
        />
      </div>

      {/* Priority */}
      <div className="mb-3">
        <label className="form-label fw-bold">Priority</label>
        <div className="d-flex flex-wrap gap-3">
          <Form.Check
            type="radio"
            label={<span className="text-success fw-bold">Low</span>}
            name="priority"
            value="low"
            onChange={handleChange}
            checked={formData.priority === "low"}
          />
          <Form.Check
            type="radio"
            label={<span className="text-warning fw-bold">Medium</span>}
            name="priority"
            value="medium"
            onChange={handleChange}
            checked={formData.priority === "medium"}
          />
          <Form.Check
            type="radio"
            label={<span className="text-danger fw-bold">High</span>}
            name="priority"
            value="high"
            onChange={handleChange}
            checked={formData.priority === "high"}
          />
          <Form.Check
            type="radio"
            label={<span className="text-dark fw-bold">Critical</span>}
            name="priority"
            value="critical"
            onChange={handleChange}
            checked={formData.priority === "critical"}
          />
        </div>
      </div>

      {/* Buttons */}
      <div className="d-flex gap-3 mt-4">
        <Button type="submit" variant="danger" className="fw-bold flex-grow-1">
          📤 Submit
        </Button>
        <Button variant="secondary" onClick={handleClear} className="fw-bold flex-grow-1">
          🗑 Clear
        </Button>
      </div>
    </form>
  );
}