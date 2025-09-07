// src/pages/HistoryPage.jsx
import React, { useEffect, useState } from "react";
import { Container, Card, Row, Col, Badge, Spinner, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { getAllRequests } from "../API/auth.jsx"; // ✅ New API function

export default function HistoryPage() {
  const navigate = useNavigate();
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const data = await getAllRequests();
        setHistory(data.requests || []);
      } catch (err) {
        setError("Failed to fetch all request history");
      } finally {
        setLoading(false);
      }
    };
    fetchRequests();
  }, []);

  const handleCardClick = (id, request) => {
    const createdAt = new Date(request.createdAt);
    const date = createdAt.toLocaleDateString();
    const time = createdAt.toLocaleTimeString();
    navigate(`/request/${id}`, {
      state: { request: { ...request, date, time } },
    });
  };

  const getPriorityVariant = (priority) => {
    switch (priority.toLowerCase()) {
      case "high":
        return "danger";
      case "medium":
        return "warning";
      default:
        return "success";
    }
  };

  if (loading) {
    return (
      <Container className="mt-5 text-center">
        <Spinner animation="border" variant="primary" />
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="mt-5">
        <Alert variant="danger">{error}</Alert>
      </Container>
    );
  }

  return (
    <Container className="mt-4">
      <h3 className="mb-4 text-center text-primary">📜 Request History</h3>

      <Row>
        {history.length === 0 ? (
          <Alert variant="info">No requests found</Alert>
        ) : (
          history.map((request) => (
            <Col md={6} lg={4} key={request._id} className="mb-3">
              <Card
                className="shadow-sm border-0 h-100"
                onClick={() => handleCardClick(request._id, request)}
                style={{ cursor: "pointer" }}
              >
                <Card.Body>
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <Card.Title className="mb-0">{request.why}</Card.Title>
                    <Badge bg={getPriorityVariant(request.priority)}>
                      {request.priority}
                    </Badge>
                  </div>
                  <Card.Subtitle className="text-muted small mb-2">
                    🆔 {request._id}
                  </Card.Subtitle>
                  <Card.Text className="mb-1">
                    <strong>📍 Location:</strong> {request.where}
                  </Card.Text>
                  <Card.Text className="mb-1">
                    <strong>👤 By:</strong> {request.user?.name || "Unknown"}
                  </Card.Text>
                  <Card.Text className="small text-muted">
                    🗓 {new Date(request.createdAt).toLocaleDateString()} | ⏰{" "}
                    {new Date(request.createdAt).toLocaleTimeString()}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))
        )}
      </Row>
    </Container>
  );
}