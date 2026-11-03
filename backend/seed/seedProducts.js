require("dotenv").config();

const mongoose = require("mongoose");

const connectDB = require("../config/database");

const Product = require("../models/Product");

// ===== IMPORT DATA =====
const cpus = require("./data/cpu");
const gpus = require("./data/gpu");
const mainboards = require("./data/mainboard");
const rams = require("./data/ram");
const ssds = require("./data/ssd");

// Gộp toàn bộ
const products = [...cpus, ...gpus, ...mainboards, ...rams, ...ssds];

async function seedProducts() {
  try {
    await connectDB();

    console.log("Đã kết nối MongoDB");

    // Nếu muốn xóa dữ liệu cũ
    await Product.deleteMany({});

    console.log("Đã xóa dữ liệu cũ");

    await Product.insertMany(products);

    console.log(`Đã tạo ${products.length} sản phẩm`);

    mongoose.connection.close();

    console.log("Hoàn thành");
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

seedProducts();
