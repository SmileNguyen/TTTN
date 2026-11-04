const express = require("express");

const router = express.Router();

const { verifyToken } = require("../middleware/authMiddleware");
const { allowRoles } = require("../middleware/roleMiddleware");

const {
  getOrders,
  getOrderById,
  createOrder,
  deleteOrder,
  updateOrderStatus,
} = require("../controllers/orderController");

// ============================================
// GET ALL ORDERS
// Admin - Manager - Cashier
// ============================================
router.get(
  "/",
  verifyToken,
  allowRoles("Admin", "Manager", "Cashier"),
  getOrders
);

// ============================================
// GET ORDER BY ID
// Admin - Manager - Cashier
// ============================================
router.get(
  "/:id",
  verifyToken,
  allowRoles("Admin", "Manager", "Cashier"),
  getOrderById
);

// ============================================
// CREATE ORDER
// Admin - Manager - Cashier
// ============================================
router.post(
  "/",
  verifyToken,
  allowRoles("Admin", "Manager", "Cashier"),
  createOrder
);

// ============================================
// DELETE ORDER
// Chỉ Admin và Manager
// ============================================
router.patch("/:id/status", verifyToken, allowRoles("Admin", "Manager", "Cashier"), updateOrderStatus);

router.delete("/:id", verifyToken, allowRoles("Admin", "Manager"), deleteOrder);

module.exports = router;
