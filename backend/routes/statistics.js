const express = require("express");

const router = express.Router();

const { verifyToken } = require("../middleware/authMiddleware");
const { allowRoles } = require("../middleware/roleMiddleware");

const {
  getDashboardStatistics,
  getSalesChart,
  getTopProducts,
  getRecentOrders,
  getLowStock,
  getTopCustomers,
} = require("../controllers/statisticsController");

// =======================================
// Dashboard
// Admin - Manager
// =======================================
router.get(
  "/dashboard",
  verifyToken,
  allowRoles("Admin", "Manager"),
  getDashboardStatistics
);

// =======================================
// Sales Chart
// Admin - Manager
// =======================================
router.get(
  "/sales-chart",
  verifyToken,
  allowRoles("Admin", "Manager"),
  getSalesChart
);

// =======================================
// Top Products
// Admin - Manager
// =======================================
router.get(
  "/top-products",
  verifyToken,
  allowRoles("Admin", "Manager"),
  getTopProducts
);

// =======================================
// Recent Orders
// Admin - Manager
// =======================================
router.get(
  "/recent-orders",
  verifyToken,
  allowRoles("Admin", "Manager"),
  getRecentOrders
);

// =======================================
// Low Stock
// Admin - Manager
// =======================================
router.get(
  "/low-stock",
  verifyToken,
  allowRoles("Admin", "Manager"),
  getLowStock
);

// =======================================
// Top Customers
// Admin - Manager
// =======================================
router.get(
  "/top-customers",
  verifyToken,
  allowRoles("Admin", "Manager"),
  getTopCustomers
);

module.exports = router;
