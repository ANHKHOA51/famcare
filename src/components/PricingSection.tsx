import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function PricingSection() {
  const navigate = useNavigate();

  return (
    <section id="pricing" className="px-8 lg:px-16 py-24 bg-[#e0f7fa]">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-[2.5rem] font-display font-bold text-slate-800 tracking-tight mb-3">
            Bảng giá dịch vụ
          </h2>
          <p className="text-slate-600 text-[1rem]">
            Chọn gói phù hợp cho gia đình bạn. Không phí ẩn, không ràng buộc.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 items-center">
          {/* FREE PLAN */}
          <div className="bg-white rounded-[2rem] p-10 shadow-lg text-center h-full flex flex-col">
            <h3 className="text-slate-500 font-semibold mb-2">Gói dùng thử trong 7 ngày</h3>
            <div className="text-4xl font-extrabold text-slate-800 mb-8 font-display tracking-tight">FREE</div>
            <ul className="space-y-4 text-left text-sm text-slate-600 mb-10 flex-1">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="text-[#0ea5e9] w-5 h-5 shrink-0" />
                Quản lý tủ thuốc
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="text-[#0ea5e9] w-5 h-5 shrink-0" />
                Quét đơn thuốc AI
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="text-[#0ea5e9] w-5 h-5 shrink-0" />
                Trải nghiệm thực đơn dinh dưỡng cá nhân
              </li>
            </ul>
            <Button
              variant="outline"
              onClick={() => navigate("/login")}
              className="w-full rounded-full border-slate-300 text-slate-700 hover:bg-slate-50 h-12"
            >
              Dùng thử ngay
            </Button>
          </div>

          {/* CƠ BẢN PLAN (Highlight) */}
          <div className="bg-white rounded-[2rem] p-10 shadow-2xl text-center relative h-full flex flex-col border-[3px] border-[#cffafe] lg:-mt-4 lg:mb-[-1rem]">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#818cf8] text-white text-[0.6875rem] font-bold px-4 py-1.5 rounded-full uppercase tracking-wider">
              Phổ biến nhất
            </div>
            <h3 className="text-slate-800 text-xl font-bold font-display mb-2 mt-2">Gói cơ bản</h3>
            <div className="text-4xl font-extrabold text-slate-800 font-display mb-1 tracking-tight">299.000đ</div>
            <p className="text-slate-500 text-sm mb-8">/tháng</p>
            <ul className="space-y-4 text-left text-sm text-slate-600 mb-10 flex-1">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="text-[#0ea5e9] w-5 h-5 shrink-0" />
                Quản lý tủ thuốc và Quét đơn thuốc không giới hạn
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="text-[#0ea5e9] w-5 h-5 shrink-0" />
                Gợi ý thực đơn theo tuần
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="text-[#0ea5e9] w-5 h-5 shrink-0" />
                Thêm tối đa 2 thành viên
              </li>
            </ul>
            <Button
              variant="outline"
              onClick={() => navigate("/login")}
              className="w-full rounded-full border-[#0ea5e9] text-[#0ea5e9] hover:bg-cyan-50 h-12 font-bold"
            >
              Đăng ký gói cơ bản
            </Button>
          </div>

          {/* CAO CẤP PLAN */}
          <div className="bg-white rounded-[2rem] p-10 shadow-lg text-center h-full flex flex-col">
            <h3 className="text-slate-800 text-xl font-bold font-display mb-2 mt-2">Cao cấp</h3>
            <div className="text-4xl font-extrabold text-slate-800 font-display mb-1 tracking-tight">399.000đ</div>
            <p className="text-slate-500 text-sm mb-8">/tháng</p>
            <ul className="space-y-4 text-left text-sm text-slate-600 mb-10 flex-1">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="text-[#0ea5e9] w-5 h-5 shrink-0" />
                Tất cả tính năng Cơ bản
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="text-[#0ea5e9] w-5 h-5 shrink-0" />
                Tư vấn bác sĩ trực tuyến
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="text-[#0ea5e9] w-5 h-5 shrink-0" />
                Chia sẻ dữ liệu cho bác sĩ
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="text-[#0ea5e9] w-5 h-5 shrink-0" />
                Không giới hạn thành viên
              </li>
            </ul>
            <Button
              variant="outline"
              onClick={() => navigate("/login")}
              className="w-full rounded-full border-slate-300 text-slate-700 hover:bg-slate-50 h-12"
            >
              Đăng ký gói cao cấp
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
