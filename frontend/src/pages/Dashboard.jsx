import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import Layout from "../components/Layout";
import MapView from "../components/MapView";

import {
  Bell,
  Search,
  Filter,
  User,
  FileText,
  Clock3,
  CheckCircle2,
  Wrench,
  Plus,
  History,
  Settings,
  MapPinned,
  Eye,
  Pencil,
  Trash2,
} from "lucide-react";

import { motion } from "framer-motion";

export default function Dashboard() {
  const navigate = useNavigate();

  const [complaints, setComplaints] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");

  const user =
    JSON.parse(localStorage.getItem("user")) || {
      name: "Rohan",
    };

  /* ===========================
      Fetch Complaints
  ============================ */

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const res = await API.get("/complaints/my");
        setComplaints(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchComplaints();
  }, []);

  /* ===========================
      Fetch Notifications
  ============================ */

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const res = await API.get("/complaints/notifications");
        setNotifications(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchNotifications();
  }, []);

  /* ===========================
      Delete Complaint
  ============================ */

  const deleteComplaint = async (id) => {
    try {
      await API.delete(`/complaints/${id}`);

      setComplaints((prev) => prev.filter((c) => c.id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  /* ===========================
      Dashboard Statistics
  ============================ */

  const stats = useMemo(() => {
    const total = complaints.length;

    const pending = complaints.filter(
      (c) => c.status?.toLowerCase() === "pending"
    ).length;

    const assigned = complaints.filter(
      (c) => c.status?.toLowerCase() === "assigned"
    ).length;

    const resolved = complaints.filter(
      (c) => c.status?.toLowerCase() === "resolved"
    ).length;

    return {
      total,
      pending,
      assigned,
      resolved,
    };
  }, [complaints]);

  /* ===========================
      Filter Complaints
  ============================ */

  const filteredComplaints = complaints.filter((c) => {
    const matchSearch =
      c.title?.toLowerCase().includes(search.toLowerCase()) ||
      c.description?.toLowerCase().includes(search.toLowerCase());

    const matchCategory =
      categoryFilter === "All" ||
      c.category === categoryFilter;

    const matchStatus =
      statusFilter === "All" ||
      c.status === statusFilter;

    return matchSearch && matchCategory && matchStatus;
  });

  return (
    <Layout title="Dashboard">

      {/* ==========================================================
                            HEADER
      =========================================================== */}

      <motion.div
        initial={{ opacity: 0, y: -25 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row justify-between items-center gap-5 mb-8"
      >
        <div>

          <h1 className="text-4xl font-bold text-white">
            👋 Welcome Back, {user.name}!
          </h1>

          <p className="text-blue-100 mt-2">
            Track your civic complaints in real time.
          </p>

        </div>

        <div className="flex items-center gap-4">

          {/* Notification */}

          <div className="relative">

            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className="relative p-3 rounded-full bg-white text-blue-700 shadow-lg hover:scale-105 transition"
            >
              <Bell size={22} />

              {notifications.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs">
                  {notifications.length}
                </span>
              )}
            </button>

            {showDropdown && (
              <div className="absolute right-0 mt-4 w-80 bg-white rounded-2xl shadow-2xl p-4 z-50">

                <h3 className="font-bold text-lg mb-3">
                  Notifications
                </h3>

                {notifications.length === 0 ? (
                  <p className="text-gray-500">
                    No notifications
                  </p>
                ) : (
                  notifications.map((n) => (
                    <div
                      key={n.id}
                      className="border-b py-3 text-sm"
                    >
                      ✔ {n.title}
                    </div>
                  ))
                )}

              </div>
            )}

          </div>

          {/* User */}

          <div className="flex items-center gap-3 bg-white rounded-full px-5 py-2 shadow-lg">

            <div className="w-11 h-11 rounded-full bg-blue-600 flex items-center justify-center text-white">

              <User size={20} />

            </div>

            <div>

              <h3 className="font-semibold text-gray-800">
                {user.name}
              </h3>

              <p className="text-xs text-gray-500">
                Citizen
              </p>

            </div>

          </div>

        </div>

      </motion.div>

      {/* ==========================================================
                        DASHBOARD STATS
      =========================================================== */}

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
      >

        {/* Total */}

        <div className="bg-white rounded-2xl shadow-xl p-6">

          <div className="flex justify-between">

            <div>

              <p className="text-gray-500">
                Total Complaints
              </p>

              <h2 className="text-4xl font-bold mt-2">
                {stats.total}
              </h2>

            </div>

            <div className="bg-blue-100 p-4 rounded-xl">

              <FileText
                className="text-blue-700"
                size={28}
              />

            </div>

          </div>

        </div>

        {/* Pending */}

        <div className="bg-white rounded-2xl shadow-xl p-6">

          <div className="flex justify-between">

            <div>

              <p className="text-gray-500">
                Pending
              </p>

              <h2 className="text-4xl font-bold mt-2 text-orange-500">
                {stats.pending}
              </h2>

            </div>

            <div className="bg-orange-100 p-4 rounded-xl">

              <Clock3
                className="text-orange-600"
                size={28}
              />

            </div>

          </div>

        </div>

        {/* Assigned */}

        <div className="bg-white rounded-2xl shadow-xl p-6">

          <div className="flex justify-between">

            <div>

              <p className="text-gray-500">
                Assigned
              </p>

              <h2 className="text-4xl font-bold mt-2 text-yellow-500">
                {stats.assigned}
              </h2>

            </div>

            <div className="bg-yellow-100 p-4 rounded-xl">

              <Wrench
                className="text-yellow-700"
                size={28}
              />

            </div>

          </div>

        </div>

        {/* Resolved */}

        <div className="bg-white rounded-2xl shadow-xl p-6">

          <div className="flex justify-between">

            <div>

              <p className="text-gray-500">
                Resolved
              </p>

              <h2 className="text-4xl font-bold mt-2 text-green-600">
                {stats.resolved}
              </h2>

            </div>

            <div className="bg-green-100 p-4 rounded-xl">

              <CheckCircle2
                className="text-green-700"
                size={28}
              />

            </div>

          </div>

        </div>

      </motion.div>
            {/* ==========================================================
                    MAP + QUICK ACTIONS
      =========================================================== */}

      <div className="grid lg:grid-cols-4 gap-6 mb-8">

        {/* ================= MAP ================= */}

        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.25 }}
          className="lg:col-span-3 bg-white rounded-2xl shadow-xl overflow-hidden"
        >

          <div className="flex items-center justify-between px-6 py-4 border-b">

            <div className="flex items-center gap-2">

              <MapPinned
                className="text-blue-600"
                size={22}
              />

              <h2 className="text-xl font-bold text-gray-800">
                Complaint Map
              </h2>

            </div>

            <span className="text-sm text-gray-500">
              Live Locations
            </span>

          </div>

          <div className="h-[420px]">

            <MapView complaints={filteredComplaints} />

          </div>

        </motion.div>

        {/* ================= QUICK ACTIONS ================= */}

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.35 }}
          className="bg-white rounded-2xl shadow-xl p-6"
        >

          <h2 className="text-xl font-bold text-gray-800 mb-6">
            Quick Actions
          </h2>

          <div className="space-y-4">

            {/* Report */}

            <button
              onClick={() => navigate("/create")}
              className="w-full flex items-center gap-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl p-4 transition"
            >
              <Plus size={22} />
              <span className="font-semibold">
                Report Issue
              </span>
            </button>

            {/* Profile */}

            <button
              onClick={() => navigate("/profile")}
              className="w-full flex items-center gap-4 bg-gray-100 hover:bg-gray-200 rounded-xl p-4 transition"
            >
              <User
                size={22}
                className="text-gray-700"
              />

              <span className="font-semibold text-gray-700">
                Profile
              </span>
            </button>

            {/* Settings */}

            <button
              onClick={() => navigate("/settings")}
              className="w-full flex items-center gap-4 bg-gray-100 hover:bg-gray-200 rounded-xl p-4 transition"
            >
              <Settings
                size={22}
                className="text-gray-700"
              />

              <span className="font-semibold text-gray-700">
                Settings
              </span>
            </button>

          </div>

        </motion.div>

      </div>

      {/* ==========================================================
                    SEARCH & FILTERS
      =========================================================== */}

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.45 }}
        className="bg-white rounded-2xl shadow-xl p-5 mb-8"
      >

        <div className="grid lg:grid-cols-3 gap-4">

          {/* Search */}

          <div className="relative">

            <Search
              size={20}
              className="absolute left-4 top-3.5 text-gray-400"
            />

            <input
              type="text"
              placeholder="Search complaints..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              className="w-full border rounded-xl py-3 pl-12 pr-4 focus:ring-2 focus:ring-blue-500 outline-none"
            />

          </div>

          {/* Category */}

          <div className="relative">

            <Filter
              size={18}
              className="absolute left-4 top-3.5 text-gray-400"
            />

            <select
              value={categoryFilter}
              onChange={(e) =>
                setCategoryFilter(e.target.value)
              }
              className="w-full border rounded-xl py-3 pl-12 pr-4 focus:ring-2 focus:ring-blue-500 outline-none"
            >
              <option value="All">
                All Categories
              </option>

              <option value="Roads">
                Roads
              </option>

              <option value="Water Supply">
                Water Supply
              </option>

              <option value="Electricity">
                Electricity
              </option>

              <option value="Garbage">
                Garbage
              </option>

              <option value="Drainage">
                Drainage
              </option>

              <option value="Others">
                Others
              </option>

            </select>

          </div>

          {/* Status */}

          <div>

            <select
              value={statusFilter}
              onChange={(e) =>
                setStatusFilter(e.target.value)
              }
              className="w-full border rounded-xl py-3 px-4 focus:ring-2 focus:ring-blue-500 outline-none"
            >
              <option value="All">
                All Status
              </option>

              <option value="Pending">
                Pending
              </option>

              <option value="Assigned">
                Assigned
              </option>

              <option value="Resolved">
                Resolved
              </option>

            </select>

          </div>

        </div>

      </motion.div>

      {/* ==========================================================
                  COMPLAINT LIST STARTS HERE
      ========================================================== */}

      <div className="space-y-6"></div>
              {filteredComplaints.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white rounded-2xl shadow-xl p-16 text-center"
          >
            <FileText
              size={60}
              className="mx-auto text-gray-400 mb-5"
            />

            <h2 className="text-2xl font-bold text-gray-700">
              No Complaints Found
            </h2>

            <p className="text-gray-500 mt-2">
              Try changing your filters or report a new issue.
            </p>

            <button
              onClick={() => navigate("/create")}
              className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl"
            >
              Report Issue
            </button>
          </motion.div>
        ) : (
          filteredComplaints.map((c, index) => {

            const status =
              c.status?.toLowerCase() || "pending";

            const badgeColor =
              status === "resolved"
                ? "bg-green-100 text-green-700"
                : status === "assigned"
                ? "bg-yellow-100 text-yellow-700"
                : "bg-red-100 text-red-700";

            const dotColor =
              status === "resolved"
                ? "bg-green-500"
                : status === "assigned"
                ? "bg-yellow-500"
                : "bg-red-500";

            return (

              <motion.div
                key={c.id}
                initial={{ opacity: 0, y: 35 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.08 }}
                className="bg-white rounded-2xl shadow-xl overflow-hidden"
              >

                {/* HEADER */}

                <div className="flex justify-between items-start p-6">

                  <div>

                    <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">

                      📍 {c.title}

                    </h2>

                    <p className="text-gray-500 mt-2">
                      {c.description}
                    </p>

                  </div>

                  <div
                    className={`px-4 py-2 rounded-full text-sm font-semibold ${badgeColor}`}
                  >
                    {c.status}
                  </div>

                </div>

                {/* BODY */}

                <div className="px-6 pb-5">

                  <div className="grid md:grid-cols-2 gap-4 text-gray-700">

                    <div>

                      <p>
                        <span className="font-semibold">
                          Category :
                        </span>{" "}
                        {c.category || "General"}
                      </p>

                      <p className="mt-2">
                        <span className="font-semibold">
                          Submitted :
                        </span>{" "}
                        {c.createdAt
                          ? new Date(
                              c.createdAt
                            ).toLocaleDateString()
                          : "-"}
                      </p>

                    </div>

                    <div>

                      <p>
                        <span className="font-semibold">
                          Worker :
                        </span>{" "}
                        {c.workerName ||
                          c.worker ||
                          "Not Assigned"}
                      </p>

                      {status === "assigned" && (
                        <p className="mt-2">
                          <span className="font-semibold">
                            ETA :
                          </span>{" "}
                          {c.eta || "2 Days"}
                        </p>
                      )}

                      {status === "resolved" && (
                        <p className="mt-2">
                          <span className="font-semibold">
                            Resolution Date :
                          </span>{" "}
                          {c.resolvedDate ||
                            new Date().toLocaleDateString()}
                        </p>
                      )}

                    </div>

                  </div>

                </div>

                {/* STATUS LINE */}

                <div className="border-t border-gray-200 px-6 py-3 flex items-center gap-3">

                  <span
                    className={`w-3 h-3 rounded-full ${dotColor}`}
                  />

                  <span className="font-medium capitalize text-gray-700">
                    {status}
                  </span>

                </div>

                {/* ACTIONS */}

                <div className="border-t bg-gray-50 px-6 py-4 flex flex-wrap gap-3">

                  <button
                    onClick={() =>
                      navigate(`/complaint/${c.id}`)
                    }
                    className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg transition"
                  >
                    <Eye size={18} />
                    View Details
                  </button>

                  {status !== "resolved" && (
                    <>
                      <button
                        onClick={() =>
                          navigate(`/edit/${c.id}`)
                        }
                        className="flex items-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-white px-5 py-2 rounded-lg transition"
                      >
                        <Pencil size={18} />
                        Edit
                      </button>

                      <button
                        onClick={() =>
                          deleteComplaint(c.id)
                        }
                        className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg transition"
                      >
                        <Trash2 size={18} />
                        Delete
                      </button>
                    </>
                  )}

                  {status === "resolved" && (
                    <div className="flex items-center gap-2 ml-auto">

                      <span className="text-gray-600 font-medium">
                        Rate Service
                      </span>

                      <button className="text-yellow-400 text-xl hover:scale-110">
                        ⭐
                      </button>

                      <button className="text-yellow-400 text-xl hover:scale-110">
                        ⭐
                      </button>

                      <button className="text-yellow-400 text-xl hover:scale-110">
                        ⭐
                      </button>

                      <button className="text-yellow-400 text-xl hover:scale-110">
                        ⭐
                      </button>

                      <button className="text-yellow-400 text-xl hover:scale-110">
                        ⭐
                      </button>

                    </div>
                  )}

                </div>

              </motion.div>

            );

          })
        )}
    </Layout>
  );
}