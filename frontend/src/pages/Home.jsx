import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ShieldCheck,
  MapPin,
  Bell,
  Users,
  Camera,
  ArrowRight,
} from "lucide-react";

export default function Home() {
  const navigate = useNavigate();

  const features = [
    {
      icon: <MapPin size={32} />,
      title: "Location Tracking",
      desc: "Report issues with live GPS coordinates for accurate resolution.",
    },
    {
      icon: <Camera size={32} />,
      title: "Image Upload",
      desc: "Attach photos of civic issues to help authorities understand the problem.",
    },
    {
      icon: <Users size={32} />,
      title: "Worker Assignment",
      desc: "Administrators assign complaints to municipal workers instantly.",
    },
    {
      icon: <Bell size={32} />,
      title: "Live Notifications",
      desc: "Citizens receive real-time updates as complaints progress.",
    },
    {
      icon: <ShieldCheck size={32} />,
      title: "Role-Based Access",
      desc: "Dedicated dashboards for Citizens, Workers and Administrators.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-700 via-indigo-700 to-purple-700 text-white">

      {/* Navbar */}
      <nav className="flex justify-between items-center px-8 py-5 backdrop-blur-lg bg-white/10">
        <div className="flex items-center gap-3">
          <img
            src="/logo.png"
            alt="logo"
            className="w-10 h-10 rounded-full"
          />
          <h1 className="text-2xl font-bold">SevaSetu</h1>
        </div>

        <div className="flex gap-4">
          <button
            onClick={() => navigate("/login")}
            className="px-5 py-2 rounded-lg border border-white hover:bg-white hover:text-blue-700 transition"
          >
            Login
          </button>

          <button
            onClick={() => navigate("/register")}
            className="px-5 py-2 rounded-lg bg-white text-blue-700 font-semibold hover:scale-105 transition"
          >
            Register
          </button>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-7xl mx-auto px-8 py-24 grid md:grid-cols-2 gap-10 items-center">

        <motion.div
          initial={{ opacity: 0, x: -80 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <p className="text-blue-200 uppercase tracking-widest mb-3">
            Smart Civic Complaint Management
          </p>

          <h1 className="text-5xl md:text-6xl font-extrabold leading-tight">
            Connecting
            <span className="text-yellow-300"> Citizens </span>
            with
            <span className="text-yellow-300"> Smart Governance</span>
          </h1>

          <p className="text-lg text-gray-200 mt-8 leading-8">
            SevaSetu enables citizens to report civic issues,
            administrators to efficiently assign municipal workers,
            and workers to resolve complaints through a centralized,
            transparent platform.
          </p>

          <div className="flex gap-5 mt-10">
            <button
              onClick={() => navigate("/register")}
              className="flex items-center gap-2 bg-yellow-400 text-black px-7 py-3 rounded-xl font-semibold hover:scale-105 transition"
            >
              Get Started
              <ArrowRight size={20} />
            </button>

            <button
              onClick={() => navigate("/login")}
              className="px-7 py-3 border border-white rounded-xl hover:bg-white hover:text-blue-700 transition"
            >
              Login
            </button>
          </div>
        </motion.div>

        {/* Illustration */}
        <motion.div
          initial={{ opacity: 0, x: 80 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="flex justify-center"
        >
          <img
            src="./public/city.jpg"
            alt="city"
            className="w-full max-w-lg drop-shadow-2xl"
          />
        </motion.div>
      </section>

      {/* Features */}
      <section className="max-w-7xl mx-auto px-8 py-12">

        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-4xl font-bold text-center mb-14"
        >
          Platform Features
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-8">

          {features.map((item, index) => (
            <motion.div
              key={index}
              whileHover={{
                scale: 1.05,
              }}
              className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-8 shadow-xl"
            >
              <div className="text-yellow-300 mb-5">
                {item.icon}
              </div>

              <h3 className="text-xl font-bold mb-3">
                {item.title}
              </h3>

              <p className="text-gray-200">
                {item.desc}
              </p>
            </motion.div>
          ))}

        </div>
      </section>

      {/* Workflow */}
      <section className="py-24 px-8">

        <h2 className="text-center text-4xl font-bold mb-16">
          How SevaSetu Works
        </h2>

        <div className="grid md:grid-cols-4 gap-8 max-w-7xl mx-auto">

          {[
            "Citizen Reports Issue",
            "Administrator Reviews",
            "Worker Assigned",
            "Issue Resolved",
          ].map((step, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -8 }}
              className="bg-white/10 backdrop-blur-xl rounded-2xl p-8 text-center"
            >
              <div className="text-5xl font-bold text-yellow-300 mb-5">
                {index + 1}
              </div>

              <h3 className="text-xl font-semibold">
                {step}
              </h3>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="text-center py-20">

        <h2 className="text-4xl font-bold">
          Make Your City Smarter
        </h2>

        <p className="mt-5 text-lg text-gray-200">
          Report issues, track progress, and contribute to better governance.
        </p>

        <button
          onClick={() => navigate("/register")}
          className="mt-8 bg-yellow-400 text-black px-8 py-4 rounded-xl font-bold hover:scale-105 transition"
        >
          Join SevaSetu
        </button>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-white/20 text-center text-gray-300">
        © 2026 SevaSetu • Smart Municipal Complaint Management System
      </footer>
    </div>
  );
}