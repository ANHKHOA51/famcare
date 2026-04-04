import { LayoutDashboard, ScanLine, ShoppingBag, Utensils, Bell, Settings, HelpCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface AppSidebarProps {
  activePage: string;
  onNavigate: (page: string) => void;
}

const navItems = [
  { id: "dashboard", label: "Bảng điều khiển", icon: LayoutDashboard },
  { id: "scanner", label: "Đơn thuốc", icon: ScanLine },
  { id: "marketplace", label: "Chợ Dịch vụ", icon: ShoppingBag },
  { id: "nutrition", label: "Dinh dưỡng", icon: Utensils },
  { id: "alerts", label: "Thông báo", icon: Bell },
];

const bottomItems = [
  { id: "settings", label: "Settings", icon: Settings },
  { id: "support", label: "Support", icon: HelpCircle },
];

const AppSidebar = ({ activePage, onNavigate }: AppSidebarProps) => {
  return (
    <aside className="w-64 min-h-screen surface-2 flex flex-col shadow-patient">
      {/* Brand */}
      <div className="px-7 pt-8 pb-6">
        <h1 className="text-xl font-bold font-display text-foreground tracking-tight">Hệ sinh thái Y tế</h1>
        <p className="text-xs text-on-surface-variant mt-0.5">Chăm sóc tận tâm</p>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-4 space-y-1">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id)}
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
      <div className="px-4 pb-4 space-y-1 pt-4">
        {bottomItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-on-surface-variant hover:bg-surface-low transition-all duration-200"
          >
            <item.icon size={18} strokeWidth={1.8} />
            {item.label}
          </button>
        ))}
      </div>

      {/* User */}
      <div className="px-5 py-5 flex items-center gap-3">
        <div className="w-9 h-9 rounded-full gradient-primary flex items-center justify-center text-primary-foreground text-xs font-bold">
          NV
        </div>
        <div>
          <p className="text-sm font-semibold text-foreground">Nguyễn Văn A</p>
          <p className="text-[11px] text-on-surface-variant">ID: 284902</p>
        </div>
      </div>
    </aside>
  );
};

export default AppSidebar;
