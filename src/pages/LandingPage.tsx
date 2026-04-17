import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { ScanLine, Crosshair, Calendar, Pill, ShieldCheck, Users, PhoneCall } from "lucide-react";
import heroCare from "@/assets/hero-care.jpg";
import PublicNavbar from "@/components/PublicNavbar";
import PublicFooter from "@/components/PublicFooter";
import PricingSection from "@/components/PricingSection";

const LandingPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const handleCtaClick = () => {
    if (isAuthenticated) {
      navigate("/app");
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <PublicNavbar />

      {/* Hero */}
      <section className="px-8 lg:px-16 py-20 lg:py-28 relative overflow-hidden bg-gradient-to-r from-slate-50 to-cyan-50/30">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center relative z-10">
          <div>
            <h1 className="text-5xl lg:text-[4rem] font-display font-extrabold text-[#1a202c] leading-[1.1] mb-6 tracking-tight">
              Chăm sóc cha mẹ <br />
              từ <span className="text-[#0ea5e9]">bất cứ đâu</span>
            </h1>
            <p className="text-slate-500 text-[1.125rem] mb-10 max-w-md leading-relaxed">
              Giải pháp y tế thông minh cho gia đình và bản thân từ bất cứ đâu! Khám phá ngay bây giờ cùng FamCare!
            </p>
            <div className="flex flex-wrap gap-4">
              <Button onClick={handleCtaClick} size="lg" className="rounded-xl px-8 h-12 bg-[#0ea5e9] hover:bg-[#0284c7] text-white shadow-lg shadow-cyan-500/25">
                Truy cập vào ứng dụng
              </Button>
              <Button variant="secondary" size="lg" className="rounded-xl px-8 h-12 bg-slate-100 hover:bg-slate-200 text-slate-700" onClick={() => navigate("/app")}>
                Xem cách hoạt động
              </Button>
            </div>
          </div>

          <div className="relative rounded-3xl overflow-hidden shadow-2xl">
            <img
              src={heroCare}
              alt="Chăm sóc người cao tuổi"
              className="w-full h-auto object-cover"
              width={800}
              height={640}
            />
          </div>
        </div>
      </section>

      {/* Services - 4 Squares (Figma) */}
      <section className="px-8 lg:px-16 py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white rounded-2xl p-8 shadow-[0_4px_24px_rgba(0,0,0,0.02)] transition-transform hover:-translate-y-1">
            <div className="w-12 h-12 rounded-full border border-cyan-100 bg-cyan-50 flex items-center justify-center mb-6">
              <ScanLine size={24} className="text-[#0ea5e9]" />
            </div>
            <h3 className="text-lg font-bold font-display text-slate-800 mb-3">Quét đơn thuốc AI</h3>
            <p className="text-sm text-slate-500 leading-relaxed">Trích xuất dữ liệu từ ảnh chụp đơn thuốc ngay lập tức với độ chính xác cao.</p>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-[0_4px_24px_rgba(0,0,0,0.02)] transition-transform hover:-translate-y-1">
            <div className="w-12 h-12 rounded-full border border-orange-100 bg-orange-50 flex items-center justify-center mb-6">
              <Crosshair size={24} className="text-orange-500" />
            </div>
            <h3 className="text-lg font-bold font-display text-slate-800 mb-3">Chuyên gia dinh dưỡng AI</h3>
            <p className="text-sm text-slate-500 leading-relaxed">Lên kế hoạch ăn uống cá nhân hóa dựa trên tình trạng sức khỏe của từng cá nhân.</p>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-[0_4px_24px_rgba(0,0,0,0.02)] transition-transform hover:-translate-y-1">
            <div className="w-12 h-12 rounded-full border border-blue-100 bg-blue-50 flex items-center justify-center mb-6">
              <Pill size={24} className="text-blue-500" />
            </div>
            <h3 className="text-lg font-bold font-display text-slate-800 mb-3">Tủ thuốc AI</h3>
            <p className="text-sm text-slate-500 leading-relaxed">Quản lý tủ thuốc gia đình và cài đặt nhắc nhở uống thuốc thông minh.</p>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-[0_4px_24px_rgba(0,0,0,0.02)] transition-transform hover:-translate-y-1">
            <div className="w-12 h-12 rounded-full border border-slate-100 bg-slate-50 flex items-center justify-center mb-6">
              <Calendar size={24} className="text-slate-500" />
            </div>
            <h3 className="text-lg font-bold font-display text-slate-800 mb-3">Đặt lịch khám bệnh</h3>
            <p className="text-sm text-slate-500 leading-relaxed">Đặt lịch nhanh chóng với các chuyên gia hàng đầu trong hệ thống.</p>
          </div>
        </div>
      </section>

      {/* Split Section - Smartwatch + Stats */}
      <section className="px-8 lg:px-16 py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-6">
          <div className="relative rounded-2xl overflow-hidden min-h-[400px]">
            <img 
              src="https://images.unsplash.com/photo-1579586337278-3befd40fd17a?auto=format&fit=crop&q=80&w=800" 
              alt="Smartwatch" 
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-x-0 bottom-0 top-1/2 bg-gradient-to-t from-black/80 to-transparent"></div>
            <p className="absolute bottom-6 left-8 right-8 text-white font-display font-medium text-lg">
              Kết nối hiệu quả với gia đình
            </p>
          </div>

          <div className="flex flex-col gap-6">
            <div className="bg-[#2a4365] rounded-2xl p-10 flex-1 flex flex-col justify-center text-white">
              <ShieldCheck size={32} className="mb-4 text-cyan-300" />
              <h3 className="text-2xl font-display font-bold mb-2">Bảo mật tuyệt đối</h3>
              <p className="text-slate-300 text-sm">Dữ liệu y tế của gia đình bạn được mã hóa theo tiêu chuẩn quốc tế.</p>
            </div>
            
            <div className="grid grid-cols-2 gap-6 flex-1">
              <div className="bg-[#0ea5e9] rounded-2xl p-8 flex flex-col items-center justify-center text-center text-white">
                <Users size={28} className="mb-3 opacity-90" />
                <h3 className="text-3xl font-display font-bold mb-1">200+</h3>
                <p className="text-xs font-semibold uppercase tracking-wider opacity-90">Bác sĩ chuyên khoa</p>
              </div>
              <div className="bg-[#6b4676] rounded-2xl p-8 flex flex-col items-center justify-center text-center text-white">
                <PhoneCall size={28} className="mb-3 opacity-90" />
                <h3 className="text-3xl font-display font-bold mb-1">24/7</h3>
                <p className="text-xs font-semibold uppercase tracking-wider opacity-90">Hỗ trợ khẩn cấp</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <PricingSection />

      <PublicFooter />
    </div>
  );
};

export default LandingPage;
