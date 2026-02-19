// backend/utils/formatResponse.js

function formatResponse({
  patientId,
  drug,
  riskAssessment,
  variantData,
  parsingSuccess,
  llmExplanation
}) {
  const timestamp = new Date().toISOString();

  const primaryGene = variantData?.gene || "Unknown";
  const diplotype = variantData?.diplotype || "Unknown";
  const phenotype = variantData?.phenotype || "Unknown";

  return {
    patient_id: patientId,
    drug: drug.toUpperCase(),
    timestamp,

    risk_assessment: {
      risk_label: riskAssessment.risk_label,
      confidence_score: riskAssessment.confidence_score,
      severity: riskAssessment.severity,
    },

    pharmacogenomic_profile: {
      primary_gene: primaryGene,
      diplotype: diplotype,
      phenotype: phenotype,
      detected_variants: variantData?.detected_variants || [],
    },

    clinical_recommendation: {
      recommendation: generateRecommendation(riskAssessment),
      guideline_source: "CPIC Level A/B (Simulated)",
    },

    llm_generated_explanation: llmExplanation || {
      summary: "Explanation unavailable.",
      mechanism: "Not generated.",
      citations: [],
    },

    quality_metrics: {
      vcf_parsing_success: parsingSuccess,
      variant_count: variantData?.detected_variants?.length || 0,
      timestamp_processed: timestamp,
    },
  };
}

function generateRecommendation(riskAssessment) {
  switch (riskAssessment.risk_label) {
    case "Safe":
      return "Standard dosing recommended.";
    case "Adjust Dosage":
      return "Dose adjustment required per CPIC guidelines.";
    case "Toxic":
      return "Avoid drug or use significantly reduced dose.";
    case "Ineffective":
      return "Consider alternative therapy.";
    default:
      return "Consult pharmacogenomics specialist.";
  }
}

module.exports = formatResponse;
