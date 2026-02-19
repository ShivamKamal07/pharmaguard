import React from "react";

const JsonReportCard = ({ data }) => {
  if (!data) return null;

  return (
    <div className="card shadow-sm mt-4">
      <div className="card-header bg-dark text-white">
        Full Analysis Report (Structured JSON)
      </div>

      <div className="card-body">
        <pre
          style={{
            maxHeight: "400px",
            overflowY: "auto",
            background: "#f8f9fa",
            padding: "15px",
            borderRadius: "8px",
            fontSize: "0.85rem",
          }}
        >
          {JSON.stringify(data, null, 2)}
        </pre>
      </div>
    </div>
  );
};

export default JsonReportCard;