
const express = require("express");
const multer = require("multer");
const { analyzeVCF } = require("../controllers/analysisController");
const Analysis = require("../models/Analysis");

const router = express.Router();

// Store file in memory (temporary)
const storage = multer.memoryStorage();
const upload = multer({ storage });

// POST endpoint
router.post("/analyze", upload.single("file"), analyzeVCF);

// ✅ GET ALL REPORTS
router.get("/reports", async (req, res) => {
  try {
    const reports = await Analysis.find().sort({ createdAt: -1 });
    res.json(reports);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch reports" });
  }
});

// ✅ DELETE REPORT
router.delete("/reports/:id", async (req, res) => {
  try {
    await Analysis.findByIdAndDelete(req.params.id);
    res.json({ message: "Report deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Delete failed" });
  }
});

module.exports = router;
