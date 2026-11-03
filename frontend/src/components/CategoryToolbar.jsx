import React from "react";

export default function CategoryToolbar({
  keyword,
  setKeyword,
  onAdd,
  onSeed,
  onRefresh,
}) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "20px",
        gap: "15px",
        flexWrap: "wrap",
      }}
    >
      {/* Search */}
      <input
        type="text"
        placeholder="🔍 Tìm kiếm danh mục..."
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        style={{
          flex: 1,
          minWidth: "250px",
          maxWidth: "400px",
          padding: "10px 14px",
          border: "1px solid #ddd",
          borderRadius: "8px",
          outline: "none",
          fontSize: "14px",
        }}
      />

      {/* Buttons */}
      <div
        style={{
          display: "flex",
          gap: "10px",
          flexWrap: "wrap",
        }}
      >
        <button
          onClick={onRefresh}
          style={{
            background: "#6b7280",
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            padding: "10px 16px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          🔄 Làm mới
        </button>

        <button
          onClick={onSeed}
          style={{
            background: "#16a34a",
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            padding: "10px 16px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          🌱 Tạo 27 danh mục
        </button>

        <button
          onClick={onAdd}
          style={{
            background: "#2563eb",
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            padding: "10px 18px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          ➕ Thêm danh mục
        </button>
      </div>
    </div>
  );
}
