// backend/src/index.js
// Local dev entrypoint only. On Vercel, backend/api/index.js is the entry
// point instead (serverless functions don't call app.listen).
const app = require('./app');

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Forsale Server started on port ${PORT}`);
});
