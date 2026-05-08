import React, { useEffect, useState } from 'react';
import PublicNavbar from "@/components/PublicNavbar";
import PublicFooter from "@/components/PublicFooter";
import { List, ArrowRight, Quote, ShieldCheck, AlertTriangle, Info } from "lucide-react";
import { Link } from "react-router-dom";

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

const InfoBox = ({ icon: Icon, title, children, colorClass = "blue" }: { icon: any, title: string, children: React.ReactNode, colorClass?: string }) => {
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
            Biên soạn dựa trên các nghiên cứu từ Tạp chí Patient (2014), Tạp chí Thyroid (2014), Pharmacokinetics and Pharmacodynamics (2021) và WHO
          </p>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-800 via-cyan-500 to-blue-700 h-1 opacity-90"></div>
      </header>

      <main className="px-4 sm:px-8 lg:px-16 py-10 max-w-[860px] mx-auto text-[1.125rem] text-slate-800 leading-[1.85] font-light">
        
        {/* Lead text */}
        <div className="mb-14">
          <p className="text-[1.15rem] leading-[1.9] text-slate-700 font-body text-justify italic border-l-[3px] border-cyan-500 bg-gradient-to-r from-cyan-50/50 to-transparent p-5 sm:py-6 sm:px-7 rounded-r-2xl">
            <span className="font-bold text-slate-900 tracking-wide uppercase text-xs mr-3 not-italic">PHÂN TÍCH CHUYÊN SÂU &mdash;</span>
            Quên uống thuốc là tình huống rất phổ biến, nhưng xử lý sai cách có thể ảnh hưởng lớn đến hiệu quả điều trị. Nên uống bù hay bỏ qua liều đã quên? Những loại thuốc nào bắt buộc phải dùng đúng giờ? FamCare sẽ giúp bạn hiểu rõ cách xử trí an toàn!
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
                  className={`text-left w-full transition-colors rounded-md px-2.5 py-1 hover:bg-cyan-50/80 ${
                    item.level === 3 ? "pl-5 text-slate-500 text-[13px]" : "font-semibold text-slate-700"
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
          Việc quên uống thuốc thường đến từ những xáo trộn trong nhịp sống hằng ngày. Nghiên cứu trên tạp chí Patient cho thấy các nguyên nhân phổ biến bao gồm thay đổi thói quen (đi du lịch, khách đến nhà), bị phân tâm bởi các hoạt động xã hội, hoặc đơn giản là những gián đoạn nhỏ như điện thoại.
        </p>
        <p className="text-justify mb-8">
          Trạng thái quá bận rộn hoặc mệt mỏi cũng khiến việc uống thuốc dễ bị bỏ sót. Nhiều người thậm chí không chắc mình đã uống thuốc hay chưa, dẫn đến lo lắng và xử lý sai.
        </p>

        <ArticleImage src="/bai-4/hinh1.jpg" alt="Tại sao chúng ta quên uống thuốc?" />

        {/* Section 2 */}
        <SectionHeading number="02" id="uong-bu-hay-bo" title="Uống bù hay bỏ qua? Nguyên tắc chung" />
        
        <p className="text-justify mb-5">
          Việc nên "uống bù hay bỏ qua" phụ thuộc vào "thời gian bán hủy" của thuốc. Nếu thuốc tồn tại lâu trong cơ thể, bạn có thể uống bù ngay khi nhớ ra. Ngược lại, nếu thuốc đào thải nhanh, uống bù có thể khiến nồng độ thuốc tăng đột ngột gây nguy hiểm.
        </p>
        
        {/* Pull quote */}
        <div className="bg-slate-900 text-cyan-50 my-12 p-8 sm:p-10 rounded-xl relative shadow-lg">
          <Quote className="absolute top-6 left-6 text-cyan-500/40 w-16 h-16" strokeWidth={1} />
          <p className="text-justify font-display text-xl sm:text-2xl italic m-0 pl-10 leading-relaxed z-10 relative">
            "Không bao giờ tự ý uống gấp đôi liều để 'bù' cho liều đã quên mà không có chỉ dẫn của chuyên gia y tế."
          </p>
        </div>

        <ArticleImage src="/bai-4/hinh2.jpg" alt="Uống thuốc bù hay nên bỏ qua?" />

        {/* Section 3 */}
        <div className="clear-both"></div>
        <SectionHeading number="03" id="huong-dan-xu-ly" title="Hướng dẫn xử lý cho từng loại thuốc cụ thể" />
        
        <h3 id="huyet-ap" className="font-display text-xl font-bold text-cyan-800 mt-10 mb-3 scroll-mt-28">
          3.1. Quên uống thuốc huyết áp
        </h3>
        <p className="text-justify mb-5">
          Thuốc huyết áp thường có tác dụng dài. Nếu nhớ ra sớm và còn xa liều tiếp theo, hãy uống ngay. Nếu gần liều kế tiếp (còn 2-3 tiếng), hãy bỏ qua.
        </p>
        <InfoBox icon={ShieldCheck} title="Cách xử lý an toàn" colorClass="green">
          Nếu vẫn còn xa thời điểm uống liều tiếp theo, bạn hãy uống ngay khi nhớ ra. Nếu đã gần tới giờ, hãy bỏ qua.
        </InfoBox>
        <InfoBox icon={AlertTriangle} title="Tuyệt đối tránh" colorClass="red">
          Không uống gấp đôi liều. Điều này có thể khiến huyết áp tụt nhanh, gây chóng mặt hoặc té ngã.
        </InfoBox>

        <h3 id="tranh-thai" className="font-display text-xl font-bold text-cyan-800 mt-10 mb-3 scroll-mt-28">
          3.2. Quên uống thuốc tránh thai
        </h3>
        <p className="text-justify mb-5">
          Với loại kết hợp, nếu quên dưới 24 tiếng, hãy uống ngay khi nhớ ra (kể cả phải uống 2 viên cùng ngày). Nếu quên trên 24 tiếng, cần dùng thêm biện pháp bảo vệ trong 7 ngày.
        </p>
        <InfoBox icon={Info} title="Lưu ý" colorClass="blue">
          Thuốc chỉ chứa progestin (mini-pill) rất nghiêm ngặt: trễ quá 3 tiếng là đã cần dùng thêm biện pháp tránh thai bổ sung.
        </InfoBox>

        <h3 id="insulin" className="font-display text-xl font-bold text-cyan-800 mt-10 mb-3 scroll-mt-28">
          3.3. Quên tiêm Insulin
        </h3>
        <p className="text-justify mb-5">
          Rất khó xử lý vì phụ thuộc vào mức đường huyết. Nếu là insulin tác dụng nhanh, có thể tiêm ngay nếu đang ăn. Nếu đã qua 1-2 tiếng, KHÔNG nên tiêm bù.
        </p>

        <h3 id="hiv" className="font-display text-xl font-bold text-cyan-800 mt-10 mb-3 scroll-mt-28">
          3.4. Quên uống thuốc HIV (ARV)
        </h3>
        <p className="text-justify mb-5">
          Đòi hỏi tuân thủ cực cao để tránh virus kháng thuốc. Nếu còn cách xa liều tiếp theo ({'>'}8 tiếng), hãy uống ngay. Nếu gần ({'<'}4-6 tiếng), bỏ qua liều đã quên.
        </p>

        <h3 id="khang-sinh" className="font-display text-xl font-bold text-cyan-800 mt-10 mb-3 scroll-mt-28">
          3.5. Quên uống thuốc kháng sinh
        </h3>
        <p className="text-justify mb-5">
          Cần duy trì nồng độ ổn định. Uống ngay nếu còn xa liều tiếp theo. Quan trọng nhất là luôn uống ĐỦ liệu trình kể cả khi đã thấy khỏe hơn.
        </p>

        {/* Tip Box */}
        <div className="bg-cyan-50/80 border border-cyan-200 border-l-4 border-l-cyan-600 p-6 rounded-r-xl my-10 relative overflow-hidden" id="meo-ghi-nho">
          <div className="font-sans text-[11px] font-bold tracking-[0.2em] uppercase text-cyan-700 mb-2">
            💡 Mẹo để không bao giờ quên
          </div>
          <ul className="text-justify text-[0.95rem] text-cyan-900 m-0 leading-relaxed font-sans list-disc pl-5 space-y-2">
            <li>Kết hợp với thói quen cố định (để cạnh bàn chải đánh răng).</li>
            <li>Cài đặt nhắc nhở trên điện thoại với tên thuốc cụ thể.</li>
            <li>Dùng hộp thuốc chia ngăn theo ngày/tuần.</li>
            <li>Sử dụng ứng dụng FamCare để quản lý tủ thuốc thông minh.</li>
          </ul>
        </div>

        <div className="text-center text-cyan-500/50 tracking-[10px] my-10 text-xl font-serif">
          ✦ ✦ ✦
        </div>

        {/* Conclusion Box */}
        <div id="ket-luan" className="bg-slate-900 text-slate-100 p-8 sm:p-12 rounded-2xl scroll-mt-28 relative">
          <h2 className="font-display text-3xl font-bold text-cyan-400 mb-5 pb-4 border-b border-white/10">
            Kết luận
          </h2>
          <p className="text-justify text-[1.05rem] text-slate-300 mb-4 font-body">
            Quên uống thuốc là điều bình thường, nhưng biết cách xử lý đúng là chìa khóa để điều trị an toàn. FamCare cung cấp Tủ thuốc AI giúp bạn không còn lo lắng về lịch trình điều trị của gia đình.
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

        <p className="text-justify text-[13px] text-center text-slate-400 mt-16 pt-8 border-t border-slate-200 font-sans">
          Nội dung mang tính tham khảo, không thay thế tư vấn y tế chuyên nghiệp.
        </p>

      </main>

      <PublicFooter />
    </div>
  );
}