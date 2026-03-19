"use client";
import { useEffect } from "react";

export default function Toast({ message, onClose }) {
  useEffect(() => {
    const timer = setTimeout(onClose, 2800);
    return () => clearTimeout(timer);
  }, [onClose]);

  if (!message) return null;

  return (
    <div
      style={{
        position: "fixed",
        bottom: 80,
        left: "50%",
        transform: "translateX(-50%)",
        background: "#fff",
        borderRadius: 12,
        padding: "14px 20px",
        boxShadow: "0 4px 20px rgba(0,0,0,0.12)",
        borderLeft: "4px solid #E2136E",
        zIndex: 1000,
        maxWidth: 380,
        width: "90%",
        animation: "toastSlideUp 0.3s ease-out",
        fontFamily: "'Noto Sans Bengali', sans-serif",
        fontSize: 14,
        color: "#333",
      }}
    >
      {message}
    </div>
  );
}
