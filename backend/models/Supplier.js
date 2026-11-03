const mongoose = require("mongoose");

// =======================================
// SUPPLIER
// =======================================
const SupplierSchema = new mongoose.Schema(
  {
    supplier_code: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },

    phone: {
      type: String,
      default: "",
      trim: true,
    },

    email: {
      type: String,
      default: "",
      trim: true,
    },

    address: {
      type: String,
      default: "",
      trim: true,
    },

    tax_code: {
      type: String,
      default: "",
      trim: true,
    },

    contact_person: {
      type: String,
      default: "",
      trim: true,
    },

    bank_name: {
      type: String,
      default: "",
      trim: true,
    },

    bank_account: {
      type: String,
      default: "",
      trim: true,
    },

    note: {
      type: String,
      default: "",
      trim: true,
    },

    // ==========================
    // Status
    // ==========================
    status: {
      type: String,
      enum: ["Active", "Inactive"],
      default: "Active",
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Supplier", SupplierSchema);
