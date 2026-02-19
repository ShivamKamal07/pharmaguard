// backend/utils/riskEngine.js

// Supported pharmacogenomic genes
const targetGenes = [
  "CYP2D6",
  "CYP2C19",
  "CYP2C9",
  "SLCO1B1",
  "TPMT",
  "DPYD"
];

// Simplified phenotype mapping (for hackathon level)
const phenotypeMap = {
  CYP2D6: {
    rs3892097: { diplotype: "*4/*4", phenotype: "PM" }
  },
  CYP2C19: {
    rs4244285: { diplotype: "*2/*2", phenotype: "PM" }
  },
  CYP2C9: {
    rs1799853: { diplotype: "*2/*3", phenotype: "IM" }
  },
  SLCO1B1: {
    rs4149056: { diplotype: "*5/*5", phenotype: "IM" }
  },
  TPMT: {
    rs1800462: { diplotype: "*3A/*3A", phenotype: "PM" }
  },
  DPYD: {
    rs3918290: { diplotype: "*2A/*2A", phenotype: "PM" }
  }
};

// Drug risk logic
const drugRiskRules = {
  CODEINE: {
    gene: "CYP2D6",
    PM: { risk: "Ineffective", severity: "moderate" },
    URM: { risk: "Toxic", severity: "high" }
  },
  WARFARIN: {
    gene: "CYP2C9",
    IM: { risk: "Adjust Dosage", severity: "moderate" },
    PM: { risk: "Toxic", severity: "high" }
  },
  CLOPIDOGREL: {
    gene: "CYP2C19",
    PM: { risk: "Ineffective", severity: "high" }
  },
  SIMVASTATIN: {
    gene: "SLCO1B1",
    IM: { risk: "Toxic", severity: "moderate" }
  },
  AZATHIOPRINE: {
    gene: "TPMT",
    PM: { risk: "Toxic", severity: "critical" }
  },
  FLUOROURACIL: {
    gene: "DPYD",
    PM: { risk: "Toxic", severity: "critical" }
  }
};

function evaluateRisk(variants, drug) {
  drug = drug.toUpperCase();

  const rule = drugRiskRules[drug];

  if (!rule) {
    return {
      risk_label: "Unknown",
      confidence_score: 0.2,
      severity: "low"
    };
  }

  const relevantVariant = variants.find(v => v.gene === rule.gene);

  if (!relevantVariant) {
    return {
      risk_label: "Safe",
      confidence_score: 0.6,
      severity: "none"
    };
  }

  const geneRules = phenotypeMap[rule.gene];
  const mapping = geneRules?.[relevantVariant.rsid];

  if (!mapping) {
    return {
      risk_label: "Unknown",
      confidence_score: 0.3,
      severity: "low"
    };
  }

  const phenotype = mapping.phenotype;
  const drugSpecificRule = rule[phenotype];

  if (!drugSpecificRule) {
    return {
      risk_label: "Safe",
      confidence_score: 0.7,
      severity: "none"
    };
  }

  return {
    risk_label: drugSpecificRule.risk,
    confidence_score: 0.9,
    severity: drugSpecificRule.severity
  };
}

module.exports = evaluateRisk;
