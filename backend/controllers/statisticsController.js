const Order = require("../models/Order");
const Product = require("../models/Product");
const Customer = require("../models/Customer");

// =======================================
// Dashboard Statistics
// =======================================
exports.getDashboardStatistics = async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const todayOrders = await Order.find({
      createdAt: {
        $gte: today,
      },
    });

    const todayRevenue = todayOrders.reduce(
      (sum, order) => sum + (order.total || 0),
      0
    );

    const customerCount = await Customer.countDocuments();

    const productCount = await Product.countDocuments();

    const lowStock = await Product.countDocuments({
      stock: {
        $gt: 0,
        $lte: 5,
      },
    });

    const outOfStock = await Product.countDocuments({
      stock: 0,
    });

    res.json({
      todayRevenue,
      todayOrders: todayOrders.length,
      customerCount,
      productCount,
      lowStock,
      outOfStock,
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

// =======================================
// Sales Chart (7 Days)
// =======================================
exports.getSalesChart = async (req, res) => {
  try {
    const days = [];

    for (let i = 6; i >= 0; i--) {
      const day = new Date();

      day.setDate(day.getDate() - i);

      day.setHours(0, 0, 0, 0);

      const next = new Date(day);

      next.setDate(next.getDate() + 1);

      const orders = await Order.find({
        createdAt: {
          $gte: day,
          $lt: next,
        },
      });

      const revenue = orders.reduce(
        (sum, order) => sum + (order.total || 0),
        0
      );

      days.push({
        date: day.toLocaleDateString("vi-VN", {
          day: "2-digit",
          month: "2-digit",
        }),
        revenue,
      });
    }

    res.json(days);
  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

// =======================================
// Top 5 Products
// =======================================
exports.getTopProducts = async (req, res) => {
  try {
    const orders = await Order.find();

    const map = {};

    orders.forEach((order) => {
      order.items.forEach((item) => {
        if (!map[item.product_name]) {
          map[item.product_name] = 0;
        }

        map[item.product_name] += item.quantity;
      });
    });

    const result = Object.keys(map)
      .map((name) => ({
        name,
        sold: map[name],
      }))
      .sort((a, b) => b.sold - a.sold)
      .slice(0, 5);

    res.json(result);
  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

// =======================================
// Recent Orders
// =======================================
exports.getRecentOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .sort({
        createdAt: -1,
      })
      .limit(10);

    res.json(orders);
  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

// =======================================
// Low Stock
// =======================================
exports.getLowStock = async (req, res) => {
  try {
    const products = await Product.find({
      stock: {
        $gt: 0,
        $lte: 5,
      },
    })
      .sort({
        stock: 1,
      })
      .limit(10);

    res.json(products);
  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

// =======================================
// Top Customers
// =======================================
exports.getTopCustomers = async (req, res) => {
  try {
    const orders = await Order.find();

    const map = {};

    orders.forEach((order) => {
      const name = order.customer_name || "Khách lẻ";

      if (!map[name]) {
        map[name] = {
          name,
          orders: 0,
          revenue: 0,
        };
      }

      map[name].orders += 1;
      map[name].revenue += order.total || 0;
    });

    const result = Object.values(map)
      .sort((a, b) => b.revenue - a.revenue)
      .slice(0, 10);

    res.json(result);
  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: "Server Error",
    });
  }
};
