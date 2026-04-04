import { useCallback, useState } from "react";
import { Upload, FileImage, AlertCircle } from "lucide-react";
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
    <div className="max-w-2xl mx-auto animate-fade-in">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-heading font-bold text-foreground mb-2">Quét đơn thuốc AI</h2>
        <p className="text-muted-foreground">Tải lên hình ảnh đơn thuốc để AI phân tích và tạo kế hoạch dinh dưỡng phù hợp.</p>
      </div>

      <div
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        className={`border-2 border-dashed rounded-2xl p-16 text-center transition-all cursor-pointer ${
          isDragging ? "border-accent bg-accent/5 scale-[1.01]" : "border-border bg-card hover:border-accent/50"
        }`}
        onClick={() => document.getElementById("file-input")?.click()}
      >
        <div className="mx-auto w-16 h-16 rounded-2xl bg-accent/10 flex items-center justify-center mb-5">
          <FileImage className="text-accent" size={28} />
        </div>
        <p className="text-foreground font-semibold mb-1">Kéo & thả hình ảnh đơn thuốc vào đây</p>
        <p className="text-sm text-muted-foreground mb-6">Hỗ trợ JPG, PNG, WEBP — Tối đa 10MB</p>
        <Button variant="outline" className="gap-2">
          <Upload size={16} />
          Chọn file từ máy tính
        </Button>
        <input id="file-input" type="file" accept="image/*" className="hidden" onChange={handleFileInput} />
      </div>

      {error && (
        <div className="mt-4 flex items-center gap-2 text-destructive text-sm bg-destructive/10 px-4 py-3 rounded-lg">
          <AlertCircle size={16} />
          {error}
        </div>
      )}
    </div>
  );
};

export default UploadState;
