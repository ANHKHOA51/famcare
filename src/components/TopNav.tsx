import { Button } from "@/components/ui/button";
import { Phone } from "lucide-react";

const TopNav = () => {
  return (
    <header className="h-14 border-b border-border bg-card flex items-center justify-between px-6">
      <div>
        <p className="text-xs text-muted-foreground uppercase tracking-wider">CẬP NHẬT LÚC 09:41 AM</p>
      </div>
      <Button className="bg-primary text-primary-foreground hover:bg-primary/90 gap-2 text-sm">
        <Phone size={14} />
        Liên hệ bác sĩ
      </Button>
    </header>
  );
};

export default TopNav;
