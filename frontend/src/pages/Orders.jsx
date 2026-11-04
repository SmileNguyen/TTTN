import React, { useEffect, useMemo, useState } from "react";
import { getOrders, deleteOrder } from "../services/api";

export default function Orders() {
  // ===============================
  // STATE
  // ===============================

  const [orders, setOrders] = useState([]);
  const [keyword, setKeyword] = useState("");

  // Popup xem hóa đơn
  const [selectedOrder, setSelectedOrder] = useState(null);

  // ===============================
  // LOAD DATA
  // ===============================

  useEffect(() => {
    loadOrders();
  }, []);

  async function loadOrders() {
    try {
      const data = await getOrders();

      setOrders(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
      alert("Không thể tải danh sách hóa đơn");
    }
  }

  // ===============================
  // FILTER
  // ===============================

  const filteredOrders = useMemo(() => {
    return orders.filter((item) => {
      const invoice = item.invoice_code || "";
      const customer = item.customer_name || "";

      return (
        invoice.toLowerCase().includes(keyword.toLowerCase()) ||
        customer.toLowerCase().includes(keyword.toLowerCase())
      );
    });
  }, [orders, keyword]);

  // ===============================
  // DELETE
  // ===============================

  async function handleDelete(id) {
    const ok = window.confirm("Bạn muốn xóa hóa đơn này?");

    if (!ok) return;

    try {
      await deleteOrder(id);

      await loadOrders();

      alert("Đã xóa hóa đơn.");
    } catch (err) {
      console.error(err);

      alert(err.message);
    }
  }

  // ===============================
  // FORMAT PRICE
  // ===============================

  function formatPrice(value) {
    return Number(value || 0).toLocaleString("vi-VN") + " đ";
  }

  // ===============================
  // UI
  // ===============================

  return (
    <div
      style={{
        padding: 25,
      }}
    >
      <h1
        style={{
          marginBottom: 20,
        }}
      >
        🧾 Quản lý hóa đơn
      </h1>

      {/* Toolbar */}

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 20,
        }}
      >
        <input
          type="text"
          placeholder="Tìm theo mã hóa đơn hoặc khách hàng..."
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          style={{
            width: 350,
            padding: 10,
            borderRadius: 8,
            border: "1px solid #ddd",
          }}
        />

        <button
          onClick={loadOrders}
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
          🔄 Làm mới
        </button>
      </div>

      {/* TABLE */}

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
              <th style={{ padding: 15 }}>Mã HD</th>
              <th>Khách hàng</th>
              <th>Nguồn đơn</th>
              <th>Trạng thái</th>
              <th>Nhân viên</th>
              <th>Ngày</th>
              <th>Tổng tiền</th>
              <th>Thanh toán</th>
              <th>Thao tác</th>
            </tr>
          </thead>

          <tbody>
            {filteredOrders.length === 0 ? (
              <tr>
                <td
                  colSpan={9}
                  style={{
                    padding: 40,
                    textAlign: "center",
                    color: "#888",
                  }}
                >
                  Chưa có hóa đơn.
                </td>
              </tr>
            ) : (
              filteredOrders.map((order) => (
                <tr
                  key={order._id}
                  style={{
                    borderBottom: "1px solid #eee",
                  }}
                >
                  <td style={{ padding: 15 }}>{order.invoice_code}</td>

                  <td>{order.customer_name}</td>

                  <td>{order.source === "Online" ? "🌐 Online" : "🏪 POS"}</td>

                  <td>{({ Pending: "Chờ xác nhận", Confirmed: "Đã xác nhận", Shipping: "Đang giao", Completed: "Hoàn tất", Cancelled: "Đã hủy" })[order.status] || order.status}</td>

                  <td>{order.employee_name}</td>

                  <td>{new Date(order.createdAt).toLocaleString("vi-VN")}</td>

                  <td
                    style={{
                      color: "#2563eb",
                      fontWeight: "bold",
                    }}
                  >
                    {formatPrice(order.total)}
                  </td>

                  <td>{order.payment_method}</td>

                  <td>
                    <button
                      onClick={() => setSelectedOrder(order)}
                      style={{
                        marginRight: 8,
                        border: "none",
                        padding: "6px 10px",
                        borderRadius: 6,
                        cursor: "pointer",
                        background: "#2563eb",
                        color: "#fff",
                      }}
                    >
                      👁 Xem
                    </button>

                    <button
                      onClick={() => window.print()}
                      style={{
                        marginRight: 8,
                        border: "none",
                        padding: "6px 10px",
                        borderRadius: 6,
                        cursor: "pointer",
                        background: "#16a34a",
                        color: "#fff",
                      }}
                    >
                      🖨 In
                    </button>

                    <button
                      onClick={() => handleDelete(order._id)}
                      style={{
                        border: "none",
                        padding: "6px 10px",
                        borderRadius: 6,
                        cursor: "pointer",
                        background: "#dc2626",
                        color: "#fff",
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

      {/* ==========================
          POPUP CHI TIẾT HÓA ĐƠN
      =========================== */}

      {selectedOrder && (
        <div
          onClick={() => setSelectedOrder(null)}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 999,
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              width: 700,
              maxHeight: "85vh",
              overflowY: "auto",
              background: "#fff",
              borderRadius: 12,
              padding: 25,
            }}
          >
            <h2>🧾 Chi tiết hóa đơn</h2>

            <hr />

            <p>
              <b>Mã hóa đơn:</b> {selectedOrder.invoice_code}
            </p>

            <p>
              <b>Khách hàng:</b> {selectedOrder.customer_name}
            </p>

            <p>
              <b>Nhân viên:</b> {selectedOrder.employee_name}
            </p>

            <p>
              <b>Thanh toán:</b> {selectedOrder.payment_method}
            </p>

            <table
              style={{
                width: "100%",
                marginTop: 20,
                borderCollapse: "collapse",
              }}
            >
              <thead>
                <tr
                  style={{
                    background: "#2563eb",
                    color: "#fff",
                  }}
                >
                  <th style={{ padding: 10 }}>Tên SP</th>
                  <th>SL</th>
                  <th>Đơn giá</th>
                  <th>Thành tiền</th>
                </tr>
              </thead>

              <tbody>
                {selectedOrder.items.map((item, index) => (
                  <tr key={index}>
                    <td style={{ padding: 10 }}>{item.product_name}</td>

                    <td align="center">{item.quantity}</td>

                    <td align="right">{formatPrice(item.price)}</td>

                    <td align="right">{formatPrice(item.total)}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <hr />

            <h3>Tạm tính: {formatPrice(selectedOrder.subtotal)}</h3>

            <h3>Giảm giá: {formatPrice(selectedOrder.discount)}</h3>

            <h2
              style={{
                color: "#2563eb",
              }}
            >
              Tổng tiền: {formatPrice(selectedOrder.total)}
            </h2>

            <h3>Khách đưa: {formatPrice(selectedOrder.paid)}</h3>

            <h3>Tiền thừa: {formatPrice(selectedOrder.change)}</h3>

            <button
              onClick={() => setSelectedOrder(null)}
              style={{
                marginTop: 20,
                width: "100%",
                padding: 12,
                border: "none",
                borderRadius: 8,
                cursor: "pointer",
                background: "#2563eb",
                color: "#fff",
                fontWeight: "bold",
              }}
            >
              Đóng
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
