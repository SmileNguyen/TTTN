const mongoose = require("mongoose");

// ======================================
// ORDER ITEM
// ======================================
const OrderItemSchema = new mongoose.Schema(
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

    price: {
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
      required: true,
      default: 0,
    },
  },
  {
    _id: false,
  }
);

// ======================================
// ORDER
// ======================================
const OrderSchema = new mongoose.Schema(
  {
    invoice_code: {
      type: String,
      required: true,
      unique: true,
    },

    customer_name: {
      type: String,
      default: "Khách lẻ",
    },

    employee_name: {
      type: String,
      default: "Admin",
    },

    customer_phone: { type: String, default: "" },
    customer_email: { type: String, default: "" },
    shipping_address: { type: String, default: "" },
    source: { type: String, enum: ["POS", "Online"], default: "POS" },

    items: {
      type: [OrderItemSchema],
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

    paid: {
      type: Number,
      default: 0,
    },

    change: {
      type: Number,
      default: 0,
    },

    payment_method: {
      type: String,
      default: "Tiền mặt",
    },

    note: {
      type: String,
      default: "",
    },

    status: {
      type: String,
      enum: ["Pending", "Confirmed", "Shipping", "Completed", "Cancelled"],
      default: "Completed",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Order", OrderSchema);
