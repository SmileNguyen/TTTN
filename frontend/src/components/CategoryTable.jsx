import React from "react";

export default function CategoryTable({ categories, onEdit, onDelete }) {
  return (
    <div
      style={{
        background: "#fff",
        borderRadius: "12px",
        overflow: "hidden",
        boxShadow: "0 2px 8px rgba(0,0,0,.08)",
      }}
    >
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
        }}
      >
        <thead
          style={{
            background: "#2563eb",
            color: "#fff",
          }}
        >
          <tr>
            <th style={thStyle}>ID</th>
            <th style={thStyle}>Tên danh mục</th>
            <th style={thStyle}>Mã</th>
            <th style={thStyle}>Mô tả</th>
            <th style={thStyle}>Thứ tự</th>
            <th style={thStyle}>Trạng thái</th>
            <th style={thStyle}>Thao tác</th>
          </tr>
        </thead>

        <tbody>
          {categories.length === 0 ? (
            <tr>
              <td
                colSpan="7"
                style={{
                  textAlign: "center",
                  padding: "25px",
                  color: "#666",
                }}
              >
                Chưa có danh mục.
              </td>
            </tr>
          ) : (
            categories.map((category) => (
              <tr
                key={category._id}
                style={{
                  borderBottom: "1px solid #eee",
                }}
              >
                <td style={tdCenter}>{category._id.slice(-6)}</td>

                <td style={tdStyle}>
                  <strong>{category.name}</strong>
                </td>

                <td style={tdCenter}>{category.code}</td>

                <td style={tdStyle}>{category.description || "-"}</td>

                <td style={tdCenter}>{category.sortOrder}</td>

                <td style={tdCenter}>
                  <span
                    style={{
                      padding: "5px 10px",
                      borderRadius: "20px",
                      color: "#fff",
                      background: category.status ? "#16a34a" : "#dc2626",
                      fontSize: "13px",
                    }}
                  >
                    {category.status ? "Đang dùng" : "Ngừng"}
                  </span>
                </td>

                <td
                  style={{
                    textAlign: "center",
                    padding: "12px",
                  }}
                >
                  <button
                    onClick={() => onEdit(category)}
                    style={{
                      marginRight: "8px",
                      background: "#f59e0b",
                      color: "#fff",
                      border: "none",
                      borderRadius: "6px",
                      padding: "6px 12px",
                      cursor: "pointer",
                    }}
                  >
                    ✏️ Sửa
                  </button>

                  <button
                    onClick={() => onDelete(category._id)}
                    style={{
                      background: "#dc2626",
                      color: "#fff",
                      border: "none",
                      borderRadius: "6px",
                      padding: "6px 12px",
                      cursor: "pointer",
                    }}
                  >
                    🗑 Xóa
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

const thStyle = {
  padding: "14px",
  textAlign: "center",
};

const tdStyle = {
  padding: "12px",
};

const tdCenter = {
  padding: "12px",
  textAlign: "center",
};
