const axios = require("axios");

async function generateExplanation({
  drug,
  gene,
  phenotype,
  riskLabel,
  detectedVariants
}) {
  try {
    const prompt = `
You are a clinical pharmacogenomics expert.

Patient pharmacogenomic profile:
Drug: ${drug}
Primary Gene: ${gene}
Phenotype: ${phenotype}
Risk Assessment: ${riskLabel}
Detected Variants: ${JSON.stringify(detectedVariants)}

Generate response strictly in JSON format:

{
  "summary": "2-3 sentence clinical explanation",
  "mechanism": "Biological mechanism explanation",
  "citations": ["rsXXXX"]
}
`;

    const response = await axios.post(
      "https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent",
      {
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: { temperature: 0.4 }
      },
      {
        params: { key: process.env.GEMINI_API_KEY },
        headers: { "Content-Type": "application/json" }
      }
    );

    const text =
      response.data.candidates?.[0]?.content?.parts?.[0]?.text || "";

    const cleaned = text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    try {
      return JSON.parse(cleaned);
    } catch {
      return {
        summary: cleaned,
        mechanism: "AI response not in strict JSON format.",
        citations: []
      };
    }

  } catch (error) {
    console.error("Gemini REST error:", error.response?.data || error.message);

    return {
      summary: "AI explanation could not be generated.",
      mechanism: "Model generation failed.",
      citations: []
    };
  }
}

module.exports = generateExplanation;
