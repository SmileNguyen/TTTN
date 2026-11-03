import React from "react";

export default function POSSearch({
  keyword,
  setKeyword,
  categories,
  selectedCategory,
  setSelectedCategory,
}) {
  return (
    <div
      style={{
        background: "#fff",
        borderRadius: 12,
        padding: 20,
        boxShadow: "0 2px 8px rgba(0,0,0,.08)",
        display: "flex",
        gap: 15,
        alignItems: "center",
        flexWrap: "wrap",
      }}
    >
      {/* Ô tìm kiếm */}
      <input
        type="text"
        placeholder="🔍 Tìm sản phẩm..."
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        style={{
          flex: 1,
          minWidth: 260,
          padding: "12px 15px",
          borderRadius: 8,
          border: "1px solid #ddd",
          fontSize: 15,
          outline: "none",
        }}
      />

      {/* Danh mục */}
      <select
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
        style={{
          padding: "12px",
          borderRadius: 8,
          border: "1px solid #ddd",
          minWidth: 220,
          fontSize: 15,
          cursor: "pointer",
        }}
      >
        <option value="">📂 Tất cả danh mục</option>

        {categories.map((category) => (
          <option key={category._id} value={category._id}>
            {category.name}
          </option>
        ))}
      </select>

      {/* Xóa bộ lọc */}
      <button
        onClick={() => {
          setKeyword("");
          setSelectedCategory("");
        }}
        style={{
          background: "#ef4444",
          color: "#fff",
          border: "none",
          padding: "12px 18px",
          borderRadius: 8,
          cursor: "pointer",
          fontWeight: "bold",
        }}
      >
        ✖ Xóa lọc
      </button>
    </div>
  );
}
