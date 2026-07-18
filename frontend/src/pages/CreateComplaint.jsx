// import { useState, useEffect } from "react";
// import API from "../services/api";
// import { useNavigate } from "react-router-dom";
// import MapView from "../components/MapView";

// export default function CreateComplaint() {
//   const navigate = useNavigate();

//   const [form, setForm] = useState({
//     title: "",
//     description: "",
//     latitude: "",
//     longitude: "",
//     category: "",
//   });

//   const [image, setImage] = useState(null);
//   const [preview, setPreview] = useState(null);

//   // 🔍 NEW: search state
//   const [search, setSearch] = useState("");

//   // 🔥 Auto-detect location
//   useEffect(() => {
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(
//         (pos) => {
//           setForm((prev) => ({
//             ...prev,
//             latitude: pos.coords.latitude.toFixed(6),
//             longitude: pos.coords.longitude.toFixed(6),
//           }));
//         },
//         () => console.log("Location access denied")
//       );
//     }
//   }, []);

//   // 🔥 Map click
//   const setCoordinates = (lat, lng) => {
//     setForm((prev) => ({
//       ...prev,
//       latitude: lat.toFixed(6),
//       longitude: lng.toFixed(6),
//     }));
//   };

//   // 🔍 NEW: Search location (Geocoding)
//   const handleSearch = async () => {
//     try {
//       if (!search) return;

//       const res = await fetch(
//         `https://nominatim.openstreetmap.org/search?format=json&q=${search}`
//       );

//       const data = await res.json();

//       if (data.length > 0) {
//         const lat = parseFloat(data[0].lat);
//         const lng = parseFloat(data[0].lon);

//         setCoordinates(lat, lng);
//       } else {
//         alert("Location not found");
//       }
//     } catch (err) {
//       console.error(err);
//       alert("Search failed");
//     }
//   };

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleImage = (e) => {
//     const file = e.target.files[0];
//     setImage(file);
//     setPreview(URL.createObjectURL(file));
//   };

//   const handleSubmit = async () => {
//     try {
//       const formData = new FormData();

//       Object.keys(form).forEach((key) => {
//         formData.append(key, form[key]);
//       });

//       if (image) formData.append("image", image);

//       await API.post("/complaints", formData);

//       alert("Complaint submitted!");
//       navigate("/");
//     } catch (err) {
//       console.error(err);
//       alert("Error submitting complaint");
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-r from-purple-500 to-blue-500 text-white">

//       {/* Navbar */}
//       <div className="flex justify-between items-center px-10 py-4 bg-white/10 backdrop-blur-lg">
//         <h1 className="text-xl font-bold">Report Issue</h1>

//         <button
//           onClick={() => navigate("/")}
//           className="bg-white text-purple-600 px-4 py-2 rounded font-semibold hover:bg-gray-200"
//         >
//           ← Dashboard
//         </button>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-10">

//         {/* 🗺️ Map Section */}
//         <div className="bg-white/10 backdrop-blur-lg p-4 rounded-xl">

//           <h2 className="mb-3 font-semibold">Select Location</h2>

//           {/* 🔍 Search UI */}
//           <div className="flex gap-2 mb-3">
//             <input
//               value={search}
//               onChange={(e) => setSearch(e.target.value)}
//               placeholder="Search place (e.g. Sakchi, Jamshedpur)"
//               className="flex-1 p-2 rounded text-black"
//             />
//             <button
//               onClick={handleSearch}
//               className="bg-yellow-400 text-black px-3 rounded"
//             >
//               Search
//             </button>
//           </div>

//           <MapView setCoordinates={setCoordinates} />
//         </div>

//         {/* 📝 Form Section */}
//         <div className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl shadow-xl">

//           <input
//             name="title"
//             placeholder="Title"
//             onChange={handleChange}
//             className="w-full mb-3 p-3 rounded bg-white/20 placeholder-white"
//           />

//           <textarea
//             name="description"
//             placeholder="Description"
//             onChange={handleChange}
//             className="w-full mb-3 p-3 rounded bg-white/20 placeholder-white"
//           />

//           {/* Coordinates */}
//           <input
//             value={form.latitude}
//             readOnly
//             className="w-full mb-3 p-3 rounded bg-white/20"
//           />

//           <input
//             value={form.longitude}
//             readOnly
//             className="w-full mb-3 p-3 rounded bg-white/20 placeholder-white"
//           />

//           <input
//             name="category"
//             placeholder="Category"
//             onChange={handleChange}
//             className="w-full mb-3 p-3 rounded bg-white/20 placeholder-white"
//           />

//           <input type="file" onChange={handleImage} className="mb-3" />

//           {preview && (
//             <img src={preview} className="mb-3 rounded h-32 object-cover" />
//           )}

//           <button
//             onClick={handleSubmit}
//             className="w-full bg-gradient-to-r from-purple-600 to-pink-500 p-3 rounded font-semibold"
//           >
//             Submit Complaint
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import MapView from "../components/MapView";

export default function CreateComplaint() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    description: "",
    latitude: "",
    longitude: "",
    category: "Roads",
  });

  const [search, setSearch] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        setForm((prev) => ({
          ...prev,
          latitude: pos.coords.latitude.toFixed(6),
          longitude: pos.coords.longitude.toFixed(6),
        }));
      });
    }
  }, []);

  const setCoordinates = (lat, lng) => {
    setForm((prev) => ({
      ...prev,
      latitude: lat.toFixed(6),
      longitude: lng.toFixed(6),
    }));
  };

  const handleSearch = async () => {
    if (!search) return;

    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${search}`
      );

      const data = await res.json();

      if (data.length > 0) {
        setCoordinates(parseFloat(data[0].lat), parseFloat(data[0].lon));
      } else {
        alert("Location not found");
      }
    } catch (err) {
      alert("Search failed");
    }
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleImage = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async () => {
    try {
      const fd = new FormData();

      Object.keys(form).forEach((key) => {
        fd.append(key, form[key]);
      });

      if (image) fd.append("image", image);

      await API.post("/complaints", fd);

      alert("Complaint Submitted Successfully");

      navigate("/");
    } catch (err) {
      console.log(err);
      alert("Submission Failed");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">

      {/* ================= NAVBAR ================= */}

      <div className="bg-white shadow-sm border-b px-8 py-4 flex justify-between items-center">

        <div className="flex items-center gap-5">

          <button
            onClick={() => navigate("/dashboard")}
            className="text-blue-600 font-semibold hover:text-blue-800"
          >
            ← Dashboard
          </button>

          <h1 className="text-2xl font-bold text-gray-800">
            Report a New Complaint
          </h1>

        </div>

        <div className="flex items-center gap-2">

          <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold">
            C
          </div>

          <div>
            <p className="font-semibold text-gray-800">Citizen</p>
          </div>

        </div>

      </div>

      {/* ================= BODY ================= */}

      <div className="p-8">

        <h2 className="text-2xl font-bold text-gray-700 mb-6">
          📍 Step 1: Select Location
        </h2>

        <div className="grid lg:grid-cols-2 gap-8">

          {/* ================= LEFT ================= */}

          <div className="bg-white rounded-xl shadow-md p-5">

            {/* Search */}

            <label className="font-semibold text-gray-700">
              🔍 Search Location
            </label>

            <div className="flex mt-3 gap-3">

              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search Address..."
                className="flex-1 border rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
              />

              <button
                onClick={handleSearch}
                className="bg-blue-600 text-white px-6 rounded-lg hover:bg-blue-700"
              >
                Search
              </button>

            </div>

            {/* Map */}

            <div className="mt-6 h-[500px] rounded-xl overflow-hidden border">

              <MapView
                latitude={form.latitude}
                longitude={form.longitude}
                setCoordinates={setCoordinates}
              />

            </div>

          </div>

          {/* ================= RIGHT ================= */}

          <div className="bg-white rounded-xl shadow-md p-8">

            <h2 className="text-xl font-bold mb-6">
              Complaint Details
            </h2>

            {/* Title */}

            <div className="mb-5">

              <label className="font-medium text-gray-700">
                Title
              </label>

              <input
                name="title"
                value={form.title}
                onChange={handleChange}
                className="w-full border rounded-lg mt-2 p-3"
                placeholder="Broken Road Near Market"
              />

            </div>

            {/* Category */}

            <div className="mb-5">

              <label className="font-medium text-gray-700">
                Category
              </label>

              <select
                name="category"
                value={form.category}
                onChange={handleChange}
                className="w-full border rounded-lg mt-2 p-3"
              >
                <option>Roads</option>
                <option>Garbage</option>
                <option>Water Supply</option>
                <option>Street Lights</option>
                <option>Drainage</option>
                <option>Electricity</option>
                <option>Public Toilet</option>
                <option>Other</option>
              </select>

            </div>

            {/* Description */}

            <div className="mb-5">

              <label className="font-medium text-gray-700">
                Description
              </label>

              <textarea
                rows="5"
                name="description"
                value={form.description}
                onChange={handleChange}
                className="w-full border rounded-lg mt-2 p-3"
                placeholder="Describe your issue..."
              />

            </div>

            {/* Latitude */}

            <div className="mb-4">

              <label className="font-medium text-gray-700">
                📍 Latitude
              </label>

              <input
                value={form.latitude}
                readOnly
                className="w-full border rounded-lg mt-2 p-3 bg-gray-100"
              />

            </div>

            {/* Longitude */}

            <div className="mb-5">

              <label className="font-medium text-gray-700">
                📍 Longitude
              </label>

              <input
                value={form.longitude}
                readOnly
                className="w-full border rounded-lg mt-2 p-3 bg-gray-100"
              />

            </div>

            {/* Upload */}

            <div className="mb-6">

              <label className="font-medium text-gray-700">
                📷 Upload Image
              </label>

              <input
                type="file"
                onChange={handleImage}
                className="mt-3"
              />

            </div>

            {/* Preview */}

            {preview && (

              <div className="mb-6">

                <p className="font-medium mb-2">
                  Image Preview
                </p>

                <img
                  src={preview}
                  alt=""
                  className="w-full h-56 rounded-lg object-cover border"
                />

              </div>

            )}

            {/* Submit */}

            <button
              onClick={handleSubmit}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-lg text-lg font-semibold transition"
            >
              Submit Complaint
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}