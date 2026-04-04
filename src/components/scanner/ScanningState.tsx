import { useEffect, useState } from "react";
import { scanningMessages } from "@/data/mockAiResponse";
import { Brain } from "lucide-react";

interface ScanningStateProps {
  imageUrl: string;
}

const ScanningState = ({ imageUrl }: ScanningStateProps) => {
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % scanningMessages.length);
    }, 800);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="max-w-2xl mx-auto animate-fade-in">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-heading font-bold text-foreground mb-2">Đang phân tích...</h2>
        <p className="text-muted-foreground">AI đang xử lý đơn thuốc của bạn</p>
      </div>

      <div className="relative rounded-2xl overflow-hidden border border-border bg-card shadow-lg">
        <img src={imageUrl} alt="Prescription" className="w-full max-h-[400px] object-contain opacity-60" />
        
        {/* Scan line */}
        <div className="absolute left-0 right-0 animate-scan-line" style={{ height: "3px" }}>
          <div className="h-full bg-gradient-to-r from-transparent via-accent to-transparent animate-scan-glow" />
          <div className="h-8 bg-gradient-to-b from-accent/20 to-transparent -mt-1" />
        </div>

        {/* Corner brackets */}
        <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-accent rounded-tl" />
        <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-accent rounded-tr" />
        <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-accent rounded-bl" />
        <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-accent rounded-br" />
      </div>

      <div className="mt-8 flex flex-col items-center gap-4">
        <div className="flex items-center gap-3 px-6 py-3 bg-card rounded-full border border-border shadow-sm">
          <Brain size={20} className="text-accent animate-pulse-ring" />
          <span className="text-sm font-medium text-foreground transition-all">{scanningMessages[messageIndex]}</span>
        </div>
        <div className="flex gap-1.5">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-2 h-2 rounded-full bg-accent"
              style={{ animation: `pulse-ring 1.2s ease-in-out ${i * 0.2}s infinite` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ScanningState;
