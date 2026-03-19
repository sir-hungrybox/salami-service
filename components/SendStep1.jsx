"use client";
import { useState } from "react";
import SubHeader from "./SubHeader";
import { RELATIONSHIPS } from "@/lib/constants";

export default function SendStep1({ onNext, onBack }) {
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [relationship, setRelationship] = useState("");
  const [error, setError] = useState("");

  const handleNext = () => {
    if (!phone || !/^01[3-9]\d{8}$/.test(phone)) {
      setError("সঠিক বিকাশ নম্বর দিন (01XXXXXXXXX)");
      return;
    }
    if (!name || name.trim().length < 2) {
      setError("আপনার নাম লিখুন (কমপক্ষে ২ অক্ষর)");
      return;
    }
    if (!relationship) {
      setError("সম্পর্ক বাছাই করুন");
      return;
    }
    setError("");
    onNext({ phone, name: name.trim(), relationship });
  };

  return (
    <div style={{ background: "#F5F5F5", minHeight: "100vh", animation: "slideIn 0.35s ease-out" }}>
      <SubHeader title="সালামি পাঠান" onBack={onBack} />

      <div style={{ padding: "20px 16px" }}>
        <div
          style={{
            background: "#fff",
            borderRadius: 14,
            padding: "20px 18px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
          }}
        >
          {/* bKash Number */}
          <div style={{ marginBottom: 18 }}>
            <label style={{ fontSize: 13, fontWeight: 600, color: "#333", fontFamily: "'Noto Sans Bengali', sans-serif", display: "block", marginBottom: 8 }}>
              বিকাশ নম্বর
            </label>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                border: "2px solid #eee",
                borderRadius: 10,
                overflow: "hidden",
              }}
            >
              <span
                style={{
                  padding: "12px 10px 12px 14px",
                  background: "#fafafa",
                  fontSize: 14,
                  color: "#666",
                  fontFamily: "'Poppins', sans-serif",
                  fontWeight: 500,
                  borderRight: "1px solid #eee",
                  whiteSpace: "nowrap",
                }}
              >
                🇧🇩 +880
              </span>
              <input
                type="tel"
                inputMode="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 11))}
                placeholder="01XXXXXXXXX"
                style={{
                  flex: 1,
                  border: "none",
                  outline: "none",
                  padding: "12px 14px",
                  fontSize: 15,
                  fontFamily: "'Poppins', sans-serif",
                  fontWeight: 500,
                  color: "#333",
                  background: "transparent",
                }}
              />
            </div>
          </div>

          {/* Name */}
          <div style={{ marginBottom: 18 }}>
            <label style={{ fontSize: 13, fontWeight: 600, color: "#333", fontFamily: "'Noto Sans Bengali', sans-serif", display: "block", marginBottom: 8 }}>
              আপনার নাম
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="আপনার নাম লিখুন..."
              style={{
                width: "100%",
                border: "2px solid #eee",
                borderRadius: 10,
                padding: "12px 14px",
                fontSize: 15,
                fontFamily: "'Noto Sans Bengali', sans-serif",
                color: "#333",
                outline: "none",
                transition: "border-color 0.2s",
              }}
              onFocus={(e) => (e.target.style.borderColor = "#E2136E")}
              onBlur={(e) => (e.target.style.borderColor = "#eee")}
            />
          </div>

          {/* Relationship */}
          <div>
            <label style={{ fontSize: 13, fontWeight: 600, color: "#333", fontFamily: "'Noto Sans Bengali', sans-serif", display: "block", marginBottom: 8 }}>
              সম্পর্ক
            </label>
            <select
              value={relationship}
              onChange={(e) => setRelationship(e.target.value)}
              style={{
                width: "100%",
                border: "2px solid #eee",
                borderRadius: 10,
                padding: "12px 40px 12px 14px",
                fontSize: 15,
                fontFamily: "'Noto Sans Bengali', sans-serif",
                color: relationship ? "#333" : "#aaa",
                outline: "none",
                appearance: "none",
                background: `#fff url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23E2136E'%3E%3Cpath d='M7 10l5 5 5-5z'/%3E%3C/svg%3E") no-repeat right 12px center`,
                backgroundSize: "20px",
                transition: "border-color 0.2s",
                cursor: "pointer",
              }}
              onFocus={(e) => (e.target.style.borderColor = "#E2136E")}
              onBlur={(e) => (e.target.style.borderColor = "#eee")}
            >
              <option value="" disabled>সম্পর্ক বাছাই করুন...</option>
              {RELATIONSHIPS.map((r) => (
                <option key={r.value} value={r.value}>{r.label}</option>
              ))}
            </select>
          </div>
        </div>

        {error && (
          <div style={{ marginTop: 12, color: "#E2136E", fontSize: 13, fontFamily: "'Noto Sans Bengali', sans-serif", textAlign: "center" }}>
            ⚠️ {error}
          </div>
        )}

        <button
          onClick={handleNext}
          style={{
            width: "100%",
            marginTop: 20,
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
          পরবর্তী ধাপ →
        </button>
      </div>
    </div>
  );
}
