const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema(
  {
    full_name: {
      type: String,
      required: true,
      trim: true,
    },

    phone: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    email: {
      type: String,
      default: "",
      trim: true,
    },

    gender: {
      type: String,
      enum: ["Nam", "Nữ", "Khác"],
      default: "Khác",
    },

    birthday: {
      type: Date,
    },

    address: {
      type: String,
      default: "",
    },

    points: {
      type: Number,
      default: 0,
    },

    total_orders: {
      type: Number,
      default: 0,
    },

    total_spent: {
      type: Number,
      default: 0,
    },

    note: {
      type: String,
      default: "",
    },

    status: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Customer", customerSchema);
