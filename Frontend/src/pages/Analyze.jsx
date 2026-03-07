import React, { useState } from "react";
import UploadForm from "../components/UploadForm";
import RiskCard from "../components/RiskCard";
import JsonReportCard from "../components/JsonReportCard";
import RiskGraph from "../components/RiskGraph";

const Analyze = () => {
  const [result, setResult] = useState(null);

  return (
    <div>
      <h2 className="mb-4">Analyze Patient Genomic Data</h2>

      <UploadForm setResult={setResult} />

      {result && (
        <>
          <RiskCard risk={result.risk_assessment} />
          <JsonReportCard data={result} />
          <RiskGraph risk={result.risk_assessment} />
        </>
      )}
    </div>
  );
};

export default Analyze;