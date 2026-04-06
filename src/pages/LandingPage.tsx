import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ScanLine, Monitor, Home, Utensils, ArrowRight, AlertCircle } from "lucide-react";
import heroCare from "@/assets/hero-care.jpg";
import serviceScanner from "@/assets/service-scanner.jpg";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen surface-2">
      {/* Navbar — glassmorphism */}
      <header className="surface-glass sticky top-0 z-50 flex items-center justify-between px-8 lg:px-16 py-4">
        <h1 className="text-base font-bold font-display text-foreground tracking-tight">AuraHeath</h1>
        <nav className="hidden md:flex items-center gap-10">
          <a href="#" className="text-sm font-semibold text-foreground">Trang chủ</a>
          <a href="#services" className="text-sm text-on-surface-variant hover:text-foreground transition-colors">Dịch vụ</a>
          <a href="#" className="text-sm text-on-surface-variant hover:text-foreground transition-colors">Giá cả</a>
        </nav>
        <Button onClick={() => navigate("/login")} size="default">
          Đăng nhập
        </Button>
      </header>

      {/* Hero */}
      <section className="px-8 lg:px-16 py-20 lg:py-28">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-block bg-success-container text-success-on-container text-[0.6875rem] font-semibold px-4 py-1.5 rounded-full mb-8 tracking-wider uppercase">
              Aura Health · Kỷ nguyên y tế mới
            </div>
            <h2 className="text-5xl lg:text-[3.5rem] font-display font-extrabold text-foreground leading-[1.08] mb-7 tracking-tight">
              Chăm sóc cha mẹ<br />
              <span className="text-primary">từ bất cứ đâu.</span>
            </h2>
            <p className="text-on-surface-variant text-[1rem] mb-10 max-w-md leading-[1.7]">
              Giải pháp y tế thông minh dành cho người bận rộn. Theo dõi sức khỏe thời gian thực và kết nối bác sĩ tận tâm cho người thân yêu của bạn.
            </p>
            <div className="flex gap-4">
              <Button onClick={() => navigate("/login")} size="lg" className="rounded-full">
                Bắt đầu ngay
              </Button>
              <Button variant="outline" size="lg" className="rounded-full" onClick={() => navigate("/app")}>
                Xem cách hoạt động
              </Button>
            </div>
          </div>

          <div className="relative">
            <img
              src={heroCare}
              alt="Chăm sóc người cao tuổi"
              className="rounded-3xl w-full object-cover"
              width={800}
              height={640}
            />
            {/* Vitals overlay — glass */}
            <div className="absolute bottom-8 left-6 right-6 surface-glass rounded-2xl px-6 py-5 shadow-elevated flex items-center justify-between">
              <div>
                <p className="text-[0.6875rem] text-on-surface-variant uppercase tracking-wider">Chỉ số sinh tồn</p>
                <p className="text-[2rem] font-bold text-foreground font-display leading-none mt-1">98 <span className="text-sm font-normal text-on-surface-variant">bpm</span></p>
              </div>
              <span className="bg-success-container text-success-on-container text-[0.6875rem] font-semibold px-4 py-2 rounded-full">
                Trạng thái: Ổn định
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Services — surface shift to Level 0 */}
      <section id="services" className="px-8 lg:px-16 py-20 surface-0">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl lg:text-[2.5rem] font-display font-bold text-foreground tracking-tight mb-3">Dịch vụ chăm sóc 5 sao</h2>
            <p className="text-on-surface-variant text-[0.875rem]">Kết hợp giữa công nghệ AI tiên tiến và sự thấu cảm trong y đức.</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-6 mb-6">
            {/* AI Scanner */}
            <div className="surface-2 rounded-2xl p-8 flex flex-col justify-end min-h-[300px] shadow-patient transition-shadow duration-300 hover:shadow-elevated">
              <div className="w-11 h-11 rounded-xl bg-primary/8 flex items-center justify-center mb-5">
                <ScanLine size={20} className="text-primary" />
              </div>
              <h3 className="text-lg font-bold font-display text-foreground mb-2">Quét đơn thuốc AI</h3>
              <p className="text-[0.8125rem] text-on-surface-variant leading-relaxed">Công nghệ nhận diện văn bản giúp chuyển đổi đơn thuốc viết tay thành lời nhắc uống thuốc thông minh trên điện thoại.</p>
            </div>

            {/* Center image */}
            <div className="rounded-2xl overflow-hidden min-h-[300px]">
              <img src={serviceScanner} alt="Medical technology" className="w-full h-full object-cover" loading="lazy" width={640} height={512} />
            </div>

            {/* 24/7 Monitoring — primary tonal */}
            <div className="gradient-primary rounded-2xl p-8 flex flex-col justify-end min-h-[300px] text-primary-foreground shadow-patient">
              <div className="w-11 h-11 rounded-xl bg-primary-foreground/15 flex items-center justify-center mb-5">
                <Monitor size={20} />
              </div>
              <h3 className="text-lg font-bold font-display mb-2">Giám sát 24/7</h3>
              <p className="text-sm opacity-80 leading-relaxed">Theo dõi nhịp tim, giấc ngủ và cảnh báo té ngã ngay lập tức qua ứng dụng của bạn.</p>
              <div className="flex items-center gap-1 mt-5">
                <div className="w-8 h-8 rounded-full bg-primary-foreground/25" />
                <div className="w-8 h-8 rounded-full bg-primary-foreground/25 -ml-2" />
                <div className="w-8 h-8 rounded-full bg-primary-foreground/15 -ml-2 flex items-center justify-center text-[10px] font-bold">+12</div>
              </div>
              <p className="text-[0.75rem] mt-2 opacity-65">Đội ngũ y sĩ luôn sẵn sàng</p>
            </div>
          </div>

          <div className="grid lg:grid-cols-5 gap-6">
            {/* Home Care — primary dark */}
            <div className="lg:col-span-2 gradient-primary rounded-2xl p-8 min-h-[220px] flex flex-col justify-end text-primary-foreground shadow-patient">
              <div className="w-11 h-11 rounded-xl bg-primary-foreground/15 flex items-center justify-center mb-5">
                <Home size={20} />
              </div>
              <h3 className="text-lg font-bold font-display mb-2">Chăm sóc tại nhà</h3>
              <p className="text-sm opacity-80 mb-5 leading-relaxed">Đặt lịch điều dưỡng tới tận nhà để thay băng, tiêm thuốc hoặc hỗ trợ sinh hoạt.</p>
              <button className="flex items-center gap-1.5 text-sm font-semibold opacity-85 hover:opacity-100 transition-opacity w-fit">
                Khám phá ngay <ArrowRight size={14} />
              </button>
            </div>

            {/* Personalized Nutrition — tertiary */}
            <div className="lg:col-span-3 bg-tertiary rounded-2xl p-8 min-h-[220px] flex flex-col justify-end text-tertiary-foreground shadow-patient">
              <div className="w-11 h-11 rounded-xl bg-tertiary-foreground/15 flex items-center justify-center mb-5">
                <Utensils size={20} />
              </div>
              <h3 className="text-lg font-bold font-display mb-2">Dinh dưỡng cá nhân hóa</h3>
              <p className="text-sm opacity-80 leading-relaxed">Thực đơn được thiết kế bởi chuyên gia dinh dưỡng dựa trên bệnh lý và khẩu vị của người cao tuổi.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section — tertiary tonal */}
      <section className="px-8 lg:px-16 py-20 surface-2">
        <div className="max-w-7xl mx-auto bg-tertiary rounded-3xl p-12 lg:p-18 grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-tertiary-foreground">
            <h2 className="text-3xl lg:text-[2.5rem] font-display font-extrabold leading-[1.1] mb-5 tracking-tight">
              Yên tâm làm việc,<br />Aura sẽ lo phần còn lại.
            </h2>
            <p className="text-sm opacity-75 mb-10 max-w-md leading-[1.7]">
              Hệ thống thông báo thông minh tự động nhận diện các bất thường và liên hệ ngay với bạn hoặc đội cứu thương trong trường hợp khẩn cấp.
            </p>
            <Button
              variant="outline-light"
              size="lg"
              className="rounded-full border-tertiary-foreground/30 text-tertiary-foreground"
              onClick={() => navigate("/app")}
            >
              Dùng thử miễn phí
            </Button>
          </div>

          <div className="bg-tertiary-foreground/10 backdrop-blur-sm rounded-2xl p-7">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-full bg-destructive flex items-center justify-center">
                <AlertCircle size={18} className="text-destructive-foreground" />
              </div>
              <div>
                <p className="font-semibold text-sm text-tertiary-foreground">Cảnh báo khẩn cấp</p>
                <p className="text-[0.6875rem] opacity-60 text-tertiary-foreground">Vừa xảy ra lúc 10:24 AM</p>
              </div>
            </div>
            <p className="text-sm text-tertiary-foreground/80 italic leading-relaxed">
              "Phát hiện nhịp tim của Mẹ không ổn định. Điều dưỡng đang trên đường tới hỗ trợ. Vui lòng kiểm tra ứng dụng."
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-8 lg:px-16 py-10 surface-2">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="font-display font-bold text-foreground text-lg">Aura Health</h3>
            <p className="text-[0.6875rem] text-on-surface-variant mt-1 uppercase tracking-wider">© 2026 Aura Health. ALL RIGHTS RESERVED.</p>
          </div>
          <div className="flex gap-8 text-[0.6875rem] text-on-surface-variant uppercase tracking-wider">
            <a href="#" className="hover:text-foreground transition-colors">Quyền riêng tư</a>
            <a href="#" className="hover:text-foreground transition-colors">Điều khoản</a>
            <a href="#" className="hover:text-foreground transition-colors">Liên hệ</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
