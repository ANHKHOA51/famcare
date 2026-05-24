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
  { id: "thuc-trang", text: "Thực trạng quản lý hồ sơ y tế thủ công", level: 2 },
  { id: "xu-huong", text: "Xu hướng hồ sơ y tế điện tử năm 2026", level: 3 },
  { id: "ai-doc-chu", text: "AI giải quyết vấn đề đọc \"chữ bác sĩ\"", level: 2 },
  { id: "tinh-huong", text: "Những tình huống AI trở thành \"cứu cánh\"", level: 2 },
  { id: "so-sanh", text: "So sánh lưu trữ thủ công vs AI Scanner", level: 2 },
  { id: "giai-phap", text: "FamCare: Giải pháp quản lý toàn diện", level: 2 },
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

export default function Article14Page() {
  const [activeId, setActiveId] = useState("");

  useEffect(() => {
    fetch('/api/articles/quet-don-thuoc-ai-so-hoa-ho-so/view', { method: 'POST' })
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
        <title>Quản Lý Hồ Sơ Y Tế Bằng AI: Giải Pháp Thay Thế Lưu Trữ Giấy Truyền Thống</title>
        <meta
          name="description"
          content="Tại sao nên dùng Máy quét đơn thuốc AI và Lưu trữ đơn thuốc AI để quản lý hồ sơ y tế? Khám phá giải pháp quét đơn thuốc thông minh cùng FamCare."
        />
        <meta name="keywords" content="quản lý hồ sơ y tế, quét đơn thuốc AI, lưu trữ hồ sơ bệnh án, scan đơn thuốc, số hóa hồ sơ, tệp tin bệnh án, lưu trữ y tế, hồ sơ sức khỏe" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Quét Đơn Thuốc Bằng AI: Số Hóa Hồ Sơ Y Tế Thông Minh" />
        <meta name="twitter:description" content="Giải pháp số hóa hồ sơ y tế và quét đơn thuốc tự động." />
        <meta name="twitter:image" content="https://famcare.site/bai-14/hinh1.jpg" />
        <link rel="canonical" href="https://famcare.site/resources/tai-sao-nen-dung-ai-scanner-quan-ly-ho-so-y-te" />
        <meta property="og:title" content="Quản Lý Hồ Sơ Y Tế Bằng AI: Giải Pháp Thay Thế Lưu Trữ Giấy" />
        <meta property="og:description" content="Tại sao nên dùng Máy quét đơn thuốc AI để quản lý hồ sơ y tế? Khám phá giải pháp quét đơn thuốc thông minh." />
        <meta property="og:image" content="https://famcare.site/bai-14/hinh1.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:type" content="article" />
        <meta property="og:url" content="https://famcare.site/resources/tai-sao-nen-dung-ai-scanner-quan-ly-ho-so-y-te" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": "Quản Lý Hồ Sơ Y Tế Bằng AI: Giải Pháp Thay Thế Lưu Trữ Giấy",
            "description": "Tại sao nên dùng Máy quét đơn thuốc AI để quản lý hồ sơ y tế?",
            "image": "https://famcare.site/bai-14/hinh1.jpg",
            "datePublished": "2026-05-15",
            "dateModified": "2026-05-15",
            "author": {"@type": "Organization", "name": "FamCare", "url": "https://famcare.site"},
            "publisher": {"@type": "Organization", "name": "FamCare", "logo": {"@type": "ImageObject", "url": "https://famcare.site/logo.png"}},
            "mainEntityOfPage": {"@type": "WebPage", "@id": "https://famcare.site/resources/tai-sao-nen-dung-ai-scanner-quan-ly-ho-so-y-te"}
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
              Quản Lý Hồ Sơ Y Tế Bằng AI
            </h1>
            <p className="text-justify text-[13px] text-slate-400 tracking-wide uppercase font-sans">
              Giải pháp quét đơn thuốc thông minh và số hóa hồ sơ bệnh án cùng FamCare giúp bạn quản lý sức khỏe hiệu quả.
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
          <p className="text-justify mb-6">
            Bạn đã từng mất hàng chục phút lục tung ngăn kéo chỉ để tìm lại một tờ đơn thuốc cũ khi cần tái khám? Hoặc bối rối vì không thể đọc rõ chỉ dẫn trên toa thuốc đã bị mờ mực sau vài tháng lưu trữ? Đây là vấn đề rất phổ biến của nhiều gia đình vẫn đang <strong>quản lý hồ sơ y tế</strong> bằng giấy tờ truyền thống.
          </p>
          <p className="text-justify mb-6">
            Trong xu hướng y tế số, công nghệ <strong>quét đơn thuốc thông minh</strong> đã ra đời như một giải pháp "cứu cánh" thực thụ. Hãy cùng <strong>FamCare</strong> tìm hiểu tại sao việc chuyển đổi sang <strong>Quét đơn thuốc AI</strong> không chỉ là chạy theo công nghệ, mà là cách để bạn bảo vệ sức khỏe gia đình một cách thảnh thơi, chính xác và an toàn hơn bao giờ hết.
          </p>

          {/* Section 1 */}
          <SectionHeading number="01" id="thuc-trang" title="Thực trạng quản lý hồ sơ y tế thủ công: Rào cản từ những xấp giấy tờ" />

          <p className="text-justify mb-6">
            Việc <strong>lưu trữ hồ sơ</strong> sức khỏe theo cách truyền thống từ lâu đã trở thành một gánh nặng âm thầm đối với các hộ gia đình Việt. Đơn thuốc, kết quả xét nghiệm và phim chụp thường được cất giữ rời rạc, dẫn đến tình trạng hư hỏng vật lý như ẩm mốc hoặc mờ mực in nhiệt chỉ sau một thời gian ngắn.
          </p>
          <p className="text-justify mb-6">
            Sự thiếu tính hệ thống trong <strong>quản lý hồ sơ y tế</strong> không chỉ gây khó khăn cho người nhà mà còn cản trở bác sĩ trong việc chẩn đoán dựa trên tiền sử bệnh lý. Khi bước vào kỷ nguyên số, các <strong>quy định thời hạn lưu trữ hồ sơ</strong> ngày càng được chú trọng, nhưng nếu chỉ dừng lại ở việc cất giữ giấy tờ tại nhà, dữ liệu này gần như "bị cô lập". Người dùng thường xuyên rơi vào cảnh hoảng loạn khi <strong>quản lý hồ sơ bệnh án</strong> bị thất lạc đúng lúc cần tái khám khẩn cấp, gây lãng phí thời gian và làm giảm hiệu quả điều trị.
          </p>
          <ArticleImage src="/bai-14/hinh1.jpg" alt="Quét đơn thuốc thông minh bằng AI giúp việc quản lý hồ sơ y tế trở nên đơn giản hơn" />

          <h3 id="xu-huong" className="font-display text-lg sm:text-xl font-bold text-slate-900 leading-snug mt-8 mb-3 scroll-mt-28">
            1.1 Xu hướng hồ sơ y tế điện tử và quản lý sức khỏe tại nhà năm 2026
          </h3>
          <p className="text-justify mb-6">
            Năm 2026 đánh dấu sự bùng nổ của mô hình "Chăm sóc sức khỏe tại gia". Khi hệ thống hồ sơ bệnh án điện tử quốc gia được liên thông, việc cá nhân chủ động <strong>quản lý hồ sơ sức khỏe cá nhân</strong> trở thành một phần tất yếu của cuộc sống hiện đại.
          </p>
          <p className="text-justify mb-6">
            <strong>Quét đơn thuốc AI</strong> chính là cầu nối quan trọng giúp người dân thực hiện <strong>chuyển đổi số trong quản lý hồ sơ bệnh án</strong> từ dữ liệu giấy sang dữ liệu số. Việc sử dụng <strong>ứng dụng công nghệ thông tin trong quản lý y tế</strong> lúc này không còn là một lựa chọn xa xỉ, mà là công cụ để bạn kết nối trực tiếp với các dịch vụ Telemedicine và bác sĩ gia đình một cách nhanh chóng, minh bạch nhất.
          </p>
          <ArticleImage src="/bai-14/hinh2.jpg" alt="Thất lạc đơn thuốc giấy có thể gây ra hoảng loạn và làm giảm hiệu quả điều trị" />

          <h3 className="font-display text-lg sm:text-xl font-bold text-slate-900 leading-snug mt-8 mb-3">
            1.2 AI có thể hỗ trợ như thế nào trong việc đọc "chữ bác sĩ"?
          </h3>
          <p className="text-justify mb-6">
            Một trong những nỗi lo lớn nhất khi <strong>quản lý hồ sơ bệnh án</strong> giấy là tình trạng chữ viết tay khó đọc. Trước đây, việc số hóa thủ công đòi hỏi người dùng phải tự gõ lại từng tên thuốc, dẫn đến rủi ro sai sót về hàm lượng cực kỳ nguy hiểm.
          </p>
          <p className="text-justify mb-6">
            Hiện nay, công nghệ <strong>nhận diện và đọc chính xác đơn thuốc viết tay</strong> đã giải quyết triệt để bài toán này. Bằng cách sử dụng các thuật toán trí tuệ nhân tạo, <strong>Quét đơn thuốc AI</strong> có khả năng hỗ trợ nhận diện chữ viết tay và trích xuất thông tin nhanh chóng, chính xác hơn nhiều so với nhập liệu thủ công. Điều này không chỉ giúp <strong>quản lý hồ sơ y tế</strong> hiệu quả mà còn đóng vai trò như một bộ lọc an toàn, giúp bạn hiểu rõ từng chỉ dẫn phức tạp của bác sĩ trước khi sử dụng thuốc.
          </p>

          {/* Section 2 */}
          <SectionHeading number="02" id="ai-doc-chu" title="Những tình huống Quét đơn thuốc AI trở thành &quot;cứu cánh&quot; trong đời sống hằng ngày" />

          <p className="text-justify mb-6">
            Việc sử dụng một <strong>app lưu đơn thuốc</strong> tích hợp AI không chỉ đơn thuần là lưu trữ ảnh, mà là tạo ra một quy trình chăm sóc sức khỏe thông minh trong các tình huống thực tế:
          </p>

          {/* Section 3 */}
          <div className="clear-both"></div>
          <SectionHeading number="03" id="tinh-huong" title="So sánh hiệu quả giữa lưu trữ thủ công và Quét đơn thuốc AI" />

          <p className="text-justify mb-6">
            Để thấy rõ tại sao bạn nên thực hiện <strong>chuyển đổi số trong quản lý hồ sơ bệnh án</strong> ngay hôm nay, hãy cùng xem bảng so sánh dưới đây:
          </p>

          <ul className="list-disc pl-6 mb-6 space-y-3">
            <li><strong>Tìm đơn thuốc cũ khi tái khám:</strong> Thay vì mang theo một xấp hồ sơ cồng kềnh, bạn chỉ cần mở <a href="/app/cabinet" className="text-cyan-600 hover:text-cyan-700 underline">app quản lý hồ sơ bệnh án</a> và tìm kiếm theo ngày hoặc tên bệnh để hiện ra ngay lịch sử điều trị cho bác sĩ đối soát.</li>
            <li><strong>Quản lý thuốc cho người già:</strong> Với các đơn thuốc viết tay dài, quét đơn thuốc bằng AI giúp chuyển đổi thành danh sách số rõ ràng, tự động nhắc lịch uống thuốc, giúp con cái an tâm dù không ở cạnh cha mẹ.</li>
            <li><strong>Lưu lịch sử bệnh của trẻ nhỏ:</strong> Mọi đợt ốm, loại kháng sinh con từng dùng đều được <a href="/app/cabinet" className="text-cyan-600 hover:text-cyan-700 underline">lưu hồ sơ y tế online</a> vĩnh viễn, giúp theo dõi biểu đồ phát triển và tránh rủi ro dị ứng thuốc trong tương lai.</li>
            <li><strong>Chia sẻ hồ sơ cho bác sĩ:</strong> Trong các buổi tư vấn sức khỏe từ xa, việc gửi một bản quét sạch sẽ, rõ ràng qua ứng dụng sẽ giúp bác sĩ đưa ra chẩn đoán chính xác hơn so với việc gửi ảnh chụp mờ nhòe.</li>
          </ul>
          <ArticleImage src="/bai-14/hinh3.jpg" alt="Nhiều người gặp khó khăn với đơn thuốc giấy tại bệnh viện (Hinh minh họa)" />

          {/* Section 4 */}
          <SectionHeading number="04" id="so-sanh" title="So sánh hiệu quả giữa lưu trữ thủ công và Quét đơn thuốc AI" />

          <div className="overflow-x-auto mb-6">
            <table className="w-full border-collapse border border-slate-300 text-sm">
              <thead className="bg-slate-100">
                <tr>
                  <th className="border border-slate-300 p-3 text-left">Tiêu chí</th>
                  <th className="border border-slate-300 p-3 text-left">Lưu trữ hồ sơ thủ công (Giấy tờ)</th>
                  <th className="border border-slate-300 p-3 text-left">Quản lý bằng AI Scanner (FamCare)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-slate-300 p-3 font-semibold">Độ bền thông tin</td>
                  <td className="border border-slate-300 p-3">Dễ rách, ẩm mốc, mờ mực theo thời gian</td>
                  <td className="border border-slate-300 p-3">Lưu trữ vĩnh viễn trên đám mây, rõ nét</td>
                </tr>
                <tr className="bg-slate-50/50">
                  <td className="border border-slate-300 p-3 font-semibold">Độ chính xác</td>
                  <td className="border border-slate-300 p-3">Dễ sai sót khi tự đọc chữ viết tay</td>
                  <td className="border border-slate-300 p-3">Giảm tối đa sai sót nhập liệu thủ công</td>
                </tr>
                <tr>
                  <td className="border border-slate-300 p-3 font-semibold">Tính nhắc nhở</td>
                  <td className="border border-slate-300 p-3">Người dùng tự ghi nhớ lịch uống thuốc</td>
                  <td className="border border-slate-300 p-3">Tự động nhắc lịch dựa trên đơn đã quét</td>
                </tr>
                <tr className="bg-slate-50/50">
                  <td className="border border-slate-300 p-3 font-semibold">Tính di động</td>
                  <td className="border border-slate-300 p-3">Cồng kềnh, khó mang theo khi đi xa</td>
                  <td className="border border-slate-300 p-3">Luôn sẵn sàng trên điện thoại cá nhân</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Section 5 */}
          <SectionHeading number="05" id="giai-phap" title="FamCare: Lưu đơn thuốc và quản lý y tế thông minh cho mọi nhà" />

          <p className="text-justify mb-6">
            Giữa vô vàn lựa chọn, <strong>FamCare</strong> nổi bật như một giải pháp <strong>quản lý hồ sơ y tế</strong> toàn diện dành riêng cho gia đình Việt với các tính năng:
          </p>

          <ul className="list-disc pl-6 mb-6 space-y-2 text-justify">
            <li><strong>Quét đơn thuốc thông minh:</strong> Tích hợp AI Scanner tiên tiến để nhận diện và đọc chính xác đơn thuốc viết tay, giúp số hóa đơn thuốc chỉ trong vài giây.</li>
            <li><strong>Lưu hồ sơ y tế online tập trung:</strong> Mọi dữ liệu từ đơn thuốc đến kết quả xét nghiệm được lưu trữ khoa học theo từng thành viên trong Hồ sơ gia đình.</li>
            <li><strong>Tương tác thông minh:</strong> Dựa trên dữ liệu đã quét, FamCare cung cấp các cảnh báo về tương tác thuốc và thực phẩm, giúp hành trình chăm sóc sức khỏe trở nên thảnh thơi và an toàn tuyệt đối.</li>
          </ul>

          {/* Section 6 */}
          <SectionHeading number="06" id="ket-bai" title="Kết bài" />

          <p className="text-justify mb-6">
            Tóm lại, việc chuyển từ <strong>lưu trữ hồ sơ</strong> thủ công sang sử dụng <strong>Quét đơn thuốc AI</strong> không chỉ là xu hướng, mà là hành động thiết thực để bảo vệ sức khỏe và sự an tâm của những người thân yêu. Một hệ thống <strong>quản lý hồ sơ y tế</strong> minh bạch và dễ dàng tra cứu chính là nền tảng của một cuộc sống chất lượng năm 2026. Hãy để công nghệ <strong>quét đơn thuốc thông minh</strong> của <strong>FamCare</strong> thay bạn quản lý những con số và thuật ngữ phức tạp ngay tại: <a href="https://famcare.site/app/cabinet" className="text-cyan-600 hover:text-cyan-700 underline">https://famcare.site/app/cabinet</a>
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
            title="Quét Đơn Thuốc Bằng AI: Số Hóa Hồ Sơ Y Tế Thông Minh"
            url="https://famcare.site/resources/quet-don-thuoc-ai-so-hoa-ho-so"
            description="Giải pháp số hóa hồ sơ y tế và quét đơn thuốc tự động."
          />

          {/* Related Articles */}
          <div className="mt-20 pt-16 border-t-2 border-slate-200">
            <h2 className="font-display text-2xl font-bold text-slate-900 mb-8">Bài viết liên quan</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Link to="/resources/quen-ten-thuoc-cu-ai-famcare" className="p-6 border border-slate-200 rounded-xl hover:border-cyan-400 hover:shadow-md transition-all group">
                <h3 className="font-bold text-slate-800 mb-2 group-hover:text-cyan-600 transition-colors">Quên tên thuốc cũ? Tra cứu theo triệu chứng</h3>
                <p className="text-slate-600 text-sm">Tìm lại tên thuốc bằng AI.</p>
              </Link>
              <Link to="/resources/cach-doc-don-thuoc-giay" className="p-6 border border-slate-200 rounded-xl hover:border-cyan-400 hover:shadow-md transition-all group">
                <h3 className="font-bold text-slate-800 mb-2 group-hover:text-cyan-600 transition-colors">Cách đọc đơn thuốc giấy</h3>
                <p className="text-slate-600 text-sm">Đọc đơn thuốc chuẩn xác.</p>
              </Link>
              <Link to="/resources/lua-chon-thuc-pham-dung-de-phat-huy-tac-dung-thuoc" className="p-6 border border-slate-200 rounded-xl hover:border-cyan-400 hover:shadow-md transition-all group">
                <h3 className="font-bold text-slate-800 mb-2 group-hover:text-cyan-600 transition-colors">Lựa chọn thực phẩm đúng</h3>
                <p className="text-slate-600 text-sm">Tương tác thực phẩm-thuốc.</p>
              </Link>
              <a href="/app/cabinet" className="p-6 border border-slate-200 rounded-xl hover:border-cyan-400 hover:shadow-md transition-all group">
                <h3 className="font-bold text-slate-800 mb-2 group-hover:text-cyan-600 transition-colors">✨ Tủ thuốc AI</h3>
                <p className="text-slate-600 text-sm">Quản lý thông minh hồ sơ.</p>
              </a>
              <a href="/app/scanner" className="p-6 border border-slate-200 rounded-xl hover:border-cyan-400 hover:shadow-md transition-all group">
                <h3 className="font-bold text-slate-800 mb-2 group-hover:text-cyan-600 transition-colors">📱 Quét đơn thuốc AI</h3>
                <p className="text-slate-600 text-sm">Số hóa đơn thuốc giấy.</p>
              </a>
              <a href="/app/meal-plan" className="p-6 border border-slate-200 rounded-xl hover:border-cyan-400 hover:shadow-md transition-all group">
                <h3 className="font-bold text-slate-800 mb-2 group-hover:text-cyan-600 transition-colors">🍽️ Thực đơn AI</h3>
                <p className="text-slate-600 text-sm">Thiết kế thực đơn.</p>
              </a>
            </div>
          </div>
        </main>

        <PublicFooter />
      </div>
    </>
  );
}
