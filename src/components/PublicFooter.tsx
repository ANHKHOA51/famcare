import { Link } from "react-router-dom";

export default function PublicFooter() {
  return (
    <footer className="px-8 lg:px-16 py-10 bg-slate-900 text-slate-300">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <h3 className="font-display font-bold text-white text-lg lg:text-xl">FamCare</h3>
          <p className="text-[0.75rem] text-slate-400 mt-1 max-w-xs">Chăm sóc sức khỏe gia đình bạn ở mọi nơi.</p>
        </div>
        <div className="flex flex-wrap justify-center gap-6 text-[0.8125rem]">
          <Link to="/about" className="hover:text-white transition-colors">Điều khoản</Link>
          <Link to="/about" className="hover:text-white transition-colors">Bảo mật</Link>
          <Link to="/about" className="hover:text-white transition-colors">Cookie</Link>
        </div>
        <div>
          <p className="text-[0.75rem] text-slate-500">© 2026 FamCare. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
