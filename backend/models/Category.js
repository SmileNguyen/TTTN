const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    // ===========================
    // Tên danh mục
    // ===========================
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },

    // ===========================
    // Mã danh mục
    // Ví dụ:
    // CPU
    // RAM
    // SSD
    // VGA
    // ===========================
    code: {
      type: String,
      required: true,
      trim: true,
      uppercase: true,
      unique: true,
    },

    // ===========================
    // Mô tả
    // ===========================
    description: {
      type: String,
      default: "",
    },

    // ===========================
    // Trạng thái
    // true = đang sử dụng
    // false = ngừng sử dụng
    // ===========================
    status: {
      type: Boolean,
      default: true,
    },

    // ===========================
    // Thứ tự hiển thị
    // ===========================
    sortOrder: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Category", categorySchema);
