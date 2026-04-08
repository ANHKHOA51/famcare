import React from 'react';
import PublicNavbar from "@/components/PublicNavbar";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <PublicNavbar />

      <main className="container mx-auto px-4 py-16 max-w-4xl">
        <h1 className="text-4xl font-bold mb-8 text-center">Về chúng tôi</h1>
        
        <div className="space-y-12">
          <section>
            <h2 className="text-2xl font-semibold mb-4">Tầm nhìn</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Trở thành hệ sinh thái y tế số hàng đầu, nơi mọi người có thể quản lý sức khỏe cá nhân và gia đình một cách trực quan, khoa học và hoàn toàn liền mạch. 
              Mang y tế và sự chăm sóc tận tâm đến từng hộ gia đình thông qua công nghệ AI và trợ lý ảo thông minh.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Sứ mệnh</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Cung cấp các công cụ y tế ứng dụng trí tuệ nhân tạo như Quét đơn thuốc, Tủ thuốc gia đình và Trợ lý dinh dưỡng để giúp mọi người phòng ngừa rủi ro sức khỏe, nhắc nhở dùng thuốc và kiểm tra tính tương tác của các thành phần y tế trong sinh hoạt hàng ngày.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Lịch sử & Kiểm định</h2>
            <div className="p-6 bg-muted rounded-xl">
              <p className="mb-4">Hệ thống của chúng tôi được phát triển bởi đội ngũ kỹ sư và bác sĩ chuyên gia từ năm 2024. Với hàng trăm ngàn lượt quét đơn thuốc mỗi ngày, chúng tôi tự tin với độ chính xác và bảo mật thông tin.</p>
              <p>Mọi dữ liệu thuốc và cảnh báo đều được đối chiếu chéo qua các cơ sở dữ liệu y tế uy tín và được kiểm định khắt khe trước khi đến tay người sử dụng.</p>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}