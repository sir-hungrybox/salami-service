"use client";
import { useState, useRef } from "react";
import SubHeader from "./SubHeader";
import { formatTaka, maskNumber, maskName, formatDateBengali } from "@/lib/formatting";

function SwipeableCard({ children, onDelete }) {
  const startX = useRef(0);
  const currentX = useRef(0);
  const [offset, setOffset] = useState(0);
  const [swiping, setSwiping] = useState(false);
  const [showDelete, setShowDelete] = useState(false);

  const handleStart = (x) => {
    startX.current = x;
    currentX.current = x;
    setSwiping(true);
  };

  const handleMove = (x) => {
    if (!swiping) return;
    currentX.current = x;
    const diff = startX.current - x;
    if (diff > 0) {
      setOffset(Math.min(diff, 90));
    } else {
      setOffset(0);
    }
  };

  const handleEnd = () => {
    setSwiping(false);
    if (offset > 50) {
      setOffset(80);
      setShowDelete(true);
    } else {
      setOffset(0);
      setShowDelete(false);
    }
  };

  const handleDelete = () => {
    setOffset(400);
    setTimeout(onDelete, 250);
  };

  const handleTapBack = () => {
    if (showDelete) {
      setOffset(0);
      setShowDelete(false);
    }
  };

  return (
    <div
      style={{
        position: "relative",
        overflow: "hidden",
        borderRadius: 14,
        marginBottom: 10,
      }}
    >
      {/* Delete button behind */}
      <div
        style={{
          position: "absolute",
          right: 0,
          top: 0,
          bottom: 0,
          width: 80,
          background: "#E2136E",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "0 14px 14px 0",
          cursor: "pointer",
          opacity: offset > 10 ? 1 : 0,
          transition: swiping ? "none" : "opacity 0.2s",
        }}
        onClick={handleDelete}
      >
        <span style={{ color: "#fff", fontSize: 13, fontWeight: 600, fontFamily: "'Noto Sans Bengali', sans-serif" }}>
          🗑️ মুছুন
        </span>
      </div>

      {/* Card content */}
      <div
        onClick={handleTapBack}
        onTouchStart={(e) => handleStart(e.touches[0].clientX)}
        onTouchMove={(e) => handleMove(e.touches[0].clientX)}
        onTouchEnd={handleEnd}
        onMouseDown={(e) => handleStart(e.clientX)}
        onMouseMove={(e) => { if (swiping) handleMove(e.clientX); }}
        onMouseUp={handleEnd}
        onMouseLeave={() => { if (swiping) handleEnd(); }}
        style={{
          transform: `translateX(-${offset}px)`,
          transition: swiping ? "none" : "transform 0.25s ease-out",
          position: "relative",
          zIndex: 1,
        }}
      >
        {children}
      </div>
    </div>
  );
}

export default function HistoryScreen({ transactions, onBack, onDelete }) {
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
            <div style={{ marginBottom: 12 }}>
              <div style={{ fontSize: 13, color: "#666", fontFamily: "'Noto Sans Bengali', sans-serif" }}>
                আজকের লেনদেন — {formatDateBengali(new Date())}
              </div>
            </div>

            {transactions.map((tx, i) => (
              <SwipeableCard key={tx.id} onDelete={() => onDelete(tx.id)}>
                <div
                  style={{
                    background: "#fff",
                    borderRadius: 14,
                    padding: "14px 16px",
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
                        {maskName(tx.name)}
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
              </SwipeableCard>
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
