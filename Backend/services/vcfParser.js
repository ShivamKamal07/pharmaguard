// services/vcfParser.js

/**
 * Parses raw VCF file content into structured variant objects
 */
function parseVCF(fileContent) {
  const lines = fileContent.split("\n");

  const variants = [];

  for (let line of lines) {
    // Skip metadata lines
    if (line.startsWith("#")) continue;

    if (!line.trim()) continue;

    const columns = line.split("\t");

    if (columns.length < 8) continue;

    const variant = {
      chromosome: columns[0],
      position: columns[1],
      rsid: columns[2],
      ref: columns[3],
      alt: columns[4],
      info: columns[7],
    };

    variants.push(variant);
  }

  return variants;
}

module.exports = { parseVCF };
