const Analysis = require("../models/Analysis");
const generateExplanation = require("../services/geminiService");

exports.chatWithAI = async (req, res) => {
  try {
    const { message, reportId } = req.body;

    if (!message) {
      return res.status(400).json({ message: "Message is required" });
    }

    let contextData = "";

    // if reportId provided → use context 
    if (reportId) {
      const report = await Analysis.findOne({
        _id: reportId,
        userId: req.user.id,
      });

      if (!report) {
        return res.status(404).json({ message: "Report not found" });
      }

      contextData = JSON.stringify(report.full_json);
    }

    //  Prompt Engineering 
    const prompt = `
You are an expert pharmacogenomics AI assistant.

Here is a patient's clinical pharmacogenomic report:
${contextData}

User question:
${message}

Instructions:
- Always answer based on the report data if available.
- If the user asks general questions (like side effects), answer normally.
- If risk is HIGH, clearly explain why in simple terms.
- Avoid saying "data is undefined".
- Keep answers short, clear, and helpful.

Answer:
`;

    const aiResponse = await generateExplanation({ prompt });

    res.status(200).json({
      reply: aiResponse.summary || aiResponse,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Chat failed" });
  }
};