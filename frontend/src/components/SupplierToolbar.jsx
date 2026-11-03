import React from "react";

export default function SupplierToolbar({
  keyword,
  setKeyword,
  onSearch,
  onAdd,
}) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 20,
        gap: 15,
        flexWrap: "wrap",
      }}
    >
      {/* ========================= */}
      {/* SEARCH */}
      {/* ========================= */}

      <div
        style={{
          display: "flex",
          gap: 10,
          flex: 1,
        }}
      >
        <input
          type="text"
          placeholder="🔍 Tìm theo tên, mã, SĐT..."
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              onSearch();
            }
          }}
          style={{
            flex: 1,
            padding: "10px 14px",
            border: "1px solid #ddd",
            borderRadius: 8,
            outline: "none",
            fontSize: 15,
          }}
        />

        <button
          onClick={onSearch}
          style={{
            background: "#2563eb",
            color: "#fff",
            border: "none",
            padding: "10px 18px",
            borderRadius: 8,
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          Tìm
        </button>
      </div>

      {/* ========================= */}
      {/* ADD */}
      {/* ========================= */}

      <button
        onClick={onAdd}
        style={{
          background: "#16a34a",
          color: "#fff",
          border: "none",
          padding: "10px 18px",
          borderRadius: 8,
          cursor: "pointer",
          fontWeight: "bold",
          whiteSpace: "nowrap",
        }}
      >
        ➕ Thêm nhà cung cấp
      </button>
    </div>
  );
}
