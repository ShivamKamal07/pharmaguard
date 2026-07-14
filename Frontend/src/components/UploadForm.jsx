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
    <div className="pg-card pg-card-pad">
      <h4 style={{ marginBottom: 4 }}>Upload VCF File</h4>
      <p className="pg-subtitle" style={{ marginBottom: 18 }}>
        Upload a variant call file and target drug to run risk analysis
      </p>

      <form onSubmit={handleSubmit}>
        <div className="pg-field">
          <label className="pg-label">VCF File</label>
          <input
            type="file"
            className="pg-file-input"
            accept=".vcf"
            onChange={(e) => setFile(e.target.files[0])}
          />
          {file && (
            <div className="pg-subtitle" style={{ marginTop: 6, fontSize: "0.8rem" }}>
              Selected: <span className="pg-mono">{file.name}</span>
            </div>
          )}
        </div>

        <div className="pg-field">
          <label className="pg-label">Drug</label>
          <input
            type="text"
            className="pg-input"
            placeholder="Enter Drug (e.g. WARFARIN)"
            value={drug}
            onChange={(e) => setDrug(e.target.value)}
          />
        </div>

        <button className="pg-btn pg-btn-primary pg-btn-block" disabled={loading}>
          {loading && <span className="pg-spinner" style={{ width: 14, height: 14, borderWidth: 2 }} />}
          {loading ? "Analyzing..." : "Analyze"}
        </button>
      </form>
    </div>
  );
};

export default UploadForm;
