require("dotenv").config();
const express = require("express");
const protect = require("./middleware/authMiddleware");
const authRoutes = require("./routes/authRoutes");
const complaintRoutes = require("./routes/complaintRoutes");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const cors = require("cors");

async function testDB() {
  try {
    await prisma.$connect();
    console.log("✅ DB Connected");
  } catch (err) {
    console.error("❌ DB Error:", err.message);
  }
}

testDB();
const app = express();
app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://YOUR_PROJECT.vercel.app"
  ],
  credentials: true
}));
app.use(express.json());

app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "SevaSetu Backend is Running 🚀"
  });
});
app.get("/api/protected", protect, (req, res) => {
  res.json({
    message: "Protected route accessed",
    user: req.user,
  });
});
app.use("/api/complaints", complaintRoutes);
app.listen(5000, () => {
  console.log("Server running on port 5000");
});
