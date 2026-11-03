require("dotenv").config();

const mongoose = require("mongoose");

const connectDB = require("./config/database");
const User = require("./models/User");

async function seedAdmin() {
  try {
    await connectDB();

    const admin = await User.findOne({
      username: "admin",
    });

    if (admin) {
      console.log("====================================");
      console.log("⚠️ Admin đã tồn tại.");
      console.log("Username : admin");
      console.log("====================================");

      process.exit(0);
    }

    await User.create({
      username: "admin",
      password: "123456",
      full_name: "[ADMIN] Tài Nguyễn aka NTT",
      email: "admin@pekoteam.site",
      phone: "",

      role: "Admin",

      permissions: [
        "dashboard",

        "products",
        "categories",

        "customers",
        "suppliers",

        "purchases",
        "orders",

        "statistics",

        "users",
      ],

      is_active: true,
    });

    console.log("====================================");
    console.log("✅ Tạo tài khoản Admin thành công");
    console.log("------------------------------------");
    console.log("Username : admin");
    console.log("Password : 123456");
    console.log("Role     : Admin");
    console.log("====================================");
  } catch (err) {
    console.error(err);
  } finally {
    mongoose.connection.close();
  }
}

seedAdmin();
