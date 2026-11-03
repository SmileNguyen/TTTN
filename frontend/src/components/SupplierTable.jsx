import React from "react";

export default function SupplierTable({
  suppliers,
  loading,
  onEdit,
  onDelete,
}) {
  if (loading) {
    return (
      <div
        style={{
          background: "#fff",
          padding: 30,
          borderRadius: 12,
          textAlign: "center",
          boxShadow: "0 2px 8px rgba(0,0,0,.08)",
        }}
      >
        Đang tải dữ liệu...
      </div>
    );
  }

  return (
    <div
      style={{
        background: "#fff",
        borderRadius: 12,
        boxShadow: "0 2px 8px rgba(0,0,0,.08)",
        overflowX: "auto",
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
            background: "#f5f5f5",
          }}
        >
          <tr>
            <th style={thStyle}>Mã NCC</th>
            <th style={thStyle}>Tên nhà cung cấp</th>
            <th style={thStyle}>Điện thoại</th>
            <th style={thStyle}>Email</th>
            <th style={thStyle}>Người liên hệ</th>
            <th style={thStyle}>Trạng thái</th>
            <th style={thStyle}>Thao tác</th>
          </tr>
        </thead>

        <tbody>
          {suppliers.length === 0 ? (
            <tr>
              <td
                colSpan={7}
                style={{
                  textAlign: "center",
                  padding: 30,
                  color: "#777",
                }}
              >
                Không có dữ liệu.
              </td>
            </tr>
          ) : (
            suppliers.map((supplier) => (
              <tr
                key={supplier._id}
                style={{
                  borderTop: "1px solid #eee",
                }}
              >
                <td style={tdStyle}>{supplier.supplier_code}</td>

                <td style={tdStyle}>{supplier.name}</td>

                <td style={tdStyle}>{supplier.phone}</td>

                <td style={tdStyle}>{supplier.email}</td>

                <td style={tdStyle}>{supplier.contact_person}</td>

                <td style={tdStyle}>
                  <span
                    style={{
                      background:
                        supplier.status === "Active" ? "#16a34a" : "#dc2626",

                      color: "#fff",

                      padding: "4px 10px",

                      borderRadius: 20,

                      fontSize: 13,
                    }}
                  >
                    {supplier.status}
                  </span>
                </td>

                <td style={tdStyle}>
                  <button
                    onClick={() => onEdit(supplier)}
                    style={{
                      marginRight: 8,
                      background: "#2563eb",
                      color: "#fff",
                      border: "none",
                      borderRadius: 6,
                      padding: "6px 12px",
                      cursor: "pointer",
                    }}
                  >
                    Sửa
                  </button>

                  <button
                    onClick={() => onDelete(supplier)}
                    style={{
                      background: "#dc2626",
                      color: "#fff",
                      border: "none",
                      borderRadius: 6,
                      padding: "6px 12px",
                      cursor: "pointer",
                    }}
                  >
                    Xóa
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
  textAlign: "left",
  fontWeight: "bold",
  whiteSpace: "nowrap",
};

const tdStyle = {
  padding: "14px",
  whiteSpace: "nowrap",
};
