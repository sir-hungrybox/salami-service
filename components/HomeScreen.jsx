"use client";
import { useState } from "react";
import { HOST_NAME, SERVICE_ITEMS, TOAST_MESSAGES } from "@/lib/constants";
import { formatTaka } from "@/lib/formatting";
import BottomNav from "./BottomNav";

export default function HomeScreen({ balance, transactions, onNavigate, showToast }) {
  const [balanceHidden, setBalanceHidden] = useState(false);

  const handleServiceTap = (action) => {
    if (action === "sendSalami") {
      if (balance <= 0) {
        showToast(TOAST_MESSAGES.noBalance);
      } else {
        onNavigate("sendStep1");
      }
    } else if (action === "history") {
      onNavigate("history");
    } else if (TOAST_MESSAGES[action]) {
      showToast(TOAST_MESSAGES[action]);
    }
  };

  const handleNavTap = (action) => {
    if (action === "home") return;
    if (action === "scanQR") showToast(TOAST_MESSAGES.scanQR);
    else if (action === "inbox") showToast(TOAST_MESSAGES.inbox);
    else if (action === "eidOffer") showToast(TOAST_MESSAGES.eidOffer);
  };

  const recentTxs = transactions.slice(0, 3);

  return (
    <div style={{ background: "#F5F5F5", minHeight: "100vh", paddingBottom: 80 }}>
      {/* Header */}
      <div
        style={{
          background: "linear-gradient(135deg, #E2136E, #a00d4a)",
          borderRadius: "0 0 24px 24px",
          padding: "16px 20px 24px",
          color: "#fff",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Decorative circles */}
        <div style={{ position: "absolute", top: -20, right: -20, width: 100, height: 100, borderRadius: "50%", background: "rgba(255,255,255,0.06)" }} />
        <div style={{ position: "absolute", bottom: -30, left: 40, width: 140, height: 140, borderRadius: "50%", background: "rgba(255,255,255,0.04)" }} />
        <div style={{ position: "absolute", top: 30, right: 80, width: 60, height: 60, borderRadius: "50%", background: "rgba(255,255,255,0.05)" }} />

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", position: "relative", zIndex: 1 }}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <img
              src="/bkash-icon.png"
              alt="bKash"
              style={{ width: 32, height: 32, borderRadius: 7 }}
            />
          </div>
          <div
            style={{
              width: 34,
              height: 34,
              borderRadius: "50%",
              overflow: "hidden",
              border: "2px solid rgba(255,255,255,0.5)",
              flexShrink: 0,
            }}
          >
            <img
              src="/profile.jpg"
              alt="EKRAM"
              style={{
                width: "180%",
                height: "180%",
                objectFit: "cover",
                objectPosition: "52% 5%",
                marginLeft: "-35%",
                marginTop: "-30%",
              }}
            />
          </div>
        </div>

        <div style={{ marginTop: 16, position: "relative", zIndex: 1 }}>
          <div style={{ fontSize: 14, opacity: 0.85, fontFamily: "'Noto Sans Bengali', sans-serif" }}>আসসালামু আলাইকুম!</div>
          <div style={{ fontFamily: "'Poppins', sans-serif", fontSize: 22, fontWeight: 800, marginTop: 2 }}>{HOST_NAME}</div>
        </div>

        <div style={{ marginTop: 14, position: "relative", zIndex: 1 }}>
          <div style={{ fontFamily: "'Poppins', sans-serif", fontSize: 32, fontWeight: 800 }}>
            {balanceHidden ? "৳ *****" : `৳${formatTaka(balance)}`}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 2 }}>
            <span style={{ fontSize: 13, opacity: 0.85, fontFamily: "'Noto Sans Bengali', sans-serif" }}>সালামি ব্যালেন্স</span>
            <button
              onClick={() => setBalanceHidden(!balanceHidden)}
              style={{
                background: "rgba(255,255,255,0.15)",
                border: "none",
                borderRadius: "50%",
                width: 28,
                height: 28,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                fontSize: 14,
              }}
            >
              {balanceHidden ? "🙈" : "👁"}
            </button>
          </div>
        </div>
      </div>

      {/* Service Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "12px 8px",
          padding: "20px 16px 8px",
        }}
      >
        {SERVICE_ITEMS.map((item, i) => (
          <button
            key={i}
            onClick={() => handleServiceTap(item.action)}
            style={{
              background: "none",
              border: "none",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 6,
              cursor: "pointer",
              padding: 4,
              transition: "transform 0.1s",
            }}
            onMouseDown={(e) => (e.currentTarget.style.transform = "scale(0.92)")}
            onMouseUp={(e) => (e.currentTarget.style.transform = "scale(1)")}
            onTouchStart={(e) => (e.currentTarget.style.transform = "scale(0.92)")}
            onTouchEnd={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            <div
              style={{
                width: 52,
                height: 52,
                borderRadius: "50%",
                background: `${item.color}15`,
                border: `2px solid ${item.color}30`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 24,
              }}
            >
              {item.emoji}
            </div>
            <span
              style={{
                fontSize: 11,
                fontWeight: 500,
                color: "#333",
                fontFamily: "'Noto Sans Bengali', sans-serif",
                textAlign: "center",
                whiteSpace: "pre-line",
                lineHeight: 1.3,
              }}
            >
              {item.label}
            </span>
          </button>
        ))}
      </div>

      {/* Eid Banner */}
      <div style={{ padding: "8px 16px 0" }}>
        <div
          style={{
            background: "linear-gradient(135deg, #FFF0F5, #ffe0ec)",
            border: "1px solid #f5c6d8",
            borderRadius: 14,
            padding: "14px 16px",
            animation: "fadeSlideUp 0.5s ease-out",
          }}
        >
          <div style={{ fontSize: 16, fontWeight: 600, fontFamily: "'Noto Sans Bengali', sans-serif", color: "#333" }}>
            🌙 ঈদ মোবারক!
          </div>
          <div style={{ fontSize: 13, color: "#666", marginTop: 4, fontFamily: "'Noto Sans Bengali', sans-serif", lineHeight: 1.5 }}>
            &ldquo;সালামি পাঠান&rdquo; চাপুন এবং {HOST_NAME} ভাই থেকে সালামি নিন →
          </div>
        </div>
      </div>

      {/* Spotify Premium Banner — bKash ad style */}
      <div style={{ padding: "10px 16px 0" }}>
        <a
          href="https://www.spotify.com/bd-en/premium/"
          target="_blank"
          rel="noopener noreferrer"
          style={{ display: "block", textDecoration: "none" }}
        >
          <div
            style={{
              borderRadius: 14,
              overflow: "hidden",
              boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
              animation: "fadeSlideUp 0.5s ease-out 0.1s both",
              position: "relative",
            }}
          >
            <img
              src="/spotify-banner.webp"
              alt="Buy Spotify Premium with bKash"
              style={{
                width: "100%",
                height: "auto",
                display: "block",
              }}
            />
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 5,
              marginTop: 6,
              fontSize: 11,
              color: "#999",
              fontFamily: "'Noto Sans Bengali', sans-serif",
            }}
          >
            <span>🎵</span>
            <span>দালাল ছাড়া নিজে Spotify Premium কিনতে <span style={{ color: "#1DB954", fontWeight: 600 }}>ট্যাপ করুন</span></span>
          </div>
        </a>
      </div>

      {/* Recent Transactions */}
      {recentTxs.length > 0 && (
        <div style={{ padding: "16px 16px 0" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
            <span style={{ fontSize: 14, fontWeight: 600, color: "#333", fontFamily: "'Noto Sans Bengali', sans-serif" }}>
              সাম্প্রতিক লেনদেন
            </span>
            <button
              onClick={() => onNavigate("history")}
              style={{
                background: "none",
                border: "none",
                color: "#E2136E",
                fontSize: 13,
                fontWeight: 500,
                cursor: "pointer",
                fontFamily: "'Noto Sans Bengali', sans-serif",
              }}
            >
              সব দেখুন →
            </button>
          </div>
          {recentTxs.map((tx, i) => (
            <div
              key={tx.id}
              style={{
                background: "#fff",
                borderRadius: 12,
                padding: "12px 14px",
                marginBottom: 8,
                display: "flex",
                alignItems: "center",
                gap: 12,
                boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
                animation: `fadeSlideUp 0.4s ease-out ${i * 0.06}s both`,
              }}
            >
              <div
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: "50%",
                  background: "#FFF0F5",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 18,
                  flexShrink: 0,
                }}
              >
                💸
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontWeight: 600, fontSize: 14, color: "#333", fontFamily: "'Noto Sans Bengali', sans-serif" }}>{tx.name}</div>
                <div style={{ fontSize: 12, color: "#999", fontFamily: "'Poppins', sans-serif" }}>{tx.time}</div>
              </div>
              <div style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: 14, color: "#E2136E" }}>
                -৳{formatTaka(tx.amount)}
              </div>
            </div>
          ))}
        </div>
      )}

      <BottomNav onTap={handleNavTap} />
    </div>
  );
}
