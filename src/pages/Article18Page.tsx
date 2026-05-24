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
  { id: "nguyen-tac", text: "Nguyên tắc cốt lõi xây dựng thực đơn", level: 2 },
  { id: "khau-phan", text: "Lưu ý quan trọng với khẩu phần ăn", level: 3 },
  { id: "meo-ai", text: "Mẹo lên thực đơn 7 ngày bằng AI", level: 2 },
  { id: "he-sinh-thai", text: "FamCare - Hệ sinh thái đồng hành", level: 2 },
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

export default function Article18Page() {
  const [activeId, setActiveId] = useState("");

  useEffect(() => {
    fetch('/api/articles/thuc-don-tieu-duong-7-ngay-kh-hoc/view', { method: 'POST' })
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
        <title>Thực Đơn 7 Ngày Cho Người Tiểu Đường: Cách Lên Thực Đơn Bằng AI</title>
        <meta
          name="description"
          content="Làm sao thiết kế thực đơn cho người tiểu đường vừa chuẩn vị vừa hạ đường huyết? Khám phá giải pháp lên thực đơn bằng AI cá nhân hóa từ FamCare."
        />
        <meta name="keywords" content="thực đơn tiểu đường, thực đơn 7 ngày, chế độ ăn tiểu đường, lên thực đơn bằng AI, ăn gì để ổn định đường huyết, thực đơn cho bệnh nhân tiểu đường, kế hoạch ăn uống tiểu đường, lập thực đơn cá nhân, điều trị tiểu đường bằng dinh dưỡng" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Thực Đơn Tiểu Đường 7 Ngày: Lên Kế Hoạch Ăn Uống Khoa Học" />
        <meta name="twitter:description" content="Hướng dẫn lên thực đơn tiểu đường 7 ngày an toàn và ngon." />
        <meta name="twitter:image" content="https://famcare.site/bai-18/hinh1.jpg" />
        <link rel="canonical" href="https://famcare.site/resources/thuc-don-cho-nguoi-tieu-duong-len-thuc-don-bang-ai" />
        <meta property="og:title" content="Thực Đơn 7 Ngày Cho Người Tiểu Đường: Cách Lên Thực Đơn Bằng AI" />
        <meta property="og:description" content="Làm sao thiết kế thực đơn cho người tiểu đường vừa chuẩn vị vừa hạ đường huyết?" />
        <meta property="og:image" content="https://famcare.site/bai-18/hinh1.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:type" content="article" />
        <meta property="og:url" content="https://famcare.site/resources/thuc-don-cho-nguoi-tieu-duong-len-thuc-don-bang-ai" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": "Thực Đơn 7 Ngày Cho Người Tiểu Đường: Cách Lên Thực Đơn Bằng AI",
            "description": "Làm sao thiết kế thực đơn cho người tiểu đường vừa chuẩn vị vừa hạ đường huyết?",
            "image": "https://famcare.site/bai-18/hinh1.jpg",
            "datePublished": "2026-05-15",
            "dateModified": "2026-05-15",
            "author": {"@type": "Organization", "name": "FamCare", "url": "https://famcare.site"},
            "publisher": {"@type": "Organization", "name": "FamCare", "logo": {"@type": "ImageObject", "url": "https://famcare.site/logo.png"}},
            "mainEntityOfPage": {"@type": "WebPage", "@id": "https://famcare.site/resources/thuc-don-cho-nguoi-tieu-duong-len-thuc-don-bang-ai"}
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
              Thực Đơn 7 Ngày Cho Người Tiểu Đường
            </h1>
            <p className="text-justify text-[13px] text-slate-400 tracking-wide uppercase font-sans">
              Cách lên thực đơn bằng AI cá nhân hóa, vừa ngon miệng vừa giúp kiểm soát đường huyết hiệu quả.
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
          <p className="text-justify mb-6 font-semibold italic text-slate-700">
            Việc duy trì một thực đơn cho người tiểu đường chuẩn y khoa luôn là bài toán hóc búa đối với nhiều gia đình, khi ranh giới giữa kiêng khem nghiêm ngặt và thiếu hụt dinh dưỡng vô cùng mong manh. Thay vì phải đau đầu tính toán từng gram tinh bột hay mức calo thủ công, xu hướng lên thực đơn bằng AI năm 2026 đang mở ra một cuộc cách mạng trong việc chăm sóc sức khỏe chủ động. Giải pháp này giúp cá nhân hóa khẩu phần ăn, bám sát phác đồ điều trị và giải phóng áp lực tâm lý cho người bệnh. Hãy cùng FamCare trải nghiệm tính năng thiết kế bữa ăn thông minh, giúp bạn làm chủ chỉ số đường huyết và thảnh thơi tận hưởng cuộc sống khỏe mạnh bên người thân yêu ngay hôm nay!
          </p>
          <ArticleImage src="/bai-18/hinh1.png" alt="Thiết kế thực đơn cho người tiểu đường bằng AI giúp kiểm soát đường huyết tối ưu." />

          {/* Section 1 */}
          <SectionHeading number="01" id="nguyen-tac" title="Nguyên tắc cốt lõi khi xây dựng thực đơn cho người tiểu đường chuẩn y khoa" />

          <p className="text-justify mb-6">
            Bản chất của việc điều trị đái tháo đường không nằm ở việc cắt bỏ hoàn toàn các nhóm chất, mà là kiểm soát tốc độ tăng đường huyết sau ăn và duy trì năng lượng ổn định. Khi thiết kế một thực đơn cho người tiểu đường, mục tiêu tối thượng là đảm bảo chỉ số đường huyết (GI) thấp, tải lượng đường (GL) an toàn, đồng thời vẫn phải xây dựng thực đơn khoa học và đủ chất để cơ thể không bị suy nhược trong quá trình điều trị mạn tính.
          </p>
          <p className="text-justify mb-6">
            Nhiều người bệnh do quá hoảng sợ trước các biến chứng đã tự ý cắt giảm khẩu phần ăn một cách cực đoan, dẫn đến tình trạng hạ đường huyết đột ngột xa bữa ăn – một biến cố y khoa nguy hiểm không kém gì việc tăng đường huyết. Để kiểm soát bệnh hiệu quả, chế độ ăn cần phải tuân thủ nghiêm ngặt theo đồng hồ sinh học và đặc điểm thể trạng của từng cá nhân.
          </p>
          <p className="text-justify mb-6">
            Việc cân bằng này sẽ giúp người bệnh duy trì thể lực tốt nhất. Tuy nhiên, trước khi bắt tay vào thiết kế các bữa ăn cụ thể, bạn cần nắm rõ danh sách các loại thực phẩm có thể làm đường huyết tăng vọt ngay lập tức. Để không bỏ sót những cái tên "nguy hiểm" này, bạn có thể tham khảo ngay bài viết: <Link to="/resources/thuc-pham-nguoi-benh-tieu-duong-nen-tranh-va-che-do-an" className="text-cyan-600 hover:text-cyan-700 underline font-semibold">Thực phẩm người bệnh tiểu đường nên tránh để ổn định đường huyết</Link> mà FamCare đã tổng hợp chi tiết trước đó.
          </p>

          <div className="bg-amber-50/80 border border-amber-200 border-l-4 border-l-amber-600 p-6 rounded-r-xl my-10">
            <div className="font-sans text-[11px] font-bold tracking-[0.2em] uppercase text-amber-700 mb-2">⚠️ Disclaimer</div>
            <p className="text-justify text-[0.95rem] text-amber-900 m-0 leading-relaxed font-sans">
              Mọi thông tin dinh dưỡng và gợi ý thực đơn trong bài viết mang tính chất tham khảo. Chế độ ăn cụ thể cần linh hoạt điều chỉnh dựa trên chỉ số xét nghiệm HbA1c, giai đoạn bệnh và phác đồ điều trị của bác sĩ chuyên khoa. Hãy tham vấn ý kiến chuyên gia y tế trước khi áp dụng.
            </p>
          </div>

          <ArticleImage src="/bai-18/hinh2.jpg" alt="Cắt giảm khẩu phần một cách cực đoan có thể ảnh hưởng xấu đến sức khỏe" />

          <h3 id="khau-phan" className="font-display text-lg sm:text-xl font-bold text-slate-900 leading-snug mt-8 mb-3 scroll-mt-28 border-b border-slate-100 pb-2">
            1.1. Người bị tiểu đường thì cần chú ý gì trong khẩu phần ăn theo từng buổi?
          </h3>
          <p className="text-justify mb-6">
            Để duy trì đường huyết ổn định suốt 24 giờ, người bệnh cần phân chia tỷ lệ các chất dinh dưỡng một cách khoa học vào từng thời điểm trong ngày. Vậy cụ thể người bị tiểu đường thì cần chú ý gì trong khẩu phần ăn? Hãy bắt đầu bằng việc thay đổi tư duy ăn uống theo từng bữa ăn nhỏ.
          </p>
          <ul className="list-disc pl-6 mb-6 space-y-2 text-justify">
            <li><strong>Người tiểu đường nên ăn sáng bằng gì?</strong> Buổi sáng là thời điểm cơ thể dễ xảy ra hiện tượng "bình minh" (đường huyết tăng tự nhiên do hormone). Do đó, bữa sáng cần hạn chế tối đa tinh bột nhanh. Các bác sĩ khuyên người bệnh nên ăn sáng bằng các món giàu đạm và xơ như trứng ốp la kèm salad bơ, cháo yến mạch ức gà hoặc một ly sữa hạt không đường.</li>
            <li><strong>Người tiểu đường nên ăn bao nhiêu cơm mỗi ngày?</strong> Đây là câu hỏi kinh điển. Không có một con số chung, nhưng trung bình người bệnh chỉ nên tiêu thụ khoảng 1/2 đến 1 bát cơm gạo lứt (hoặc tinh bột chậm tương đương) cho mỗi bữa chính. Việc kiểm soát lượng glucid giúp tuyến tụy không bị quá tải.</li>
            <li><strong>Buổi tối người tiểu đường nên ăn gì?</strong> Bữa tối nên là bữa ăn nhẹ nhàng nhất để tránh áp lực cho hệ tiêu hóa và ngăn chặn tình trạng tăng đường huyết lúc nửa đêm. Các món canh rau thanh đạm, cá hấp hoặc đậu phụ luộc là sự lựa chọn hoàn hảo cho thực đơn cuối ngày.</li>
          </ul>

          <h3 className="font-display text-lg sm:text-xl font-bold text-slate-900 leading-snug mt-8 mb-3 border-b border-slate-100 pb-2">
            1.2. Những loại đồ ăn cho người tiểu đường không nên bỏ qua và gợi ý cho người cao tuổi
          </h3>
          <p className="text-justify mb-6">
            Bên cạnh các quy tắc kiêng khem, có những loại đồ ăn cho người tiểu đường không nên bỏ qua nhờ khả năng hỗ trợ bình ổn đường huyết tự nhiên. Nhóm thực phẩm giàu chất xơ hòa tan như đậu bắp, bông cải xanh, hạt chia, mướp đắng và các loại cá béo giàu Omega-3 (cá hồi, cá trích) cần được xuất hiện thường xuyên trong thực đơn để bảo vệ hệ tim mạch vốn rất nhạy cảm của người bệnh.
          </p>
          <p className="text-justify mb-6">
            Khi xây dựng gợi ý thực đơn cho người già bị tiểu đường, độ phức tạp tăng lên gấp đôi do hệ tiêu hóa của người lớn tuổi đã suy giảm và thường mắc kèm các bệnh lý nền như cao huyết áp, mỡ máu. Lúc này, thực đơn ăn uống lý tưởng cho người bị tiểu đường ở độ tuổi xế chiều cần ưu tiên các món ăn được chế biến mềm, lỏng, dễ nuốt, cắt giảm tối đa gia vị muối nhưng vẫn phải đảm bảo cung cấp đủ đạm để tránh teo cơ. Việc đa dạng hóa các món ăn một cách thủ công cho đối tượng này là một thách thức cực lớn đối với người chăm sóc trong gia đình.
          </p>
          <ArticleImage src="/bai-18/hinh3.png" alt="Người cao tuổi bị tiểu đường cần có chế độ ăn hợp lý" />

          {/* Section 2 */}
          <SectionHeading number="02" id="meo-ai" title="Cách lên thực đơn bằng AI: Giải pháp đột phá từ FamCare" />

          <p className="text-justify mb-6">
            Sự xuất hiện của trí tuệ nhân tạo (AI) trong lĩnh vực dinh dưỡng năm 2026 đã giải quyết triệt để những bế tắc của phương pháp thiết lập thực đơn truyền thống. Thay vì phải lật từng trang sách nấu ăn hay tra cứu bảng chỉ số GI của từng loại rau củ, việc lên thực đơn bằng AI giúp bạn tối ưu hóa 100% thời gian và độ chính xác theo phác đồ điều trị.
          </p>
          <p className="text-justify mb-6">
            Công nghệ dinh dưỡng cá nhân hóa AI hoạt động như một chuyên gia tiết chế bỏ túi. Bằng cách phân tích các chỉ số sinh học cụ thể của người bệnh bao gồm: chiều cao, cân nặng, độ tuổi, mức độ vận động hằng ngày và đặc biệt là chỉ số đường huyết cập nhật từ bệnh án, AI sẽ tự động tính toán tổng lượng calo và tỷ lệ phân bổ các chất macro (Carb - Protein - Fat) một cách hoàn hảo nhất.
          </p>

          <h3 className="font-display text-lg sm:text-xl font-bold text-slate-900 leading-snug mt-8 mb-3 border-b border-slate-100 pb-2">
            2.1. Mẹo lên thực đơn ăn uống cả tuần bằng AI thảnh thơi và chuẩn vị
          </h3>
          <p className="text-justify mb-6">
            Sử dụng mẹo lên thực đơn ăn uống cả tuần bằng AI giúp bạn biến những quy tắc y khoa khô khan thành các món ăn ngon miệng, hợp khẩu vị bản địa. Bạn hoàn toàn có thể yêu cầu AI thiết kế một thực đơn 7 ngày cho người tiểu đường dễ làm với các nguyên liệu thuần Việt có sẵn trong tủ lạnh của mình.
          </p>

          <h3 className="font-display text-lg sm:text-xl font-bold text-slate-900 leading-snug mt-8 mb-3 border-b border-slate-100 pb-2">
            2.2. Trực quan hóa thực đơn 7 ngày cho người tiểu đường từ công nghệ AI
          </h3>
          <p className="text-justify mb-6">
            Dưới đây là mô hình thực đơn 7 ngày cho người tiểu đường tiêu biểu được cá nhân hóa qua thuật toán AI của FamCare, đảm bảo tiêu chí ngon miệng, dễ chế biến và giúp kiểm soát bệnh hiệu quả:
          </p>

          <div className="overflow-x-auto mb-6">
            <table className="w-full border-collapse border border-slate-300 text-xs">
              <thead className="bg-slate-100">
                <tr>
                  <th className="border border-slate-300 p-2">Ngày trong tuần</th>
                  <th className="border border-slate-300 p-2">Bữa sáng (Giàu đạm & xơ)</th>
                  <th className="border border-slate-300 p-2">Bữa trưa (Tinh bột phức hợp)</th>
                  <th className="border border-slate-300 p-2">Bữa tối (Thanh đạm, dễ tiêu)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-slate-300 p-2"><strong>Thứ Hai</strong></td>
                  <td className="border border-slate-300 p-2">2 quả trứng luộc + Salad xà lách bơ</td>
                  <td className="border border-slate-300 p-2">1 bát cơm gạo lứt + Ức gà áp chảo + Canh cải xanh</td>
                  <td className="border border-slate-300 p-2">Cá hồi hấp xì dầu + Đậu bắp luộc</td>
                </tr>
                <tr className="bg-slate-50">
                  <td className="border border-slate-300 p-2"><strong>Thứ Ba</strong></td>
                  <td className="border border-slate-300 p-2">Cháo yến mạch nấu thịt băm</td>
                  <td className="border border-slate-300 p-2">1 bát cơm gạo lứt + Thịt lợn nạc luộc + Bí đao luộc</td>
                  <td className="border border-slate-300 p-2">Đậu phụ sốt cà chua ít muối + Canh rau ngót</td>
                </tr>
                <tr>
                  <td className="border border-slate-300 p-2"><strong>Thứ Tư</strong></td>
                  <td className="border border-slate-300 p-2">1 củ khoai lang luộc + 1 cốc sữa hạt không đường</td>
                  <td className="border border-slate-300 p-2">Gà kho gừng (ít đường) + Bông cải xanh luộc</td>
                  <td className="border border-slate-300 p-2">Tôm nõn xào măng tây (dầu oliu) + Canh bí đỏ</td>
                </tr>
                <tr className="bg-slate-50">
                  <td className="border border-slate-300 p-2"><strong>Thứ Năm</strong></td>
                  <td className="border border-slate-300 p-2">Phở lứt bò (nước dùng thanh, nhiều rau)</td>
                  <td className="border border-slate-300 p-2">1 bát cơm gạo lứt + Cá thu sốt cà + Canh cải cúc</td>
                  <td className="border border-slate-300 p-2">Thịt bò xào bông thiên lý + Nấm hấp</td>
                </tr>
                <tr>
                  <td className="border border-slate-300 p-2"><strong>Thứ Sáu</strong></td>
                  <td className="border border-slate-300 p-2">Salad ức gà xé phay + Hạt chia</td>
                  <td className="border border-slate-300 p-2">1 bát cơm gạo lứt + Mực hấp gừng + Rau muống luộc</td>
                  <td className="border border-slate-300 p-2">Trứng đúc thịt nạc + Canh mướp đắng</td>
                </tr>
                <tr className="bg-slate-50">
                  <td className="border border-slate-300 p-2"><strong>Thứ Bảy</strong></td>
                  <td className="border border-slate-300 p-2">Bánh mì nguyên cám + 1 lát phô mai</td>
                  <td className="border border-slate-300 p-2">1 bát cơm gạo lứt + Thịt bò áp chảo + Canh bầu</td>
                  <td className="border border-slate-300 p-2">Cá quả nấu ngót (không đường) + Rau cải luộc</td>
                </tr>
                <tr>
                  <td className="border border-slate-300 p-2"><strong>Chủ Nhật</strong></td>
                  <td className="border border-slate-300 p-2">Súp bắp cải nấu thịt gà xé</td>
                  <td className="border border-slate-300 p-2">1 bát cơm gạo lứt + Tôm rim nhạt + Súp lơ xào</td>
                  <td className="border border-slate-300 p-2">Thịt viên hấp nấm hương + Canh rau dền</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Section 3 */}
          <div className="clear-both"></div>
          <SectionHeading number="03" id="he-sinh-thai" title="FamCare – Hệ sinh thái đồng hành bảo vệ sức khỏe người tiểu đường" />

          <p className="text-justify mb-6">
            Để biến công nghệ dinh dưỡng cá nhân hóa AI thành trợ thủ đắc lực cho mọi nhà, FamCare đã tích hợp tính năng thiết lập thực đơn cho người tiểu đường thông minh ngay trên ứng dụng di động. Chúng tôi tin rằng, một chế độ ăn tốt không phải là một chế độ ăn khắc nghiệt, mà là một thực đơn mang lại sự hạnh phúc và thảnh thơi cho người bệnh.
          </p>
          <ul className="list-disc pl-6 mb-6 space-y-2 text-justify">
            <li><strong>Lên thực đơn bằng AI cá nhân hóa:</strong> Ứng dụng tự động thiết kế thực đơn 7 ngày cho người tiểu đường dễ làm, liên tục thay đổi món ăn dựa trên sở thích ẩm thực và ngân sách của người dùng nhưng vẫn đảm bảo tuyệt đối các chỉ số an toàn về đường huyết.</li>
            <li><strong>Cảnh báo tương tác thực phẩm:</strong> Hệ thống tự động nhận diện và đưa ra các cảnh báo trực quan về những món ăn có nguy cơ làm tăng đường huyết đột ngột, giúp người bệnh chủ động né tránh "bẫy dinh dưỡng".</li>
            <li><strong>Đồng bộ hóa hồ sơ gia đình:</strong> Mọi nhật ký ăn uống và biểu đồ đường huyết sẽ được đồng bộ hóa tức thì, giúp con cái dễ dàng theo dõi, chăm sóc sức khỏe cho cha mẹ từ xa, tạo nên sợi dây gắn kết yêu thương bền chặt.</li>
          </ul>

          {/* Section 4 */}
          <SectionHeading number="04" id="ket-bai" title="Kết bài" />

          <p className="text-justify mb-6">
            Tóm lại, việc xây dựng một thực đơn cho người tiểu đường khoa học, chuẩn phác đồ không còn là một cuộc chiến cân não đầy căng thẳng khi có sự hỗ trợ của công nghệ hiện đại. Bằng việc áp dụng giải pháp lên thực đơn bằng AI và duy trì một chế độ ăn cho người tiểu đường hợp lý, bạn hoàn toàn có thể làm chủ chỉ số sức khỏe, ngăn ngừa biến chứng và tận hưởng cuộc sống một cách trọn vẹn nhất.
          </p>
          <p className="text-justify mb-6">
            Hãy để những lo toan về việc "ngày mai ăn gì" lùi vào quá khứ và trải nghiệm FamCare ngay hôm nay tại: <a href="https://famcare.site/app/meal-plan" className="text-cyan-600 hover:text-cyan-700 underline font-semibold">https://famcare.site/app/meal-plan</a>
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
            title="Thực Đơn Tiểu Đường 7 Ngày: Lên Kế Hoạch Ăn Uống Khoa Học"
            url="https://famcare.site/resources/thuc-don-tieu-duong-7-ngay-kh-hoc"
            description="Hướng dẫn lên thực đơn tiểu đường 7 ngày an toàn và ngon."
          />

          {/* Related Articles */}
          <div className="mt-20 pt-16 border-t-2 border-slate-200">
            <h2 className="font-display text-2xl font-bold text-slate-900 mb-8">Bài viết liên quan</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Link to="/resources/thuc-pham-nguoi-benh-tieu-duong-nen-tranh-va-che-do-an" className="p-6 border border-slate-200 rounded-xl hover:border-cyan-400 hover:shadow-md transition-all group">
                <h3 className="font-bold text-slate-800 mb-2 group-hover:text-cyan-600 transition-colors">Thực phẩm tiểu đường nên tránh</h3>
                <p className="text-slate-600 text-sm">Xây dựng chế độ ăn chuẩn y khoa.</p>
              </Link>
              <Link to="/resources/len-thuc-don-dinh-duong-can-bang" className="p-6 border border-slate-200 rounded-xl hover:border-cyan-400 hover:shadow-md transition-all group">
                <h3 className="font-bold text-slate-800 mb-2 group-hover:text-cyan-600 transition-colors">"Hôm nay ăn gì?" - Thực đơn cá nhân</h3>
                <p className="text-slate-600 text-sm">Thiết kế thực đơn khoa học.</p>
              </Link>
              <Link to="/resources/theo-doi-chi-so-bmi-dung-cach" className="p-6 border border-slate-200 rounded-xl hover:border-cyan-400 hover:shadow-md transition-all group">
                <h3 className="font-bold text-slate-800 mb-2 group-hover:text-cyan-600 transition-colors">Cách theo dõi chỉ số BMI chuẩn xác</h3>
                <p className="text-slate-600 text-sm">Hiểu rõ ý nghĩa chỉ số BMI.</p>
              </Link>
              <a href="/app/meal-plan" className="p-6 border border-slate-200 rounded-xl hover:border-cyan-400 hover:shadow-md transition-all group">
                <h3 className="font-bold text-slate-800 mb-2 group-hover:text-cyan-600 transition-colors">🍽️ Thực đơn AI</h3>
                <p className="text-slate-600 text-sm">Thiết kế thực đơn 7 ngày.</p>
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
