import React, { useState } from "react";
import { analyzeVCF } from "../services/api";

const UploadForm = ({ setResult }) => {
  const [file, setFile] = useState(null);
  const [drug, setDrug] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file || !drug) {
      alert("File and Drug required");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("drug", drug);

    try {
      setLoading(true);
      const data = await analyzeVCF(formData);
      setResult(data);
    } catch (err) {
      console.error(err);
      alert("Error analyzing VCF");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card p-4 shadow">
      <h4 className="mb-3">Upload VCF File</h4>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <input
            type="file"
            className="form-control"
            accept=".vcf"
            onChange={(e) => setFile(e.target.files[0])}
          />
        </div>

        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Enter Drug (e.g. WARFARIN)"
            value={drug}
            onChange={(e) => setDrug(e.target.value)}
          />
        </div>

        <button className="btn btn-primary w-100" disabled={loading}>
          {loading ? "Analyzing..." : "Analyze"}
        </button>
      </form>
    </div>
  );
};

export default UploadForm;
