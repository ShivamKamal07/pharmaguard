const express = require("express");
const multer = require("multer");

const { analyzeVCF, getReports } = require("../controllers/analysisController");
const Analysis = require("../models/Analysis");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Store file in memory
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Analyze VCF
router.post("/analyze", authMiddleware, upload.single("file"), analyzeVCF);

// Get Reports (User Specific)
router.get("/reports", authMiddleware, getReports);

// Delete Report
router.delete("/reports/:id", authMiddleware, async (req, res) => {
  try {

    await Analysis.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.id
    });

    res.json({ message: "Report deleted successfully" });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      error: "Delete failed"
    });

  }
});

module.exports = router;