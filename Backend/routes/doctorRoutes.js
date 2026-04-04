const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const { getPatients } = require("../controllers/doctorController");

router.get("/patients", authMiddleware, getPatients);

module.exports = router;