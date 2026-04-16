import React from 'react';
import PublicNavbar from "@/components/PublicNavbar";
import PublicFooter from "@/components/PublicFooter";
import { Eye, Rocket, Heart, ShieldCheck, Lightbulb, ArrowRight } from "lucide-react";
import doctorElderly from "@/assets/hero-care.jpg"; // Reusing the asset we have, or better a new one if available. Let's reuse heroCare.

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#fafafa]">
      <PublicNavbar />

      {/* Hero Section */}
      <section className="px-8 lg:px-16 py-16 lg:py-24 bg-gradient-to-r from-slate-50 to-cyan-50/20">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-block bg-[#bbf7d0] text-[#166534] text-[0.625rem] font-bold px-3 py-1 rounded-full mb-6 tracking-widest uppercase">
              Kinh nghiệm & Tận tâm
            </div>
            <h1 className="text-4xl lg:text-5xl font-display font-bold text-slate-800 leading-[1.15] mb-6 tracking-tight">
              Kiến tạo hệ sinh thái <br />
              <span className="text-[#0ea5e9]">Chăm sóc sức khỏe <br/> thông minh</span>
            </h1>
            <p className="text-slate-500 text-[1rem] leading-relaxed mb-10 max-w-md">
              FamCare không chỉ là ứng dụng, chúng tôi là người đồng hành đáng tin cậy giúp mỗi gia đình Việt tối ưu hóa hành trình sức khỏe thông qua công nghệ AI và sự thấu cảm y học.
            </p>
            <button className="flex items-center gap-2 bg-[#0f172a] hover:bg-slate-800 text-white px-6 py-3 rounded-full text-sm font-semibold transition-colors">
              Khám phá giải pháp
              <ArrowRight size={16} />
            </button>
          </div>

          <div className="relative rounded-3xl overflow-hidden shadow-2xl">
            <img
              src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=800" 
              alt="Bác sĩ và bệnh nhân"
              className="w-full h-auto object-cover"
            />
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="px-8 lg:px-16 py-20 -mt-10">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
          <div className="bg-white rounded-3xl p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
            <div className="w-14 h-14 rounded-full bg-blue-100/50 flex items-center justify-center mb-6">
              <Eye size={24} className="text-blue-600" />
            </div>
            <h2 className="text-2xl font-bold font-display text-slate-800 mb-4">Tầm nhìn</h2>
            <p className="text-slate-500 leading-relaxed text-sm">
              Trở thành nền tảng quản lý sức khỏe số 1 tại Đông Nam Á, nơi mọi gia đình Việt đều có thế tiếp cận dịch vụ y tế chất lượng cao chỉ qua một điểm chạm duy nhất.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
            <div className="w-14 h-14 rounded-full bg-cyan-100 flex items-center justify-center mb-6">
              <Rocket size={24} className="text-teal-600" />
            </div>
            <h2 className="text-2xl font-bold font-display text-slate-800 mb-4">Sứ mệnh</h2>
            <p className="text-slate-500 leading-relaxed text-sm">
              Cung cấp bộ công cụ AI thông minh giúp cá nhân hóa phác đồ chăm sóc, dự báo rủi ro sức khỏe và gắn kết yêu thương giữa các thành viên gia đình.
            </p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="px-8 lg:px-16 py-16">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
          <div className="flex flex-col items-center">
            <div className="text-5xl font-display font-extrabold text-[#0f172a] mb-2 tracking-tight">10+</div>
            <h3 className="text-[0.6875rem] font-bold text-slate-500 uppercase tracking-widest relative pb-4">
              Bác sĩ chuyên gia
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-1 bg-teal-500 rounded-full"></span>
            </h3>
          </div>
          <div className="flex flex-col items-center">
            <div className="text-5xl font-display font-extrabold text-[#0f172a] mb-2 tracking-tight">100%</div>
            <h3 className="text-[0.6875rem] font-bold text-slate-500 uppercase tracking-widest relative pb-4">
              Bảo mật dữ liệu
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-1 bg-teal-500 rounded-full"></span>
            </h3>
          </div>
          <div className="flex flex-col items-center">
            <div className="text-5xl font-display font-extrabold text-[#0f172a] mb-2 tracking-tight">24/7</div>
            <h3 className="text-[0.6875rem] font-bold text-slate-500 uppercase tracking-widest relative pb-4">
              Hỗ trợ tận tâm
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-1 bg-teal-500 rounded-full"></span>
            </h3>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="px-8 lg:px-16 py-24">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold font-display text-[#0f172a] mb-3">Giá trị cốt lõi</h2>
            <p className="text-slate-500 text-sm">Chúng tôi vận hành dựa trên những giá trị bền vững để mang lại sự an tâm tuyệt đối.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-10 text-center">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mb-6">
                <Heart size={24} className="text-[#0f172a]" />
              </div>
              <h3 className="text-lg font-bold text-slate-800 mb-3">Tận tâm</h3>
              <p className="text-sm text-slate-500 leading-relaxed">Luôn đặt sức khỏe và hạnh phúc của khách hàng lên hàng đầu trong mọi quyết định.</p>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mb-6">
                <ShieldCheck size={24} className="text-[#0f172a]" />
              </div>
              <h3 className="text-lg font-bold text-slate-800 mb-3">Tin cậy</h3>
              <p className="text-sm text-slate-500 leading-relaxed">Minh bạch trong y khoa và bảo mật tuyệt đối trong hệ thống thông tin.</p>
            </div>

            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mb-6">
                <Lightbulb size={24} className="text-[#0f172a]" />
              </div>
              <h3 className="text-lg font-bold text-slate-800 mb-3">Sáng tạo</h3>
              <p className="text-sm text-slate-500 leading-relaxed">Liên tục cải tiến công nghệ AI để mang lại trải nghiệm y tế hiện đại nhất.</p>
            </div>
          </div>
        </div>
      </section>

      <PublicFooter />
    </div>
  );
}