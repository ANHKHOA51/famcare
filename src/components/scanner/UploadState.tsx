import { useCallback, useState } from "react";
import { FileUp, Info } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { AiScanTermsModal } from "./AiScanTermsModal";

interface UploadStateProps {
  onFileSelected: (file: File) => void;
  imageUrl?: string;
}

const getAiTermsKey = (userId: string) => `famcare_ai_scan_terms_${userId}`;

const UploadState = ({ onFileSelected, imageUrl }: UploadStateProps) => {
  const { user } = useAuth();
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showTerms, setShowTerms] = useState(false);
  
  const [agreed, setAgreed] = useState(() => {
    try {
      // First try to read directly from localStorage if user is not populated yet
      const uid = localStorage.getItem("aura_user");
      const parsed = uid ? JSON.parse(uid) : null;
      const userId = user?.id || parsed?.id;
      
      if (userId) {
        return localStorage.getItem(getAiTermsKey(userId)) === "true";
      }
      return false;
    } catch {
      return false;
    }
  });

  const handleAgreementChange = (checked: boolean) => {
    setAgreed(checked);
    if (user?.id) {
      if (checked) {
        localStorage.setItem(getAiTermsKey(user.id), "true");
      } else {
        localStorage.removeItem(getAiTermsKey(user.id));
      }
    }
    if (checked) setError(null);
  };

  const validateAndSelect = (file: File) => {
    setError(null);
    if (!agreed) {
      setError("Vui lòng đồng ý với Điều khoản sử dụng AI trước khi bắt đầu.");
      return;
    }
    if (!file.type.startsWith("image/") && file.type !== "application/pdf") {
      setError("Vui lòng tải lên file hình ảnh (JPG, PNG) hoặc PDF.");
      return;
    }
    onFileSelected(file);
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files[0]) validateAndSelect(e.dataTransfer.files[0]);
  }, [agreed, user]);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) validateAndSelect(e.target.files[0]);
  };

  return (
    <div className="flex flex-col h-full gap-4 relative">
      {/* AI Scan Terms Modal */}
      {showTerms && (
        <AiScanTermsModal
          onAccept={() => {
            handleAgreementChange(true);
            setShowTerms(false);
          }}
          onDecline={() => setShowTerms(false)}
        />
      )}

      {/* Upload Box */}
      <div
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        className={`flex-1 min-h-[400px] border-2 border-dashed rounded-[2.5rem] flex flex-col items-center justify-center p-8 text-center transition-all duration-300 cursor-pointer overflow-hidden ${
          isDragging
            ? "border-blue-500 bg-blue-50 scale-[1.01]"
            : "border-slate-300 hover:border-blue-400 hover:bg-slate-50/50"
        }`}
        onClick={() => {
          if (!imageUrl) {
            if (!agreed) {
              setError("Vui lòng đồng ý với Điều khoản sử dụng AI.");
              return;
            }
            document.getElementById("file-input")?.click();
          }
        }}
      >
        {imageUrl ? (
          <div className="w-full h-full rounded-2xl overflow-hidden relative group">
             <img src={imageUrl} alt="Document Preview" className="w-full h-full object-cover" />
             <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <button 
                  onClick={(e) => { e.stopPropagation(); document.getElementById("file-input")?.click(); }}
                  className="bg-white text-slate-800 px-6 py-3 rounded-full font-bold shadow-lg"
                >
                  Thay đổi ảnh
                </button>
             </div>
          </div>
        ) : (
          <>
            <div className="w-20 h-24 bg-[#bfdbfe] rounded-2xl flex items-center justify-center mb-6 text-blue-600">
              <FileUp size={40} />
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-2">Tải lên hoặc kéo thả đơn thuốc</h3>
            <p className="text-sm text-slate-500 max-w-sm mx-auto mb-8 leading-relaxed">
              Hỗ trợ các định dạng JPG, PNG hoặc PDF. AI sẽ tự động nhận diện thông tin y tế.
            </p>
            <button 
              className={`font-semibold px-8 py-3.5 rounded-full transition-colors ${agreed ? "bg-[#0f172a] hover:bg-slate-800 text-white" : "bg-slate-300 text-slate-500 cursor-not-allowed"}`}
              onClick={(e) => { 
                e.stopPropagation(); 
                if (!agreed) {
                  setError("Vui lòng đồng ý với Điều khoản sử dụng AI.");
                  return;
                }
                document.getElementById("file-input")?.click(); 
              }}
            >
              Chọn tệp tin
            </button>
            <input id="file-input" type="file" accept="image/*,.pdf" className="hidden" onChange={handleFileInput} />
            
            <div className="mt-6 flex flex-col items-center gap-2" onClick={(e) => e.stopPropagation()}>
               <div className="flex items-center justify-center gap-2">
                 <input 
                   type="checkbox" 
                   id="ai-terms-checkbox"
                   checked={agreed}
                   onChange={(e) => handleAgreementChange(e.target.checked)}
                   className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 cursor-pointer"
                 />
                 <label htmlFor="ai-terms-checkbox" className="text-sm text-slate-600 cursor-pointer">
                   Tôi đồng ý với{" "}
                 </label>
                 <button 
                   type="button" 
                   className="text-sm text-blue-600 hover:text-blue-700 underline font-medium"
                   onClick={(e) => { e.stopPropagation(); setShowTerms(true); }}
                 >
                   Điều khoản sử dụng AI
                 </button>
               </div>
            </div>
          </>
        )}
      </div>

      {error && (
        <div className="text-red-500 text-sm text-center font-medium bg-red-50 py-2 rounded-xl">
          {error}
        </div>
      )}

      {/* Tip Banner */}
      <div className="bg-[#ccfbf1] rounded-2xl p-5 flex items-start gap-4">
        <div className="mt-0.5 text-teal-600 flex-shrink-0">
          <Info size={20} />
        </div>
        <p className="text-sm text-teal-800 font-medium">
          Mẹo: Đảm bảo ảnh chụp đủ sáng và không bị nhòe để đạt kết quả tốt nhất.
        </p>
      </div>
    </div>
  );
};

export default UploadState;
