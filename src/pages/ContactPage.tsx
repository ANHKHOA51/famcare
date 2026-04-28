import React from 'react';
import PublicNavbar from "@/components/PublicNavbar";
import PublicFooter from "@/components/PublicFooter";
import { Send, MapPin, PhoneCall, Mail, Building2, Building, PlusSquare, Network, Hospital } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[#fafafa]">
      <PublicNavbar />

      {/* Hero Section */}
      <section className="px-8 lg:px-16 py-16 bg-gradient-to-r from-slate-50 to-cyan-50/50">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">
          <div className="flex-1">
            <div className="inline-block text-[#0891b2] text-[0.625rem] font-bold tracking-widest uppercase mb-4">
              Hỗ trợ 24/7
            </div>
            <div className="flex items-center gap-5 mb-6">
              <div className="w-16 h-16 bg-white rounded-2xl shadow-sm border border-slate-100 flex items-center justify-center p-2">
                <img src="/logo.png" alt="FamCare Logo" className="w-full h-full object-contain" />
              </div>
              <h1 className="text-4xl lg:text-5xl font-display font-bold text-[#0f172a] leading-[1.1] tracking-tight">
                Liên hệ với FamCare
              </h1>
            </div>
            <p className="text-slate-500 text-[1rem] leading-relaxed max-w-md">
              Đội ngũ chuyên gia y tế và chăm sóc khách hàng của chúng tôi luôn sẵn sàng lắng nghe và đồng hành cùng sức khỏe gia đình bạn.
            </p>
          </div>

          <div className="flex-1 relative w-full max-w-lg mx-auto">
            <div className="rounded-[2.5rem] overflow-hidden shadow-2xl relative bg-cyan-100 aspect-[4/3]">
              <img 
                src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=800" 
                alt="Support Team" 
                className="w-full h-full object-cover mix-blend-multiply opacity-90"
              />
              <div className="absolute inset-0 bg-cyan-500/10"></div>
              
              {/* Floating Badge */}
              <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur-md rounded-2xl p-4 shadow-xl flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center text-teal-600">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                </div>
                <div>
                  <p className="text-[0.75rem] font-bold text-slate-800">Phản hồi nhanh</p>
                  <p className="text-[0.625rem] text-slate-500 font-medium">CAM KẾT <span className="text-teal-600">DƯỚI 15 PHÚT</span></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Section */}
      <section className="px-8 lg:px-16 py-16 -mt-10 relative z-10">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Cards */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
              <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mb-5">
                <MapPin size={20} className="text-slate-600" />
              </div>
              <h3 className="font-bold text-lg text-slate-800 mb-2">Văn phòng chính</h3>
              <p className="text-base text-slate-600 leading-relaxed">
                Thành phố Hồ Chí Minh
              </p>
            </div>

            <div className="bg-[#a5f3fc] rounded-3xl p-8 shadow-sm">
              <div className="w-12 h-12 rounded-full bg-[#0891b2] flex items-center justify-center mb-5">
                <PhoneCall size={20} className="text-white" />
              </div>
              <h3 className="font-bold text-lg text-[#083344] mb-2">Hotline khẩn cấp</h3>
              <p className="text-2xl font-display font-extrabold text-[#083344] mb-1">0388 224 736</p>
              <p className="text-xs font-bold text-[#0e7490] uppercase tracking-wider">Phục vụ 24/7 kể cả ngày lễ</p>
            </div>

            <div className="bg-[#ffedd5] rounded-3xl p-8 shadow-sm">
              <div className="w-12 h-12 rounded-full bg-[#9a3412] flex items-center justify-center mb-5">
                <Mail size={20} className="text-white" />
              </div>
              <h3 className="font-bold text-lg text-[#431407] mb-2">Email hỗ trợ</h3>
              <p className="text-base text-[#7c2d12] font-medium break-all">famcare.support@gmail.com</p>
            </div>
          </div>

          {/* Right Form */}
          <div className="lg:col-span-8 bg-white rounded-[2.5rem] p-10 lg:p-14 shadow-xl border border-slate-50">
            <div className="flex items-center gap-4 mb-10">
              <h2 className="text-2xl lg:text-3xl font-display font-bold text-slate-800">Gửi tin nhắn cho chúng tôi</h2>
              <div className="h-0.5 bg-teal-500 w-12 flex-shrink-0 mt-2"></div>
            </div>

            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[0.6875rem] font-bold text-slate-500 uppercase tracking-widest">Họ tên</label>
                  <input type="text" className="w-full bg-[#f8fafc] border border-transparent rounded-xl px-4 py-3.5 text-sm outline-none focus:bg-white focus:border-teal-500 transition-all" placeholder="Nguyễn Văn A" />
                </div>
                <div className="space-y-2">
                  <label className="text-[0.6875rem] font-bold text-slate-500 uppercase tracking-widest">Email</label>
                  <input type="email" className="w-full bg-[#f8fafc] border border-transparent rounded-xl px-4 py-3.5 text-sm outline-none focus:bg-white focus:border-teal-500 transition-all" placeholder="example@gmail.com" />
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[0.6875rem] font-bold text-slate-500 uppercase tracking-widest">Số điện thoại</label>
                  <input type="tel" className="w-full bg-[#f8fafc] border border-transparent rounded-xl px-4 py-3.5 text-sm outline-none focus:bg-white focus:border-teal-500 transition-all" placeholder="090 1234 567" />
                </div>
                <div className="space-y-2">
                  <label className="text-[0.6875rem] font-bold text-slate-500 uppercase tracking-widest">Chủ đề</label>
                  <select className="w-full bg-[#f8fafc] border border-transparent rounded-xl px-4 py-3.5 text-sm outline-none focus:bg-white focus:border-teal-500 transition-all appearance-none text-slate-600">
                    <option>Tư vấn sức khỏe</option>
                    <option>Hỗ trợ kỹ thuật</option>
                    <option>Hợp tác kinh doanh</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[0.6875rem] font-bold text-slate-500 uppercase tracking-widest">Nội dung lời nhắn</label>
                <textarea rows={5} className="w-full bg-[#f8fafc] border border-transparent rounded-xl px-4 py-4 text-sm outline-none focus:bg-white focus:border-teal-500 transition-all resize-none" placeholder="Chúng tôi có thể giúp gì cho bạn?"></textarea>
              </div>

              <button type="button" className="bg-[#0f172a] hover:bg-slate-800 text-white font-semibold flex items-center gap-3 px-8 py-4 rounded-xl transition-colors w-fit !mt-8">
                Gửi yêu cầu
                <Send size={18} />
              </button>
            </form>
          </div>

        </div>
      </section>

      {/* Map Section */}
      <section className="px-8 lg:px-16 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="relative w-full h-[400px] bg-slate-200 rounded-[2.5rem] overflow-hidden grayscale contrast-125">
            <img 
              src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=1200" 
              alt="Map Outline" 
              className="w-full h-full object-cover opacity-60"
            />
            <div className="absolute inset-0 bg-slate-900/30"></div>
            
            <div className="absolute bottom-8 left-8 bg-white/90 backdrop-blur-md px-6 py-3 rounded-xl shadow-lg flex items-center gap-3">
              <MapPin className="text-[#0f172a]" size={20} />
              <span className="font-bold text-sm text-[#0f172a]">FamCare Ho Chi Minh Headquarters</span>
            </div>
          </div>
        </div>
      </section>

      {/* Board of Directors section removed (no photos yet) */}

      {/* Partners Section */}
      <section className="bg-[#0a1128] py-20 mt-12">
        <div className="max-w-7xl mx-auto px-8 lg:px-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 border-b border-white/10 pb-8">
            <div>
              <div className="text-cyan-400 text-[0.625rem] font-bold tracking-widest uppercase mb-3">
                Mạng lưới tin cậy
              </div>
              <h2 className="text-3xl font-display font-bold text-white tracking-tight">
                Hệ thống phòng khám đối tác
              </h2>
            </div>
            <p className="text-slate-400 text-sm max-w-sm">
              Liên kết trực tiếp với các đơn vị y tế hàng đầu Việt Nam để đảm bảo chất lượng chăm sóc tốt nhất.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {[
              { icon: Building2, name: "BỆNH VIỆN CHỢ RẪY" },
              { icon: Building, name: "VINMEC HEALTHCARE" },
              { icon: PlusSquare, name: "BỆNH VIỆN SẢN NHI" },
              { icon: Network, name: "PHÒNG KHÁM ĐA KHOA" },
              { icon: Hospital, name: "MEDLATEC" },
            ].map((partner, idx) => (
              <div key={idx} className="bg-white/5 border border-white/10 rounded-2xl p-8 flex flex-col items-center justify-center gap-4 hover:bg-white/10 transition-colors cursor-pointer">
                <div className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center text-white/80">
                  <partner.icon size={28} />
                </div>
                <p className="text-[0.625rem] font-bold text-slate-300 tracking-wider text-center max-w-[100px]">{partner.name}</p>
              </div>
            ))}
          </div>
        </div>
        
        {/* Simple Footer Integration in dark section */}
        <div className="max-w-7xl mx-auto px-8 lg:px-16 pt-20">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-[0.75rem] text-slate-500 border-t border-white/10 pt-8">
            <div className="flex items-center gap-2">
              <span className="font-bold text-white text-base font-display">FamCare</span>
              <span>Chăm sóc sức khỏe gia đình bạn ở mọi nơi.</span>
            </div>
            <div className="flex gap-6">
              <span className="hover:text-white cursor-pointer transition-colors">Điều khoản</span>
              <span className="hover:text-white cursor-pointer transition-colors">Bảo mật</span>
              <span className="hover:text-white cursor-pointer transition-colors">Cookie</span>
            </div>
            <div>© 2026 FamCare. All rights reserved.</div>
          </div>
        </div>
      </section>

    </div>
  );
}