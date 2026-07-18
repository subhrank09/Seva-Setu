import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { logout } from "../utils/auth";
import { Moon, Sun, LogOut } from "lucide-react";
import { motion } from "framer-motion";

export default function Layout({ title, children }) {
  const { dark, toggleTheme } = useContext(ThemeContext);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-500 to-purple-600 dark:from-gray-900 dark:to-black text-white">

      {/* 🔹 HEADER */}
      <header className="flex justify-between items-center px-6 py-4 bg-white/10 backdrop-blur-xl border-b border-white/20">

        <h1 className="text-xl font-bold tracking-wide">{title}</h1>

        <div className="flex items-center gap-3">

          {/* 🌙 Theme */}
          <button
            onClick={toggleTheme}
            className="bg-white/20 p-2 rounded-full hover:scale-110 transition"
          >
            {dark ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          {/* 🚪 Logout */}
          <button
            onClick={logout}
            className="bg-red-500 px-3 py-2 rounded-lg flex items-center gap-1 hover:bg-red-600 transition"
          >
            <LogOut size={16} />
            Logout
          </button>
        </div>
      </header>

      {/* 🔹 MAIN CONTENT */}
      <motion.main
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex-1 p-6"
      >
        {children}
      </motion.main>

      {/* 🔹 FOOTER */}
      <footer className="text-center py-4 text-sm text-white/70 border-t border-white/10">
        © 2026 SevaSetu • Smart Civic Platform 🚀
      </footer>
    </div>
  );
}