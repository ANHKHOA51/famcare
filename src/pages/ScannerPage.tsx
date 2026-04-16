import { useState, useCallback } from "react";
import UploadState from "@/components/scanner/UploadState";
import ScanningState from "@/components/scanner/ScanningState";
import ResultState from "@/components/scanner/ResultState";
import { toast } from "sonner";
import { AlertDialog, AlertDialogAction, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { AlertCircle } from "lucide-react";

export type ScannerStep = "upload" | "scanning" | "result";

export interface ScanResult {
  diagnosis: string;
  prescription_code?: string;
  hospital_name?: string;
  error?: string;
  medications: { 
    name: string; 
    dosage: string;
    instructions?: string;
    suggested_symptoms?: string[];
    confidence_score?: number;
  }[];
  nutrition: {
    recommended_foods: string[];
    foods_to_avoid: string[];
  };
}

const ScannerPage = () => {
  const [step, setStep] = useState<ScannerStep>("upload");
  const [imageUrl, setImageUrl] = useState<string>("");
  const [scanResult, setScanResult] = useState<ScanResult | null>(null);
  const [blurError, setBlurError] = useState(false);

  const handleFileSelected = useCallback(async (file: File) => {
    // Pass 3 Fix #4: revoke previous object URL to prevent memory leak
    setImageUrl(prev => { if (prev) URL.revokeObjectURL(prev); return ""; });
    const url = URL.createObjectURL(file);
    setImageUrl(url);
    setStep("scanning");

    try {
      const formData = new FormData();
      formData.append("image", file);

      const response = await fetch("/api/scan", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errData = await response.json().catch(() => null);
        throw new Error(errData?.error || "Không thể phân tích đơn thuốc. Vui lòng thử lại.");
      }

      const data = await response.json();
      
      if (data.error === "BLURRY") {
        setBlurError(true);
        setStep("upload");
        return;
      }
      
      setScanResult(data);
      setStep("result");
      toast.success("Đã phân tích đơn thuốc!");
    } catch (error: any) {
      console.error("Scanning error:", error);
      toast.error(error.message || "Không thể phân tích đơn thuốc. Vui lòng thử lại.");
      setStep("upload");
    }
  }, []);

  const handleReset = () => {
    setImageUrl(prev => { if (prev) URL.revokeObjectURL(prev); return ""; });
    setStep("upload");
    setScanResult(null);
  };

  return (
    <div className="p-4 md:p-10 max-w-7xl mx-auto space-y-8">
      {/* Banner */}
      <div className="bg-[#e0f2fe] rounded-3xl p-6 md:p-8 flex flex-col justify-center">
        <h1 className="text-3xl font-display font-bold text-[#0f172a] mb-2">Máy quét đơn thuốc AI</h1>
        <p className="text-slate-600 text-sm">Số hóa đơn thuốc của bạn chỉ trong vài giây với công nghệ AI chuẩn xác.</p>
      </div>

      <div className="grid lg:grid-cols-12 gap-8">
        {/* Left Column: Upload or Preview */}
        <div className="lg:col-span-5 h-full">
          <UploadState onFileSelected={handleFileSelected} imageUrl={imageUrl} />
        </div>

        {/* Right Column: Results */}
        <div className="lg:col-span-7 h-full">
          {step === "upload" && !imageUrl && (
            <div className="bg-[#e2e8f0]/40 rounded-3xl border-2 border-dashed border-slate-300 h-full min-h-[400px] flex flex-col items-center justify-center p-8 text-center text-slate-500">
              <span className="text-sm">Vui lòng tải lên đơn thuốc để xem thông tin trích xuất</span>
            </div>
          )}
          
          {step === "scanning" && (
            <div className="bg-[#e2e8f0]/40 rounded-3xl h-full min-h-[400px] flex items-center justify-center">
               <ScanningState imageUrl={imageUrl} minimal={true} />
            </div>
          )}

          {step === "result" && scanResult && (
            <ResultState 
              result={scanResult} 
              onReset={handleReset} 
            />
          )}
        </div>
      </div>

      <AlertDialog open={blurError} onOpenChange={setBlurError}>
        <AlertDialogContent className="rounded-2xl border-destructive/20 max-w-sm">
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2 text-destructive">
              <AlertCircle className="h-5 w-5" /> Không nhận diện được
            </AlertDialogTitle>
            <AlertDialogDescription className="text-slate-600 pt-2">
              Chất lượng ảnh đưa vào quá mờ. Vui lòng chụp lại ảnh rõ ràng hơn!
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
             <AlertDialogAction 
              onClick={() => setBlurError(false)}
              className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl w-full"
            >
              Chụp lại
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default ScannerPage;
