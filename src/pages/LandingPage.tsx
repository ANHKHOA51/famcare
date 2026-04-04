import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ScanLine, Monitor, Home, Utensils, ArrowRight, AlertCircle } from "lucide-react";
import heroCare from "@/assets/hero-care.jpg";
import serviceScanner from "@/assets/service-scanner.jpg";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-card">
      {/* Navbar */}
      <header className="flex items-center justify-between px-8 lg:px-16 py-4 border-b border-border bg-card sticky top-0 z-50">
        <h1 className="text-lg font-bold font-heading text-primary tracking-tight">The Clinical Editorial</h1>
        <nav className="hidden md:flex items-center gap-8">
          <a href="#" className="text-sm font-semibold text-foreground border-b-2 border-primary pb-0.5">Trang chủ</a>
          <a href="#services" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Dịch vụ</a>
          <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Giá cả</a>
        </nav>
        <Button onClick={() => navigate("/app")} className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-lg text-sm">
          Đặt lịch chăm sóc
        </Button>
      </header>

      {/* Hero Section */}
      <section className="px-8 lg:px-16 py-16 lg:py-24">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-block bg-success/10 text-success text-xs font-semibold px-4 py-1.5 rounded-full mb-6 tracking-wider uppercase">
              Aura Health · Kỷ nguyên y tế mới
            </div>
            <h2 className="text-4xl lg:text-6xl font-heading font-black text-foreground leading-[1.1] mb-6">
              Chăm sóc cha mẹ<br />
              <span className="text-accent">từ bất cứ đâu.</span>
            </h2>
            <p className="text-muted-foreground text-lg mb-8 max-w-md leading-relaxed">
              Giải pháp y tế thông minh dành cho người bận rộn. Theo dõi sức khỏe thời gian thực và kết nối bác sĩ tận tâm cho người thân yêu của bạn.
            </p>
            <div className="flex gap-4">
              <Button onClick={() => navigate("/app")} className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-6 py-3 h-auto text-sm font-semibold">
                Đặt lịch ngay
              </Button>
              <Button variant="outline" className="rounded-full px-6 py-3 h-auto text-sm font-semibold border-border text-foreground hover:bg-muted">
                Xem cách hoạt động
              </Button>
            </div>
          </div>

          <div className="relative">
            <img
              src={heroCare}
              alt="Chăm sóc người cao tuổi"
              className="rounded-2xl w-full object-cover shadow-xl"
              width={800}
              height={640}
            />
            {/* Vitals Card Overlay */}
            <div className="absolute bottom-6 left-6 right-6 bg-card/90 backdrop-blur-md rounded-xl px-5 py-4 shadow-lg border border-border flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wider">Chỉ số sinh tồn</p>
                <p className="text-3xl font-bold text-foreground">98 <span className="text-sm font-normal text-muted-foreground">bpm</span></p>
              </div>
              <span className="bg-success/10 text-success text-xs font-semibold px-4 py-1.5 rounded-full">Trạng thái: Ổn định</span>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="px-8 lg:px-16 py-16 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-heading font-bold text-foreground mb-3">Dịch vụ chăm sóc 5 sao</h2>
            <p className="text-muted-foreground">Kết hợp giữa công nghệ AI tiên tiến và sự thấu cảm trong y đức.</p>
          </div>

          {/* Services Grid — matching design layout */}
          <div className="grid lg:grid-cols-3 gap-6 mb-6">
            {/* AI Prescription Scanner */}
            <div className="bg-card rounded-2xl border border-border p-6 flex flex-col justify-end min-h-[280px]">
              <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                <ScanLine size={20} className="text-accent" />
              </div>
              <h3 className="text-lg font-bold font-body text-foreground mb-2">Quét đơn thuốc AI</h3>
              <p className="text-sm text-muted-foreground">Công nghệ nhận diện văn bản giúp chuyển đổi đơn thuốc viết tay thành lời nhắc uống thuốc thông minh trên điện thoại.</p>
            </div>

            {/* Center image */}
            <div className="rounded-2xl overflow-hidden min-h-[280px]">
              <img src={serviceScanner} alt="Medical technology" className="w-full h-full object-cover" loading="lazy" width={640} height={512} />
            </div>

            {/* 24/7 Monitoring */}
            <div className="bg-primary rounded-2xl p-6 flex flex-col justify-end min-h-[280px] text-primary-foreground">
              <div className="w-10 h-10 rounded-lg bg-primary-foreground/20 flex items-center justify-center mb-4">
                <Monitor size={20} className="text-primary-foreground" />
              </div>
              <h3 className="text-lg font-bold font-body mb-2">Giám sát 24/7</h3>
              <p className="text-sm opacity-80">Theo dõi nhịp tim, giấc ngủ và cảnh báo té ngã ngay lập tức qua ứng dụng của bạn.</p>
              <div className="flex items-center gap-1 mt-4">
                <div className="w-8 h-8 rounded-full bg-primary-foreground/30 border-2 border-primary" />
                <div className="w-8 h-8 rounded-full bg-primary-foreground/30 border-2 border-primary -ml-2" />
                <div className="w-8 h-8 rounded-full bg-primary-foreground/20 border-2 border-primary -ml-2 flex items-center justify-center text-[10px] font-bold">+12</div>
              </div>
              <p className="text-xs mt-2 opacity-70">Đội ngũ y sĩ luôn sẵn sàng</p>
            </div>
          </div>

          <div className="grid lg:grid-cols-5 gap-6">
            {/* Home Care */}
            <div className="lg:col-span-2 bg-primary rounded-2xl p-6 min-h-[200px] flex flex-col justify-end text-primary-foreground">
              <div className="w-10 h-10 rounded-lg bg-primary-foreground/20 flex items-center justify-center mb-4">
                <Home size={20} className="text-primary-foreground" />
              </div>
              <h3 className="text-lg font-bold font-body mb-2">Chăm sóc tại nhà</h3>
              <p className="text-sm opacity-80 mb-4">Đặt lịch điều dưỡng tới tận nhà để thay băng, tiêm thuốc hoặc hỗ trợ sinh hoạt.</p>
              <button className="flex items-center gap-1 text-sm font-semibold opacity-90 hover:opacity-100 transition-opacity w-fit">
                Khám phá ngay <ArrowRight size={14} />
              </button>
            </div>

            {/* Personalized Nutrition */}
            <div className="lg:col-span-3 bg-brand-warm rounded-2xl p-6 min-h-[200px] flex flex-col justify-end text-brand-warm-foreground">
              <div className="w-10 h-10 rounded-lg bg-brand-warm-foreground/20 flex items-center justify-center mb-4">
                <Utensils size={20} className="text-brand-warm-foreground" />
              </div>
              <h3 className="text-lg font-bold font-body mb-2">Dinh dưỡng cá nhân hóa</h3>
              <p className="text-sm opacity-80">Thực đơn được thiết kế bởi chuyên gia dinh dưỡng dựa trên bệnh lý và khẩu vị của người cao tuổi.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-8 lg:px-16 py-16">
        <div className="max-w-7xl mx-auto bg-brand-warm rounded-3xl p-10 lg:p-16 grid lg:grid-cols-2 gap-10 items-center">
          <div className="text-brand-warm-foreground">
            <h2 className="text-3xl lg:text-4xl font-heading font-black leading-tight mb-4">
              Yên tâm làm việc,<br />Aura sẽ lo phần còn lại.
            </h2>
            <p className="text-sm opacity-80 mb-8 max-w-md leading-relaxed">
              Hệ thống thông báo thông minh tự động nhận diện các bất thường và liên hệ ngay với bạn hoặc đội cứu thương trong trường hợp khẩn cấp.
            </p>
            <Button
              variant="outline"
              onClick={() => navigate("/app")}
              className="rounded-full px-6 py-3 h-auto text-sm font-semibold border-brand-warm-foreground/40 text-brand-warm-foreground hover:bg-brand-warm-foreground/10 bg-transparent"
            >
              Dùng thử miễn phí
            </Button>
          </div>

          <div className="bg-foreground/10 backdrop-blur-sm rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-full bg-destructive flex items-center justify-center">
                <AlertCircle size={18} className="text-destructive-foreground" />
              </div>
              <div className="text-brand-warm-foreground">
                <p className="font-semibold text-sm">Cảnh báo khẩn cấp</p>
                <p className="text-xs opacity-70">Vừa xảy ra lúc 10:24 AM</p>
              </div>
            </div>
            <p className="text-sm text-brand-warm-foreground/80 italic">
              "Phát hiện nhịp tim của Mẹ không ổn định. Điều dưỡng đang trên đường tới hỗ trợ. Vui lòng kiểm tra ứng dụng."
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-8 lg:px-16 py-8 border-t border-border">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="font-heading font-bold text-foreground text-lg">Aura Health</h3>
            <p className="text-xs text-muted-foreground">© 2024 THE CLINICAL EDITORIAL. ALL RIGHTS RESERVED.</p>
          </div>
          <div className="flex gap-6 text-xs text-muted-foreground">
            <a href="#" className="hover:text-foreground transition-colors">QUYỀN RIÊNG TƯ</a>
            <a href="#" className="hover:text-foreground transition-colors">ĐIỀU KHOẢN</a>
            <a href="#" className="hover:text-foreground transition-colors">LIÊN HỆ</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
