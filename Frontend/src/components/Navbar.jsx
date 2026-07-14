import React from "react";
import { useNavigate } from "react-router-dom";
import { logout } from "../utils/auth";

const Navbar = () => {

  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const initials = user?.name
    ? user.name
        .split(" ")
        .map((n) => n[0])
        .slice(0, 2)
        .join("")
        .toUpperCase()
    : "?";

  const handleLogout = () => {

    logout();
    localStorage.removeItem("user");

    navigate("/login");

  };

  return (

    <div className="pg-navbar">

      <div className="pg-navbar-title">
        <span>PharmaGuard</span>
        Clinical Risk Intelligence System
      </div>

      <div className="pg-navbar-right">

        <div className="pg-navbar-user">
          <div className="pg-avatar">{initials}</div>
          <div>
            <div className="pg-navbar-user-name">{user?.name || "Guest"}</div>
            <div className="pg-navbar-user-role">{user?.role || ""}</div>
          </div>
        </div>

        <button
          className="pg-btn pg-btn-ghost pg-btn-sm"
          onClick={handleLogout}
        >
          Logout
        </button>

      </div>

    </div>

  );

};

export default Navbar;
