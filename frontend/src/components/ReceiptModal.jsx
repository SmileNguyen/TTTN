import React from "react";
import ReceiptPrint from "./ReceiptPrint";

export default function ReceiptModal({ order, onClose }) {
  if (!order) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,.45)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 9999,
      }}
    >
      <div
        style={{
          width: 420,
          maxHeight: "90vh",
          overflowY: "auto",
          background: "#fff",
          borderRadius: 12,
          padding: 20,
          boxShadow: "0 10px 30px rgba(0,0,0,.25)",
        }}
      >
        <ReceiptPrint order={order} />

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: 20,
            gap: 10,
          }}
        >
          <button
            onClick={() => window.print()}
            style={{
              flex: 1,
              padding: 12,
              border: "none",
              borderRadius: 8,
              background: "#2563eb",
              color: "#fff",
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            🖨 In hóa đơn
          </button>

          <button
            onClick={onClose}
            style={{
              flex: 1,
              padding: 12,
              border: "none",
              borderRadius: 8,
              background: "#ef4444",
              color: "#fff",
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            ✖ Đóng
          </button>
        </div>
      </div>
    </div>
  );
}
