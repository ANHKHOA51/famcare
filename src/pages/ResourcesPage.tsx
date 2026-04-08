import React from 'react';
import { Link } from 'react-router-dom';
import PublicNavbar from "@/components/PublicNavbar";

export default function ResourcesPage() {
  return (
    <div className="min-h-screen bg-background">
      <PublicNavbar />

      <main className="container mx-auto px-4 py-16 max-w-4xl">
        <h1 className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Trung tâm tài liệu & Hỗ trợ</h1>
        
        <div className="space-y-12">
          <section>
            <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">Câu hỏi thường gặp (FAQs)</h2>
            <div className="space-y-4">
              <div className="p-4 border rounded-lg">
                <h3 className="font-medium text-lg mb-2">Trình quét đơn thuốc AI hoạt động ra sao?</h3>
                <p className="text-muted-foreground">Bạn chỉ cần chụp hoặc tải ảnh đơn thuốc của mình lên máy. Hệ thống sử dụng công nghệ xử lý ngôn ngữ tự nhiên và hình ảnh (OCR) để lọc ra tên thuốc, chỉ định và tạo lịch nhắc uống thuốc tự động.</p>
              </div>
              <div className="p-4 border rounded-lg">
                <h3 className="font-medium text-lg mb-2">Làm sao để thêm giấy khám của người thân?</h3>
                <p className="text-muted-foreground">Sau khi đăng nhập, tại mục "Hồ sơ cá nhân", hãy chuyển sang tab "Gia đình" để thiết lập mã liên kết với ứng dụng hoặc tự tạo hồ sơ cho người thân chưa có tài khoản.</p>
              </div>
              <div className="p-4 border rounded-lg">
                <h3 className="font-medium text-lg mb-2">Dữ liệu sức khỏe của tôi có an toàn không?</h3>
                <p className="text-muted-foreground">Dữ liệu của bạn được mã hóa hoàn toàn trước khi lưu xuống Cơ sở dữ liệu và chỉ được giải mã để phân tích trên thiết bị của chính bạn và cung cấp kiến thức tốt nhất.</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-6">Blog Y khoa & Kiến thức</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="p-5 border rounded-lg flex flex-col gap-3">
                <div className="bg-muted w-full h-32 rounded-md"></div>
                <h3 className="font-medium text-lg">Cách phòng tránh dị ứng thức ăn cho bệnh nhân mãn tính</h3>
                <span className="text-sm text-muted-foreground text-primary cursor-pointer hover:underline">Đọc tiếp →</span>
              </div>
              <div className="p-5 border rounded-lg flex flex-col gap-3">
                <div className="bg-muted w-full h-32 rounded-md"></div>
                <h3 className="font-medium text-lg">Khi nào cần đặt lịch khám với chuyên gia tiêu hóa?</h3>
                <span className="text-sm text-muted-foreground text-primary cursor-pointer hover:underline">Đọc tiếp →</span>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Hướng dẫn sử dụng & Hỗ trợ</h2>
            <div className="p-6 bg-primary/10 rounded-xl flex items-center justify-between">
              <div>
                <p className="font-medium mb-1">Cần hỗ trợ trực tiếp?</p>
                <p className="text-sm text-muted-foreground">Nhóm nhân viên hỗ trợ ứng dụng hoạt động 24/7 để giải đáp thắc mắc liên quan tới cách định cấu hình tủ thuốc hoặc lỗi ứng dụng.</p>
              </div>
              <Link to="/contact" className="px-4 py-2 bg-primary text-white rounded-md whitespace-nowrap">Liên hệ hỗ trợ</Link>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}