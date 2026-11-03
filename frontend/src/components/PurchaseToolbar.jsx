import React from "react";

export default function PurchaseToolbar({
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
        marginBottom: 20,
        gap: 10,
      }}
    >
      <div
        style={{
          display: "flex",
          gap: 10,
          flex: 1,
        }}
      >
        <input
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="Tìm mã phiếu hoặc nhà cung cấp..."
          style={{
            flex: 1,
            padding: 10,
            border: "1px solid #ddd",
            borderRadius: 8,
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") onSearch();
          }}
        />

        <button
          onClick={onSearch}
          style={{
            padding: "10px 18px",
            background: "#2563eb",
            color: "#fff",
            border: "none",
            borderRadius: 8,
            cursor: "pointer",
          }}
        >
          🔍 Tìm kiếm
        </button>
      </div>

      <button
        onClick={onAdd}
        style={{
          background: "#16a34a",
          color: "#fff",
          border: "none",
          padding: "10px 18px",
          borderRadius: 8,
          cursor: "pointer",
        }}
      >
        ➕ Tạo phiếu nhập
      </button>
    </div>
  );
}
