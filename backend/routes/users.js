const express = require("express");

const router = express.Router();

const {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  resetPassword,
  toggleStatus,
} = require("../controllers/usersController");

const { verifyToken } = require("../middleware/authMiddleware");
const { allowRoles } = require("../middleware/roleMiddleware");

// =======================================
// Tất cả API User phải đăng nhập
// =======================================
router.use(verifyToken);

// =======================================
// GET ALL USERS
// Admin, Manager
// =======================================
router.get("/", allowRoles("Admin", "Manager"), getUsers);

// =======================================
// GET USER BY ID
// Admin, Manager
// =======================================
router.get("/:id", allowRoles("Admin", "Manager"), getUserById);

// =======================================
// CREATE USER
// Chỉ Admin
// =======================================
router.post("/", allowRoles("Admin"), createUser);

// =======================================
// UPDATE USER
// Chỉ Admin
// =======================================
router.put("/:id", allowRoles("Admin"), updateUser);

// =======================================
// DELETE USER
// Chỉ Admin
// =======================================
router.delete("/:id", allowRoles("Admin"), deleteUser);

// =======================================
// RESET PASSWORD
// Admin, Manager
// =======================================
router.put(
  "/:id/reset-password",
  allowRoles("Admin", "Manager"),
  resetPassword
);

// =======================================
// LOCK / UNLOCK USER
// Chỉ Admin
// =======================================
router.put("/:id/toggle-status", allowRoles("Admin"), toggleStatus);

module.exports = router;
