const multer = require("multer");
const path = require("path");
const fs = require("fs");

// ================================
// Upload Folder
// ================================
const uploadPath = path.join(__dirname, "../uploads/products");

if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, {
    recursive: true,
  });
}

// ================================
// Storage
// ================================
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, uploadPath);
  },

  filename(req, file, cb) {
    const ext = path.extname(file.originalname);

    cb(null, Date.now() + "-" + Math.floor(Math.random() * 1000000) + ext);
  },
});

// ================================
// Image Filter
// ================================
const fileFilter = (req, file, cb) => {
  const allow = /\.(jpg|jpeg|png|webp)$/i;

  if (allow.test(file.originalname)) {
    cb(null, true);
  } else {
    cb(new Error("Chỉ hỗ trợ JPG PNG WEBP"));
  }
};

// ================================
// Upload
// ================================
module.exports = multer({
  storage,
  fileFilter,

  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});
