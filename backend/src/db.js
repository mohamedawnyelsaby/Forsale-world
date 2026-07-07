// backend/src/db.js
// -----------------------------------------------------------------------------
// Prisma Client singleton.
//
// On Vercel, each serverless function invocation can spin up a fresh module
// context. Without caching the client on `global`, hot invocations would each
// create a new PrismaClient -> new DB connection pool -> connection exhaustion
// on Postgres. This pattern reuses the same client across warm invocations.
// -----------------------------------------------------------------------------
const { PrismaClient } = require('@prisma/client');

const globalForPrisma = global;

const prisma = globalForPrisma.__forsalePrisma || new PrismaClient();

// Cache on the global object so warm serverless invocations (Vercel) and
// dev hot-reloads (nodemon) reuse the same client instead of opening a new
// connection pool every time.
globalForPrisma.__forsalePrisma = prisma;

module.exports = prisma;
