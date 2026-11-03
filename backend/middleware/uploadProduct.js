const multer = require("multer");
const path = require("path");
const fs = require("fs");

// ===============================
// Create uploads folder
// ===============================
const uploadPath = path.join(__dirname, "../uploads/products");

if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, {
    recursive: true,
  });
}

// ===============================
// Storage
// ===============================
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, uploadPath);
  },

  filename(req, file, cb) {
    const ext = path.extname(file.originalname);

    const fileName =
      Date.now() + "-" + Math.round(Math.random() * 1000000) + ext;

    cb(null, fileName);
  },
});

// ===============================
// File Filter
// ===============================
const fileFilter = (req, file, cb) => {
  const allow = ["image/png", "image/jpeg", "image/jpg", "image/webp"];

  if (allow.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Chỉ cho phép upload ảnh PNG/JPG/JPEG/WEBP"));
  }
};

// ===============================
// Upload
// ===============================
module.exports = multer({
  storage,
  fileFilter,

  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});
