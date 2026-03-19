"use client";
import { useEffect } from "react";

export default function ProcessingScreen({ onDone }) {
  useEffect(() => {
    const timer = setTimeout(onDone, 2500);
    return () => clearTimeout(timer);
  }, [onDone]);

  return (
    <div
      style={{
        background: "#fff",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 20,
      }}
    >
      <div
        style={{
          width: 60,
          height: 60,
          borderRadius: "50%",
          background: "#FFF0F5",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 28,
        }}
      >
        💸
      </div>

      <div style={{ display: "flex", gap: 8 }}>
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            style={{
              width: 10,
              height: 10,
              borderRadius: "50%",
              background: "#E2136E",
              animation: `dotBounce 0.6s ease-in-out ${i * 0.15}s infinite`,
            }}
          />
        ))}
      </div>

      <div style={{ textAlign: "center" }}>
        <div style={{ fontSize: 15, fontWeight: 600, color: "#333", fontFamily: "'Noto Sans Bengali', sans-serif" }}>
          সালামি পাঠানো হচ্ছে...
        </div>
        <div style={{ fontSize: 13, color: "#999", fontFamily: "'Noto Sans Bengali', sans-serif", marginTop: 4 }}>
          অনুগ্রহ করে অপেক্ষা করুন
        </div>
      </div>
    </div>
  );
}
