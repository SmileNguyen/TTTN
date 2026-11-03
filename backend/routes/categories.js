const express = require("express");

const router = express.Router();

const { verifyToken } = require("../middleware/authMiddleware");
const { allowRoles } = require("../middleware/roleMiddleware");

const {
  getCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
  seedCategories,
} = require("../controllers/categoriesController");

// ======================================
// SEED DEFAULT CATEGORIES
// Admin
// ======================================
router.post("/seed", verifyToken, allowRoles("Admin"), seedCategories);

// ======================================
// GET ALL CATEGORIES
// Admin - Manager
// ======================================
router.get("/", verifyToken, allowRoles("Admin", "Manager"), getCategories);

// ======================================
// GET CATEGORY BY ID
// Admin - Manager
// ======================================
router.get(
  "/:id",
  verifyToken,
  allowRoles("Admin", "Manager"),
  getCategoryById
);

// ======================================
// CREATE CATEGORY
// Admin - Manager
// ======================================
router.post("/", verifyToken, allowRoles("Admin", "Manager"), createCategory);

// ======================================
// UPDATE CATEGORY
// Admin - Manager
// ======================================
router.put("/:id", verifyToken, allowRoles("Admin", "Manager"), updateCategory);

// ======================================
// DELETE CATEGORY
// Chỉ Admin
// ======================================
router.delete("/:id", verifyToken, allowRoles("Admin"), deleteCategory);

module.exports = router;
