import { NextResponse } from "next/server";
import {
  getSharedTransactions,
  addSharedTransaction,
  removeSharedTransaction,
  getSharedBalance,
  setSharedBalance,
} from "@/lib/store";

const API_SECRET = process.env.API_SECRET || "ekram-salami-2026";

function checkAuth(request) {
  const token = request.headers.get("x-api-key");
  return token === API_SECRET;
}

export async function GET(request) {
  if (!checkAuth(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const [balance, transactions] = await Promise.all([
    getSharedBalance(),
    getSharedTransactions(),
  ]);
  return NextResponse.json({ balance, transactions });
}

export async function POST(request) {
  if (!checkAuth(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const tx = await request.json();
  const currentBalance = await getSharedBalance();

  if (tx.amount > currentBalance) {
    return NextResponse.json({ error: "Insufficient balance" }, { status: 400 });
  }

  const newBalance = currentBalance - tx.amount;
  await setSharedBalance(newBalance);
  const transactions = await addSharedTransaction(tx);

  return NextResponse.json({ balance: newBalance, transactions });
}

export async function DELETE(request) {
  if (!checkAuth(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { txId } = await request.json();
  const transactions = await removeSharedTransaction(txId);
  const balance = await getSharedBalance();
  return NextResponse.json({ balance, transactions });
}
