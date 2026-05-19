import React, { useEffect, useState } from 'react';
import PublicNavbar from "@/components/PublicNavbar";
import PublicFooter from "@/components/PublicFooter";
import { List, ArrowRight, ShieldCheck, AlertTriangle, Info } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { Helmet } from 'react-helmet-async';
import SocialShareButtons from '@/components/SocialShareButtons';

interface TocItem {
  id: string;
  text: string;
  level: number;
}

const tocItems: TocItem[] = [
  { id: "tai-sao-quen", text: "Tại sao chúng ta quên?", level: 2 },
  { id: "uong-bu-hay-bo", text: "Uống bù hay bỏ qua?", level: 2 },
  { id: "huong-dan-xu-ly", text: "Hướng dẫn xử lý đúng", level: 2 },
  { id: "huyet-ap", text: "Thuốc huyết áp", level: 3 },
  { id: "tranh-thai", text: "Thuốc tránh thai", level: 3 },
  { id: "insulin", text: "Tiêm Insulin", level: 3 },
  { id: "hiv", text: "Thuốc HIV (ARV)", level: 3 },
  { id: "khang-sinh", text: "Thuốc kháng sinh", level: 3 },
  { id: "meo-ghi-nho", text: "Mẹo để không quên", level: 2 },
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

const InfoBox = ({ icon: Icon, title, children, colorClass = "blue" }: { icon: LucideIcon, title: string, children: React.ReactNode, colorClass?: string }) => {
  const colors: Record<string, string> = {
    blue: "bg-blue-50/50 border-blue-500 text-blue-900",
    green: "bg-green-50/50 border-green-500 text-green-900",
    red: "bg-red-50/50 border-red-500 text-red-900",
    cyan: "bg-cyan-50/50 border-cyan-500 text-cyan-900",
  };

  const iconColors: Record<string, string> = {
    blue: "text-blue-500",
    green: "text-green-500",
    red: "text-red-500",
    cyan: "text-cyan-500",
  };

  return (
    <div className={`my-6 border-l-4 p-5 sm:p-6 rounded-r-xl shadow-sm flex items-start gap-4 ${colors[colorClass]}`}>
      <Icon className={`${iconColors[colorClass]} shrink-0 mt-1`} size={24} />
      <div className="text-[1.05rem] leading-relaxed">
        <strong>{title}:</strong> {children}
      </div>
    </div>
  );
};

export default function Article4Page() {
  const [activeId, setActiveId] = useState("");

  useEffect(() => {
    // SEO & View Tracking
    document.title = "QUÊN UỐNG THUỐC THÌ CÓ SAO KHÔNG? HƯỚNG DẪN XỬ LÝ ĐÚNG TỪ CHUYÊN GIA";

    // Increment view count
    fetch('/api/articles/quen-uong-thuoc-va-cach-xu-ly/view', { method: 'POST' })
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
          Quên uống thuốc thì có sao không? Hướng dẫn xử lý đúng | FamCare
        </title>

        <meta
          name="description"
          content="Quên uống thuốc có nguy hiểm không? Tìm hiểu cách xử lý đúng khi quên thuốc huyết áp, tránh thai, insulin, ARV và kháng sinh. Hướng dẫn chi tiết cho mỗi loại thuốc từ chuyên gia FamCare."
        />

        <meta
          name="keywords"
          content="quên uống thuốc, quên uống thuốc có sao không, quên uống thuốc huyết áp, quên thuốc tránh thai, quên tiêm insulin, quên thuốc kháng sinh, lịch uống thuốc, xử lý khi quên thuốc, an toàn sử dụng thuốc, ghi nhớ lịch thuốc"
        />

        <meta
          property="og:title"
          content="Quên uống thuốc thì có sao không? Hướng dẫn xử lý đúng | FamCare"
        />

        <meta
          property="og:description"
          content="Hướng dẫn xử lý an toàn khi quên uống thuốc: thuốc huyết áp, tránh thai, insulin, HIV và kháng sinh."
        />

        <meta property="og:type" content="article" />

        <meta
          property="og:url"
          content="https://famcare.site/resources/quen-uong-thuoc-va-cach-xu-ly"
        />

        <meta
          property="og:image"
          content="https://famcare.site/bai-4/hinh1.jpg"
        />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />

        <meta name="twitter:card" content="summary_large_image" />

        <meta
          name="twitter:title"
          content="Quên uống thuốc thì có sao không? Hướng dẫn xử lý đúng"
        />

        <meta
          name="twitter:description"
          content="Hướng dẫn xử lý an toàn khi quên uống thuốc: thuốc huyết áp, tránh thai, insulin, HIV và kháng sinh."
        />

        <meta
          name="twitter:image"
          content="https://famcare.site/bai-4/hinh1.jpg"
        />

        <link
          rel="canonical"
          href="https://famcare.site/resources/quen-uong-thuoc-va-cach-xu-ly"
        />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": "Quên uống thuốc thì có sao không? Hướng dẫn xử lý đúng",
            "description": "Quên uống thuốc có nguy hiểm không? Tìm hiểu cách xử lý đúng khi quên thuốc huyết áp, tránh thai, insulin, ARV và kháng sinh. Hướng dẫn chi tiết cho mỗi loại thuốc từ chuyên gia FamCare.",
            "image": "https://famcare.site/bai-4/hinh1.jpg",
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
              "@id": "https://famcare.site/resources/quen-uong-thuoc-va-cach-xu-ly"
            }
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
              Quên uống thuốc thì <em className="text-cyan-400 italic font-medium">có sao không?</em> Hướng dẫn xử lý đúng
            </h1>
            <p className="text-justify text-[13px] text-slate-400 tracking-wide uppercase font-sans">
              Biên soạn dựa trên các nghiên cứu đến từ Tạp chí Patient (2014), Tạp chí Thyroid (2014), Tạp chí Pharmacokinetics and Pharmacodynamics (2021) và Tổ chức Y tế Thế giới.
            </p>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-800 via-cyan-500 to-blue-700 h-1 opacity-90"></div>
        </header>

        <main className="px-4 sm:px-8 lg:px-16 py-10 max-w-[860px] mx-auto text-[1.125rem] text-slate-800 leading-[1.85] font-light">

          {/* Lead text */}
          <div className="mb-14">
            <p className="text-[1.15rem] leading-[1.9] text-slate-700 font-body text-justify italic border-l-[3px] border-cyan-500 bg-gradient-to-r from-cyan-50/50 to-transparent p-5 sm:py-6 sm:px-7 rounded-r-2xl">
              <span className="font-bold text-slate-900 tracking-wide uppercase text-xs mr-3 not-italic">PHÂN TÍCH CHUYÊN SÂU &mdash;</span>
              <strong>Quên uống thuốc</strong> là tình huống rất phổ biến trong cuộc sống bận rộn, nhưng xử lý sai cách có thể đem ảnh hưởng rất lớn đến hiệu quả điều trị. Nên uống bù hay bỏ qua liều đã quên? Những loại thuốc nào bắt buộc phải dùng đúng giờ, đúng liều? Bài viết của FamCare sẽ giúp bạn hiểu rõ cách xử trí an toàn!
            </p>
          </div>

          {/* Table of Contents */}
          <nav className="bg-white/60 backdrop-blur rounded-xl p-6 mb-14 border border-cyan-100 shadow-sm float-none md:float-right md:ml-8 md:mb-8 md:w-64 font-sans text-sm">
            <div className="flex items-center gap-2 mb-4">
              <List size={16} className="text-cyan-600" />
              <span className="font-bold text-slate-900 uppercase tracking-widest text-xs">Mục lục nhanh</span>
            </div>
            <ul className="space-y-1.5 text-left">
              {tocItems.map(item => (
                <li key={item.id}>
                  <button
                    onClick={() => scrollTo(item.id)}
                    className={`text-left w-full transition-colors rounded-md px-2.5 py-1 hover:bg-cyan-50/80 ${item.level === 3 ? "pl-5 text-slate-500 text-[13px]" : "font-semibold text-slate-700"
                      } ${activeId === item.id ? "bg-cyan-50 text-cyan-700 font-medium" : ""}`}
                  >
                    {item.text}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          {/* Section 1 */}
          <SectionHeading number="01" id="tai-sao-quen" title="Tại sao chúng ta quên uống thuốc?" />

          <p className="text-justify mb-5">
            Việc <strong>quên uống thuốc</strong> không hẳn xuất phát từ sự chủ quan, mà thường đến từ những xáo trộn rất “đời thường” trong nhịp sống hằng ngày. Theo nghiên cứu đăng trên tạp chí Patient (Brod và cộng sự, 2013–2014) tại Canada, Đức và Trung Quốc, những nguyên nhân phổ biến nhất bao gồm sự thay đổi thói quen sinh hoạt như đi du lịch, có khách đến nhà hay xử lý tình huống khẩn cấp; bị phân tâm bởi các hoạt động xã hội như ăn tối, tụ họp; hoặc đơn giản là những gián đoạn nhỏ như một cuộc điện thoại hay tin nhắn. Bên cạnh đó, trạng thái quá bận rộn: vội vàng vào buổi sáng, mệt mỏi vào buổi tối, cũng khiến việc uống thuốc dễ bị bỏ sót.
          </p>
          <p className="text-justify mb-8">
            Đáng chú ý, nhiều người không chỉ “quên hẳn” mà còn rơi vào tình huống không chắc mình đã uống thuốc hay chưa, dẫn đến lo lắng và có thể xử lý sai như uống trùng liều hoặc bỏ qua liều cần thiết.
          </p>

          <ArticleImage src="/bai-4/hinh1.jpg" alt="Tại sao chúng ta quên uống thuốc?" />

          {/* Section 2 */}
          <SectionHeading number="02" id="uong-bu-hay-bo" title="Uống bù hay bỏ qua?" />

          <p className="text-justify mb-5">
            Khi lỡ quên một liều thuốc, việc nên “uống bù hay bỏ qua” thực ra phụ thuộc vào đặc tính của chính loại thuốc bạn đang dùng. Theo nghiên cứu của Counterman & Lawley (2021), yếu tố quan trọng nhất là “thời gian bán hủy”. Thời gian bán hủy có thể hiểu đơn giản là thời gian thuốc tồn tại trong cơ thể.
          </p>
          <p className="text-justify mb-5">
            Nếu thuốc “ở lại” trong cơ thể lâu (vài ngày), bạn có thể uống bù ngay khi nhớ ra vì nồng độ thuốc chỉ tăng nhẹ, gần như không gây nguy hiểm. Ngược lại, nếu thuốc bị đào thải nhanh (chỉ vài giờ), việc uống bù có thể khiến nồng độ thuốc tăng đột ngột, nên cách an toàn hơn trong trường hợp này là bỏ qua liều đã quên và uống liều tiếp theo đúng giờ.
          </p>
          <p className="text-justify mb-8">
            Tuy nhiên, đây chỉ là nguyên tắc chung, vì mỗi loại thuốc và mỗi tình trạng sức khỏe sẽ khác nhau. Do đó, bạn vẫn nên hỏi bác sĩ hoặc dược sĩ trước khi tự quyết định để tránh rủi ro không đáng có.
          </p>

          <ArticleImage src="/bai-4/hinh2.jpg" alt="Uống thuốc bù hay nên bỏ qua?" />

          {/* Section 3 */}
          <div className="clear-both"></div>
          <SectionHeading number="03" id="huong-dan-xu-ly" title="Vậy, xử lý như thế nào khi quên uống thuốc?" />

          <h3 id="huyet-ap" className="font-display text-xl font-bold text-cyan-800 mt-10 mb-3 scroll-mt-28">
            3.1. Quên uống thuốc huyết áp thì phải làm sao?
          </h3>
          <p className="text-justify mb-5">
            Phần lớn thuốc huyết áp phổ biến như amlodipine, losartan hay lisinopril có thời gian tác dụng khá dài, nên nếu lỡ quên một liều, bạn không cần quá lo lắng. Trường hợp bạn có <strong>lịch uống thuốc</strong> lúc 7h sáng nhưng đến 2h chiều mới nhớ ra, FamCare gợi ý bạn cách giải quyết như sau:
          </p>
          <InfoBox icon={ShieldCheck} title="Cách xử lý an toàn" colorClass="green">
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Nếu vẫn còn xa thời điểm uống liều tiếp theo, bạn hãy uống ngay khi nhớ ra.</li>
              <li>Nếu đã gần tới giờ uống liều kế tiếp (còn khoảng 2–3 tiếng), bạn hãy bỏ qua liều đã quên, uống liều tiếp theo như bình thường.</li>
            </ul>
          </InfoBox>
          <InfoBox icon={AlertTriangle} title="Tuyệt đối tránh" colorClass="red">
            Không uống gấp đôi liều để “bù” lại liều đã quên. Điều này có thể khiến huyết áp tụt nhanh, gây chóng mặt hoặc té ngã.
          </InfoBox>

          <h3 id="tranh-thai" className="font-display text-xl font-bold text-cyan-800 mt-10 mb-3 scroll-mt-28">
            3.2. Quên uống thuốc tránh thai (dạng viên uống hằng ngày) thì phải làm sao?
          </h3>
          <p className="text-justify mb-5">
            Thuốc tránh thai là một trong những loại thuốc <strong>phụ thuộc rất chặt vào việc uống đúng giờ</strong>, nên khi quên liều, bạn cần xử lý cẩn thận hơn so với nhiều loại thuốc khác. Với thuốc tránh thai kết hợp (loại phổ biến nhất), nếu bạn quên dưới 24 tiếng, hãy uống ngay khi nhớ ra, kể cả khi bạn phải uống 2 viên trong cùng ngày thì hiệu quả tránh thai vẫn được đảm bảo.
          </p>
          <p className="text-justify mb-5">
            Tuy nhiên, nếu quên quá 24 tiếng hoặc quên liên tiếp 2 ngày, bạn chỉ nên uống viên gần nhất, bỏ qua viên đã quên và <strong>cần dùng thêm biện pháp bảo vệ như bao cao su trong ít nhất 7 ngày</strong>. Trong trường hợp đã có quan hệ không bảo vệ gần đây, nên cân nhắc hỏi bác sĩ về thuốc tránh thai khẩn cấp.
          </p>
          <InfoBox icon={Info} title="Lưu ý quan trọng" colorClass="blue">
            Với thuốc chỉ chứa progestin (mini-pill), nguyên tắc còn nghiêm ngặt hơn: bạn phải uống đúng trong khung giờ cố định mỗi ngày, và chỉ cần trễ quá 3 tiếng là đã cần dùng thêm biện pháp tránh thai bổ sung ngay. Đặc biệt, việc quên thuốc ở tuần đầu tiên của vỉ là rủi ro cao nhất vì cơ thể chưa được bảo vệ hoàn toàn. Do đó, lúc này, tốt nhất bạn nên kiểm tra kỹ hướng dẫn sử dụng hoặc tham khảo ý kiến bác sĩ để đảm bảo an toàn.
          </InfoBox>

          <h3 id="insulin" className="font-display text-xl font-bold text-cyan-800 mt-10 mb-3 scroll-mt-28">
            3.3. Quên tiêm Insulin thì phải làm sao?
          </h3>
          <p className="text-justify mb-5">
            Insulin và các thuốc điều trị tiểu đường là nhóm <strong>khó xử lý nhất khi quên liều</strong>, vì cách dùng phụ thuộc vào nhiều yếu tố như loại insulin, bữa ăn và mức đường huyết tại thời điểm đó. Nếu là insulin tác dụng nhanh (tiêm trước bữa ăn), bạn có thể tiêm ngay nếu vẫn đang ăn hoặc vừa ăn xong. Nhưng nếu đã qua 1–2 tiếng sau bữa ăn, <strong>không nên tiêm bù</strong> vì có thể gây hạ đường huyết nguy hiểm. Lúc này, cách an toàn hơn là kiểm tra đường huyết và theo dõi cơ thể.
          </p>
          <p className="text-justify mb-5">
            Với insulin tác dụng chậm (tiêm nền mỗi ngày), bạn có thể tiêm ngay khi nhớ ra nếu chưa quá gần thời điểm của liều kế tiếp, sau đó tiếp tục lịch tiêm như bình thường và tuyệt đối không tiêm gấp đôi.
          </p>
          <p className="text-justify mb-5">
            Điều quan trọng là nhiều người bệnh không chỉ quên mà còn <strong>không chắc mình đã tiêm hay chưa</strong>, dẫn đến xử lý sai như tiêm trùng liều hoặc bỏ liều không cần thiết. Vì vậy, việc ghi lại thời gian tiêm hoặc sử dụng công cụ nhắc nhở là rất cần thiết. Và cần nhớ rằng, với insulin, <strong>không nên tự ý điều chỉnh liều</strong> nếu chưa có hướng dẫn từ bác sĩ, vì mỗi quyết định đều ảnh hưởng trực tiếp đến mức đường huyết và an toàn của bạn.
          </p>

          <h3 id="hiv" className="font-display text-xl font-bold text-cyan-800 mt-10 mb-3 scroll-mt-28">
            3.4. Quên uống thuốc HIV thì phải làm sao?
          </h3>
          <p className="text-justify mb-5">
            Thuốc điều trị HIV (ARV) đòi hỏi mức độ tuân thủ rất cao, vì chỉ cần bỏ liều không đúng cách cũng có thể khiến virus hoạt động trở lại và tăng nguy cơ kháng thuốc. Nếu bạn nhớ ra sớm, khi vẫn còn cách xa thời điểm uống liều tiếp theo (khoảng trên 8 tiếng), hãy uống ngay liều đã quên rồi tiếp tục lịch uống như bình thường. Ngược lại, nếu đã gần tới giờ uống liều kế tiếp (khoảng dưới 4–6 tiếng), tốt nhất là <strong>bỏ qua liều đã quên và không uống gấp đôi</strong>, sau đó uống liều tiếp theo đúng giờ.
          </p>
          <p className="text-justify mb-5">
            Điều quan trọng là mỗi phác đồ điều trị HIV có thể có hướng dẫn riêng, nên bạn không nên tự ý xử lý theo cảm tính. Nếu lỡ quên thuốc, hãy theo dõi sát và trao đổi với bác sĩ để được hướng dẫn chính xác, đảm bảo hiệu quả điều trị lâu dài và an toàn cho sức khỏe.
          </p>

          <h3 id="khang-sinh" className="font-display text-xl font-bold text-cyan-800 mt-10 mb-3 scroll-mt-28">
            3.5. Quên uống thuốc kháng sinh thì phải làm sao?
          </h3>
          <p className="text-justify mb-5">
            Kháng sinh cần được uống đều đặn để duy trì nồng độ ổn định trong cơ thể, giúp tiêu diệt vi khuẩn hiệu quả. Vì vậy, khi lỡ quên một liều, cách xử lý sẽ phụ thuộc vào thời điểm bạn nhớ ra. Nếu vẫn còn khá xa liều tiếp theo (hơn nửa khoảng cách giữa hai liều), bạn có thể uống ngay khi nhớ rồi tiếp tục lịch uống như bình thường. Nhưng nếu đã gần tới giờ uống liều kế tiếp, tốt nhất là <strong>bỏ qua liều đã quên và không uống gấp đôi</strong>, vì điều này không giúp tăng hiệu quả mà còn có thể gây tác dụng phụ.
          </p>
          <p className="text-justify mb-5">
            Một điều rất quan trọng là <strong>luôn uống đủ liệu trình kháng sinh</strong>, ngay cả khi bạn đã thấy khỏe hơn. Việc tự ý ngưng giữa chừng hoặc uống không đúng cách có thể khiến vi khuẩn chưa bị tiêu diệt hoàn toàn và làm tăng nguy cơ kháng kháng sinh về sau.
          </p>

          {/* Section 4 */}
          <SectionHeading number="04" id="meo-ghi-nho" title="Làm thế nào để luôn uống thuốc đúng giờ, đúng cử?" />
          <p className="text-justify mb-6">
            Nghiên cứu của Brod et al. ghi nhận rằng khoảng một phần ba bệnh nhân đã chủ động áp dụng chiến lược nhắc nhở trực quan - ví dụ dán giấy ghi chú, đặt hộp thuốc bên cạnh bàn chải, hay di chuyển đồ vật để biết mình đã uống hay chưa. Nhưng những phương pháp thủ công này rất dễ thất bại. Do đó, chúng tôi gợi ý bạn thử các phương pháp sau:
          </p>

          <div className="grid sm:grid-cols-2 gap-6 mb-10">
            <div className="bg-white border border-slate-100 shadow-sm p-6 rounded-2xl relative overflow-hidden group hover:border-cyan-200 transition-colors">
              <div className="text-5xl font-black text-slate-50 absolute -right-2 -top-4 select-none group-hover:text-cyan-50 transition-colors">01</div>
              <h4 className="font-bold text-slate-800 mb-2 relative z-10">Kết hợp với thói quen cố định</h4>
              <p className="text-sm text-slate-500 relative z-10 leading-relaxed">Đặt thuốc cạnh bàn chải đánh răng, cốc cà phê sáng, hoặc chìa khóa. Não bộ liên kết thói quen với kích hoạt (trigger) rất hiệu quả.</p>
            </div>

            <div className="bg-white border border-slate-100 shadow-sm p-6 rounded-2xl relative overflow-hidden group hover:border-cyan-200 transition-colors">
              <div className="text-5xl font-black text-slate-50 absolute -right-2 -top-4 select-none group-hover:text-cyan-50 transition-colors">02</div>
              <h4 className="font-bold text-slate-800 mb-2 relative z-10">Cài đặt nhắc nhở trên điện thoại</h4>
              <p className="text-sm text-slate-500 relative z-10 leading-relaxed">Báo thức lặp lại hàng ngày đúng giờ uống thuốc. Đặt tên báo thức cụ thể (ví dụ: "Uống thuốc huyết áp") để tránh nhầm lẫn.</p>
            </div>

            <div className="bg-white border border-slate-100 shadow-sm p-6 rounded-2xl relative overflow-hidden group hover:border-cyan-200 transition-colors">
              <div className="text-5xl font-black text-slate-50 absolute -right-2 -top-4 select-none group-hover:text-cyan-50 transition-colors">03</div>
              <h4 className="font-bold text-slate-800 mb-2 relative z-10">Dùng hộp thuốc chia ngăn theo ngày/tuần</h4>
              <p className="text-sm text-slate-500 relative z-10 leading-relaxed">Cách đơn giản để kiểm tra ngay: "Ngăn hôm nay còn thuốc không?" Nếu còn → chưa uống. Nếu trống → đã uống.</p>
            </div>

            <div className="bg-white border border-slate-100 shadow-sm p-6 rounded-2xl relative overflow-hidden group hover:border-cyan-200 transition-colors">
              <div className="text-5xl font-black text-slate-50 absolute -right-2 -top-4 select-none group-hover:text-cyan-50 transition-colors">04</div>
              <h4 className="font-bold text-slate-800 mb-2 relative z-10">Dùng ứng dụng quản lý thuốc thông minh</h4>
              <p className="text-sm text-slate-500 relative z-10 leading-relaxed">Nhắc nhở tự động, ghi lịch sử uống thuốc, cảnh báo khi sắp hết — giải pháp toàn diện nhất để không còn phụ thuộc vào trí nhớ.</p>
            </div>
          </div>

          <div className="text-center text-cyan-500/50 tracking-[10px] my-10 text-xl font-serif">
            ✦ ✦ ✦
          </div>

          {/* Conclusion Box */}
          <div id="ket-luan" className="bg-slate-900 text-slate-100 p-8 sm:p-12 rounded-2xl scroll-mt-28 relative">
            <h2 className="font-display text-3xl font-bold text-cyan-400 mb-5 pb-4 border-b border-white/10">
              5. Kết luận
            </h2>
            <p className="text-justify text-[1.05rem] text-slate-300 mb-4 font-body">
              <strong>Quên uống thuốc</strong> là một điều rất bình thường trong cuộc sống bận rộn. Điều quan trọng là chúng ta biết cách xử lý đúng đối với từng loại thuốc và xây dựng thói quen để giảm bớt tần suất quên.
            </p>
            <p className="text-justify text-[1.05rem] text-slate-300 mb-4 font-body">
              Tại FamCare cung cấp Tủ thuốc AI và Hồ sơ sức khỏe cá nhân — giúp bạn theo dõi <strong>lịch uống thuốc</strong>, nhận nhắc nhở đúng giờ, và quản lý toàn bộ thông tin y tế của cả gia đình trong một nơi duy nhất.
            </p>

            <div className="mt-10 sm:mt-12 flex justify-center">
              <Link
                to="/app/cabinet"
                className="inline-flex items-center justify-center gap-3 bg-cyan-600 hover:bg-cyan-700 text-white font-bold font-sans text-base px-8 py-4 sm:py-5 rounded-full shadow-lg transition-all duration-200 group w-full sm:w-auto"
              >
                Quản lý tủ thuốc ngay với FamCare
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          <div className="mt-16 pt-8 border-t border-slate-200">
            <p className="text-justify text-[13px] text-slate-500 font-sans mb-4">
              Bài viết và hình ảnh được thực hiện bởi FamCare.<br />
              Bài viết này mang tính thông tin chung và không thay thế cho lời khuyên y tế chuyên nghiệp. Hãy luôn tham khảo bác sĩ hoặc dược sĩ về cách xử lý liều thuốc cụ thể của bạn.
            </p>
            <div className="text-[13px] text-slate-500 font-sans p-4 bg-slate-50 rounded-lg border border-slate-100">
              <strong className="block text-slate-700 mb-1 uppercase tracking-wider text-xs">FamCare - Nền tảng y tế thông minh - Chăm sóc gia đình từ xa</strong>
              <span className="block mb-1">Website: <a href="https://famcare.site/" className="text-cyan-600 hover:underline">https://famcare.site/</a></span>
              <span className="block">Email: <a href="mailto:famcare.support@gmail.com" className="text-cyan-600 hover:underline">famcare.support@gmail.com</a></span>
            </div>
          </div>

          <SocialShareButtons 
            title="Quên uống thuốc thì có sao không? Hướng dẫn xử lý đúng"
            url="https://famcare.site/resources/quen-uong-thuoc-thi-co-sao-khong"
            description="Hướng dẫn xử lý an toàn khi quên uống thuốc"
          />

          {/* Related Articles Section */}
          <div className="mt-20 pt-16 border-t-2 border-slate-200">
            <h2 className="font-display text-2xl font-bold text-slate-900 mb-8">Bài viết liên quan</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Link 
                to="/resources/cach-doc-don-thuoc-giay"
                className="p-6 border border-slate-200 rounded-xl hover:border-cyan-400 hover:shadow-md transition-all group"
              >
                <h3 className="font-bold text-slate-800 mb-2 group-hover:text-cyan-600 transition-colors">Cách đọc đơn thuốc giấy: 5 sai lầm phổ biến</h3>
                <p className="text-slate-600 text-sm">Học cách đọc đơn thuốc chuẩn xác, tránh nhầm lẫn liều lượng và hiểu ký hiệu y tế.</p>
              </Link>
              <Link 
                to="/resources/lua-chon-thuc-pham-dung-de-phat-huy-tac-dung-thuoc"
                className="p-6 border border-slate-200 rounded-xl hover:border-cyan-400 hover:shadow-md transition-all group"
              >
                <h3 className="font-bold text-slate-800 mb-2 group-hover:text-cyan-600 transition-colors">Lựa chọn thực phẩm đúng để phát huy tác dụng thuốc</h3>
                <p className="text-slate-600 text-sm">Hiểu cơ chế tương tác thực phẩm-thuốc để tối ưu hóa điều trị.</p>
              </Link>
              <Link 
                to="/resources/mat-giay-kham-suc-khoe-va-ho-so-y-te"
                className="p-6 border border-slate-200 rounded-xl hover:border-cyan-400 hover:shadow-md transition-all group"
              >
                <h3 className="font-bold text-slate-800 mb-2 group-hover:text-cyan-600 transition-colors">Mất giấy khám sức khỏe: Cách xử lý</h3>
                <p className="text-slate-600 text-sm">Giải pháp nhanh khi mất hồ sơ bệnh án và giấy khám sức khỏe.</p>
              </Link>
              <a 
                href="/app/cabinet"
                className="p-6 border border-slate-200 rounded-xl hover:border-cyan-400 hover:shadow-md transition-all group"
              >
                <h3 className="font-bold text-slate-800 mb-2 group-hover:text-cyan-600 transition-colors">✨ Tủ thuốc AI - Nhắc nhở tự động</h3>
                <p className="text-slate-600 text-sm">Quản lý thông minh lịch uống thuốc để không quên bao giờ.</p>
              </a>
              <a 
                href="/app/scanner"
                className="p-6 border border-cyan-200 bg-cyan-50/50 rounded-xl hover:border-cyan-400 hover:shadow-md transition-all group"
              >
                <h3 className="font-bold text-slate-800 mb-2 group-hover:text-cyan-600 transition-colors">Quét đơn thuốc AI</h3>
                <p className="text-slate-600 text-sm">Số hóa đơn thuốc giấy một cách tự động và chính xác.</p>
              </a>
              <a 
                href="/app/meal-plan"
                className="p-6 border border-slate-200 rounded-xl hover:border-cyan-400 hover:shadow-md transition-all group"
              >
                <h3 className="font-bold text-slate-800 mb-2 group-hover:text-cyan-600 transition-colors">Lập kế hoạch ăn uống thông minh</h3>
                <p className="text-slate-600 text-sm">Nhận gợi ý thực đơn cá nhân hóa theo tình trạng sức khỏe.</p>
              </a>
            </div>
          </div>

        </main>

        <PublicFooter />
      </div>
    </>
  );
}
