import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../services/api";

const severityRisk = (level) => {
  if (!level) return "risk-secondary";
  const l = level.toLowerCase();
  if (l.includes("high") || l.includes("toxic")) return "risk-danger";
  if (l.includes("moderate")) return "risk-warning";
  if (l.includes("low")) return "risk-success";
  return "risk-secondary";
};

const PatientDetails = () => {
  const { id } = useParams();
  const [reports, setReports] = useState([]);

  useEffect(() => {
    console.log("ID MILA:", id); 

    const fetchReports = async () => {
      try {
        const res = await API.get(`/doctor/patient/${id}/reports`);
        console.log("DATA:", res.data); 
        setReports(res.data);
      } catch (err) {
        console.error("ERROR:", err);
      }
    };

    if (id) fetchReports();
  }, [id]);

  return (
    <div className="pg-page">
      <div className="pg-page-header">
        <div>
          <span className="pg-eyebrow">Patient</span>
          <h2>Patient Reports</h2>
        </div>
      </div>

      {reports.length === 0 ? (
        <div className="pg-card">
          <div className="pg-empty">
            <div className="pg-empty-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M6 2h9l5 5v15H6z" /><path d="M15 2v5h5" /></svg>
            </div>
            No reports found
          </div>
        </div>
      ) : (
        reports.map((r) => (
          <div key={r._id} className={`pg-signal-card ${severityRisk(r.riskLevel)} pg-card-pad mb-3`}>
            <h5 style={{ marginBottom: 8 }}>{r.fileName}</h5>

            <p className="pg-subtitle" style={{ marginBottom: 14 }}>
              Risk Level:{" "}
              <span className={`pg-badge ${severityRisk(r.riskLevel)}`}>
                <span className={`pg-signal-dot ${severityRisk(r.riskLevel)}`} />
                {r.riskLevel}
              </span>
            </p>

            <button className="pg-btn pg-btn-outline pg-btn-sm">
              View Report
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default PatientDetails;
