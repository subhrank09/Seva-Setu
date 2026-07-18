const jwt = require("jsonwebtoken");

const generateToken = (user) => {
  return jwt.sign(
    { id: user.id, role: user.role },
    "secretkey", // later move to .env
    { expiresIn: "7d" }
  );
};

module.exports = generateToken;