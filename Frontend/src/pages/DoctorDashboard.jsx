import { getUser } from "../utils/auth";

const DoctorDashboard = () => {
  const user = getUser();

  return (
    <div className="pg-page">
      <div className="pg-page-header">
        <div>
          <span className="pg-eyebrow">Overview</span>
          <h2>Doctor Dashboard</h2>
          <p className="pg-subtitle">Welcome, Dr. {user?.name}</p>
        </div>
      </div>

      <div className="pg-stat-grid">
        <div className="pg-stat-card">
          <div className="pg-stat-label">Total Patients</div>
          <div className="pg-stat-value">--</div>
        </div>

        <div className="pg-stat-card is-danger">
          <div className="pg-stat-label">High Risk Cases</div>
          <div className="pg-stat-value is-danger">--</div>
        </div>

        <div className="pg-stat-card">
          <div className="pg-stat-label">Active Chats</div>
          <div className="pg-stat-value">--</div>
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboard;
