import React, { useEffect, useState } from "react";

import { getDashboardStatistics } from "../services/api";

import SalesChart from "../charts/SalesChart";

import TopProducts from "../components/TopProducts";
import TopCustomers from "../components/TopCustomers";
import LowStock from "../components/LowStock";

export default function Statistics() {
  const [dashboard, setDashboard] = useState({
    todayRevenue: 0,
    todayOrders: 0,
    customerCount: 0,
    productCount: 0,
    lowStock: 0,
    outOfStock: 0,
  });

  useEffect(() => {
    loadDashboard();
  }, []);

  async function loadDashboard() {
    try {
      const data = await getDashboardStatistics();
      setDashboard(data);
    } catch (err) {
      console.error(err);
    }
  }

  function KPI(title, value, color) {
    return (
      <div
        style={{
          background: "#fff",
          borderRadius: "12px",
          padding: "20px",
          boxShadow: "0 2px 8px rgba(0,0,0,.08)",
        }}
      >
        <div
          style={{
            color: "#64748b",
            fontSize: "15px",
            marginBottom: "12px",
          }}
        >
          {title}
        </div>

        <div
          style={{
            fontSize: "28px",
            fontWeight: "bold",
            color,
          }}
        >
          {value}
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: "25px" }}>
      <h1
        style={{
          marginBottom: "10px",
          color: "#1e293b",
        }}
      >
        📊 Báo cáo thống kê
      </h1>

      <p
        style={{
          color: "#64748b",
          marginBottom: "25px",
        }}
      >
        Tổng hợp số liệu hoạt động của cửa hàng.
      </p>

      {/* KPI */}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))",
          gap: "20px",
          marginBottom: "30px",
        }}
      >
        {KPI(
          "💰 Doanh thu hôm nay",
          dashboard.todayRevenue.toLocaleString("vi-VN") + " đ",
          "#16a34a"
        )}

        {KPI("🧾 Đơn hàng hôm nay", dashboard.todayOrders, "#2563eb")}

        {KPI("👥 Khách hàng", dashboard.customerCount, "#7c3aed")}

        {KPI("📦 Sản phẩm", dashboard.productCount, "#ea580c")}
      </div>

      {/* Sales Chart */}

      <SalesChart />

      {/* Top */}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "20px",
          marginTop: "30px",
        }}
      >
        <TopProducts />

        <TopCustomers />
      </div>

      {/* Inventory Summary */}

      <div
        style={{
          marginTop: "30px",
          background: "#fff",
          borderRadius: "12px",
          padding: "20px",
          boxShadow: "0 2px 8px rgba(0,0,0,.08)",
        }}
      >
        <h3 style={{ marginBottom: "20px" }}>📦 Tình trạng kho</h3>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3,1fr)",
            gap: "20px",
          }}
        >
          <div
            style={{
              background: "#f8fafc",
              borderRadius: "10px",
              padding: "20px",
              textAlign: "center",
            }}
          >
            <div
              style={{
                color: "#64748b",
                marginBottom: "10px",
              }}
            >
              Tổng sản phẩm
            </div>

            <div
              style={{
                fontSize: "28px",
                fontWeight: "bold",
                color: "#2563eb",
              }}
            >
              {dashboard.productCount}
            </div>
          </div>

          <div
            style={{
              background: "#fff7ed",
              borderRadius: "10px",
              padding: "20px",
              textAlign: "center",
            }}
          >
            <div
              style={{
                color: "#64748b",
                marginBottom: "10px",
              }}
            >
              Sắp hết hàng
            </div>

            <div
              style={{
                fontSize: "28px",
                fontWeight: "bold",
                color: "#d97706",
              }}
            >
              {dashboard.lowStock}
            </div>
          </div>

          <div
            style={{
              background: "#fef2f2",
              borderRadius: "10px",
              padding: "20px",
              textAlign: "center",
            }}
          >
            <div
              style={{
                color: "#64748b",
                marginBottom: "10px",
              }}
            >
              Hết hàng
            </div>

            <div
              style={{
                fontSize: "28px",
                fontWeight: "bold",
                color: "#dc2626",
              }}
            >
              {dashboard.outOfStock}
            </div>
          </div>
        </div>
      </div>

      {/* Low Stock */}

      <div style={{ marginTop: "30px" }}>
        <LowStock />
      </div>
    </div>
  );
}
