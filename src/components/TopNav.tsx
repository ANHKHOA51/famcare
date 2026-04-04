import { Button } from "@/components/ui/button";
import { Phone } from "lucide-react";

const TopNav = () => {
  return (
    <header className="h-16 surface-glass sticky top-0 z-40 flex items-center justify-between px-8">
      <p className="text-[11px] text-on-surface-variant uppercase tracking-[0.1em] font-medium">
        CẬP NHẬT LÚC 09:41 AM
      </p>
      <Button size="default" className="gap-2">
        <Phone size={14} />
        Liên hệ bác sĩ
      </Button>
    </header>
  );
};

export default TopNav;
