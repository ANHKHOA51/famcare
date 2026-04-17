import { ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AiScanTermsModalProps {
  onAccept: () => void;
  onDecline: () => void;
}

export function AiScanTermsModal({ onAccept, onDecline }: AiScanTermsModalProps) {
  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-[2rem] w-full max-w-lg max-h-[85vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b flex items-start gap-4 shrink-0 bg-gradient-to-r from-blue-50 to-cyan-50">
          <div className="w-12 h-12 rounded-2xl bg-blue-100 flex items-center justify-center shrink-0">
            <ShieldCheck className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <h2 className="font-bold text-slate-800 text-lg">Điều khoản sử dụng AI Scan</h2>
            <p className="text-sm text-slate-500 mt-0.5">Vui lòng đọc và xác nhận trước khi sử dụng tính năng này</p>
          </div>
        </div>

        {/* Content */}
        <div className="overflow-y-auto p-6 space-y-4 text-sm text-slate-600 leading-relaxed flex-1">
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
            <p className="text-amber-800 font-semibold text-xs uppercase tracking-wider mb-1">⚠️ Lưu ý quan trọng</p>
            <p className="text-amber-700 text-sm">Kết quả từ AI Scan chỉ mang tính tham khảo. Không thay thế lời khuyên của bác sĩ hoặc dược sĩ chuyên nghiệp.</p>
          </div>
          <section>
            <h3 className="font-bold text-slate-800 mb-1.5">1. Xử lý hình ảnh</h3>
            <p>Hình ảnh đơn thuốc bạn tải lên sẽ được gửi đến máy chủ AI để phân tích nhận dạng. Hình ảnh không được lưu trữ lâu dài sau khi quá trình phân tích hoàn tất.</p>
          </section>
          <section>
            <h3 className="font-bold text-slate-800 mb-1.5">2. Độ chính xác của AI</h3>
            <p>Hệ thống AI có thể mắc lỗi, đặc biệt với chữ viết tay khó đọc hoặc hình ảnh kém chất lượng. Bạn cần kiểm tra lại toàn bộ thông tin trước khi lưu vào tủ thuốc.</p>
          </section>
          <section>
            <h3 className="font-bold text-slate-800 mb-1.5">3. Bảo mật dữ liệu</h3>
            <p>Thông tin đơn thuốc sau khi lưu sẽ được mã hóa theo tiêu chuẩn AES-256. Chỉ bạn và thành viên gia đình được ủy quyền mới có quyền truy cập.</p>
          </section>
          <section>
            <h3 className="font-bold text-slate-800 mb-1.5">4. Trách nhiệm người dùng</h3>
            <p>Bạn tự chịu trách nhiệm về việc sử dụng thông tin thuốc. FamCare không chịu trách nhiệm về các tác hại phát sinh từ việc dùng thuốc sai liều hoặc sai chỉ định.</p>
          </section>
        </div>

        {/* Footer */}
        <div className="p-6 border-t bg-slate-50 shrink-0 flex gap-3">
          <Button variant="outline" onClick={onDecline} className="flex-1">
            Hủy bỏ
          </Button>
          <Button onClick={onAccept} className="flex-1 bg-blue-600 hover:bg-blue-700 text-white">
            Tôi đồng ý
          </Button>
        </div>
      </div>
    </div>
  );
}
