const jwt = require("jsonwebtoken");

// =======================================
// CONFIG
// =======================================

const ACCESS_TOKEN_SECRET = process.env.JWT_SECRET || "POS_ACCESS_SECRET";

const REFRESH_TOKEN_SECRET =
  process.env.JWT_REFRESH_SECRET || "POS_REFRESH_SECRET";

const ACCESS_TOKEN_EXPIRES = process.env.JWT_EXPIRES || "8h";

const REFRESH_TOKEN_EXPIRES = process.env.JWT_REFRESH_EXPIRES || "30d";

// =======================================
// GENERATE ACCESS TOKEN
// =======================================

function generateAccessToken(user) {
  return jwt.sign(
    {
      id: user._id,
      username: user.username,
      role: user.role,
    },
    ACCESS_TOKEN_SECRET,
    {
      expiresIn: ACCESS_TOKEN_EXPIRES,
    }
  );
}

// =======================================
// GENERATE REFRESH TOKEN
// =======================================

function generateRefreshToken(user) {
  return jwt.sign(
    {
      id: user._id,
    },
    REFRESH_TOKEN_SECRET,
    {
      expiresIn: REFRESH_TOKEN_EXPIRES,
    }
  );
}

// =======================================
// VERIFY ACCESS TOKEN
// =======================================

function verifyAccessToken(token) {
  return jwt.verify(token, ACCESS_TOKEN_SECRET);
}

// =======================================
// VERIFY REFRESH TOKEN
// =======================================

function verifyRefreshToken(token) {
  return jwt.verify(token, REFRESH_TOKEN_SECRET);
}

module.exports = {
  generateAccessToken,
  generateRefreshToken,
  verifyAccessToken,
  verifyRefreshToken,
};
