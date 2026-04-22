import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { ScanLine, Calendar, Pill, ShieldCheck, Utensils, Zap, CheckCircle2, Star } from "lucide-react";
import heroCare from "@/assets/hero-care.jpg";
import PublicNavbar from "@/components/PublicNavbar";
import PublicFooter from "@/components/PublicFooter";
import PricingSection from "@/components/PricingSection";

const LandingPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen bg-white text-slate-900 selection:bg-amber-200 selection:text-slate-900 font-sans">
      <PublicNavbar />

      {/* ── High-End Editorial Hero ── */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-32 overflow-hidden bg-[#FAFAFA] border-b border-slate-100">
        {/* Refined subtle grid */}
        <div className="absolute inset-0 opacity-[0.04] pointer-events-none" style={{ backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)', backgroundSize: '32px 32px' }} />

        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 grid lg:grid-cols-12 gap-12 items-center relative z-10">
          
          {/* Left Column - Typography & CTAs */}
          <div className="lg:col-span-6 flex flex-col items-start pr-4">
            {/* Micro-badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-blue-200 bg-blue-50 text-blue-700 text-xs font-bold tracking-widest uppercase mb-8">
              <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
              Nền tảng Y tế Thông minh
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-[5.5rem] font-display font-extrabold leading-[1.05] tracking-tight mb-8 text-slate-900">
              Chăm sóc <br />
              gia đình <br />
              <span className="relative inline-block mt-2">
                <span className="relative z-10 text-blue-600">từ xa.</span>
                <svg className="absolute -bottom-2 left-0 w-full h-4 text-amber-400/40 -z-10" viewBox="0 0 100 20" preserveAspectRatio="none">
                  <path d="M0 15 Q 50 0 100 15 L 100 20 L 0 20 Z" fill="currentColor" />
                </svg>
              </span>
            </h1>

            <p className="text-lg md:text-xl text-slate-600 mb-10 max-w-lg leading-relaxed">
              Giải pháp toàn diện kết hợp <strong className="font-bold text-slate-900">AI phân tích đơn thuốc</strong>, <strong className="font-bold text-slate-900">gợi ý thực đơn</strong> và <strong className="font-bold text-slate-900">quản lý y tế</strong> chuẩn xác, không cần thao tác phức tạp.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              {/* Primary CTA - using standard button to prevent shadcn style overrides */}
              <button
                onClick={() => navigate(isAuthenticated ? "/app/scanner" : "/login")}
                className="h-14 px-8 rounded-xl bg-amber-400 hover:bg-amber-500 text-slate-900 font-bold text-base flex items-center justify-center gap-2 transition-transform hover:-translate-y-1 w-full sm:w-auto border border-amber-500 shadow-[0_4px_14px_0_rgba(251,191,36,0.39)]"
              >
                <ScanLine size={20} />
                Quét đơn thuốc ngay
              </button>
              {/* Secondary CTA */}
              <button
                onClick={() => navigate(isAuthenticated ? "/app/appointment" : "/login")}
                className="h-14 px-8 rounded-xl bg-white hover:bg-slate-50 text-slate-900 font-bold text-base flex items-center justify-center gap-2 transition-transform hover:-translate-y-1 w-full sm:w-auto border border-slate-200 shadow-sm"
              >
                <Calendar size={20} />
                Đặt lịch khám
              </button>
            </div>
            
            {/* Trust Indicators */}
            <div className="mt-12 flex items-center gap-4">
                <div className="flex -space-x-3">
                {[
                  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=64&h=64",
                  "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=64&h=64",
                  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=64&h=64"
                ].map((img, i) => (
                  <img key={i} src={img} alt="User" className="w-10 h-10 rounded-full border-2 border-[#FAFAFA] object-cover" />
                ))}
              </div>
              <div className="flex flex-col">
                <div className="flex gap-1 text-amber-400">
                  {[1,2,3,4,5].map(i => <Star key={i} size={14} fill="currentColor" />)}
                </div>
                <p className="text-sm font-medium text-slate-600 mt-0.5">
                  Tin dùng bởi <strong className="text-slate-900 font-bold">10.000+</strong> gia đình
                </p>
              </div>
            </div>
          </div>

          {/* Right Column - High-end Visual Composition */}
          <div className="lg:col-span-6 relative mt-16 lg:mt-0">
            {/* Decorative circles */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] aspect-square border border-slate-200/60 rounded-full -z-10" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] aspect-square border border-slate-200/80 rounded-full -z-10" />

            {/* Main Image */}
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-slate-200/50 aspect-[4/5] sm:aspect-square lg:aspect-[3/4] z-10 w-[85%] ml-auto">
              <img
                src={heroCare}
                alt="Chăm sóc gia đình"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 border border-black/5 rounded-3xl z-20 pointer-events-none" />
            </div>

            {/* Overlapping floating elements */}
            {/* Element 1: Analysis Card */}
            <div className="absolute top-12 -left-6 bg-white p-4 rounded-2xl shadow-xl border border-slate-100 flex items-center gap-4 z-20">
              <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center shrink-0">
                <ShieldCheck size={24} className="text-emerald-600" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 text-sm">Quét thành công</h4>
                <p className="text-xs text-slate-500 mt-0.5"><strong className="text-emerald-600 font-bold">An toàn</strong> & Không kỵ thuốc</p>
              </div>
            </div>

            {/* Element 2: Small Photo */}
            <div className="absolute bottom-24 -left-12 w-48 aspect-[4/3] rounded-2xl overflow-hidden shadow-xl border-4 border-white z-20 hidden md:block">
              <img 
                src="https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&w=400&q=80" 
                className="w-full h-full object-cover" 
                alt="Thuốc" 
              />
            </div>

            {/* Element 3: Meal Plan Pill */}
            <div className="absolute bottom-8 right-8 bg-slate-900 text-white px-5 py-3 rounded-full shadow-2xl flex items-center gap-3 z-20 border border-slate-700">
              <Utensils size={18} className="text-amber-400" />
              <span className="text-sm font-bold">Thực đơn AI đã tạo</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Bento Box Features ── */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-2xl mb-16">
            <h2 className="text-4xl md:text-5xl font-display font-extrabold leading-tight mb-4 tracking-tight text-slate-900">
              Mọi thứ gia đình bạn cần,<br/>
              <span className="text-blue-600">trong một ứng dụng.</span>
            </h2>
            <p className="text-slate-600 text-lg">
              Loại bỏ sự rườm rà. Hệ thống cung cấp thông tin y tế <strong className="font-bold text-slate-900">nhanh chóng, trực quan và dễ hiểu</strong>.
            </p>
          </div>

          {/* Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[250px]">
            
            {/* Main Feature - Large Card */}
            <div className="md:col-span-2 bg-white rounded-[2rem] border border-slate-200 p-8 flex flex-col justify-between hover:border-blue-300 transition-colors shadow-sm">
              <div className="flex items-start justify-between">
                <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center">
                  <ScanLine size={28} />
                </div>
                <span className="px-3 py-1 bg-amber-100 text-amber-800 text-xs font-bold rounded-full uppercase tracking-wider">Lõi AI</span>
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-2 text-slate-900">Quét & Phân tích đơn thuốc</h3>
                <p className="text-slate-600">
                  Trích xuất thông tin, cảnh báo <strong className="font-bold text-red-600">tác dụng phụ</strong> và kiểm tra tương tác thuốc ngay lập tức chỉ với một bức ảnh.
                </p>
              </div>
            </div>

            {/* Feature 2 - Tall Card */}
            <div className="md:row-span-2 bg-slate-900 text-white rounded-[2rem] p-8 flex flex-col justify-between border border-slate-800 shadow-xl relative overflow-hidden">
               {/* Decorative subtle pattern */}
               <div className="absolute top-0 right-0 p-8 opacity-10">
                 <Utensils size={120} />
               </div>
               
               <div className="w-14 h-14 bg-white/10 text-white rounded-2xl flex items-center justify-center relative z-10">
                  <Utensils size={28} />
                </div>
                <div className="relative z-10 mt-8">
                  <h3 className="text-2xl font-bold mb-4">Thực đơn AI</h3>
                  <p className="text-slate-400 mb-8">
                    Xây dựng thực đơn dinh dưỡng cá nhân hóa dựa trên <strong className="font-bold text-white">bệnh lý nền</strong> và chỉ số cơ thể.
                  </p>
                  <ul className="space-y-3">
                    {["Bữa sáng 400kcal", "Bữa trưa chay", "Bữa tối ít muối"].map((item, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-slate-300 bg-white/5 p-3 rounded-xl border border-white/10">
                        <CheckCircle2 size={16} className="text-amber-400 shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
            </div>

             {/* Feature 3 - Normal Card */}
            <div className="bg-blue-600 text-white rounded-[2rem] p-8 flex flex-col justify-between shadow-sm relative overflow-hidden">
               <div className="absolute -bottom-4 -right-4 opacity-20">
                 <Pill size={100} />
               </div>
              <div className="w-14 h-14 bg-white/20 text-white rounded-2xl flex items-center justify-center relative z-10">
                  <Pill size={28} />
              </div>
              <div className="relative z-10 mt-8">
                <h3 className="text-xl font-bold mb-2">Tủ thuốc số</h3>
                <p className="text-blue-100 text-sm">
                  Quản lý số lượng và thiết lập <strong className="font-bold text-white">nhắc nhở uống thuốc</strong> tự động.
                </p>
              </div>
            </div>

             {/* Feature 4 - Normal Card */}
            <div className="bg-white rounded-[2rem] border border-slate-200 p-8 flex flex-col justify-between hover:border-slate-300 transition-colors shadow-sm">
              <div className="w-14 h-14 bg-slate-100 text-slate-900 rounded-2xl flex items-center justify-center">
                  <Calendar size={28} />
              </div>
              <div className="mt-8">
                <h3 className="text-xl font-bold mb-2 text-slate-900">Đặt lịch khám</h3>
                <p className="text-slate-600 text-sm">
                  Kết nối <strong className="font-bold text-slate-900">200+ bác sĩ</strong> chuyên khoa uy tín.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── Security / Split Section ── */}
      <section className="py-24 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 grid lg:grid-cols-2 gap-16 items-center">
          <div className="order-2 lg:order-1 flex flex-col gap-8">
            <h2 className="text-4xl font-display font-extrabold leading-tight tracking-tight text-slate-900">
              Dữ liệu của bạn,<br/>
              <span className="text-slate-500">quyền kiểm soát của bạn.</span>
            </h2>
            <p className="text-lg text-slate-600 leading-relaxed">
              Chúng tôi mã hóa toàn bộ dữ liệu y tế bằng tiêu chuẩn <strong className="font-bold text-slate-900">AES-256</strong>. Sức khỏe gia đình bạn là riêng tư tuyệt đối.
            </p>
            
            <div className="space-y-4 mt-4">
              {/* Blue Safe Card */}
              <div className="flex items-start gap-4 p-5 rounded-2xl bg-white border-2 border-slate-200 shadow-sm">
                <div className="p-2 bg-blue-50 text-blue-600 rounded-xl">
                  <ShieldCheck size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-lg">Mã hóa đầu cuối</h4>
                  <p className="text-slate-600 text-sm mt-1">Dữ liệu được mã hóa ngay trên thiết bị của bạn trước khi truyền tải.</p>
                </div>
              </div>

               {/* Red Alert Card */}
               <div className="flex items-start gap-4 p-5 rounded-2xl bg-white border-2 border-red-100 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-red-500"></div>
                <div className="p-2 bg-red-50 text-red-600 rounded-xl">
                  <ShieldCheck size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-red-700 text-lg">Cảnh báo truy cập</h4>
                  <p className="text-slate-600 text-sm mt-1">Nhận <strong className="font-bold text-slate-900">thông báo ngay lập tức</strong> nếu có thiết bị lạ cố gắng truy cập.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="order-1 lg:order-2 relative">
            <div className="aspect-square lg:aspect-[4/3] rounded-[2rem] overflow-hidden border-2 border-slate-900 relative z-10">
              <img 
                src="https://images.unsplash.com/photo-1579586337278-3befd40fd17a?auto=format&fit=crop&q=80&w=1200" 
                className="w-full h-full object-cover grayscale-[20%]"
                alt="Health tech"
              />
            </div>
            {/* Brutalist stat card */}
            <div className="absolute -bottom-8 -left-8 bg-slate-900 text-white p-8 rounded-2xl border-2 border-slate-900 shadow-[8px_8px_0px_0px_rgba(251,191,36,1)] z-20">
              <h3 className="text-5xl font-display font-extrabold mb-1">99<span className="text-amber-400">%</span></h3>
              <p className="text-slate-300 font-medium text-sm">Độ chính xác nhận diện đơn thuốc.</p>
            </div>
          </div>
        </div>
      </section>

      <PricingSection />
      <PublicFooter />
    </div>
  );
};

export default LandingPage;
