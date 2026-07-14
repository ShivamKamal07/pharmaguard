import React from "react";

const JsonReportCard = ({ data }) => {
  if (!data) return null;

  return (
    <div className="pg-card mt-4">
      <div className="pg-card-header" style={{ background: "var(--ink)", color: "#fff", borderRadius: "var(--radius-lg) var(--radius-lg) 0 0" }}>
        Full Analysis Report (Structured JSON)
      </div>

      <div className="pg-card-body">
        <pre
          className="pg-mono"
          style={{
            maxHeight: "400px",
            overflowY: "auto",
            background: "var(--canvas)",
            border: "1px solid var(--border)",
            padding: "16px",
            borderRadius: "var(--radius)",
            fontSize: "0.82rem",
            margin: 0,
          }}
        >
          {JSON.stringify(data, null, 2)}
        </pre>
      </div>
    </div>
  );
};

export default JsonReportCard;
