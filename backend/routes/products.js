const express = require("express");

const router = express.Router();

const upload = require("../middleware/uploadProduct");

const { verifyToken } = require("../middleware/authMiddleware");
const { allowRoles } = require("../middleware/roleMiddleware");

const {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productsController");

// ======================================
// GET ALL PRODUCTS
// Admin - Manager - Warehouse
// ======================================
router.get(
  "/",
  verifyToken,
  allowRoles("Admin", "Manager", "Warehouse"),
  getProducts
);

// ======================================
// CREATE PRODUCT
// Admin - Manager - Warehouse
// ======================================
router.post(
  "/",
  verifyToken,
  allowRoles("Admin", "Manager", "Warehouse"),
  upload.single("image"),
  createProduct
);

// ======================================
// UPDATE PRODUCT
// Admin - Manager - Warehouse
// ======================================
router.put(
  "/:id",
  verifyToken,
  allowRoles("Admin", "Manager", "Warehouse"),
  upload.single("image"),
  updateProduct
);

// ======================================
// DELETE PRODUCT
// Chỉ Admin và Manager
// ======================================
router.delete(
  "/:id",
  verifyToken,
  allowRoles("Admin", "Manager"),
  deleteProduct
);

module.exports = router;
