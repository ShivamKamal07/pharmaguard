import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../services/api";

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
    <div style={{ padding: "20px" }}>
      <h2>📄 Patient Reports</h2>

      {reports.length === 0 ? (
        <p>No reports found</p>
      ) : (
        reports.map((r) => (
          <div key={r._id} className="card p-3 mb-3 shadow-sm">
            <h5>{r.fileName}</h5>

            <p className="text-muted">
              Risk Level: <strong>{r.riskLevel}</strong>
            </p>

            <button className="btn btn-outline-primary btn-sm">
              View Report
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default PatientDetails;