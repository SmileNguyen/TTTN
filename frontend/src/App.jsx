import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import MainLayout from "./layouts/MainLayout";

import ProtectedRoute from "./components/ProtectedRoute";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import Categories from "./pages/Categories";
import Customers from "./pages/Customers";
import Suppliers from "./pages/Suppliers";
import Purchases from "./pages/Purchases";
import Orders from "./pages/Orders";
import POS from "./pages/POS";
import Statistics from "./pages/Statistics";
import Users from "./pages/Users";
import Storefront from "./pages/Storefront";

export default function App() {
  return (
    <Routes>
      <Route path="/shop" element={<Storefront />} />
      <Route path="/shop/*" element={<Storefront />} />
      {/* ===========================
          LOGIN
      =========================== */}
      <Route path="/" element={<Login />} />

      {/* ===========================
          HOME
      =========================== */}
      <Route path="/home" element={<Navigate to="/dashboard" replace />} />

      {/* ===========================
          DASHBOARD
      =========================== */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute roles={["Admin", "Manager", "Cashier", "Warehouse"]}>
            <MainLayout>
              <Dashboard />
            </MainLayout>
          </ProtectedRoute>
        }
      />

      {/* ===========================
          POS
      =========================== */}
      <Route
        path="/pos"
        element={
          <ProtectedRoute roles={["Admin", "Manager", "Cashier"]}>
            <MainLayout>
              <POS />
            </MainLayout>
          </ProtectedRoute>
        }
      />

      {/* ===========================
          PRODUCTS
      =========================== */}
      <Route
        path="/products"
        element={
          <ProtectedRoute roles={["Admin", "Manager", "Warehouse"]}>
            <MainLayout>
              <Products />
            </MainLayout>
          </ProtectedRoute>
        }
      />

      {/* ===========================
          CATEGORIES
      =========================== */}
      <Route
        path="/categories"
        element={
          <ProtectedRoute roles={["Admin", "Manager"]}>
            <MainLayout>
              <Categories />
            </MainLayout>
          </ProtectedRoute>
        }
      />

      {/* ===========================
          CUSTOMERS
      =========================== */}
      <Route
        path="/customers"
        element={
          <ProtectedRoute roles={["Admin", "Manager", "Cashier"]}>
            <MainLayout>
              <Customers />
            </MainLayout>
          </ProtectedRoute>
        }
      />

      {/* ===========================
          SUPPLIERS
      =========================== */}
      <Route
        path="/suppliers"
        element={
          <ProtectedRoute roles={["Admin", "Manager", "Warehouse"]}>
            <MainLayout>
              <Suppliers />
            </MainLayout>
          </ProtectedRoute>
        }
      />

      {/* ===========================
          PURCHASES
      =========================== */}
      <Route
        path="/purchases"
        element={
          <ProtectedRoute roles={["Admin", "Manager", "Warehouse"]}>
            <MainLayout>
              <Purchases />
            </MainLayout>
          </ProtectedRoute>
        }
      />

      {/* ===========================
          ORDERS
      =========================== */}
      <Route
        path="/orders"
        element={
          <ProtectedRoute roles={["Admin", "Manager", "Cashier"]}>
            <MainLayout>
              <Orders />
            </MainLayout>
          </ProtectedRoute>
        }
      />

      {/* ===========================
          STATISTICS
      =========================== */}
      <Route
        path="/statistics"
        element={
          <ProtectedRoute roles={["Admin", "Manager"]}>
            <MainLayout>
              <Statistics />
            </MainLayout>
          </ProtectedRoute>
        }
      />

      {/* ===========================
          USERS
      =========================== */}
      <Route
        path="/users"
        element={
          <ProtectedRoute roles={["Admin"]}>
            <MainLayout>
              <Users />
            </MainLayout>
          </ProtectedRoute>
        }
      />

      {/* ===========================
          404
      =========================== */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
