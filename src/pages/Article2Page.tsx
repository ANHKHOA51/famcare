import React, { useEffect, useState } from 'react';
import PublicNavbar from "@/components/PublicNavbar";
import PublicFooter from "@/components/PublicFooter";
import { List, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import SocialShareButtons from '@/components/SocialShareButtons';

interface TocItem {
  id: string;
  text: string;
  level: number;
}

const tocItems: TocItem[] = [
  { id: "thu-thach", text: "Tại sao việc đọc đơn thuốc giấy lại là thử thách đối với người dùng?", level: 2 },
  { id: "chu-viet", text: "Chữ viết trong đơn thuốc và giới hạn diễn giải", level: 3 },
  { id: "tam-quan-trong", text: "Tầm quan trọng của việc hiểu đơn thuốc chuẩn xác", level: 3 },
  { id: "cach-doc", text: "Cách đọc đơn thuốc của bác sĩ từ A tới Z", level: 2 },
  { id: "sai-lam", text: "5 sai lầm thường gặp khi tự đọc đơn thuốc giấy tại nhà", level: 2 },
  { id: "nham-lieu", text: "Nhầm lẫn liều lượng do ký hiệu đơn vị", level: 3 },
  { id: "thoi-diem", text: "Xác định sai thời điểm uống thuốc tối ưu", level: 3 },
  { id: "nham-ho-so", text: "Nhầm lẫn hồ sơ giữa các thành viên", level: 3 },
  { id: "tu-dieu-chinh", text: "Tự ý điều chỉnh liệu trình sử dụng", level: 3 },
  { id: "bo-sot", text: "Bỏ sót các lưu ý về tương tác dinh dưỡng", level: 3 },
  { id: "famcare", text: "FamCare: Giải pháp số hóa đơn thuốc thông minh", level: 2 },
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
    <figcaption className="mt-3 text-sm text-slate-500 font-body italic">
      {alt}
    </figcaption>
  </figure>
);

const SectionHeading = ({ number, title, id }: { number: string, title: string, id: string }) => (
  <div id={id} className="flex items-start gap-4 mt-16 mb-6 scroll-mt-28">
    <span className="font-display text-5xl font-black text-blue-200/60 leading-none -mt-1 shrink-0">
      {number}
    </span>
    <h2 className="font-display text-2xl sm:text-[1.7rem] font-bold text-slate-900 leading-snug border-b-2 border-amber-500 pb-2">
      {title}
    </h2>
  </div>
);

const SubHeading = ({ id, title }: { id: string, title: string }) => (
  <h3 id={id} className="font-display text-xl sm:text-[1.3rem] font-bold text-slate-800 mt-10 mb-4 scroll-mt-28">
    {title}
  </h3>
);

export default function Article2Page() {
  const [activeId, setActiveId] = useState("");

  useEffect(() => {
    fetch('/api/articles/cach-doc-don-thuoc-giay/view', { method: 'POST' })
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
        <title>
          Cách Đọc Đơn Thuốc Giấy: 5 Sai Lầm Phổ Biến Và Cách Xử Lý | FamCare
        </title>

        <meta
          name="description"
          content="Học cách đọc đơn thuốc giấy chuẩn xác, tránh 5 sai lầm phổ biến (nhầm liều lượng, thời điểm uống) và hiểu ký hiệu y tế. Hướng dẫn chi tiết từ FamCare với công nghệ quét đơn thuốc AI thông minh."
        />

        <meta
          name="keywords"
          content="cách đọc đơn thuốc giấy, ký hiệu đơn thuốc, đọc đơn thuốc bác sĩ, đơn thuốc viết tay, tra cứu đơn thuốc, famcare, quét đơn thuốc AI, nhầm liều lượng đơn thuốc, 5 sai lầm đọc đơn, hiểu ký hiệu y tế"
        />

        <meta
          property="og:title"
          content="
      Cách Đọc Đơn Thuốc Giấy: 5 Sai Lầm Phổ Biến Và Cách Xử Lý
    "
        />

        <meta
          property="og:description"
          content="
      Tìm hiểu cách đọc đơn thuốc bác sĩ, giải mã ký hiệu y khoa và tránh các sai lầm nguy hiểm khi dùng thuốc tại nhà.
    "
        />

        <meta
          property="og:type"
          content="article"
        />

        <meta
          property="og:url"
          content="
      https://famcare.site/resources/cach-doc-don-thuoc-giay
    "
        />

        <meta
          property="og:image"
          content="https://famcare.site/bai-2/hinh1.jpg"
        />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />

        <meta
          name="twitter:card"
          content="summary_large_image"
        />

        <meta
          name="twitter:title"
          content="Cách Đọc Đơn Thuốc Giấy: 5 Sai Lầm Phổ Biến"
        />

        <meta
          name="twitter:description"
          content="Hướng dẫn đọc đơn thuốc giấy an toàn và chính xác cùng FamCare."
        />

        <meta
          name="twitter:image"
          content="https://famcare.site/bai-2/hinh1.jpg"
        />

        <link
          rel="canonical"
          href="https://famcare.site/resources/cach-doc-don-thuoc-giay"
        />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": "Cách Đọc Đơn Thuốc Giấy: 5 Sai Lầm Phổ Biến Và Cách Xử Lý",
            "description": "Học cách đọc đơn thuốc giấy chuẩn xác, tránh 5 sai lầm phổ biến (nhầm liều lượng, thời điểm uống) và hiểu ký hiệu y tế. Hướng dẫn chi tiết từ FamCare với công nghệ quét đơn thuốc AI thông minh.",
            "image": "https://famcare.site/bai-2/hinh1.jpg",
            "datePublished": "2026-05-15",
            "dateModified": "2026-05-15",
            "author": {
              "@type": "Organization",
              "name": "FamCare",
              "url": "https://famcare.site"
            },
            "publisher": {
              "@type": "Organization",
              "name": "FamCare",
              "logo": {
                "@type": "ImageObject",
                "url": "https://famcare.site/logo.png"
              }
            },
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": "https://famcare.site/resources/cach-doc-don-thuoc-giay"
            }
          })}
        </script>
      </Helmet>
      <div className="min-h-screen bg-sky-50 selection:bg-amber-200 selection:text-amber-900 font-body pb-10">
        <PublicNavbar />

        <header className="bg-slate-900 pt-16 pb-12 sm:pt-20 sm:pb-16 relative overflow-hidden">
          <div className="max-w-4xl mx-auto px-4 sm:px-8 relative z-10">
            <div className="inline-block font-body text-xs font-semibold tracking-[0.2em] uppercase text-amber-500 border border-amber-600/50 px-3.5 py-1.5 mb-6 rounded-sm">
              Sức khỏe &amp; Dược lý
            </div>
            <h1 className="font-display text-3xl sm:text-5xl lg:text-[3.2rem] font-black text-amber-50 leading-[1.2] mb-5 tracking-tight">
              Cách Đọc Đơn Thuốc Giấy: <em className="text-amber-500 italic font-medium">5 Sai Lầm Phổ Biến</em> Và Cách Xử Lý
            </h1>
            <p className="text-justify text-[13px] text-slate-400 tracking-wide uppercase font-sans">
              Biên soạn bởi <span className="text-amber-500 font-medium">FamCare</span> - Nền tảng y tế thông minh
            </p>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-1bg-gradient-to-r from-blue-800 via-amber-500 to-sky-700 h-1 opacity-90"></div>
        </header>

        <main className="px-4 sm:px-8 lg:px-16 py-10 max-w-[860px] mx-auto text-[1.125rem] text-slate-800 leading-[1.85] font-light">

          {/* Lead text */}
          <div className="mb-14">
            <p className="text-[1.15rem] leading-[1.9] text-slate-700 font-body text-justify italic border-l-[3px] border-amber-500 bg-gradient-to-r from-amber-50/50 to-transparent p-5 sm:py-6 sm:px-7 rounded-r-2xl">
              <span className="font-bold text-slate-900 tracking-wide uppercase text-xs mr-3 not-italic">PHÂN TÍCH CHUYÊN SÂU &mdash;</span>
              Việc <strong>đọc đơn thuốc giấy</strong> tưởng chừng là bước đơn giản sau khi rời phòng khám, nhưng thực tế lại tiềm ẩn không ít rào cản nếu chúng ta không có chuyên môn y khoa sâu rộng. Các ký hiệu chuyên ngành phức tạp và cách trình bày đặc thù của ngành y đôi khi dẫn đến những hiểu lầm không đáng có về liều lượng hay cách dùng. Bài viết này sẽ chỉ ra 5 sai lầm thường gặp nhất và hướng dẫn bạn cách số hóa thông tin cực kỳ đơn giản. Hãy cùng <strong>FamCare</strong> nâng tầm quản lý sức khỏe gia đình thảnh thơi và an toàn hơn ngay hôm nay!
            </p>
          </div>

          <ArticleImage src="/bai-2/hinh1.jpg" alt="Bệnh nhân khi đọc đơn thuốc giấy" />

          {/* Table of Contents */}
          <nav className="bg-white/60 backdrop-blur rounded-xl p-6 mb-14 border border-blue-100 shadow-sm float-none md:float-right md:ml-8 md:mb-8 md:w-64 font-sans text-sm">
            <div className="flex items-center gap-2 mb-4">
              <List size={16} className="text-amber-600" />
              <span className="font-bold text-slate-900 uppercase tracking-widest text-xs">Mục lục nhanh</span>
            </div>
            <ul className="space-y-1.5 text-left">
              {tocItems.map(item => (
                <li key={item.id}>
                  <button
                    onClick={() => scrollTo(item.id)}
                    className={`text-left w-full transition-colors rounded-md px-2.5 py-1 hover:bg-amber-50/80 ${item.level === 3 ? "pl-5 text-slate-500 text-[13px]" : "font-semibold text-slate-700"
                      } ${activeId === item.id ? "bg-amber-50 text-amber-700 font-medium" : ""}`}
                  >
                    {item.text}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          {/* Section 1 */}
          <SectionHeading number="01" id="thu-thach" title="Tại sao việc đọc đơn thuốc giấy lại là thử thách đối với người dùng?" />

          <p className="text-justify mb-5">
            Sau mỗi lần thăm khám, đơn thuốc là văn bản quan trọng nhất kết nối chẩn đoán của bác sĩ với quá trình điều trị tại nhà. Tuy nhiên, với ngôn ngữ chuyên môn đặc thù, việc đọc đơn thuốc giấy đôi khi trở nên khó khăn đối với những người không làm việc trong lĩnh vực y tế. Sự khó khăn này phần lớn đến từ các thuật ngữ chuyên ngành thường được viết tắt bằng tiếng Latin hoặc tiếng Anh (ví dụ: b.i.d, q.d, p.o) vốn không phổ biến trong giao tiếp hằng ngày.
          </p>
          <p className="text-justify mb-8">
            Bên cạnh đó, tốc độ xử lý hồ sơ tại các cơ sở y tế đôi khi khiến việc ghi chú trở nên vắn tắt, vô tình tạo ra rào cản cho người bệnh khi muốn tra cứu đơn thuốc một cách chính xác. Nếu không có sự đối soát kỹ lưỡng, chúng ta rất dễ áp dụng sai hướng dẫn, gây ảnh hưởng trực tiếp đến hiệu quả điều trị.
          </p>

          <SubHeading id="chu-viet" title="1.1 Chữ viết trong đơn thuốc và những giới hạn trong diễn giải" />
          <p className="text-justify mb-5">
            Trong môi trường y tế áp lực, chữ viết trong đơn thuốc đôi khi được trình bày theo cách lược nét hoặc ký hiệu nhanh. Điều này không chỉ gây khó khăn cho người nhà mà còn đòi hỏi sự tập trung cao độ từ các dược sĩ tại quầy thuốc khi tiếp nhận đơn. Việc diễn giải sai một chữ cái hoặc một ký số trên đơn thuốc có thể dẫn đến những nhầm lẫn đáng tiếc về tên loại dược phẩm. Đặc biệt là với các loại thuốc có tên gọi gần giống nhau nhưng công dụng hoàn toàn khác biệt. Việc thiếu một công cụ hỗ trợ đọc hiểu chuẩn xác khiến rủi ro này luôn là nỗi lo thường trực cho những người đóng vai trò chăm sóc chính trong gia đình.
          </p>

          <ArticleImage src="/bai-2/hinh2.jpg" alt="Đơn thuốc viết tay phức tạp trên sổ khám bệnh" />

          <SubHeading id="tam-quan-trong" title="1.2 Tầm quan trọng của việc hiểu đơn thuốc chuẩn xác" />
          <p className="text-justify mb-8">
            Để bảo vệ sức khỏe, người dùng cần chủ động làm quen với cấu trúc cơ bản của một đơn thuốc y tế bao gồm: thông tin bệnh nhân, tên thuốc, hàm lượng, số lượng và hướng dẫn sử dụng. Việc hiểu đơn thuốc giúp bạn thực hiện quy tắc "đối chiếu kép" giữa thông tin trên giấy và nhãn thuốc thực tế, đảm bảo không có sai sót trong quá trình vận hành tủ thuốc gia đình.
          </p>

          {/* Section 2 */}
          <SectionHeading number="02" id="cach-doc" title="Cách đọc đơn thuốc của bác sĩ từ A tới Z để tránh nhầm lẫn" />
          <p className="text-justify mb-5">
            Để hỗ trợ bạn giải mã đơn thuốc một cách khoa học, hãy tập trung vào các thành phần cốt lõi sau đây. Việc nắm rõ các ký hiệu này sẽ giúp bạn thảnh thơi hơn khi tự mình kiểm soát lộ trình điều trị tại gia.
          </p>
          <ul className="text-justify list-disc pl-6 mb-8 space-y-2 text-slate-700 font-body">
            <li><strong>Tên thuốc &amp; Hàm lượng:</strong> Kiểm tra kỹ tên hoạt chất và nồng độ (ví dụ: 500mg, 10ml) để tránh tình trạng dùng quá liều.</li>
            <li><strong>Liều dùng &amp; Thời điểm:</strong> Xác định rõ số lần dùng trong ngày và thuốc cần uống trước hay sau khi ăn.</li>
            <li><strong>Ký hiệu chuyên ngành:</strong> Các bác sĩ thường sử dụng ký hiệu Latin để hướng dẫn tần suất và đường dùng.</li>
          </ul>

          {/* Table for prescription symbols */}
          <h4 className="font-bold text-slate-800 mb-4 font-display">Bảng tra cứu ký hiệu đơn thuốc thông dụng:</h4>
          <div className="overflow-x-auto mb-10 rounded-xl border border-slate-200 shadow-sm bg-white">
            <table className="w-full text-left border-collapse font-sans text-[0.95rem]">
              <thead>
                <tr className="bg-slate-100/80 text-slate-800 font-bold border-b border-slate-200">
                  <th className="p-4 py-3">Ký hiệu</th>
                  <th className="p-4 py-3 border-l border-slate-200">Ý nghĩa đầy đủ (Latin)</th>
                  <th className="p-4 py-3 border-l border-slate-200">Hướng dẫn sử dụng</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-600">
                <tr className="hover:bg-slate-50/50 transition-colors">
                  <td className="p-4 font-mono font-semibold text-sky-700">b.i.d</td>
                  <td className="p-4 border-l border-slate-100 italic">Bis in die</td>
                  <td className="p-4 border-l border-slate-100">Uống 2 lần mỗi ngày</td>
                </tr>
                <tr className="hover:bg-slate-50/50 transition-colors">
                  <td className="p-4 font-mono font-semibold text-sky-700">t.i.d</td>
                  <td className="p-4 border-l border-slate-100 italic">Ter in die</td>
                  <td className="p-4 border-l border-slate-100">Uống 3 lần mỗi ngày</td>
                </tr>
                <tr className="hover:bg-slate-50/50 transition-colors">
                  <td className="p-4 font-mono font-semibold text-sky-700">q.d</td>
                  <td className="p-4 border-l border-slate-100 italic">Quaque die</td>
                  <td className="p-4 border-l border-slate-100">Uống 1 lần duy nhất mỗi ngày</td>
                </tr>
                <tr className="hover:bg-slate-50/50 transition-colors">
                  <td className="p-4 font-mono font-semibold text-sky-700">p.o</td>
                  <td className="p-4 border-l border-slate-100 italic">Per os</td>
                  <td className="p-4 border-l border-slate-100">Dùng qua đường miệng (uống)</td>
                </tr>
                <tr className="hover:bg-slate-50/50 transition-colors">
                  <td className="p-4 font-mono font-semibold text-sky-700">a.c</td>
                  <td className="p-4 border-l border-slate-100 italic">Ante cibum</td>
                  <td className="p-4 border-l border-slate-100">Uống trước bữa ăn</td>
                </tr>
                <tr className="hover:bg-slate-50/50 transition-colors">
                  <td className="p-4 font-mono font-semibold text-sky-700">p.c</td>
                  <td className="p-4 border-l border-slate-100 italic">Post cibum</td>
                  <td className="p-4 border-l border-slate-100">Uống sau bữa ăn</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Section 3 */}
          <SectionHeading number="03" id="sai-lam" title="5 sai lầm thường gặp khi tự đọc đơn thuốc giấy tại nhà" />
          <p className="text-justify mb-5">
            Khi thiếu đi sự hỗ trợ từ các công cụ thông minh, việc tự <strong>đọc đơn thuốc giấy</strong> tại nhà thường dễ mắc phải những sai sót sau đây, gây ảnh hưởng đến tính an toàn trong điều trị.
          </p>

          <SubHeading id="nham-lieu" title="3.1 Nhầm lẫn liều lượng do ký hiệu đơn vị" />
          <p className="text-justify mb-6">
            Các ký hiệu như "mg" và "mcg" rất dễ bị nhìn nhầm nếu nét viết không sắc sảo. Trong y tế, liều lượng giữa hai đơn vị này có sự chênh lệch rất lớn. Một sai sót nhỏ trong việc xác định vị trí dấu phẩy hoặc đơn vị tính có thể dẫn đến tình trạng dùng thuốc thiếu liều hoặc quá liều, gây nguy hiểm cho người bệnh.
          </p>

          <SubHeading id="thoi-diem" title="3.2 Xác định sai thời điểm uống thuốc tối ưu" />
          <p className="text-justify mb-6">
            Mỗi loại thuốc có một "thời điểm vàng" để phát huy tác dụng. Việc đọc sai chỉ dẫn về thời gian uống thuốc so với bữa ăn có thể làm giảm khả năng hấp thụ của cơ thể hoặc gây kích ứng dạ dày không mong muốn. Đây là lỗi phổ biến khi người dùng chỉ tập trung vào tên thuốc mà bỏ qua các dòng ghi chú nhỏ bên dưới.
          </p>

          <ArticleImage src="/bai-2/hinh3.jpg" alt="Uống thuốc đúng thời điểm để không làm giảm khả năng hấp thụ của cơ thể" />

          <SubHeading id="nham-ho-so" title="3.3 Nhầm lẫn hồ sơ giữa các thành viên" />
          <p className="text-justify mb-6">
            Trong gia đình có nhiều người cùng điều trị, việc lưu trữ đơn thuốc giấy rời rạc rất dễ gây ra tình trạng nhầm lẫn đơn giữa các thành viên. Việc áp dụng nhầm đơn thuốc của người lớn cho trẻ em hoặc ngược lại là một sai lầm nghiêm trọng, đòi hỏi một giải pháp quản lý tập trung và khoa học hơn.
          </p>

          <SubHeading id="tu-dieu-chinh" title="3.4 Tự ý điều chỉnh liệu trình sử dụng" />
          <p className="text-justify mb-6">
            Nhiều người có thói quen dừng thuốc ngay khi thấy triệu chứng thuyên giảm mà không đọc kỹ thời gian điều trị bắt buộc được ghi trên đơn. Việc này đặc biệt nguy hiểm với kháng sinh, dễ dẫn đến tình trạng kháng thuốc và làm phức tạp hóa các đợt điều trị về sau.
          </p>

          <SubHeading id="bo-sot" title="3.5 Bỏ sót các lưu ý về tương tác dinh dưỡng" />
          <p className="text-justify mb-6">
            Không gian trên đơn thuốc giấy thường hạn chế, nên các bác sĩ đôi khi không thể ghi chú hết mọi tương tác thực phẩm. Sai lầm của chúng ta là thường chỉ quan tâm đến việc uống thuốc mà bỏ qua việc kiểm tra xem thực phẩm hằng ngày có làm biến đổi dược tính của thuốc hay không.
          </p>

          <ArticleImage src="/bai-2/hinh4.jpg" alt="Chế độ dinh dưỡng rất quan trọng trong quá trình điều trị bệnh" />

          {/* Section 4 */}
          <SectionHeading number="04" id="famcare" title="FamCare: Giải pháp số hóa đơn thuốc thông minh cho người bận rộn" />
          <p className="text-justify mb-5">
            Để khắc phục những hạn chế của đơn thuốc truyền thống, <strong>FamCare</strong> mang đến tính năng <strong className="text-sky-700">Máy quét đơn thuốc AI</strong>. Đây là công cụ đắc lực giúp bạn chuyển đổi những dòng chữ tay phức tạp thành dữ liệu số rõ ràng, minh bạch.
          </p>
          <p className="text-justify mb-5">
            Thay vì loay hoay tự đoán nội dung, bạn chỉ cần quét ảnh đơn thuốc qua <strong>FamCare</strong>. Công nghệ AI sẽ hỗ trợ nhận diện tên thuốc và chỉ dẫn y tế, sau đó lưu trữ an toàn trong hệ thống. Điều này giúp bạn dễ dàng <strong>tra cứu đơn thuốc</strong> bất cứ khi nào cần mà không sợ thất lạc hay hư hỏng giấy tờ.
          </p>
          <p className="text-justify mb-8">
            Đặc biệt, dữ liệu này sẽ được đồng bộ trực tiếp vào <strong>Tủ thuốc AI</strong> và <strong>Hồ sơ gia đình</strong>. Hệ thống sẽ tự động nhắc nhở khi thuốc sắp hết và đưa ra các cảnh báo về tương tác thực phẩm thông qua tính năng <em><strong>AI Nutrition</strong></em>, giúp hành trình chăm sóc sức khỏe của bạn trở nên tinh tế và thảnh thơi hơn bao giờ hết.
          </p>

          {/* Section 5: Conclusion */}
          <SectionHeading number="05" id="ket-bai" title="Kết bài" />
          <p className="text-justify mb-10">
            Tóm lại, việc tự <strong>đọc đơn thuốc giấy</strong> mà không có sự hỗ trợ của công nghệ hiện đại có thể dẫn đến những sai sót không đáng có trong quá trình chăm sóc sức khỏe. Với sự đồng hành của <strong>FamCare</strong>, bạn hoàn toàn có thể số hóa mọi dữ liệu y tế một cách nhanh chóng và chính xác. Hãy để công nghệ thay bạn quản lý những con số phức tạp, để bạn có thêm thời gian trọn vẹn bên gia đình.
          </p>

          {/* CTA Block */}
          <div className="bg-gradient-to-br from-sky-50 to-indigo-50 border border-sky-100 p-8 rounded-2xl text-center mb-16 shadow-lg shadow-sky-100/50">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white text-sky-600 mb-5 shadow-sm">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z" />
              </svg>
            </div>
            <h3 className="font-display text-2xl font-bold text-slate-800 mb-3">Tự động hóa với FamCare</h3>
            <p className="text-justify text-slate-600 mb-6 font-body text-[1.05rem] max-w-md mx-auto">
              Trải nghiệm tự động nhập liệu đơn thuốc, quản lý nhắc nhở và kiểm tra tương tác dinh dưỡng ngay hôm nay.
            </p>
            <a
              href="https://famcare.site/app/scanner"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-slate-900 text-white font-medium px-6 py-3 rounded-full hover:bg-slate-800 transition-colors shadow-md hover:shadow-lg focus:ring-4 focus:ring-slate-900/20 font-sans"
            >
              Khám phá tính năng Quét đơn thuốc AI
              <ArrowRight size={18} />
            </a>
          </div>

          {/* Footer info box */}
          <div className="border border-slate-200/60 rounded-xl p-6 bg-slate-50/50 text-[0.85rem] text-slate-500 font-sans leading-relaxed">
            <p className="text-justify font-semibold text-slate-700 mb-2">Bài viết và hình ảnh được thực hiện bởi <strong>FamCare</strong>.</p>
            <p className="text-justify mb-4">
              <em>Lưu ý:</em> Bài viết này mang tính thông tin chung và không thay thế cho lời khuyên y tế chuyên nghiệp. Hãy luôn tham khảo bác sĩ hoặc dược sĩ về cách xử lý liều thuốc cụ thể của bạn.
            </p>
            <div className="h-[1px] w-12 bg-slate-300 mb-4"></div>
            <p className="text-justify font-bold text-slate-800"><strong>FamCare</strong> - Nền tảng y tế thông minh - Chăm sóc gia đình từ xa.</p>
            <p>Website: <a href="https://famcare.site/" className="text-blue-600 hover:underline">https://<strong>famcare</strong>.site/</a></p>
            <p>Email: <a href="mailto:famcare.support@gmail.com" className="text-blue-600 hover:underline"><strong>famcare</strong>.support@gmail.com</a></p>
          </div>

          <SocialShareButtons 
            title="Cách đọc đơn thuốc giấy: 5 sai lầm phổ biến"
            url="https://famcare.site/resources/cach-doc-don-thuoc-giay"
            description="Học cách đọc đơn thuốc chuẩn xác và tránh 5 sai lầm phổ biến"
          />

          {/* Related Articles Section */}
          <div className="mt-20 pt-16 border-t-2 border-slate-200">
            <h2 className="font-display text-2xl font-bold text-slate-900 mb-8">Bài viết liên quan</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Link 
                to="/resources/lua-chon-thuc-pham-dung-de-phat-huy-tac-dung-thuoc"
                className="p-6 border border-slate-200 rounded-xl hover:border-amber-400 hover:shadow-md transition-all group"
              >
                <h3 className="font-bold text-slate-800 mb-2 group-hover:text-amber-600 transition-colors">Lựa chọn thực phẩm để phát huy tác dụng thuốc</h3>
                <p className="text-slate-600 text-sm">Hiểu về tương tác giữa thực phẩm và thuốc để tối ưu hiệu quả điều trị.</p>
              </Link>
              <Link 
                to="/resources/quen-uong-thuoc-thi-co-sao-khong"
                className="p-6 border border-slate-200 rounded-xl hover:border-amber-400 hover:shadow-md transition-all group"
              >
                <h3 className="font-bold text-slate-800 mb-2 group-hover:text-amber-600 transition-colors">Quên uống thuốc thì có sao không?</h3>
                <p className="text-slate-600 text-sm">Hướng dẫn xử lý an toàn khi quên liều thuốc theo từng loại.</p>
              </Link>
              <Link 
                to="/resources/mat-giay-kham-suc-khoe-va-ho-so-y-te"
                className="p-6 border border-slate-200 rounded-xl hover:border-amber-400 hover:shadow-md transition-all group"
              >
                <h3 className="font-bold text-slate-800 mb-2 group-hover:text-amber-600 transition-colors">Mất giấy khám sức khỏe: Cách xử lý</h3>
                <p className="text-slate-600 text-sm">Giải pháp nhanh khi mất hồ sơ bệnh án và giấy khám sức khỏe.</p>
              </Link>
              <a 
                href="/app/scanner"
                className="p-6 border border-sky-200 bg-sky-50/50 rounded-xl hover:border-sky-400 hover:shadow-md transition-all group"
              >
                <h3 className="font-bold text-slate-800 mb-2 group-hover:text-sky-600 transition-colors">✨ Quét đơn thuốc bằng AI</h3>
                <p className="text-slate-600 text-sm">Sử dụng công nghệ AI để số hóa và quản lý đơn thuốc của bạn một cách tự động.</p>
              </a>
              <a 
                href="/app/cabinet"
                className="p-6 border border-slate-200 rounded-xl hover:border-amber-400 hover:shadow-md transition-all group"
              >
                <h3 className="font-bold text-slate-800 mb-2 group-hover:text-amber-600 transition-colors">Tủ thuốc AI - Quản lý thông minh</h3>
                <p className="text-slate-600 text-sm">Lưu trữ và theo dõi tất cả thông tin thuốc của gia đình trong một ứng dụng.</p>
              </a>
              <a 
                href="/app/meal-plan"
                className="p-6 border border-emerald-200 bg-emerald-50/50 rounded-xl hover:border-emerald-400 hover:shadow-md transition-all group"
              >
                <h3 className="font-bold text-slate-800 mb-2 group-hover:text-emerald-600 transition-colors">Lập kế hoạch ăn uống thông minh</h3>
                <p className="text-slate-600 text-sm">Nhận gợi ý thực đơn cá nhân hóa theo tình trạng sức khỏe và thuốc đang sử dụng.</p>
              </a>
            </div>
          </div>

        </main>

        <PublicFooter />
      </div>
    </>
  );
}
