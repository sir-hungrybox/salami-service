import { Redis } from "@upstash/redis";
import { STARTING_BALANCE } from "./constants";

// --- Redis (production on Vercel) ---
const redis =
  process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN
    ? new Redis({
        url: process.env.KV_REST_API_URL,
        token: process.env.KV_REST_API_TOKEN,
      })
    : null;

const BALANCE_KEY = "ekram-balance";
const TXS_KEY = "ekram-txs";

// --- In-memory fallback (local dev) ---
if (!global.__salamiStore) {
  global.__salamiStore = {
    balance: STARTING_BALANCE,
    transactions: [],
  };
}

// --- Unified API (async) ---

export async function getSharedBalance() {
  if (redis) {
    const bal = await redis.get(BALANCE_KEY);
    return bal !== null && bal !== undefined ? Number(bal) : STARTING_BALANCE;
  }
  return global.__salamiStore.balance;
}

export async function setSharedBalance(amount) {
  if (redis) {
    await redis.set(BALANCE_KEY, amount);
    return;
  }
  global.__salamiStore.balance = amount;
}

export async function getSharedTransactions() {
  if (redis) {
    const txs = await redis.get(TXS_KEY);
    return txs || [];
  }
  return global.__salamiStore.transactions;
}

export async function addSharedTransaction(tx) {
  if (redis) {
    const txs = (await redis.get(TXS_KEY)) || [];
    txs.unshift(tx);
    await redis.set(TXS_KEY, txs);
    return txs;
  }
  global.__salamiStore.transactions.unshift(tx);
  return global.__salamiStore.transactions;
}
