const mongoose = require("mongoose");

const reportSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    fileName: {
      type: String,
    },
    riskLevel: {
      type: String,
      enum: ["Low", "Medium", "High"],
    },
    result: {
      type: Object, // AI analysis result
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Report", reportSchema);