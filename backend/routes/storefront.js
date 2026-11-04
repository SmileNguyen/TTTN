const express = require("express");
const router = express.Router();
const {
  getPublicProducts,
  createOnlineOrder,
} = require("../controllers/storefrontController");

router.get("/products", getPublicProducts);
router.post("/orders", createOnlineOrder);

module.exports = router;
