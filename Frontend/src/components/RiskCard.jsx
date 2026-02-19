import React from "react";

const getColor = (risk) => {
  if (!risk) return "secondary";
  if (risk === "Safe") return "success";
  if (risk === "Adjust Dosage") return "warning";
  if (risk === "Toxic" || risk === "Ineffective") return "danger";
  return "secondary";
};

const RiskCard = ({ risk }) => {
  if (!risk) return null;

  const color = getColor(risk.risk_label);

  return (
    <div className={`card mt-4 border-${color} shadow`}>
      <div className="card-body">
        <h5>Risk Assessment</h5>
        <h3 className={`text-${color}`}>
          {risk.risk_label}
        </h3>
        <p><strong>Severity:</strong> {risk.severity}</p>
        <p><strong>Confidence:</strong> {risk.confidence_score}</p>
      </div>
    </div>
  );
};

export default RiskCard;