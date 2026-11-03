import React, { useEffect, useState } from "react";
import { getLowStock } from "../services/api";

export default function LowStock() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    try {
      const data = await getLowStock();
      setProducts(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
    }
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
      <h3 style={{ marginBottom: 18 }}>⚠️ Sản phẩm sắp hết hàng</h3>

      {products.length === 0 ? (
        <div
          style={{
            textAlign: "center",
            padding: 20,
            color: "#777",
          }}
        >
          Không có sản phẩm sắp hết hàng
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
                background: "#dc2626",
                color: "#fff",
              }}
            >
              <th style={{ padding: 10 }}>SKU</th>
              <th style={{ padding: 10 }}>Tên sản phẩm</th>
              <th style={{ padding: 10 }}>Tồn kho</th>
            </tr>
          </thead>

          <tbody>
            {products.map((item) => (
              <tr
                key={item._id}
                style={{
                  borderBottom: "1px solid #eee",
                }}
              >
                <td style={{ padding: 10 }}>{item.sku}</td>

                <td style={{ padding: 10 }}>{item.name}</td>

                <td
                  style={{
                    textAlign: "center",
                    color: item.stock <= 2 ? "#dc2626" : "#d97706",
                    fontWeight: "bold",
                  }}
                >
                  {item.stock}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
