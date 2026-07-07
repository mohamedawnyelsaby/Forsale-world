// backend/src/agent.js
// -----------------------------------------------------------------------------
// Forsale AI Agent Core
//
// This is the single brain behind the whole app. Every vertical (Food,
// Supermarket, Cars, Electronics, RealEstate) is just a "skill" the agent can
// route into — the agent itself is the primary interface, not a bolt-on
// chatbot. Mirrors the "AI platform, X is just the first vertical" approach
// used in Va Travel (Logy).
//
// Responsibilities:
//   1. Understand what the user wants in ANY language.
//   2. Classify which vertical(s) it belongs to.
//   3. Return a natural reply + structured actions the frontend can execute
//      (navigate to a screen, apply filters, show specific products, etc).
//   4. Persist conversation + inferred preferences via Prisma (wired in index.js).
// -----------------------------------------------------------------------------

const VERTICALS = ["FOOD", "SUPERMARKET", "CARS", "ELECTRONICS", "REAL_ESTATE", "GENERAL"];

const SYSTEM_PROMPT = `You are "Logy", the core AI agent of Forsale — a global multi-vertical
marketplace and delivery platform (food, supermarket, cars, electronics, real estate).

Rules:
- ALWAYS reply in the same language the user is writing in (Arabic, English, or any other language). Detect it yourself, do not ask.
- You are the primary interface of the app, not a support widget. Be decisive: route the user, don't just chat.
- Classify the request into one vertical from this list: ${VERTICALS.join(", ")}.
- Extract useful filters when present (e.g. cuisine, budget, brand, location, bedrooms, fuel type).
- Keep the conversational reply short (1-3 sentences), warm, and natural — never robotic.
- Never invent prices, stock, or availability. Only the frontend's real data layer knows that; you only route and converse.
- If the request spans multiple verticals (e.g. "I'm moving to Riyadh, need an apartment and a car"), set vertical to the primary one and mention the secondary one in "secondaryVertical".

Respond ONLY with a single JSON object, no markdown fences, no preamble, matching exactly this shape:
{
  "reply": "string - short natural reply in the user's language",
  "vertical": "one of ${VERTICALS.join(" | ")}",
  "secondaryVertical": "one of ${VERTICALS.join(" | ")} or null",
  "filters": { "any": "key-value pairs extracted from the request, or {}" },
  "detectedLanguage": "ISO 639-1 code, e.g. ar, en, fr",
  "inferredPreferences": [ { "key": "string", "value": "string" } ]
}`;

/**
 * Calls Claude to interpret a user message in the context of prior turns.
 * @param {string} userMessage - latest message from the user
 * @param {Array<{role: 'user'|'assistant', content: string}>} history - prior turns (optional, capped by caller)
 * @returns {Promise<object>} parsed agent decision (see SYSTEM_PROMPT shape)
 */
async function interpret(userMessage, history = []) {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    throw new Error("ANTHROPIC_API_KEY is not set on the server");
  }

  const messages = [
    ...history.map((m) => ({ role: m.role, content: m.content })),
    { role: "user", content: userMessage },
  ];

  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model: process.env.ANTHROPIC_MODEL || "claude-sonnet-5",
      max_tokens: 500,
      system: SYSTEM_PROMPT,
      messages,
    }),
  });

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`Anthropic API error (${response.status}): ${errText}`);
  }

  const data = await response.json();
  const textBlock = data.content?.find((b) => b.type === "text");
  if (!textBlock) {
    throw new Error("Agent returned no text content");
  }

  const cleaned = textBlock.text.replace(/```json|```/g, "").trim();

  try {
    return JSON.parse(cleaned);
  } catch (err) {
    // Fail safe: never break the chat UI just because the model
    // didn't return perfectly clean JSON.
    return {
      reply: textBlock.text,
      vertical: "GENERAL",
      secondaryVertical: null,
      filters: {},
      detectedLanguage: "ar",
      inferredPreferences: [],
    };
  }
}

module.exports = { interpret, VERTICALS };
