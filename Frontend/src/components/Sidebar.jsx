import React from "react";
import { Link, useLocation } from "react-router-dom";
import { getRole } from "../utils/auth";

const Sidebar = () => {
  const location = useLocation();
  const role = getRole();

  const linkClass = (path) =>
    location.pathname === path
      ? "pg-nav-link is-active"
      : "pg-nav-link";

  return (
    <div className="pg-sidebar">
      <div className="pg-sidebar-brand">
        <span className="pg-sidebar-brand-mark">PG</span>
        <div>
          <div className="pg-sidebar-brand-name">PharmaGuard</div>
          <div className="pg-sidebar-brand-tag">Risk Intelligence</div>
        </div>
      </div>

      <div className="pg-sidebar-section-label">Overview</div>
      <ul className="pg-nav-list">

        {/* DASHBOARD */}
        <li>
          {role === "doctor" ? (
            <Link className={linkClass("/doctor-dashboard")} to="/doctor-dashboard">
              <SidebarIcon name="grid" />
              Doctor Dashboard
            </Link>
          ) : (
            <Link className={linkClass("/dashboard")} to="/dashboard">
              <SidebarIcon name="grid" />
              Dashboard
            </Link>
          )}
        </li>
      </ul>

      {/* PATIENT FEATURES */}
      {role === "patient" && (
        <>
          <div className="pg-sidebar-section-label">Workspace</div>
          <ul className="pg-nav-list">
            <li>
              <Link className={linkClass("/analyze")} to="/analyze">
                <SidebarIcon name="dna" />
                Analyze
              </Link>
            </li>

            <li>
              <Link className={linkClass("/chat")} to="/chat">
                <SidebarIcon name="chat" />
                Chat with AI
              </Link>
            </li>

            <li>
              <Link className={linkClass("/reports")} to="/reports">
                <SidebarIcon name="file" />
                Reports
              </Link>
            </li>

            <li>
              <Link className={linkClass("/history")} to="/history">
                <SidebarIcon name="clock" />
                History
              </Link>
            </li>
          </ul>
        </>
      )}

      {/* DOCTOR FEATURES */}
      {role === "doctor" && (
        <>
          <div className="pg-sidebar-section-label">Workspace</div>
          <ul className="pg-nav-list">
            <li>
              <Link className={linkClass("/patients")} to="/patients">
                <SidebarIcon name="users" />
                Patients
              </Link>
            </li>

            <li>
              <Link className={linkClass("/appointments")} to="/appointments">
                <SidebarIcon name="calendar" />
                Appointments
              </Link>
            </li>

            <li>
              <Link className={linkClass("/chat-doctor")} to="/chat-doctor">
                <SidebarIcon name="chat" />
                Patient Chat
              </Link>
            </li>
          </ul>
        </>
      )}

      {/* COMMON */}
      <div className="pg-sidebar-section-label">General</div>
      <ul className="pg-nav-list">
        <li>
          <Link className={linkClass("/settings")} to="/settings">
            <SidebarIcon name="settings" />
            Settings
          </Link>
        </li>
      </ul>

      <div className="pg-sidebar-footer">
        <span className="pg-signal-dot risk-success" />
        System operational
      </div>
    </div>
  );
};

const SidebarIcon = ({ name }) => {
  const common = {
    width: 17,
    height: 17,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round",
    strokeLinejoin: "round",
  };

  switch (name) {
    case "grid":
      return (
        <svg {...common}><rect x="3" y="3" width="7" height="7" rx="1.5" /><rect x="14" y="3" width="7" height="7" rx="1.5" /><rect x="3" y="14" width="7" height="7" rx="1.5" /><rect x="14" y="14" width="7" height="7" rx="1.5" /></svg>
      );
    case "dna":
      return (
        <svg {...common}><path d="M6 3c0 6 12 6 12 12" /><path d="M18 21c0-6-12-6-12-12" /><path d="M8 6h8M6 12h12M8 18h8" /></svg>
      );
    case "chat":
      return (
        <svg {...common}><path d="M21 11.5a8.5 8.5 0 0 1-8.5 8.5H4l1.6-4.1A8.4 8.4 0 0 1 4 11.5 8.5 8.5 0 0 1 12.5 3 8.5 8.5 0 0 1 21 11.5Z" /></svg>
      );
    case "file":
      return (
        <svg {...common}><path d="M6 2h9l5 5v15H6z" /><path d="M15 2v5h5" /><path d="M9 13h6M9 17h6" /></svg>
      );
    case "clock":
      return (
        <svg {...common}><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 3" /></svg>
      );
    case "users":
      return (
        <svg {...common}><circle cx="9" cy="8" r="3.2" /><path d="M2.5 20a6.5 6.5 0 0 1 13 0" /><circle cx="17.5" cy="8.5" r="2.6" /><path d="M15.5 13.2A5.8 5.8 0 0 1 21.5 19" /></svg>
      );
    case "calendar":
      return (
        <svg {...common}><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M3 10h18M8 3v4M16 3v4" /></svg>
      );
    case "settings":
      return (
        <svg {...common}><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.7 1.7 0 0 0 .34 1.87l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.7 1.7 0 0 0-1.87-.34 1.7 1.7 0 0 0-1 1.55V21a2 2 0 1 1-4 0v-.09a1.7 1.7 0 0 0-1-1.55 1.7 1.7 0 0 0-1.87.34l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.7 1.7 0 0 0 .34-1.87 1.7 1.7 0 0 0-1.55-1H3a2 2 0 1 1 0-4h.09a1.7 1.7 0 0 0 1.55-1 1.7 1.7 0 0 0-.34-1.87l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.7 1.7 0 0 0 1.87.34H9a1.7 1.7 0 0 0 1-1.55V3a2 2 0 1 1 4 0v.09a1.7 1.7 0 0 0 1 1.55 1.7 1.7 0 0 0 1.87-.34l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.7 1.7 0 0 0-.34 1.87V9a1.7 1.7 0 0 0 1.55 1H21a2 2 0 1 1 0 4h-.09a1.7 1.7 0 0 0-1.55 1Z" /></svg>
      );
    default:
      return null;
  }
};

export default Sidebar;
