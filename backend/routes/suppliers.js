const express = require("express");

const router = express.Router();

const { verifyToken } = require("../middleware/authMiddleware");
const { allowRoles } = require("../middleware/roleMiddleware");

const {
  getSuppliers,
  getSupplierById,
  createSupplier,
  updateSupplier,
  deleteSupplier,
} = require("../controllers/supplierController");

// =======================================
// GET ALL SUPPLIERS
// Admin - Manager - Warehouse
// =======================================
router.get(
  "/",
  verifyToken,
  allowRoles("Admin", "Manager", "Warehouse"),
  getSuppliers
);

// =======================================
// GET SUPPLIER BY ID
// Admin - Manager - Warehouse
// =======================================
router.get(
  "/:id",
  verifyToken,
  allowRoles("Admin", "Manager", "Warehouse"),
  getSupplierById
);

// =======================================
// CREATE SUPPLIER
// Admin - Manager - Warehouse
// =======================================
router.post(
  "/",
  verifyToken,
  allowRoles("Admin", "Manager", "Warehouse"),
  createSupplier
);

// =======================================
// UPDATE SUPPLIER
// Admin - Manager - Warehouse
// =======================================
router.put(
  "/:id",
  verifyToken,
  allowRoles("Admin", "Manager", "Warehouse"),
  updateSupplier
);

// =======================================
// DELETE SUPPLIER
// Chỉ Admin và Manager
// =======================================
router.delete(
  "/:id",
  verifyToken,
  allowRoles("Admin", "Manager"),
  deleteSupplier
);

module.exports = router;
