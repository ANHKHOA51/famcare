import React, { useEffect, useState } from 'react';
import PublicNavbar from "@/components/PublicNavbar";
import PublicFooter from "@/components/PublicFooter";
import { Link } from "react-router-dom";
import { List } from "lucide-react";
import { Helmet } from 'react-helmet-async';
import SocialShareButtons from '@/components/SocialShareButtons';

interface TocItem {
  id: string;
  text: string;
  level: number;
}

const tocItems: TocItem[] = [
  { id: "tai-sao", text: "Tại sao cần thấu hiểu học hàm học vị?", level: 2 },
  { id: "phan-biet", text: "Phân biệt hai nhánh đào tạo y khoa", level: 3 },
  { id: "noi-tru", text: "Ý nghĩa của Bác Sĩ Nội Trú (BSNT)", level: 2 },
  { id: "hoc-ham", text: "Học hàm cao cấp: GS và PGS", level: 2 },
  { id: "lua-chon", text: "Lựa chọn bác sĩ chuẩn xác cho gia đình", level: 2 },
  { id: "ket-noi", text: "Kết nối chuyên gia thông minh cùng FamCare", level: 2 },
  { id: "ket-bai", text: "Kết bài", level: 2 },
];

const ArticleImage = ({ src, alt }: { src: string; alt: string }) => (
  <figure className="my-10 flex flex-col items-center">
    <img
      src={src}
      alt={alt}
      className="w-full max-w-3xl rounded-xl shadow-md border border-slate-200/60 object-cover"
      loading="lazy"
    />
    <figcaption className="mt-3 text-sm text-slate-500 font-body italic text-center px-4">
      {alt}
    </figcaption>
  </figure>
);

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

export default function Article17Page() {
  const [activeId, setActiveId] = useState("");

  useEffect(() => {
    fetch('/api/articles/cach-chon-bac-si-gioi-uy-tin/view', { method: 'POST' })
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
        <title>Bí Quyết Chọn Bác Sĩ Giỏi: Cách Đọc Hiểu Học Hàm Học Vị Và Kinh Nghiệm Chuyên Môn</title>
        <meta
          name="description"
          content="Làm sao để chọn bác sĩ giỏi cho gia đình? Khám phá cách đọc hiểu học hàm học vị y khoa chuẩn xác và kết nối chuyên gia uy tín cùng FamCare."
        />
        <meta name="keywords" content="chọn bác sĩ giỏi, học hàm học vị, bác sĩ chuyên khoa, bác sĩ uy tín, cách chọn bác sĩ, bác sĩ giỏi, kinh nghiệm bác sĩ, chuyên gia y tế" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Cách Chọn Bác Sĩ Giỏi: Hướng Dẫn Tìm Bác Sĩ Uy Tín" />
        <meta name="twitter:description" content="Mẹo chọn bác sĩ uy tín và giỏi cho gia đình." />
        <meta name="twitter:image" content="https://famcare.site/bai-17/hinh1.jpg" />
        <link rel="canonical" href="https://famcare.site/resources/bi-quyet-chon-bac-si-gioi-doc-hieu-hoc-ham-hoc-vi" />
        <meta property="og:title" content="Bí Quyết Chọn Bác Sĩ Giỏi: Cách Đọc Hiểu Học Hàm Học Vị" />
        <meta property="og:description" content="Làm sao để chọn bác sĩ giỏi? Khám phá cách đọc hiểu học hàm học vị y khoa." />
        <meta property="og:image" content="https://famcare.site/bai-17/hinh1.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:type" content="article" />
        <meta property="og:url" content="https://famcare.site/resources/bi-quyet-chon-bac-si-gioi-doc-hieu-hoc-ham-hoc-vi" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": "Bí Quyết Chọn Bác Sĩ Giỏi: Cách Đọc Hiểu Học Hàm Học Vị Y Khoa",
            "description": "Làm sao để chọn bác sĩ giỏi? Khám phá cách đọc hiểu học hàm học vị y khoa.",
            "image": "https://famcare.site/bai-17/hinh1.jpg",
            "datePublished": "2026-05-15",
            "dateModified": "2026-05-15",
            "author": {"@type": "Organization", "name": "FamCare", "url": "https://famcare.site"},
            "publisher": {"@type": "Organization", "name": "FamCare", "logo": {"@type": "ImageObject", "url": "https://famcare.site/logo.png"}},
            "mainEntityOfPage": {"@type": "WebPage", "@id": "https://famcare.site/resources/bi-quyet-chon-bac-si-gioi-doc-hieu-hoc-ham-hoc-vi"}
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
              Bí Quyết Chọn Bác Sĩ Giỏi
            </h1>
            <p className="text-justify text-[13px] text-slate-400 tracking-wide uppercase font-sans">
              Cách đọc hiểu học hàm học vị y khoa chuẩn xác để chọn bác sĩ phù hợp cho gia đình.
            </p>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-800 via-cyan-500 to-blue-700 opacity-90"></div>
        </header>

        <main className="px-4 sm:px-8 lg:px-16 py-10 max-w-[860px] mx-auto text-[1.125rem] text-slate-800 leading-[1.85] font-light">

          {/* Table of Contents */}
          <nav className="bg-white/60 backdrop-blur rounded-xl p-6 mb-14 border border-cyan-100 shadow-sm float-none md:float-right md:ml-8 md:mb-8 md:w-64 font-sans text-sm">
            <div className="flex items-center gap-2 mb-4">
              <List size={16} className="text-cyan-600" />
              <span className="font-bold text-slate-900 uppercase tracking-widest text-xs">Mục lục nhanh</span>
            </div>
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

          {/* Intro */}
          <div className="mb-14">
            <p className="text-justify text-base leading-relaxed text-slate-700 italic">
              Khi đối mặt với các vấn đề sức khỏe, việc tìm kiếm và chọn bác sĩ có năng lực phù hợp luôn là trăn trở hàng đầu của mọi gia đình. Tuy nhiên, trước hàng loạt thông tin về học hàm học vị như GS, PGS, TS, ThS, BSCKII, nhiều người bệnh thường rơi vào trạng thái mơ hồ, không biết đâu mới là chuyên gia tối ưu cho tình trạng của mình. Hiểu rõ các ký hiệu y khoa này chính là chìa khóa để đưa ra quyết định điều trị chính xác, an toàn. Hãy cùng FamCare giải mã hệ thống danh hiệu ngành y và bỏ túi các tiêu chí lựa chọn bác sĩ chuẩn chuyên môn ngay hôm nay!
            </p>
          </div>

          {/* Section 1 */}
          <SectionHeading number="01" id="tai-sao" title="Tại sao cần thấu hiểu học hàm học vị khi tiến hành chọn bác sĩ điều trị?" />

          <p className="text-justify mb-6">
            Một số lượng lớn người bệnh tại Việt Nam hiện nay khi đi khám thường có thói quen tìm kiếm các cụm từ như "top bác sĩ giỏi" một cách cảm tính mà chưa thực sự hiểu rõ năng lực cốt lõi của người điều trị. Việc chỉ nhìn vào số lượng danh hiệu đứng trước tên bác sĩ mà không phân biệt được ý nghĩa y khoa của chúng dễ dẫn đến hai sai lầm phổ biến: Hoặc là chọn quá tầm, hoặc là chọn sai chuyên khoa sâu khiến bệnh tình kéo dài dai dẳng.
          </p>
          <p className="text-justify mb-6">
            Trong ngành y, học hàm học vị không đơn thuần là những tấm bằng khen trang trí, mà là thước đo chuẩn xác phản ánh con đường phát triển chuyên môn của một bác sĩ uy tín. Học vị phân định rõ ràng giữa một chuyên gia thuần nghiên cứu lý thuyết, giảng dạy và một chuyên gia thực hành lâm sàng trực tiếp trên người bệnh. Việc trang bị cho mình tư duy thấu cảm và kiến thức nền tảng về hệ thống cấp bậc này là bước đi đầu tiên trong bộ tiêu chí lựa chọn bác sĩ chuẩn xác, bảo vệ gia đình khỏi những rủi ro y khoa không đáng có.
          </p>

          <div className="bg-amber-50/80 border border-amber-200 border-l-4 border-l-amber-600 p-6 rounded-r-xl my-10">
            <div className="font-sans text-[11px] font-bold tracking-[0.2em] uppercase text-amber-700 mb-2">⚠️ Lưu ý</div>
            <p className="text-justify text-[0.95rem] text-amber-900 m-0 leading-relaxed font-sans">
              Mọi danh hiệu y khoa đều quý giá, tuy nhiên mức độ phù hợp của bác sĩ phụ thuộc hoàn toàn vào giai đoạn bệnh và thể trạng lâm sàng của từng cá nhân. Hãy luôn kết hợp việc đọc hồ sơ bác sĩ với việc theo dõi sát sao phản ứng điều trị thực tế.
            </p>
          </div>

          <ArticleImage src="/bai-17/hinh1.jpg" alt="Việc thấu hiểu học hàm học vị giúp người bệnh chủ động chọn bác sĩ giỏi và phù hợp với phác đồ điều trị." />

          <h3 id="phan-biet" className="font-display text-lg sm:text-xl font-bold text-slate-900 leading-snug mt-8 mb-3 scroll-mt-28">
            Phân biệt hệ thống học vị y khoa: Nghiên cứu và Lâm sàng thực hành
          </h3>
          <p className="text-justify mb-6">
            Để biết làm thế nào để chọn bác sĩ chuyên khoa đúng, trước hết người bệnh cần phân biệt được hai nhánh đào tạo lớn của hệ thống học vị y khoa: Nhánh Học thuật (Nghiên cứu/Giảng dạy) và Nhánh Lâm sàng (Điều trị thực hành).
          </p>
          <ul className="list-disc pl-6 mb-6 space-y-2 text-justify">
            <li><strong>Nhánh Học thuật (Thạc sĩ - ThS, Tiến sĩ - TS):</strong> Đây là những bác sĩ tập trung sâu vào công tác nghiên cứu khoa học, tìm ra các phương pháp điều trị mới hoặc tham gia giảng dạy tại các trường đại học y danh tiếng. Một Tiến sĩ y khoa (TS) sở hữu tư duy hệ thống và kiến thức lý thuyết cực kỳ sâu rộng.</li>
            <li><strong>Nhánh Lâm sàng (Bác sĩ Chuyên khoa 1 - BSCKI, Bác sĩ Chuyên khoa 2 - BSCKII):</strong> Đây là hệ thống đào tạo đặc thù của ngành y, tập trung 100% vào kỹ năng thực hành, chẩn đoán và phẫu thuật trực tiếp trên bệnh nhân tại bệnh viện.</li>
          </ul>
          <p className="text-justify mb-6">
            Vậy cụ thể bác sĩ và bác sĩ chuyên khoa 1 khác nhau như thế nào? Một bác sĩ thông thường (BS) sau khi tốt nghiệp đại học 6 năm cần trải qua quá trình thực hành và học nâng cao dài hạn về một chuyên ngành cụ thể (như Nội, Ngoại, Sản, Nhi) mới được cấp bằng BSCKI. Do đó, nếu bạn cần một chuyên gia có "bàn tay vàng" trong phẫu thuật hoặc xử lý các ca bệnh lâm sàng phức tạp, các bác sĩ có học vị BSCKI hoặc BSCKII chính là những sự lựa chọn hàng đầu.
          </p>
          <ArticleImage src="/bai-17/hinh2.jpg" alt="Mọi tấm bằng y khoa đều quý giá" />

          <h3 id="noi-tru" className="font-display text-lg sm:text-xl font-bold text-slate-900 leading-snug mt-8 mb-3 scroll-mt-28">
            Ý nghĩa của Bác sĩ nội trú và các Học hàm cao cấp (Giáo sư, Phó giáo sư)
          </h3>

          <p className="text-justify mb-6">
            Một khái niệm khác thường xuất hiện trong hồ sơ của các bác sĩ uy tín là danh hiệu bác sĩ nội trú (BSNT). Đây được mệnh danh là "chứng chỉ vàng" của ngành y. Chỉ những sinh viên y khoa tốt nghiệp loại giỏi và xuất sắc mới được thi nội trú, và họ phải học tập, làm việc liên tục tại bệnh viện 24/7 trong suốt 3 năm. Một bác sĩ nội trú thường có chuyên môn lâm sàng cực kỳ vững chắc và nhạy bén với các tình huống cấp cứu.
          </p>
          <ArticleImage src="/bai-17/hinh3.jpg" alt="Các bác sĩ nội trú tại bệnh viện" />

          <p className="text-justify mb-6 mt-6">
            Khi các tiến sĩ (TS) hoặc bác sĩ chuyên khoa 2 (BSCKII) có nhiều đóng góp lớn cho khoa học, có nhiều công trình nghiên cứu được quốc tế công nhận và tham gia giảng dạy lâu năm, họ sẽ được nhà nước phong học hàm Giáo sư (GS) hoặc Phó giáo sư (PGS). Việc tìm đến các GS, PGS hay các chuyên gia thuộc danh sách top bác sĩ giỏi là vô cùng cần thiết khi bạn gặp phải các căn bệnh hiếm gặp, các ca bệnh hiểm nghèo cần hội chẩn liên chuyên khoa để tìm ra phác đồ đột phá.
          </p>

          {/* Section 2 */}
          <div className="clear-both"></div>
          <SectionHeading number="02" id="lua-chon" title="Lựa chọn bác sĩ chuẩn xác cho gia đình bạn" />

          <p className="text-justify mb-6">
            Hiểu rõ lý thuyết là một chuyện, nhưng ứng dụng vào thực tế để chọn bác sĩ lại cần một bộ lọc có cấu trúc rõ ràng. Không có một người bác sĩ giỏi nhất cho mọi căn bệnh, chỉ có người bác sĩ phù hợp nhất với tình trạng hiện tại của người bệnh.
          </p>
          <p className="text-justify mb-6">
            Khi đã xác định được nhóm danh hiệu cần tìm, bước tiếp theo để biết làm thế nào để chọn bác sĩ chuyên khoa đúng là đánh giá thâm niên công tác. Số năm kinh nghiệm làm việc tại các bệnh viện tuyến đầu (như Chợ Rẫy, Đại học Y Dược, Bạch Mai) luôn là một bảo chứng vững chắc cho năng lực phản xạ lâm sàng của bác sĩ.
          </p>

          {/* Section 3 */}
          <div className="clear-both"></div>
          <SectionHeading number="03" id="ket-noi" title="Kết nối chuyên gia và quản lý hồ sơ y tế thảnh thơi cùng FamCare" />

          <p className="text-justify mb-6">
            Việc tự mình tra cứu hồ sơ, xác thực thông tin học hàm học vị của hàng trăm bác sĩ giữa các chuyên khoa khác nhau là một thách thức lớn, dễ làm người bệnh quá tải. Trong kỷ nguyên y tế số 2026, FamCare ra đời như một giải pháp kết nối thông minh, giúp bạn xóa bỏ hoàn toàn rào cản này.
          </p>
          <p className="text-justify mb-6">
            Thông qua nền tảng của FamCare, người dùng không chỉ dễ dàng tìm thấy danh sách các bác sĩ uy tín được phân loại minh bạch theo học vị, thâm niên và chuyên khoa sâu, mà còn có thể đặt lịch tư vấn từ xa (Telemedicine) một cách nhanh chóng.
          </p>
          <p className="text-justify mb-6">
            Đặc biệt, hệ thống Hồ sơ gia đình của FamCare cho phép bạn lưu trữ toàn bộ lịch sử bệnh án, đơn thuốc đã số hóa qua AI. Trước mỗi buổi khám, các dữ liệu này sẽ được liên thông trực tiếp đến bác sĩ mà bạn đã tin tưởng lựa chọn. Điều này giúp các bác sĩ chuyên khoa nắm bắt trọn vẹn tiến trình bệnh lý của bạn từ quá khứ đến hiện tại, loại bỏ tình trạng khai báo sai sót, từ đó đưa ra phác đồ điều trị cá nhân hóa chính xác và an toàn tuyệt đối cho người thân của bạn.
          </p>

          {/* Section 4 */}
          <div className="clear-both"></div>
          <SectionHeading number="04" id="ket-bai" title="Kết bài" />

          <p className="text-justify mb-6">
            Tóm lại, việc chủ động trang bị bộ tiêu chí lựa chọn bác sĩ dựa trên cách đọc hiểu học hàm học vị và kinh nghiệm lâm sàng là bước đi chiến lược để bảo vệ sức khỏe bền vững cho cả gia đình. Hãy là một người bệnh thông thái, biết cách chọn bác sĩ phù hợp để tối ưu hóa thời gian và chi phí điều trị.
          </p>
          <p className="text-justify mb-6">
            Đừng để hành trình đi tìm kiếm sự chữa lành trở thành nỗi lo toan, mệt mỏi. Hãy để ứng dụng thông minh của FamCare đồng hành cùng bạn, giúp việc kết nối với các chuyên gia đầu ngành và quản lý hồ sơ sức khỏe trở nên thảnh thơi, khoa học hơn bao giờ hết ngay tại: <a href="https://famcare.site/app/appointment" className="text-cyan-600 hover:text-cyan-700 underline">https://famcare.site/app/appointment</a>
          </p>

          <div className="mt-12 pt-8 border-t border-slate-200">
            <p className="text-xs text-slate-500 text-justify mb-3">
              <em>Bài viết và hình ảnh được thực hiện bởi <strong>FamCare</strong></em>
            </p>
            <p className="text-xs text-slate-500 text-justify mb-3">
              <em><strong>Bài viết này mang tính thông tin chung và không thay thế cho lời khuyên y tế chuyên nghiệp. Hãy luôn tham khảo bác sĩ hoặc dược sĩ về cách xử lý liều thuốc cụ thể của bạn.</strong></em>
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
            title="Cách Chọn Bác Sĩ Giỏi: Hướng Dẫn Tìm Bác Sĩ Uy Tín"
            url="https://famcare.site/resources/cach-chon-bac-si-gioi-uy-tin"
            description="Mẹo chọn bác sĩ uy tín và giỏi cho gia đình."
          />

          {/* Related Articles */}
          <div className="mt-20 pt-16 border-t-2 border-slate-200">
            <h2 className="font-display text-2xl font-bold text-slate-900 mb-8">Bài viết liên quan</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Link to="/resources/dat-lich-kham-truc-tuyen-online" className="p-6 border border-slate-200 rounded-xl hover:border-cyan-400 hover:shadow-md transition-all group">
                <h3 className="font-bold text-slate-800 mb-2 group-hover:text-cyan-600 transition-colors">5 Lợi ích đặt lịch khám trực tuyến</h3>
                <p className="text-slate-600 text-sm">Tiết kiệm thời gian, chủ động lịch.</p>
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
                <p className="text-slate-600 text-sm">Kết nối bác sĩ uy tín.</p>
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
