import React from "react";

export default function CustomerTable({ customers, onEdit, onDelete }) {
  return (
    <div
      style={{
        background: "#fff",
        borderRadius: 12,
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
            <th style={{ padding: 14 }}>ID</th>
            <th>Khách hàng</th>
            <th>Số điện thoại</th>
            <th>Email</th>
            <th>Điểm</th>
            <th>Hạng</th>
            <th>Thao tác</th>
          </tr>
        </thead>

        <tbody>
          {customers.length === 0 ? (
            <tr>
              <td
                colSpan="7"
                style={{
                  textAlign: "center",
                  padding: 35,
                  color: "#777",
                }}
              >
                Chưa có khách hàng.
              </td>
            </tr>
          ) : (
            customers.map((customer) => (
              <tr
                key={customer._id}
                style={{
                  borderBottom: "1px solid #eee",
                  transition: ".2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "#f8fafc";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "#fff";
                }}
              >
                <td
                  style={{
                    padding: 14,
                    textAlign: "center",
                    fontWeight: "bold",
                    color: "#666",
                  }}
                >
                  {customer._id.slice(-6)}
                </td>

                {/* Tên + Avatar */}
                <td style={{ padding: 10 }}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 12,
                    }}
                  >
                    <div
                      style={{
                        width: 42,
                        height: 42,
                        borderRadius: "50%",
                        background: "#2563eb",
                        color: "#fff",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        fontWeight: "bold",
                        fontSize: 18,
                      }}
                    >
                      {(customer.full_name || "?").charAt(0).toUpperCase()}
                    </div>

                    <div>
                      <div
                        style={{
                          fontWeight: "bold",
                        }}
                      >
                        {customer.full_name || "-"}
                      </div>

                      <div
                        style={{
                          fontSize: 13,
                          color: "#777",
                        }}
                      >
                        #{customer._id.slice(-6)}
                      </div>
                    </div>
                  </div>
                </td>

                <td>{customer.phone || "-"}</td>

                <td>{customer.email || "-"}</td>

                {/* Điểm */}
                <td
                  style={{
                    textAlign: "center",
                    fontWeight: "bold",
                    color: "#2563eb",
                  }}
                >
                  {customer.point || 0}
                </td>

                {/* Hạng */}
                <td
                  style={{
                    textAlign: "center",
                  }}
                >
                  <span
                    style={{
                      padding: "5px 12px",
                      borderRadius: 20,
                      color: "#fff",
                      fontSize: 13,
                      fontWeight: "bold",
                      background:
                        customer.level === "VIP"
                          ? "#dc2626"
                          : customer.level === "Gold"
                          ? "#eab308"
                          : customer.level === "Silver"
                          ? "#6b7280"
                          : "#2563eb",
                    }}
                  >
                    {customer.level || "Member"}
                  </span>
                </td>

                {/* Action */}
                <td
                  style={{
                    textAlign: "center",
                  }}
                >
                  <button
                    onClick={() => onEdit(customer)}
                    style={{
                      marginRight: 8,
                      background: "#f59e0b",
                      color: "#fff",
                      border: "none",
                      borderRadius: 8,
                      padding: "7px 14px",
                      cursor: "pointer",
                      fontWeight: "bold",
                    }}
                  >
                    ✏️ Sửa
                  </button>

                  <button
                    onClick={() => onDelete(customer._id)}
                    style={{
                      background: "#dc2626",
                      color: "#fff",
                      border: "none",
                      borderRadius: 8,
                      padding: "7px 14px",
                      cursor: "pointer",
                      fontWeight: "bold",
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
