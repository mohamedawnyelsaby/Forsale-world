// backend/api/index.js
// Vercel serverless entry point. Vercel's Node.js runtime treats a module
// that exports a (req, res) handler as the function — an Express app IS
// that shape, so we just re-export it directly, no app.listen() needed here.
const app = require('../src/app');

module.exports = app;
