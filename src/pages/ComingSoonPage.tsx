import { Construction } from "lucide-react";

const ComingSoonPage = ({ title }: { title: string }) => (
  <div className="flex flex-col items-center justify-center h-full min-h-[60vh] animate-fade-up">
    <div className="w-16 h-16 rounded-2xl bg-primary/8 flex items-center justify-center mb-6">
      <Construction size={28} className="text-primary" />
    </div>
    <h2 className="text-[1.5rem] font-display font-bold text-foreground mb-2">{title}</h2>
    <p className="text-on-surface-variant text-[0.875rem]">Tính năng này đang được phát triển.</p>
  </div>
);

export default ComingSoonPage;
