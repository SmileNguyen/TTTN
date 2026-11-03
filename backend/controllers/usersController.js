const User = require("../models/User");

// =======================================
// GET ALL USERS
// =======================================
exports.getUsers = async (req, res) => {
  try {
    const keyword = req.query.keyword || "";

    const filter = {};

    if (keyword) {
      filter.$or = [
        {
          username: {
            $regex: keyword,
            $options: "i",
          },
        },
        {
          full_name: {
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
      ];
    }

    const users = await User.find(filter)
      .select("-password")
      .sort({ createdAt: -1 });

    res.json(users);
  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

// =======================================
// GET USER BY ID
// =======================================
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.json(user);
  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

// =======================================
// CREATE USER
// =======================================
exports.createUser = async (req, res) => {
  try {
    const {
      username,
      password,
      full_name,
      email,
      phone,
      avatar,
      role,
      permissions,
    } = req.body;

    const existUsername = await User.findOne({ username });

    if (existUsername) {
      return res.status(400).json({
        message: "Username đã tồn tại.",
      });
    }

    if (email) {
      const existEmail = await User.findOne({ email });

      if (existEmail) {
        return res.status(400).json({
          message: "Email đã tồn tại.",
        });
      }
    }

    const user = await User.create({
      username,
      password,
      full_name,
      email,
      phone,
      avatar,
      role,
      permissions,
    });

    res.status(201).json(user);
  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

// =======================================
// UPDATE USER
// =======================================
exports.updateUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    if (req.body.email && req.body.email !== user.email) {
      const existEmail = await User.findOne({
        email: req.body.email,
      });

      if (existEmail) {
        return res.status(400).json({
          message: "Email đã tồn tại.",
        });
      }
    }

    user.full_name = req.body.full_name ?? user.full_name;
    user.email = req.body.email ?? user.email;
    user.phone = req.body.phone ?? user.phone;
    user.avatar = req.body.avatar ?? user.avatar;
    user.role = req.body.role ?? user.role;
    user.permissions = req.body.permissions ?? user.permissions;

    await user.save();

    res.json(user);
  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

// =======================================
// DELETE USER
// =======================================
exports.deleteUser = async (req, res) => {
  try {
    if (req.user.id === req.params.id) {
      return res.status(400).json({
        message: "Không thể xóa chính mình.",
      });
    }

    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    await User.findByIdAndDelete(req.params.id);

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

// =======================================
// RESET PASSWORD
// =======================================
exports.resetPassword = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    user.password = req.body.password || "123456";

    await user.save();

    res.json({
      message: "Reset password thành công.",
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

// =======================================
// TOGGLE ACTIVE
// =======================================
exports.toggleStatus = async (req, res) => {
  try {
    if (req.user.id === req.params.id) {
      return res.status(400).json({
        message: "Không thể khóa chính mình.",
      });
    }

    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    user.is_active = !user.is_active;

    await user.save();

    res.json({
      message: "Cập nhật trạng thái thành công.",
      is_active: user.is_active,
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: "Server Error",
    });
  }
};
