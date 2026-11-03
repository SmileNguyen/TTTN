const express = require("express");

const router = express.Router();

const { verifyToken } = require("../middleware/authMiddleware");
const { allowRoles } = require("../middleware/roleMiddleware");

const {
  getCustomers,
  getCustomer,
  createCustomer,
  updateCustomer,
  deleteCustomer,
} = require("../controllers/customersController");

// ======================================
// GET ALL CUSTOMERS
// Admin - Manager - Cashier
// ======================================
router.get(
  "/",
  verifyToken,
  allowRoles("Admin", "Manager", "Cashier"),
  getCustomers
);

// ======================================
// GET CUSTOMER BY ID
// Admin - Manager - Cashier
// ======================================
router.get(
  "/:id",
  verifyToken,
  allowRoles("Admin", "Manager", "Cashier"),
  getCustomer
);

// ======================================
// CREATE CUSTOMER
// Admin - Manager - Cashier
// ======================================
router.post(
  "/",
  verifyToken,
  allowRoles("Admin", "Manager", "Cashier"),
  createCustomer
);

// ======================================
// UPDATE CUSTOMER
// Admin - Manager - Cashier
// ======================================
router.put(
  "/:id",
  verifyToken,
  allowRoles("Admin", "Manager", "Cashier"),
  updateCustomer
);

// ======================================
// DELETE CUSTOMER
// Chỉ Admin và Manager
// ======================================
router.delete(
  "/:id",
  verifyToken,
  allowRoles("Admin", "Manager"),
  deleteCustomer
);

module.exports = router;
