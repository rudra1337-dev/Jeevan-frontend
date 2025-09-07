import React from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../API/auth.jsx"; // Import API call

//auth context
import { useContext } from "react";
import { AuthContext } from "../context/authContext.jsx";




export default function LogoutButton() {
  const { isLogedin, setLogin } = useContext(AuthContext); // ✅ added
  setLogin
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logoutUser();
    } catch (err) {
      console.error("Error during logout:", err);
    } finally {
      // Always clear token & redirect
      localStorage.removeItem("authToken");
      navigate("/landing");
      setLogin(false);
    }
  };

  return (
    <Button
      variant="outline-danger"
      className="fw-bold"
      onClick={handleLogout}
    >
      🔴 Logout
    </Button>
  );
}