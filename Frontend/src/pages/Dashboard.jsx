import React, { useEffect, useState } from "react";
import { getReports } from "../services/api";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const Dashboard = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch Reports
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getReports();
        setReports(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching reports:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Severity Counts
  const high = reports.filter(
    (r) => r.risk_assessment?.severity === "High",
  ).length;

  const moderate = reports.filter(
    (r) => r.risk_assessment?.severity === "Moderate",
  ).length;

  const low = reports.filter(
    (r) => r.risk_assessment?.severity === "Low",
  ).length;

  // Average Confidence
  const avgConfidence =
    reports.length > 0
      ? (
          reports.reduce(
            (acc, curr) => acc + (curr.risk_assessment?.confidence_score || 0),
            0,
          ) / reports.length
        ).toFixed(1)
      : 0;

  // Chart Data
  const data = [
    { name: "High Risk", value: high || 0 },
    { name: "Moderate Risk", value: moderate || 0 },
    { name: "Low Risk", value: low || 0 },
  ];

  const COLORS = ["#dc3545", "#ffc107", "#28a745"];

  // Loading UI
  if (loading) {
    return <p>Loading dashboard...</p>;
  }

  return (
    <div>
      <h2 className="mb-4">Dashboard Overview</h2>

      {/* STAT CARDS */}

      <div className="row mb-4">
        <div className="col-md-3">
          <div className="card shadow-sm p-3 text-center">
            <h6>Total Analyses</h6>
            <h3>{reports.length}</h3>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card shadow-sm p-3 text-center">
            <h6>Safe Cases (Low)</h6>
            <h3 className="text-success">{low}</h3>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card shadow-sm p-3 text-center">
            <h6>Toxic Cases (High)</h6>
            <h3 className="text-danger">{high}</h3>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card shadow-sm p-3 text-center">
            <h6>Avg Confidence</h6>
            <h3>{avgConfidence}%</h3>
          </div>
        </div>
      </div>

      {/* PIE CHART */}

      <div className="card shadow-sm p-4">
        <h5 className="mb-3 text-center">Risk Distribution</h5>

        <div style={{ width: "100%", height: 600 }}>
          <ResponsiveContainer>
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={120}
                fill="#8884d8"
                label
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index]} />
                ))}
              </Pie>

              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
