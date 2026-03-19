"use client";

const tabs = [
  { emoji: "🏠", label: "হোম", action: "home" },
  { emoji: "📷", label: "স্ক্যান\nQR", action: "scanQR" },
  { emoji: "🎁", label: "অফার", action: "eidOffer" },
  { emoji: "📬", label: "ইনবক্স", action: "inbox" },
];

export default function BottomNav({ onTap }) {
  return (
    <div
      style={{
        position: "fixed",
        bottom: 0,
        left: "50%",
        transform: "translateX(-50%)",
        width: "100%",
        maxWidth: 430,
        background: "#fff",
        borderTop: "1px solid #eee",
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        height: 60,
        zIndex: 100,
      }}
    >
      {tabs.map((tab) => (
        <button
          key={tab.action}
          onClick={() => onTap(tab.action)}
          style={{
            background: "none",
            border: "none",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 2,
            cursor: "pointer",
            padding: "4px 0",
            color: tab.action === "home" ? "#E2136E" : "#999",
            opacity: tab.action === "home" ? 1 : 0.7,
            fontSize: 18,
            minWidth: 48,
          }}
        >
          <span>{tab.emoji}</span>
          <span
            style={{
              fontSize: 9,
              fontFamily: "'Noto Sans Bengali', sans-serif",
              fontWeight: tab.action === "home" ? 600 : 400,
              whiteSpace: "pre-line",
              textAlign: "center",
              lineHeight: 1.2,
            }}
          >
            {tab.label}
          </span>
        </button>
      ))}
    </div>
  );
}
