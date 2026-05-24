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
  { id: "bmi-la-gi", text: "Chỉ số BMI là gì?", level: 2 },
  { id: "cong-thuc", text: "Công thức tính BMI", level: 3 },
  { id: "y-nghia", text: "Ý nghĩa của chỉ số BMI đối với sức khỏe", level: 2 },
  { id: "cau-hoi", text: "Câu hỏi thường gặp khi đo BMI", level: 2 },
  { id: "bao-lau", text: "Bao lâu thì cần đo BMI một lần?", level: 3 },
  { id: "tre-em", text: "Trẻ em và người lớn tuổi", level: 3 },
  { id: "do-chinh-xac", text: "Làm thế nào để đo BMI chính xác?", level: 2 },
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

export default function Article12Page() {
  const [activeId, setActiveId] = useState("");

  useEffect(() => {
    fetch('/api/articles/theo-doi-chi-so-bmi-dung-cach/view', { method: 'POST' })
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
        <title>Chỉ số BMI nói lên điều gì về sức khỏe? Hướng dẫn theo dõi BMI chuẩn xác</title>
        <meta
          name="description"
          content="Chỉ số BMI nói lên điều gì về sức khỏe của bạn? Khám phá cách đọc chỉ số BMI chuẩn xác, tần suất đo định kỳ và những lưu ý quan trọng để duy trì vóc dáng cân đối."
        />
        <meta name="keywords" content="chỉ số BMI, theo dõi BMI, cách tính BMI, bmi chuẩn, kiểm tra sức khỏe, bmi bao nhiêu là bình thường, tính bmi chính xác, chỉ số khỏe mạnh, quản lý cân nặng" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Chỉ Số BMI Là Gì? Cách Tính BMI Chuẩn Và Theo Dõi Sức Khỏe" />
        <meta name="twitter:description" content="Hướng dẫn cách tính BMI chuẩn và theo dõi chỉ số khỏe mạnh." />
        <meta name="twitter:image" content="https://famcare.site/bai-12/hinh1.jpg" />
        <link rel="canonical" href="https://famcare.site/resources/theo-doi-chi-so-bmi-dung-cach" />
        <meta property="og:title" content="Chỉ số BMI nói lên điều gì về sức khỏe? Hướng dẫn theo dõi BMI chuẩn xác" />
        <meta property="og:description" content="Khám phá cách đọc chỉ số BMI chuẩn xác, tần suất đo định kỳ và những lưu ý quan trọng để duy trì vóc dáng cân đối." />
        <meta property="og:image" content="https://famcare.site/bai-12/hinh1.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:type" content="article" />
        <meta property="og:url" content="https://famcare.site/resources/theo-doi-chi-so-bmi-dung-cach" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": "Chỉ số BMI nói lên điều gì về sức khỏe? Hướng dẫn theo dõi BMI chuẩn xác",
            "description": "Khám phá cách đọc chỉ số BMI chuẩn xác, tần suất đo định kỳ và những lưu ý quan trọng.",
            "image": "https://famcare.site/bai-12/hinh1.jpg",
            "datePublished": "2026-05-15",
            "dateModified": "2026-05-15",
            "author": {"@type": "Organization", "name": "FamCare", "url": "https://famcare.site"},
            "publisher": {"@type": "Organization", "name": "FamCare", "logo": {"@type": "ImageObject", "url": "https://famcare.site/logo.png"}},
            "mainEntityOfPage": {"@type": "WebPage", "@id": "https://famcare.site/resources/theo-doi-chi-so-bmi-dung-cach"}
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
              Chỉ số BMI nói lên điều gì? Cách theo dõi chuẩn xác
            </h1>
            <p className="text-justify text-[13px] text-slate-400 tracking-wide uppercase font-sans">
              Hiểu rõ ý nghĩa chỉ số BMI, cách tính toán và tần suất đo định kỳ để duy trì sức khỏe tối ưu cho cả gia đình.
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
              Chỉ số BMI (Body Mass Index) là công cụ phổ biến dùng để đánh giá tình trạng sức khỏe thông qua số cân nặng và chiều cao. Tuy nhiên, liệu bạn đã biết cách đọc chỉ số này sao cho đúng với cơ địa người Việt, hay bao lâu thì nên kiểm tra lại một lần? Cùng FamCare khám phá cách đọc chỉ số BMI chuẩn xác, tần suất đo định kỳ và những lưu ý quan trọng để duy trì vóc dáng cân đối ngay trong bài viết này!
            </p>
          </div>

          {/* Section 1 */}
          <SectionHeading number="01" id="bmi-la-gi" title="Chỉ số BMI là gì?" />

          <p className="text-justify mb-6">
            Chỉ số BMI (Body Mass Index) hay còn gọi là <strong>chỉ số khối cơ thể</strong>, bắt đầu được đề xuất bởi nhà khoa học người Bỉ Adolphe Quetelet vào năm 1832. Ban đầu, nó được gọi là Quetelet Index, nhưng sau này do tính phổ biến và sự ứng dụng rộng rãi trong việc đo lường thể trạng sức khỏe nên được gọi với tên Body Mass Index (BMI) và sử dụng rộng rãi cho đến nay.
          </p>
          <ArticleImage src="/bai-12/hinh1.jpg" alt="Chỉ số BMI giúp đánh giá tình trạng cơ thể" />

          <p className="text-justify mb-6">
            Chỉ số BMI được dùng phổ biến nhất do có cách tính đơn giản nhất giúp cho chúng ta dễ dàng và nhanh chóng phát hiện người <strong>gầy ốm, suy dinh dưỡng hay thừa cân, béo phì</strong> với các mức độ nặng nhẹ khác nhau trên lâm sàng và trong cộng đồng. Ngoài ra, BMI còn <strong>cảnh báo sớm nguy cơ mắc các bệnh lý nguy hiểm</strong> như bệnh tim, cao huyết áp, tiểu đường loại 2, sỏi mật, viêm khớp, ngưng thở khi ngủ và một số bệnh ung thư.
          </p>

          <p className="text-justify mb-6">
            Trong trường hợp biết được chỉ số BMI của mình ở ngoài mức tiêu chuẩn, bạn có thể <strong>lên kế hoạch giảm cân</strong> hoặc bổ sung dinh dưỡng phù hợp.
          </p>

          <h3 id="cong-thuc" className="font-display text-lg sm:text-xl font-bold text-slate-900 leading-snug mt-10 mb-4 scroll-mt-28">
            Công thức tính BMI
          </h3>
          <p className="mb-4 font-semibold">BMI = Cân nặng (kg) / Chiều cao (m)²</p>
          <ArticleImage src="/bai-12/hinh2.png" alt="Công thức tính BMI" />
          <p className="text-justify mb-6">
            Ví dụ: Nếu bạn nặng 60kg và cao 1m65, chỉ số BMI của bạn sẽ là: 60 / (1.65 × 1.65) = 22.03
          </p>

          {/* Section 2 */}
          <SectionHeading number="02" id="y-nghia" title="Ý nghĩa của chỉ số BMI đối với sức khỏe" />

          <p className="text-justify mb-6">
            Theo Tổ chức Y tế Thế giới (WHO), BMI là căn cứ quan trọng để xác định tình trạng thừa cân hoặc thiếu cân. Tuy nhiên, thể trạng người Châu Á thường có khác biệt so với người Châu Âu, vì vậy bạn nên tham chiếu theo bảng phân loại dành riêng cho khu vực Châu Á.
          </p>

          <div className="overflow-x-auto mb-6">
            <table className="w-full border-collapse border border-slate-300">
              <thead className="bg-slate-100">
                <tr>
                  <th className="border border-slate-300 p-3 text-left">Phân loại</th>
                  <th className="border border-slate-300 p-3 text-left">BMI WHO</th>
                  <th className="border border-slate-300 p-3 text-left">BMI Châu Á</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-slate-300 p-3">Gầy độ I</td>
                  <td className="border border-slate-300 p-3">17 - 18.4</td>
                  <td className="border border-slate-300 p-3">17 - 18.4</td>
                </tr>
                <tr className="bg-green-50">
                  <td className="border border-slate-300 p-3 font-semibold">Bình thường</td>
                  <td className="border border-slate-300 p-3 font-semibold">18.5 - 24.9</td>
                  <td className="border border-slate-300 p-3 font-semibold">18.5 - 22.9</td>
                </tr>
                <tr>
                  <td className="border border-slate-300 p-3">Tiền béo phì</td>
                  <td className="border border-slate-300 p-3">25 - 29.9</td>
                  <td className="border border-slate-300 p-3">23 - 24.9</td>
                </tr>
                <tr>
                  <td className="border border-slate-300 p-3">Béo phì độ I</td>
                  <td className="border border-slate-300 p-3">30 - 34.9</td>
                  <td className="border border-slate-300 p-3">25 - 29.9</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="text-justify mb-6">
            Có 4 yếu tố chính ảnh hưởng đến chỉ số BMI là khối mỡ, khối cơ, khối xương và chiều cao. Thông thường, khối mỡ, khối cơ và khối xương tạo thành trọng lượng và xương tạo nên chiều cao của cơ thể. Khối xương và chiều cao thường ổn định, khó thay đổi, khối mỡ là yếu tố dễ biến đổi nhất, khối cơ thường thay đổi chậm hơn.
          </p>

          <div className="bg-amber-50/80 border border-amber-200 border-l-4 border-l-amber-600 p-6 rounded-r-xl my-10">
            <div className="font-sans text-[11px] font-bold tracking-[0.2em] uppercase text-amber-700 mb-2">⚠️ Lưu ý quan trọng</div>
            <p className="text-justify text-[0.95rem] text-amber-900 m-0 leading-relaxed font-sans">
              Cần lưu ý phân biệt BMI tăng do tăng cơ và tăng mỡ. Ở những người thường xuyên vận động, năng lượng sẽ tích trữ trong các cơ, làm tăng khối lượng cơ – <strong>không được nhầm lẫn</strong> với béo phì. <strong>Ăn uống lành mạnh và tập thể dục thường xuyên</strong> quan trọng hơn là gầy. Các nghiên cứu đã phát hiện ra rằng những người giữ dáng thông qua tập thể dục thường có cuộc sống lâu hơn so với những người không tập luyện thể thao thường xuyên.
            </p>
          </div>

          {/* Section 3 */}
          <SectionHeading number="03" id="cau-hoi" title="Câu hỏi thường gặp khi đo BMI tại nhà" />

          <h3 id="bao-lau" className="font-display text-lg sm:text-xl font-bold text-slate-900 leading-snug mt-8 mb-3 scroll-mt-28">
            Bao lâu thì cần đo BMI một lần?
          </h3>
          <p className="text-justify mb-6">
            👉 Đối với người <strong>trưởng thành khỏe mạnh</strong>, cần đo BMI mỗi <strong>2–4 tuần</strong> để theo dõi xu hướng, cũng có một số nơi khuyến cáo cần đo BMI mỗi 3-6 tháng. Tuy nhiên, cần <strong>tránh việc đo BMI quá thường xuyên</strong> để tránh tạo sức ép tâm lý lên bản thân.
          </p>
          <ArticleImage src="/bai-12/hinh3.jpg" alt="Đo cân nặng vào buổi sáng giúp kết quả BMI chính xác hơn" />

          <div className="bg-emerald-50/80 border border-emerald-200 border-l-4 border-l-emerald-600 p-6 rounded-r-xl my-10">
            <div className="font-sans text-[11px] font-bold tracking-[0.2em] uppercase text-emerald-700 mb-2">🚨 Mẹo nhỏ từ FamCare</div>
            <p className="text-justify text-[0.95rem] text-emerald-900 m-0 leading-relaxed font-sans">
              Hãy thực hiện phép đo vào buổi sáng ngay khi vừa ngủ dậy, sau khi đã đi vệ sinh và chưa ăn sáng để có số cân nặng chính xác nhất.
            </p>
          </div>

          <p className="text-justify mb-6">
            👉 Đối với <strong>người tập luyện thể hình hoặc vận động viên</strong>, việc đo BMI có thể <strong>không quá chính xác</strong> do tỉ lệ khối cơ, khối mỡ của nhóm này thường theo một mục tiêu tập luyện. Trong trường hợp này, các chỉ số được khuyến nghị là tỉ lệ mỡ cơ thể (body fat percentage), chu vi vòng eo, hoặc sử dụng phương pháp DEXA.
          </p>

          <h3 id="tre-em" className="font-display text-lg sm:text-xl font-bold text-slate-900 leading-snug mt-8 mb-3 scroll-mt-28">
            Trẻ em thì có đo BMI được không?
          </h3>
          <p className="text-justify mb-6">
            Câu trả lời là <strong>được</strong> tuy nhiên BMI áp dụng cho trẻ em và thanh thiếu niên có thang đo khác.
          </p>
          <ArticleImage src="/bai-12/hinh4.jpg" alt="Trẻ em có thang đo BMI khác nhau ở từng độ tuổi" />
          <p className="text-justify mb-6">
            👦 <strong>Trẻ em từ 0 – 5 tuổi</strong> có bộ chỉ số theo dõi riêng theo WHO Child Growth Standards (2006). 👦 <strong>Trẻ em và thanh thiếu niên từ 5-19 tuổi</strong> có bộ theo dõi riêng theo WHO Growth Reference 2007. Ba mẹ có thể sử dụng WHO AnthroPlus – phần mềm miễn phí cung cấp bởi WHO để tính toán và in biểu đồ tăng trưởng.
          </p>

          <h3 className="font-display text-lg sm:text-xl font-bold text-slate-900 leading-snug mt-8 mb-3">
            Người mang thai đo BMI được không?
          </h3>
          <p className="text-justify mb-6">
            <strong>Không nên dùng BMI để đánh giá phụ nữ mang thai</strong> vì trong thai kỳ sẽ có các thay đổi về thể trạng và cân nặng, BMI không phù hợp trong giai đoạn này. Trong giai đoạn thai kỳ, các xét nghiệm và đánh giá chi tiết nên theo hướng dẫn của bác sĩ chuyên khoa.
          </p>

          <h3 className="font-display text-lg sm:text-xl font-bold text-slate-900 leading-snug mt-8 mb-3">
            Người lớn tuổi đo BMI được không?
          </h3>
          <p className="text-justify mb-6">
            Đã có nhiều nghiên cứu được đặt ra để xác định mối tương quan của chỉ số BMI với tình trạng sức khỏe của người cao tuổi. Có nhiều yếu tố tác động khiến <strong>chỉ số BMI người cao tuổi cao hơn thông thường</strong> như bệnh lý tim mạch, cao huyết áp, đái tháo đường.
          </p>
          <ArticleImage src="/bai-12/hinh5.jpg" alt="Người lớn tuổi thường có chỉ số BMI cao hơn mức thông thường" />
          <p className="text-justify mb-6">
            Theo Viện Y tế Quốc gia Hoa Kỳ, chỉ số BMI người cao tuổi nên duy trì trong khoảng <strong>25-27</strong> là tốt nhất. Tuy nhiên chỉ số <strong>BMI lý tưởng không giống nhau đối với mọi người</strong> mà cần linh hoạt điều chỉnh tùy vào tình trạng sức khỏe và thể chất của người bệnh.
          </p>

          {/* Section 4 */}
          <div className="clear-both"></div>
          <SectionHeading number="04" id="do-chinh-xac" title="Làm thế nào để đo BMI chính xác?" />

          <p className="text-justify mb-6">
            Để kết quả phản ánh đúng nhất, việc đo và cập nhật chỉ số đúng cách là rất quan trọng. Dưới đây là một vài lưu ý giúp bạn đo BMI chính xác và theo dõi sức khỏe hiệu quả hơn:
          </p>
          <ul className="list-disc pl-6 mb-6 space-y-2">
            <li><strong>Chọn công cụ đáng tin cậy:</strong> Ưu tiên các nền tảng có giải thích rõ công thức tính và phân loại BMI theo cả chuẩn quốc tế lẫn châu Á. Bạn có thể <strong>sử dụng FamCare</strong> để theo dõi và quản lý các chỉ số sức khỏe thuận tiện hơn.</li>
            <li><strong>Cập nhật số liệu chính xác:</strong> Nhập chiều cao và cân nặng mới nhất, hạn chế ước lượng để kết quả phản ánh đúng tình trạng cơ thể.</li>
            <li><strong>Lưu lại kết quả:</strong> Ghi chú ngày đo, chỉ số BMI và vòng eo để dễ theo dõi sự thay đổi theo thời gian.</li>
          </ul>

          <div className="bg-amber-50/80 border border-amber-200 border-l-4 border-l-amber-600 p-6 rounded-r-xl my-10">
            <div className="font-sans text-[11px] font-bold tracking-[0.2em] uppercase text-amber-700 mb-2">⚠️ Lưu ý</div>
            <p className="text-justify text-[0.95rem] text-amber-900 m-0 leading-relaxed font-sans">
              BMI chỉ mang tính tham khảo và hỗ trợ theo dõi sức khỏe. Nếu có bất kỳ dấu hiệu bất thường hoặc lo ngại nào, bạn nên tham khảo ý kiến chuyên gia y tế. Nhớ rằng "đo chỉ số BMI" chỉ là hỗ trợ; mọi nghi ngờ về sức khỏe nên trao đổi trực tiếp với chuyên gia.
            </p>
          </div>

          {/* Section 5 */}
          <SectionHeading number="05" id="ket-luan" title="Kết luận" />

          <p className="text-justify mb-6">
            Chỉ số BMI là "điểm khởi đầu" hoàn hảo để bạn thấu hiểu cơ thể mình. Tuy nhiên, hãy nhớ rằng sức khỏe là sự kết hợp của nhiều yếu tố từ dinh dưỡng, vận động đến tinh thần.
          </p>
          <p className="text-justify mb-6">
            Đừng để những con số làm bạn lo lắng, hãy để chúng trở thành động lực để sống lành mạnh hơn. Sử dụng ngay công cụ theo dõi sức khỏe của FamCare để quản lý chỉ số BMI cho cả gia đình một cách khoa học và dễ dàng nhất!
          </p>

          <div className="mt-12 pt-8 border-t border-slate-200">
            <p className="text-xs text-slate-500 text-justify mb-3">
              <em>Bài viết và hình ảnh được thực hiện bởi <strong>FamCare</strong></em>
            </p>
            <p className="text-xs text-slate-500 text-justify mb-3">
              <em><strong>Bài viết này mang tính thông tin chung và không thay thế cho lời khuyên y tế chuyên nghiệp. Hãy luôn tham khảo bác sĩ hoặc dược sĩ.</strong></em>
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
            title="Chỉ Số BMI Là Gì? Cách Tính BMI Chuẩn Và Theo Dõi Sức Khỏe"
            url="https://famcare.site/resources/theo-doi-chi-so-bmi-dung-cach"
            description="Hướng dẫn cách tính BMI chuẩn và theo dõi chỉ số khỏe mạnh."
          />

          {/* Related Articles */}
          <div className="mt-20 pt-16 border-t-2 border-slate-200">
            <h2 className="font-display text-2xl font-bold text-slate-900 mb-8">Bài viết liên quan</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Link to="/resources/lua-chon-thuc-pham-dung-de-phat-huy-tac-dung-thuoc" className="p-6 border border-slate-200 rounded-xl hover:border-cyan-400 hover:shadow-md transition-all group">
                <h3 className="font-bold text-slate-800 mb-2 group-hover:text-cyan-600 transition-colors">Lựa chọn thực phẩm đúng để phát huy tác dụng thuốc</h3>
                <p className="text-slate-600 text-sm">Hiểu cơ chế tương tác thực phẩm-thuốc.</p>
              </Link>
              <Link to="/resources/thuc-pham-nguoi-benh-tieu-duong-nen-tranh-va-che-do-an" className="p-6 border border-slate-200 rounded-xl hover:border-cyan-400 hover:shadow-md transition-all group">
                <h3 className="font-bold text-slate-800 mb-2 group-hover:text-cyan-600 transition-colors">Thực phẩm người tiểu đường nên tránh</h3>
                <p className="text-slate-600 text-sm">Xây dựng chế độ ăn cá nhân hóa.</p>
              </Link>
              <Link to="/resources/cach-doc-don-thuoc-giay" className="p-6 border border-slate-200 rounded-xl hover:border-cyan-400 hover:shadow-md transition-all group">
                <h3 className="font-bold text-slate-800 mb-2 group-hover:text-cyan-600 transition-colors">Cách đọc đơn thuốc giấy</h3>
                <p className="text-slate-600 text-sm">Học cách đọc đơn thuốc chuẩn xác.</p>
              </Link>
              <a href="/app/meal-plan" className="p-6 border border-slate-200 rounded-xl hover:border-cyan-400 hover:shadow-md transition-all group">
                <h3 className="font-bold text-slate-800 mb-2 group-hover:text-cyan-600 transition-colors">🍽️ Thực đơn AI</h3>
                <p className="text-slate-600 text-sm">Thiết kế thực đơn cá nhân hóa.</p>
              </a>
              <a href="/app/cabinet" className="p-6 border border-slate-200 rounded-xl hover:border-cyan-400 hover:shadow-md transition-all group">
                <h3 className="font-bold text-slate-800 mb-2 group-hover:text-cyan-600 transition-colors">✨ Tủ thuốc AI</h3>
                <p className="text-slate-600 text-sm">Quản lý thông minh sức khỏe.</p>
              </a>
              <a href="/app/scanner" className="p-6 border border-slate-200 rounded-xl hover:border-cyan-400 hover:shadow-md transition-all group">
                <h3 className="font-bold text-slate-800 mb-2 group-hover:text-cyan-600 transition-colors">Quét đơn thuốc AI</h3>
                <p className="text-slate-600 text-sm">Số hóa đơn thuốc giấy tự động.</p>
              </a>
            </div>
          </div>
        </main>

        <PublicFooter />
      </div>
    </>
  );
}
