// import { useEffect, useState } from "react";
// import API from "../services/api";
// import Layout from "../components/Layout";

// import {
//   Chart as ChartJS,
//   BarElement,
//   CategoryScale,
//   LinearScale,
//   Tooltip,
//   Legend,
// } from "chart.js";
// import { Bar } from "react-chartjs-2";

// ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

// export default function AdminDashboard() {
//   const [complaints, setComplaints] = useState([]);
//   const [workers, setWorkers] = useState({});

//   const [workerForm, setWorkerForm] = useState({
//     name: "",
//     email: "",
//     password: "",
//   });

//   const fetchData = async () => {
//     const res = await API.get("/complaints");
//     setComplaints(res.data);
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);

//   // 🔧 Assign worker
//   const assignWorker = async (complaintId) => {
//     const workerId = workers[complaintId];
//     if (!workerId) return alert("Enter worker ID");

//     await API.post("/complaints/assign", {
//       complaintId,
//       workerId,
//     });

//     setWorkers((prev) => ({ ...prev, [complaintId]: "" }));
//     fetchData();
//   };

//   // 🔧 Create Worker
//   const createWorker = async () => {
//     try {
//       await API.post("/auth/create-worker", workerForm);

//       alert("Worker created!");
//       setWorkerForm({ name: "", email: "", password: "" });
//     } catch (err) {
//       console.error(err);
//       alert("Error creating worker");
//     }
//   };

//   // 📊 Chart Data
//   const chartData = {
//     labels: ["Pending", "Assigned", "Resolved"],
//     datasets: [
//       {
//         label: "Complaints",
//         data: [
//           complaints.filter((c) => c.status === "pending").length,
//           complaints.filter((c) => c.status === "assigned").length,
//           complaints.filter((c) => c.status === "resolved").length,
//         ],
//         backgroundColor: ["#ef4444", "#facc15", "#22c55e"],
//       },
//     ],
//   };

//   return (
//     <Layout title="Admin Dashboard">

//       {/* 📊 Analytics */}
//       <div className="bg-white p-5 rounded-xl mb-6 text-black">
//         <Bar data={chartData} />
//       </div>

//       {/* 👷 Create Worker */}
//       <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-5 rounded-xl mb-6">
//         <h3 className="font-bold mb-3">Create Worker</h3>

//         <div className="grid md:grid-cols-3 gap-3">
//           <input
//             placeholder="Name"
//             value={workerForm.name}
//             onChange={(e) =>
//               setWorkerForm({ ...workerForm, name: e.target.value })
//             }
//             className="p-2 rounded text-black"
//           />

//           <input
//             placeholder="Email"
//             value={workerForm.email}
//             onChange={(e) =>
//               setWorkerForm({ ...workerForm, email: e.target.value })
//             }
//             className="p-2 rounded text-black"
//           />

//           <input
//             placeholder="Password"
//             type="password"
//             value={workerForm.password}
//             onChange={(e) =>
//               setWorkerForm({ ...workerForm, password: e.target.value })
//             }
//             className="p-2 rounded text-black"
//           />
//         </div>

//         <button
//           onClick={createWorker}
//           className="mt-3 bg-green-500 px-4 py-2 rounded"
//         >
//           Create Worker
//         </button>
//       </div>

//       {/* 📋 Complaints */}
//       <h2 className="text-2xl font-bold mb-6">All Complaints</h2>

//       {complaints.length === 0 ? (
//         <p>No complaints found</p>
//       ) : (
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
//           {complaints.map((c) => (
//             <div
//               key={c.id}
//               className="bg-white/10 backdrop-blur-xl border border-white/20 p-5 rounded-2xl shadow-xl hover:scale-[1.02] transition"
//             >
//               <h4 className="text-lg font-semibold">{c.title}</h4>
//               <p className="text-sm mb-2">{c.description}</p>

//               {/* Status */}
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

//               {/* Actions */}
//               <div className="mt-3">

//                 {c.status === "pending" && (
//                   <div className="flex gap-2 mt-2">
//                     <input
//                       placeholder="Worker ID"
//                       value={workers[c.id] || ""}
//                       onChange={(e) =>
//                         setWorkers({
//                           ...workers,
//                           [c.id]: e.target.value,
//                         })
//                       }
//                       className="p-2 rounded text-black flex-1"
//                     />

//                     <button
//                       onClick={() => assignWorker(c.id)}
//                       className="bg-green-500 px-3 py-1 rounded"
//                     >
//                       Assign
//                     </button>
//                   </div>
//                 )}

//                 {c.status === "assigned" && (
//                   <p className="mt-2 text-yellow-300 font-semibold">
//                     Worker Assigned
//                   </p>
//                 )}

//                 {c.status === "resolved" && (
//                   <p className="mt-2 text-green-300 font-bold">
//                     ✔ Resolved
//                   </p>
//                 )}

//                 {/* Delete (for all statuses) */}
//                 <button
//                   onClick={async () => {
//                     if (window.confirm("Delete complaint?")) {
//                       await API.delete(`/complaints/${c.id}`);
//                       fetchData();
//                     }
//                   }}
//                   className="mt-3 bg-red-500 px-3 py-1 rounded"
//                 >
//                   Delete
//                 </button>
//               </div>

//               {c.imageUrl && (
//                 <img
//                   src={c.imageUrl}
//                   className="mt-3 rounded h-40 w-full object-cover"
//                 />
//               )}
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

import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

import { Bar } from "react-chartjs-2";

import {
  Bell,
  User,
  FileText,
  Clock3,
  CheckCircle2,
  Wrench,
  Users,
  Plus,
  Search,
  Filter,
  Download,
  Eye,
  Trash2,
} from "lucide-react";

import { motion } from "framer-motion";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend
);

export default function AdminDashboard() {
  const navigate = useNavigate();

  /* ======================================================
                        STATES
  ====================================================== */

  const [complaints, setComplaints] = useState([]);
  const [notifications, setNotifications] = useState([]);

  const [workers, setWorkers] = useState([]);

  const [selectedWorker, setSelectedWorker] = useState({});

  const [showNotifications, setShowNotifications] =
    useState(false);

  const [search, setSearch] = useState("");

  const [statusFilter, setStatusFilter] =
    useState("All");

  const [categoryFilter, setCategoryFilter] =
    useState("All");

  const [workerForm, setWorkerForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  /* ======================================================
                    FETCH DATA
  ====================================================== */

  const fetchData = async () => {
    try {
      const res = await API.get("/complaints");
      setComplaints(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchWorkers = async () => {
    try {
      const res = await API.get("/workers");

      setWorkers(res.data);
    } catch (err) {
      console.log(err);
    }
  };

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
    fetchWorkers();
    fetchNotifications();
  }, []);

  /* ======================================================
                CREATE WORKER
  ====================================================== */

  const createWorker = async () => {
    try {
      await API.post(
        "/auth/create-worker",
        workerForm
      );

      alert("Worker Created Successfully");

      setWorkerForm({
        name: "",
        email: "",
        password: "",
      });

      fetchWorkers();
    } catch (err) {
      console.log(err);

      alert("Unable to create worker");
    }
  };

  /* ======================================================
                ASSIGN WORKER
  ====================================================== */

  const assignWorker = async (complaintId) => {
    try {
      const workerId =
        selectedWorker[complaintId];

      if (!workerId)
        return alert("Select Worker");

      await API.post("/complaints/assign", {
        complaintId,
        workerId,
      });

      fetchData();
    } catch (err) {
      console.log(err);
    }
  };

  /* ======================================================
                DELETE COMPLAINT
  ====================================================== */

  const deleteComplaint = async (id) => {
    if (
      !window.confirm(
        "Delete this complaint?"
      )
    )
      return;

    try {
      await API.delete(`/complaints/${id}`);

      fetchData();
    } catch (err) {
      console.log(err);
    }
  };

  /* ======================================================
                    FILTER
  ====================================================== */

  const filteredComplaints =
    complaints.filter((c) => {
      const searchMatch =
        c.title
          ?.toLowerCase()
          .includes(search.toLowerCase()) ||
        c.description
          ?.toLowerCase()
          .includes(search.toLowerCase());

      const statusMatch =
        statusFilter === "All" ||
        c.status === statusFilter;

      const categoryMatch =
        categoryFilter === "All" ||
        c.category === categoryFilter;

      return (
        searchMatch &&
        statusMatch &&
        categoryMatch
      );
    });

  /* ======================================================
                    STATS
  ====================================================== */

  const stats = useMemo(() => {
    return {
      total: complaints.length,

      pending: complaints.filter(
        (c) => c.status === "pending"
      ).length,

      assigned: complaints.filter(
        (c) => c.status === "assigned"
      ).length,

      resolved: complaints.filter(
        (c) => c.status === "resolved"
      ).length,

      workers: workers.length,
    };
  }, [complaints, workers]);

  /* ======================================================
                    CHART DATA
  ====================================================== */

  const chartData = {
    labels: [
      "Pending",
      "Assigned",
      "Resolved",
    ],

    datasets: [
      {
        label: "Complaints",

        data: [
          stats.pending,
          stats.assigned,
          stats.resolved,
        ],

        backgroundColor: [
          "#ef4444",
          "#facc15",
          "#22c55e",
        ],

        borderRadius: 10,
      },
    ],
  };

  /* ======================================================
                    RETURN
  ====================================================== */

  return (
    <Layout title="Admin Dashboard">

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
            Welcome Back,
            Administrator 👋
          </h1>

          <p className="text-blue-100 mt-2">
            Manage complaints,
            workers and city
            operations efficiently.
          </p>

        </div>

        <div className="flex items-center gap-5">

          {/* Notifications */}

          <div className="relative">

            <button
              onClick={() =>
                setShowNotifications(
                  !showNotifications
                )
              }
              className="relative bg-white p-3 rounded-full shadow-lg"
            >
              <Bell className="text-blue-700" />

              {notifications.length >
                0 && (
                <span className="absolute -top-2 -right-2 bg-red-600 text-white w-6 h-6 rounded-full text-xs flex items-center justify-center">
                  {
                    notifications.length
                  }
                </span>
              )}
            </button>

            {showNotifications && (
              <div className="absolute right-0 mt-4 bg-white rounded-xl shadow-2xl w-80 p-4 z-50">

                <h3 className="font-bold mb-3">
                  Notifications
                </h3>

                {notifications.length ===
                0 ? (
                  <p className="text-gray-500">
                    No notifications
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

          {/* Admin */}

          <div className="flex items-center gap-3 bg-white rounded-full px-5 py-2 shadow-lg">

            <div className="w-11 h-11 rounded-full bg-blue-600 flex items-center justify-center text-white">

              <User />

            </div>

            <div>

              <h2 className="font-semibold text-gray-800">
                Admin
              </h2>

              <p className="text-xs text-gray-500">
                Administrator
              </p>

            </div>

          </div>

        </div>

      </motion.div>

      {/* ===========================================
                  STATISTICS
      =========================================== */}

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          delay: 0.2,
        }}
        className="grid lg:grid-cols-5 md:grid-cols-3 gap-5 mb-8"
      >

        {/* Total */}

        <div className="bg-white rounded-2xl shadow-xl p-6">

          <div className="flex justify-between">

            <div>

              <p className="text-gray-500">
                Total
                Complaints
              </p>

              <h2 className="text-4xl font-bold mt-2">
                {stats.total}
              </h2>

            </div>

            <div className="bg-blue-100 p-4 rounded-xl">

              <FileText className="text-blue-700" />

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

              <h2 className="text-4xl font-bold mt-2 text-red-600">
                {stats.pending}
              </h2>

            </div>

            <div className="bg-red-100 p-4 rounded-xl">

              <Clock3 className="text-red-600" />

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

              <Wrench className="text-yellow-700" />

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

              <CheckCircle2 className="text-green-700" />

            </div>

          </div>

        </div>

        {/* Workers */}

        <div className="bg-white rounded-2xl shadow-xl p-6">

          <div className="flex justify-between">

            <div>

              <p className="text-gray-500">
                Active Workers
              </p>

              <h2 className="text-4xl font-bold mt-2 text-indigo-600">
                {stats.workers}
              </h2>

            </div>

            <div className="bg-indigo-100 p-4 rounded-xl">

              <Users className="text-indigo-700" />

            </div>

          </div>

        </div>

      </motion.div>
            {/* ==========================================================
                      ANALYTICS + QUICK ACTIONS
      ========================================================== */}

      <div className="grid lg:grid-cols-3 gap-6 mb-8">

        {/* ===================== Analytics ===================== */}

        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="lg:col-span-2 bg-white rounded-2xl shadow-xl p-6"
        >

          <div className="flex justify-between items-center mb-5">

            <div>

              <h2 className="text-2xl font-bold text-gray-800">
                Complaint Analytics
              </h2>

              <p className="text-gray-500 mt-1">
                Status-wise complaint distribution
              </p>

            </div>

            <button
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl transition"
            >
              <Download size={18} />
              Export Report
            </button>

          </div>

          <div className="h-[380px]">

            <Bar
              data={chartData}
              options={{
                responsive: true,
                maintainAspectRatio: false,

                plugins: {
                  legend: {
                    display: false,
                  },
                },

                scales: {
                  y: {
                    beginAtZero: true,
                  },
                },
              }}
            />

          </div>

        </motion.div>

        {/* ===================== Quick Actions ===================== */}

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.35 }}
          className="bg-white rounded-2xl shadow-xl p-6"
        >

          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Quick Actions
          </h2>

          <div className="space-y-4">

            {/* Create Worker */}

            <button
              className="w-full flex items-center gap-3 bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-xl transition"
            >
              <Plus size={20} />
              Create Worker
            </button>

            {/* View Workers */}

            <button
              onClick={() => navigate("/workers")}
              className="w-full flex items-center gap-3 bg-gray-100 hover:bg-gray-200 p-4 rounded-xl transition"
            >
              <Users
                size={20}
                className="text-gray-700"
              />

              <span className="font-medium text-gray-700">
                View Workers
              </span>
            </button>

            {/* Export */}

            <button
              className="w-full flex items-center gap-3 bg-gray-100 hover:bg-gray-200 p-4 rounded-xl transition"
            >
              <Download
                size={20}
                className="text-gray-700"
              />

              <span className="font-medium text-gray-700">
                Export Reports
              </span>
            </button>

          </div>

          {/* ==========================================
                    CREATE WORKER FORM
          ========================================== */}

          <div className="mt-8 border-t pt-6">

            <h3 className="font-bold text-lg text-gray-800 mb-4">
              Create Worker
            </h3>

            <div className="space-y-4">

              <input
                type="text"
                placeholder="Worker Name"
                value={workerForm.name}
                onChange={(e) =>
                  setWorkerForm({
                    ...workerForm,
                    name: e.target.value,
                  })
                }
                className="w-full border rounded-xl p-3 focus:ring-2 focus:ring-blue-500 outline-none"
              />

              <input
                type="email"
                placeholder="Worker Email"
                value={workerForm.email}
                onChange={(e) =>
                  setWorkerForm({
                    ...workerForm,
                    email: e.target.value,
                  })
                }
                className="w-full border rounded-xl p-3 focus:ring-2 focus:ring-blue-500 outline-none"
              />

              <input
                type="password"
                placeholder="Password"
                value={workerForm.password}
                onChange={(e) =>
                  setWorkerForm({
                    ...workerForm,
                    password: e.target.value,
                  })
                }
                className="w-full border rounded-xl p-3 focus:ring-2 focus:ring-blue-500 outline-none"
              />

              <button
                onClick={createWorker}
                className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-semibold transition"
              >
                Create Worker
              </button>

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
              onChange={(e) =>
                setSearch(e.target.value)
              }
              className="w-full border rounded-xl py-3 pl-12 pr-4 focus:ring-2 focus:ring-blue-500 outline-none"
            />

          </div>

          {/* ================= Status ================= */}

          <div className="relative">

            <Filter
              size={18}
              className="absolute left-4 top-3.5 text-gray-400"
            />

            <select
              value={statusFilter}
              onChange={(e) =>
                setStatusFilter(e.target.value)
              }
              className="w-full border rounded-xl py-3 pl-12 pr-4 outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="All">
                All Status
              </option>

              <option value="pending">
                Pending
              </option>

              <option value="assigned">
                Assigned
              </option>

              <option value="resolved">
                Resolved
              </option>

            </select>

          </div>

          {/* ================= Category ================= */}

          <div>

            <select
              value={categoryFilter}
              onChange={(e) =>
                setCategoryFilter(e.target.value)
              }
              className="w-full border rounded-xl py-3 px-4 outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="All">
                All Categories
              </option>

              <option value="Road">
                Road
              </option>

              <option value="Electricity">
                Electricity
              </option>

              <option value="Water">
                Water
              </option>

              <option value="Garbage">
                Garbage
              </option>

              <option value="Drainage">
                Drainage
              </option>

              <option value="Street Light">
                Street Light
              </option>

              <option value="Others">
                Others
              </option>

            </select>

          </div>

        </div>

      </motion.div>

      {/* ==========================================================
                      COMPLAINT LIST
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
              Try changing the filters or search keywords.
            </p>

          </motion.div>
        ) : (
          filteredComplaints.map((c, index) => {

            const status =
              c.status?.toLowerCase() || "pending";

            const badgeStyle =
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
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.06 }}
                className="bg-white rounded-2xl shadow-xl overflow-hidden"
              >

                {/* ==========================================
                            HEADER
                ========================================== */}

                <div className="flex flex-col lg:flex-row justify-between lg:items-start gap-5 p-6">

                  <div className="flex-1">

                    <div className="flex items-center gap-3">

                      <h2 className="text-2xl font-bold text-gray-800">
                        📍 {c.title}
                      </h2>

                      <span
                        className={`px-4 py-1 rounded-full text-sm font-semibold ${badgeStyle}`}
                      >
                        {c.status}
                      </span>

                    </div>

                    <p className="text-gray-500 mt-3">
                      {c.description}
                    </p>

                  </div>

                </div>

                {/* ==========================================
                            DETAILS
                ========================================== */}

                <div className="px-6 pb-5">

                  <div className="grid md:grid-cols-3 gap-6 text-gray-700">

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
                          Reported :
                        </span>{" "}
                        {c.createdAt
                          ? new Date(
                              c.createdAt
                            ).toLocaleDateString()
                          : "-"}
                      </p>

                      {status !== "pending" && (
                        <p className="mt-2">
                          <span className="font-semibold">
                            Worker :
                          </span>{" "}
                          {c.workerName ||
                            c.worker?.name ||
                            "Assigned"}
                        </p>
                      )}

                    </div>

                    <div>

                      {status === "resolved" ? (
                        <p>
                          <span className="font-semibold">
                            Resolution Time :
                          </span>{" "}
                          {c.resolutionTime ||
                            "5 Hours"}
                        </p>
                      ) : status ===
                        "assigned" ? (
                        <p>
                          <span className="font-semibold">
                            ETA :
                          </span>{" "}
                          {c.eta || "2 Days"}
                        </p>
                      ) : (
                        <p className="text-red-600 font-semibold">
                          Waiting for worker assignment
                        </p>
                      )}

                    </div>

                  </div>

                  {/* =====================================
                              IMAGE
                  ===================================== */}

                  {c.imageUrl && (
                    <img
                      src={c.imageUrl}
                      alt=""
                      className="mt-6 rounded-xl h-64 w-full object-cover border"
                    />
                  )}

                </div>

                {/* ==========================================
                          ASSIGN WORKER
                ========================================== */}

                {status === "pending" && (
                  <div className="border-t px-6 py-5 bg-gray-50">

                    <div className="flex flex-col md:flex-row gap-4">

                      <select
                        value={
                          selectedWorker[
                            c.id
                          ] || ""
                        }
                        onChange={(e) =>
                          setSelectedWorker({
                            ...selectedWorker,
                            [c.id]:
                              e.target.value,
                          })
                        }
                        className="flex-1 border rounded-xl p-3 outline-none focus:ring-2 focus:ring-blue-500"
                      >

                        <option value="">
                          Select Worker
                        </option>

                        {workers.map((w) => (
                          <option
                            key={w.id}
                            value={w.id}
                          >
                            {w.name}
                          </option>
                        ))}

                      </select>

                      <button
                        onClick={() =>
                          assignWorker(c.id)
                        }
                        className="bg-green-600 hover:bg-green-700 text-white px-8 rounded-xl transition"
                      >
                        Assign
                      </button>

                    </div>

                  </div>
                )}

                {/* ==========================================
                          ACTIONS
                ========================================== */}

                <div className="border-t px-6 py-4 bg-gray-50 flex flex-wrap gap-3 items-center">

                  <span
                    className={`w-3 h-3 rounded-full ${dotColor}`}
                  />

                  <span className="font-medium capitalize text-gray-700">
                    {status}
                  </span>

                  <div className="ml-auto flex flex-wrap gap-3">

                    <button
                      onClick={() =>
                        navigate(
                          `/complaint/${c.id}`
                        )
                      }
                      className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg transition"
                    >
                      <Eye size={18} />
                      View
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

                  </div>

                </div>

              </motion.div>

            );

          })
        )}
    </Layout>
  );
}