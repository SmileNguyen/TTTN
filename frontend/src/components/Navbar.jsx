import React from "react";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  // Lấy thông tin user
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    // Xóa toàn bộ dữ liệu đăng nhập
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    // Quay về Login
    navigate("/", { replace: true });

    // Reload để ProtectedRoute kiểm tra lại
    window.location.reload();
  };

  return (
    <div
      style={{
        height: "70px",
        background: "#ffffff",
        borderBottom: "1px solid #e5e7eb",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0 25px",
        boxSizing: "border-box",
      }}
    >
      {/* Left */}
      <h2
        style={{
          margin: 0,
          color: "#1e293b",
        }}
      >
        Dashboard
      </h2>

      {/* Right */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "20px",
          fontSize: "18px",
        }}
      >
        <span style={{ cursor: "pointer" }}>🔔</span>

        <span style={{ cursor: "pointer" }}>⚙️</span>

        <span
          style={{
            fontWeight: "bold",
          }}
        >
          👤 {user?.full_name || user?.username || "User"}
        </span>

        <button
          onClick={handleLogout}
          style={{
            background: "#ef4444",
            color: "white",
            border: "none",
            padding: "8px 15px",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          Đăng xuất
        </button>
      </div>
    </div>
  );
}
