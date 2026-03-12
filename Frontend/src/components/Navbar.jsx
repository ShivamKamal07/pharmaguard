import React from "react";
import { useNavigate } from "react-router-dom";
import { logout } from "../utils/auth";

const Navbar = () => {

  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {

    logout();
    localStorage.removeItem("user");

    navigate("/login");

  };

  return (

    <div
      className="d-flex justify-content-between align-items-center p-3 border-bottom"
      style={{ marginLeft: "250px", background: "#f8f9fa" }}
    >

      <h5 className="mb-0">Clinical Risk Intelligence System</h5>

      <div className="d-flex align-items-center gap-3">

        <span>Welcome, {user?.name}</span>

        <button
          className="btn btn-outline-primary btn-sm"
          onClick={handleLogout}
        >
          Logout
        </button>

      </div>

    </div>

  );

};

export default Navbar;