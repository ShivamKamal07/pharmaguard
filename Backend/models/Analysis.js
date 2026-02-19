const mongoose = require("mongoose");

const analysisSchema = new mongoose.Schema({
  patient_id: String,
  drug: String,
  result: Object,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Analysis", analysisSchema);
