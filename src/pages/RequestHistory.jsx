import React, { useEffect, useState } from "react";
import { Container, Card, Spinner, Alert, Badge } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { getRequestHistory } from "../API/auth.jsx";

export default function RequestHistory() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const data = await getRequestHistory();
        setRequests(data.requests || []);
      } catch (err) {
        setError("Failed to fetch request history");
      } finally {
        setLoading(false);
      }
    };
    fetchHistory();
  }, []);

  if (loading) {
    return (
      <Container className="mt-5 text-center">
        <Spinner animation="border" variant="danger" />
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
      <h3 className="fw-bold text-danger mb-4">📜 My Request History</h3>

      {requests.length === 0 ? (
        <Alert variant="info">No requests found</Alert>
      ) : (
        requests.map((req) => {
          const createdAt = new Date(req.createdAt);
          const date = createdAt.toLocaleDateString();
          const time = createdAt.toLocaleTimeString();
          const status = req.status || "pending"; // default if not set

          return (
            <Card
              key={req._id}
              className="mb-3 shadow-sm p-3 border-0"
              onClick={() =>
                navigate(`/request/${req._id}`, {
                  state: { request: { ...req, date, time, status } },
                })
              }
              style={{ cursor: "pointer" }}
            >
              <div className="d-flex justify-content-between align-items-center">
                <h5 className="text-primary">{req.why}</h5>
                <Badge
                  bg={
                    status === "resolved"
                      ? "success"
                      : status === "in-progress"
                      ? "warning"
                      : "secondary"
                  }
                >
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </Badge>
              </div>
              <p className="mb-1"><strong>Priority:</strong> {req.priority}</p>
              <p className="mb-1"><strong>Date:</strong> {date}</p>
              <p className="mb-1"><strong>Time:</strong> {time}</p>
            </Card>
          );
        })
      )}
    </Container>
  );
}