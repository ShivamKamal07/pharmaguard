const mongoose = require("mongoose");

const analysisSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    patient_id: {
      type: String,
      required: true,
    },
    drug: {
      type: String,
      required: true,
    },
    risk_assessment: {
      risk_label: {
        type: String,
        required: true,
      },
      confidence_score: {
        type: Number,
        required: true,
      },
      severity: {
        type: String,
        required: true,
      },
    },
    full_json: {
      type: Object,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Analysis", analysisSchema);