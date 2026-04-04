const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const analysisRoutes = require("./routes/analysisRoutes");
const chatRoutes = require("./routes/chatRoute");
const doctorRoutes = require("./routes/doctorRoutes");

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api", analysisRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/doctor", doctorRoutes);

module.exports = app;
