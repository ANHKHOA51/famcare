import { Link } from "react-router-dom";
import { Phone, MapPin, Mail, HeartPulse } from "lucide-react";

export default function PublicFooter() {
  return (
    <footer className="bg-slate-900 text-slate-300">
      {/* Main footer content */}
      <div className="px-8 lg:px-16 py-16 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center p-1.5">
                <img src="/logo.png" alt="FamCare Logo" className="w-full h-full object-contain" />
              </div>
              <h3 className="font-display font-bold text-white text-xl">FamCare</h3>
            </div>
            <p className="text-[0.8125rem] text-slate-400 leading-relaxed">
              Giải pháp chăm sóc sức khỏe gia đình thông minh — mọi lúc, mọi nơi.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-white text-sm uppercase tracking-wider mb-5">Liên kết</h4>
            <ul className="space-y-3 text-[0.8125rem]">
              <li><Link to="/about" className="hover:text-white transition-colors">Về chúng tôi</Link></li>
              <li><Link to="/about" className="hover:text-white transition-colors">Điều khoản sử dụng</Link></li>
              <li><Link to="/about" className="hover:text-white transition-colors">Chính sách bảo mật</Link></li>
              <li><Link to="/about" className="hover:text-white transition-colors">Cookie</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-bold text-white text-sm uppercase tracking-wider mb-5">Dịch vụ</h4>
            <ul className="space-y-3 text-[0.8125rem]">
              <li className="hover:text-white transition-colors cursor-default">Quét đơn thuốc AI</li>
              <li className="hover:text-white transition-colors cursor-default">Tủ thuốc gia đình</li>
              <li className="hover:text-white transition-colors cursor-default">Tư vấn dinh dưỡng AI</li>
              <li className="hover:text-white transition-colors cursor-default">Đặt lịch khám bệnh</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold text-white text-sm uppercase tracking-wider mb-5">Liên hệ</h4>
            <ul className="space-y-4 text-[0.8125rem]">
              <li className="flex items-start gap-3">
                <Phone className="w-4 h-4 mt-0.5 text-[#0ea5e9] shrink-0" />
                <div>
                  <p className="text-slate-400 text-xs mb-0.5">Hotline hỗ trợ (24/7)</p>
                  <a href="tel:19001234" className="text-slate-200 font-semibold hover:text-white transition-colors text-base">1900 1234</a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="w-4 h-4 mt-0.5 text-[#0ea5e9] shrink-0" />
                <div>
                  <p className="text-slate-400 text-xs mb-0.5">Email</p>
                  <a href="mailto:famcare.support@gmail.com" className="text-slate-200 hover:text-white transition-colors break-all">famcare.support@gmail.com</a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 mt-0.5 text-[#0ea5e9] shrink-0" />
                <div>
                  <p className="text-slate-400 text-xs mb-0.5">Văn phòng chính</p>
                  <span className="text-slate-200">Thành phố Hồ Chí Minh</span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-slate-800 px-8 lg:px-16 py-6">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[0.75rem] text-slate-500">© 2026 FamCare. All rights reserved.</p>
          <p className="text-[0.75rem] text-slate-500">
            Được phát triển bởi nhóm sinh viên <span className="text-slate-400 font-medium">UEH·2026</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
