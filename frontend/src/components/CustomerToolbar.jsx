import React from "react";

export default function CustomerToolbar({ keyword, setKeyword, onAdd }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        gap: 15,
        marginBottom: 20,
        flexWrap: "wrap",
      }}
    >
      {/* Search */}
      <input
        type="text"
        placeholder="🔍 Tìm khách hàng theo tên hoặc số điện thoại..."
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        style={{
          flex: 1,
          minWidth: 300,
          maxWidth: 450,
          padding: "11px 15px",
          borderRadius: 10,
          border: "1px solid #d1d5db",
          outline: "none",
          fontSize: 15,
        }}
      />

      {/* Add */}
      <button
        onClick={onAdd}
        style={{
          background: "#2563eb",
          color: "#fff",
          border: "none",
          padding: "11px 18px",
          borderRadius: 10,
          cursor: "pointer",
          fontWeight: "bold",
          fontSize: 15,
        }}
      >
        ➕ Thêm khách hàng
      </button>
    </div>
  );
}
