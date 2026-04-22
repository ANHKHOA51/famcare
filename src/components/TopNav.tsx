import { useNavigate } from "react-router-dom";
import { Bell, Settings, User, Menu } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import AppSidebar from "./AppSidebar";

interface TopNavProps {
  activePage?: string;
}

const TopNav = ({ activePage = "scanner" }: TopNavProps) => {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <>
      {/* ── Academic Warning Marquee Banner ── */}
      <div className="bg-red-600 text-white py-1.5 overflow-hidden relative z-50 select-none">
        <div className="animate-marquee whitespace-nowrap font-bold text-sm tracking-wide">
          ⚠️&nbsp;&nbsp;ĐÂY LÀ DỰ ÁN MÔN HỌC CỦA SINH VIÊN UEH&nbsp;&nbsp;•&nbsp;&nbsp;
          ĐÂY LÀ DỰ ÁN MÔN HỌC CỦA SINH VIÊN UEH&nbsp;&nbsp;•&nbsp;&nbsp;
          ĐÂY LÀ DỰ ÁN MÔN HỌC CỦA SINH VIÊN UEH&nbsp;&nbsp;•&nbsp;&nbsp;⚠️
          &nbsp;&nbsp;⚠️&nbsp;&nbsp;ĐÂY LÀ DỰ ÁN MÔN HỌC CỦA SINH VIÊN UEH&nbsp;&nbsp;•&nbsp;&nbsp;
          ĐÂY LÀ DỰ ÁN MÔN HỌC CỦA SINH VIÊN UEH&nbsp;&nbsp;•&nbsp;&nbsp;
          ĐÂY LÀ DỰ ÁN MÔN HỌC CỦA SINH VIÊN UEH&nbsp;&nbsp;•&nbsp;&nbsp;⚠️
        </div>
      </div>

      {/* ── Main Header ── */}
      <header className="h-16 bg-gradient-to-r from-[#dbeafe] to-[#e0f2fe]/50 flex items-center justify-between px-6 lg:px-10 border-b border-white/50 sticky top-0 z-40">

        {/* Brand & Mobile Menu */}
        <div className="flex items-center gap-4">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu size={20} className="text-slate-700" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0 border-r-0 max-w-64">
              <AppSidebar activePage={activePage} />
            </SheetContent>
          </Sheet>

          <Link to="/" className="text-xl font-bold font-display text-[#0f172a] tracking-tight">
            FamCare
          </Link>
        </div>

        {/* Desktop Links */}
        <nav className="hidden md:flex items-center gap-8">
          <Link to="/"           className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors">Trang chủ</Link>
          <Link to="/about"      className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors">Về chúng tôi</Link>
          <Link to="/resources"  className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors">Tài liệu & Hỗ trợ</Link>
          <Link to="/contact"    className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors">Liên hệ</Link>
        </nav>

        {/* Right Icons */}
        <div className="flex items-center gap-5">
          <button className="text-slate-600 hover:text-slate-900 transition-colors">
            <Bell size={20} />
          </button>
          <button
            onClick={() => navigate("/app/settings")}
            className={`transition-colors ${activePage === "settings" ? "text-slate-900" : "text-slate-600 hover:text-slate-900"}`}
          >
            <Settings size={20} />
          </button>
          <button
            onClick={() => navigate("/app/profile")}
            className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-white overflow-hidden shadow-sm transition-transform hover:scale-105"
          >
            {user?.name ? user.name[0].toUpperCase() : <User size={16} />}
          </button>
        </div>
      </header>
    </>
  );
};

export default TopNav;
