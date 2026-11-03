import React, { useEffect, useState } from "react";

import StatCard from "../components/StatCard";
import SalesChart from "../charts/SalesChart";
import RecentOrders from "../components/RecentOrders";
import TopProducts from "../components/TopProducts";
import TopCustomers from "../components/TopCustomers";
import LowStock from "../components/LowStock";

import { getDashboardStatistics } from "../services/api";

export default function Dashboard() {
  const [stats, setStats] = useState({
    productCount: 0,
    customerCount: 0,
    todayOrders: 0,
    todayRevenue: 0,
    lowStock: 0,
    outOfStock: 0,
  });

  useEffect(() => {
    loadDashboard();
  }, []);

  async function loadDashboard() {
    try {
      const data = await getDashboardStatistics();

      setStats(data);
    } catch (err) {
      console.error(err);
    }
  }

  function formatMoney(value) {
    return Number(value || 0).toLocaleString("vi-VN") + " đ";
  }

  return (
    <div style={{ padding: "25px" }}>
      <h1 style={{ marginBottom: "25px" }}>📊 Dashboard</h1>

      {/* ========================= */}
      {/* STATISTICS */}
      {/* ========================= */}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))",
          gap: "20px",
        }}
      >
        <StatCard
          title="Sản phẩm"
          value={stats.productCount}
          icon="📦"
          color="#2563eb"
        />

        <StatCard
          title="Đơn hôm nay"
          value={stats.todayOrders}
          icon="🛒"
          color="#16a34a"
        />

        <StatCard
          title="Khách hàng"
          value={stats.customerCount}
          icon="👥"
          color="#ea580c"
        />

        <StatCard
          title="Doanh thu hôm nay"
          value={formatMoney(stats.todayRevenue)}
          icon="💰"
          color="#dc2626"
        />

        <StatCard
          title="Sắp hết hàng"
          value={stats.lowStock}
          icon="⚠️"
          color="#d97706"
        />

        <StatCard
          title="Hết hàng"
          value={stats.outOfStock}
          icon="❌"
          color="#991b1b"
        />
      </div>

      {/* ========================= */}
      {/* SALES CHART */}
      {/* ========================= */}

      <div style={{ marginTop: "30px" }}>
        <SalesChart />
      </div>

      {/* ========================= */}
      {/* TOP PRODUCTS + TOP CUSTOMERS */}
      {/* ========================= */}

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

      {/* ========================= */}
      {/* LOW STOCK */}
      {/* ========================= */}

      <div style={{ marginTop: "30px" }}>
        <LowStock />
      </div>

      {/* ========================= */}
      {/* RECENT ORDERS */}
      {/* ========================= */}

      <div style={{ marginTop: "30px" }}>
        <RecentOrders />
      </div>
    </div>
  );
}
