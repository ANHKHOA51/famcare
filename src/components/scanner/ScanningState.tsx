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
    <div className="max-w-2xl mx-auto animate-fade-up">
      <div className="text-center mb-10">
        <h2 className="text-[2rem] font-display font-bold text-foreground mb-3 tracking-tight">Đang phân tích...</h2>
        <p className="text-on-surface-variant text-[0.875rem]">AI đang xử lý đơn thuốc của bạn</p>
      </div>

      <div className="relative rounded-2xl overflow-hidden surface-2 shadow-elevated">
        <img src={imageUrl} alt="Prescription" className="w-full max-h-[400px] object-contain opacity-50" />

        {/* Scan line */}
        <div className="absolute left-0 right-0 animate-scan-line" style={{ height: "3px" }}>
          <div className="h-full bg-gradient-to-r from-transparent via-primary to-transparent animate-scan-glow" />
          <div className="h-10 bg-gradient-to-b from-primary/15 to-transparent -mt-1" />
        </div>

        {/* Corner brackets */}
        <div className="absolute top-5 left-5 w-10 h-10 border-t-2 border-l-2 border-primary/60 rounded-tl-lg" />
        <div className="absolute top-5 right-5 w-10 h-10 border-t-2 border-r-2 border-primary/60 rounded-tr-lg" />
        <div className="absolute bottom-5 left-5 w-10 h-10 border-b-2 border-l-2 border-primary/60 rounded-bl-lg" />
        <div className="absolute bottom-5 right-5 w-10 h-10 border-b-2 border-r-2 border-primary/60 rounded-br-lg" />
      </div>

      <div className="mt-10 flex flex-col items-center gap-5">
        <div className="flex items-center gap-3 px-6 py-3.5 surface-2 rounded-full shadow-patient">
          <Brain size={20} className="text-primary animate-pulse-ring" />
          <span className="text-sm font-medium text-foreground">{scanningMessages[messageIndex]}</span>
        </div>
        <div className="flex gap-2">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-2 h-2 rounded-full bg-primary"
              style={{ animation: `pulse-ring 1.2s ease-in-out ${i * 0.2}s infinite` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ScanningState;
