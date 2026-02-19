import { useState } from "react";
import axios from "axios";

function App() {
  const [file, setFile] = useState(null);
  const [drug, setDrug] = useState("");
  const [response, setResponse] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file || !drug) {
      alert("Please upload file and enter drug name");
      return;
    }

    const formData = new FormData();
    formData.append("vcfFile", file);
    formData.append("drug", drug);

    try {
      const res = await axios.post(
        "http://localhost:5000/api/analyze",
        formData
      );

      setResponse(res.data);
    } catch (error) {
      console.error(error);
      alert("Error sending file");
    }
  };

  return (
    <div className="container mt-5 ">
      <div className="card p-4 shadow ">
        <h2 className="mb-4 text-center">PharmaGuard</h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Upload VCF File</label>
            <input
              type="file"
              className="form-control"
              accept=".vcf"
              onChange={(e) => setFile(e.target.files[0])}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Drug Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter Drug (e.g., CODEINE)"
              value={drug}
              onChange={(e) => setDrug(e.target.value)}
            />
          </div>

          <button type="submit" className="btn btn-primary w-100">
            Analyze
          </button>
        </form>

        {response && (
          <div className="mt-4">
            <h5>Response:</h5>
            <pre className="bg-light p-3">
              {JSON.stringify(response, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
