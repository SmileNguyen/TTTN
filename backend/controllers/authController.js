const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const User = require("../models/User");

// ======================================
// LOGIN
// ======================================

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: "Vui lòng nhập tài khoản và mật khẩu.",
      });
    }

    const user = await User.findOne({
      username,
    });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Sai tài khoản hoặc mật khẩu.",
      });
    }

    if (!user.is_active) {
      return res.status(403).json({
        success: false,
        message: "Tài khoản đã bị khóa.",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Sai tài khoản hoặc mật khẩu.",
      });
    }

    const token = jwt.sign(
      {
        id: user._id,
        username: user.username,
        role: user.role,
      },
      process.env.JWT_SECRET || "POS_ACCESS_SECRET",
      {
        expiresIn: "7d",
      }
    );

    res.json({
      success: true,
      token,
      user: {
        _id: user._id,
        username: user.username,
        full_name: user.full_name,
        role: user.role,
        avatar: user.avatar,
      },
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// ======================================
// PROFILE
// ======================================

exports.profile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Không tìm thấy tài khoản.",
      });
    }

    res.json({
      success: true,
      user,
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// ======================================
// CHANGE PASSWORD
// ======================================

exports.changePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;

    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Không tìm thấy tài khoản.",
      });
    }

    const ok = await bcrypt.compare(oldPassword, user.password);

    if (!ok) {
      return res.status(400).json({
        success: false,
        message: "Mật khẩu cũ không đúng.",
      });
    }

    const hash = await bcrypt.hash(newPassword, 10);

    user.password = hash;

    await user.save();

    res.json({
      success: true,
      message: "Đổi mật khẩu thành công.",
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// ======================================
// LOGOUT
// ======================================

exports.logout = async (req, res) => {
  res.json({
    success: true,
    message: "Đăng xuất thành công.",
  });
};

// ======================================
// REFRESH TOKEN
// ======================================

exports.refreshToken = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        success: false,
      });
    }

    const token = jwt.sign(
      {
        id: user._id,
        username: user.username,
        role: user.role,
      },
      process.env.JWT_SECRET || "POS_ACCESS_SECRET",
      {
        expiresIn: "7d",
      }
    );

    res.json({
      success: true,
      token,
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};
