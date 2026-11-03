import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function Sidebar() {
  const location = useLocation();

  const menuStyle = (path) => ({
    display: "flex",
    alignItems: "center",
    gap: "10px",

    padding: "12px 15px",
    marginBottom: "8px",

    borderRadius: "8px",

    textDecoration: "none",

    color: "#fff",

    background: location.pathname === path ? "#2563eb" : "transparent",

    transition: ".2s",

    fontWeight: location.pathname === path ? "bold" : "normal",
  });

  return (
    <div
      style={{
        width: 240,
        background: "#1e293b",
        color: "#fff",

        height: "100vh",

        padding: 20,

        boxSizing: "border-box",

        display: "flex",
        flexDirection: "column",
      }}
    >
      <h2
        style={{
          textAlign: "center",
          marginBottom: 30,
        }}
      >
        🛒 POS System
      </h2>

      <nav>
        <Link to="/dashboard" style={menuStyle("/dashboard")}>
          📊 Dashboard
        </Link>

        <Link to="/pos" style={menuStyle("/pos")}>
          🛍️ Bán hàng
        </Link>

        <Link to="/products" style={menuStyle("/products")}>
          📦 Sản phẩm
        </Link>

        <Link to="/categories" style={menuStyle("/categories")}>
          🗂 Danh mục
        </Link>

        <Link to="/customers" style={menuStyle("/customers")}>
          👥 Khách hàng
        </Link>

        <Link to="/suppliers" style={menuStyle("/suppliers")}>
          🏭 Nhà cung cấp
        </Link>

        <Link to="/purchases" style={menuStyle("/purchases")}>
          📥 Nhập hàng
        </Link>

        <Link to="/orders" style={menuStyle("/orders")}>
          🧾 Hóa đơn
        </Link>

        <Link to="/statistics" style={menuStyle("/statistics")}>
          📈 Thống kê
        </Link>

        <Link to="/users" style={menuStyle("/users")}>
          👤 Người dùng
        </Link>
      </nav>

      <div
        style={{
          marginTop: "auto",

          borderTop: "1px solid rgba(255,255,255,.15)",

          paddingTop: 15,

          fontSize: 13,

          color: "#cbd5e1",

          textAlign: "center",
        }}
      >
        POS Management System by Nguyễn Trần Tài
        <br />
        Version 13.4.3 (Build 130403)
      </div>
    </div>
  );
}
