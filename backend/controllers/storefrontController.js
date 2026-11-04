const Product = require("../models/Product");
const Order = require("../models/Order");

// Public catalog: expose only active products and never expose cost_price.
exports.getPublicProducts = async (req, res) => {
  try {
    const { keyword = "", category = "" } = req.query;
    const filter = { status: true };
    if (keyword.trim()) {
      filter.$or = [
        { name: { $regex: keyword.trim(), $options: "i" } },
        { sku: { $regex: keyword.trim(), $options: "i" } },
        { description: { $regex: keyword.trim(), $options: "i" } },
      ];
    }
    if (category) filter.category = category;

    const products = await Product.find(filter)
      .select("name sku category sale_price stock image description status")
      .populate("category", "name code icon")
      .sort({ createdAt: -1 })
      .lean();

    res.json(products);
  } catch (error) {
    console.error("getPublicProducts:", error);
    res.status(500).json({ message: "Không thể tải danh sách sản phẩm" });
  }
};

// Online checkout. Stock is deducted here exactly once; admin processing must
// not deduct it again. Deleting/cancelling through the existing order flow
// restores the reserved quantity.
exports.createOnlineOrder = async (req, res) => {
  const reserved = [];
  try {
    const {
      customer_name,
      customer_phone,
      customer_email,
      shipping_address,
      note,
      items,
    } = req.body || {};

    if (!customer_name?.trim() || !customer_phone?.trim() || !shipping_address?.trim()) {
      return res.status(400).json({
        message: "Vui lòng nhập họ tên, số điện thoại và địa chỉ nhận hàng",
      });
    }
    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: "Giỏ hàng đang trống" });
    }

    // Merge repeated product IDs and validate quantities before reserving stock.
    const quantities = new Map();
    for (const item of items) {
      const id = String(item.product || "");
      const quantity = Number(item.quantity);
      if (!id || !Number.isInteger(quantity) || quantity < 1 || quantity > 99) {
        return res.status(400).json({ message: "Thông tin sản phẩm hoặc số lượng không hợp lệ" });
      }
      quantities.set(id, (quantities.get(id) || 0) + quantity);
    }

    let subtotal = 0;
    const orderItems = [];

    for (const [id, quantity] of quantities.entries()) {
      // Atomic conditional decrement prevents two customers buying the last item.
      const product = await Product.findOneAndUpdate(
        { _id: id, status: true, stock: { $gte: quantity } },
        { $inc: { stock: -quantity } },
        { new: true }
      );

      if (!product) {
        throw new Error("Một sản phẩm đã hết hàng hoặc không đủ số lượng. Vui lòng tải lại giỏ hàng.");
      }

      reserved.push({ productId: product._id, quantity });
      const lineTotal = Number(product.sale_price) * quantity;
      subtotal += lineTotal;
      orderItems.push({
        product: product._id,
        product_name: product.name,
        sku: product.sku,
        price: Number(product.sale_price),
        quantity,
        total: lineTotal,
      });
    }

    const invoice_code = `WEB${Date.now()}`;
    const order = await Order.create({
      invoice_code,
      customer_name: customer_name.trim(),
      employee_name: "Đơn hàng trực tuyến",
      customer_phone: customer_phone.trim(),
      customer_email: (customer_email || "").trim(),
      shipping_address: shipping_address.trim(),
      source: "Online",
      status: "Pending",
      payment_method: "COD",
      note: (note || "").trim(),
      subtotal,
      discount: 0,
      total: subtotal,
      paid: 0,
      change: 0,
      items: orderItems,
    });

    return res.status(201).json({
      message: "Đặt hàng thành công",
      order: {
        _id: order._id,
        invoice_code: order.invoice_code,
        customer_name: order.customer_name,
        total: order.total,
        status: order.status,
        createdAt: order.createdAt,
      },
    });
  } catch (error) {
    // Restore any stock reserved earlier in this request if a later step fails.
    await Promise.all(
      reserved.map(({ productId, quantity }) =>
        Product.updateOne({ _id: productId }, { $inc: { stock: quantity } })
      )
    );
    console.error("createOnlineOrder:", error);
    const clientError = /hết hàng|không đủ số lượng/i.test(error.message);
    return res.status(clientError ? 409 : 500).json({
      message: clientError ? error.message : "Không thể tạo đơn hàng lúc này",
    });
  }
};
