import { NextResponse } from "next/server";
import {
  getSharedTransactions,
  addSharedTransaction,
  getSharedBalance,
  setSharedBalance,
} from "@/lib/store";

export async function GET() {
  const [balance, transactions] = await Promise.all([
    getSharedBalance(),
    getSharedTransactions(),
  ]);
  return NextResponse.json({ balance, transactions });
}

export async function POST(request) {
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
