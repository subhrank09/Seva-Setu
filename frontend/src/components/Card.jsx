export default function Card({ children }) {
  return (
    <div className="bg-white/10 backdrop-blur-xl border border-white/20 shadow-xl rounded-2xl p-5 hover:scale-[1.02] transition">
      {children}
    </div>
  );
}