import React from "react";
import { Navigate } from "react-router-dom";

import { useAuth } from "../contexts/AuthContext";

export default function ProtectedRoute({ children, roles = [] }) {
  const { loading, isAuthenticated, hasRole } = useAuth();

  // ===================================
  // Đợi AuthContext khởi tạo
  // ===================================
  if (loading) {
    return (
      <div
        style={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: 20,
          fontWeight: "bold",
        }}
      >
        Đang kiểm tra đăng nhập...
      </div>
    );
  }

  // ===================================
  // Chưa đăng nhập
  // ===================================
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  // ===================================
  // Không đủ quyền
  // ===================================
  if (roles.length > 0 && !hasRole(...roles)) {
    return (
      <div
        style={{
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <h1>🚫 Không có quyền truy cập</h1>

        <p>Bạn không có quyền sử dụng chức năng này.</p>
      </div>
    );
  }

  // ===================================
  // OK
  // ===================================
  return children;
}
