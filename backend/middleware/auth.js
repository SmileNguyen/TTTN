const jwt = require("jsonwebtoken");

// ======================================
// VERIFY LOGIN
// ======================================
exports.authenticate = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        success: false,
        message: "Bạn chưa đăng nhập.",
      });
    }

    if (!authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Token không hợp lệ.",
      });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "POS_ACCESS_SECRET"
    );

    req.user = decoded;

    next();
  } catch (err) {
    return res.status(401).json({
      success: false,
      message: "Token đã hết hạn hoặc không hợp lệ.",
    });
  }
};

// ======================================
// CHECK ROLE
// ======================================
exports.authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: "Bạn không có quyền truy cập.",
      });
    }

    next();
  };
};
