import { useState, useCallback } from "react";
import UploadState from "@/components/scanner/UploadState";
import ScanningState from "@/components/scanner/ScanningState";
import ResultState from "@/components/scanner/ResultState";
import MealPlanPage from "./MealPlanPage";
import { toast } from "sonner";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { AlertCircle } from "lucide-react";

export type ScannerStep = "upload" | "scanning" | "result" | "meal-plan";

export interface ScanResult {
  diagnosis: string;
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
    setStep("upload");
    setImageUrl("");
    setScanResult(null);
  };

  const handleGenerateMealPlan = () => {
    setStep("meal-plan");
  };

  return (
    <div className="p-4 md:p-10">
      {step === "upload" && <UploadState onFileSelected={handleFileSelected} />}
      {step === "scanning" && <ScanningState imageUrl={imageUrl} />}
      {step === "result" && scanResult && (
        <ResultState 
          result={scanResult} 
          onReset={handleReset} 
          onGenerateMealPlan={handleGenerateMealPlan}
        />
      )}
      {step === "meal-plan" && scanResult && (
        <MealPlanPage 
          diagnosis={scanResult.diagnosis}
          recommendedFoods={scanResult.nutrition?.recommended_foods || []}
          onBack={() => setStep("result")}
        />
      )}

      <AlertDialog open={blurError} onOpenChange={setBlurError}>
        <AlertDialogContent className="rounded-2xl border-destructive/20 animate-in fade-in zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out data-[state=closed]:zoom-out-95 max-w-sm">
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2 text-destructive">
              <AlertCircle className="h-5 w-5" /> Không nhận diện được
            </AlertDialogTitle>
            <AlertDialogDescription className="text-on-surface-variant text-[15px] pt-2">
              Chất lượng ảnh đưa vào quá mờ, không phải ảnh y tế hoặc bị mất góc khiến AI không thể phân tích được chữ và kê đơn. Vui lòng chụp lại một tấm ảnh mới rõ ràng và đúng trung tâm hơn.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="mt-4 pt-4 border-t">
            <AlertDialogAction 
              onClick={() => setBlurError(false)}
              className="rounded-xl w-full bg-primary text-primary-foreground hover:bg-primary/90"
            >
              Tôi đã hiểu, chụp lại màn hình
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default ScannerPage;
