import React from "react";

export default function POSSummary({ subtotal, discount, total, formatPrice }) {
  return (
    <div
      style={{
        background: "#fff",
        borderRadius: 12,
        padding: 20,
        marginTop: 20,
        boxShadow: "0 2px 8px rgba(0,0,0,.08)",
      }}
    >
      <h2
        style={{
          marginTop: 0,
          marginBottom: 20,
          fontSize: 22,
        }}
      >
        💰 Tổng hóa đơn
      </h2>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 10,
        }}
      >
        <span>Tạm tính</span>

        <strong>{formatPrice(subtotal)}</strong>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 10,
        }}
      >
        <span>Giảm giá</span>

        <strong
          style={{
            color: "#dc2626",
          }}
        >
          - {formatPrice(discount)}
        </strong>
      </div>

      <hr
        style={{
          margin: "15px 0",
          border: "none",
          borderTop: "1px solid #ddd",
        }}
      />

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          fontSize: 22,
          fontWeight: "bold",
          color: "#2563eb",
        }}
      >
        <span>Tổng cộng</span>

        <span>{formatPrice(total)}</span>
      </div>
    </div>
  );
}
