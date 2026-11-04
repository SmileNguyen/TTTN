const Order = require("../models/Order");
const Product = require("../models/Product");
const Customer = require("../models/Customer");

// ===========================================
// Sinh mã hóa đơn
// ===========================================
async function generateInvoiceCode() {
  const count = await Order.countDocuments();

  return "HD" + String(count + 1).padStart(6, "0");
}

// ===========================================
// GET ALL ORDERS
// ===========================================
exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({
      createdAt: -1,
    });

    res.json(orders);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

// ===========================================
// GET ORDER BY ID
// ===========================================
exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        message: "Không tìm thấy hóa đơn",
      });
    }

    res.json(order);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

// ===========================================
// CREATE ORDER
// ===========================================
exports.createOrder = async (req, res) => {
  try {
    const {
      customer,
      customer_name,
      employee_name,
      payment_method,
      paid,
      discount,
      note,
      items,
    } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({
        message: "Giỏ hàng đang trống",
      });
    }

    let subtotal = 0;

    const orderItems = [];

    // ===============================
    // Kiểm tra tồn kho
    // ===============================
    for (const item of items) {
      const product = await Product.findById(item.product);

      if (!product) {
        return res.status(400).json({
          message: `${item.product_name} không tồn tại`,
        });
      }

      if (product.stock < item.quantity) {
        return res.status(400).json({
          message: `${product.name} không đủ tồn kho`,
        });
      }

      product.stock -= item.quantity;

      await product.save();

      const total = product.sale_price * item.quantity;

      subtotal += total;

      orderItems.push({
        product: product._id,
        product_name: product.name,
        sku: product.sku,
        price: product.sale_price,
        quantity: item.quantity,
        total,
      });
    }

    const finalDiscount = Number(discount || 0);

    const total = subtotal - finalDiscount;

    const finalPaid = Number(paid || 0);

    const change = finalPaid - total;

    const invoice_code = await generateInvoiceCode();

    const order = await Order.create({
      invoice_code,

      customer: customer || null,

      customer_name: customer_name || "Khách lẻ",

      employee_name: employee_name || "Admin",

      payment_method: payment_method || "Tiền mặt",

      note,

      subtotal,

      discount: finalDiscount,

      total,

      paid: finalPaid,

      change,

      items: orderItems,
    });

    // ======================================
    // Cộng điểm khách hàng
    // ======================================
    if (customer) {
      const customerData = await Customer.findById(customer);

      if (customerData) {
        // 1 điểm = 10.000đ
        const earnedPoint = Math.floor(total / 10000);

        customerData.point += earnedPoint;

        // Tự nâng hạng
        if (customerData.point >= 5000) {
          customerData.level = "VIP";
        } else if (customerData.point >= 2000) {
          customerData.level = "Gold";
        } else if (customerData.point >= 500) {
          customerData.level = "Silver";
        } else {
          customerData.level = "Member";
        }

        await customerData.save();
      }
    }

    res.status(201).json(order);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

// ===========================================
// DELETE ORDER
// ===========================================
exports.deleteOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        message: "Không tìm thấy hóa đơn",
      });
    }

    // Hoàn lại tồn kho
    for (const item of order.items) {
      const product = await Product.findById(item.product);

      if (product) {
        product.stock += item.quantity;

        await product.save();
      }
    }

    await Order.findByIdAndDelete(req.params.id);

    res.json({
      message: "Đã xóa hóa đơn",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};


// ===========================================
// CONFIRM ONLINE ORDER
// ===========================================
exports.updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body || {};
    if (status !== "Confirmed") {
      return res.status(400).json({ message: "Trạng thái cập nhật không hợp lệ" });
    }

    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: "Không tìm thấy đơn hàng" });
    }
    if (order.source !== "Online") {
      return res.status(400).json({ message: "Chỉ áp dụng cho đơn hàng Online" });
    }
    if (order.status !== "Pending") {
      return res.status(409).json({ message: "Đơn hàng không còn ở trạng thái chờ xác nhận" });
    }

    order.status = "Confirmed";
    await order.save();
    return res.json({ message: "Đã xác nhận đơn hàng", order });
  } catch (error) {
    console.error("updateOrderStatus:", error);
    return res.status(500).json({ message: "Không thể cập nhật trạng thái đơn hàng" });
  }
};
