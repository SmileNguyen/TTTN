const Customer = require("../models/Customer");

// ======================================
// GET ALL CUSTOMERS
// ======================================
exports.getCustomers = async (req, res) => {
  try {
    const customers = await Customer.find().sort({
      createdAt: -1,
    });

    res.json(customers);
  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

// ======================================
// GET CUSTOMER BY ID
// ======================================
exports.getCustomer = async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id);

    if (!customer) {
      return res.status(404).json({
        message: "Không tìm thấy khách hàng",
      });
    }

    res.json(customer);
  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

// ======================================
// CREATE CUSTOMER
// ======================================
exports.createCustomer = async (req, res) => {
  try {
    const phoneExists = await Customer.findOne({
      phone: req.body.phone,
    });

    if (phoneExists) {
      return res.status(400).json({
        message: "Số điện thoại đã tồn tại",
      });
    }

    const customer = await Customer.create(req.body);

    res.status(201).json(customer);
  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

// ======================================
// UPDATE CUSTOMER
// ======================================
exports.updateCustomer = async (req, res) => {
  try {
    const phoneExists = await Customer.findOne({
      phone: req.body.phone,
      _id: { $ne: req.params.id },
    });

    if (phoneExists) {
      return res.status(400).json({
        message: "Số điện thoại đã tồn tại",
      });
    }

    const customer = await Customer.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!customer) {
      return res.status(404).json({
        message: "Không tìm thấy khách hàng",
      });
    }

    res.json(customer);
  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

// ======================================
// DELETE CUSTOMER
// ======================================
exports.deleteCustomer = async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id);

    if (!customer) {
      return res.status(404).json({
        message: "Không tìm thấy khách hàng",
      });
    }

    await Customer.findByIdAndDelete(req.params.id);

    res.json({
      message: "Đã xóa khách hàng",
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: "Server Error",
    });
  }
};
