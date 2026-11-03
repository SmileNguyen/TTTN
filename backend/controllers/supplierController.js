const Supplier = require("../models/Supplier");

// =======================================
// Sinh mã nhà cung cấp
// =======================================
async function generateSupplierCode() {
  const count = await Supplier.countDocuments();

  return "NCC" + String(count + 1).padStart(6, "0");
}

// =======================================
// GET ALL SUPPLIERS
// =======================================
exports.getSuppliers = async (req, res) => {
  try {
    const keyword = req.query.keyword || "";

    const filter = {};

    if (keyword.trim() !== "") {
      filter.$or = [
        {
          name: {
            $regex: keyword,
            $options: "i",
          },
        },
        {
          phone: {
            $regex: keyword,
            $options: "i",
          },
        },
        {
          email: {
            $regex: keyword,
            $options: "i",
          },
        },
        {
          supplier_code: {
            $regex: keyword,
            $options: "i",
          },
        },
      ];
    }

    const suppliers = await Supplier.find(filter).sort({
      createdAt: -1,
    });

    res.json(suppliers);
  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

// =======================================
// GET SUPPLIER BY ID
// =======================================
exports.getSupplierById = async (req, res) => {
  try {
    const supplier = await Supplier.findById(req.params.id);

    if (!supplier) {
      return res.status(404).json({
        message: "Không tìm thấy nhà cung cấp",
      });
    }

    res.json(supplier);
  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

// =======================================
// CREATE SUPPLIER
// =======================================
exports.createSupplier = async (req, res) => {
  try {
    const {
      name,
      phone,
      email,
      address,
      tax_code,
      contact_person,
      bank_name,
      bank_account,
      note,
      status,
    } = req.body;

    if (!name || name.trim() === "") {
      return res.status(400).json({
        message: "Tên nhà cung cấp không được để trống",
      });
    }

    const supplier_code = await generateSupplierCode();

    const supplier = await Supplier.create({
      supplier_code,
      name,
      phone,
      email,
      address,
      tax_code,
      contact_person,
      bank_name,
      bank_account,
      note,
      status,
    });

    res.status(201).json(supplier);
  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

// =======================================
// UPDATE SUPPLIER
// =======================================
exports.updateSupplier = async (req, res) => {
  try {
    const supplier = await Supplier.findById(req.params.id);

    if (!supplier) {
      return res.status(404).json({
        message: "Không tìm thấy nhà cung cấp",
      });
    }

    Object.assign(supplier, req.body);

    await supplier.save();

    res.json(supplier);
  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

// =======================================
// DELETE SUPPLIER
// =======================================
exports.deleteSupplier = async (req, res) => {
  try {
    const supplier = await Supplier.findById(req.params.id);

    if (!supplier) {
      return res.status(404).json({
        message: "Không tìm thấy nhà cung cấp",
      });
    }

    await Supplier.findByIdAndDelete(req.params.id);

    res.json({
      message: "Đã xóa nhà cung cấp",
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: "Server Error",
    });
  }
};
