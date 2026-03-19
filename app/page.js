"use client";
import { useState, useEffect, useCallback, useRef } from "react";

import SplashScreen from "@/components/SplashScreen";
import HomeScreen from "@/components/HomeScreen";
import SendStep1 from "@/components/SendStep1";
import SendStep2 from "@/components/SendStep2";
import PinScreen from "@/components/PinScreen";
import ProcessingScreen from "@/components/ProcessingScreen";
import ConfirmationScreen from "@/components/ConfirmationScreen";
import HistoryScreen from "@/components/HistoryScreen";
import Toast from "@/components/Toast";

import { STARTING_BALANCE } from "@/lib/constants";
import { genTxId, formatTime } from "@/lib/formatting";

async function fetchSharedState() {
  const res = await fetch("/api/transactions");
  return res.json();
}

async function postTransaction(tx) {
  const res = await fetch("/api/transactions", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(tx),
  });
  return res.json();
}

export default function Page() {
  const [screen, setScreen] = useState("splash");
  const [balance, setBalance] = useState(STARTING_BALANCE);
  const [transactions, setTransactions] = useState([]);
  const [toast, setToast] = useState("");
  const [sendData, setSendData] = useState({});
  const [lastTx, setLastTx] = useState(null);
  const pollRef = useRef(null);

  // Load shared state on mount + poll for updates
  const refreshState = useCallback(async () => {
    try {
      const data = await fetchSharedState();
      setBalance(data.balance);
      setTransactions(data.transactions);
    } catch {}
  }, []);

  useEffect(() => {
    refreshState();
    const timer = setTimeout(() => setScreen("home"), 800);
    // Poll every 5s so everyone sees updates
    pollRef.current = setInterval(refreshState, 5000);
    return () => {
      clearTimeout(timer);
      clearInterval(pollRef.current);
    };
  }, [refreshState]);

  const showToast = useCallback((msg) => {
    setToast("");
    setTimeout(() => setToast(msg), 10);
  }, []);

  const handleSendStep1 = (info) => {
    setSendData(info);
    setScreen("sendStep2");
  };

  const handleSendStep2 = ({ amount, reference }) => {
    setSendData((prev) => ({ ...prev, amount, reference }));
    setScreen("pin");
  };

  const handlePinComplete = useCallback(() => {
    setScreen("processing");
  }, []);

  const handleProcessingDone = useCallback(async () => {
    const now = new Date();
    const tx = {
      id: genTxId(),
      name: sendData.name,
      rel: sendData.relationship,
      phone: sendData.phone,
      amount: sendData.amount,
      reference: sendData.reference || "",
      time: formatTime(now),
      timestamp: now.toISOString(),
    };

    try {
      const data = await postTransaction(tx);
      setBalance(data.balance);
      setTransactions(data.transactions);
    } catch {
      // Fallback: update locally
      setBalance((prev) => prev - tx.amount);
      setTransactions((prev) => [tx, ...prev]);
    }

    setLastTx(tx);
    setScreen("confirmation");
  }, [sendData]);

  const goHome = () => {
    setSendData({});
    setLastTx(null);
    setScreen("home");
    refreshState();
  };

  return (
    <div
      style={{
        maxWidth: 430,
        margin: "0 auto",
        minHeight: "100vh",
        background: "#F5F5F5",
        position: "relative",
        boxShadow: "0 0 40px rgba(0,0,0,0.08)",
        overflow: "hidden",
      }}
    >
      {screen === "splash" && <SplashScreen />}
      {screen === "home" && (
        <HomeScreen
          balance={balance}
          transactions={transactions}
          onNavigate={(s) => setScreen(s)}
          showToast={showToast}
        />
      )}
      {screen === "sendStep1" && (
        <SendStep1 onNext={handleSendStep1} onBack={goHome} />
      )}
      {screen === "sendStep2" && (
        <SendStep2
          recipientInfo={sendData}
          balance={balance}
          onNext={handleSendStep2}
          onBack={() => setScreen("sendStep1")}
        />
      )}
      {screen === "pin" && (
        <PinScreen onComplete={handlePinComplete} onBack={() => setScreen("sendStep2")} />
      )}
      {screen === "processing" && <ProcessingScreen onDone={handleProcessingDone} />}
      {screen === "confirmation" && lastTx && (
        <ConfirmationScreen transaction={lastTx} onGoHome={goHome} />
      )}
      {screen === "history" && (
        <HistoryScreen transactions={transactions} onBack={goHome} />
      )}

      {toast && <Toast message={toast} onClose={() => setToast("")} />}
    </div>
  );
}
