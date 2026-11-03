import React, { useEffect, useState } from "react";
import { getTopCustomers } from "../services/api";

export default function TopCustomers() {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    try {
      const data = await getTopCustomers();
      setCustomers(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
    }
  }

  function formatMoney(value) {
    return Number(value || 0).toLocaleString("vi-VN") + " đ";
  }

  return (
    <div
      style={{
        background: "#fff",
        borderRadius: 12,
        padding: 20,
        boxShadow: "0 2px 8px rgba(0,0,0,.08)",
      }}
    >
      <h3 style={{ marginBottom: 18 }}>👑 Khách hàng mua nhiều nhất</h3>

      {customers.length === 0 ? (
        <div
          style={{
            color: "#777",
            textAlign: "center",
            padding: 20,
          }}
        >
          Chưa có dữ liệu
        </div>
      ) : (
        <table
          style={{
            width: "100%",
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
              <th style={{ padding: 10 }}>Khách hàng</th>
              <th style={{ padding: 10 }}>Đơn</th>
              <th style={{ padding: 10 }}>Doanh thu</th>
            </tr>
          </thead>

          <tbody>
            {customers.map((item, index) => (
              <tr
                key={index}
                style={{
                  borderBottom: "1px solid #eee",
                }}
              >
                <td style={{ padding: 10 }}>{item.name}</td>

                <td
                  style={{
                    textAlign: "center",
                    fontWeight: "bold",
                  }}
                >
                  {item.orders}
                </td>

                <td
                  style={{
                    color: "#16a34a",
                    fontWeight: "bold",
                  }}
                >
                  {formatMoney(item.revenue)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
