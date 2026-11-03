const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

// =======================================
// USER
// =======================================

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
      minlength: 6,
    },

    full_name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      default: "",
      trim: true,
      lowercase: true,
    },

    phone: {
      type: String,
      default: "",
      trim: true,
    },

    avatar: {
      type: String,
      default: "",
    },

    role: {
      type: String,
      enum: ["Admin", "Manager", "Cashier", "Warehouse"],
      default: "Cashier",
    },

    permissions: [
      {
        type: String,
      },
    ],

    is_active: {
      type: Boolean,
      default: true,
    },

    last_login: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

// =======================================
// HASH PASSWORD
// =======================================

UserSchema.pre("save", async function () {
  if (!this.isModified("password")) return;

  const salt = await bcrypt.genSalt(10);

  this.password = await bcrypt.hash(this.password, salt);
});

// =======================================
// COMPARE PASSWORD
// =======================================

UserSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// =======================================
// REMOVE PASSWORD WHEN RETURNING JSON
// =======================================

UserSchema.methods.toJSON = function () {
  const obj = this.toObject();

  delete obj.password;

  return obj;
};

module.exports = mongoose.model("User", UserSchema);
