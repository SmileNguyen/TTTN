const Purchase = require("../models/Purchase");
const Product = require("../models/Product");
const Supplier = require("../models/Supplier");

// ======================================
// GET ALL PURCHASES
// ======================================
exports.getPurchases = async (req, res) => {
  try {
    const keyword = req.query.keyword || "";

    const filter = {};

    if (keyword) {
      filter.$or = [
        {
          purchase_code: {
            $regex: keyword,
            $options: "i",
          },
        },
        {
          supplier_name: {
            $regex: keyword,
            $options: "i",
          },
        },
      ];
    }

    const purchases = await Purchase.find(filter).sort({
      createdAt: -1,
    });

    res.json(purchases);
  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

// ======================================
// GET PURCHASE
// ======================================
exports.getPurchase = async (req, res) => {
  try {
    const purchase = await Purchase.findById(req.params.id);

    if (!purchase) {
      return res.status(404).json({
        message: "Purchase not found",
      });
    }

    res.json(purchase);
  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

// ======================================
// CREATE PURCHASE
// ======================================
exports.createPurchase = async (req, res) => {
  try {
    const supplier = await Supplier.findById(req.body.supplier);

    if (!supplier) {
      return res.status(404).json({
        message: "Supplier not found",
      });
    }

    const purchaseCount = await Purchase.countDocuments();

    const purchase_code = "PN" + String(purchaseCount + 1).padStart(6, "0");

    let subtotal = 0;

    const items = [];

    for (const item of req.body.items) {
      const product = await Product.findById(item.product);

      if (!product) continue;

      const total = Number(item.cost_price) * Number(item.quantity);

      subtotal += total;

      items.push({
        product: product._id,
        product_name: product.name,
        sku: product.sku,
        cost_price: Number(item.cost_price),
        quantity: Number(item.quantity),
        total,
      });
    }

    const discount = Number(req.body.discount || 0);

    const total = subtotal - discount;

    const purchase = await Purchase.create({
      purchase_code,
      supplier: supplier._id,
      supplier_name: supplier.name,
      employee_name: req.body.employee_name || "Admin",
      items,
      subtotal,
      discount,
      total,
      note: req.body.note || "",
      status: "Pending",
    });

    res.status(201).json(purchase);
  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

// ======================================
// UPDATE PURCHASE
// ======================================
exports.updatePurchase = async (req, res) => {
  try {
    const purchase = await Purchase.findById(req.params.id);

    if (!purchase) {
      return res.status(404).json({
        message: "Purchase not found",
      });
    }

    if (purchase.status === "Received") {
      return res.status(400).json({
        message: "Phiếu đã nhập kho không thể sửa.",
      });
    }

    const supplier = await Supplier.findById(req.body.supplier);

    if (!supplier) {
      return res.status(404).json({
        message: "Supplier not found",
      });
    }

    let subtotal = 0;
    const items = [];

    for (const item of req.body.items) {
      const product = await Product.findById(item.product);

      if (!product) continue;

      const total = Number(item.cost_price) * Number(item.quantity);

      subtotal += total;

      items.push({
        product: product._id,
        product_name: product.name,
        sku: product.sku,
        cost_price: Number(item.cost_price),
        quantity: Number(item.quantity),
        total,
      });
    }

    const discount = Number(req.body.discount || 0);

    purchase.supplier = supplier._id;
    purchase.supplier_name = supplier.name;
    purchase.employee_name = req.body.employee_name || purchase.employee_name;
    purchase.items = items;
    purchase.subtotal = subtotal;
    purchase.discount = discount;
    purchase.total = subtotal - discount;
    purchase.note = req.body.note || "";

    await purchase.save();

    res.json(purchase);
  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

// ======================================
// RECEIVE PURCHASE
// ======================================
exports.receivePurchase = async (req, res) => {
  try {
    const purchase = await Purchase.findById(req.params.id);

    if (!purchase) {
      return res.status(404).json({
        message: "Purchase not found",
      });
    }

    if (purchase.status === "Received") {
      return res.status(400).json({
        message: "Phiếu đã nhập kho.",
      });
    }

    for (const item of purchase.items) {
      const product = await Product.findById(item.product);

      if (!product) continue;

      product.stock += Number(item.quantity);

      await product.save();
    }

    purchase.status = "Received";

    await purchase.save();

    res.json({
      success: true,
      message: "Nhập kho thành công",
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

// ======================================
// DELETE PURCHASE
// ======================================
exports.deletePurchase = async (req, res) => {
  try {
    const purchase = await Purchase.findById(req.params.id);

    if (!purchase) {
      return res.status(404).json({
        message: "Purchase not found",
      });
    }

    if (purchase.status === "Received") {
      return res.status(400).json({
        message: "Không thể xóa phiếu đã nhập kho.",
      });
    }

    await Purchase.findByIdAndDelete(req.params.id);

    res.json({
      message: "Deleted successfully",
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: "Server Error",
    });
  }
};
