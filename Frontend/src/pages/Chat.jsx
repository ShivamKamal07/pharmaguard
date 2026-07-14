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

    <div className="pg-page">
      <div className="pg-page-header">
        <div>
          <span className="pg-eyebrow">Assistant</span>
          <h2>AI Assistant</h2>
          {reportId && (
            <p className="pg-subtitle">Chatting about selected report</p>
          )}
        </div>
      </div>

      <div className="pg-card pg-card-pad">
        <div className="pg-chat-shell">
          <div className="pg-chat-messages">
            {messages.length === 0 && !loading && (
              <div className="pg-empty">
                <div className="pg-empty-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M21 11.5a8.5 8.5 0 0 1-8.5 8.5H4l1.6-4.1A8.4 8.4 0 0 1 4 11.5 8.5 8.5 0 0 1 12.5 3 8.5 8.5 0 0 1 21 11.5Z" /></svg>
                </div>
                Ask a question to get started
              </div>
            )}

            {messages.map((msg, i) => (
              <div
                key={i}
                className={`pg-chat-bubble-row ${msg.type === "user" ? "is-user" : "is-bot"}`}
              >
                <div className={`pg-chat-bubble ${msg.type === "user" ? "is-user" : "is-bot"}`}>
                  <span className="pg-chat-bubble-label">
                    {msg.type === "user" ? "You" : "AI"}
                  </span>
                  {msg.text}
                </div>
              </div>
            ))}

            {/* Typing */}
            {loading && (
              <div className="pg-chat-typing">
                <span className="pg-spinner" style={{ width: 14, height: 14, borderWidth: 2 }} />
                AI is typing...
              </div>
            )}
          </div>

          <div className="pg-chat-input-row">
            <input
              className="pg-input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about your report..."
            />

            <button className="pg-btn pg-btn-primary" onClick={handleSend} disabled={loading}>
              {loading ? "Thinking..." : "Send"}
            </button>
          </div>
        </div>
      </div>
    </div>
);
};

export default Chat;
