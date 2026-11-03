// ======================================
// ROLE MIDDLEWARE
// ======================================
exports.allowRoles =
  (...roles) =>
  (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        message: "Bạn không có quyền thực hiện chức năng này.",
      });
    }

    next();
  };
