import React, { useEffect, useState } from "react";
import { getReports } from "../services/api";

const severityRisk = (level) => {
  if (level === "High") return "risk-danger";
  if (level === "Moderate") return "risk-warning";
  if (level === "Low") return "risk-success";
  return "risk-secondary";
};

const History = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch history (reports)
  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await getReports();
        const data = Array.isArray(response) ? response : response?.data || [];
        setHistory(data);
      } catch (error) {
        console.error("Error fetching history:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  if (loading) {
    return (
      <div className="pg-page">
        <div className="pg-loading-wrap">
          <span className="pg-spinner" />
          Loading history...
        </div>
      </div>
    );
  }

  return (
    <div className="pg-page">
      <div className="pg-page-header">
        <div>
          <span className="pg-eyebrow">Timeline</span>
          <h2>Analysis History</h2>
        </div>
      </div>

      {history.length === 0 ? (
        <div className="pg-card">
          <div className="pg-empty">
            <div className="pg-empty-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 3" /></svg>
            </div>
            No analysis history available.
          </div>
        </div>
      ) : (
        <div className="pg-table-wrap">
          <table className="pg-table">
            <thead>
              <tr>
                <th>S.NO</th>
                <th>Compound</th>
                <th>Severity</th>
                <th>Confidence</th>
                <th>Date</th>
              </tr>
            </thead>

            <tbody>
              {history.map((item, index) => (
                <tr key={item._id || index}>
                  <td>{index + 1}</td>

                  <td>
                    {item.compound_name || item.compound || item.drug || "Unknown"}
                  </td>

                  <td>
                    <span className={`pg-badge ${severityRisk(item?.risk_assessment?.severity)}`}>
                      <span className={`pg-signal-dot ${severityRisk(item?.risk_assessment?.severity)}`} />
                      {item?.risk_assessment?.severity || "N/A"}
                    </span>
                  </td>

                  <td className="pg-mono">
                    {item?.risk_assessment?.confidence_score
                      ? item.risk_assessment.confidence_score + "%"
                      : "N/A"}
                  </td>

                  <td>
                    {item.createdAt
                      ? new Date(item.createdAt).toLocaleDateString()
                      : "N/A"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default History;
