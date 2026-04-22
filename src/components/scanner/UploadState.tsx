import { useCallback, useEffect, useRef, useState } from "react";
import { Camera, FileUp, Info, X, ZapOff } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";
import { AiScanTermsModal } from "./AiScanTermsModal";

interface UploadStateProps {
  onFileSelected: (file: File) => void;
  imageUrl?: string;
}

const getAiTermsKey = (userId: string) => `famcare_ai_scan_terms_${userId}`;

// ── Camera helpers ──────────────────────────────────────────────────────────

/** Stop every track on a MediaStream and null it out safely. */
const releaseStream = (stream: MediaStream | null) => {
  stream?.getTracks().forEach((t) => t.stop());
};

// ── Component ───────────────────────────────────────────────────────────────

const UploadState = ({ onFileSelected, imageUrl }: UploadStateProps) => {
  const { user } = useAuth();
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showTerms, setShowTerms] = useState(false);

  // ── Camera State ──────────────────────────────────────────────────────────
  const [cameraActive, setCameraActive] = useState(false);
  const [isCameraSupported, setIsCameraSupported] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  // Check camera API availability once on mount
  useEffect(() => {
    setIsCameraSupported(
      typeof navigator !== "undefined" &&
        !!navigator.mediaDevices?.getUserMedia
    );
  }, []);

  // Cleanup stream whenever camera is deactivated
  useEffect(() => {
    if (!cameraActive) {
      releaseStream(streamRef.current);
      streamRef.current = null;
    }
  }, [cameraActive]);

  // Attach stream to <video> element when stream starts
  useEffect(() => {
    if (cameraActive && videoRef.current && streamRef.current) {
      videoRef.current.srcObject = streamRef.current;
    }
  }, [cameraActive]);

  // Cleanup on unmount — always turn off the camera LED
  useEffect(() => {
    return () => releaseStream(streamRef.current);
  }, []);

  // ── Agreement ─────────────────────────────────────────────────────────────
  const [agreed, setAgreed] = useState(() => {
    try {
      const uid = localStorage.getItem("aura_user");
      const parsed = uid ? JSON.parse(uid) : null;
      const userId = user?.id || parsed?.id;
      if (userId) return localStorage.getItem(getAiTermsKey(userId)) === "true";
      return false;
    } catch {
      return false;
    }
  });

  const handleAgreementChange = (checked: boolean) => {
    setAgreed(checked);
    if (user?.id) {
      if (checked) localStorage.setItem(getAiTermsKey(user.id), "true");
      else localStorage.removeItem(getAiTermsKey(user.id));
    }
    if (checked) setError(null);
  };

  // ── File Validation ───────────────────────────────────────────────────────
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

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      if (e.dataTransfer.files[0]) validateAndSelect(e.dataTransfer.files[0]);
    },
    [agreed, user] // eslint-disable-line react-hooks/exhaustive-deps
  );

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) validateAndSelect(e.target.files[0]);
  };

  // ── Camera Actions ────────────────────────────────────────────────────────
  const handleOpenCamera = async () => {
    if (!agreed) {
      setError("Vui lòng đồng ý với Điều khoản sử dụng AI trước khi chụp ảnh.");
      return;
    }
    if (!isCameraSupported) {
      toast.error("Trình duyệt của bạn không hỗ trợ camera. Vui lòng dùng Chrome hoặc Firefox mới nhất.");
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: "environment", // prefer back camera on mobile
          width: { ideal: 1920 },
          height: { ideal: 1080 },
        },
      });
      streamRef.current = stream;
      setCameraActive(true);
      setError(null);
    } catch (err: unknown) {
      // Map browser error names to user-friendly Vietnamese messages
      let msg = "Không thể mở camera. Vui lòng thử lại.";
      if (err instanceof DOMException) {
        if (err.name === "NotAllowedError" || err.name === "PermissionDeniedError") {
          msg = "Quyền truy cập camera bị từ chối. Vui lòng cấp quyền camera trong cài đặt trình duyệt.";
        } else if (err.name === "NotFoundError" || err.name === "DevicesNotFoundError") {
          msg = "Không tìm thấy thiết bị camera trên thiết bị này.";
        } else if (err.name === "NotReadableError" || err.name === "TrackStartError") {
          msg = "Camera đang được sử dụng bởi ứng dụng khác. Vui lòng đóng các ứng dụng đó và thử lại.";
        } else if (err.name === "OverconstrainedError") {
          msg = "Camera không đáp ứng được yêu cầu. Đang thử mở với chế độ mặc định...";
          // Retry without constraints
          try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            streamRef.current = stream;
            setCameraActive(true);
            return;
          } catch {
            msg = "Không thể mở camera. Vui lòng tải ảnh lên thay thế.";
          }
        }
      }
      toast.error(msg);
      setCameraActive(false);
    }
  };

  /** Capture the current video frame → convert to File → pass to scanner */
  const handleCapture = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    canvas.toBlob(
      (blob) => {
        if (!blob) {
          toast.error("Không thể xử lý ảnh. Vui lòng thử lại.");
          return;
        }
        const file = new File([blob], `scan_${Date.now()}.jpg`, { type: "image/jpeg" });
        // Stop camera BEFORE passing file — turns off the camera LED immediately
        releaseStream(streamRef.current);
        streamRef.current = null;
        setCameraActive(false);
        validateAndSelect(file);
      },
      "image/jpeg",
      0.95
    );
  };

  const handleCloseCamera = () => {
    setCameraActive(false); // useEffect will call releaseStream
    toast.info("Đã tắt camera.");
  };

  // ── Render ────────────────────────────────────────────────────────────────

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

      {/* ── Camera Preview Overlay ── */}
      {cameraActive ? (
        <div className="flex-1 min-h-[400px] rounded-[2.5rem] overflow-hidden bg-black relative flex flex-col">
          {/* Live video feed */}
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className="w-full h-full object-cover"
          />

          {/* Hidden canvas for capture — never rendered visually */}
          <canvas ref={canvasRef} className="hidden" />

          {/* Viewfinder overlay */}
          <div className="absolute inset-0 pointer-events-none">
            {/* Corner brackets */}
            <div className="absolute top-8 left-8 w-16 h-16 border-l-4 border-t-4 border-white/80 rounded-tl-xl" />
            <div className="absolute top-8 right-8 w-16 h-16 border-r-4 border-t-4 border-white/80 rounded-tr-xl" />
            <div className="absolute bottom-24 left-8 w-16 h-16 border-l-4 border-b-4 border-white/80 rounded-bl-xl" />
            <div className="absolute bottom-24 right-8 w-16 h-16 border-r-4 border-b-4 border-white/80 rounded-br-xl" />
            {/* Scan line hint */}
            <p className="absolute top-6 left-0 right-0 text-center text-white/70 text-xs font-semibold tracking-widest uppercase">
              Đặt đơn thuốc vào khung
            </p>
          </div>

          {/* Action bar */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 flex items-center justify-between">
            {/* Close */}
            <button
              onClick={handleCloseCamera}
              className="w-12 h-12 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-md flex items-center justify-center text-white transition-colors"
              title="Đóng camera"
            >
              <X size={20} />
            </button>

            {/* Capture shutter */}
            <button
              onClick={handleCapture}
              className="w-16 h-16 rounded-full bg-white shadow-xl flex items-center justify-center transition-transform active:scale-95 hover:scale-105"
              title="Chụp ảnh"
            >
              <div className="w-12 h-12 rounded-full bg-white border-4 border-slate-300" />
            </button>

            {/* Blur tip */}
            <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
              <p className="text-[0.45rem] text-white/70 text-center leading-tight px-1 font-medium">
                Giữ<br />yên
              </p>
            </div>
          </div>

          {/* Blur quality tip — animated */}
          <div className="absolute top-[4.5rem] left-0 right-0 flex justify-center pointer-events-none">
            <span className="bg-black/40 backdrop-blur-sm text-white/80 text-[0.65rem] font-semibold px-3 py-1 rounded-full animate-pulse">
              💡 Đảm bảo ảnh rõ nét, đủ ánh sáng để AI đọc chính xác nhất
            </span>
          </div>
        </div>
      ) : (
        <>
          {/* ── Upload Drop Zone ── */}
          <div
            onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
            className={`flex-1 min-h-[360px] border-2 border-dashed rounded-[2.5rem] flex flex-col items-center justify-center p-8 text-center transition-all duration-300 overflow-hidden ${
              isDragging
                ? "border-blue-500 bg-blue-50 scale-[1.01]"
                : "border-slate-300 hover:border-blue-400 hover:bg-slate-50/50"
            } ${!imageUrl ? "cursor-pointer" : ""}`}
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
                  className={`font-semibold px-8 py-3.5 rounded-full transition-colors ${
                    agreed ? "bg-[#0f172a] hover:bg-slate-800 text-white" : "bg-slate-300 text-slate-500 cursor-not-allowed"
                  }`}
                  onClick={(e) => {
                    e.stopPropagation();
                    if (!agreed) { setError("Vui lòng đồng ý với Điều khoản sử dụng AI."); return; }
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

          {/* ── Camera Button ── */}
          <button
            onClick={(e) => { e.stopPropagation(); handleOpenCamera(); }}
            disabled={!isCameraSupported}
            className={`w-full border-2 border-dashed rounded-3xl py-5 flex items-center justify-center gap-3 font-semibold text-sm transition-all duration-200 ${
              isCameraSupported
                ? "border-blue-300 hover:border-blue-500 hover:bg-blue-50 text-blue-600 hover:shadow-md hover:shadow-blue-100"
                : "border-slate-200 text-slate-400 cursor-not-allowed"
            }`}
          >
            {isCameraSupported ? (
              <>
                <Camera size={20} />
                Chụp ảnh trực tiếp bằng Camera
              </>
            ) : (
              <>
                <ZapOff size={18} />
                Camera không khả dụng trên thiết bị này
              </>
            )}
          </button>
        </>
      )}

      {/* Error Message */}
      {error && (
        <div className="text-red-500 text-sm text-center font-medium bg-red-50 py-2 rounded-xl">
          {error}
        </div>
      )}

      {/* Tip Banner */}
      {!cameraActive && (
        <div className="bg-[#ccfbf1] rounded-2xl p-5 flex items-start gap-4">
          <div className="mt-0.5 text-teal-600 flex-shrink-0">
            <Info size={20} />
          </div>
          <p className="text-sm text-teal-800 font-medium">
            Mẹo: Đảm bảo ảnh chụp đủ sáng và không bị nhòe để đạt kết quả tốt nhất.
          </p>
        </div>
      )}
    </div>
  );
};

export default UploadState;
