const User = require("../models/User");
const Report = require("../models/Report");

exports.getPatients = async (req, res) => {
  try {
    //role check
    if (req.user.role !== "doctor") {
      return res.status(403).json({ message: "Access denied" });
    }

    const patients = await User.find({ role: "patient" }).select("-password");

    res.json(patients);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch patients" });
  }
};

exports.getPatientReports = async (req, res) => {
  try {
    // 🔐 Only doctor allowed
    if (req.user.role !== "doctor") {
      return res.status(403).json({ message: "Access denied" });
    }

    const patientId = req.params.id;

    const reports = await Report.find({ user: patientId });

    res.json(reports);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch reports" });
  }
};