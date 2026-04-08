// Forsale Core Server Engine
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
require('dotenv').config();

const app = express();

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

// 3. Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Forsale Server started on port ${PORT}`);
});
