const express = require("express");
const router = express.Router();

const upload = require("../config/multer");

router.post("/", upload.single("image"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({
      message: "Không có file.",
    });
  }

  res.json({
    success: true,
    image: `/uploads/products/${req.file.filename}`,
  });
});

module.exports = router;
