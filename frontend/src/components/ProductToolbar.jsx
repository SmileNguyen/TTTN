import React from "react";

export default function ProductToolbar({ keyword, setKeyword, onAdd }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        gap: "15px",
        marginBottom: "20px",
      }}
    >
      <input
        type="text"
        placeholder="🔍 Tìm kiếm sản phẩm..."
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        style={{
          flex: 1,
          maxWidth: "400px",
          padding: "10px 14px",
          borderRadius: "8px",
          border: "1px solid #ddd",
          outline: "none",
          fontSize: "15px",
        }}
      />

      <button
        onClick={onAdd}
        style={{
          background: "#2563eb",
          color: "#fff",
          border: "none",
          padding: "10px 18px",
          borderRadius: "8px",
          cursor: "pointer",
          fontWeight: "bold",
          fontSize: "15px",
        }}
      >
        ➕ Thêm sản phẩm
      </button>
    </div>
  );
}
