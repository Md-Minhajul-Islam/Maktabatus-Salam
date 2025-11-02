const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function analyzer(req, res) {
  try {
    const { text } = req.body;

    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash-lite" });

    const result = await model.generateContent(
      `Analyze and explain this text in detail in the language it is written ans it should sounds like human response\n\n${text}`
    );

    res.json({ analysis: result.response.text() });
  } catch (err) {
    next(err);
  }
}

module.exports = analyzer;
