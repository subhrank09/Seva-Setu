    const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// CREATE COMPLAINT (Citizen)
exports.createComplaint = async (req, res) => {
  try {
    const { title, description, latitude, longitude, category } = req.body;

    console.log("BODY:", req.body);
    console.log("FILE:", req.file);
    
    const imageUrl = req.file ? req.file.path : null;

    const complaint = await prisma.complaint.create({
      data: {
        title,
        description,
        latitude: parseFloat(latitude),
        longitude: parseFloat(longitude),
        category,
        imageUrl,
        userId: req.user.id,
      },
    });

    res.json(complaint);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET ALL COMPLAINTS
exports.getAllComplaints = async (req, res) => {
  try {
    const complaints = await prisma.complaint.findMany({
      include: {
        user: true,
        assignedTo: true,
      },
    });

    res.json(complaints);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET MY COMPLAINTS
exports.getMyComplaints = async (req, res) => {
  try {
    const complaints = await prisma.complaint.findMany({
      where: {
        userId: req.user.id,
      },
    });

    res.json(complaints);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ASSIGN COMPLAINT (Admin)
exports.assignComplaint = async (req, res) => {
  try {
    const { complaintId, workerId } = req.body;

    const complaint = await prisma.complaint.findUnique({
      where: { id: complaintId },
    });

    if (!complaint)
      return res.status(404).json({ message: "Complaint not found" });

    const worker = await prisma.user.findUnique({
      where: { id: workerId },
    });

    if (!worker || worker.role !== "worker") {
      return res.status(400).json({ message: "Invalid worker" });
    }

    const updated = await prisma.complaint.update({
      where: { id: complaintId },
      data: {
        assignedToId: workerId, // ✅ CORRECT FIELD
        status: "assigned",
      },
    });

    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

// UPDATE STATUS (Worker)
exports.updateStatus = async (req, res) => {
  try {
    const { complaintId, status } = req.body;

    const complaint = await prisma.complaint.update({
      where: { id: complaintId },
      data: { status },
    });

    res.json(complaint);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET /api/complaints/notifications
exports.getNotifications = async (req, res) => {
  const complaints = await prisma.complaint.findMany({
    where: {
      userId: req.user.id,
      status: "resolved",
    },
  });

  res.json(complaints);
};

// DELETE /api/complaints/:id
exports.deleteComplaint = async (req, res) => {
  const complaint = await prisma.complaint.findUnique({
    where: { id: req.params.id },
  });

  if (!complaint) return res.status(404).json({ message: "Not found" });

  // Allow only owner or admin
  if (
    complaint.userId !== req.user.id &&
    req.user.role !== "admin"
  ) {
    return res.status(403).json({ message: "Not allowed" });
  }

  await prisma.complaint.delete({
    where: { id: req.params.id },
  });

  res.json({ message: "Deleted successfully" });
};