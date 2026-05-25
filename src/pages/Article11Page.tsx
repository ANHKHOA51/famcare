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
  { id: "rui-ro", text: "Rủi ro của việc quên tên thuốc cũ", level: 2 },
  { id: "nhom-nguoi", text: "Những nhóm người dễ quên tên thuốc nhất", level: 3 },
  { id: "cach-truy-van", text: "Cách truy vấn tên thuốc cũ nhanh nhất", level: 2 },
  { id: "xem-benh-an", text: "Xem lại bệnh án hoặc đơn thuốc cũ", level: 3 },
  { id: "lien-he-duoc-si", text: "Liên hệ với dược sĩ tại nhà thuốc cũ", level: 3 },
  { id: "su-dung-ai", text: "Sử dụng AI FamCare để truy vấn", level: 3 },
  { id: "ket-luan", text: "Kết luận", level: 2 },
];

const ArticleImage = ({ src, alt }: { src: string; alt: string }) => (
  <figure className="my-10 flex flex-col items-center">
    <img
      src={src}
      alt={alt}
      className="w-full max-w-3xl rounded-xl shadow-md border border-slate-200/60 object-cover"
      loading="lazy"
    />
    <figcaption className="mt-3 text-sm text-slate-500 font-body italic">
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

export default function Article11Page() {
  const [activeId, setActiveId] = useState("");

  useEffect(() => {
    fetch('/api/articles/quen-ten-thuoc-cu-ai-famcare/view', { method: 'POST' })
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
        <title>Quên tên thuốc cũ? Cách tra cứu dược phẩm theo triệu chứng cực nhanh với AI FamCare</title>
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
        <meta property="og:title" content="Quên tên thuốc cũ? Cách tra cứu dược phẩm theo triệu chứng cực nhanh với AI FamCare" />
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
              Quên tên thuốc cũ là tình huống thường xuất hiện trong cuộc sống, đặc biệt đối với những người từng điều trị bệnh theo đợt hay người phải sử dụng nhiều loại thuốc điều trị trong ngày. Việc quên tên thuốc không chỉ đem lại bất tiện trong cuộc sống mà còn tăng rủi ro cho sức khỏe khi người bệnh bị gián đoạn trị liệu, giảm hiệu quả điều trị. Trong bài viết này, hãy để FamCare hướng dẫn cách bạn xử lý và phòng tránh trường hợp này nhé!
            </p>
          </div>

          {/* Section 1 */}
          <SectionHeading number="01" id="rui-ro" title="Rủi ro của việc quên tên thuốc cũ" />

          <p className="text-justify mb-6">
            Việc quên tên loại thuốc từng sử dụng tiềm ẩn nhiều hệ lụy nghiêm trọng, trực tiếp đe dọa đến hiệu quả điều trị và an toàn tính mạng của người bệnh. Rủi ro phổ biến nhất chính là việc <strong>mua nhầm thuốc</strong> dựa trên những <strong>mô tả cảm tính về màu sắc hay bao bì</strong>, khiến người bệnh dễ <strong>dùng sai hoạt chất hoặc vô tình nạp vào cơ thể các thành phần từng gây dị ứng</strong>, dẫn đến các triệu chứng từ nổi mẩn đỏ, khó thở cho đến sốc phản vệ nguy hiểm.
          </p>

          <ArticleImage src="/bai-11/hinh1.jpg" alt="Quên thuốc cũ tiềm ẩn nhiều hệ lụy nghiêm trọng" />

          <p className="text-justify mb-6">
            Đặc biệt đối với <strong>người cao tuổi hoặc người có bệnh nền</strong>, việc không nhớ rõ tên thuốc cũ có thể gây ra những tương tác thuốc bất lợi khi dùng chung với các loại thuốc hiện tại, làm gia tăng độc tính lên gan, thận và hệ tim mạch. Tình trạng này không chỉ gây gián đoạn liệu trình, khiến bệnh tình kéo dài do dùng sai liều lượng, mà còn tạo ra gánh nặng về chi phí và thời gian khi người bệnh buộc phải thực hiện lại các xét nghiệm hoặc thăm khám từ đầu để xác định lại phác đồ.
          </p>

          <p className="text-justify mb-6">
            Không chỉ vậy, việc quên tên thuốc còn khiến quá trình điều trị bị gián đoạn. Người bệnh có thể dùng <strong>sai liều lượng, bỏ lỡ thời gian uống thuốc</strong> hoặc phải bắt đầu lại từ đầu do không xác định được loại thuốc phù hợp. Điều này làm kéo dài thời gian hồi phục, gia tăng chi phí khám chữa bệnh và tạo áp lực tâm lý không nhỏ cho cả bệnh nhân lẫn người thân.
          </p>

          <p className="text-justify mb-6">
            Hơn nữa, việc không lưu lại thông tin thuốc hoặc quên tên thuốc cũ còn khiến người dùng gặp <strong>khó khăn trong việc theo dõi lịch sử điều trị</strong> của bản thân. Người bệnh có thể không nhớ mình từng mắc bệnh gì, đã sử dụng loại thuốc nào, liều lượng ra sao hoặc thuốc nào từng mang lại hiệu quả tốt nhất. Điều này không chỉ làm gián đoạn quá trình chăm sóc sức khỏe cá nhân mà còn gây khó khăn cho bác sĩ trong những lần tái khám.
          </p>

          <p className="text-justify mb-6">
            Khi không có đầy đủ lịch sử dùng thuốc, bác sĩ sẽ khó có cái nhìn toàn diện về tình trạng sức khỏe, <strong>nguy cơ dị ứng, các bệnh lý đã điều trị hoặc những loại thuốc bệnh nhân đang sử dụng</strong>. Từ đó, việc đưa ra chẩn đoán và phác đồ điều trị phù hợp cũng có thể mất nhiều thời gian hơn và tiềm ẩn nguy cơ sai sót không mong muốn.
          </p>

          {/* Section 2 */}
          <div className="clear-both"></div>
          <SectionHeading number="02" id="nhom-nguoi" title="Những nhóm người dễ quên tên thuốc nhất" />

          <p className="text-justify mb-6">
            Trong thực tế, bất kỳ ai cũng có thể rơi vào tình trạng quên tên thuốc cũ. Tuy nhiên, thực tế cho thấy một số <strong>nhóm đối tượng có nguy cơ nhầm lẫn cao hơn hẳn</strong>.
          </p>

          <ArticleImage src="/bai-11/hinh2.jpg" alt="Người lớn tuổi là một trong những đối tượng hay quên tên thuốc nhất" />

          <p className="text-justify mb-4">
            Việc nhận diện các nhóm này sẽ giúp người thân chủ động hơn trong việc giám sát và hỗ trợ điều trị:
          </p>

          <ul className="list-disc pl-6 mb-6 space-y-2">
            <li>Người lớn tuổi phải sử dụng nhiều loại thuốc mỗi ngày</li>
            <li>Người điều trị bệnh mãn tính như huyết áp, tiểu đường, tim mạch</li>
            <li>Người từng điều trị bệnh theo đợt nhưng lâu ngày không tái sử dụng thuốc</li>
            <li>Phụ huynh chăm sóc sức khỏe cho cả gia đình nên khó nhớ toàn bộ tên thuốc của từng thành viên</li>
            <li>Người có thói quen giữ thuốc nhưng không lưu lại toa hoặc hướng dẫn sử dụng</li>
          </ul>

          <p className="text-justify mb-6">
            Đặc biệt, trong thời đại hiện nay, nhiều người có xu hướng tự mua lại thuốc theo trí nhớ thay vì tái khám hoặc kiểm tra thông tin cũ. Điều này tuy tiện lợi trước mắt nhưng lại tiềm ẩn rất nhiều nguy cơ nếu dùng sai thuốc hoặc thay đổi tình trạng sức khỏe theo thời gian.
          </p>

          {/* Section 3 */}
          <div className="clear-both"></div>
          <SectionHeading number="03" id="cach-truy-van" title="Cách truy vấn tên thuốc cũ nhanh nhất" />

          <p className="text-justify mb-6">
            Khi rơi vào tình trạng quên tên thuốc cũ, bạn có thể áp dụng 3 cách sau:
          </p>

          <h3 id="xem-benh-an" className="font-display text-lg sm:text-xl font-bold text-slate-900 leading-snug mt-8 mb-3 scroll-mt-28">
            1. Xem lại bệnh án hoặc đơn thuốc cũ
          </h3>
          <p className="text-justify mb-6">
            Kiểm tra lại các túi hồ sơ y tế, ảnh chụp trong điện thoại hoặc tin nhắn với bác sĩ. Hoặc bạn có thể xem lại cách xử lý cho tình huống <Link to="/resources/mat-giay-kham-suc-khoe-va-ho-so-y-te" className="text-cyan-600 hover:text-cyan-700 underline">mất đơn thuốc</Link>. Đây là nguồn thông tin chính xác nhất về các loại dược phẩm bạn từng sử dụng.
          </p>

          <h3 id="lien-he-duoc-si" className="font-display text-lg sm:text-xl font-bold text-slate-900 leading-snug mt-8 mb-3 scroll-mt-28">
            2. Liên hệ với dược sĩ tại nhà thuốc cũ bạn từng mua
          </h3>
          <p className="text-justify mb-6">
            Nếu bạn thường xuyên mua thuốc tại một cửa hàng cố định, các dược sĩ có thể lưu lịch sử đơn thuốc của bạn trên hệ thống quản lý. Đừng ngần ngại nhờ họ tra cứu lại giúp nhé.
          </p>

          <h3 id="su-dung-ai" className="font-display text-lg sm:text-xl font-bold text-slate-900 leading-snug mt-8 mb-3 scroll-mt-28">
            3. Sử dụng AI FamCare để truy vấn theo triệu chứng
          </h3>
          <p className="text-justify mb-6">
            Thấu hiểu những khó khăn trong việc lưu trữ và ghi nhớ tên thuốc, giải pháp y tế số FamCare đã ra đời, tích hợp công nghệ AI hiện đại để quét đơn thuốc và quản lý "Tủ thuốc gia đình" thông minh. Công cụ này không chỉ giúp bạn lưu trữ thông tin dược phẩm một cách khoa học mà còn cho phép truy vấn lại tên thuốc theo triệu chứng, giúp bạn hoàn toàn làm chủ hành trình chăm sóc sức khỏe và loại bỏ nỗi lo quên tên thuốc trong tương lai.
          </p>

          <ArticleImage src="/bai-11/hinh3.png" alt="Sử dụng tủ thuốc AI để quản lý sức khỏe tốt hơn" />

          <p className="text-justify text-sm mb-4">
            Xem cách sử dụng Tủ thuốc AI tại đây: <Link to="/resources/he-sinh-thai-famcare" className="text-cyan-600 hover:text-cyan-700 underline">Hệ sinh thái FamCare</Link>
          </p>

          <div className="bg-emerald-50/80 border border-emerald-200 border-l-4 border-l-emerald-600 p-6 rounded-r-xl my-10 relative overflow-hidden">
            <div className="font-sans text-[11px] font-bold tracking-[0.2em] uppercase text-emerald-700 mb-2">
              Truy xuất theo từ khóa cảm quan
            </div>
            <p className="text-justify text-[0.95rem] text-emerald-900 m-0 leading-relaxed font-sans">
              Bạn chỉ cần nhập các từ khóa như "đau dạ dày", "ho khan" hay "dị ứng", hệ thống sẽ tự động lọc và hiển thị danh mục các loại dược phẩm tương ứng mà bạn hoặc người thân đã từng lưu trữ trong hồ sơ trước đó.
            </p>
          </div>

          <div className="bg-cyan-50/80 border border-cyan-200 border-l-4 border-l-cyan-600 p-6 rounded-r-xl my-10 relative overflow-hidden">
            <div className="font-sans text-[11px] font-bold tracking-[0.2em] uppercase text-cyan-700 mb-2">
              Tối ưu hóa hiệu quả điều trị
            </div>
            <p className="text-justify text-[0.95rem] text-cyan-900 m-0 leading-relaxed font-sans">
              Bằng cách đối soát dữ liệu y tế, FamCare giúp bạn tìm lại chính xác loại thuốc mang lại phản hồi tốt nhất cho cơ địa của gia đình, tránh việc sử dụng sai thuốc hoặc lãng phí ngân sách cho những loại không hiệu quả.
            </p>
          </div>

          {/* Section 4 */}
          <div className="clear-both"></div>
          <SectionHeading number="04" id="ket-luan" title="Kết luận" />

          <p className="text-justify mb-6">
            Quên tên thuốc cũ tưởng chừng chỉ là một bất tiện nhỏ nhưng thực tế có thể gây ra rất nhiều hệ lụy cho sức khỏe và quá trình điều trị. Việc chủ động lưu trữ lịch sử dùng thuốc không chỉ giúp bạn tiết kiệm thời gian, chi phí mà còn góp phần đảm bảo an toàn cho bản thân và gia đình.
          </p>
          <p className="text-justify mb-6">
            Để FamCare giúp bạn quản lý sức khỏe hiệu quả và thông minh hơn với <a href="/app/cabinet" className="text-cyan-600 hover:text-cyan-700 underline">Tủ thuốc AI</a> và <a href="/app/scanner" className="text-cyan-600 hover:text-cyan-700 underline">Quét đơn thuốc AI</a>.
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
