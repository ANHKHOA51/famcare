import { useCallback, useState } from "react";
import { Upload, FileImage, AlertCircle, Camera } from "lucide-react";
import { Button } from "@/components/ui/button";

interface UploadStateProps {
  onFileSelected: (file: File) => void;
}

const UploadState = ({ onFileSelected }: UploadStateProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const validateAndSelect = (file: File) => {
    setError(null);
    if (!file.type.startsWith("image/")) {
      setError("Vui lòng tải lên file hình ảnh (JPG, PNG, WEBP).");
      return;
    }
    onFileSelected(file);
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files[0]) validateAndSelect(e.dataTransfer.files[0]);
  }, []);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) validateAndSelect(e.target.files[0]);
  };

  return (
    <div className="max-w-2xl mx-auto animate-fade-up">
      {/* Header */}
      <div className="text-center mb-10">
        <h2 className="text-[2rem] font-display font-bold text-foreground mb-3 tracking-tight">Quét đơn thuốc AI</h2>
        <p className="text-on-surface-variant text-[0.875rem] leading-relaxed max-w-md mx-auto">
          Tải lên hình ảnh đơn thuốc để AI phân tích và tạo kế hoạch dinh dưỡng phù hợp.
        </p>
      </div>

      {/* Drop zone — no hard borders, background shift */}
      <div
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        className={`rounded-2xl p-18 text-center transition-all duration-300 cursor-pointer ${
          isDragging
            ? "surface-2 shadow-elevated scale-[1.01]"
            : "surface-1 hover:surface-2 hover:shadow-patient"
        }`}
        onClick={() => document.getElementById("file-input")?.click()}
      >
        <div className="mx-auto w-16 h-16 rounded-2xl bg-primary/8 flex items-center justify-center mb-6">
          <FileImage className="text-primary" size={28} />
        </div>
        <p className="text-foreground font-semibold font-display text-base mb-1.5">Kéo & thả hình ảnh đơn thuốc vào đây</p>
        <p className="text-[0.8125rem] text-on-surface-variant mb-8">Hỗ trợ JPG, PNG, WEBP — Tối đa 10MB</p>
        <div className="flex items-center justify-center gap-4">
          <Button variant="outline" className="gap-2" onClick={(e) => { e.stopPropagation(); document.getElementById("file-input")?.click(); }}>
            <Upload size={16} />
            Chọn ảnh
          </Button>
          <Button variant="default" className="gap-2" onClick={(e) => { e.stopPropagation(); document.getElementById("camera-input")?.click(); }}>
            <Camera size={16} />
            Chụp trực tiếp
          </Button>
        </div>
        <input id="file-input" type="file" accept="image/*" className="hidden" onChange={handleFileInput} />
        <input id="camera-input" type="file" accept="image/*" capture="environment" className="hidden" onChange={handleFileInput} />
      </div>

      {error && (
        <div className="mt-6 flex items-center gap-2 text-destructive text-sm bg-destructive/6 px-5 py-3.5 rounded-xl">
          <AlertCircle size={16} />
          {error}
        </div>
      )}
    </div>
  );
};

export default UploadState;
