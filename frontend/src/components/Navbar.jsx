// components/Navbar.jsx
import { logout } from "../utils/auth";

export default function Navbar({ title, rightContent }) {
  return (
    <div className="flex justify-between items-center px-10 py-4 bg-white/10 backdrop-blur-lg text-white shadow-md">
      <h1 className="text-xl font-bold">{title}</h1>

      <div className="flex items-center gap-4">
        {rightContent}
        <button
          onClick={logout}
          className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg"
        >
          Logout
        </button>
      </div>
    </div>
  );
}