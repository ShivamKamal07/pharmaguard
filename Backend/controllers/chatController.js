const Analysis = require("../models/Analysis");
const generateExplanation = require("../services/geminiService");

exports.chatWithAI = async (req, res) => {
  try {
    const { message, reportId } = req.body;

    if (!message) {
      return res.status(400).json({ message: "Message is required" });
    }

    let contextData = "";

    // Get report context
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

    // MASTER PROMPT
    const masterPrompt = `
You are an advanced pharmacogenomics AI assistant helping clinicians and patients understand drug risks.

---------------------
PATIENT REPORT DATA:
${contextData || "No report provided"}
---------------------

USER QUESTION:
${message}

---------------------
INSTRUCTIONS:

1. If report data is available:
   - Use it to give a personalized answer
   - Explain WHY risk is high/low/moderate
   - Mention gene-drug interaction if possible

2. If question is general (not report-specific):
   - Answer like a medical assistant
   - Give general safe medical info

3. Always:
   - Use simple, human-friendly language
   - Avoid technical jargon unless necessary
   - NEVER say "data is missing" or "undefined"
   - If unsure, give best possible general guidance

4. Output format:
   - Start with a clear answer
   - Then short explanation
   - Optional: precautions or suggestions

---------------------

ANSWER:
`;

    //Intent Detection
    const isGeneralQuestion = !contextData;

    let finalPrompt = "";

    if (isGeneralQuestion) {
      finalPrompt = `
You are a medical assistant.

User Question:
${message}

Give a clear, helpful, and medically safe answer in simple language.
`;
    } else {
      finalPrompt = masterPrompt;
    }

    // Simple Mode
    const isSimple = message.toLowerCase().includes("simple");

    if (isSimple) {
      finalPrompt += `
Explain the answer in very simple terms, like explaining to a beginner.
`;
    }

    // Risk Highlighting
    finalPrompt += `
If risk level is HIGH:
- Clearly warn the user
- Suggest caution or doctor consultation

If LOW:
- Reassure the user

If MODERATE:
- Explain balanced risk
`;

    // Call Gemini
    const aiResponse = await generateExplanation({
      prompt: finalPrompt,
    });

    res.status(200).json({
      reply: aiResponse.summary || aiResponse,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Chat failed" });
  }
};