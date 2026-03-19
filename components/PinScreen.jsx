"use client";
import { useState, useEffect, useCallback } from "react";
import SubHeader from "./SubHeader";

export default function PinScreen({ onComplete, onBack }) {
  const [pin, setPin] = useState([]);

  const handleKey = useCallback(
    (digit) => {
      if (pin.length >= 5) return;
      setPin((prev) => [...prev, digit]);
    },
    [pin.length]
  );

  const handleDelete = () => {
    setPin((prev) => prev.slice(0, -1));
  };

  useEffect(() => {
    if (pin.length === 5) {
      const timer = setTimeout(onComplete, 600);
      return () => clearTimeout(timer);
    }
  }, [pin.length, onComplete]);

  const keys = [1, 2, 3, 4, 5, 6, 7, 8, 9, null, 0, "del"];

  return (
    <div style={{ background: "#fff", minHeight: "100vh", animation: "slideIn 0.35s ease-out" }}>
      <SubHeader title="সালামি PIN" onBack={onBack} />

      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", paddingTop: 40 }}>
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
            marginBottom: 20,
          }}
        >
          🔒
        </div>

        <div style={{ fontSize: 16, fontWeight: 600, color: "#333", fontFamily: "'Noto Sans Bengali', sans-serif", marginBottom: 4 }}>
          আপনার সালামি PIN দিন
        </div>
        <div style={{ fontSize: 13, color: "#999", fontFamily: "'Noto Sans Bengali', sans-serif", marginBottom: 28 }}>
          যেকোনো ৫ সংখ্যা দিন 😉
        </div>

        {/* PIN dots */}
        <div style={{ display: "flex", gap: 16, marginBottom: 40 }}>
          {[0, 1, 2, 3, 4].map((i) => (
            <div
              key={i}
              style={{
                width: 16,
                height: 16,
                borderRadius: "50%",
                background: i < pin.length ? "#E2136E" : "transparent",
                border: i < pin.length ? "none" : "2px solid #ddd",
                transition: "all 0.15s ease",
                transform: i === pin.length - 1 && pin.length > 0 ? "scale(1.4)" : "scale(1)",
                boxShadow: i === pin.length - 1 && pin.length > 0 ? "0 0 12px rgba(226,19,110,0.4)" : "none",
              }}
            />
          ))}
        </div>

        {/* Keypad */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 82px)",
            gap: 10,
            justifyContent: "center",
          }}
        >
          {keys.map((key, i) => {
            if (key === null) return <div key={i} />;
            return (
              <button
                key={i}
                onClick={() => (key === "del" ? handleDelete() : handleKey(key))}
                style={{
                  width: 82,
                  height: 58,
                  borderRadius: 14,
                  border: "none",
                  background: key === "del" ? "transparent" : "#F5F5F5",
                  fontSize: 22,
                  fontWeight: 600,
                  fontFamily: "'Poppins', sans-serif",
                  color: "#333",
                  cursor: "pointer",
                  transition: "all 0.1s",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                onMouseDown={(e) => { if (key !== "del") e.currentTarget.style.background = "#e8e8e8"; }}
                onMouseUp={(e) => { if (key !== "del") e.currentTarget.style.background = "#F5F5F5"; }}
                onTouchStart={(e) => { if (key !== "del") e.currentTarget.style.background = "#e8e8e8"; }}
                onTouchEnd={(e) => { if (key !== "del") e.currentTarget.style.background = "#F5F5F5"; }}
              >
                {key === "del" ? "⌫" : key}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
