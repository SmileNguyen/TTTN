const mongoose = require("mongoose");

// ======================================
// PURCHASE ITEM
// ======================================
const PurchaseItemSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },

    product_name: {
      type: String,
      required: true,
    },

    sku: {
      type: String,
      default: "",
    },

    cost_price: {
      type: Number,
      required: true,
      default: 0,
    },

    quantity: {
      type: Number,
      required: true,
      default: 1,
    },

    total: {
      type: Number,
      default: 0,
    },
  },
  {
    _id: false,
  }
);

// ======================================
// PURCHASE
// ======================================
const PurchaseSchema = new mongoose.Schema(
  {
    purchase_code: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    supplier: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Supplier",
      required: true,
    },

    supplier_name: {
      type: String,
      required: true,
    },

    employee_name: {
      type: String,
      default: "Admin",
    },

    items: {
      type: [PurchaseItemSchema],
      default: [],
    },

    subtotal: {
      type: Number,
      default: 0,
    },

    discount: {
      type: Number,
      default: 0,
    },

    total: {
      type: Number,
      default: 0,
    },

    note: {
      type: String,
      default: "",
    },

    status: {
      type: String,
      enum: ["Pending", "Received", "Cancelled"],
      default: "Pending",
    },

    received_at: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Purchase", PurchaseSchema);
