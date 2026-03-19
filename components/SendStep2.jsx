"use client";
import { useState } from "react";
import SubHeader from "./SubHeader";
import { MAX_PER_TX } from "@/lib/constants";
import { formatTaka } from "@/lib/formatting";

const quickAmounts = [100, 500, 1000, 5000];

export default function SendStep2({ recipientInfo, balance, onNext, onBack }) {
  const [amount, setAmount] = useState("");
  const [reference, setReference] = useState("ঈদ মোবারক!");
  const [error, setError] = useState("");

  const handleSubmit = () => {
    const num = Number(amount);
    if (!num || num < 10) {
      setError("এত কম সালামি? লজ্জা হয় না? 😤");
      return;
    }
    if (num > MAX_PER_TX) {
      setError("সর্বোচ্চ ৳10,000 সালামি দেওয়া যাবে!");
      return;
    }
    if (num > balance) {
      setError("পর্যাপ্ত ব্যালেন্স নেই! 😬");
      return;
    }
    setError("");
    onNext({ amount: num, reference });
  };

  return (
    <div style={{ background: "#F5F5F5", minHeight: "100vh", animation: "slideIn 0.35s ease-out" }}>
      <SubHeader title="সালামি পাঠান" onBack={onBack} />

      <div style={{ padding: "20px 16px" }}>
        {/* Recipient Card */}
        <div
          style={{
            background: "#fff",
            borderRadius: 14,
            padding: "16px 18px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
            textAlign: "center",
            marginBottom: 16,
          }}
        >
          <div style={{ fontSize: 12, color: "#999", fontFamily: "'Noto Sans Bengali', sans-serif", marginBottom: 4 }}>প্রাপক</div>
          <div style={{ fontSize: 16, fontWeight: 700, color: "#333", fontFamily: "'Noto Sans Bengali', sans-serif" }}>{recipientInfo.name}</div>
          <div style={{ fontSize: 14, color: "#666", fontFamily: "'Poppins', sans-serif", marginTop: 2 }}>{recipientInfo.phone}</div>
          <div style={{ fontSize: 13, color: "#E2136E", fontFamily: "'Noto Sans Bengali', sans-serif", marginTop: 2 }}>{recipientInfo.relationship}</div>
        </div>

        {/* Amount Card */}
        <div
          style={{
            background: "#fff",
            borderRadius: 14,
            padding: "20px 18px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
            textAlign: "center",
            marginBottom: 16,
          }}
        >
          <div style={{ fontSize: 14, fontWeight: 600, color: "#333", fontFamily: "'Noto Sans Bengali', sans-serif", marginBottom: 16 }}>
            সালামি পরিমাণ
          </div>

          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 4, marginBottom: 8 }}>
            <span style={{ fontFamily: "'Poppins', sans-serif", fontSize: 28, fontWeight: 800, color: "#E2136E" }}>৳</span>
            <input
              type="text"
              inputMode="numeric"
              value={amount}
              onChange={(e) => {
                const val = e.target.value.replace(/\D/g, "");
                setAmount(val);
                setError("");
              }}
              placeholder="0"
              style={{
                border: "none",
                borderBottom: "3px solid #E2136E",
                outline: "none",
                fontSize: 40,
                fontWeight: 800,
                fontFamily: "'Poppins', sans-serif",
                color: "#333",
                textAlign: "center",
                width: 180,
                background: "transparent",
                padding: "4px 0",
              }}
            />
          </div>

          <div style={{ fontSize: 12, color: "#999", fontFamily: "'Noto Sans Bengali', sans-serif", marginBottom: 16 }}>
            সর্বোচ্চ সালামি: ৳{formatTaka(MAX_PER_TX)}
          </div>

          <div style={{ display: "flex", gap: 8, justifyContent: "center", flexWrap: "wrap" }}>
            {quickAmounts.map((qa) => (
              <button
                key={qa}
                onClick={() => { setAmount(String(qa)); setError(""); }}
                style={{
                  padding: "10px 18px",
                  borderRadius: 20,
                  border: `2px solid ${Number(amount) === qa ? "#E2136E" : "#eee"}`,
                  background: Number(amount) === qa ? "#FFF0F5" : "#fff",
                  color: Number(amount) === qa ? "#E2136E" : "#666",
                  fontSize: 14,
                  fontWeight: 600,
                  fontFamily: "'Poppins', sans-serif",
                  cursor: "pointer",
                  transition: "all 0.2s",
                }}
              >
                ৳{formatTaka(qa)}
              </button>
            ))}
          </div>
        </div>

        {/* Reference */}
        <div
          style={{
            background: "#fff",
            borderRadius: 14,
            padding: "14px 18px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
            marginBottom: 16,
          }}
        >
          <input
            type="text"
            value={reference}
            onChange={(e) => setReference(e.target.value)}
            placeholder="রেফারেন্স — ঈদ মোবারক!"
            style={{
              width: "100%",
              border: "none",
              outline: "none",
              fontSize: 14,
              fontFamily: "'Noto Sans Bengali', sans-serif",
              color: "#333",
              background: "transparent",
            }}
          />
        </div>

        {error && (
          <div style={{ marginBottom: 12, color: "#E2136E", fontSize: 13, fontFamily: "'Noto Sans Bengali', sans-serif", textAlign: "center" }}>
            ⚠️ {error}
          </div>
        )}

        <button
          onClick={handleSubmit}
          style={{
            width: "100%",
            padding: "14px",
            background: "linear-gradient(135deg, #E2136E, #C4105C)",
            color: "#fff",
            border: "none",
            borderRadius: 12,
            fontSize: 16,
            fontWeight: 700,
            fontFamily: "'Noto Sans Bengali', sans-serif",
            cursor: "pointer",
          }}
        >
          সালামি পাঠান →
        </button>

        <div style={{ textAlign: "center", marginTop: 14, fontSize: 13, color: "#999", fontFamily: "'Noto Sans Bengali', sans-serif" }}>
          ব্যালেন্স: ৳{formatTaka(balance)}
        </div>
      </div>
    </div>
  );
}
