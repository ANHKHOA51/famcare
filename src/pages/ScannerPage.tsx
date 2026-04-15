import { useState, useCallback } from "react";
import UploadState from "@/components/scanner/UploadState";
import ScanningState from "@/components/scanner/ScanningState";
import ResultState from "@/components/scanner/ResultState";
import MealPlanPage from "./MealPlanPage";
import { toast } from "sonner";

export type ScannerStep = "upload" | "scanning" | "result" | "meal-plan";

export interface ScanResult {
  diagnosis: string;
  error?: string;
  medications: { 
    name: string; 
    dosage: string;
    instructions?: string;
    suggested_symptoms?: string[];
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
        toast.error("Ảnh quá mờ hoặc không nhận diện được đơn thuốc. Vui lòng chụp lại rõ hơn!");
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
          recommendedFoods={scanResult.nutrition.recommended_foods}
          onBack={() => setStep("result")}
        />
      )}
    </div>
  );
};

export default ScannerPage;
