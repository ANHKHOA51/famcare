import React from 'react';
import PublicNavbar from "@/components/PublicNavbar";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background">
      <PublicNavbar />

      <main className="container mx-auto px-4 py-16 max-w-4xl">
        <h1 className="text-4xl font-bold mb-4 text-center">Liên hệ với hệ thống</h1>
        <p className="text-muted-foreground mb-12 text-center text-lg">Chúng tôi luôn sẵn sàng hỗ trợ, trao đổi đối tác và cải thiện dịch vụ của bạn.</p>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Thông tin liên hệ chung */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold mb-4">Gặp gỡ bộ phận hỗ trợ</h2>
              <p className="text-muted-foreground">Vui lòng gọi điện/email hoặc nhắn tin trên tổng đài trực tuyến 24h đối với việc mở truy cập ứng dụng y tế. Các báo cáo lỗi về Ứng dụng/AI vui lòng sử dụng Form bên cạnh.</p>
              
              <ul className="space-y-3">
                <li className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">📧</div>
                  <span>support@hev-ecosystem.com</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">📞</div>
                  <span>+84 901 234 567 (Tổng đài 24/7)</span>
                </li>
                <li className="flex  gap-3 mt-1">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">🏢</div>
                  <span>CÔNG TY CỔ PHẦN CÔNG NGHỆ CHĂM SÓC SỨC KHỎE.<br/>Tầng 19, Tòa nhà Vincom Center, Quận 1, TP Hồ Chí Minh.</span>
                </li>
              </ul>
            </div>

             <div className="space-y-4 pt-6 border-t">
              <h2 className="text-2xl font-semibold mb-4">Đối tác & Phòng khám</h2>
              <p className="text-muted-foreground">Hệ thống của chúng tôi hiện đang liên kết và xây dựng quy trình quảng cáo và làm việc cùng rất nhiều nhà tài trợ và phòng khám khu vực: Bệnh viện XYZ, Bệnh viện ABCD TPHCM.</p>
              <button className="px-6 py-2 border border-primary text-primary hover:bg-primary/5 rounded-md font-medium transition-colors">
                Trở thành đối tác
              </button>
            </div>
          </div>

          {/* Biểu mẫu liên hệ */}
          <form className="bg-white p-8 rounded-xl border shadow-sm space-y-6" onSubmit={(e) => { e.preventDefault(); alert("Form Submitted (Demo)"); }}>
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-2">Họ và tên</label>
              <input type="text" id="name" className="w-full px-3 py-2 border rounded-md focus:ring-primary focus:border-primary" placeholder="Tên của bạn" required />
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2">Email</label>
              <input type="email" id="email" className="w-full px-3 py-2 border rounded-md focus:ring-primary focus:border-primary" placeholder="email@domain.com" required />
            </div>

            <div>
              <label htmlFor="subject" className="block text-sm font-medium mb-2">Chủ đề</label>
              <select id="subject" className="w-full px-3 py-2 border rounded-md focus:ring-primary focus:border-primary">
                <option>Báo lỗi ứng dụng Quét ảnh (Scanner)</option>
                <option>Hỗ trợ tài khoản/Gia đình</option>
                <option>Hợp tác / Quảng cáo hệ thống</option>
                <option>Khác</option>
              </select>
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium mb-2">Nội dung</label>
              <textarea id="message" rows={4} className="w-full px-3 py-2 border rounded-md focus:ring-primary focus:border-primary" placeholder="Mô tả chi tiết vấn đề..." required></textarea>
            </div>

            <button type="submit" className="w-full px-4 py-3 bg-primary text-primary-foreground font-medium rounded-md hover:bg-primary/90 transition-colors">
              Gửi yêu cầu
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}