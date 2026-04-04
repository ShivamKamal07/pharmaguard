const User = require("../models/User");

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