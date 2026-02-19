import React, { useState } from "react";
import UploadForm from "../components/UploadForm";
import RiskCard from "../components/RiskCard";
import "./Dashboard.css";

const Dashboard = () => {
  const [result, setResult] = useState(null);

  return (
    <div className="dashboard-wrapper">
      <div className="dashboard-container">

        <h2 className="text-center dashboard-title">
          PharmaGuard Dashboard
        </h2>

        <UploadForm setResult={setResult} />

        {result && (
          <div className="mt-4 risk-card-animate">
            <RiskCard risk={result.risk_assessment} />
          </div>
        )}

      </div>
    </div>
  );
};

export default Dashboard;
