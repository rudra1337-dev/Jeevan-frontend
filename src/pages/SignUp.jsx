import React, { useState } from "react";
import { signupUser } from "../API/auth.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/SignUp.css";
import { useNavigate } from "react-router-dom";
import Logo from "../assets/ab.jpg"; // <-- ADD THIS at the top with your imports

export default function Signup() {
  const [formData, setFormData] = useState({
    name: "",
    adhar: "",
    age: "",
    bloodGroup: "",
    gender: "",
    phone: "",
    relativePhone: "",
    email: "",
    location: "",
    photo: "",
    role: "citizen",
    password: "",
  });
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [errors, setErrors] = useState({});

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const validateForm = () => {
    let tempErrors = {};
    if (formData.name.length < 3) tempErrors.name = "Name must be at least 3 characters.";
    if (!/^\d{4}-\d{4}-\d{4}$/.test(formData.adhar)) tempErrors.adhar = "Format: XXXX-XXXX-XXXX.";
    if (!(formData.age >= 1 && formData.age <= 120)) tempErrors.age = "Age must be between 1-120.";
    if (!["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"].includes(formData.bloodGroup))
      tempErrors.bloodGroup = "Invalid blood group.";
    if (!["Male", "Female", "Other"].includes(formData.gender)) tempErrors.gender = "Invalid gender.";
    if (!/^\d{10}$/.test(formData.phone)) tempErrors.phone = "Must be 10 digits.";
    if (!/^\d{10}$/.test(formData.relativePhone)) tempErrors.relativePhone = "Must be 10 digits.";
    if (!/\S+@\S+\.\S+/.test(formData.email)) tempErrors.email = "Invalid email.";
    if (!formData.location.trim()) tempErrors.location = "Location required.";
    if (formData.password.length < 6) tempErrors.password = "At least 6 characters.";
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);
    if (!validateForm()) return;
    setLoading(true);
    try {
      const data = await signupUser(formData);
      setMessage({ type: "success", text: data.message });
      setFormData({
        name: "",
        adhar: "",
        age: "",
        bloodGroup: "",
        gender: "",
        phone: "",
        relativePhone: "",
        email: "",
        location: "",
        photo: "",
        role: "citizen",
        password: "",
      });
      navigate("/signin");
    } catch (err) {
      setMessage({ type: "error", text: err.message || "Signup failed" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-fluid py-4">
    
    {/* Logo on top left */}
<div className="mb-4">
  <img
    src={Logo}
    alt="Logo"
    style={{
      maxWidth: "80px",
      borderRadius: "8px",
      boxShadow: "0 2px 8px rgba(0,0,0,0.2)"
    }}
  />
</div>
    
      <div className="row justify-content-center">
        {/* Desktop → Card, Tablet/Mobile → No card */}
        <div className="col-12 col-sm-10 col-md-8 col-lg-6 col-xl-5">
          <div className="signup-wrapper p-4">
            <h2 className="text-center text-danger fw-bold mb-3">🚨 Emergency Signup Form 🚨</h2>
            <p className="text-center text-muted mb-4">
              Fill this form carefully — your information is critical for emergency response.
            </p>

            {message && (
              <div className={`alert alert-${message.type === "success" ? "success" : "danger"}`}>
                {message.text}|
              </div>
            )}

            <form onSubmit={handleSubmit} className="row g-3">
              {/* Name */}
              <div className="col-12">
                <label className="fw-bold">Full Name</label>
                <input
                  type="text"
                  name="name"
                  placeholder="Eg: Rahul Kumar"
                  className={`form-control ${errors.name ? "is-invalid" : ""}`}
                  value={formData.name}
                  onChange={handleChange}
                />
                <div className="invalid-feedback">{errors.name}</div>
              </div>

              {/* Aadhar */}
              <div className="col-12 col-md-6">
                <label className="fw-bold">Aadhar Number</label>
                <input
                  type="text"
                  name="adhar"
                  placeholder="Eg: 1234-5678-9123"
                  className={`form-control ${errors.adhar ? "is-invalid" : ""}`}
                  value={formData.adhar}
                  onChange={handleChange}
                />
                <div className="invalid-feedback">{errors.adhar}</div>
              </div>

              {/* Age */}
              <div className="col-12 col-md-6">
                <label className="fw-bold">Age</label>
                <input
                  type="number"
                  name="age"
                  placeholder="Eg: 25"
                  className={`form-control ${errors.age ? "is-invalid" : ""}`}
                  value={formData.age}
                  onChange={handleChange}
                />
                <div className="invalid-feedback">{errors.age}</div>
              </div>

              {/* Blood Group */}
              <div className="col-12 col-md-6">
                <label className="fw-bold">Blood Group</label>
                <select
                  name="bloodGroup"
                  className={`form-select ${errors.bloodGroup ? "is-invalid" : ""}`}
                  value={formData.bloodGroup}
                  onChange={handleChange}
                >
                  <option value="">Select</option>
                  {["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"].map((bg) => (
                    <option key={bg} value={bg}>{bg}</option>
                  ))}
                </select>
                <div className="invalid-feedback">{errors.bloodGroup}</div>
              </div>

              {/* Gender */}
              <div className="col-12 col-md-6">
                <label className="fw-bold">Gender</label>
                <select
                  name="gender"
                  className={`form-select ${errors.gender ? "is-invalid" : ""}`}
                  value={formData.gender}
                  onChange={handleChange}
                >
                  <option value="">Select</option>
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                </select>
                <div className="invalid-feedback">{errors.gender}</div>
              </div>

              {/* Phone */}
              <div className="col-12 col-md-6">
                <label className="fw-bold">Phone Number</label>
                <input
                  type="text"
                  name="phone"
                  placeholder="Eg: 9876543210"
                  className={`form-control ${errors.phone ? "is-invalid" : ""}`}
                  value={formData.phone}
                  onChange={handleChange}
                />
                <div className="invalid-feedback">{errors.phone}</div>
              </div>

              {/* Relative Phone */}
              <div className="col-12 col-md-6">
                <label className="fw-bold">Relative's Phone Number</label>
                <input
                  type="text"
                  name="relativePhone"
                  placeholder="Eg: 9876543211"
                  className={`form-control ${errors.relativePhone ? "is-invalid" : ""}`}
                  value={formData.relativePhone}
                  onChange={handleChange}
                />
                <div className="invalid-feedback">{errors.relativePhone}</div>
              </div>

              {/* Email */}
              <div className="col-12">
                <label className="fw-bold">Email Address</label>
                <input
                  type="email"
                  name="email"
                  placeholder="Eg: rahul@example.com"
                  className={`form-control ${errors.email ? "is-invalid" : ""}`}
                  value={formData.email}
                  onChange={handleChange}
                />
                <div className="invalid-feedback">{errors.email}</div>
              </div>

              {/* Location */}
              <div className="col-12">
                <label className="fw-bold">Current Location</label>
                <input
                  type="text"
                  name="location"
                  placeholder="Eg: Bhubaneswar, Odisha"
                  className={`form-control ${errors.location ? "is-invalid" : ""}`}
                  value={formData.location}
                  onChange={handleChange}
                />
                <div className="invalid-feedback">{errors.location}</div>
              </div>

              {/* Role */}
              <div className="col-12 col-md-6">
                <label className="fw-bold">Role</label>
                <select
                  name="role"
                  className="form-select"
                  value={formData.role}
                  onChange={handleChange}
                >
                  <option value="citizen">Citizen</option>
                  <option value="member">Member</option>
                </select>
              </div>

              {/* Password */}
              <div className="col-12 col-md-6">
                <label className="fw-bold">Password</label>
                <input
                  type="password"
                  name="password"
                  placeholder="Eg: StrongPass123"
                  className={`form-control ${errors.password ? "is-invalid" : ""}`}
                  value={formData.password}
                  onChange={handleChange}
                />
                <div className="invalid-feedback">{errors.password}</div>
              </div>

              {/* Submit */}
              <div className="col-12">
                <button
                  type="submit"
                  className="btn btn-danger w-100 fw-bold"
                  disabled={loading}
                >
                  {loading ? "Registering..." : "🚨 Sign Up Now"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}