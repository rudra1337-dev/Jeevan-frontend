import React from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import { Container, Card, Row, Col, Button, Badge } from "react-bootstrap";
import "animate.css"; // Animation library

export default function RequestDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { request } = location.state || {};

  // Handle no data case
  if (!request) {
    return (
      <Container className="mt-5 text-center">
        <h4 className="text-danger">❌ No request data found</h4>
        <Button
          variant="primary"
          className="mt-3 fw-bold"
          onClick={() => navigate(-1)}
        >
          ⬅ Back
        </Button>
      </Container>
    );
  }

  // Priority badge color mapping
  const getPriorityVariant = (priority) => {
    const lower = priority?.toLowerCase();
    if (lower === "high") return "danger";
    if (lower === "medium") return "warning";
    if (lower === "critical") return "dark";
    return "success"; // low
  };

  return (
    <div
      className="d-flex justify-content-center"
      style={{ minHeight: "100vh", padding: "20px" }}
    >
      <Card className="shadow-lg border-0 rounded-4 p-4 bg-light w-100" style={{ maxWidth: "800px" }}>
        <Card.Body>
          {/* Title + Priority */}
          <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap">
            <h3 className="fw-bold text-primary mb-2 mb-md-0">
              🚨 {request.why}
            </h3>
            <Badge
              bg={getPriorityVariant(request.priority)}
              className="p-2 fs-6 text-uppercase"
            >
              {request.priority}
            </Badge>
          </div>

          {/* Request ID */}
          <p className="text-muted mb-4">
            🆔 <strong>{id}</strong>
          </p>

          {/* Date & Time */}
          <Row className="mb-4">
            <Col md={6} className="mb-3">
              <InfoCard title="📅 Date" value={request.date} animation="animate__fadeInLeft" />
            </Col>
            <Col md={6} className="mb-3">
              <InfoCard title="⏰ Time" value={request.time} animation="animate__fadeInRight" />
            </Col>
          </Row>

          {/* Location */}
          <InfoCard
            title="📍 Location"
            value={request.where}
            animation="animate__fadeInUp"
          />

          {/* Requirement */}
          <InfoCard
            title="📝 Requirement"
            value={request.what}
            animation="animate__fadeInUp"
          />

          {/* Sender Details */}
          <Card className="mb-4 border-0 shadow-sm p-3 bg-white animate__animated animate__fadeInUp">
            <h6 className="text-secondary mb-3">✍️ Sender Details</h6>
            <SenderDetails user={request.user} />
          </Card>

          {/* Back button */}
          <div className="text-center">
            <Button
              variant="outline-primary"
              size="lg"
              className="px-4 fw-bold animate__animated animate__pulse animate__infinite"
              onClick={() => navigate(-1)}
            >
              ⬅ Back to History
            </Button>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}

// Small reusable card for displaying info
function InfoCard({ title, value, animation }) {
  return (
    <Card className={`mb-4 border-0 shadow-sm p-3 bg-white animate__animated ${animation}`}>
      <h6 className="text-secondary">{title}</h6>
      <p className="fw-bold mb-0">{value || "—"}</p>
    </Card>
  );
}

// Component to display user details
function SenderDetails({ user }) {
  if (!user) return <p className="text-muted">No user details available</p>;

  return (
    <p className="mb-0">
      <strong>Name:</strong> {user.name} <br />
      <strong>Aadhar:</strong> {user.adhar} <br />
      <strong>Age:</strong> {user.age} <br />
      <strong>Blood Group:</strong> {user.bloodGroup} <br />
      <strong>Gender:</strong> {user.gender} <br />
      <strong>Phone:</strong> {user.phone} <br />
      <strong>Relative's Phone:</strong> {user.relativePhone} <br />
      <strong>Email:</strong> {user.email} <br />
      <strong>Address:</strong> {user.location}
    </p>
  );
}