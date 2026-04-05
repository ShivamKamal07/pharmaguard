const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const { getPatients } = require("../controllers/doctorController");
const { getPatientReports } = require("../controllers/doctorController");

router.get("/patients", authMiddleware, getPatients);
router.get("/patient/:id/reports", authMiddleware, getPatientReports);


module.exports = router;