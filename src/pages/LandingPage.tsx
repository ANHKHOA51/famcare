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

  return (
    <div className="min-h-screen bg-white">
      <PublicNavbar />

      {/* ── Hero ── */}
      <section className="px-8 lg:px-16 py-20 lg:py-28 relative overflow-hidden bg-gradient-to-br from-slate-50 via-cyan-50/20 to-sky-50/40">
        {/* Soft background glow */}
        <div className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full bg-orange-200/20 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-32 -right-32 w-[400px] h-[400px] rounded-full bg-cyan-200/20 blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center relative z-10">
          {/* Left — copy + CTAs */}
          <div>
            {/* Eyebrow badge */}
            <div className="inline-flex items-center gap-2 bg-orange-50 border border-orange-200 text-orange-700 text-xs font-bold px-4 py-1.5 rounded-full mb-6 tracking-wide uppercase">
              <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
              Dự án học thuật — UEH 2024
            </div>

            <h1 className="text-5xl lg:text-[4rem] font-display font-extrabold text-[#1a202c] leading-[1.1] mb-6 tracking-tight">
              Chăm sóc cha mẹ <br />
              từ <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-amber-400">bất cứ đâu</span>
            </h1>

            <p className="text-slate-500 text-[1.125rem] mb-10 max-w-md leading-relaxed">
              Giải pháp y tế thông minh cho gia đình và bản thân. Quét đơn thuốc, lên thực đơn dinh dưỡng và đặt lịch khám — tất cả trong một nơi.
            </p>

            {/* ── Dual CTA ── */}
            <div className="flex flex-col sm:flex-row gap-4">
              {/* Primary — Scan */}
              <Button
                size="lg"
                onClick={() => navigate(isAuthenticated ? "/app/scanner" : "/login")}
                className="rounded-2xl px-8 h-14 bg-gradient-to-r from-orange-500 to-amber-400
                           hover:from-orange-600 hover:to-amber-500 text-white font-bold text-base
                           shadow-xl shadow-orange-500/30 transition-all hover:-translate-y-0.5
                           border-0 focus-visible:ring-orange-400"
              >
                📷 Quét đơn thuốc ngay
              </Button>

              {/* Secondary — Appointments */}
              <Button
                size="lg"
                onClick={() => navigate(isAuthenticated ? "/app/appointment" : "/login")}
                className="rounded-2xl px-8 h-14 bg-slate-900 hover:bg-slate-800 text-white
                           font-bold text-base shadow-lg transition-all hover:-translate-y-0.5
                           border-0 focus-visible:ring-slate-500"
              >
                📅 Đặt lịch khám
              </Button>
            </div>

            {/* ── Trust Badges ── */}
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 mt-6">
              {[
                { icon: "🏥", text: "Bác sĩ chuyên khoa được xác minh" },
                { icon: "🔒", text: "Dữ liệu mã hóa AES-256" },
                { icon: "🎓", text: "Dự án học thuật UEH" },
              ].map((badge) => (
                <span key={badge.text} className="flex items-center gap-1.5 text-slate-500 text-sm font-medium">
                  <span>{badge.icon}</span>
                  {badge.text}
                </span>
              ))}
            </div>
          </div>

          {/* Right — hero image */}
          <div className="relative rounded-3xl overflow-hidden shadow-2xl ring-1 ring-slate-200/50">
            <img
              src={heroCare}
              alt="Chăm sóc người cao tuổi"
              className="w-full h-auto object-cover"
              width={800}
              height={640}
            />
            {/* Overlay stat chip */}
            <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur-sm rounded-2xl px-5 py-3 shadow-lg flex items-center gap-3">
              <span className="text-2xl">💊</span>
              <div>
                <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Tủ thuốc AI</p>
                <p className="text-sm font-extrabold text-slate-900">Nhắc nhở tự động</p>
              </div>
            </div>
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
