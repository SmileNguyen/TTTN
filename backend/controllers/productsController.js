const fs = require("fs");
const path = require("path");

const Product = require("../models/Product");
const Category = require("../models/Category");

// =====================================================
// GET ALL PRODUCTS
// =====================================================
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find()
      .populate("category", "name code icon")
      .sort({ createdAt: -1 });

    res.status(200).json(products);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

// =====================================================
// CREATE PRODUCT
// =====================================================
exports.createProduct = async (req, res) => {
  try {
    const {
      name,
      sku,
      barcode,
      category,
      cost_price,
      sale_price,
      stock,
      description,
      status,
    } = req.body;

    // Kiểm tra Category
    const categoryData = await Category.findById(category);

    if (!categoryData) {
      return res.status(400).json({
        message: "Danh mục không tồn tại",
      });
    }

    // Kiểm tra SKU
    const skuExists = await Product.findOne({ sku });

    if (skuExists) {
      return res.status(400).json({
        message: "SKU đã tồn tại",
      });
    }

    // Kiểm tra Barcode
    if (barcode) {
      const barcodeExists = await Product.findOne({ barcode });

      if (barcodeExists) {
        return res.status(400).json({
          message: "Barcode đã tồn tại",
        });
      }
    }

    // Ảnh
    let image = "";

    if (req.file) {
      image = `uploads/products/${req.file.filename}`;
    }

    const product = await Product.create({
      name,
      sku,
      barcode,
      category,
      cost_price,
      sale_price,
      stock,
      image,
      description,
      status,
    });

    const result = await Product.findById(product._id).populate(
      "category",
      "name code icon"
    );

    res.status(201).json(result);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

// =====================================================
// UPDATE PRODUCT
// =====================================================
exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({
        message: "Không tìm thấy sản phẩm",
      });
    }

    // Category
    const categoryData = await Category.findById(req.body.category);

    if (!categoryData) {
      return res.status(400).json({
        message: "Danh mục không tồn tại",
      });
    }

    // SKU
    const skuExists = await Product.findOne({
      sku: req.body.sku,
      _id: { $ne: id },
    });

    if (skuExists) {
      return res.status(400).json({
        message: "SKU đã tồn tại",
      });
    }

    // Barcode
    if (req.body.barcode) {
      const barcodeExists = await Product.findOne({
        barcode: req.body.barcode,
        _id: { $ne: id },
      });

      if (barcodeExists) {
        return res.status(400).json({
          message: "Barcode đã tồn tại",
        });
      }
    }

    // Upload ảnh mới
    if (req.file) {
      // Xóa ảnh cũ
      if (product.image) {
        const oldImage = path.join(__dirname, "..", product.image);

        if (fs.existsSync(oldImage)) {
          fs.unlinkSync(oldImage);
        }
      }

      product.image = `uploads/products/${req.file.filename}`;
    }

    product.name = req.body.name;
    product.sku = req.body.sku;
    product.barcode = req.body.barcode;
    product.category = req.body.category;
    product.cost_price = req.body.cost_price;
    product.sale_price = req.body.sale_price;
    product.stock = req.body.stock;
    product.description = req.body.description;
    product.status = req.body.status;

    await product.save();

    const result = await Product.findById(id).populate(
      "category",
      "name code icon"
    );

    res.json(result);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

// =====================================================
// DELETE PRODUCT
// =====================================================
exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({
        message: "Không tìm thấy sản phẩm",
      });
    }

    // Xóa ảnh
    if (product.image) {
      const imagePath = path.join(__dirname, "..", product.image);

      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    await Product.findByIdAndDelete(id);

    res.json({
      message: "Xóa sản phẩm thành công",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};
