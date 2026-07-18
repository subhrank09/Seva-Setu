import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  Building2,
  CheckCircle,
  MapPin,
} from "lucide-react";
import { motion } from "framer-motion";
import axios from "axios";

export default function Register() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "citizen",
    adminKey: "",
    agree: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      return alert("Passwords do not match");
    }

    if (!form.agree) {
      return alert("Please accept Terms & Conditions");
    }

    try {
      const payload = {
        name: form.name,
        email: form.email,
        password: form.password,
        role: form.role,
      };

      if (form.role === "admin") {
        payload.adminKey = form.adminKey;
      }

      const res = await axios.post(
        "http://import.meta.env.VITE_API_URL/api/auth/register",
        payload
      );

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      alert("Registration Successful!");

      navigate("/dashboard");
    } catch (err) {
      console.error(err);

      alert(
        err.response?.data?.message ||
          err.response?.data?.error ||
          "Registration Failed"
      );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-600 via-blue-700 to-indigo-900 flex items-center justify-center px-6 py-8">

      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-7xl overflow-hidden">

        {/* Header */}

        <div className="flex justify-between items-center px-10 py-6 border-b">

          <h1 className="text-3xl font-bold text-sky-700">
            SevaSetu
          </h1>

          <button
            onClick={() => navigate("/login")}
            className="text-blue-600 font-semibold hover:underline"
          >
            Already a member? Login
          </button>

        </div>

        {/* Title */}

        <div className="text-center mt-8">

          <h2 className="text-4xl font-bold text-gray-800">
            Create Your Account
          </h2>

          <p className="text-gray-500 mt-2">
            Join the Smart Civic Complaint Management Platform
          </p>

        </div>

        {/* Main Content */}

        <div className="grid md:grid-cols-2 gap-10 p-10">

          {/* LEFT PANEL */}

          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-gradient-to-br from-cyan-600 to-blue-700 rounded-3xl p-10 text-white flex flex-col justify-between"
          >

            <div>

              <div className="flex justify-center mb-10">

                <div className="w-52 h-52 rounded-full bg-white/10 flex items-center justify-center">

                  <Building2 size={90} />

                </div>

              </div>

              <h3 className="text-3xl font-bold text-center">
                Smart City
              </h3>

              <p className="text-center text-blue-100 mt-2 mb-10">
                Connected Citizens
              </p>

              <div className="space-y-6">

                <div className="flex items-center gap-4">
                  <CheckCircle className="text-green-300" />
                  Report Issues
                </div>

                <div className="flex items-center gap-4">
                  <MapPin className="text-green-300" />
                  Track Complaints
                </div>

                <div className="flex items-center gap-4">
                  <CheckCircle className="text-green-300" />
                  Real-time Updates
                </div>

              </div>

            </div>

          </motion.div>

          {/* RIGHT PANEL */}

          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-5"
          >

            {/* Name */}

            <div className="relative">

              <User
                className="absolute left-4 top-4 text-gray-400"
                size={20}
              />

              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={form.name}
                onChange={handleChange}
                required
                className="w-full border rounded-xl py-3 pl-12 pr-4 focus:ring-2 focus:ring-blue-500 outline-none"
              />

            </div>

            {/* Email */}

            <div className="relative">

              <Mail
                className="absolute left-4 top-4 text-gray-400"
                size={20}
              />

              <input
                type="email"
                name="email"
                placeholder="Email"
                value={form.email}
                onChange={handleChange}
                required
                className="w-full border rounded-xl py-3 pl-12 pr-4 focus:ring-2 focus:ring-blue-500 outline-none"
              />

            </div>

            {/* Password */}

            <div className="relative">

              <Lock
                className="absolute left-4 top-4 text-gray-400"
                size={20}
              />

              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={form.password}
                onChange={handleChange}
                required
                className="w-full border rounded-xl py-3 pl-12 pr-12 focus:ring-2 focus:ring-blue-500 outline-none"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-4 text-gray-400"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>

            </div>

            {/* Confirm Password */}

            <div className="relative">

              <Lock
                className="absolute left-4 top-4 text-gray-400"
                size={20}
              />

              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                placeholder="Confirm Password"
                value={form.confirmPassword}
                onChange={handleChange}
                required
                className="w-full border rounded-xl py-3 pl-12 pr-12 focus:ring-2 focus:ring-blue-500 outline-none"
              />

              <button
                type="button"
                onClick={() =>
                  setShowConfirmPassword(!showConfirmPassword)
                }
                className="absolute right-4 top-4 text-gray-400"
              >
                {showConfirmPassword ? (
                  <EyeOff size={20} />
                ) : (
                  <Eye size={20} />
                )}
              </button>

            </div>

            {/* Role */}

            <div>

              <label className="font-semibold text-gray-700 block mb-2">
                Register As
              </label>

              <select
                name="role"
                value={form.role}
                onChange={handleChange}
                className="w-full border rounded-xl p-3 focus:ring-2 focus:ring-blue-500 outline-none"
              >
                <option value="citizen">Citizen</option>
                <option value="worker">Worker</option>
                <option value="admin">Admin</option>
              </select>

            </div>

            {/* Admin Key */}

            {form.role === "admin" && (
              <input
                type="password"
                name="adminKey"
                placeholder="Admin Secret Key"
                value={form.adminKey}
                onChange={handleChange}
                required
                className="w-full border rounded-xl p-3 focus:ring-2 focus:ring-blue-500 outline-none"
              />
            )}

            {/* Terms */}

            <label className="flex items-center gap-3 text-gray-700">

              <input
                type="checkbox"
                name="agree"
                checked={form.agree}
                onChange={handleChange}
                className="w-5 h-5 accent-blue-600"
              />

              I agree to the Terms & Conditions

            </label>

            {/* Button */}

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-sky-600 to-indigo-700 text-white py-3 rounded-xl font-semibold hover:from-sky-700 hover:to-indigo-800 transition duration-300 shadow-lg"
            >
              Create Account
            </button>

          </motion.form>

        </div>

      </div>

    </div>
  );
}