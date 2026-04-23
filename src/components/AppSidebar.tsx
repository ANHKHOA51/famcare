import { useNavigate } from "react-router-dom";
import { LayoutDashboard, ScanLine, Pill, Calendar, Utensils, Users, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/context/AuthContext";

interface AppSidebarProps {
  activePage: string;
}

const navItems = [
  { id: "dashboard",   label: "Bảng điều khiển",       icon: LayoutDashboard },
  { id: "scanner",     label: "Quét đơn thuốc AI",      icon: ScanLine },
  { id: "cabinet",     label: "Tủ thuốc AI",             icon: Pill },
  { id: "meal-plan",   label: "Thực đơn dinh dưỡng AI", icon: Utensils },
  { id: "appointment", label: "Đặt lịch khám",           icon: Calendar },
  { id: "profile",     label: "Hồ sơ gia đình",          icon: Users },
];

const AppSidebar = ({ activePage }: AppSidebarProps) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <aside className="w-[260px] h-full bg-[#f8fafc] flex flex-col pt-6 pb-8 border-r border-slate-200/50">

      {/* User Area */}
      <div className="px-6 mb-8">
        <h2 className="text-xl font-bold font-display text-slate-800 tracking-tight">
          {user?.name || "Thành An"}
        </h2>
        <p className="text-[0.75rem] text-slate-500 mt-0.5 font-medium">Chế độ cá nhân</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 space-y-2">
        {navItems.map((item) => {
          const isActive = activePage === item.id;
          return (
            <button
              key={item.id}
              onClick={() => navigate(`/app/${item.id}`)}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-[0.875rem] font-medium transition-all duration-200",
                isActive
                  ? "bg-[#0f172a] text-white shadow-md shadow-slate-900/10"
                  : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
              )}
            >
              <item.icon size={18} strokeWidth={isActive ? 2 : 1.8} />
              {item.label}
            </button>
          );
        })}
      </nav>

      {/* Action Buttons */}
      <div className="px-6 mt-auto flex flex-col gap-3">
        <button
          onClick={() => navigate("/app/profile")}
          className="w-full bg-[#bce3fe] hover:bg-[#a6d8fc] text-[#0f172a] font-semibold text-[0.875rem] py-3.5 rounded-xl transition-colors shadow-sm"
        >
          Chuyển sang<br />chế độ Gia đình
        </button>
        <button
          onClick={logout}
          className="w-full flex items-center justify-center gap-2 text-slate-500 hover:text-red-500 hover:bg-red-50 font-medium text-[0.875rem] py-3 rounded-xl transition-all"
        >
          <LogOut size={18} />
          Đăng xuất
        </button>
      </div>

    </aside>
  );
};

export default AppSidebar;
