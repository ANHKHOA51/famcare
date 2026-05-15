import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import PublicNavbar from "@/components/PublicNavbar";
import PublicFooter from "@/components/PublicFooter";
import { Link } from "react-router-dom";
import { ArrowRight, Activity, ShieldCheck, Cpu } from "lucide-react";

export default function Article3Page() {
  return (
    <>
      <Helmet>
        <title>Hệ sinh thái FamCare: Giải pháp toàn diện chăm sóc sức khỏe gia đình</title>
        <meta
          name="description"
          content="Khám phá hệ sinh thái FamCare - nền tảng y tế số toàn diện với máy quét đơn thuốc AI, tủ thuốc thông minh, và tối ưu hóa dinh dưỡng cho sức khỏe gia đình."
        />

        <meta name="keywords" content="hệ sinh thái FamCare, nền tảng y tế số, quét đơn thuốc AI, tủ thuốc AI, quản lý sức khỏe gia đình" />

        <link
          rel="canonical"
          href="https://famcare.site/resources/he-sinh-thai-famcare-giai-phap-toan-dien"
        />

        <meta
          property="og:title"
          content="Hệ sinh thái FamCare: Giải pháp toàn diện chăm sóc sức khỏe gia đình"
        />

        <meta
          property="og:description"
          content="Khám phá hệ sinh thái FamCare - nền tảng y tế số toàn diện với máy quét đơn thuốc AI, tủ thuốc thông minh, và tối ưu hóa dinh dưỡng cho sức khỏe gia đình."
        />

        <meta
          property="og:image"
          content="https://famcare.site/bai-3/hinh1.jpg"
        />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />

        <meta
          property="og:type"
          content="article"
        />

        <meta
          property="og:url"
          content="https://famcare.site/resources/he-sinh-thai-famcare-giai-phap-toan-dien"
        />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": "Hệ sinh thái FamCare: Giải pháp toàn diện chăm sóc sức khỏe gia đình",
            "description": "Khám phá hệ sinh thái FamCare - nền tảng y tế số toàn diện với máy quét đơn thuốc AI, tủ thuốc thông minh, và tối ưu hóa dinh dưỡng cho sức khỏe gia đình.",
            "image": "https://famcare.site/bai-3/hinh1.jpg",
            "datePublished": "2026-05-15",
            "dateModified": "2026-05-15",
            "author": {"@type": "Organization", "name": "FamCare", "url": "https://famcare.site"},
            "publisher": {"@type": "Organization", "name": "FamCare", "logo": {"@type": "ImageObject", "url": "https://famcare.site/logo.png"}},
            "mainEntityOfPage": {"@type": "WebPage", "@id": "https://famcare.site/resources/he-sinh-thai-famcare-giai-phap-toan-dien"}
          })}
        </script>
      </Helmet>

      <div className="min-h-screen bg-neutral-50 selection:bg-indigo-200 selection:text-indigo-900 font-body">
      <PublicNavbar />

      {/* Feature Article Hero - Full width image background */}
      <header className="relative w-full h-[75vh] min-h-[600px] flex items-end justify-center overflow-hidden">
        {/* Background (now gradient-only; image moved into article body) */}
        <div className="absolute inset-0 w-full h-full">
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent mix-blend-multiply"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900/40 via-transparent to-slate-900"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 w-full max-w-5xl mx-auto px-6 sm:px-10 pb-16 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-6">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
            <span className="text-white text-xs font-bold tracking-[0.2em] uppercase">Feature Article</span>
          </div>
          <h1 className="font-display text-4xl sm:text-6xl lg:text-[4rem] font-bold text-white leading-[1.1] mb-6 tracking-tight drop-shadow-xl text-balance">
            Hệ sinh thái FamCare: <br/> 
            <span className="text-cyan-300 font-light italic">Giải pháp toàn diện</span> <br/>
            chăm sóc sức khỏe gia đình
          </h1>
          <p className="text-slate-300 text-sm sm:text-base tracking-widest uppercase font-semibold">
            Trợ lý y tế số kiến tạo bình an
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-20 bg-neutral-50 -mt-8 mx-auto w-full max-w-6xl rounded-t-[2.5rem] px-4 sm:px-12 lg:px-24 py-16 text-[1.125rem] text-slate-800 leading-[1.9] font-light shadow-[0_-20px_40px_rgba(0,0,0,0.05)]">
        
        {/* Sapo / Lead text - High Editorial Design */}
        <div className="max-w-[800px] mx-auto mb-20 text-center">
          <QuoteIcon className="w-12 h-12 text-cyan-200 mx-auto mb-6" />
          <p className="text-[1.3rem] sm:text-[1.5rem] leading-[1.8] text-slate-600 font-body text-justify italic">
            Trong kỷ nguyên số, việc quản lý sức khỏe gia đình không còn chỉ dừng lại ở việc đi khám khi có bệnh. Đó là một hành trình kết nối từ số hóa hồ sơ y tế, quản lý dược phẩm thông minh đến tối ưu hóa dinh dưỡng hàng ngày. <strong className="text-slate-900 not-italic">FamCare</strong> ra đời như một "trợ lý y tế toàn năng", mang đến giải pháp minh bạch, tinh tế và cá nhân hóa tuyệt đối cho mọi gia đình Việt.
          </p>
          <div className="w-24 h-[1px] bg-cyan-300 mx-auto mt-10"></div>
        </div>

        <EditorialImage src="/bai-3/hinh1.jpg" alt="Giao diện FamCare - Nền tảng y tế chăm sóc sức khỏe gia đình" />

        <div className="max-w-[800px] mx-auto">

          {/* Section 1 */}
          <SectionBlock 
            title="Tổng quan về hệ sinh thái y tế số FamCare" 
            icon={<Activity className="text-cyan-500" size={28} />}
          />
          <p className="text-justify mb-6">
            Sức khỏe là tài sản quý giá nhất, nhưng việc quản lý "tài sản" này cho cả gia đình thường trở thành gánh nặng vô hình giữa nhịp sống bận rộn. Nhiều người hiện nay không có đủ thời gian để quản lý từng loại giấy tờ, hồ sơ của người thân nhưng vẫn khao khát được theo dõi sức khỏe gia đình thường xuyên một cách khoa học và thảnh thơi nhất.
          </p>
          <p className="text-justify mb-16">
            Nắm bắt nhu cầu thực tế này, <strong>FamCare</strong> ra đời với sứ mệnh thay đổi hoàn toàn phương thức chăm sóc sức khỏe truyền thống. Chúng tôi kiến tạo một hệ sinh thái y tế số toàn diện, nơi công nghệ trí tuệ nhân tạo (AI) đóng vai trò là "mắt xích" kết nối, giúp mọi dữ liệu y tế trở nên minh bạch, tinh tế và mang tính cá nhân hóa cao cho từng hộ gia đình.
          </p>

          {/* Section 2 */}
          <SectionBlock 
            title="Máy quét đơn thuốc AI: Giải mã nét chữ bác sĩ và số hóa hồ sơ" 
            icon={<Cpu className="text-cyan-500" size={28} />}
          />
          <p className="text-justify mb-10">
            Một trong những rào cản tâm lý lớn nhất của người bệnh khi rời khỏi phòng khám chính là tờ đơn thuốc giấy. Những dòng chữ viết tay vắn tắt đôi khi khiến người dùng bối rối. Với tính năng <strong>Máy quét đơn thuốc AI</strong>, <strong>FamCare</strong> cho phép bạn chụp ảnh và chuyển đổi mọi thông tin từ đơn thuốc giấy thành dữ liệu số ngay lập tức. Hệ thống không chỉ nhận diện tên thuốc mà còn tự động lưu trữ vào hồ sơ sức khỏe trọn đời, giúp việc tra cứu lịch sử dùng thuốc trở nên dễ dàng hơn bao giờ hết.
          </p>
          


          {/* Section 3 */}
          <SectionBlock 
            title="Tủ thuốc AI: Quản lý dược phẩm thông minh và nhắc lịch" 
            icon={<ShieldCheck className="text-cyan-500" size={28} />}
          />
          <p className="text-justify mb-10">
            Việc quên liều hay nhầm lẫn giữa các loại thuốc trong gia đình là rủi ro hiện hữu. <strong>Tủ thuốc AI</strong> của <strong>FamCare</strong> giúp bạn quản lý danh mục thuốc hiện có một cách khoa học. Ứng dụng sẽ tự động nhắc lịch uống thuốc chính xác đến từng phút, đồng thời đưa ra cảnh báo khi thuốc sắp hết hoặc đã quá hạn sử dụng, đảm bảo tính an toàn tối đa cho mọi thành viên.
          </p>

          <EditorialImage src="/bai-3/hinh2.jpg" alt="Nhắc nhở dùng thuốc và quản lý dược phẩm" />

          {/* Section 4 */}
          <h2 className="font-display text-3xl font-bold text-slate-900 mt-20 mb-6 tracking-tight">AI Nutrition: Tối ưu hóa thực đơn dựa trên tình trạng sức khỏe</h2>
          <p className="text-justify mb-10">
            Dinh dưỡng là chìa khóa của sự phục hồi. Tính năng <strong>AI Nutrition</strong> tích hợp trong hệ sinh thái sẽ phân tích đơn thuốc và tình trạng bệnh lý hiện tại để gợi ý thực đơn phù hợp. Hệ thống sẽ cảnh báo các tương tác thực phẩm - thuốc nguy hiểm (như uống thuốc tim mạch thì không nên dùng nước bưởi) và gợi ý những món ăn hỗ trợ phát huy tối đa tác dụng của thuốc điều trị.
          </p>

          <EditorialImage src="/bai-3/hinh3.jpg" alt="Trợ lý dinh dưỡng AI đề xuất khẩu phần phù hợp" />

          {/* Section 5 */}
          <h2 className="font-display text-3xl font-bold text-slate-900 mt-20 mb-6 tracking-tight">Hồ sơ gia đình: Kết nối dữ liệu y tế tập trung cho mọi thành viên</h2>
          <p className="text-justify mb-8">
            Sức mạnh lớn nhất của <strong>FamCare</strong> chính là khả năng kết nối. Trong một thế giới bận rộn, việc thấu hiểu tình trạng sức khỏe của những người thân yêu đôi khi bị lãng quên.
          </p>

          <h3 className="font-display text-xl font-bold text-slate-800 mt-8 mb-4 border-l-4 border-cyan-500 pl-4 py-1">Quản lý tập trung mọi chỉ số sức khỏe</h3>
          <p className="text-justify mb-8">
            Không cần phải quản lý nhiều tài khoản phức tạp, <strong>FamCare</strong> cho phép bạn theo dõi biến động chỉ số sức khỏe, lịch sử tiêm chủng hay diễn biến bệnh lý của bố mẹ, anh chị em và con trẻ trên cùng một giao diện. Mọi dữ liệu như biểu đồ huyết áp, chỉ số BMI đều được lưu trữ trực quan và khoa học.
          </p>

          <h3 className="font-display text-xl font-bold text-slate-800 mt-8 mb-4 border-l-4 border-cyan-500 pl-4 py-1">Chăm sóc dựa trên sự thấu hiểu thực tế</h3>
          <p className="text-justify mb-10">
            Việc nắm giữ hồ sơ sức khỏe tập trung giúp bạn đưa ra những quyết định chăm sóc kịp thời và đầy yêu thương. Khi mọi thành viên đều được "số hóa" sức khỏe, tình yêu thương không chỉ dừng lại ở lời nói mà được thể hiện qua sự thấu hiểu thể trạng thực tế, mang lại sự an tâm tuyệt đối cho cả gia đình.
          </p>

          <EditorialImage src="/bai-3/hinh4.jpg" alt="Mọi dữ liệu sức khỏe trong tầm tay" />

          {/* Section 6 */}
          <h2 className="font-display text-3xl font-bold text-slate-900 mt-20 mb-6 tracking-tight text-center">Tại sao FamCare là lựa chọn hàng đầu cho sức khỏe gia đình bạn?</h2>
          <p className="text-justify mb-16 text-[1.15rem] leading-[1.9] bg-white p-8 rounded-2xl border border-slate-100 shadow-sm relative italic text-slate-700">
            <span className="absolute -top-4 left-8 text-5xl text-cyan-200">"</span>
            Hệ sinh thái <strong>FamCare</strong> không chỉ đơn thuần là một ứng dụng y tế số; đó là lời cam kết cho một lối sống an tâm, khoa học và tràn đầy yêu thương. Bằng cách kết hợp giữa sức mạnh của trí tuệ nhân tạo và nhu cầu thực tế của từng hộ gia đình, <strong>FamCare</strong> tự hào là người bạn đồng hành tin cậy trên hành trình bảo vệ "tài sản" quý giá nhất của mỗi người. Gia đình khỏe mạnh là khởi đầu của hạnh phúc. Hãy để <strong>FamCare</strong> đồng hành cùng bạn nâng tầm chất lượng sống ngay hôm nay.
          </p>

          {/* Special CTA Feature Box */}
          <div className="relative rounded-[2rem] overflow-hidden bg-slate-900 text-white p-12 text-center shadow-2xl mb-16">
            <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/20 rounded-full mix-blend-screen filter blur-[80px]"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/20 rounded-full mix-blend-screen filter blur-[80px]"></div>
            
            <div className="relative z-10 hidden sm:block absolute top-8 left-8">
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-white/20">
                <path d="M20 0L22.2514 17.7486L40 20L22.2514 22.2514L20 40L17.7486 22.2514L0 20L17.7486 17.7486L20 0Z" fill="currentColor"/>
              </svg>
            </div>
            
            <h3 className="font-display text-3xl sm:text-4xl font-bold mb-4">Trải nghiệm tương lai của Y tế số</h3>
            <p className="text-slate-300 text-lg mb-10 max-w-lg mx-auto font-body">
              Giao phó sức khỏe gia đình bạn cho công nghệ để tận hưởng những phút giây thảnh thơi trọn vẹn. Khám phá toàn bộ tính năng ngay lập tức.
            </p>
            <a
              href="https://famcare.site/app/scanner"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-white text-slate-900 font-bold px-8 py-4 rounded-full hover:scale-105 hover:shadow-[0_0_40px_rgba(255,255,255,0.3)] transition-all duration-300 uppercase tracking-widest text-sm"
            >
              Khám phá giải pháp
              <ArrowRight size={18} />
            </a>
          </div>

          {/* Minimal Footer Signature */}
          <div className="text-center pt-8 border-t border-slate-200 text-sm font-sans text-slate-500 pb-10">
            <p className="font-bold text-slate-800 mb-2 uppercase tracking-widest">Bản quyền thuộc về <strong>FamCare</strong> - Nền tảng y tế thông minh.</p>
            <div className="flex justify-center gap-6 mt-4">
              <a href="https://famcare.site/" className="hover:text-cyan-600 transition-colors">Website: <strong>famcare</strong>.site</a>
              <span>&bull;</span>
              <a href="mailto:famcare.support@gmail.com" className="hover:text-cyan-600 transition-colors">Email: <strong>famcare</strong>.support@gmail.com</a>
            </div>
          </div>

          {/* Related Articles Section */}
          <div className="mt-20 pt-16 border-t-2 border-slate-200">
            <h2 className="font-display text-2xl font-bold text-slate-900 mb-8">Bài viết liên quan</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Link to="/resources/cach-doc-don-thuoc-giay" className="p-6 border border-slate-200 rounded-xl hover:border-cyan-400 hover:shadow-md transition-all group">
                <h3 className="font-bold text-slate-800 mb-2 group-hover:text-cyan-600 transition-colors">Cách đọc đơn thuốc giấy: 5 sai lầm phổ biến</h3>
                <p className="text-slate-600 text-sm">Học cách đọc đơn thuốc chuẩn xác và tránh sai lầm.</p>
              </Link>
              <Link to="/resources/lua-chon-thuc-pham-dung-de-phat-huy-tac-dung-thuoc" className="p-6 border border-slate-200 rounded-xl hover:border-cyan-400 hover:shadow-md transition-all group">
                <h3 className="font-bold text-slate-800 mb-2 group-hover:text-cyan-600 transition-colors">Lựa chọn thực phẩm đúng để phát huy tác dụng thuốc</h3>
                <p className="text-slate-600 text-sm">Hiểu cơ chế tương tác thực phẩm-thuốc.</p>
              </Link>
              <a href="/app/cabinet" className="p-6 border border-slate-200 rounded-xl hover:border-cyan-400 hover:shadow-md transition-all group">
                <h3 className="font-bold text-slate-800 mb-2 group-hover:text-cyan-600 transition-colors">✨ Tủ thuốc AI</h3>
                <p className="text-slate-600 text-sm">Quản lý thông minh lịch uống thuốc.</p>
              </a>
              <a href="/app/scanner" className="p-6 border border-slate-200 rounded-xl hover:border-cyan-400 hover:shadow-md transition-all group">
                <h3 className="font-bold text-slate-800 mb-2 group-hover:text-cyan-600 transition-colors">Quét đơn thuốc AI</h3>
                <p className="text-slate-600 text-sm">Số hóa đơn thuốc giấy tự động.</p>
              </a>
            </div>
          </div>

        </div>
      </main>

      <PublicFooter />
      </div>
    </>
  );
}

// Reusable Custom UI Components for Feature Article
const SectionBlock = ({ title, icon }: { title: string, icon: React.ReactNode }) => (
  <div className="flex flex-col sm:flex-row sm:items-end gap-4 mt-20 mb-8 border-b-2 border-slate-900 pb-4">
    <div className="shrink-0">{icon}</div>
    <h2 className="font-display text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight leading-none">{title}</h2>
  </div>
);

const EditorialImage = ({ src, alt }: { src: string, alt: string }) => (
  <figure className="my-14 group">
    <div className="overflow-hidden rounded-2xl shadow-xl bg-slate-100 relative">
      <img
        src={src}
        alt={alt}
        className="w-full h-auto object-cover transform transition-transform duration-700 group-hover:scale-[1.02]"
        loading="lazy"
      />
      {/* Overlay vignette */}
      <div className="absolute inset-0 ring-1 ring-inset ring-black/10 rounded-2xl pointer-events-none"></div>
    </div>
    <figcaption className="mt-4 text-center text-sm font-body italic text-slate-500 px-4">
      {alt}
    </figcaption>
  </figure>
);

const QuoteIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
  </svg>
);