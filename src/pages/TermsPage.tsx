import React from 'react';
import PublicNavbar from "@/components/PublicNavbar";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-background">
      <PublicNavbar />

      <main className="container mx-auto px-4 py-16 max-w-4xl">
        <h1 className="text-4xl font-bold mb-4">Điều khoản & Quyền riêng tư</h1>
        <p className="text-muted-foreground mb-8">Lần cập nhật cuối: 07 Tháng 04, 2026</p>
        
        <div className="prose prose-slate max-w-none space-y-8">
          <section>
            <h2 className="text-2xl font-semibold mb-4">1. Điều khoản sử dụng</h2>
            <p className="leading-relaxed">
              Bằng cách truy cập và sử dụng dịch vụ Hệ sinh thái Y tế (Dịch vụ), quý khách đồng ý bị ràng buộc bởi các điều khoản được trình bày tại đây. 
              Tài khoản cần có thông tin đầy đủ, chính xác phục vụ cho các chức năng kiểm định sức khỏe do Trí Tuệ Nhân Tạo (AI) của chúng tôi chịu trách nhiệm.
              Người dùng phải theo dõi cẩn thận và báo báo sự sai sót liên quan tới dữ liệu y tế nếu gặp phải.
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-4">
              <li>Bạn phải đạt độ tuổi hợp pháp để thực hiện các quyết định y khoa (trên 18 tuổi).</li>
              <li>Chịu trách nhiệm bảo vệ thông tin tài khoản và mật khẩu của bản thân.</li>
              <li>Khuyến cáo tham khảo bác sĩ chuyên môn khi áp dụng đơn thuốc và lịch nhắc uống được tạo.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">2. Điều khoản về thông tin cá nhân</h2>
            <p className="leading-relaxed">
              Dịch vụ thu thập thông tin Dữ liệu y tế bao gồm chiều cao, cân nặng, mã nhóm máu, triệu chứng lâm sàng và các tiền sử dị ứng, tiền sử mang bệnh định kỳ theo cấu trúc Hồ Sơ Y Tế (Profile).
              Các kết quả Quét Món Ăn (Scanner) và Tủ Thuốc (Cabinet) hoàn toàn liên kết mật thiết tới mã tài khoản riêng, bảo vệ quyền riêng tư qua công cụ Token JWT.
            </p>
            <p className="leading-relaxed">Chúng tôi cam kết không bán dữ liệu người dùng cho bên thứ ba, và tuân thủ các điều luật quản trị và bảo mật y tế hiện hành tại khu vực cung cấp dịch vụ.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">3. Miễn trừ trách nhiệm (Disclaimer)</h2>
            <div className="p-6 bg-red-50 text-red-900 border border-red-100 rounded-lg">
              <h3 className="font-bold mb-2">Thông tin y khoa tự động</h3>
              <p className="text-sm">Trí tuệ nhân tạo (AI) cung cấp tính năng Quét đơn thuốc, phân tích và cung cấp nhắc nhở Gợi ý Dinh dưỡng (Meal Plans). Kết quả đưa ra KHÔNG PHẢI VÀ KHÔNG THAY THẾ là Lời khuyên chuẩn đoán y khoa chính thức, không được dùng để thay thế ý kiến chuyên môn của bác sĩ vật lý được cấp phép trong các tình huống cấp cứu hay điều trị mãn tính.</p>
              <p className="text-sm mt-2">Dịch vụ chúng tôi không chịu hình phạt hay nghĩa vụ về hậu quả phát sinh do việc người dùng lạm dụng lời khuyên từ Trợ lý Dinh Dưỡng mà bỏ quả bác sĩ thực.</p>
            </div>
          </section>

        </div>
      </main>
    </div>
  );
}