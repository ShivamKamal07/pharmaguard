import React, { useEffect, useState } from "react";
import { getReports, deleteReport } from "../services/api";
import jsPDF from "jspdf";

const Reports = () => {
  const [reports, setReports] = useState([]);
  const [filteredReports, setFilteredReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDrug, setSelectedDrug] = useState("");
  const [searchPatient, setSearchPatient] = useState("");
  const [selectedReport, setSelectedReport] = useState(null);

  // Fetch Reports
  const fetchReports = async () => {
    try {
      setLoading(true);

      const data = await getReports();
      setReports(data);
      setFilteredReports(data);

      setLoading(false);
    } catch (error) {
      console.error("Error fetching reports:", error);
      setLoading(false);
    }
  };

  // Load reports when page opens
  useEffect(() => {
    fetchReports();
  }, []);

  // Filtering Logic
  useEffect(() => {
    let filtered = reports;

    if (selectedDrug) {
      filtered = filtered.filter(
        (r) => r.drug?.toLowerCase() === selectedDrug.toLowerCase()
      );
    }

    if (searchPatient) {
      filtered = filtered.filter((r) =>
        r.patient_id?.toLowerCase().includes(searchPatient.toLowerCase())
      );
    }

    setFilteredReports(filtered);
  }, [selectedDrug, searchPatient, reports]);

  // Delete report
  const handleDelete = async (id) => {
    try {
      await deleteReport(id);
      fetchReports();
    } catch (error) {
      console.error("Error deleting report:", error);
    }
  };

  // Get unique drugs for dropdown
  const uniqueDrugs = [...new Set(reports.map((r) => r.drug))];

  // Export PDF
  const exportPDF = (report) => {
    const doc = new jsPDF();

    doc.setFontSize(16);
    doc.text("Clinical Risk Report", 20, 20);

    doc.setFontSize(12);
    doc.text(`Patient ID: ${report.patient_id}`, 20, 40);
    doc.text(`Drug: ${report.drug}`, 20, 50);
    doc.text(
      `Risk Label: ${report.risk_assessment?.risk_label || "Unknown"}`,
      20,
      60
    );
    doc.text(
      `Severity: ${report.risk_assessment?.severity || "Unknown"}`,
      20,
      70
    );
    doc.text(
      `Date: ${new Date(report.createdAt).toLocaleDateString()}`,
      20,
      80
    );

    doc.save(`report-${report.patient_id}.pdf`);
  };

  // Loading UI
  if (loading) {
    return <p>Loading reports...</p>;
  }

  return (
    <div>
      <h3 className="mb-4">All Clinical Reports</h3>

      {/* FILTER SECTION */}
      <div className="row mb-4">
        <div className="col-md-4">
          <select
            className="form-select"
            value={selectedDrug}
            onChange={(e) => setSelectedDrug(e.target.value)}
          >
            <option value="">Filter by Drug</option>
            {uniqueDrugs.map((drug, index) => (
              <option key={index} value={drug}>
                {drug}
              </option>
            ))}
          </select>
        </div>

        <div className="col-md-4">
          <input
            type="text"
            placeholder="Search by Patient ID"
            className="form-control"
            style={{ maxWidth: "200px" }}
            value={searchPatient}
            onChange={(e) => setSearchPatient(e.target.value)}
          />
        </div>
      </div>

      {/* TABLE */}
      <table className="table table-bordered shadow">
        <thead className="table-dark">
          <tr>
            <th>Patient</th>
            <th>Drug</th>
            <th>Risk</th>
            <th>Severity</th>
            <th>Date</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {filteredReports.length > 0 ? (
            filteredReports.map((report) => (
              <tr key={report._id}>
                <td>{report.patient_id}</td>
                <td>{report.drug}</td>

                <td>{report.risk_assessment?.risk_label || "Unknown"}</td>

                <td>
                  <span
                    className={`badge ${
                      report.risk_assessment?.severity === "High"
                        ? "bg-danger"
                        : report.risk_assessment?.severity === "Moderate"
                        ? "bg-warning text-dark"
                        : report.risk_assessment?.severity === "Low"
                        ? "bg-success"
                        : "bg-secondary"
                    }`}
                  >
                    {report.risk_assessment?.severity || "Unknown"}
                  </span>
                </td>

                <td>
                  {new Date(report.createdAt).toLocaleDateString()}
                </td>

                <td>
                  <button
                    className="btn btn-primary btn-sm me-2"
                    onClick={() => setSelectedReport(report)}
                  >
                    View
                  </button>

                  <button
                    className="btn btn-secondary btn-sm me-2"
                    onClick={() => exportPDF(report)}
                  >
                    PDF
                  </button>

                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(report._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="text-center">
                No reports found
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* MODAL VIEW */}
      {selectedReport && (
        <div className="modal show d-block" tabIndex="-1">
          <div className="modal-dialog modal-lg">
            <div className="modal-content">

              <div className="modal-header">
                <h5 className="modal-title">Clinical Report Details</h5>

                <button
                  className="btn-close"
                  onClick={() => setSelectedReport(null)}
                ></button>
              </div>

              <div className="modal-body">
                <pre style={{ fontSize: "12px" }}>
                  {JSON.stringify(selectedReport.full_json, null, 2)}
                </pre>
              </div>

            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Reports;