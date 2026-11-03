const mongoose = require("mongoose");

// =======================================
// ACTIVITY LOG
// =======================================

const ActivityLogSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },

    username: {
      type: String,
      default: "",
      trim: true,
    },

    full_name: {
      type: String,
      default: "",
      trim: true,
    },

    role: {
      type: String,
      default: "",
      trim: true,
    },

    action: {
      type: String,
      required: true,
      trim: true,
    },

    module: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      default: "",
      trim: true,
    },

    ip_address: {
      type: String,
      default: "",
    },

    user_agent: {
      type: String,
      default: "",
    },

    status: {
      type: String,
      enum: ["Success", "Failed"],
      default: "Success",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("ActivityLog", ActivityLogSchema);
