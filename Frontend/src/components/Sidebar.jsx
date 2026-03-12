import React from "react";
import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {

  const location = useLocation();

  const linkClass = (path) =>
    location.pathname === path
      ? "nav-link text-white bg-primary rounded"
      : "nav-link text-white";

  return (
    <div
      className="bg-dark text-white p-4 position-fixed vh-100"
      style={{ width: "250px" }}
    >
      <h4 className="mb-4">PharmaGuard</h4>

      <ul className="nav flex-column">

        <li className="nav-item mb-3">
          <Link className={linkClass("/dashboard")} to="/dashboard">
            Dashboard
          </Link>
        </li>

        <li className="nav-item mb-3">
          <Link className={linkClass("/analyze")} to="/analyze">
            Analyze
          </Link>
        </li>

        <li className="nav-item mb-3">
          <Link className={linkClass("/reports")} to="/reports">
            Reports
          </Link>
        </li>

        <li className="nav-item mb-3">
          <Link className={linkClass("/history")} to="/history">
            History
          </Link>
        </li>

        <li className="nav-item">
          <Link className={linkClass("/settings")} to="/settings">
            Settings
          </Link>
        </li>

      </ul>
    </div>
  );
};

export default Sidebar;