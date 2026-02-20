import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid
} from "recharts";

const RiskGraph = ({ risk }) => {
  if (!risk) return null;

  const data = [
    {
      name: "Severity",
      value: risk.severity
    },
    {
      name: "Confidence",
      value: risk.confidence_score * 10 // scale for visibility
    }
  ];

  return (
    <div className="card mt-4 shadow">
      <div className="card-body">
        <h5>Risk Analytics Graph</h5>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default RiskGraph;