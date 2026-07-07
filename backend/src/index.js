// backend/src/index.js
// Forsale Core Server Engine
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
require('dotenv').config();
const { PrismaClient } = require('@prisma/client');
const { interpret } = require('./agent');

const app = express();
const prisma = new PrismaClient();

// Middleware for Security and Parsing
app.use(helmet());
app.use(cors());
app.use(express.json());

// 1. Basic Route for Health Check
app.get('/', (req, res) => {
  res.json({ message: "Forsale Backend API is Running Successfully!" });
});

// 2. Order Logic - Calculate Commissions (The Hungerstation Way)
app.post('/api/orders/create', async (req, res) => {
  const { userId, storeId, items, totalAmount } = req.body;

  // Exact Calculation Logic:
  // Let's assume Forsale Commission is 15%
  const platformCommission = totalAmount * 0.15;
  const merchantPayout = totalAmount - platformCommission;

  try {
    // In a real scenario, we save to Database here via Prisma
    console.log(`New Order for Store: ${storeId}`);
    console.log(`Platform Profit: ${platformCommission} SAR`);
    
    res.status(201).json({
      success: true,
      orderId: "FS-" + Math.floor(Math.random() * 1000000),
      breakdown: {
        total: totalAmount,
        commission: platformCommission,
        merchantGets: merchantPayout
      }
    });
  } catch (error) {
    res.status(500).json({ error: "Order Processing Failed" });
  }
});

// 3. AI Agent - Sela - the core brain of the app (routes to every vertical)
app.post('/api/agent/chat', async (req, res) => {
  const { userId, message, conversationId } = req.body;

  if (!userId || !message) {
    return res.status(400).json({ error: "userId and message are required" });
  }

  try {
    // Load or create the conversation thread
    let conversation = conversationId
      ? await prisma.conversation.findUnique({
          where: { id: conversationId },
          include: { messages: { orderBy: { createdAt: 'asc' }, take: 20 } },
        })
      : null;

    if (!conversation) {
      conversation = await prisma.conversation.create({
        data: { userId, messages: { create: [] } },
        include: { messages: true },
      });
    }

    // Persist the user's message first
    await prisma.message.create({
      data: { conversationId: conversation.id, role: 'USER', content: message },
    });

    // Build short rolling history for context (last 20 turns)
    const history = conversation.messages.map((m) => ({
      role: m.role === 'ASSISTANT' ? 'assistant' : 'user',
      content: m.content,
    }));

    const decision = await interpret(message, history);

    // Persist the agent's reply + structured metadata
    await prisma.message.create({
      data: {
        conversationId: conversation.id,
        role: 'ASSISTANT',
        content: decision.reply,
        metadata: decision,
      },
    });

    // Save/update any inferred preferences (best-effort, non-blocking for the reply)
    if (Array.isArray(decision.inferredPreferences)) {
      for (const pref of decision.inferredPreferences) {
        if (pref?.key && pref?.value) {
          await prisma.userPreference.upsert({
            where: { userId_key: { userId, key: pref.key } },
            update: { value: String(pref.value), source: 'inferred' },
            create: { userId, key: pref.key, value: String(pref.value), source: 'inferred' },
          });
        }
      }
    }

    // Keep the user's detected language in sync for future personalization
    if (decision.detectedLanguage) {
      await prisma.user.update({
        where: { id: userId },
        data: { language: decision.detectedLanguage },
      }).catch(() => { /* user might not exist yet in dev/testing - ignore */ });
    }

    res.status(200).json({
      conversationId: conversation.id,
      reply: decision.reply,
      vertical: decision.vertical,
      secondaryVertical: decision.secondaryVertical,
      filters: decision.filters,
    });
  } catch (error) {
    console.error("Agent error:", error.message);
    res.status(500).json({ error: "Agent failed to respond", details: error.message });
  }
});

// 4. Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Forsale Server started on port ${PORT}`);
});
