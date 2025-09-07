import { useState, useEffect } from 'react';
import './App.css';
import Navbar from "./components/Navbar.jsx";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import RequestForm from "./pages/RequestForm.jsx";
import RequestHistory from "./pages/RequestHistory.jsx";
import RequestDetails from "./pages/RequestDetails.jsx";
import AllRequest from "./pages/AllRequest.jsx";
import LandingPage from "./pages/LandingPage.jsx";
import SignUp from "./pages/SignUp.jsx";
import Loader from "./components/Loader.jsx";
import { useNavigate } from "react-router-dom";

//auth context
import { useContext } from "react";
import { AuthContext } from "./context/authContext.jsx";


function App() {
  const { isLogedin, setLogin } = useContext(AuthContext); // ✅ added
  setLogin
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  
  
  useEffect(()=>{
    if(isLogedin){
      navigate("/");
    }
  },[isLogedin]);
  
  
  useEffect(() => {
    const verifyToken = async () => {
      const token = localStorage.getItem("authToken");
      if (!token) {
        setLoading(false);
        navigate("/landing");
        return;
      }

      try { //change url  http://localhost:5000/api/auth/verify
        const res = await
        fetch("https://jeevan-backend-3974.onrender.com/api/auth/verify", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();
        if (data.valid) {
          setLogin(true);
          setRole(data.user.role);
        } else {
          localStorage.removeItem("token");
        }
      } catch (error) {
        console.error("Verify error:", error);
        localStorage.removeItem("token");
      }
      setLoading(false);
    };

    verifyToken();
  }, []);

  if (loading) return <div>Loading...</div>;

  if (!isLogedin) {
    return (<>
      <Routes>
          <Route path="/landing" element={<LandingPage />} />
          <Route path="/signin" element={<Login isLogedin={isLogedin}
          setLogin={setLogin} setRole={setRole} />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
    </>);
  }

  if (role === "citizen") {
    return (
      <div className="app">
        <Navbar role={role} />
        <Routes>
          <Route path="/" element={<Home role={role} />} />
          <Route path="/request-form" element={<RequestForm />} />
          <Route path="/request-history" element={<RequestHistory />} />
          <Route path="/request/:id" element={<RequestDetails />} />
        </Routes>
      </div>
    );
  }

  if (role === "member") {
    return (
      <div className="app">
        <Navbar role={role} />
        <Routes>
          <Route path="/" element={<Home role={role} />} />
          <Route path="/request-form" element={<RequestForm />} />
          <Route path="/request-history" element={<RequestHistory />} />
          <Route path="/request/:id" element={<RequestDetails />} />
          <Route path="/all-request" element={<AllRequest />} />
        </Routes>
      </div>
    );
  }

  return null;
}

export default App;







