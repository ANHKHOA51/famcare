import { Helmet } from 'react-helmet-async';
import PublicNavbar from "@/components/PublicNavbar";
import PublicFooter from "@/components/PublicFooter";
import { Link } from "react-router-dom";
import SocialShareButtons from '@/components/SocialShareButtons';

export default function Article11Page() {
  return (
    <>
      <Helmet>
        <title>Quên tên thuốc cũ? Cách tra cứu dược phẩm theo triệu chứng bằng AI FamCare</title>
        <meta
          name="description"
          content="Bạn quên tên thuốc cũ? Khám phá cách tra cứu dược phẩm theo triệu chứng cực nhanh bằng AI FamCare. Giải pháp y tế thông minh ngay trong tầm tay!"
        />
        <meta name="keywords" content="quên tên thuốc cũ, tra cứu dược phẩm, AI FamCare, tìm tên thuốc, tủ thuốc AI, lịch sử dùng thuốc, quét đơn thuốc, quản lý lịch uống thuốc, cách tìm thuốc cũ" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Quên tên thuốc cũ? Cách tra cứu dược phẩm theo triệu chứng bằng AI FamCare" />
        <meta name="twitter:description" content="Bạn quên tên thuốc cũ? Khám phá cách tra cứu dược phẩm theo triệu chứng cực nhanh bằng AI FamCare." />
        <meta name="twitter:image" content="https://famcare.site/bai-11/hinh1.jpg" />
        <link rel="canonical" href="https://famcare.site/resources/quen-ten-thuoc-cu-ai-famcare" />
        <meta property="og:title" content="Quên tên thuốc cũ? Cách tra cứu dược phẩm theo triệu chứng bằng AI FamCare" />
        <meta property="og:description" content="Bạn quên tên thuốc cũ? Khám phá cách tra cứu dược phẩm theo triệu chứng cực nhanh bằng AI FamCare." />
        <meta property="og:image" content="https://famcare.site/bai-11/hinh1.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:type" content="article" />
        <meta property="og:url" content="https://famcare.site/resources/quen-ten-thuoc-cu-ai-famcare" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": "Quên tên thuốc cũ? Cách tra cứu dược phẩm theo triệu chứng bằng AI FamCare",
            "description": "Bạn quên tên thuốc cũ? Khám phá cách tra cứu dược phẩm theo triệu chứng cực nhanh bằng AI FamCare.",
            "image": "https://famcare.site/bai-11/hinh1.jpg",
            "datePublished": "2026-05-15",
            "dateModified": "2026-05-15",
            "author": {"@type": "Organization", "name": "FamCare", "url": "https://famcare.site"},
            "publisher": {"@type": "Organization", "name": "FamCare", "logo": {"@type": "ImageObject", "url": "https://famcare.site/logo.png"}},
            "mainEntityOfPage": {"@type": "WebPage", "@id": "https://famcare.site/resources/quen-ten-thuoc-cu-ai-famcare"}
          })}
        </script>
      </Helmet>

      <div className="min-h-screen bg-slate-50 selection:bg-cyan-200 selection:text-cyan-900 font-body pb-10">
        <PublicNavbar />

        <header className="bg-slate-900 pt-16 pb-12 sm:pt-20 sm:pb-16 relative overflow-hidden">
          <div className="max-w-4xl mx-auto px-4 sm:px-8 relative z-10">
            <div className="inline-block font-body text-xs font-semibold tracking-[0.2em] uppercase text-cyan-400 border border-cyan-400/50 px-3.5 py-1.5 mb-6 rounded-sm">
              Kiến thức Y khoa
            </div>
            <h1 className="font-display text-3xl sm:text-5xl lg:text-[3.2rem] font-black text-cyan-50 leading-[1.2] mb-5 tracking-tight">
              Quên tên thuốc cũ? Cách tra cứu dược phẩm theo triệu chứng bằng AI
            </h1>
            <p className="text-justify text-[13px] text-slate-400 tracking-wide uppercase font-sans">
              Khám phá cách tra cứu và tìm lại tên thuốc cũ cực nhanh bằng AI, quản lý lịch sử dùng thuốc thông minh cùng FamCare.
            </p>
          </div>
        </header>

        <main className="max-w-4xl mx-auto px-4 sm:px-8 lg:px-16 py-12 sm:py-16 text-slate-800">
          <div className="prose prose-sm sm:prose max-w-none">
            <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-4">Rủi ro của việc quên tên thuốc cũ</h2>
            <p className="text-justify mb-6">
              Việc quên tên loại thuốc từng sử dụng tiềm ẩn nhiều hệ lụy nghiêm trọng, trực tiếp đe dọa đến hiệu quả điều trị và an toàn tính mạng của người bệnh. Rủi ro phổ biến nhất chính là việc mua nhầm thuốc dựa trên những mô tả cảm tính về màu sắc hay bao bì, khiến người bệnh dễ dùng sai hoạt chất hoặc vô tình nạp vào cơ thể các thành phần từng gây dị ứng.
            </p>

            <h3 className="text-xl font-bold text-slate-800 mt-10 mb-4">Những nhóm người dễ quên tên thuốc nhất</h3>
            <ul className="list-disc pl-6 mb-6 space-y-2">
              <li>Người lớn tuổi phải sử dụng nhiều loại thuốc mỗi ngày</li>
              <li>Người điều trị bệnh mãn tính như huyết áp, tiểu đường, tim mạch</li>
              <li>Người từng điều trị bệnh theo đợt nhưng lâu ngày không tái sử dụng thuốc</li>
              <li>Phụ huynh chăm sóc sức khỏe cho cả gia đình</li>
              <li>Người có thói quat giữ thuốc nhưng không lưu lại toa hoặc hướng dẫn</li>
            </ul>

            <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-4">Cách truy vấn tên thuốc cũ nhanh nhất</h2>
            
            <h3 className="text-xl font-bold text-slate-800 mt-8 mb-3">1. Xem lại bệnh án hoặc đơn thuốc cũ</h3>
            <p className="mb-6">Kiểm tra lại các túi hồ sơ y tế, ảnh chụp trong điện thoại hoặc tin nhắn với bác sĩ. Đây là nguồn thông tin chính xác nhất.</p>

            <h3 className="text-xl font-bold text-slate-800 mt-8 mb-3">2. Liên hệ với dược sĩ tại nhà thuốc cũ</h3>
            <p className="mb-6">Nếu bạn thường xuyên mua thuốc tại một cửa hàng cố định, các dược sĩ có thể lưu lịch sử đơn thuốc của bạn trên hệ thống quản lý.</p>

            <h3 className="text-xl font-bold text-slate-800 mt-8 mb-3">3. Sử dụng AI FamCare để truy vấn theo triệu chứng</h3>
            <p className="mb-6">
              Công cụ này không chỉ giúp bạn lưu trữ thông tin dược phẩm một cách khoa học mà còn cho phép truy vấn lại tên thuốc theo triệu chứng, giúp bạn hoàn toàn làm chủ hành trình chăm sóc sức khỏe.
            </p>

            <div className="bg-blue-50 border-l-4 border-blue-500 p-6 my-8 rounded">
              <p className="font-semibold text-slate-900">Mẹo từ FamCare:</p>
              <p className="text-slate-700 mt-2">
                Với Tủ thuốc AI, bạn chỉ cần nhập từ khóa như "đau dạ dày", "ho khan" hay "dị ứng", hệ thống sẽ tự động lọc và hiển thị danh mục các loại dược phẩm tương ứng.
              </p>
            </div>

            <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-4">Kết luận</h2>
            <p className="mb-6">
              Quên tên thuốc cũ tưởng chừng chỉ là một bất tiện nhỏ nhưng thực tế có thể gây ra rất nhiều hệ lụy cho sức khỏe. Việc chủ động lưu trữ lịch sử dùng thuốc không chỉ giúp bạn tiết kiệm thời gian, chi phí mà còn góp phần đảm bảo an toàn cho bản thân và gia đình.
            </p>

            <div className="bg-gradient-to-r from-cyan-50 to-blue-50 p-8 rounded-2xl my-8 border border-cyan-200">
              <p className="font-semibold text-slate-900 mb-3">Bài viết này mang tính thông tin chung và không thay thế cho lời khuyên y tế chuyên nghiệp. Hãy luôn tham khảo bác sĩ hoặc dược sĩ về cách xử lý liều thuốc cụ thể của bạn.</p>
              <p className="text-xs text-slate-600 mt-4">FamCare – Nền tảng y tế thông minh – Chăm sóc gia đình từ xa</p>
              <p className="text-xs text-slate-600">Website: <a href="https://famcare.site/" className="text-cyan-600 hover:text-cyan-700">https://famcare.site/</a> | Email: famcare.support@gmail.com</p>
            </div>
          </div>

          <SocialShareButtons 
            title="Quên tên thuốc cũ? Cách tra cứu dược phẩm theo triệu chứng bằng AI FamCare"
            url="https://famcare.site/resources/quen-ten-thuoc-cu-ai-famcare"
            description="Bạn quên tên thuốc cũ? Khám phá cách tra cứu dược phẩm theo triệu chứng cực nhanh bằng AI FamCare."
          />

          {/* Related Articles */}
          <div className="mt-20 pt-16 border-t-2 border-slate-200">
            <h2 className="font-display text-2xl font-bold text-slate-900 mb-8">Bài viết liên quan</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Link to="/resources/cach-doc-don-thuoc-giay" className="p-6 border border-slate-200 rounded-xl hover:border-cyan-400 hover:shadow-md transition-all group">
                <h3 className="font-bold text-slate-800 mb-2 group-hover:text-cyan-600 transition-colors">Cách đọc đơn thuốc giấy</h3>
                <p className="text-slate-600 text-sm">Học cách đọc đơn thuốc chuẩn xác.</p>
              </Link>
              <Link to="/resources/lua-chon-thuc-pham-dung-de-phat-huy-tac-dung-thuoc" className="p-6 border border-slate-200 rounded-xl hover:border-cyan-400 hover:shadow-md transition-all group">
                <h3 className="font-bold text-slate-800 mb-2 group-hover:text-cyan-600 transition-colors">Lựa chọn thực phẩm đúng để phát huy tác dụng thuốc</h3>
                <p className="text-slate-600 text-sm">Hiểu cơ chế tương tác thực phẩm-thuốc.</p>
              </Link>
              <Link to="/resources/theo-doi-chi-so-bmi-dung-cach" className="p-6 border border-slate-200 rounded-xl hover:border-cyan-400 hover:shadow-md transition-all group">
                <h3 className="font-bold text-slate-800 mb-2 group-hover:text-cyan-600 transition-colors">Chỉ số BMI và sức khỏe</h3>
                <p className="text-slate-600 text-sm">Theo dõi chỉ số khỏe mạnh.</p>
              </Link>
              <a href="/app/cabinet" className="p-6 border border-slate-200 rounded-xl hover:border-cyan-400 hover:shadow-md transition-all group">
                <h3 className="font-bold text-slate-800 mb-2 group-hover:text-cyan-600 transition-colors">✨ Tủ thuốc AI</h3>
                <p className="text-slate-600 text-sm">Quản lý thông minh lịch uống thuốc.</p>
              </a>
              <a href="/app/scanner" className="p-6 border border-slate-200 rounded-xl hover:border-cyan-400 hover:shadow-md transition-all group">
                <h3 className="font-bold text-slate-800 mb-2 group-hover:text-cyan-600 transition-colors">Quét đơn thuốc AI</h3>
                <p className="text-slate-600 text-sm">Số hóa đơn thuốc giấy tự động.</p>
              </a>
              <a href="/app/meal-plan" className="p-6 border border-slate-200 rounded-xl hover:border-cyan-400 hover:shadow-md transition-all group">
                <h3 className="font-bold text-slate-800 mb-2 group-hover:text-cyan-600 transition-colors">🍽️ Thực đơn AI</h3>
                <p className="text-slate-600 text-sm">Lập kế hoạch ăn uống cá nhân.</p>
              </a>
            </div>
          </div>
        </main>

        <PublicFooter />
      </div>
    </>
  );
}
