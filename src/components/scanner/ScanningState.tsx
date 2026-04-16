import { useEffect, useState } from "react";
import { scanningMessages } from "@/data/mockAiResponse";
import { Brain } from "lucide-react";

interface ScanningStateProps {
  imageUrl: string;
  minimal?: boolean;
}

const ScanningState = ({ imageUrl, minimal = false }: ScanningStateProps) => {
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % scanningMessages.length);
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`max-w-2xl mx-auto animate-fade-up ${minimal ? 'w-full' : ''}`}>
      {!minimal && (
        <div className="text-center mb-10">
          <h2 className="text-[2rem] font-display font-bold text-foreground mb-3 tracking-tight">AI đang phân tích...</h2>
          <p className="text-on-surface-variant text-[0.875rem]">Chúng tôi đang xử lý đơn thuốc và tạo kế hoạch dinh dưỡng chuyên biệt cho bạn.</p>
        </div>
      )}

      <div className={`relative rounded-2xl overflow-hidden surface-2 shadow-elevated border border-primary/10 ${minimal && !imageUrl ? 'h-64 flex items-center justify-center' : ''}`}>
        {imageUrl && <img src={imageUrl} alt="Prescription" className="w-full max-h-[500px] object-contain opacity-70" />}
        {!imageUrl && minimal && <div className="absolute inset-0 bg-slate-100/50 flex items-center justify-center"><Brain className="text-primary/20" size={80} /></div>}

        {/* Laser Scan Line */}
        <div className="absolute left-0 right-0 animate-scan-line z-10" style={{ height: "4px" }}>
          <div className="h-full bg-gradient-to-r from-transparent via-primary to-transparent shadow-[0_0_15px_rgba(0,61,155,0.8)]" />
          <div className="h-20 bg-gradient-to-b from-primary/20 to-transparent -mt-2 opacity-50" />
        </div>

        {/* Dynamic Overlay Text */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
           <div className="bg-background/40 backdrop-blur-md px-6 py-3 rounded-full border border-white/20 shadow-lg animate-pulse">
             <span className="text-primary font-bold tracking-widest text-xs uppercase">Scanning Medical Data...</span>
           </div>
        </div>

        {/* Corner brackets */}
        <div className="absolute top-8 left-8 w-12 h-12 border-t-4 border-l-4 border-primary/80 rounded-tl-xl" />
        <div className="absolute top-8 right-8 w-12 h-12 border-t-4 border-r-4 border-primary/80 rounded-tr-xl" />
        <div className="absolute bottom-8 left-8 w-12 h-12 border-b-4 border-l-4 border-primary/80 rounded-bl-xl" />
        <div className="absolute bottom-8 right-8 w-12 h-12 border-b-4 border-r-4 border-primary/80 rounded-br-xl" />
      </div>

      <div className="mt-12 flex flex-col items-center gap-6">
        <div className="flex items-center gap-4 px-8 py-4 surface-2 rounded-full shadow-patient border border-primary/5">
          <Brain size={24} className="text-primary animate-pulse-ring" />
          <span className="text-base font-semibold text-foreground min-w-[200px] text-center">{scanningMessages[messageIndex]}</span>
        </div>
        
        <div className="flex gap-3">
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              className="w-3 h-3 rounded-full bg-primary/30"
              style={{ 
                animation: `pulse-ring 1.5s ease-in-out ${i * 0.3}s infinite`,
                backgroundColor: i === messageIndex % 4 ? 'hsl(var(--primary))' : undefined
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ScanningState;
