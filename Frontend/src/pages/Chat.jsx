import { useState } from "react";
import { useLocation } from "react-router-dom";
import { chatWithAI } from "../services/api";

const cleanText = (text) => {
  return text
    .replace(/\n{2,}/g, "\n")   // extra line breaks remove
    .replace(/\*\*/g, "")       // markdown bold remove
    .trim();
};

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const reportId = location.state?.reportId;

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { type: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
      
  setInput("");
  setLoading(true); 
    try {
      const res = await chatWithAI({
        message: userMessage.text,
        reportId: reportId,
      });

      const botMessage = {
        type: "bot",
        text: cleanText(res.reply),
      };

      setMessages((prev) => [...prev, botMessage]);
      setInput("");

    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  return (
    
  <div style={{ padding: "20px" }}>
    <h2>AI Assistant 🤖</h2>

    <div style={{ minHeight: "300px", marginBottom: "20px" }}>
      {messages.map((msg, i) => (
        <div key={i} style={{ margin: "10px 0" }}>
          <strong>{msg.type === "user" ? "You" : "AI"}:</strong> {msg.text}
        </div>
      ))}

      {/* Typing */}
      {loading && (
        <div style={{ margin: "10px 0", color: "gray" }}>
          🤖 AI is typing...
        </div>
      )}
    </div>

    {/* ✅ THIS LINE IS NOW SAFE */}
    {reportId && (
      <p style={{ marginBottom: "10px" }}>
        💊 Chatting about selected report
      </p>
    )}

    <input
      value={input}
      onChange={(e) => setInput(e.target.value)}
      placeholder="Ask about your report..."
    />

    <button onClick={handleSend} disabled={loading}>
      {loading ? "Thinking..." : "Send"}
    </button>
  </div>
);
};

export default Chat;