"use client";
import { formatTaka, formatTime, formatDateBengali } from "@/lib/formatting";

export default function ConfirmationScreen({ transaction, onGoHome }) {
  return (
    <div
      style={{
        background: "#fff",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "40px 16px 30px",
        animation: "fadeSlideUp 0.4s ease-out",
      }}
    >
      <div
        style={{
          width: 70,
          height: 70,
          borderRadius: "50%",
          background: "linear-gradient(135deg, #4CAF50, #2E7D32)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 34,
          color: "#fff",
          animation: "bounceIn 0.5s ease-out 0.4s both",
          marginBottom: 16,
        }}
      >
        ✓
      </div>

      <div style={{ fontSize: 16, fontWeight: 700, color: "#333", fontFamily: "'Noto Sans Bengali', sans-serif", marginBottom: 4 }}>
        সালামি সফলভাবে পাঠানো হয়েছে!
      </div>
      <div style={{ fontSize: 18, marginBottom: 24 }}>🎉 ঈদ মোবারক!</div>

      <div
        style={{
          width: "100%",
          maxWidth: 380,
          background: "#f9f9f9",
          borderRadius: 14,
          padding: "16px 18px",
          marginBottom: 16,
        }}
      >
        {[
          { label: "প্রাপক", value: transaction.name },
          { label: "নম্বর", value: transaction.phone },
          { label: "সম্পর্ক", value: transaction.rel },
          { label: "পরিমাণ", value: `৳${formatTaka(transaction.amount)}`, highlight: true },
          { label: "রেফারেন্স", value: transaction.reference || "—" },
          { label: "Transaction ID", value: transaction.id },
          { label: "তারিখ ও সময়", value: `${formatDateBengali(transaction.timestamp)}, ${formatTime(transaction.timestamp)}` },
        ].map((row, i, arr) => (
          <div
            key={i}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "10px 0",
              borderBottom: i < arr.length - 1 ? "1px solid #eee" : "none",
            }}
          >
            <span style={{ fontSize: 13, color: "#666", fontFamily: "'Noto Sans Bengali', sans-serif" }}>{row.label}</span>
            <span
              style={{
                fontSize: row.highlight ? 16 : 13,
                fontWeight: row.highlight ? 700 : 500,
                color: row.highlight ? "#E2136E" : "#333",
                fontFamily: "'Poppins', sans-serif",
                textAlign: "right",
                maxWidth: "60%",
                wordBreak: "break-word",
              }}
            >
              {row.value}
            </span>
          </div>
        ))}
      </div>

      <div
        style={{
          width: "100%",
          maxWidth: 380,
          background: "linear-gradient(135deg, #FFF0F5, #ffe0ec)",
          border: "1px solid #f5c6d8",
          borderRadius: 14,
          padding: "14px 16px",
          textAlign: "center",
          marginBottom: 24,
          fontSize: 13,
          fontFamily: "'Noto Sans Bengali', sans-serif",
          color: "#333",
          lineHeight: 1.6,
        }}
      >
        আপনার সালামি আপনার বিকাশ একাউন্টে পাঠানো হয়েছে! ☪️🎉
      </div>

      <button
        onClick={onGoHome}
        style={{
          width: "100%",
          maxWidth: 380,
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
        🏠 হোমে ফিরে যান
      </button>
    </div>
  );
}
