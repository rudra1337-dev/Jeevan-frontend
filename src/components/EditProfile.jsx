import React, { useState, useEffect } from "react";
import { Card, Form, Button, Alert } from "react-bootstrap";
import "../styles/EditProfile.css";

export default function EditProfile({ userData, onSave, onClose }) {
  const [formData, setFormData] = useState({ ...userData });
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState("");

  // 🆕 Set body margin & padding to 0 when component mounts
  useEffect(() => {
    const originalMargin = document.body.style.margin;
    const originalPadding = document.body.style.padding;

    document.body.style.margin = "0px";
    document.body.style.padding = "0px";

    return () => {
      // Restore original styles when leaving the page
      document.body.style.margin = originalMargin;
      document.body.style.padding = originalPadding;
    };
  }, []);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleClear = () =>
    setFormData({
      name: "",
      adhar: "",
      age: "",
      gender: "",
      phone: "",
      relativePhone: "",
      email: "",
      location: "",
      photo: "",
    });

  const handleSave = () => {
    for (let key in formData) {
      if (formData[key] === "") {
        setError("⚠️ Please fill in all fields before saving.");
        return;
      }
    }
    setError("");
    onSave(formData);
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      onClose();
    }, 2000);
  };

  return (
    <div className="container-fluid py-4 edit-profile-page">
      <div className="row justify-content-center">
        {/* Desktop → Card, Tablet/Mobile → No card */}
        <div className="col-12 col-sm-11 col-md-10 col-lg-8 col-xl-7">
          <div className="edit-profile-wrapper p-3 p-md-4">
            {/* Card only on desktop */}
            <div className="d-none d-lg-block">
              <Card className="shadow-lg p-4 border-0">
                <EditForm
                  formData={formData}
                  handleChange={handleChange}
                  handleClear={handleClear}
                  handleSave={handleSave}
                  error={error}
                  showSuccess={showSuccess}
                  onClose={onClose}
                />
              </Card>
            </div>

            {/* No card on tablet & mobile */}
            <div className="d-lg-none">
              <EditForm
                formData={formData}
                handleChange={handleChange}
                handleClear={handleClear}
                handleSave={handleSave}
                error={error}
                showSuccess={showSuccess}
                onClose={onClose}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function EditForm({
  formData,
  handleChange,
  handleClear,
  handleSave,
  error,
  showSuccess,
  onClose,
}) {
  return (
    <>
      <h3 className="text-center fw-bold text-warning mb-3">✏️ Edit Profile</h3>
      {error && <Alert variant="danger">{error}</Alert>}
      {showSuccess && <Alert variant="success">✅ Successfully Saved!</Alert>}

      <Form className="row g-3">
        {Object.keys(formData).map((key, idx) => (
          <div
            key={idx}
            className={`col-12 ${key !== "photo" ? "col-md-6" : "col-md-12"}`}
          >
            <Form.Group className="w-100">
              <Form.Label className="fw-semibold">
                {key.charAt(0).toUpperCase() + key.slice(1)}
              </Form.Label>
              <Form.Control
                type="text"
                name={key}
                value={formData[key]}
                onChange={handleChange}
                placeholder={`Enter ${key}`}
                className="w-100"
              />
            </Form.Group>
          </div>
        ))}

        <div className="col-12 d-flex flex-wrap gap-2 mt-4">
          <Button
            variant="success"
            onClick={handleSave}
            className="flex-fill"
          >
            💾 Save
          </Button>
          <Button
            variant="secondary"
            onClick={handleClear}
            className="flex-fill"
          >
            🧹 Clear
          </Button>
          <Button
            variant="danger"
            onClick={onClose}
            className="flex-fill"
          >
            ❌ Cancel
          </Button>
        </div>
      </Form>
    </>
  );
}