import React, { useEffect, useState } from "react";
import { getReports, deleteReport } from "../services/api";
import jsPDF from "jspdf";
import { useNavigate } from "react-router-dom";

const severityRisk = (level) => {
  if (level === "High") return "risk-danger";
  if (level === "Moderate") return "risk-warning";
  if (level === "Low") return "risk-success";
  return "risk-secondary";
};

const Reports = () => {
  const navigate = useNavigate();
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
        (r) => r.drug?.toLowerCase() === selectedDrug.toLowerCase(),
      );
    }

    if (searchPatient) {
      filtered = filtered.filter((r) =>
        r.patient_id?.toLowerCase().includes(searchPatient.toLowerCase()),
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
      60,
    );
    doc.text(
      `Severity: ${report.risk_assessment?.severity || "Unknown"}`,
      20,
      70,
    );
    doc.text(
      `Date: ${new Date(report.createdAt).toLocaleDateString()}`,
      20,
      80,
    );

    doc.save(`report-${report.patient_id}.pdf`);
  };

  // Loading UI
  if (loading) {
    return (
      <div className="pg-page">
        <div className="pg-loading-wrap">
          <span className="pg-spinner" />
          Loading reports...
        </div>
      </div>
    );
  }

  return (
    <div className="pg-page">
      <div className="pg-page-header">
        <div>
          <span className="pg-eyebrow">Clinical Data</span>
          <h3>All Clinical Reports</h3>
        </div>
      </div>

      {/* FILTER SECTION */}
      <div className="pg-card pg-card-pad-sm mb-4" style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
        <select
          className="pg-select"
          style={{ maxWidth: 220 }}
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

        <input
          type="text"
          placeholder="Search by Patient ID"
          className="pg-input"
          style={{ maxWidth: 220 }}
          value={searchPatient}
          onChange={(e) => setSearchPatient(e.target.value)}
        />
      </div>

      {/* TABLE */}
      <div className="pg-table-wrap">
        <table className="pg-table">
          <thead>
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
                  <td className="pg-mono">{report.patient_id}</td>
                  <td>{report.drug}</td>

                  <td>{report.risk_assessment?.risk_label || "Unknown"}</td>

                  <td>
                    <span
                      className={`pg-badge ${severityRisk(report.risk_assessment?.severity)}`}
                    >
                      <span className={`pg-signal-dot ${severityRisk(report.risk_assessment?.severity)}`} />
                      {report.risk_assessment?.severity || "Unknown"}
                    </span>
                  </td>

                  <td>{new Date(report.createdAt).toLocaleDateString()}</td>

                  <td>
                    <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                      <button
                        className="pg-btn pg-btn-primary pg-btn-sm"
                        onClick={() => setSelectedReport(report)}
                      >
                        View
                      </button>

                      <button
                        className="pg-btn pg-btn-ghost pg-btn-sm"
                        onClick={() => exportPDF(report)}
                      >
                        PDF
                      </button>

                      <button
                        className="pg-btn pg-btn-danger-outline pg-btn-sm"
                        onClick={() => handleDelete(report._id)}
                      >
                        Delete
                      </button>
                      <button
                        className="pg-btn pg-btn-outline pg-btn-sm"
                        type="button" 
                        onClick={() =>
                          navigate("/chat", { state: { reportId: report._id } })
                        }
                      >
                        Ask AI
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6">
                  <div className="pg-empty">No reports found</div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* MODAL VIEW */}
      {selectedReport && (
        <div className="modal show d-block" tabIndex="-1" style={{ background: "rgba(11,18,32,0.55)" }}>
          <div className="modal-dialog modal-lg">
            <div className="modal-content" style={{ borderRadius: "var(--radius-lg)", border: "1px solid var(--border)" }}>
              <div className="modal-header" style={{ borderBottom: "1px solid var(--border)" }}>
                <h5 className="modal-title">Clinical Report Details</h5>

                <button
                  className="btn-close"
                  onClick={() => setSelectedReport(null)}
                ></button>
              </div>

              <div className="modal-body">
                <pre className="pg-mono" style={{ fontSize: "12px", background: "var(--canvas)", padding: 14, borderRadius: "var(--radius)" }}>
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
