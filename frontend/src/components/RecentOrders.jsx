import React, { useEffect, useState } from "react";

import { getRecentOrders } from "../services/api";

export default function RecentOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    loadOrders();
  }, []);

  async function loadOrders() {
    try {
      const data = await getRecentOrders();

      setOrders(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
    }
  }

  function formatMoney(value) {
    return Number(value || 0).toLocaleString("vi-VN") + " đ";
  }

  function formatDate(date) {
    return new Date(date).toLocaleString("vi-VN");
  }

  function getStatusColor(status) {
    switch (status) {
      case "Completed":
        return "#16a34a";

      case "Cancelled":
        return "#dc2626";

      default:
        return "#2563eb";
    }
  }

  return (
    <div
      style={{
        background: "#fff",
        borderRadius: "12px",
        padding: "20px",
        boxShadow: "0 2px 8px rgba(0,0,0,.08)",
      }}
    >
      <h3 style={{ marginBottom: "20px" }}>🛒 10 hóa đơn mới nhất</h3>

      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
        }}
      >
        <thead>
          <tr
            style={{
              borderBottom: "2px solid #eee",
            }}
          >
            <th align="left">Mã HĐ</th>
            <th align="left">Khách hàng</th>
            <th align="left">Tổng tiền</th>
            <th align="left">Ngày</th>
            <th align="center">Trạng thái</th>
          </tr>
        </thead>

        <tbody>
          {orders.length === 0 ? (
            <tr>
              <td
                colSpan="5"
                style={{
                  textAlign: "center",
                  padding: 25,
                  color: "#888",
                }}
              >
                Chưa có hóa đơn.
              </td>
            </tr>
          ) : (
            orders.map((order) => (
              <tr
                key={order._id}
                style={{
                  borderBottom: "1px solid #eee",
                }}
              >
                <td style={{ padding: "12px 0" }}>{order.invoice_code}</td>

                <td>{order.customer_name}</td>

                <td>{formatMoney(order.total)}</td>

                <td>{formatDate(order.createdAt)}</td>

                <td align="center">
                  <span
                    style={{
                      padding: "4px 10px",
                      borderRadius: "20px",
                      color: "#fff",
                      background: getStatusColor(order.status),
                      fontSize: 13,
                    }}
                  >
                    {order.status}
                  </span>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
