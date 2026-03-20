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
const TXS_LOG_KEY = "ekram-txs-log"; // permanent log, never deleted

// --- In-memory fallback (local dev) ---
if (!global.__salamiStore) {
  global.__salamiStore = {
    balance: STARTING_BALANCE,
    transactions: [],
    log: [],
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

export async function removeSharedTransaction(txId) {
  if (redis) {
    const txs = (await redis.get(TXS_KEY)) || [];
    const filtered = txs.filter((t) => t.id !== txId);
    await redis.set(TXS_KEY, filtered);
    return filtered;
  }
  global.__salamiStore.transactions = global.__salamiStore.transactions.filter(
    (t) => t.id !== txId
  );
  return global.__salamiStore.transactions;
}

export async function addSharedTransaction(tx) {
  if (redis) {
    const [txs, log] = await Promise.all([
      redis.get(TXS_KEY).then((t) => t || []),
      redis.get(TXS_LOG_KEY).then((l) => l || []),
    ]);
    txs.unshift(tx);
    log.unshift(tx);
    await Promise.all([
      redis.set(TXS_KEY, txs),
      redis.set(TXS_LOG_KEY, log),
    ]);
    return txs;
  }
  global.__salamiStore.transactions.unshift(tx);
  global.__salamiStore.log.unshift(tx);
  return global.__salamiStore.transactions;
}
