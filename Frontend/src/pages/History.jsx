import React, { useEffect, useState } from "react";
import { getReports } from "../services/api";

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
    return <p>Loading history...</p>;
  }

  return (
    <div>
      <h2 className="mb-4">Analysis History</h2>

      {history.length === 0 ? (
        <p>No analysis history available.</p>
      ) : (
        <div className="card shadow-sm p-3">
          <table className="table table-striped">
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
                    <span
                      className={
                        item?.risk_assessment?.severity === "High"
                          ? "text-danger"
                          : item?.risk_assessment?.severity === "Moderate"
                          ? "text-warning"
                          : "text-success"
                      }
                    >
                      {item?.risk_assessment?.severity || "N/A"}
                    </span>
                  </td>

                  <td>
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