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

  // FETCH REPORTS
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getReports();

        // handle different API formats
        const data = Array.isArray(response) ? response : response?.data || [];

        setReports(data);
      } catch (error) {
        console.error("Error fetching reports:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // SEVERITY COUNTS
const high = reports.filter((r) =>
  r?.risk_assessment?.severity?.toLowerCase()?.includes("high")
).length;

const moderate = reports.filter((r) =>
  r?.risk_assessment?.severity?.toLowerCase()?.includes("moderate")
).length;

const low = reports.filter((r) =>
  r?.risk_assessment?.severity?.toLowerCase()?.includes("low")
).length;

  // AVG CONFIDENCE
  const avgConfidence =
    reports.length > 0
      ? (
          reports.reduce(
            (acc, curr) =>
              acc + (curr?.risk_assessment?.confidence_score || 0),
            0
          ) / reports.length
        ).toFixed(1)
      : 0;

  // CHART DATA
  const chartData = [
    { name: "High Risk", value: high },
    { name: "Moderate Risk", value: moderate },
    { name: "Low Risk", value: low },
  ];

  const COLORS = ["#DC2626", "#D97706", "#16A34A"];

  const hasData = high + moderate + low > 0;

  if (loading) {
    return (
      <div className="pg-page">
        <div className="pg-loading-wrap">
          <span className="pg-spinner" />
          Loading dashboard...
        </div>
      </div>
    );
  }

  return (
    <div className="pg-page">
      <div className="pg-page-header">
        <div>
          <span className="pg-eyebrow">Overview</span>
          <h2>Dashboard</h2>
        </div>
      </div>

      {/* STAT CARDS */}

      <div className="pg-stat-grid">
        <div className="pg-stat-card">
          <div className="pg-stat-label">Total Analyses</div>
          <div className="pg-stat-value">{reports.length}</div>
        </div>

        <div className="pg-stat-card is-success">
          <div className="pg-stat-label">Safe Cases (Low)</div>
          <div className="pg-stat-value is-success">{low}</div>
        </div>

        <div className="pg-stat-card is-danger">
          <div className="pg-stat-label">Toxic Cases (High)</div>
          <div className="pg-stat-value is-danger">{high}</div>
        </div>

        <div className="pg-stat-card is-warning">
          <div className="pg-stat-label">Avg Confidence</div>
          <div className="pg-stat-value is-warning">{avgConfidence}%</div>
        </div>
      </div>

      {/* CHART */}

      <div className="pg-card pg-card-pad">
        <h5 style={{ marginBottom: 16 }}>Risk Distribution</h5>

        {!hasData ? (
          <div className="pg-empty">
            <div className="pg-empty-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="12" cy="12" r="9" /><path d="M9 12h6M12 9v6" /></svg>
            </div>
            No analysis data available yet
          </div>
        ) : (
          <div style={{ width: "100%", height: 380 }}>
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={chartData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={110}
                  label
                >
                  {chartData.map((entry, index) => (
                    <Cell key={index} fill={COLORS[index]} />
                  ))}
                </Pie>

                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
