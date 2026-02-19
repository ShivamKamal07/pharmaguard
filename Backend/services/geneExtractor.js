// services/geneExtractor.js

const TARGET_GENES = [
  "CYP2D6",
  "CYP2C19",
  "CYP2C9",
  "SLCO1B1",
  "TPMT",
  "DPYD",
];

/**
 * Extract gene symbol from INFO field
 */
function extractGeneFromInfo(infoField) {
  const infoParts = infoField.split(";");

  for (let part of infoParts) {
    if (part.startsWith("GENE=")) {
      return part.split("=")[1];
    }
  }

  return null;
}

/**
 * Filter only pharmacogenomic relevant variants
 */
function filterRelevantVariants(variants) {
  const relevant = [];

  for (let variant of variants) {
    const gene = extractGeneFromInfo(variant.info);

    if (gene && TARGET_GENES.includes(gene)) {
      relevant.push({
        rsid: variant.rsid,
        gene: gene,
        chromosome: variant.chromosome,
        position: variant.position,
        ref: variant.ref,
        alt: variant.alt,
      });
    }
  }

  return relevant;
}

module.exports = { filterRelevantVariants };
