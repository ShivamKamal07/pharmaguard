// app.js
const express = require("express");
const cors = require("cors");


const analysisRoutes = require("./routes/analysisRoutes");

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use("/api", analysisRoutes);

module.exports = app;
