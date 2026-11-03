import React from "react";

export default function StatCard({ title, value, icon, color = "#2563eb" }) {
  return (
    <div
      style={{
        background: "#fff",
        borderRadius: "12px",
        padding: "20px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        minHeight: "110px",
      }}
    >
      <div>
        <p
          style={{
            margin: 0,
            color: "#64748b",
            fontSize: "14px",
          }}
        >
          {title}
        </p>

        <h2
          style={{
            marginTop: "10px",
            marginBottom: 0,
            color,
          }}
        >
          {value}
        </h2>
      </div>

      <div
        style={{
          fontSize: "42px",
        }}
      >
        {icon}
      </div>
    </div>
  );
}
