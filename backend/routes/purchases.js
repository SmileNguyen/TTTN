const express = require("express");

const router = express.Router();

const { verifyToken } = require("../middleware/authMiddleware");
const { allowRoles } = require("../middleware/roleMiddleware");

const {
  getPurchases,
  getPurchase,
  createPurchase,
  updatePurchase,
  deletePurchase,
  receivePurchase,
} = require("../controllers/purchaseController");

// ======================================
// GET ALL PURCHASES
// Admin - Manager - Warehouse
// ======================================
router.get(
  "/",
  verifyToken,
  allowRoles("Admin", "Manager", "Warehouse"),
  getPurchases
);

// ======================================
// GET PURCHASE BY ID
// Admin - Manager - Warehouse
// ======================================
router.get(
  "/:id",
  verifyToken,
  allowRoles("Admin", "Manager", "Warehouse"),
  getPurchase
);

// ======================================
// CREATE PURCHASE
// Admin - Manager - Warehouse
// ======================================
router.post(
  "/",
  verifyToken,
  allowRoles("Admin", "Manager", "Warehouse"),
  createPurchase
);

// ======================================
// UPDATE PURCHASE
// Admin - Manager - Warehouse
// ======================================
router.put(
  "/:id",
  verifyToken,
  allowRoles("Admin", "Manager", "Warehouse"),
  updatePurchase
);

// ======================================
// RECEIVE PURCHASE (Nhập kho)
// Chỉ Admin và Warehouse
// ======================================
router.put(
  "/:id/receive",
  verifyToken,
  allowRoles("Admin", "Warehouse"),
  receivePurchase
);

// ======================================
// DELETE PURCHASE
// Chỉ Admin và Manager
// ======================================
router.delete(
  "/:id",
  verifyToken,
  allowRoles("Admin", "Manager"),
  deletePurchase
);

module.exports = router;
