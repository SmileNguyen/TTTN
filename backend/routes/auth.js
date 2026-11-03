const express = require("express");

const router = express.Router();

const {
  login,
  profile,
  changePassword,
  logout,
  refreshToken,
} = require("../controllers/authController");

const { authenticate, authorize } = require("../middleware/auth");

router.post("/login", login);

router.get("/profile", authenticate, profile);

router.put("/change-password", authenticate, changePassword);

router.post("/logout", authenticate, logout);

router.post("/refresh", authenticate, refreshToken);

module.exports = router;
