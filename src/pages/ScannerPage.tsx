import { useState, useCallback } from "react";
import UploadState from "@/components/scanner/UploadState";
import ScanningState from "@/components/scanner/ScanningState";
import ResultState from "@/components/scanner/ResultState";

export type ScannerStep = "upload" | "scanning" | "result";

/**
 * Replace this function with a real API call later:
 * const scanPrescription = async (file: File) => {
 *   const formData = new FormData();
 *   formData.append("image", file);
 *   const res = await fetch("/api/scan", { method: "POST", body: formData });
 *   return res.json();
 * };
 */
const simulateScan = (): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, 3500));

const ScannerPage = () => {
  const [step, setStep] = useState<ScannerStep>("upload");
  const [imageUrl, setImageUrl] = useState<string>("");

  const handleFileSelected = useCallback(async (file: File) => {
    const url = URL.createObjectURL(file);
    setImageUrl(url);
    setStep("scanning");
    await simulateScan();
    setStep("result");
  }, []);

  const handleReset = () => {
    setStep("upload");
    setImageUrl("");
  };

  return (
    <div className="p-10">
      {step === "upload" && <UploadState onFileSelected={handleFileSelected} />}
      {step === "scanning" && <ScanningState imageUrl={imageUrl} />}
      {step === "result" && <ResultState onReset={handleReset} />}
    </div>
  );
};

export default ScannerPage;
