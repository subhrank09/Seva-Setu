const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");
const generateToken = require("../utils/generateToken");

const prisma = new PrismaClient();

// ================= REGISTER =================
exports.register = async (req, res) => {
  try {
    const { name, email, password, role, adminKey } = req.body;

    // Check existing user
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Default role
    let userRole = "citizen";

    // Allow worker
    if (role === "worker") {
      userRole = "worker";
    }

    // Allow admin with secret key
    if (role === "admin") {
      if (adminKey !== process.env.ADMIN_SECRET) {
        return res.status(403).json({ message: "Invalid admin key" });
      }
      userRole = "admin";
    }

    // Create user
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: userRole,
      },
    });

    // Send response
    res.status(201).json({
      token: generateToken(user),
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ================= LOGIN =================
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check user exists
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Send response
    res.json({
      token: generateToken(user),
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// CREATE WORKER (Admin only)
exports.createWorker = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existing = await prisma.user.findUnique({
      where: { email },
    });

    if (existing)
      return res.status(400).json({ message: "User already exists" });

    const hashed = await bcrypt.hash(password, 10);

    const worker = await prisma.user.create({
      data: {
        name,
        email,
        password: hashed,
        role: "worker",
      },
    });

    res.json(worker);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};