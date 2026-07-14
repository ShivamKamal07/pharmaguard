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
    <div className={`pg-signal-card risk-${color} pg-card-pad mt-4`}>
      <span className="pg-eyebrow">Risk Assessment</span>

      <h3 style={{ display: "flex", alignItems: "center", marginTop: 6, marginBottom: 14 }}>
        <span className={`pg-signal-dot risk-${color}`} />
        {risk.risk_label}
      </h3>

      <div style={{ display: "flex", gap: 28, flexWrap: "wrap" }}>
        <div>
          <div className="pg-stat-label">Severity</div>
          <div className="pg-mono" style={{ fontWeight: 600 }}>{risk.severity}</div>
        </div>
        <div>
          <div className="pg-stat-label">Confidence</div>
          <div className="pg-mono" style={{ fontWeight: 600 }}>{risk.confidence_score}</div>
        </div>
      </div>
    </div>
  );
};

export default RiskCard;
