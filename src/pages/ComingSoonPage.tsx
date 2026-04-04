import { Construction } from "lucide-react";

const ComingSoonPage = ({ title }: { title: string }) => (
  <div className="flex flex-col items-center justify-center h-full min-h-[60vh] animate-fade-in">
    <Construction size={48} className="text-muted-foreground mb-4" />
    <h2 className="text-2xl font-heading font-bold text-foreground mb-2">{title}</h2>
    <p className="text-muted-foreground">Tính năng này đang được phát triển.</p>
  </div>
);

export default ComingSoonPage;
