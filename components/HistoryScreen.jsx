"use client";
import SubHeader from "./SubHeader";
import { formatTaka, maskNumber, formatDateBengali } from "@/lib/formatting";

export default function HistoryScreen({ transactions, onBack }) {
  const total = transactions.reduce((sum, tx) => sum + tx.amount, 0);

  return (
    <div style={{ background: "#F5F5F5", minHeight: "100vh", animation: "slideIn 0.35s ease-out" }}>
      <SubHeader title="লেনদেন হিস্ট্রি" onBack={onBack} />

      <div style={{ padding: "16px 16px 30px" }}>
        {transactions.length === 0 ? (
          <div style={{ textAlign: "center", padding: "60px 20px", color: "#999", fontFamily: "'Noto Sans Bengali', sans-serif" }}>
            <div style={{ fontSize: 48, marginBottom: 12 }}>🦗</div>
            <div style={{ fontSize: 15 }}>এখনো কেউ সালামি নেয়নি!</div>
          </div>
        ) : (
          <>
            <div style={{ fontSize: 13, color: "#666", fontFamily: "'Noto Sans Bengali', sans-serif", marginBottom: 12 }}>
              আজকের লেনদেন — {formatDateBengali(new Date())}
            </div>

            {transactions.map((tx, i) => (
              <div
                key={tx.id}
                style={{
                  background: "#fff",
                  borderRadius: 14,
                  padding: "14px 16px",
                  marginBottom: 10,
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
                  animation: `fadeSlideUp 0.4s ease-out ${i * 0.06}s both`,
                }}
              >
                <div
                  style={{
                    width: 42,
                    height: 42,
                    borderRadius: "50%",
                    background: "#FFF0F5",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 20,
                    flexShrink: 0,
                  }}
                >
                  💸
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: "flex", alignItems: "baseline", gap: 6 }}>
                    <span style={{ fontWeight: 700, fontSize: 14, color: "#333", fontFamily: "'Noto Sans Bengali', sans-serif" }}>
                      {tx.name}
                    </span>
                    <span style={{ fontSize: 12, color: "#999", fontFamily: "'Noto Sans Bengali', sans-serif" }}>
                      ({tx.rel})
                    </span>
                  </div>
                  <div style={{ fontSize: 12, color: "#aaa", fontFamily: "'Poppins', sans-serif", marginTop: 2 }}>
                    {maskNumber(tx.phone)}
                  </div>
                  <div style={{ fontSize: 11, color: "#bbb", fontFamily: "'Poppins', sans-serif", marginTop: 1 }}>
                    {tx.time}
                  </div>
                </div>
                <div style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: 15, color: "#E2136E", whiteSpace: "nowrap" }}>
                  -৳{formatTaka(tx.amount)}
                </div>
              </div>
            ))}

            <div
              style={{
                marginTop: 16,
                padding: "12px 0",
                borderTop: "2px dashed #E2136E",
                textAlign: "center",
                fontSize: 14,
                fontWeight: 600,
                color: "#666",
                fontFamily: "'Noto Sans Bengali', sans-serif",
              }}
            >
              মোট সালামি দেওয়া: <span style={{ color: "#E2136E", fontFamily: "'Poppins', sans-serif", fontWeight: 700 }}>৳{formatTaka(total)}</span>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
