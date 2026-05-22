import React, { useEffect, useState } from 'react';
import PublicNavbar from "@/components/PublicNavbar";
import PublicFooter from "@/components/PublicFooter";
import { Link } from "react-router-dom";
import { Helmet } from 'react-helmet-async';
import SocialShareButtons from '@/components/SocialShareButtons';

interface TocItem {
  id: string;
  text: string;
  level: number;
}

const tocItems: TocItem[] = [
  { id: "tiet-kiem-thoi-gian", text: "Tiết kiệm thời gian chờ đợi", level: 2 },
  { id: "han-che-qua-tai", text: "Hạn chế quá tải tại bệnh viện", level: 2 },
  { id: "lua-chon-gio", text: "Dễ dàng lựa chọn giờ khám", level: 2 },
  { id: "thanh-toan", text: "Thanh toán bằng nhiều hình thức", level: 2 },
  { id: "dat-cho-nguoi-than", text: "Dễ dàng đặt lịch cho người thân", level: 2 },
  { id: "famcare", text: "Đặt lịch khám online với FamCare", level: 2 },
  { id: "ket-luan", text: "Kết luận", level: 2 },
];

const SectionHeading = ({ number, title, id }: { number: string, title: string, id: string }) => (
  <div id={id} className="flex items-start gap-4 mt-16 mb-6 scroll-mt-28">
    <span className="font-display text-5xl font-black text-cyan-200/60 leading-none -mt-1 shrink-0">
      {number}
    </span>
    <h2 className="font-display text-2xl sm:text-[1.7rem] font-bold text-slate-900 leading-snug border-b-2 border-cyan-500 pb-2">
      {title}
    </h2>
  </div>
);

export default function Article15Page() {
  const [activeId, setActiveId] = useState("");

  useEffect(() => {
    fetch('/api/articles/5-loi-ich-dat-lich-kham-truc-tuyen-nguoi-ban-ron/view', { method: 'POST' })
      .catch(err => console.error("Failed to track view:", err));

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter(e => e.isIntersecting);
        if (visible.length > 0) {
          setActiveId(visible[0].target.id);
        }
      },
      { rootMargin: "-80px 0px -60% 0px", threshold: 0.1 }
    );

    tocItems.forEach(item => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <>
      <Helmet>
        <title>5 Lợi Ích Vượt Trội Khi Đặt Lịch Khám Trực Tuyến Dành Cho Người Bận Rộn</title>
        <meta
          name="description"
          content="Khám bệnh không lo chờ đợi! Khám phá 5 lợi ích vượt trội của đặt lịch khám trực tuyến giúp tiết kiệm thời gian và tối ưu chi phí cùng FamCare."
        />
        <meta name="keywords" content="đặt lịch khám trực tuyến, khám bệnh online, đặt lịch khám bệnh, telemedicine, đặt lịch khám, khám bệnh từ xa, tư vấn y tế online, bác sĩ trực tuyến" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Đặt Lịch Khám Trực Tuyến: Hướng Dẫn Khám Bệnh Online Hiệu Quả" />
        <meta name="twitter:description" content="Cách đặt lịch khám trực tuyến an toàn và tiện lợi." />
        <meta name="twitter:image" content="https://famcare.site/bai-15/hinh1.jpg" />
        <link rel="canonical" href="https://famcare.site/resources/5-loi-ich-dat-lich-kham-truc-tuyen-nguoi-ban-ron" />
        <meta property="og:title" content="5 Lợi Ích Vượt Trội Khi Đặt Lịch Khám Trực Tuyến" />
        <meta property="og:description" content="Khám phá 5 lợi ích vượt trội của đặt lịch khám trực tuyến giúp tiết kiệm thời gian." />
        <meta property="og:image" content="https://famcare.site/bai-15/hinh1.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:type" content="article" />
        <meta property="og:url" content="https://famcare.site/resources/5-loi-ich-dat-lich-kham-truc-tuyen-nguoi-ban-ron" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": "5 Lợi Ích Vượt Trội Khi Đặt Lịch Khám Trực Tuyến",
            "description": "Khám phá 5 lợi ích vượt trội của đặt lịch khám trực tuyến.",
            "image": "https://famcare.site/bai-15/hinh1.jpg",
            "datePublished": "2026-05-15",
            "dateModified": "2026-05-15",
            "author": {"@type": "Organization", "name": "FamCare", "url": "https://famcare.site"},
            "publisher": {"@type": "Organization", "name": "FamCare", "logo": {"@type": "ImageObject", "url": "https://famcare.site/logo.png"}},
            "mainEntityOfPage": {"@type": "WebPage", "@id": "https://famcare.site/resources/5-loi-ich-dat-lich-kham-truc-tuyen-nguoi-ban-ron"}
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
              5 Lợi Ích Đặt Lịch Khám Trực Tuyến
            </h1>
            <p className="text-justify text-[13px] text-slate-400 tracking-wide uppercase font-sans">
              Khám phá những lợi ích vượt trội của đặt lịch khám online dành cho người bận rộn.
            </p>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-800 via-cyan-500 to-blue-700 opacity-90"></div>
        </header>

        <main className="px-4 sm:px-8 lg:px-16 py-10 max-w-[860px] mx-auto text-[1.125rem] text-slate-800 leading-[1.85] font-light">

          {/* Table of Contents */}
          <nav className="bg-white/60 backdrop-blur rounded-xl p-6 mb-14 border border-cyan-100 shadow-sm float-none md:float-right md:ml-8 md:mb-8 md:w-64 font-sans text-sm">
            <h3 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
              Mục lục bài viết
            </h3>
            <ul className="space-y-1.5 text-left">
              {tocItems.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => scrollTo(item.id)}
                    className={`text-left w-full transition-colors rounded-md px-2.5 py-1 hover:bg-cyan-50/80 ${
                      item.level === 3 ? 'pl-5 text-slate-500 text-[13px]' : 'font-semibold text-slate-700'
                    } ${
                      activeId === item.id ? 'bg-cyan-50 text-cyan-700 font-bold shadow-sm ring-1 ring-cyan-500/20' : ''
                    }`}
                  >
                    {item.text}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          {/* Section 1 */}
          <SectionHeading number="01" id="tiet-kiem-thoi-gian" title="Tiết kiệm thời gian chờ đợi ở bệnh viện" />

          <p className="text-justify mb-6">
            Một trong những "nỗi ám ảnh" lớn nhất của người bệnh là phải xếp hàng dài chỉ để lấy số thứ tự. Với dịch vụ đặt lịch khám bệnh online, bạn hoàn toàn có thể chủ động lựa chọn chính xác khung giờ khám phù hợp. Quá trình này giúp rút ngắn đến 70% thời gian chờ đợi vô nghĩa tại bệnh viện.
          </p>

          {/* Section 2 */}
          <SectionHeading number="02" id="han-che-qua-tai" title="Hạn chế tình trạng quá tải tại bệnh viện" />

          <p className="text-justify mb-4">
            Sự dịch chuyển sang xu hướng đặt lịch khám bệnh online đang giải quyết triệt để bài toán quá tải nhờ cơ chế phân luồng thông minh. Lượng bệnh nhân sẽ được điều tiết và phân bổ đều theo từng khung giờ cố định.
          </p>
          <ul className="list-disc pl-6 mb-6 space-y-2">
            <li>Tối ưu hóa quy trình tiếp nhận</li>
            <li>Nâng cao chất lượng chăm sóc y tế</li>
            <li>An toàn cho sức khỏe cộng đồng</li>
          </ul>

          {/* Section 3 */}
          <SectionHeading number="03" id="lua-chon-gio" title="Dễ dàng lựa chọn giờ khám" />

          <p className="text-justify mb-6">
            Nếu trước đây "bệnh viện xếp giờ nào, mình đi giờ đó", thì ngay giờ, bạn hoàn toàn có quyền chủ động. Trên giao diện thông minh, chỉ với vài thao tác, bạn đã có thể:
          </p>
          <ul className="list-disc pl-6 mb-6 space-y-2">
            <li>Chủ động chọn ngày và khung giờ khám</li>
            <li>Chính xác chuyên khoa mong muốn</li>
            <li>Lựa chọn bác sĩ theo nhu cầu cá nhân</li>
          </ul>

          {/* Section 4 */}
          <div className="clear-both"></div>
          <SectionHeading number="04" id="thanh-toan" title="Thanh toán bằng nhiều hình thức" />

          <p className="text-justify mb-6">
            Nhiều nền tảng đặt lịch khám hiện nay đã tích hợp các phương thức thanh toán online như ví điện tử, thẻ ngân hàng, Internet Banking. Điều này giúp bạn thanh toán phí khám nhanh chóng mà không cần chuẩn bị tiền mặt.
          </p>

          {/* Section 5 */}
          <SectionHeading number="05" id="dat-cho-nguoi-than" title="Dễ dàng đặt lịch khám cho người thân" />

          <p className="text-justify mb-6">
            Đặt lịch khám online là một tính năng đặc biệt hữu ích đối với những người lớn tuổi gặp nhiều rào cản với công nghệ. Thay vì để người già phải lặn lội xếp hàng, giờ đây, mọi việc đã có bạn gánh vác. Chỉ cần vài thao tác trên điện thoại, bạn đã hoàn tất toàn bộ quy trình cho người thân.
          </p>

          {/* Section 6 */}
          <SectionHeading number="06" id="famcare" title="Đặt lịch khám online với FamCare" />

          <p className="text-justify mb-4">
            Tính năng "Đặt lịch khám" trên hệ thống y tế của FamCare mang đến trải nghiệm đặt lịch khám trực tuyến hoàn toàn khác biệt:
          </p>
          <ul className="list-disc pl-6 mb-6 space-y-2">
            <li><strong>Tìm kiếm thông minh:</strong> Lọc bác sĩ theo chuyên khoa, học vị, bệnh viện, khu vực</li>
            <li><strong>Công khai giá khám minh bạch:</strong> Biết rõ chi phí khám bệnh trước khi đặt lịch</li>
            <li><strong>Kết nối AI:</strong> Tự động nhắc nhở "Lên lịch ngay" khi hết đơn thuốc</li>
          </ul>

          {/* Section 7 */}
          <SectionHeading number="07" id="ket-luan" title="Kết luận" />

          <p className="text-justify mb-6">
            Sự phát triển của công nghệ đã giúp việc khám chữa bệnh trở nên nhanh chóng và thuận tiện hơn bao giờ hết. Hãy thử trải nghiệm FamCare ngay hôm nay để chăm sóc sức khỏe chủ động hơn cho bản thân và gia đình.
          </p>

          <div className="mt-12 pt-8 border-t border-slate-200">
            <p className="text-xs text-slate-500 text-justify mb-3">
              <em>Bài viết và hình ảnh được thực hiện bởi <strong>FamCare</strong></em>
            </p>
            <p className="text-xs text-slate-500 text-justify mb-3">
              <em><strong>Bài viết này mang tính thông tin chung và không thay thế cho lời khuyên y tế chuyên nghiệp.</strong></em>
            </p>
            <div className="border-t border-slate-200 pt-3">
              <p className="text-xs text-slate-600 font-semibold">
                FamCare – Nền tảng y tế thông minh – Chăm sóc gia đình từ xa
              </p>
              <p className="text-xs text-slate-500 mt-2">
                Website: <a href="https://famcare.site/" className="text-cyan-600 hover:text-cyan-700">https://famcare.site/</a><br />
                Email: famcare.support@gmail.com
              </p>
            </div>
          </div>

          <SocialShareButtons 
            title="Đặt Lịch Khám Trực Tuyến: Hướng Dẫn Khám Bệnh Online Hiệu Quả"
            url="https://famcare.site/resources/dat-lich-kham-truc-tuyen-online"
            description="Cách đặt lịch khám trực tuyến an toàn và tiện lợi."
          />

          {/* Related Articles */}
          <div className="mt-20 pt-16 border-t-2 border-slate-200">
            <h2 className="font-display text-2xl font-bold text-slate-900 mb-8">Bài viết liên quan</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Link to="/resources/cach-chon-bac-si-gioi-uy-tin" className="p-6 border border-slate-200 rounded-xl hover:border-cyan-400 hover:shadow-md transition-all group">
                <h3 className="font-bold text-slate-800 mb-2 group-hover:text-cyan-600 transition-colors">Bí quyết chọn bác sĩ giỏi</h3>
                <p className="text-slate-600 text-sm">Cách đọc hiểu học hàm học vị.</p>
              </Link>
              <Link to="/resources/quet-don-thuoc-ai-so-hoa-ho-so" className="p-6 border border-slate-200 rounded-xl hover:border-cyan-400 hover:shadow-md transition-all group">
                <h3 className="font-bold text-slate-800 mb-2 group-hover:text-cyan-600 transition-colors">Quản lý hồ sơ y tế bằng AI</h3>
                <p className="text-slate-600 text-sm">Số hóa hồ sơ bệnh án thông minh.</p>
              </Link>
              <Link to="/resources/cach-doc-don-thuoc-giay" className="p-6 border border-slate-200 rounded-xl hover:border-cyan-400 hover:shadow-md transition-all group">
                <h3 className="font-bold text-slate-800 mb-2 group-hover:text-cyan-600 transition-colors">Cách đọc đơn thuốc giấy</h3>
                <p className="text-slate-600 text-sm">Hiểu rõ thông tin đơn thuốc.</p>
              </Link>
              <a href="/app/appointment" className="p-6 border border-slate-200 rounded-xl hover:border-cyan-400 hover:shadow-md transition-all group">
                <h3 className="font-bold text-slate-800 mb-2 group-hover:text-cyan-600 transition-colors">📅 Đặt lịch khám</h3>
                <p className="text-slate-600 text-sm">Đặt lịch khám trực tuyến.</p>
              </a>
              <a href="/app/cabinet" className="p-6 border border-slate-200 rounded-xl hover:border-cyan-400 hover:shadow-md transition-all group">
                <h3 className="font-bold text-slate-800 mb-2 group-hover:text-cyan-600 transition-colors">✨ Tủ thuốc AI</h3>
                <p className="text-slate-600 text-sm">Quản lý sức khỏe toàn diện.</p>
              </a>
              <a href="/app/scanner" className="p-6 border border-slate-200 rounded-xl hover:border-cyan-400 hover:shadow-md transition-all group">
                <h3 className="font-bold text-slate-800 mb-2 group-hover:text-cyan-600 transition-colors">📱 Quét đơn thuốc</h3>
                <p className="text-slate-600 text-sm">Số hóa đơn thuốc tự động.</p>
              </a>
            </div>
          </div>
        </main>

        <PublicFooter />
      </div>
    </>
  );
}
