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
    <aside className="w-60 min-h-screen bg-card border-r border-border flex flex-col">
      <div className="p-6">
        <h1 className="text-lg font-bold font-heading text-primary">Aura Health</h1>
        <p className="text-xs text-muted-foreground">Chăm sóc tận tâm</p>
      </div>

      <nav className="flex-1 px-3 space-y-1">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            className={cn(
              "w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors",
              activePage === item.id
                ? "bg-sidebar-accent text-sidebar-accent-foreground border-l-3 border-primary"
                : "text-sidebar-foreground hover:bg-muted"
            )}
          >
            <item.icon size={18} />
            {item.label}
          </button>
        ))}
      </nav>

      <div className="px-3 pb-4 space-y-1 border-t border-border pt-4">
        {bottomItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm text-sidebar-foreground hover:bg-muted transition-colors"
          >
            <item.icon size={18} />
            {item.label}
          </button>
        ))}
      </div>

      <div className="p-4 border-t border-border flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-xs font-bold">
          NV
        </div>
        <div>
          <p className="text-sm font-medium text-foreground">Nguyễn Văn A</p>
          <p className="text-xs text-muted-foreground">ID: 284902</p>
        </div>
      </div>
    </aside>
  );
};

export default AppSidebar;
