const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function generateExplanation({
  drug,
  gene,
  phenotype,
  riskLabel,
  detectedVariants
}) {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const prompt = `
You are a clinical pharmacogenomics expert.

Patient pharmacogenomic profile:
Drug: ${drug}
Primary Gene: ${gene}
Phenotype: ${phenotype}
Risk Assessment: ${riskLabel}
Detected Variants: ${JSON.stringify(detectedVariants)}

Generate:
1. A short clinical summary (2-3 sentences)
2. Biological mechanism explanation
3. List of cited variants (rsIDs only)

Respond in JSON format:
{
  "summary": "...",
  "mechanism": "...",
  "citations": ["rsXXXX"]
}
`;

    const result = await model.generateContent(prompt);
    const response = result.response.text();

    return JSON.parse(response);

  } catch (error) {
    console.error("Gemini error:", error);

    return {
      summary: "AI explanation could not be generated.",
      mechanism: "Model generation failed.",
      citations: []
    };
  }
}

module.exports = generateExplanation;
