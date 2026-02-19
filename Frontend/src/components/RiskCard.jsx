import React from "react";

const getColor = (risk) => {
  if (risk === "Safe") return "success";
  if (risk === "Adjust Dosage") return "warning";
  if (risk === "Toxic" || risk === "Ineffective") return "danger";
  return "secondary";
};

const RiskCard = ({ risk }) => {
  if (!risk) return null;

  return (
    <div className={`card mt-4 border-${getColor(risk.risk_label)} shadow`}>
      <div className="card-body">
        <h5>Risk Assessment</h5>
        <h3 className={`text-${getColor(risk.risk_label)}`}>
          {risk.risk_label}
        </h3>
        <p><strong>Severity:</strong> {risk.severity}</p>
        <p><strong>Confidence:</strong> {risk.confidence_score}</p>
      </div>
    </div>
  );
};

export default RiskCard;
