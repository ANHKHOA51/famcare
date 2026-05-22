import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import PublicNavbar from "@/components/PublicNavbar";
import PublicFooter from "@/components/PublicFooter";
import { Search, FileText, MessageSquare, ChevronRight, FileSearch, UserPlus, ShieldAlert, CreditCard, User, Calendar, Eye } from "lucide-react";

export default function ResourcesPage() {
  const [viewCounts, setViewCounts] = useState<Record<string, number>>({});

  useEffect(() => {
    fetch('/api/articles/views')
      .then(res => res.json())
      .then(data => setViewCounts(data))
      .catch(err => console.error("Failed to fetch views:", err));
  }, []);

  return (
    <div className="min-h-screen bg-[#fafafa]">
      <PublicNavbar />

      {/* Hero Section */}
      <section className="px-8 lg:px-16 py-16 bg-gradient-to-br from-cyan-50/50 to-white relative pb-20">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
          <div className="max-w-2xl">
            <div className="inline-block bg-[#cffafe] text-[#0891b2] text-[0.625rem] font-bold px-3 py-1 rounded-full mb-6 tracking-widest uppercase">
              Hỗ trợ & Hướng dẫn
            </div>
            <h1 className="text-4xl lg:text-5xl font-display font-bold text-[#0f172a] leading-[1.15] mb-4 tracking-tight">
              Trung tâm tài liệu <span className="text-[#0891b2]">&</span> Hỗ trợ
            </h1>
            <p className="text-slate-500 text-[1rem] leading-relaxed">
              Khám phá hướng dẫn chi tiết, câu hỏi thường gặp và kiến thức y khoa chuyên sâu để chăm sóc sức khỏe gia đình bạn một cách trọn vẹn nhất.
            </p>
          </div>
          <div className="flex gap-4">
            <button className="flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 px-5 py-2.5 rounded-lg text-sm font-semibold transition-colors">
              <FileText size={18} />
              Tài liệu PDF
            </button>
            <button className="flex items-center gap-2 bg-[#0f172a] hover:bg-slate-800 text-white px-5 py-2.5 rounded-lg text-sm font-semibold transition-colors">
              <MessageSquare size={18} />
              Chat hỗ trợ
            </button>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="px-8 lg:px-16 py-12 -mt-10 relative z-10">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-12">
          
          {/* Left Column (Main) */}
          <div className="lg:col-span-8 flex flex-col gap-16">
            
            {/* FAQ Section */}
            <div>
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold font-display text-slate-800">Câu hỏi phổ biến</h2>
                <button className="text-sm font-semibold text-teal-600 flex items-center hover:underline">
                  Xem tất cả <ChevronRight size={16} />
                </button>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {/* Card 1 */}
                <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm transition-shadow hover:shadow-md">
                  <div className="flex gap-4 items-start">
                    <div className="w-10 h-10 shrink-0 rounded-xl bg-cyan-50 flex items-center justify-center">
                      <FileSearch size={20} className="text-cyan-600" />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-800 mb-2">Trình quét AI hoạt động ra sao?</h3>
                      <p className="text-[0.8125rem] text-slate-500 mb-3 leading-relaxed">
                        Hệ thống nhận diện chữ viết tay và tên thuốc, đối chiếu với cơ sở dữ liệu y khoa để đưa ra cảnh báo liều dùng.
                      </p>
                      <button className="text-[0.75rem] font-bold text-teal-600 flex items-center hover:underline">
                        Tìm hiểu thêm <ChevronRight size={14} />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Card 2 */}
                <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm transition-shadow hover:shadow-md">
                  <div className="flex gap-4 items-start">
                    <div className="w-10 h-10 shrink-0 rounded-xl bg-slate-50 flex items-center justify-center">
                      <UserPlus size={20} className="text-slate-600" />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-800 mb-2">Thêm giấy khám người thân?</h3>
                      <p className="text-[0.8125rem] text-slate-500 mb-3 leading-relaxed">
                        Tại mục "Thành viên", chọn hồ sơ và nhấn "Tải lên hồ sơ". Chụp ảnh trực tiếp hoặc chọn file từ thư viện.
                      </p>
                      <button className="text-[0.75rem] font-bold text-teal-600 flex items-center hover:underline">
                        Xem hướng dẫn <ChevronRight size={14} />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Card 3 */}
                <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm transition-shadow hover:shadow-md">
                  <div className="flex gap-4 items-start">
                    <div className="w-10 h-10 shrink-0 rounded-xl bg-red-50 flex items-center justify-center">
                      <ShieldAlert size={20} className="text-red-500" />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-800 mb-2">Dữ liệu có an toàn không?</h3>
                      <p className="text-[0.8125rem] text-slate-500 mb-3 leading-relaxed">
                        Chúng tôi áp dụng mã hóa đầu cuối và tuân thủ tiêu chuẩn HIPAA quốc tế để đảm bảo thông tin tuyệt mật.
                      </p>
                      <button className="text-[0.75rem] font-bold text-teal-600 flex items-center hover:underline">
                        Chính sách bảo mật <ChevronRight size={14} />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Card 4 */}
                <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm transition-shadow hover:shadow-md">
                  <div className="flex gap-4 items-start">
                    <div className="w-10 h-10 shrink-0 rounded-xl bg-neutral-100 flex items-center justify-center">
                      <CreditCard size={20} className="text-neutral-600" />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-800 mb-2">Chi phí sử dụng Premium?</h3>
                      <p className="text-[0.8125rem] text-slate-500 mb-3 leading-relaxed">
                        FamCare cung cấp gói miễn phí trọn đời. Gói Premium mở rộng bộ nhớ và hỗ trợ bác sĩ tư vấn 24/7.
                      </p>
                      <button className="text-[0.75rem] font-bold text-teal-600 flex items-center hover:underline">
                        Xem bảng giá <ChevronRight size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Medical Knowledge */}
            <div className="w-full relative">
              <div className="flex justify-between items-end mb-8">
                <h2 className="text-2xl font-bold font-display text-slate-800">Kiến thức Y khoa</h2>
                <div className="hidden sm:flex gap-2">
                  <span className="text-xs text-slate-400 font-medium italic">Vuốt để xem thêm &rarr;</span>
                </div>
              </div>
              
              <div className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-6 -mx-4 px-4 sm:mx-0 sm:px-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
                
                {/* Article 4 (Mới nhất) */}
                <Link to="/resources/quen-uong-thuoc-va-cach-xu-ly" className="w-[85vw] sm:w-[320px] shrink-0 snap-start bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm transition-all hover:shadow-md group cursor-pointer block">
                  <div className="h-48 overflow-hidden relative">
                    <img 
                      src="/bai-4/hinh1.jpg" 
                      alt="Quên uống thuốc thì có sao không?" 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-rose-100 text-rose-700 text-[0.625rem] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider shadow-sm">Mới nhất</span>
                    </div>
                  </div>
                  <div className="p-6 flex flex-col h-[calc(100%-12rem)]">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="bg-sky-100 text-sky-700 text-[0.625rem] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">Kiến thức y khoa</span>
                      <span className="text-[0.6875rem] text-slate-400">05 Th05, 2026</span>
                      <div className="ml-auto flex items-center gap-1.5 text-slate-400">
                        <Eye size={14} className="text-slate-400" />
                        <span className="text-xs font-medium font-sans leading-none">{viewCounts['quen-uong-thuoc-va-cach-xu-ly'] || 0}</span>
                      </div>
                    </div>
                    <h3 className="font-bold text-lg text-slate-800 mb-3 group-hover:text-teal-600 transition-colors line-clamp-2">
                      Quên Uống Thuốc Thì Có Sao Không? Hướng Dẫn Xử Lý Đúng
                    </h3>
                    <p className="text-slate-500 text-sm leading-relaxed line-clamp-2 mt-auto">
                      Nên uống bù hay bỏ qua? Những loại thuốc nào bắt buộc phải dùng đúng giờ? Đọc ngay.
                    </p>
                  </div>
                </Link>

                {/* Article 1 */}
                <Link to="/resources/lua-chon-thuc-pham-dung-de-phat-huy-tac-dung-thuoc" className="w-[85vw] sm:w-[320px] shrink-0 snap-start bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm transition-all hover:shadow-md group cursor-pointer block">
                  <div className="h-48 overflow-hidden">
                    <img 
                      src="/bai-1/hinh1.jpg" 
                      alt="Lựa chọn thực phẩm đúng để phát huy tác dụng thuốc" 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-6 flex flex-col h-[calc(100%-12rem)]">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="bg-[#ccfbf1] text-teal-700 text-[0.625rem] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">Dinh dưỡng</span>
                      <span className="text-[0.6875rem] text-slate-400">01 Th05, 2026</span>
                      <div className="ml-auto flex items-center gap-1.5 text-slate-400">
                        <Eye size={14} className="text-slate-400" />
                        <span className="text-xs font-medium font-sans leading-none">{viewCounts['lua-chon-thuc-pham-dung-de-phat-huy-tac-dung-thuoc'] || 0}</span>
                      </div>
                    </div>
                    <h3 className="font-bold text-lg text-slate-800 mb-3 group-hover:text-teal-600 transition-colors line-clamp-2">
                      Lựa chọn thực phẩm đúng để phát huy tác dụng thuốc
                    </h3>
                    <p className="text-slate-500 text-sm leading-relaxed line-clamp-2 mt-auto">
                      Tương tác giữa thuốc với thực phẩm là kiến thức y khoa quan trọng, giúp điều trị hiệu quả và an toàn hơn.
                    </p>
                  </div>
                </Link>

                {/* Article 2 */}
                <Link to="/resources/cach-doc-don-thuoc-giay" className="w-[85vw] sm:w-[320px] shrink-0 snap-start bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm transition-all hover:shadow-md group cursor-pointer block">
                  <div className="h-48 overflow-hidden">
                    <img 
                      src="/bai-2/hinh1.jpg" 
                      alt="Cách Đọc Đơn Thuốc Giấy" 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-6 flex flex-col h-[calc(100%-12rem)]">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="bg-sky-100 text-sky-700 text-[0.625rem] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">Kiến thức y khoa</span>
                      <span className="text-[0.6875rem] text-slate-400">08 Th05, 2026</span>
                      <div className="ml-auto flex items-center gap-1.5 text-slate-400">
                        <Eye size={14} className="text-slate-400" />
                        <span className="text-xs font-medium font-sans leading-none">{viewCounts['cach-doc-don-thuoc-giay'] || 0}</span>
                      </div>
                    </div>
                    <h3 className="font-bold text-lg text-slate-800 mb-3 group-hover:text-teal-600 transition-colors line-clamp-2">
                      Cách Đọc Đơn Thuốc Giấy: 5 Sai Lầm Phổ Biến Và Cách Xử Lý
                    </h3>
                    <p className="text-slate-500 text-sm leading-relaxed line-clamp-2 mt-auto">
                      Việc đọc đơn thuốc giấy tiềm ẩn không ít rào cản. Bài viết chỉ ra 5 sai lầm thường gặp nhất và cách giải quyết.
                    </p>
                  </div>
                </Link>

                {/* Article 3 */}
                <Link to="/resources/he-sinh-thai-famcare" className="w-[85vw] sm:w-[320px] shrink-0 snap-start bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm transition-all hover:shadow-md group cursor-pointer block">
                  <div className="h-48 overflow-hidden">
                    <img 
                      src="/bai-3/hinh1.jpg" 
                      alt="Hệ Sinh Thái FamCare" 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-6 flex flex-col h-[calc(100%-12rem)]">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="bg-sky-100 text-sky-700 text-[0.625rem] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">Kiến thức y khoa</span>
                      <span className="text-[0.6875rem] text-slate-400">10 Th05, 2026</span>
                      <div className="ml-auto flex items-center gap-1.5 text-slate-400">
                        <Eye size={14} className="text-slate-400" />
                        <span className="text-xs font-medium font-sans leading-none">{viewCounts['he-sinh-thai-famcare'] || 0}</span>
                      </div>
                    </div>
                    <h3 className="font-bold text-lg text-slate-800 mb-3 group-hover:text-teal-600 transition-colors line-clamp-2">
                      Hệ Sinh Thái FamCare
                    </h3>
                    <p className="text-slate-500 text-sm leading-relaxed line-clamp-2 mt-auto">
                      Khám phá nền tảng y tế thông minh FamCare và cách nó giúp chăm sóc sức khỏe gia đình bạn.
                    </p>
                  </div>
                </Link>

                {/* Article 5 */}
                <Link to="/resources/uong-khang-sinh-voi-sua-co-nguy-hiem-khong" className="w-[85vw] sm:w-[320px] shrink-0 snap-start bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm transition-all hover:shadow-md group cursor-pointer block">
                  <div className="h-48 overflow-hidden">
                    <img 
                      src="/bai-5/hinh1.jpg" 
                      alt="Uống Kháng Sinh Với Sữa" 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-6 flex flex-col h-[calc(100%-12rem)]">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="bg-sky-100 text-sky-700 text-[0.625rem] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">Kiến thức y khoa</span>
                      <span className="text-[0.6875rem] text-slate-400">11 Th05, 2026</span>
                      <div className="ml-auto flex items-center gap-1.5 text-slate-400">
                        <Eye size={14} className="text-slate-400" />
                        <span className="text-xs font-medium font-sans leading-none">{viewCounts['uong-khang-sinh-voi-sua-co-nguy-hiem-khong'] || 0}</span>
                      </div>
                    </div>
                    <h3 className="font-bold text-lg text-slate-800 mb-3 group-hover:text-teal-600 transition-colors line-clamp-2">
                      Uống Kháng Sinh Với Sữa: Thói Quen Tiện Lợi Hay Nguy Cơ Gây Hại?
                    </h3>
                    <p className="text-slate-500 text-sm leading-relaxed line-clamp-2 mt-auto">
                      Uống kháng sinh với sữa tiềm ẩn rủi ro tương tác thuốc. Tìm hiểu sự thật để bảo vệ sức khỏe gia đình.
                    </p>
                  </div>
                </Link>

                {/* Article 6 */}
                <Link to="/resources/danh-muc-thuoc-thiet-yeu-cho-tu-thuoc-gia-dinh-2026" className="w-[85vw] sm:w-[320px] shrink-0 snap-start bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm transition-all hover:shadow-md group cursor-pointer block">
                  <div className="h-48 overflow-hidden">
                    <img 
                      src="/bai-6/hinh1.jpg" 
                      alt="Tủ Thuốc Gia Đình" 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-6 flex flex-col h-[calc(100%-12rem)]">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="bg-sky-100 text-sky-700 text-[0.625rem] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">Kiến thức y khoa</span>
                      <span className="text-[0.6875rem] text-slate-400">12 Th05, 2026</span>
                      <div className="ml-auto flex items-center gap-1.5 text-slate-400">
                        <Eye size={14} className="text-slate-400" />
                        <span className="text-xs font-medium font-sans leading-none">{viewCounts['danh-muc-thuoc-thiet-yeu-cho-tu-thuoc-gia-dinh-2026'] || 0}</span>
                      </div>
                    </div>
                    <h3 className="font-bold text-lg text-slate-800 mb-3 group-hover:text-teal-600 transition-colors line-clamp-2">
                      Tủ Thuốc Gia Đình Cần Có Gì? Danh Mục 2026
                    </h3>
                    <p className="text-slate-500 text-sm leading-relaxed line-clamp-2 mt-auto">
                      Khám phá danh mục thuốc thiết yếu cho tủ thuốc gia đình. Cập nhật các loại thuốc nên có sẵn.
                    </p>
                  </div>
                </Link>

                {/* Article 7 */}
                <Link to="/resources/3-dau-hieu-luu-tru-don-thuoc-sai-cach-va-giai-phap" className="w-[85vw] sm:w-[320px] shrink-0 snap-start bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm transition-all hover:shadow-md group cursor-pointer block">
                  <div className="h-48 overflow-hidden">
                    <img 
                      src="/bai-7/hinh1.jpg" 
                      alt="Lưu Trữ Đơn Thuốc" 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-6 flex flex-col h-[calc(100%-12rem)]">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="bg-sky-100 text-sky-700 text-[0.625rem] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">Kiến thức y khoa</span>
                      <span className="text-[0.6875rem] text-slate-400">13 Th05, 2026</span>
                      <div className="ml-auto flex items-center gap-1.5 text-slate-400">
                        <Eye size={14} className="text-slate-400" />
                        <span className="text-xs font-medium font-sans leading-none">{viewCounts['3-dau-hieu-luu-tru-don-thuoc-sai-cach-va-giai-phap'] || 0}</span>
                      </div>
                    </div>
                    <h3 className="font-bold text-lg text-slate-800 mb-3 group-hover:text-teal-600 transition-colors line-clamp-2">
                      3 Dấu Hiệu Lưu Trữ Đơn Thuốc Sai Cách
                    </h3>
                    <p className="text-slate-500 text-sm leading-relaxed line-clamp-2 mt-auto">
                      Nhận diện 3 dấu hiệu sai lầm phổ biến và giải pháp số hóa hồ sơ y tế từ FamCare.
                    </p>
                  </div>
                </Link>

                {/* Article 8 */}
                <Link to="/resources/mat-giay-kham-suc-khoe-va-ho-so-y-te" className="w-[85vw] sm:w-[320px] shrink-0 snap-start bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm transition-all hover:shadow-md group cursor-pointer block">
                  <div className="h-48 overflow-hidden">
                    <img 
                      src="/bai-8/hinh1.jpg" 
                      alt="Mất Hồ Sơ Y Tế" 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-6 flex flex-col h-[calc(100%-12rem)]">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="bg-sky-100 text-sky-700 text-[0.625rem] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">Kiến thức y khoa</span>
                      <span className="text-[0.6875rem] text-slate-400">14 Th05, 2026</span>
                      <div className="ml-auto flex items-center gap-1.5 text-slate-400">
                        <Eye size={14} className="text-slate-400" />
                        <span className="text-xs font-medium font-sans leading-none">{viewCounts['mat-giay-kham-suc-khoe-va-ho-so-y-te'] || 0}</span>
                      </div>
                    </div>
                    <h3 className="font-bold text-lg text-slate-800 mb-3 group-hover:text-teal-600 transition-colors line-clamp-2">
                      Mất Giấy Khám Sức Khỏe Thì Phải Làm Sao?
                    </h3>
                    <p className="text-slate-500 text-sm leading-relaxed line-clamp-2 mt-auto">
                      Giải pháp tìm lại hồ sơ y tế và cách xử lý khi mất tài liệu y tế quan trọng.
                    </p>
                  </div>
                </Link>

                {/* Article 9 */}
                <Link to="/resources/quan-ly-tu-thuoc-gia-dinh-an-toan" className="w-[85vw] sm:w-[320px] shrink-0 snap-start bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm transition-all hover:shadow-md group cursor-pointer block">
                  <div className="h-48 overflow-hidden">
                    <img 
                      src="/bai-9/hinh1.jfif" 
                      alt="Quản Lý Tủ Thuốc An Toàn" 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-6 flex flex-col h-[calc(100%-12rem)]">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="bg-sky-100 text-sky-700 text-[0.625rem] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">Kiến thức y khoa</span>
                      <span className="text-[0.6875rem] text-slate-400">09 Th05, 2026</span>
                      <div className="ml-auto flex items-center gap-1.5 text-slate-400">
                        <Eye size={14} className="text-slate-400" />
                        <span className="text-xs font-medium font-sans leading-none">{viewCounts['quan-ly-tu-thuoc-gia-dinh-an-toan'] || 0}</span>
                      </div>
                    </div>
                    <h3 className="font-bold text-lg text-slate-800 mb-3 group-hover:text-teal-600 transition-colors line-clamp-2">
                      Nguy Hiểm Dùng Nhầm Thuốc: Quản Lý Tủ Thuốc An Toàn
                    </h3>
                    <p className="text-slate-500 text-sm leading-relaxed line-clamp-2 mt-auto">
                      Bí quyết quản lý tủ thuốc thông minh và phân loại thuốc riêng biệt cho từng thành viên.
                    </p>
                  </div>
                </Link>

                {/* Article 10 */}
                <Link to="/resources/co-nen-uong-thuoc-bang-nuoc-tra" className="w-[85vw] sm:w-[320px] shrink-0 snap-start bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm transition-all hover:shadow-md group cursor-pointer block">
                  <div className="h-48 overflow-hidden">
                    <img 
                      src="/bai-10/hinh1.jpg" 
                      alt="Uống Thuốc Bằng Nước Trà" 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-6 flex flex-col h-[calc(100%-12rem)]">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="bg-sky-100 text-sky-700 text-[0.625rem] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">Kiến thức y khoa</span>
                      <span className="text-[0.6875rem] text-slate-400">07 Th05, 2026</span>
                      <div className="ml-auto flex items-center gap-1.5 text-slate-400">
                        <Eye size={14} className="text-slate-400" />
                        <span className="text-xs font-medium font-sans leading-none">{viewCounts['co-nen-uong-thuoc-bang-nuoc-tra'] || 0}</span>
                      </div>
                    </div>
                    <h3 className="font-bold text-lg text-slate-800 mb-3 group-hover:text-teal-600 transition-colors line-clamp-2">
                      Có Nên Uống Thuốc Bằng Nước Trà?
                    </h3>
                    <p className="text-slate-500 text-sm leading-relaxed line-clamp-2 mt-auto">
                      Những tương tác thuốc cần tránh để bảo vệ sức khỏe và hiệu quả điều trị của bạn.
                    </p>
                  </div>
                </Link>

                {/* Article 11 */}
                <Link to="/resources/quen-ten-thuoc-cu-ai-famcare" className="w-[85vw] sm:w-[320px] shrink-0 snap-start bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm transition-all hover:shadow-md group cursor-pointer block">
                  <div className="h-48 overflow-hidden">
                    <img 
                      src="/bai-11/hinh1.jpg" 
                      alt="Quên tên thuốc cũ? Cách tra cứu dược phẩm" 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-6 flex flex-col h-[calc(100%-12rem)]">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="bg-cyan-100 text-cyan-700 text-[0.625rem] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">AI & Y tế</span>
                      <span className="text-[0.6875rem] text-slate-400">22 Th05, 2026</span>
                      <div className="ml-auto flex items-center gap-1.5 text-slate-400">
                        <Eye size={14} className="text-slate-400" />
                        <span className="text-xs font-medium font-sans leading-none">{viewCounts['quen-ten-thuoc-cu-ai-famcare'] || 0}</span>
                      </div>
                    </div>
                    <h3 className="font-bold text-lg text-slate-800 mb-3 group-hover:text-teal-600 transition-colors line-clamp-2">
                      Quên Tên Thuốc Cũ? Tra Cứu Theo Triệu Chứng
                    </h3>
                    <p className="text-slate-500 text-sm leading-relaxed line-clamp-2 mt-auto">
                      Khám phá cách tra cứu dược phẩm nhanh chóng bằng AI FamCare.
                    </p>
                  </div>
                </Link>

                {/* Article 12 */}
                <Link to="/resources/theo-doi-chi-so-bmi-dung-cach" className="w-[85vw] sm:w-[320px] shrink-0 snap-start bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm transition-all hover:shadow-md group cursor-pointer block">
                  <div className="h-48 overflow-hidden">
                    <img 
                      src="/bai-12/hinh1.jpg" 
                      alt="Chỉ số BMI" 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-6 flex flex-col h-[calc(100%-12rem)]">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="bg-emerald-100 text-emerald-700 text-[0.625rem] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">Sức khỏe</span>
                      <span className="text-[0.6875rem] text-slate-400">22 Th05, 2026</span>
                      <div className="ml-auto flex items-center gap-1.5 text-slate-400">
                        <Eye size={14} className="text-slate-400" />
                        <span className="text-xs font-medium font-sans leading-none">{viewCounts['theo-doi-chi-so-bmi-dung-cach'] || 0}</span>
                      </div>
                    </div>
                    <h3 className="font-bold text-lg text-slate-800 mb-3 group-hover:text-teal-600 transition-colors line-clamp-2">
                      Chỉ Số BMI Là Gì? Cách Tính Chuẩn
                    </h3>
                    <p className="text-slate-500 text-sm leading-relaxed line-clamp-2 mt-auto">
                      Hướng dẫn tính BMI chính xác và theo dõi sức khỏe.
                    </p>
                  </div>
                </Link>

                {/* Article 13 */}
                <Link to="/resources/thuc-pham-nguoi-benh-tieu-duong-nen-tranh-va-che-do-an" className="w-[85vw] sm:w-[320px] shrink-0 snap-start bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm transition-all hover:shadow-md group cursor-pointer block">
                  <div className="h-48 overflow-hidden">
                    <img 
                      src="/bai-13/hinh1.jpeg" 
                      alt="Thực phẩm người tiểu đường" 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-6 flex flex-col h-[calc(100%-12rem)]">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="bg-orange-100 text-orange-700 text-[0.625rem] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">Dinh dưỡng</span>
                      <span className="text-[0.6875rem] text-slate-400">22 Th05, 2026</span>
                      <div className="ml-auto flex items-center gap-1.5 text-slate-400">
                        <Eye size={14} className="text-slate-400" />
                        <span className="text-xs font-medium font-sans leading-none">{viewCounts['thuc-pham-nguoi-benh-tieu-duong-nen-tranh-va-che-do-an'] || 0}</span>
                      </div>
                    </div>
                    <h3 className="font-bold text-lg text-slate-800 mb-3 group-hover:text-teal-600 transition-colors line-clamp-2">
                      Thực Phẩm Tiểu Đường Nên Tránh
                    </h3>
                    <p className="text-slate-500 text-sm leading-relaxed line-clamp-2 mt-auto">
                      Danh mục thực phẩm để ổn định đường huyết hiệu quả.
                    </p>
                  </div>
                </Link>

                {/* Article 14 */}
                <Link to="/resources/quet-don-thuoc-ai-so-hoa-ho-so" className="w-[85vw] sm:w-[320px] shrink-0 snap-start bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm transition-all hover:shadow-md group cursor-pointer block">
                  <div className="h-48 overflow-hidden">
                    <img 
                      src="/bai-14/hinh1.jpg" 
                      alt="Quét đơn thuốc bằng AI" 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-6 flex flex-col h-[calc(100%-12rem)]">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="bg-blue-100 text-blue-700 text-[0.625rem] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">Công nghệ</span>
                      <span className="text-[0.6875rem] text-slate-400">22 Th05, 2026</span>
                      <div className="ml-auto flex items-center gap-1.5 text-slate-400">
                        <Eye size={14} className="text-slate-400" />
                        <span className="text-xs font-medium font-sans leading-none">{viewCounts['quet-don-thuoc-ai-so-hoa-ho-so'] || 0}</span>
                      </div>
                    </div>
                    <h3 className="font-bold text-lg text-slate-800 mb-3 group-hover:text-teal-600 transition-colors line-clamp-2">
                      Quét Đơn Thuốc Bằng AI: Số Hóa Hồ Sơ
                    </h3>
                    <p className="text-slate-500 text-sm leading-relaxed line-clamp-2 mt-auto">
                      Giải pháp số hóa hồ sơ y tế thông minh và nhanh chóng.
                    </p>
                  </div>
                </Link>

                {/* Article 15 */}
                <Link to="/resources/dat-lich-kham-truc-tuyen-online" className="w-[85vw] sm:w-[320px] shrink-0 snap-start bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm transition-all hover:shadow-md group cursor-pointer block">
                  <div className="h-48 overflow-hidden">
                    <img 
                      src="/bai-15/hinh1.jpg" 
                      alt="Đặt lịch khám trực tuyến" 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-6 flex flex-col h-[calc(100%-12rem)]">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="bg-purple-100 text-purple-700 text-[0.625rem] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">Dịch vụ</span>
                      <span className="text-[0.6875rem] text-slate-400">22 Th05, 2026</span>
                      <div className="ml-auto flex items-center gap-1.5 text-slate-400">
                        <Eye size={14} className="text-slate-400" />
                        <span className="text-xs font-medium font-sans leading-none">{viewCounts['dat-lich-kham-truc-tuyen-online'] || 0}</span>
                      </div>
                    </div>
                    <h3 className="font-bold text-lg text-slate-800 mb-3 group-hover:text-teal-600 transition-colors line-clamp-2">
                      Đặt Lịch Khám Trực Tuyến: Hướng Dẫn
                    </h3>
                    <p className="text-slate-500 text-sm leading-relaxed line-clamp-2 mt-auto">
                      Cách đặt lịch khám online an toàn và tiện lợi.
                    </p>
                  </div>
                </Link>

                {/* Article 16 */}
                <Link to="/resources/len-thuc-don-dinh-duong-can-bang" className="w-[85vw] sm:w-[320px] shrink-0 snap-start bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm transition-all hover:shadow-md group cursor-pointer block">
                  <div className="h-48 overflow-hidden">
                    <img 
                      src="/bai-16/hinh1.jpg" 
                      alt="Lên thực đơn dinh dưỡng" 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-6 flex flex-col h-[calc(100%-12rem)]">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="bg-amber-100 text-amber-700 text-[0.625rem] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">Dinh dưỡng</span>
                      <span className="text-[0.6875rem] text-slate-400">22 Th05, 2026</span>
                      <div className="ml-auto flex items-center gap-1.5 text-slate-400">
                        <Eye size={14} className="text-slate-400" />
                        <span className="text-xs font-medium font-sans leading-none">{viewCounts['len-thuc-don-dinh-duong-can-bang'] || 0}</span>
                      </div>
                    </div>
                    <h3 className="font-bold text-lg text-slate-800 mb-3 group-hover:text-teal-600 transition-colors line-clamp-2">
                      Lên Thực Đơn Dinh Dưỡng Cân Bằng
                    </h3>
                    <p className="text-slate-500 text-sm leading-relaxed line-clamp-2 mt-auto">
                      Hướng dẫn lập thực đơn khoa học cho cả gia đình.
                    </p>
                  </div>
                </Link>

                {/* Article 17 */}
                <Link to="/resources/cach-chon-bac-si-gioi-uy-tin" className="w-[85vw] sm:w-[320px] shrink-0 snap-start bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm transition-all hover:shadow-md group cursor-pointer block">
                  <div className="h-48 overflow-hidden">
                    <img 
                      src="/bai-17/hinh1.jpg" 
                      alt="Cách chọn bác sĩ giỏi" 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-6 flex flex-col h-[calc(100%-12rem)]">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="bg-rose-100 text-rose-700 text-[0.625rem] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">Sức khỏe</span>
                      <span className="text-[0.6875rem] text-slate-400">22 Th05, 2026</span>
                      <div className="ml-auto flex items-center gap-1.5 text-slate-400">
                        <Eye size={14} className="text-slate-400" />
                        <span className="text-xs font-medium font-sans leading-none">{viewCounts['cach-chon-bac-si-gioi-uy-tin'] || 0}</span>
                      </div>
                    </div>
                    <h3 className="font-bold text-lg text-slate-800 mb-3 group-hover:text-teal-600 transition-colors line-clamp-2">
                      Cách Chọn Bác Sĩ Giỏi: Hướng Dẫn
                    </h3>
                    <p className="text-slate-500 text-sm leading-relaxed line-clamp-2 mt-auto">
                      Mẹo chọn bác sĩ uy tín và giỏi chuyên môn.
                    </p>
                  </div>
                </Link>

                {/* Article 18 */}
                <Link to="/resources/thuc-don-tieu-duong-7-ngay-kh-hoc" className="w-[85vw] sm:w-[320px] shrink-0 snap-start bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm transition-all hover:shadow-md group cursor-pointer block">
                  <div className="h-48 overflow-hidden">
                    <img 
                      src="/bai-18/hinh1.jpg" 
                      alt="Thực đơn tiểu đường 7 ngày" 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-6 flex flex-col h-[calc(100%-12rem)]">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="bg-green-100 text-green-700 text-[0.625rem] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">Dinh dưỡng</span>
                      <span className="text-[0.6875rem] text-slate-400">22 Th05, 2026</span>
                      <div className="ml-auto flex items-center gap-1.5 text-slate-400">
                        <Eye size={14} className="text-slate-400" />
                        <span className="text-xs font-medium font-sans leading-none">{viewCounts['thuc-don-tieu-duong-7-ngay-kh-hoc'] || 0}</span>
                      </div>
                    </div>
                    <h3 className="font-bold text-lg text-slate-800 mb-3 group-hover:text-teal-600 transition-colors line-clamp-2">
                      Thực Đơn 7 Ngày: Lên Kế Hoạch Ăn Khoa Học
                    </h3>
                    <p className="text-slate-500 text-sm leading-relaxed line-clamp-2 mt-auto">
                      Hướng dẫn lên thực đơn tiểu đường an toàn và ngon.
                    </p>
                  </div>
                </Link>
              </div>
            </div>

          </div>

          {/* Right Column (Sidebar) */}
          <div className="lg:col-span-4 flex flex-col gap-10">
            
            {/* Search */}
            <div className="bg-[#f8fafc] rounded-2xl p-6">
              <h3 className="text-[0.6875rem] font-bold text-slate-500 uppercase tracking-widest mb-4">Tìm kiếm tài liệu</h3>
              <div className="relative">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                <input 
                  type="text" 
                  placeholder="Tìm kiếm hướng dẫn..." 
                  className="w-full bg-white border border-slate-200 rounded-lg pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all"
                />
              </div>
            </div>

            {/* Latest Updates */}
            <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm">
              <h3 className="text-[0.6875rem] font-bold text-slate-500 uppercase tracking-widest mb-5">Cập nhật mới nhất</h3>
              <div className="space-y-5">
                <div className="flex gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-teal-600 mt-1.5 shrink-0" />
                  <div>
                    <h4 className="text-sm font-bold text-slate-700 hover:text-teal-600 cursor-pointer transition-colors line-clamp-2">Cập nhật tính năng theo dõi chỉ số đường huyết v2.1</h4>
                    <p className="text-[0.6875rem] text-slate-400 mt-1">2 GIỜ TRƯỚC</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-teal-600 mt-1.5 shrink-0" />
                  <div>
                    <h4 className="text-sm font-bold text-slate-700 hover:text-teal-600 cursor-pointer transition-colors line-clamp-2">Tài liệu hướng dẫn kết nối máy đo huyết áp Omron</h4>
                    <p className="text-[0.6875rem] text-slate-400 mt-1">HÔM QUA</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-teal-600 mt-1.5 shrink-0" />
                  <div>
                    <h4 className="text-sm font-bold text-slate-700 hover:text-teal-600 cursor-pointer transition-colors line-clamp-2">Cảnh báo: Lừa đảo tin nhắn giả danh bác sĩ</h4>
                    <p className="text-[0.6875rem] text-slate-400 mt-1">15 TH05, 2024</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Popular Topics */}
            <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm">
              <h3 className="text-[0.6875rem] font-bold text-slate-500 uppercase tracking-widest mb-5">Chủ đề phổ biến</h3>
              <div className="flex flex-wrap gap-2">
                {["Sức khỏe Nhi khoa", "Dinh dưỡng", "Người cao tuổi", "Yoga & Thiền", "Hỗ trợ kỹ thuật"].map((topic) => (
                  <span key={topic} className="px-3 py-1.5 bg-slate-50 hover:bg-slate-100 text-slate-600 text-xs rounded-lg cursor-pointer transition-colors border border-slate-100">
                    {topic}
                  </span>
                ))}
              </div>
            </div>

            {/* Newsletter */}
            <div className="bg-[#0f172a] rounded-2xl p-6 text-white shadow-xl">
              <h3 className="text-lg font-bold font-display mb-2">Bản tin Sức khỏe</h3>
              <p className="text-[0.8125rem] text-slate-400 mb-5 leading-relaxed">
                Nhận thông tin y khoa mới nhất hàng tuần vào hộp thư của bạn.
              </p>
              <div className="flex flex-col gap-3">
                <input 
                  type="email" 
                  placeholder="Email của bạn..." 
                  className="bg-slate-800 border-transparent rounded-lg px-4 py-2.5 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-teal-500/50"
                />
                <button className="bg-teal-600 hover:bg-teal-500 text-white text-sm font-bold px-4 py-2.5 rounded-lg transition-colors">
                  ĐĂNG KÝ NGAY
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      <PublicFooter />
    </div>
  );
}