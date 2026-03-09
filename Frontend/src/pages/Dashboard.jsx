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

  const COLORS = ["#dc3545", "#ffc107", "#28a745"];

  const hasData = high + moderate + low > 0;

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

      {/* CHART */}

      <div className="card shadow-sm p-4">
        <h5 className="mb-3 text-center">Risk Distribution</h5>

        {!hasData ? (
          <p className="text-center text-muted">
            No analysis data available yet
          </p>
        ) : (
          <div style={{ width: "100%", height: 400 }}>
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={chartData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
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