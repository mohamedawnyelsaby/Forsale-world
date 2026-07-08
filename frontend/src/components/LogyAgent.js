// frontend/src/components/SelaAgent.js
// -----------------------------------------------------------------------------
// Logy — the core AI agent of Forsale.
//
// This is NOT a per-screen support chatbot. It's a floating, always-available
// entry point that understands the user's intent in any language and routes
// them into the right vertical (Food, Supermarket, Cars, Electronics,
// RealEstate) via onNavigate(vertical, filters). The chat IS the primary way
// to use the app; tapping through screens manually is the fallback.
// -----------------------------------------------------------------------------
import { useState, useRef, useEffect } from "react";
import COLORS from "../constants/colors";

const VERTICAL_TO_SECTION = {
  FOOD: "food",
  SUPERMARKET: "supermarket",
  ELECTRONICS: "electronics",
  CARS: "cars",
  REAL_ESTATE: "realestate",
};

// Backend URL - point this at your Express server (or the Cloudflare Worker
// proxy in front of it, if the frontend is deployed as a static/serverless app).
const AGENT_ENDPOINT =
  process.env.REACT_APP_AGENT_URL || "http://localhost:5000/api/agent/chat";

export default function SelaAgent({ userId, dark, onNavigate }) {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: "assistant", content: "أهلاً 👋 أنا Logy، تقدر تقولي عايز إيه وأنا أوصلك للي محتاجه." },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [conversationId, setConversationId] = useState(null);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, open]);

  const send = async () => {
    const text = input.trim();
    if (!text || loading) return;

    setMessages((m) => [...m, { role: "user", content: text }]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch(AGENT_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, message: text, conversationId }),
      });

      if (!res.ok) throw new Error("agent_request_failed");
      const data = await res.json();

      setConversationId(data.conversationId);
      setMessages((m) => [...m, { role: "assistant", content: data.reply }]);

      const section = VERTICAL_TO_SECTION[data.vertical];
      if (section && onNavigate) {
        onNavigate(section, data.filters || {});
      }
    } catch (err) {
      setMessages((m) => [
        ...m,
        { role: "assistant", content: "معلش، حصل خطأ مؤقت. جرب تاني." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const bg = dark ? "#1C1C1C" : "#fff";
  const border = dark ? "rgba(255,255,255,.08)" : "#EBEBEB";
  const textColor = dark ? "#fff" : COLORS.text;

  return (
    <>
      {/* Floating launcher */}
      <button
        onClick={() => setOpen((o) => !o)}
        style={{
          position: "fixed",
          bottom: 84,
          insetInlineEnd: 16,
          width: 56,
          height: 56,
          borderRadius: 28,
          border: "none",
          background: `linear-gradient(135deg, ${COLORS.primary}, ${COLORS.primaryDark})`,
          color: "#fff",
          fontSize: 24,
          boxShadow: "0 6px 18px rgba(255,107,0,.4)",
          cursor: "pointer",
          zIndex: 90,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        aria-label="Logy AI Agent"
      >
        {open ? "✕" : "✨"}
      </button>

      {open && (
        <div
          style={{
            position: "fixed",
            bottom: 148,
            insetInlineEnd: 16,
            width: "min(360px, 90vw)",
            height: "min(480px, 70vh)",
            background: bg,
            border: `1px solid ${border}`,
            borderRadius: 16,
            boxShadow: "0 12px 32px rgba(0,0,0,.25)",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            zIndex: 91,
          }}
        >
          <div
            style={{
              padding: "12px 16px",
              borderBottom: `1px solid ${border}`,
              display: "flex",
              alignItems: "center",
              gap: 8,
              fontWeight: 700,
              color: textColor,
            }}
          >
            <span style={{ fontSize: 18 }}>✨</span> Logy
            <span style={{ fontSize: 11, fontWeight: 400, color: COLORS.textMuted }}>
              مساعدك الذكي — أكل، عربيات، عقارات، وأكتر
            </span>
          </div>

          <div ref={scrollRef} style={{ flex: 1, overflowY: "auto", padding: 12, display: "flex", flexDirection: "column", gap: 8 }}>
            {messages.map((m, i) => (
              <div
                key={i}
                style={{
                  alignSelf: m.role === "user" ? "flex-end" : "flex-start",
                  background: m.role === "user" ? COLORS.primary : (dark ? "#2A2A2A" : COLORS.gray),
                  color: m.role === "user" ? "#fff" : textColor,
                  padding: "8px 12px",
                  borderRadius: 12,
                  maxWidth: "80%",
                  fontSize: 14,
                  lineHeight: 1.5,
                }}
              >
                {m.content}
              </div>
            ))}
            {loading && (
              <div style={{ alignSelf: "flex-start", color: COLORS.textMuted, fontSize: 13 }}>
                Logy بيكتب...
              </div>
            )}
          </div>

          <div style={{ display: "flex", gap: 8, padding: 10, borderTop: `1px solid ${border}` }}>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && send()}
              placeholder="اكتب طلبك بأي لغة..."
              style={{
                flex: 1,
                border: `1px solid ${border}`,
                borderRadius: 10,
                padding: "8px 12px",
                background: dark ? "#111" : "#fff",
                color: textColor,
                fontFamily: "inherit",
                fontSize: 14,
                outline: "none",
              }}
            />
            <button
              onClick={send}
              disabled={loading}
              style={{
                background: COLORS.primary,
                color: "#fff",
                border: "none",
                borderRadius: 10,
                padding: "0 16px",
                cursor: "pointer",
                fontWeight: 700,
              }}
            >
              ➤
            </button>
          </div>
        </div>
      )}
    </>
  );
}
