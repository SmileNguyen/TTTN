import React from "react";

export default function POSPayment({
  paid,
  setPaid,
  discount,
  setDiscount,
  change,
  total,
  formatPrice,
  onCheckout,
}) {
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
        💳 Thanh toán
      </h2>

      <label
        style={{
          display: "block",
          marginBottom: 5,
          fontWeight: "bold",
        }}
      >
        Giảm giá
      </label>

      <input
        type="number"
        min="0"
        value={discount}
        onChange={(e) => setDiscount(Number(e.target.value) || 0)}
        style={{
          width: "100%",
          padding: 10,
          borderRadius: 8,
          border: "1px solid #ddd",
          marginBottom: 15,
          boxSizing: "border-box",
        }}
      />

      <label
        style={{
          display: "block",
          marginBottom: 5,
          fontWeight: "bold",
        }}
      >
        Tiền khách đưa
      </label>

      <input
        type="number"
        min="0"
        value={paid}
        onChange={(e) => setPaid(Number(e.target.value) || 0)}
        style={{
          width: "100%",
          padding: 10,
          borderRadius: 8,
          border: "1px solid #ddd",
          marginBottom: 20,
          boxSizing: "border-box",
        }}
      />

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 10,
        }}
      >
        <span>Tổng cần thanh toán</span>

        <strong>{formatPrice(total)}</strong>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 20,
        }}
      >
        <span>Tiền thừa</span>

        <strong
          style={{
            color: change > 0 ? "#16a34a" : "#dc2626",
          }}
        >
          {formatPrice(change)}
        </strong>
      </div>

      <button
        onClick={onCheckout}
        style={{
          width: "100%",
          border: "none",
          padding: "14px",
          borderRadius: 10,
          background: "#16a34a",
          color: "#fff",
          fontWeight: "bold",
          fontSize: 18,
          cursor: "pointer",
        }}
      >
        🧾 Thanh toán
      </button>
    </div>
  );
}
