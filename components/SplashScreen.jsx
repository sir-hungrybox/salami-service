"use client";

export default function SplashScreen() {
  return (
    <div
      style={{
        background: "#fff",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 16,
      }}
    >
      <img
        src="/bkash-icon.png"
        alt="bKash"
        style={{
          width: 80,
          height: 80,
          borderRadius: 18,
          animation: "pulse 1.2s ease-in-out infinite",
          boxShadow: "0 4px 20px rgba(226,19,110,0.3)",
        }}
      />
      <div
        style={{
          fontFamily: "'Noto Sans Bengali', sans-serif",
          fontSize: 13,
          color: "#999",
        }}
      >
        লোড হচ্ছে...
      </div>
    </div>
  );
}
