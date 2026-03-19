"use client";

export default function SubHeader({ title, onBack }) {
  return (
    <div
      style={{
        background: "linear-gradient(135deg, #E2136E, #C4105C)",
        color: "#fff",
        padding: "16px 20px",
        display: "flex",
        alignItems: "center",
        gap: 12,
        fontFamily: "'Noto Sans Bengali', sans-serif",
        fontSize: 17,
        fontWeight: 600,
      }}
    >
      <button
        onClick={onBack}
        style={{
          background: "none",
          border: "none",
          color: "#fff",
          fontSize: 22,
          cursor: "pointer",
          padding: "4px 8px",
          lineHeight: 1,
        }}
      >
        ←
      </button>
      {title}
    </div>
  );
}
