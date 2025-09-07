import { Link } from "react-router-dom";
import "../styles/Navbar.css";
import LogoutButton from "./LogoutButton.jsx";
import Logo from "../assets/ab.jpg";

function Navbar({ role }) {
  return (
    <nav className="navbar navbar-dark bg-dark fixed-top">
      <div className="container">
        {/* 🔹 Brand Logo only */}
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <img
            src={Logo}
            alt="Logo"
            height="45"
            style={{
              borderRadius: "12px",
              objectFit: "cover",
              width: "auto",
            }}
          />
        </Link>

        {/* 🔹 Offcanvas toggler - only visible on small devices */}
        <button
          className="navbar-toggler d-lg-none"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasDarkNavbar"
          aria-controls="offcanvasDarkNavbar"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* 🔹 Offcanvas Menu - for small screens */}
        <div
          className="offcanvas offcanvas-end text-bg-dark d-lg-none"
          tabIndex="-1"
          id="offcanvasDarkNavbar"
          aria-labelledby="offcanvasDarkNavbarLabel"
        >
          <div className="offcanvas-header">
            <h5 className="offcanvas-title" id="offcanvasDarkNavbarLabel">
              Menu
            </h5>
            <button
              type="button"
              className="btn-close btn-close-white"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            ></button>
          </div>
          <div className="offcanvas-body">
            <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
              <li className="nav-item">
                <Link className="nav-link active" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active" to="/request-form">
                  Request Form
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active" to="/request-history">
                  Request History
                </Link>
              </li>
              {role === "member" && (
                <li className="nav-item">
                  <Link className="nav-link active" to="/all-request">
                    All Request
                  </Link>
                </li>
              )}
              <li className="nav-item">
                <LogoutButton />
              </li>
            </ul>
          </div>
        </div>

        {/* 🔹 Normal Navbar links - only visible on large screens */}
        <div className="d-none d-lg-block">
          <ul className="navbar-nav flex-row nav-content-box">
            <li className="nav-item">
              <Link className="nav-link active" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link active" to="/request-form">
                Request Form
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link active" to="/request-history">
                Request History
              </Link>
            </li>
            {role === "member" && (
              <li className="nav-item">
                <Link className="nav-link active" to="/all-request">
                  All Request
                </Link>
              </li>
            )}
            <li className="nav-item">
              <LogoutButton />
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;