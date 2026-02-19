import React, { useState } from "react";
import UploadForm from "../components/UploadForm";
import RiskCard from "../components/RiskCard";

const Dashboard = () => {
  const [result, setResult] = useState(null);

  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-center">PharmaGuard Dashboard</h2>

      <UploadForm setResult={setResult} />

      {result && (
        <RiskCard risk={result.risk_assessment} />
      )}
    </div>
  );
};

export default Dashboard;
