const express = require("express");
const router = express.Router();
const upload = require("../middleware/uploadMiddleware");
const protect = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

const {
  createComplaint,
  getAllComplaints,
  getMyComplaints,
  assignComplaint,
  updateStatus,
  getNotifications,
  deleteComplaint
} = require("../controllers/complaintController");

// Citizen
router.get("/my", protect, getMyComplaints);

// Admin
router.get("/", protect, authorizeRoles("admin"), getAllComplaints);
router.post("/assign", protect, authorizeRoles("admin"), assignComplaint);

// Worker
router.post("/status", protect, authorizeRoles("worker"), updateStatus);

//Upload
router.post("/", protect, upload.single("image"), createComplaint);
router.get("/notifications", protect, getNotifications);
router.delete("/:id", protect, deleteComplaint);
module.exports = router;