import { useEffect, useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

const Patients = () => {
  const [patients, setPatients] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    try {
      const res = await API.get("/doctor/patients");
      setPatients(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const initials = (name) =>
    name
      ? name.split(" ").map((n) => n[0]).slice(0, 2).join("").toUpperCase()
      : "?";

  return (
    <div className="pg-page">
      <div className="pg-page-header">
        <div>
          <span className="pg-eyebrow">Care Team</span>
          <h2>Patient List</h2>
        </div>
      </div>

      {patients.length === 0 ? (
        <div className="pg-card">
          <div className="pg-empty">
            <div className="pg-empty-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="9" cy="8" r="3.2" /><path d="M2.5 20a6.5 6.5 0 0 1 13 0" /></svg>
            </div>
            No patients found
          </div>
        </div>
      ) : (
        <div className="row">
          {patients.map((p) => (
            <div className="col-md-4 mb-3" key={p._id}>
              <div className="pg-card pg-card-hover pg-card-pad">
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
                  <div className="pg-avatar">{initials(p.name)}</div>
                  <div>
                    <h5 style={{ marginBottom: 2 }}>{p.name}</h5>
                    <div className="pg-subtitle" style={{ fontSize: "0.8rem" }}>{p.email}</div>
                  </div>
                </div>

                <button
                  className="pg-btn pg-btn-outline pg-btn-sm pg-btn-block"
                  onClick={() =>
                    navigate(`/patient/${p._id}`)
                  }
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Patients;
