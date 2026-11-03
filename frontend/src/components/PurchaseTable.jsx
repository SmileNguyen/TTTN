import React from "react";

export default function PurchaseTable({
  purchases,
  loading,
  onView,
  onEdit,
  onDelete,
  onReceive,
}) {
  if (loading) {
    return (
      <div
        style={{
          background: "#fff",
          padding: 20,
          borderRadius: 12,
          textAlign: "center",
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
        overflow: "hidden",
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
            background: "#f8fafc",
          }}
        >
          <tr>
            <th style={th}>Mã phiếu</th>
            <th style={th}>Nhà cung cấp</th>
            <th style={th}>Ngày tạo</th>
            <th style={th}>Tổng tiền</th>
            <th style={th}>Trạng thái</th>
            <th style={th}>Thao tác</th>
          </tr>
        </thead>

        <tbody>
          {purchases.length === 0 ? (
            <tr>
              <td
                colSpan={6}
                style={{
                  textAlign: "center",
                  padding: 30,
                  color: "#666",
                }}
              >
                Chưa có phiếu nhập nào.
              </td>
            </tr>
          ) : (
            purchases.map((purchase) => (
              <tr key={purchase._id}>
                <td style={td}>{purchase.purchase_code}</td>

                <td style={td}>{purchase.supplier_name}</td>

                <td style={td}>
                  {new Date(purchase.createdAt).toLocaleString("vi-VN")}
                </td>

                <td style={td}>
                  {Number(purchase.total || 0).toLocaleString("vi-VN")} đ
                </td>

                <td style={td}>
                  <span
                    style={{
                      padding: "4px 10px",
                      borderRadius: 20,
                      color: "#fff",
                      background:
                        purchase.status === "Received" ? "#16a34a" : "#ea580c",
                    }}
                  >
                    {purchase.status === "Received"
                      ? "Đã nhập kho"
                      : "Chờ nhập"}
                  </span>
                </td>

                <td style={td}>
                  <div
                    style={{
                      display: "flex",
                      gap: 6,
                      flexWrap: "wrap",
                    }}
                  >
                    <button style={btnBlue} onClick={() => onView(purchase)}>
                      👁
                    </button>

                    {purchase.status !== "Received" && (
                      <>
                        <button
                          style={btnOrange}
                          onClick={() => onEdit(purchase)}
                        >
                          ✏️
                        </button>

                        <button
                          style={btnRed}
                          onClick={() => onDelete(purchase)}
                        >
                          🗑
                        </button>

                        <button
                          style={btnGreen}
                          onClick={() => onReceive(purchase)}
                        >
                          ✅
                        </button>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

const th = {
  padding: 12,
  borderBottom: "1px solid #eee",
  textAlign: "left",
};

const td = {
  padding: 12,
  borderBottom: "1px solid #eee",
};

const btnBlue = {
  border: "none",
  background: "#2563eb",
  color: "#fff",
  borderRadius: 6,
  padding: "6px 10px",
  cursor: "pointer",
};

const btnOrange = {
  border: "none",
  background: "#f59e0b",
  color: "#fff",
  borderRadius: 6,
  padding: "6px 10px",
  cursor: "pointer",
};

const btnRed = {
  border: "none",
  background: "#dc2626",
  color: "#fff",
  borderRadius: 6,
  padding: "6px 10px",
  cursor: "pointer",
};

const btnGreen = {
  border: "none",
  background: "#16a34a",
  color: "#fff",
  borderRadius: 6,
  padding: "6px 10px",
  cursor: "pointer",
};
