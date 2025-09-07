import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import EditProfile from "../components/EditProfile";
import "../styles/Home.css";
import { useNavigate } from "react-router-dom";
import { getProfile, updateProfile } from "../API/auth";

export default function Home({ role }) {
  const [user, setUser] = useState(null);
  const [showEdit, setShowEdit] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const profileData = await getProfile();
        setUser(profileData);
      } catch (err) {
        console.error("Failed to load profile", err);
      }
    };

    fetchProfile();
  }, []);

  const handleSaveProfile = async (updatedUser) => {
    try {
      const response = await updateProfile(updatedUser);
      setUser(response.user);
      console.log("✅ Profile updated:", response.message);
    } catch (err) {
      console.error("❌ Failed to update profile", err);
    }
  };

  const handleClick = () => {
    navigate("/request-form", { state: { profile: user } });
  };

  if (!user) return <div>Loading profile...</div>;

  return (
    <div className="profile-page bg-white py-5" >
      <Container>
        {showEdit ? (
          <EditProfile
            userData={user}
            onSave={handleSaveProfile}
            onClose={() => setShowEdit(false)}
          />
        ) : (
          <>
            {/* Desktop / Tablet Layout */}
            <div className="d-none d-md-block position-relative">
              {/* Animated role tag */}
              <div className="position-absolute top-0 end-0 px-3 py-1 rounded role-tag">
                {role || "Member"}
              </div>

              <Row className="align-items-center mb-4">
                {/* Profile Picture + Name stacked */}
                <Col md={3} className="text-center">
                  <div className="profile-img-wrapper mb-3">
                    <img
                      src={user.photo || "https://via.placeholder.com/150"}
                      alt="Profile"
                      className="profile-img"
                    />
                  </div>
                  <h2 className="fw-bold text-danger">{user.name}</h2>
                </Col>

                {/* Buttons centered horizontally, bigger vertically */}
                <Col md={9} className="d-flex flex-column align-items-center gap-4 mt-4">
                  <Button
                    variant="danger"
                    className="fw-bold px-4"
                    style={{ height: "160%", minWidth: "200px" }}
                    onClick={handleClick}
                  >
                    🚨 Send Request
                  </Button>
                  <Button
                    variant="warning"
                    className="fw-bold px-4"
                    style={{ height: "160%", minWidth: "200px" }}
                    onClick={() => setShowEdit(true)}
                  >
                    ✏️ Edit Profile
                  </Button>
                </Col>
              </Row>

              {/* Info Section */}
              <Row className="mt-4">
                <Col md={6}>
                  <div className="info-item"><strong>Aadhar:</strong> {user.adhar}</div>
                  <div className="info-item"><strong>Age:</strong> {user.age}</div>
                  <div className="info-item"><strong>Blood Group:</strong> {user.bloodGroup}</div>
                  <div className="info-item"><strong>Gender:</strong> {user.gender}</div>
                </Col>
                <Col md={6}>
                  <div className="info-item"><strong>Phone:</strong> {user.phone}</div>
                  <div className="info-item"><strong>Relative Phone:</strong> {user.relativePhone}</div>
                  <div className="info-item"><strong>Email:</strong> {user.email}</div>
                  <div className="info-item"><strong>Location:</strong> {user.location}</div>
                </Col>
              </Row>
            </div>

            {/* Mobile Layout */}
            <div className="d-md-none position-relative">
              {/* Animated role tag */}
              <div className="position-absolute top-0 end-0 px-3 py-1 rounded role-tag">
                {role || "Member"}
              </div>

              <Row className="align-items-center mb-4">
                <Col xs={12} className="text-center">
                  <div className="profile-img-wrapper mb-3">
                    <img
                      src={user.photo || "https://via.placeholder.com/150"}
                      alt="Profile"
                      className="profile-img"
                    />
                  </div>
                  <h2 className="fw-bold text-danger mb-4">{user.name}</h2>
                </Col>

                {/* Buttons centered below name */}
                <Col xs={12} className="d-flex flex-column align-items-center gap-3 mt-2">
                  <Button
                    variant="danger"
                    className="fw-bold px-4"
                    style={{ minWidth: "200px" }}
                    onClick={handleClick}
                  >
                    🚨 Send Request
                  </Button>
                  <Button
                    variant="warning"
                    className="fw-bold px-4"
                    style={{ minWidth: "200px" }}
                    onClick={() => setShowEdit(true)}
                  >
                    ✏️ Edit Profile
                  </Button>
                </Col>
              </Row>

              <Row>
                <Col xs={12}>
                  <div className="info-item"><strong>Aadhar:</strong> {user.adhar}</div>
                  <div className="info-item"><strong>Age:</strong> {user.age}</div>
                  <div className="info-item"><strong>Blood Group:</strong> {user.bloodGroup}</div>
                  <div className="info-item"><strong>Gender:</strong> {user.gender}</div>
                  <div className="info-item"><strong>Phone:</strong> {user.phone}</div>
                  <div className="info-item"><strong>Relative Phone:</strong> {user.relativePhone}</div>
                  <div className="info-item"><strong>Email:</strong> {user.email}</div>
                  <div className="info-item"><strong>Location:</strong> {user.location}</div>
                </Col>
              </Row>
            </div>
          </>
        )}
      </Container>

      {/* CSS for animated role tag */}
      <style>{`
        .role-tag {
          background: linear-gradient(270deg, #ff416c, #ff4b2b, #ff6a00, #f7b733, #00c6ff, #0072ff);
          background-size: 600% 600%;
          animation: gradientShift 8s ease infinite;
          font-weight: bold;
          color: white;
        }
        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </div>
  );
}