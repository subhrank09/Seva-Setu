import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  MapPin,
  ClipboardList,
  Bell,
} from "lucide-react";
import { motion } from "framer-motion";
import axios from "axios";

export default function Login() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://import.meta.env.VITE_API_URL/api/auth/login",
        form
      );

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      alert("Login Successful!");

      navigate("/dashboard");
    } catch (err) {
      console.error(err);

      alert(
        err.response?.data?.message ||
          err.response?.data?.error ||
          "Login Failed"
      );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-600 via-blue-700 to-indigo-900 flex items-center justify-center px-6">

      <div className="w-full max-w-7xl grid md:grid-cols-2 rounded-3xl overflow-hidden shadow-2xl">

        {/* ================= LEFT SIDE ================= */}

        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="hidden md:flex flex-col justify-between bg-gradient-to-br from-cyan-600 to-blue-800 p-14 text-white"
        >
          <div>

            <h1 className="text-5xl font-extrabold mb-3">
              SevaSetu
            </h1>

            <p className="text-blue-100 text-xl mb-12">
              Smart Governance Platform
            </p>

            <div className="space-y-6">

              <div className="flex items-center gap-4">
                <MapPin className="text-green-300" />
                <span className="text-lg">
                  GPS Tracking
                </span>
              </div>

              <div className="flex items-center gap-4">
                <ClipboardList className="text-green-300" />
                <span className="text-lg">
                  Worker Assignment
                </span>
              </div>

              <div className="flex items-center gap-4">
                <Bell className="text-green-300" />
                <span className="text-lg">
                  Instant Notifications
                </span>
              </div>

            </div>
          </div>

          {/* Bottom Stats */}

          <div className="grid grid-cols-3 mt-20">

            <div>
              <h2 className="text-4xl font-bold">10K+</h2>
              <p className="text-blue-100">
                Complaints
              </p>
            </div>

            <div>
              <h2 className="text-4xl font-bold">500+</h2>
              <p className="text-blue-100">
                Workers
              </p>
            </div>

            <div>
              <h2 className="text-4xl font-bold">95%</h2>
              <p className="text-blue-100">
                Resolution
              </p>
            </div>

          </div>

        </motion.div>

        {/* ================= RIGHT SIDE ================= */}

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white flex justify-center items-center py-16 px-6"
        >

          <form
            onSubmit={handleSubmit}
            className="w-full max-w-md"
          >

            <h2 className="text-3xl font-bold text-gray-800 text-center">
              Welcome Back 👋
            </h2>

            <p className="text-center text-gray-500 mt-2 mb-8">
              Login to continue managing your city.
            </p>

            {/* Email */}

            <div className="relative mb-5">

              <Mail
                size={20}
                className="absolute left-4 top-4 text-gray-400"
              />

              <input
                type="email"
                name="email"
                placeholder="Email"
                required
                value={form.email}
                onChange={handleChange}
                className="w-full pl-12 pr-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

            </div>

            {/* Password */}

            <div className="relative">

              <Lock
                size={20}
                className="absolute left-4 top-4 text-gray-400"
              />

              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                required
                value={form.password}
                onChange={handleChange}
                className="w-full pl-12 pr-12 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-3.5 text-gray-400"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>

            </div>

            {/* Login */}

            <button
              type="submit"
              className="w-full mt-8 bg-gradient-to-r from-sky-600 to-indigo-700 hover:from-sky-700 hover:to-indigo-800 text-white py-3 rounded-xl font-semibold shadow-lg transition duration-300"
            >
              Sign In
            </button>

            {/* Divider */}

            <div className="flex items-center my-8">

              <div className="flex-1 h-px bg-gray-300"></div>

              <span className="mx-4 text-gray-400 font-medium">
                OR
              </span>

              <div className="flex-1 h-px bg-gray-300"></div>

            </div>

            {/* Register */}

            <button
              type="button"
              onClick={() => navigate("/register")}
              className="w-full border-2 border-blue-600 text-blue-700 hover:bg-blue-600 hover:text-white py-3 rounded-xl font-semibold transition"
            >
              Create Account
            </button>

          </form>

        </motion.div>

      </div>

    </div>
  );
}