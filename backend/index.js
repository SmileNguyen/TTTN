require("dotenv").config();

const express = require("express");
const cors = require("cors");
const path = require("path");

const connectDB = require("./config/database");

const Product = require("./models/Product");

// ===============================
// ROUTES
// ===============================
const productRoutes = require("./routes/products");
const categoryRoutes = require("./routes/categories");
const orderRoutes = require("./routes/orders");
const customerRoutes = require("./routes/customers");
const supplierRoutes = require("./routes/suppliers");
const purchaseRoutes = require("./routes/purchases");
const statisticsRoutes = require("./routes/statistics");
const authRoutes = require("./routes/auth");

// ✅ THÊM DÒNG NÀY
const usersRoutes = require("./routes/users");

const app = express();

// ===============================
// CONNECT DATABASE
// ===============================
connectDB();

// ===============================
// MIDDLEWARE
// ===============================
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ===============================
// STATIC FILE
// ===============================
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ===============================
// API ROUTES
// ===============================
app.use("/auth", authRoutes);

// ✅ THÊM DÒNG NÀY
app.use("/users", usersRoutes);

app.use("/products", productRoutes);
app.use("/categories", categoryRoutes);

app.use("/customers", customerRoutes);
app.use("/suppliers", supplierRoutes);

app.use("/purchases", purchaseRoutes);
app.use("/orders", orderRoutes);

app.use("/statistics", statisticsRoutes);

// ===============================
// HOME
// ===============================
app.get("/", (req, res) => {
  res.send("🚀 POS Backend Running!");
});

// ===============================
// TEST DATABASE
// ===============================
app.get("/test", async (req, res) => {
  try {
    const products = await Product.find();

    res.json({
      success: true,
      total: products.length,
      data: products,
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

// ===============================
// 404
// ===============================
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "API Not Found",
  });
});

// ===============================
// START SERVER
// ===============================
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.clear();

  console.log("=========================================");
  console.log("🚀 POS Backend Running Successfully");
  console.log(`🌐 Server       : http://localhost:${PORT}`);
  console.log(`🔐 Auth         : http://localhost:${PORT}/auth/login`);
  console.log(`👥 Users        : http://localhost:${PORT}/users`);
  console.log(`📂 Upload       : http://localhost:${PORT}/uploads`);
  console.log(`📦 Product      : http://localhost:${PORT}/products`);
  console.log(`🗂 Category     : http://localhost:${PORT}/categories`);
  console.log(`🧾 Order        : http://localhost:${PORT}/orders`);
  console.log(`👤 Customer     : http://localhost:${PORT}/customers`);
  console.log(`🏭 Supplier     : http://localhost:${PORT}/suppliers`);
  console.log(`📥 Purchase     : http://localhost:${PORT}/purchases`);
  console.log(
    `📊 Statistics   : http://localhost:${PORT}/statistics/dashboard`
  );
  console.log("=========================================");
});
