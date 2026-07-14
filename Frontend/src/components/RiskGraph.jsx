import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Cell
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

  const BAR_COLORS = ["#0E7C86", "#16A34A"];

  return (
    <div className="pg-card pg-card-pad mt-4">
      <h5 style={{ marginBottom: 16 }}>Risk Analytics Graph</h5>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
          <XAxis dataKey="name" tick={{ fontSize: 12, fill: "#5B6472" }} />
          <YAxis tick={{ fontSize: 12, fill: "#5B6472" }} />
          <Tooltip />
          <Bar dataKey="value" radius={[6, 6, 0, 0]}>
            {data.map((entry, index) => (
              <Cell key={index} fill={BAR_COLORS[index % BAR_COLORS.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RiskGraph;
