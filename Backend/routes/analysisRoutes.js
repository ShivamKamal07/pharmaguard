// routes/analysisRoutes.js
const express = require("express");
const multer = require("multer");
const { analyzeVCF } = require("../controllers/analysisController");

const router = express.Router();

// Store file in memory (temporary)
const storage = multer.memoryStorage();
const upload = multer({ storage });

// POST endpoint
router.post("/analyze", upload.single("file"), analyzeVCF);

module.exports = router;
