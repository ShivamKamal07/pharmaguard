// controllers/analysisController.js
const { parseVCF } = require("../services/vcfParser");
const { filterRelevantVariants } = require("../services/geneExtractor");
const Analysis = require("../models/Analysis");
const evaluateRisk = require("../utils/riskEngine");
const formatResponse = require("../utils/formatResponse");
const generateExplanation = require("../services/geminiService");

exports.analyzeVCF = async (req, res) => {
  try {
    const file = req.file;
    const { drug } = req.body;

    // Validation
    if (!file) {
      return res.status(400).json({ message: "VCF file is required" });
    }

    if (!drug) {
      return res.status(400).json({ message: "Drug name is required" });
    }

    // Convert buffer to string
    const fileContent = file.buffer.toString("utf-8");

    // 🔬 Parse + Filter
    const parsedVariants = parseVCF(fileContent);
    const relevantVariants = filterRelevantVariants(parsedVariants);

    // ✅ 🧪 ADD RISK ENGINE HERE
    const riskAssessment = evaluateRisk(relevantVariants, drug);

    console.log("Risk Assessment:", riskAssessment);

    const normalizedDrug = drug.toUpperCase();

    const primaryGene = relevantVariants[0]?.gene || "Unknown";
    const diplotype = relevantVariants.length > 0 ? "*1/*1" : "Unknown";
    const phenotype = relevantVariants.length > 0 ? "NM" : "Unknown";

    // 🔥 Generate LLM Explanation (Phase 5)
    let llmExplanation = {
      summary: "Explanation unavailable.",
      mechanism: "Not generated.",
      citations: [],
    };

    try {
      llmExplanation = await generateExplanation({
        drug: normalizedDrug,
        gene: primaryGene,
        phenotype,
        riskLabel: riskAssessment.risk_label,
        detectedVariants: relevantVariants,
      });
    } catch (err) {
      console.error("Gemini error:", err.message);
    }

    const formattedOutput = formatResponse({
      patientId: "PATIENT_001",
      drug: normalizedDrug,
      riskAssessment,
      variantData: {
        gene: primaryGene,
        diplotype,
        phenotype,
        detected_variants: relevantVariants,
      },
      parsingSuccess: true,
      llmExplanation,
    });

    const savedAnalysis = await Analysis.create(formattedOutput);

    // // Final result object
    // const finalJson = {
    //   totalVariants: parsedVariants.length,
    //   pharmacogenomicVariants: relevantVariants.length,
    //   variants: relevantVariants,
    //   risk: riskAssessment,
    // };

    // ✅ Save to MongoDB
    // const savedAnalysis = await Analysis.create({
    //   patient_id: "PATIENT_001", // You can make this dynamic later
    //   drug,
    //   result: finalJson,
    // });

    // return res.status(200).json({
    //   message: "VCF parsed and saved successfully",
    //   analysisId: savedAnalysis._id,
    //   ...finalJson,
    // });

    return res.status(200).json(formattedOutput);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};
