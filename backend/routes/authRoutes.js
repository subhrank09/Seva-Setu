const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

const {
  register,
  login,
  createWorker, // ✅ import
} = require("../controllers/authController");

// existing
router.post("/register", register);
router.post("/login", login);

// 🔥 NEW (Admin only)
router.post(
  "/create-worker",
  protect,
  authorizeRoles("admin"),
  createWorker
);

module.exports = router;