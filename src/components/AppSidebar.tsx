import { LayoutDashboard, ScanLine, ShoppingBag, Bell, Settings, HelpCircle, Pill, LogOut, User, Home as HomeIcon, Utensils } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

interface AppSidebarProps {
  activePage: string;
  onNavigate: (page: string) => void;
}

const navItems = [
  { id: "home", label: "Trang chủ", icon: HomeIcon, path: "/" },
  { id: "dashboard", label: "Bảng điều khiển", icon: LayoutDashboard },
  { id: "scanner", label: "Đơn thuốc", icon: ScanLine },
  { id: "cabinet", label: "Tủ thuốc", icon: Pill },
  { id: "meal-plan", label: "Dinh dưỡng", icon: Utensils },
  { id: "marketplace", label: "Dịch vụ", icon: ShoppingBag },
];

const bottomItems = [
  { id: "profile", label: "Hồ sơ cá nhân", icon: User },
  { id: "settings", label: "Cài đặt", icon: Settings },
  { id: "support", label: "Hỗ trợ", icon: HelpCircle },
];

const AppSidebar = ({ activePage, onNavigate }: AppSidebarProps) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleNavigate = (item: any) => {
    if (item.path) {
      navigate(item.path);
    } else {
      onNavigate(item.id);
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <aside className="w-64 min-h-screen surface-2 flex flex-col shadow-patient">
      {/* Brand */}
      <Link to="/" className="px-7 pt-8 pb-6 hover:opacity-80 transition-opacity">
        <h1 className="text-xl font-bold font-display text-foreground tracking-tight">FamCare</h1>
        <p className="text-xs text-on-surface-variant mt-0.5">Chăm sóc tận tâm</p>
      </Link>

      {/* Nav */}
      <nav className="flex-1 px-4 space-y-1">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => handleNavigate(item)}
            className={cn(
              "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 relative",
              activePage === item.id
                ? "bg-sidebar-accent text-sidebar-accent-foreground"
                : "text-on-surface-variant hover:bg-surface-low"
            )}
          >
            {activePage === item.id && (
              <div className="absolute left-0 top-1/2 -translate-y-1/2 pill-indicator h-6" />
            )}
            <item.icon size={18} strokeWidth={activePage === item.id ? 2.2 : 1.8} />
            {item.label}
          </button>
        ))}
      </nav>

      {/* Bottom */}
      <div className="px-4 pb-4 space-y-1 pt-4 border-t border-border/50">
        {bottomItems.map((item) => (
          <button
            key={item.id}
            onClick={() => handleNavigate(item)}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-on-surface-variant hover:bg-surface-low transition-all duration-200"
          >
            <item.icon size={18} strokeWidth={1.8} />
            {item.label}
          </button>
        ))}
        
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-destructive hover:bg-destructive/10 transition-all duration-200"
        >
          <LogOut size={18} strokeWidth={1.8} />
          Đăng xuất
        </button>
      </div>

      {/* User */}
      <div className="px-5 py-5 flex items-center gap-3 bg-muted/30">
        <div className="w-10 h-10 rounded-full gradient-primary flex items-center justify-center text-primary-foreground text-sm font-bold shadow-sm">
          {user?.name?.[0]?.toUpperCase() || <User size={20} />}
        </div>
        <div className="flex-1 overflow-hidden">
          <p className="text-sm font-semibold text-foreground truncate">{user?.name || "Người dùng"}</p>
          <p className="text-[11px] text-on-surface-variant truncate opacity-70">{user?.email}</p>
        </div>
      </div>
    </aside>
  );
};

export default AppSidebar;
