import { Button } from "@/components/ui/button";
import { Phone, Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import AppSidebar from "./AppSidebar";

interface TopNavProps {
  activePage?: string;
  onNavigate?: (page: string) => void;
}

const TopNav = ({ activePage = "scanner", onNavigate = () => {} }: TopNavProps) => {
  return (
    <header className="h-16 surface-glass sticky top-0 z-40 flex items-center justify-between px-4 md:px-8 border-b md:border-b-0">
      <div className="flex items-center gap-3">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu size={20} />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0 border-r-0 max-w-64">
            <AppSidebar activePage={activePage} onNavigate={onNavigate} />
          </SheetContent>
        </Sheet>
        <p className="text-[11px] text-on-surface-variant uppercase tracking-[0.1em] font-medium hidden sm:block">
          Cập nhật lúc hiện tại
        </p>
      </div>
      <Button size="sm" className="gap-2">
        <Phone size={14} />
        <span className="hidden sm:inline">Liên hệ bác sĩ</span>
        <span className="sm:hidden">Gọi y tế</span>
      </Button>
    </header>
  );
};

export default TopNav;
