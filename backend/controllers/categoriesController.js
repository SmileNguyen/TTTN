const Category = require("../models/Category");

// ======================================
// GET ALL CATEGORIES
// ======================================
exports.getCategories = async (req, res) => {
  try {
    const categories = await Category.find().sort({
      sortOrder: 1,
      name: 1,
    });

    res.status(200).json(categories);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

// ======================================
// GET CATEGORY BY ID
// ======================================
exports.getCategoryById = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);

    if (!category) {
      return res.status(404).json({
        message: "Category not found",
      });
    }

    res.json(category);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

// ======================================
// CREATE CATEGORY
// ======================================
exports.createCategory = async (req, res) => {
  try {
    const { name, code, description, status, sortOrder } = req.body;

    const exists = await Category.findOne({
      $or: [{ name }, { code }],
    });

    if (exists) {
      return res.status(400).json({
        message: "Category already exists",
      });
    }

    const category = await Category.create({
      name,
      code,
      description,
      status,
      sortOrder,
    });

    res.status(201).json({
      message: "Category created successfully",
      category,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

// ======================================
// UPDATE CATEGORY
// ======================================
exports.updateCategory = async (req, res) => {
  try {
    const category = await Category.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!category) {
      return res.status(404).json({
        message: "Category not found",
      });
    }

    res.json({
      message: "Category updated successfully",
      category,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

// ======================================
// DELETE CATEGORY
// ======================================
exports.deleteCategory = async (req, res) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);

    if (!category) {
      return res.status(404).json({
        message: "Category not found",
      });
    }

    res.json({
      message: "Category deleted successfully",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

// ======================================
// SEED DEFAULT CATEGORIES
// ======================================
exports.seedCategories = async (req, res) => {
  try {
    const categories = [
      { code: "CPU", name: "CPU", description: "Bộ vi xử lý Intel và AMD" },
      { code: "MAIN", name: "Mainboard", description: "Bo mạch chủ" },
      { code: "RAM", name: "RAM", description: "Bộ nhớ RAM DDR4 DDR5" },
      { code: "SSD", name: "SSD", description: "Ổ cứng SSD SATA NVMe" },
      { code: "HDD", name: "HDD", description: "Ổ cứng HDD" },
      {
        code: "VGA",
        name: "Card đồ họa",
        description: "Card đồ họa NVIDIA AMD Intel",
      },
      { code: "PSU", name: "Nguồn máy tính", description: "Power Supply" },
      { code: "CASE", name: "Vỏ máy", description: "Case máy tính" },
      {
        code: "COOLER",
        name: "Tản nhiệt CPU",
        description: "Air Cooler & AIO",
      },
      { code: "FAN", name: "Quạt tản nhiệt", description: "Fan Case RGB" },
      { code: "MONITOR", name: "Màn hình", description: "Màn hình máy tính" },
      { code: "KEYBOARD", name: "Bàn phím", description: "Gaming Keyboard" },
      { code: "MOUSE", name: "Chuột", description: "Gaming Mouse" },
      { code: "HEADSET", name: "Tai nghe", description: "Gaming Headset" },
      { code: "SPEAKER", name: "Loa", description: "Loa máy tính" },
      { code: "WEBCAM", name: "Webcam", description: "Camera máy tính" },
      { code: "MIC", name: "Micro", description: "Microphone" },
      {
        code: "ROUTER",
        name: "Router & WiFi",
        description: "Router, Access Point",
      },
      { code: "NIC", name: "Card mạng", description: "LAN / WiFi Card" },
      { code: "USB", name: "USB & Thẻ nhớ", description: "USB Flash, SD Card" },
      {
        code: "EXT",
        name: "Ổ cứng di động",
        description: "External HDD / SSD",
      },
      {
        code: "CABLE",
        name: "Dây cáp & Hub",
        description: "HDMI, DP, USB Hub...",
      },
      {
        code: "LAPTOP",
        name: "Laptop",
        description: "Laptop Gaming & Văn phòng",
      },
      { code: "MINIPC", name: "Mini PC", description: "Máy tính Mini" },
      { code: "GEAR", name: "Gaming Gear", description: "Gaming Gear" },
      { code: "SOFTWARE", name: "Phần mềm", description: "Windows, Office..." },
      { code: "OTHER", name: "Khác", description: "Các sản phẩm khác" },
    ];

    let created = 0;

    for (let i = 0; i < categories.length; i++) {
      const item = categories[i];

      const exists = await Category.findOne({
        code: item.code,
      });

      if (!exists) {
        await Category.create({
          ...item,
          status: true,
          sortOrder: i + 1,
        });

        created++;
      }
    }

    res.json({
      message: "Seed completed",
      total: categories.length,
      created,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};
