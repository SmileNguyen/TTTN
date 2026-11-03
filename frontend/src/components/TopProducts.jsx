import React, { useEffect, useState } from "react";

import { getTopProducts } from "../services/api";

export default function TopProducts() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    try {
      const data = await getTopProducts();

      setProducts(Array.isArray(data) ? data : []);
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
        borderRadius: "12px",
        padding: "20px",
        boxShadow: "0 2px 8px rgba(0,0,0,.08)",
      }}
    >
      <h3 style={{ marginBottom: 20 }}>⭐ Top 5 sản phẩm bán chạy</h3>

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
            <th align="left">#</th>
            <th align="left">Sản phẩm</th>
            <th align="center">Đã bán</th>
            <th align="right">Doanh thu</th>
          </tr>
        </thead>

        <tbody>
          {products.length === 0 ? (
            <tr>
              <td
                colSpan="4"
                style={{
                  textAlign: "center",
                  padding: "25px",
                  color: "#777",
                }}
              >
                Chưa có dữ liệu.
              </td>
            </tr>
          ) : (
            products.map((item, index) => (
              <tr
                key={index}
                style={{
                  borderBottom: "1px solid #eee",
                }}
              >
                <td
                  style={{
                    padding: "12px 0",
                    fontWeight: "bold",
                    color: "#2563eb",
                  }}
                >
                  #{index + 1}
                </td>

                <td>{item.name}</td>

                <td align="center">{item.quantity}</td>

                <td
                  align="right"
                  style={{
                    color: "#16a34a",
                    fontWeight: "bold",
                  }}
                >
                  {formatMoney(item.revenue)}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
