const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    // ===============================
    // Thông tin cơ bản
    // ===============================
    name: {
      type: String,
      required: true,
      trim: true,
    },

    sku: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    barcode: {
      type: String,
      default: "",
      trim: true,
    },

    // ===============================
    // Danh mục
    // ===============================
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },

    // ===============================
    // Giá
    // ===============================
    cost_price: {
      type: Number,
      default: 0,
      min: 0,
    },

    sale_price: {
      type: Number,
      default: 0,
      min: 0,
    },

    // ===============================
    // Kho
    // ===============================
    stock: {
      type: Number,
      default: 0,
      min: 0,
    },

    // ===============================
    // Hình ảnh
    // ===============================
    image: {
      type: String,
      default: "",
    },

    // ===============================
    // Mô tả
    // ===============================
    description: {
      type: String,
      default: "",
    },

    // ===============================
    // Trạng thái
    // ===============================
    status: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Product", productSchema);
