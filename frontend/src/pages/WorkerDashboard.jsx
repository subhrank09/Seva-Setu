// import { useEffect, useState } from "react";
// import API from "../services/api";
// import Layout from "../components/Layout";

// export default function WorkerDashboard() {
//   const [complaints, setComplaints] = useState([]);

//   const fetchData = async () => {
//     const res = await API.get("/complaints/my");
//     setComplaints(res.data);
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const updateStatus = async (id) => {
//     try {
//       await API.post("/complaints/status", {
//         complaintId: id,
//         status: "resolved",
//       });

//       // 🔥 instant UI update
//       setComplaints((prev) =>
//         prev.map((c) =>
//           c.id === id ? { ...c, status: "resolved" } : c
//         )
//       );
//     } catch (err) {
//       console.error(err);
//       alert("Update failed");
//     }
//   };

//   return (
//     <Layout title="Worker Panel">

//       <h2 className="text-2xl font-bold mb-6">Assigned Complaints</h2>

//       {complaints.length === 0 ? (
//         <p>No assigned complaints</p>
//       ) : (
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
//           {complaints.map((c) => (
//             <div
//               key={c.id}
//               className="bg-white/10 backdrop-blur-xl border border-white/20 shadow-xl rounded-2xl p-5 hover:scale-[1.02] transition"
//             >
//               <h3 className="text-lg font-semibold">{c.title}</h3>
//               <p className="text-sm mb-2">{c.description}</p>

//               {/* Status Badge */}
//               <span
//                 className={`px-3 py-1 rounded text-sm font-semibold ${
//                   c.status === "resolved"
//                     ? "bg-green-500"
//                     : c.status === "assigned"
//                     ? "bg-yellow-400 text-black"
//                     : "bg-red-500"
//                 }`}
//               >
//                 {c.status}
//               </span>

//               {/* Action Button */}
//               <button
//                 onClick={() => updateStatus(c.id)}
//                 disabled={c.status === "resolved"}
//                 className={`mt-3 px-4 py-2 rounded ${
//                   c.status === "resolved"
//                     ? "bg-gray-400 cursor-not-allowed"
//                     : "bg-green-500 hover:bg-green-600"
//                 }`}
//               >
//                 {c.status === "resolved" ? "Marked ✔" : "Mark Resolved"}
//               </button>
//             </div>
//           ))}
//         </div>
//       )}
//     </Layout>
//   );
// }
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import Layout from "../components/Layout";
import MapView from "../components/MapView";

import {
  Bell,
  User,
  ClipboardList,
  Clock3,
  CheckCircle2,
  Star,
  Search,
  Filter,
  RefreshCw,
  History,
  Navigation,
  MapPinned,
  Phone,
  Eye,
} from "lucide-react";

import { motion } from "framer-motion";

export default function WorkerDashboard() {
  const navigate = useNavigate();

  /* =====================================================
                        STATES
  ===================================================== */

  const [complaints, setComplaints] = useState([]);
  const [notifications, setNotifications] = useState([]);

  const [showNotification, setShowNotification] =
    useState(false);

  const [search, setSearch] = useState("");

  const [priorityFilter, setPriorityFilter] =
    useState("All");

  const [statusFilter, setStatusFilter] =
    useState("All");

  const worker =
    JSON.parse(localStorage.getItem("user")) || {
      name: "Rahul Kumar",
    };

  /* =====================================================
                    FETCH COMPLAINTS
  ===================================================== */

  const fetchData = async () => {
    try {
      const res = await API.get("/complaints/my");

      setComplaints(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  /* =====================================================
                  FETCH NOTIFICATIONS
  ===================================================== */

  const fetchNotifications = async () => {
    try {
      const res = await API.get(
        "/complaints/notifications"
      );

      setNotifications(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
    fetchNotifications();
  }, []);

  /* =====================================================
                UPDATE STATUS
  ===================================================== */

  const updateStatus = async (id) => {
    try {
      await API.post("/complaints/status", {
        complaintId: id,
        status: "resolved",
      });

      setComplaints((prev) =>
        prev.map((c) =>
          c.id === id
            ? {
                ...c,
                status: "resolved",
              }
            : c
        )
      );
    } catch (err) {
      console.log(err);

      alert("Unable to update status");
    }
  };

  /* =====================================================
                    FILTER
  ===================================================== */

  const filteredComplaints =
    complaints.filter((c) => {
      const searchMatch =
        c.title
          ?.toLowerCase()
          .includes(search.toLowerCase()) ||
        c.description
          ?.toLowerCase()
          .includes(search.toLowerCase());

      const priorityMatch =
        priorityFilter === "All" ||
        c.priority === priorityFilter;

      const statusMatch =
        statusFilter === "All" ||
        c.status === statusFilter;

      return (
        searchMatch &&
        priorityMatch &&
        statusMatch
      );
    });

  /* =====================================================
                    DASHBOARD STATS
  ===================================================== */

  const stats = useMemo(() => {
    return {
      assigned: complaints.length,

      progress: complaints.filter(
        (c) =>
          c.status === "in-progress"
      ).length,

      completed: complaints.filter(
        (c) =>
          c.status === "resolved"
      ).length,

      rating: "4.8",
    };
  }, [complaints]);

  /* =====================================================
                    RETURN
  ===================================================== */

  return (
    <Layout title="Worker Dashboard">

      {/* ===========================================
                  HEADER
      =========================================== */}

      <motion.div
        initial={{
          opacity: 0,
          y: -20,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        className="flex justify-between items-center mb-8"
      >
        <div>

          <h1 className="text-4xl font-bold text-white">
            Good Morning,
            {` ${worker.name}`} 👋
          </h1>

          <p className="text-blue-100 mt-2">
            You have{" "}
            <span className="font-semibold">
              {stats.assigned}
            </span>{" "}
            assigned complaints today.
          </p>

        </div>

        <div className="flex items-center gap-5">

          {/* Notification */}

          <div className="relative">

            <button
              onClick={() =>
                setShowNotification(
                  !showNotification
                )
              }
              className="bg-white rounded-full p-3 shadow-lg relative"
            >
              <Bell className="text-blue-700" />

              {notifications.length >
                0 && (
                <span className="absolute -top-2 -right-2 bg-red-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs">
                  {
                    notifications.length
                  }
                </span>
              )}
            </button>

            {showNotification && (
              <div className="absolute right-0 mt-4 bg-white rounded-xl shadow-2xl w-80 p-4 z-50">

                <h3 className="font-bold mb-3">
                  Notifications
                </h3>

                {notifications.length ===
                0 ? (
                  <p className="text-gray-500">
                    No Notifications
                  </p>
                ) : (
                  notifications.map(
                    (n) => (
                      <div
                        key={n.id}
                        className="border-b py-3 text-sm"
                      >
                        ✔ {n.title}
                      </div>
                    )
                  )
                )}

              </div>
            )}

          </div>

          {/* Worker */}

          <div className="flex items-center gap-3 bg-white rounded-full px-5 py-2 shadow-lg">

            <div className="w-11 h-11 rounded-full bg-green-600 text-white flex items-center justify-center">

              <User />

            </div>

            <div>

              <h2 className="font-semibold text-gray-800">
                {worker.name}
              </h2>

              <p className="text-xs text-gray-500">
                Worker
              </p>

            </div>

          </div>

        </div>

      </motion.div>

      {/* ===========================================
                DASHBOARD CARDS
      =========================================== */}

      <motion.div
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        transition={{
          delay: 0.2,
        }}
        className="grid lg:grid-cols-4 md:grid-cols-2 gap-5 mb-8"
      >

        {/* Assigned */}

        <div className="bg-white rounded-2xl shadow-xl p-6">

          <div className="flex justify-between">

            <div>

              <p className="text-gray-500">
                Assigned
              </p>

              <h2 className="text-4xl font-bold mt-2">
                {stats.assigned}
              </h2>

            </div>

            <div className="bg-blue-100 p-4 rounded-xl">

              <ClipboardList className="text-blue-700" />

            </div>

          </div>

        </div>

        {/* Progress */}

        <div className="bg-white rounded-2xl shadow-xl p-6">

          <div className="flex justify-between">

            <div>

              <p className="text-gray-500">
                In Progress
              </p>

              <h2 className="text-4xl font-bold mt-2 text-yellow-600">
                {stats.progress}
              </h2>

            </div>

            <div className="bg-yellow-100 p-4 rounded-xl">

              <Clock3 className="text-yellow-700" />

            </div>

          </div>

        </div>

        {/* Completed */}

        <div className="bg-white rounded-2xl shadow-xl p-6">

          <div className="flex justify-between">

            <div>

              <p className="text-gray-500">
                Completed
              </p>

              <h2 className="text-4xl font-bold mt-2 text-green-600">
                {stats.completed}
              </h2>

            </div>

            <div className="bg-green-100 p-4 rounded-xl">

              <CheckCircle2 className="text-green-700" />

            </div>

          </div>

        </div>

        {/* Rating */}

        <div className="bg-white rounded-2xl shadow-xl p-6">

          <div className="flex justify-between">

            <div>

              <p className="text-gray-500">
                Rating
              </p>

              <h2 className="text-4xl font-bold mt-2 text-amber-500">
                {stats.rating}/5
              </h2>

            </div>

            <div className="bg-amber-100 p-4 rounded-xl">

              <Star className="text-amber-500" />

            </div>

          </div>

        </div>

      </motion.div>
            {/* ==========================================================
                    ROUTE MAP + QUICK ACTIONS
      ========================================================== */}

      <div className="grid lg:grid-cols-4 gap-6 mb-8">

        {/* ================= TODAY'S ROUTE MAP ================= */}

        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.25 }}
          className="lg:col-span-3 bg-white rounded-2xl shadow-xl overflow-hidden"
        >

          <div className="flex items-center justify-between px-6 py-4 border-b">

            <div className="flex items-center gap-3">

              <MapPinned
                className="text-green-600"
                size={22}
              />

              <div>

                <h2 className="text-xl font-bold text-gray-800">
                  Today's Route
                </h2>

                <p className="text-sm text-gray-500">
                  Assigned complaint locations
                </p>

              </div>

            </div>

            <button
              onClick={fetchData}
              className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-xl transition"
            >
              <RefreshCw size={18} />
              Refresh
            </button>

          </div>

          <div className="h-[430px]">

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

            {/* Refresh */}

            <button
              onClick={fetchData}
              className="w-full flex items-center gap-4 bg-green-600 hover:bg-green-700 text-white rounded-xl p-4 transition"
            >
              <RefreshCw size={22} />

              <span className="font-semibold">
                Refresh
              </span>

            </button>

            {/* History */}

            <button
              onClick={() => navigate("/history")}
              className="w-full flex items-center gap-4 bg-gray-100 hover:bg-gray-200 rounded-xl p-4 transition"
            >
              <History
                size={22}
                className="text-gray-700"
              />

              <span className="font-semibold text-gray-700">
                History
              </span>

            </button>

            {/* Navigate */}

            <button
              onClick={() => navigate("/map")}
              className="w-full flex items-center gap-4 bg-gray-100 hover:bg-gray-200 rounded-xl p-4 transition"
            >
              <Navigation
                size={22}
                className="text-gray-700"
              />

              <span className="font-semibold text-gray-700">
                Navigate
              </span>

            </button>

          </div>

          {/* ================= TODAY SUMMARY ================= */}

          <div className="mt-8 border-t pt-6">

            <h3 className="font-bold text-lg text-gray-800 mb-4">
              Today's Summary
            </h3>

            <div className="space-y-4">

              <div className="flex justify-between items-center">

                <span className="text-gray-600">
                  Assigned
                </span>

                <span className="font-bold text-blue-600">
                  {stats.assigned}
                </span>

              </div>

              <div className="flex justify-between items-center">

                <span className="text-gray-600">
                  In Progress
                </span>

                <span className="font-bold text-yellow-600">
                  {stats.progress}
                </span>

              </div>

              <div className="flex justify-between items-center">

                <span className="text-gray-600">
                  Completed
                </span>

                <span className="font-bold text-green-600">
                  {stats.completed}
                </span>

              </div>

              <div className="flex justify-between items-center">

                <span className="text-gray-600">
                  Average Rating
                </span>

                <span className="font-bold text-amber-500">
                  ⭐ {stats.rating}
                </span>

              </div>

            </div>

          </div>

        </motion.div>

      </div>

      {/* ==========================================================
                    SEARCH & FILTER BAR
      ========================================================== */}
            {/* ==========================================================
                      SEARCH & FILTER SECTION
      ========================================================== */}

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.45 }}
        className="bg-white rounded-2xl shadow-xl p-5 mb-8"
      >
        <div className="grid lg:grid-cols-4 gap-4">

          {/* ================= Search ================= */}

          <div className="relative lg:col-span-2">

            <Search
              size={20}
              className="absolute left-4 top-3.5 text-gray-400"
            />

            <input
              type="text"
              placeholder="Search Complaint..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full border rounded-xl py-3 pl-12 pr-4 outline-none focus:ring-2 focus:ring-green-500"
            />

          </div>

          {/* ================= Priority ================= */}

          <div className="relative">

            <Filter
              size={18}
              className="absolute left-4 top-3.5 text-gray-400"
            />

            <select
              value={priorityFilter}
              onChange={(e) =>
                setPriorityFilter(e.target.value)
              }
              className="w-full border rounded-xl py-3 pl-12 pr-4 outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="All">
                All Priority
              </option>

              <option value="High">
                🔴 High
              </option>

              <option value="Medium">
                🟡 Medium
              </option>

              <option value="Low">
                🟢 Low
              </option>

            </select>

          </div>

          {/* ================= Status ================= */}

          <div>

            <select
              value={statusFilter}
              onChange={(e) =>
                setStatusFilter(e.target.value)
              }
              className="w-full border rounded-xl py-3 px-4 outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="All">
                All Status
              </option>

              <option value="assigned">
                Assigned
              </option>

              <option value="in-progress">
                In Progress
              </option>

              <option value="resolved">
                Resolved
              </option>

            </select>

          </div>

        </div>
      </motion.div>

      {/* ==========================================================
                    COMPLAINT LIST STARTS
      ========================================================== */}

      <div className="space-y-6"></div>
              {filteredComplaints.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white rounded-2xl shadow-xl p-16 text-center"
          >
            <ClipboardList
              size={60}
              className="mx-auto text-gray-400 mb-5"
            />

            <h2 className="text-2xl font-bold text-gray-700">
              No Assigned Complaints
            </h2>

            <p className="text-gray-500 mt-2">
              There are no complaints matching your filters.
            </p>
          </motion.div>
        ) : (
          filteredComplaints.map((c, index) => {
            const status =
              (c.status || "assigned").toLowerCase();

            const priority =
              (c.priority || "Medium").toLowerCase();

            const priorityStyle =
              priority === "high"
                ? "bg-red-100 text-red-700"
                : priority === "medium"
                ? "bg-yellow-100 text-yellow-700"
                : "bg-green-100 text-green-700";

            const statusStyle =
              status === "resolved"
                ? "bg-green-100 text-green-700"
                : status === "in-progress"
                ? "bg-blue-100 text-blue-700"
                : "bg-yellow-100 text-yellow-700";

            return (
              <motion.div
                key={c.id}
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: index * 0.06,
                }}
                className="bg-white rounded-2xl shadow-xl overflow-hidden"
              >
                {/* =====================================
                              HEADER
                ===================================== */}

                <div className="flex flex-col lg:flex-row justify-between gap-5 p-6">

                  <div className="flex-1">

                    <div className="flex flex-wrap items-center gap-3">

                      <h2 className="text-2xl font-bold text-gray-800">
                        📍 {c.title}
                      </h2>

                      <span
                        className={`px-4 py-1 rounded-full text-sm font-semibold ${statusStyle}`}
                      >
                        {status}
                      </span>

                    </div>

                    <p className="text-gray-500 mt-3">
                      {c.description}
                    </p>

                  </div>

                </div>

                {/* =====================================
                             DETAILS
                ===================================== */}

                <div className="px-6 pb-5">

                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 text-gray-700">

                    <div>

                      <p>
                        <span className="font-semibold">
                          Citizen :
                        </span>{" "}
                        {c.userName ||
                          c.user?.name ||
                          "Citizen"}
                      </p>

                      <p className="mt-2">
                        <span className="font-semibold">
                          Category :
                        </span>{" "}
                        {c.category || "General"}
                      </p>

                    </div>

                    <div>

                      <p>
                        <span className="font-semibold">
                          Priority :
                        </span>
                      </p>

                      <span
                        className={`inline-block mt-2 px-3 py-1 rounded-full text-sm font-semibold ${priorityStyle}`}
                      >
                        {priority === "high"
                          ? "🔴 High"
                          : priority === "medium"
                          ? "🟡 Medium"
                          : "🟢 Low"}
                      </span>

                    </div>

                    <div>

                      <p>
                        <span className="font-semibold">
                          Reported :
                        </span>{" "}
                        {c.createdAt
                          ? new Date(
                              c.createdAt
                            ).toLocaleDateString()
                          : "Today"}
                      </p>

                      {status === "resolved" && (
                        <p className="mt-2">
                          <span className="font-semibold">
                            Completed :
                          </span>{" "}
                          Today
                        </p>
                      )}

                    </div>

                    <div>

                      <p>
                        <span className="font-semibold">
                          Status :
                        </span>
                      </p>

                      <span
                        className={`inline-block mt-2 px-3 py-1 rounded-full text-sm font-semibold ${statusStyle}`}
                      >
                        {status}
                      </span>

                    </div>

                  </div>

                  {/* =====================================
                          COMPLAINT IMAGE
                  ===================================== */}

                  {c.imageUrl && (
                    <div className="mt-6">

                      <img
                        src={c.imageUrl}
                        alt={c.title}
                        className="w-full h-72 object-cover rounded-xl border"
                      />

                    </div>
                  )}

                </div>

                {/* =====================================
                             ACTIONS
                ===================================== */}

                <div className="border-t bg-gray-50 px-6 py-5">

                  <div className="flex flex-wrap gap-3">

                    {/* Open Map */}

                    <button
                      onClick={() =>
                        window.open(
                          `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                            c.location ||
                              c.address ||
                              ""
                          )}`,
                          "_blank"
                        )
                      }
                      className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl transition"
                    >
                      <MapPinned size={18} />
                      Open Map
                    </button>

                    {/* Contact */}

                    <button
                      onClick={() => {
                        if (c.phone) {
                          window.location.href = `tel:${c.phone}`;
                        } else {
                          alert(
                            "Citizen phone number not available."
                          );
                        }
                      }}
                      className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-5 py-3 rounded-xl transition"
                    >
                      <Phone size={18} />
                      Contact Citizen
                    </button>

                    {/* View */}

                    <button
                      onClick={() =>
                        navigate(`/complaint/${c.id}`)
                      }
                      className="flex items-center gap-2 bg-gray-700 hover:bg-gray-800 text-white px-5 py-3 rounded-xl transition"
                    >
                      <Eye size={18} />
                      View Details
                    </button>

                    {/* Mark Resolved */}

                    {status !== "resolved" && (
                      <button
                        onClick={() =>
                          updateStatus(c.id)
                        }
                        className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-xl transition ml-auto"
                      >
                        <CheckCircle2 size={18} />
                        Mark Resolved
                      </button>
                    )}

                  </div>

                  {/* =====================================
                          RATING SECTION
                  ===================================== */}

                  {status === "resolved" && (
                    <div className="mt-6 border-t pt-5 flex items-center justify-between">

                      <div>

                        <h3 className="font-bold text-lg text-gray-800">
                          ⭐ Service Rating
                        </h3>

                        <p className="text-gray-500">
                          Citizen feedback
                        </p>

                      </div>

                      <div className="text-3xl">
                        ⭐⭐⭐⭐⭐
                      </div>

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