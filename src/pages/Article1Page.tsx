
import React, { useEffect, useState } from 'react';
import PublicNavbar from "@/components/PublicNavbar";
import PublicFooter from "@/components/PublicFooter";
import { List, ArrowRight, Quote } from "lucide-react";
import { Link } from "react-router-dom";

interface TocItem {
  id: string;
  text: string;
  level: number;
}

const tocItems: TocItem[] = [
  { id: "co-che", text: "Cơ chế tương tác", level: 2 },
  { id: "thuc-pham-vang", text: "Thực phẩm \u201Cvàng\u201D", level: 2 },
  { id: "chat-beo", text: "Chất béo lành mạnh", level: 3 },
  { id: "do-uong-axit", text: "Đồ uống có tính Axit", level: 3 },
  { id: "tinh-duoc", text: "Thực phẩm có tính dược", level: 3 },
  { id: "thuc-pham-tranh", text: "Thực phẩm cần tránh", level: 2 },
  { id: "nuoc-buoi", text: "Nước bưởi", level: 3 },
  { id: "sua", text: "Sữa và chế phẩm từ sữa", level: 3 },
  { id: "rau-xanh", text: "Rau xanh giàu Vitamin K", level: 3 },
  { id: "do-uong-con", text: "Đồ uống có cồn", level: 3 },
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
    <figcaption className="mt-3 text-sm text-slate-500 font-['Source_Serif_4',_Georgia,_serif] italic">
      {alt}
    </figcaption>
  </figure>
);

const SectionHeading = ({ number, title, id }: { number: string, title: string, id: string }) => (
  <div id={id} className="flex items-start gap-4 mt-16 mb-6 scroll-mt-28">
    <span className="font-['Playfair_Display',_Georgia,_serif] text-5xl font-black text-blue-200/60 leading-none -mt-1 shrink-0">
      {number}
    </span>
    <h2 className="font-['Playfair_Display',_Georgia,_serif] text-2xl sm:text-[1.7rem] font-bold text-slate-900 leading-snug border-b-2 border-amber-500 pb-2">
      {title}
    </h2>
  </div>
);

const AvoidListItem = ({ icon, title, desc }: { icon: string, title: React.ReactNode, desc: React.ReactNode }) => (
  <li className="flex gap-4 bg-red-50/50 border-l-[3px] border-red-500 p-5 rounded-r-xl">
    <span className="text-2xl shrink-0 mt-0.5">{icon}</span>
    <div>
      <strong className="block text-red-700 font-['Playfair_Display',_Georgia,_serif] text-lg mb-1.5">
        {title}
      </strong>
      <p className="text-[0.95rem] text-slate-700 leading-relaxed m-0 font-['Source_Serif_4',_Georgia,_serif]">
        {desc}
      </p>
    </div>
  </li>
);

export default function Article1Page() {
  const [activeId, setActiveId] = useState("");

  useEffect(() => {
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
    <div className="min-h-screen bg-sky-50 selection:bg-amber-200 selection:text-amber-900 font-['Source_Serif_4',_Georgia,_serif] pb-10">
      <PublicNavbar />

      <header className="bg-slate-900 pt-16 pb-12 sm:pt-20 sm:pb-16 relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-8 relative z-10">
          <div className="inline-block font-['Source_Serif_4',_Georgia,_serif] text-xs font-semibold tracking-[0.2em] uppercase text-amber-500 border border-amber-600/50 px-3.5 py-1.5 mb-6 rounded-sm">
            Sức khỏe &amp; Dược lý
          </div>
          <h1 className="font-['Playfair_Display',_Georgia,_serif] text-3xl sm:text-5xl lg:text-[3.2rem] font-black text-amber-50 leading-[1.2] mb-5 tracking-tight">
            Lựa chọn thực phẩm <em className="text-amber-500 italic font-medium">đúng</em> để phát huy tác dụng thuốc
          </h1>
          <p className="text-[13px] text-slate-400 tracking-wide uppercase font-sans">
            Biên soạn dựa trên nghiên cứu của <span className="text-amber-500 font-medium">Schmidt &amp; Dalhoff</span> · Tạp chí Drugs
          </p>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-1bg-gradient-to-r from-red-800 via-amber-500 to-emerald-700 h-1 opacity-90"></div>
      </header>

      <main className="px-4 sm:px-8 lg:px-16 py-10 max-w-[860px] mx-auto text-[1.125rem] text-slate-800 leading-[1.85] font-light">
        
        {/* Lead text */}
        <div className="text-[1.2rem] sm:text-[1.3rem] italic text-slate-600 border-l-4 border-amber-500 pl-6 mb-12 py-1">
          Bạn có biết rằng cùng một viên thuốc, nhưng uống cùng thức ăn hay uống lúc đói bụng có thể tạo ra sự khác biệt rất lớn về hiệu quả điều trị? Tương tác giữa thực phẩm và thuốc là một trong những yếu tố thường bị bỏ qua nhất – nhưng lại có thể quyết định thành bại của cả một liệu trình.
        </div>

        {/* Table of Contents */}
        <nav className="bg-white/60 backdrop-blur rounded-xl p-6 mb-14 border border-blue-100 shadow-sm float-none md:float-right md:ml-8 md:mb-8 md:w-64 font-sans text-sm">
          <div className="flex items-center gap-2 mb-4">
            <List size={16} className="text-amber-600" />
            <span className="font-bold text-slate-900 uppercase tracking-widest text-xs">Mục lục nhanh</span>
          </div>
          <ul className="space-y-1.5">
            {tocItems.map(item => (
              <li key={item.id}>
                <button
                  onClick={() => scrollTo(item.id)}
                  className={`text-left w-full transition-colors rounded-md px-2.5 py-1 hover:bg-amber-50/80 ${
                    item.level === 3 ? "pl-5 text-slate-500 text-[13px]" : "font-semibold text-slate-700"
                  } ${activeId === item.id ? "bg-amber-50 text-amber-700 font-medium" : ""}`}
                >
                  {item.text}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* Section 1 */}
        <SectionHeading number="01" id="co-che" title="Cơ chế tương tác của thực phẩm và thuốc" />
        
        <p className="mb-5">
          Thực phẩm không chỉ là nguồn dinh dưỡng mà còn có thể tương tác với thuốc, từ đó làm tăng hiệu quả điều trị hoặc ngược lại gây ra những tác dụng phụ không mong muốn. Các nhà khoa học phân loại các tương tác thành hai nhóm chính: <strong>tương tác dược động học</strong> (ảnh hưởng đến quá trình hấp thụ, chuyển hóa và đào thải thuốc) và <strong>tương tác dược lực học</strong> (tác động trực tiếp vào cơ chế hoạt động của thuốc trong cơ thể).
        </p>
        <p className="mb-8">
          Các đặc điểm bữa ăn, bao gồm hàm lượng dinh dưỡng, thời điểm ăn so với giờ uống thuốc, đều có thể ảnh hưởng đến mức độ tương tác. Các nhà nghiên cứu cũng nhấn mạnh rằng không thể dự đoán chính xác tương tác thực phẩm với thuốc nếu chỉ dựa vào tính chất hóa lý của thuốc nói chung, cần có các nghiên cứu lâm sàng cụ thể cho từng loại thuốc.
        </p>

        <ArticleImage src="/bai-1/hinh1.jpg" alt="Mô phỏng cơ chế làm việc của thuốc trong dạ dày" />

        {/* Section 2 */}
        <SectionHeading number="02" id="thuc-pham-vang" title="Nhóm thực phẩm &quot;vàng&quot; giúp tăng cường hiệu quả điều trị" />
        
        <p className="mb-8">
          Không phải mọi tương tác thực phẩm với thuốc đều có hại. Với nhiều loại thuốc, ăn đúng loại thực phẩm, đúng thời điểm chính là "chìa khóa" giúp thuốc phát huy tối đa công dụng. Dưới đây là những nhóm thực phẩm được ghi nhận có tác dụng hỗ trợ điều trị rõ rệt:
        </p>

        <h3 id="chat-beo" className="font-['Playfair_Display',_Georgia,_serif] text-xl font-bold text-amber-800 mt-10 mb-3 scroll-mt-28">
          # Nhóm thực phẩm giàu chất béo lành mạnh
        </h3>
        <ArticleImage src="/bai-1/hinh2.jpg" alt="Các loại hạt, bơ giàu chất béo tốt" />
        <p className="mb-5">
          Các nhà nghiên cứu đã chỉ ra chất béo kích thích tiết mật, giúp hòa tan thuốc Liphophilic. Đối với các loại thuốc trị nhiễm ký sinh trùng như Albendazole hay thuốc trị nấm Griseofulvin, một bữa ăn giàu chất béo có thể làm tăng khả năng hấp thụ thuốc lên gấp nhiều lần. Tương tự, thuốc điều trị mụn Isotretinoin cũng phát huy tác dụng tốt hơn khi dùng chung với bữa ăn.
        </p>

        <h3 id="do-uong-axit" className="font-['Playfair_Display',_Georgia,_serif] text-xl font-bold text-amber-800 mt-10 mb-3 scroll-mt-28">
          # Các đồ uống có tính Axit
        </h3>
        <p className="mb-5">
          Đối với các bệnh nhân có vấn đề về tiết axit dạ dày (viêm dạ dày), môi trường axit thấp sẽ ngăn cản sự hòa tan của một số thuốc cơ bản yếu. Uống các loại nước giải khát có tính axit như Cola cùng với Itraconazole hoặc Ketoconazole có thể tăng khả năng hấp thụ thuốc từ 38% đến 220% ở những bệnh nhân này.
        </p>
        <ArticleImage src="/bai-1/hinh3.jpg" alt="Thức uống có vị chua, men vi sinh" />

        {/* Pull quote */}
        <div className="bg-slate-900 text-amber-50 my-12 p-8 sm:p-10 rounded-xl relative shadow-lg">
          <Quote className="absolute top-6 left-6 text-amber-500/40 w-16 h-16" strokeWidth={1} />
          <p className="font-['Playfair_Display',_Georgia,_serif] text-xl sm:text-2xl italic m-0 pl-10 leading-relaxed z-10 relative">
            "Tương tác thực phẩm–thuốc có thể vô tình làm giảm hoặc tăng tác dụng của thuốc, dẫn đến thất bại điều trị hoặc gia tăng độc tính – ảnh hưởng bất lợi đến chăm sóc bệnh nhân."
          </p>
        </div>

        <h3 id="tinh-duoc" className="font-['Playfair_Display',_Georgia,_serif] text-xl font-bold text-amber-800 mt-10 mb-3 scroll-mt-28">
          # Nhóm các thực phẩm có tính dược
        </h3>
        <p className="mb-5">
          Một số thực phẩm có tính dược tự nhiên khi phối hợp đúng cách có thể hỗ trợ hiệu quả của thuốc chính. Việc sử dụng các thực phẩm chức catechin (EGCG) thường có trong trà xanh, trà olong, có thể làm tăng nồng độ Tacrolimus trong huyết tương. Nghệ cũng là một thực phẩm hữu hiệu giúp giảm độc tính của các thuốc hóa trị mạnh như Cisplatin và Methotrexate.
        </p>
        <ArticleImage src="/bai-1/hinh4.jpg" alt="Trà xanh và nghệ nghệ tươi" />

        {/* Section 3 */}
        <div className="clear-both"></div>
        <SectionHeading number="03" id="thuc-pham-tranh" title="Một vài thực phẩm cần tránh trong quá trình điều trị" />
        
        <p className="mb-8">
          Bên cạnh những thực phẩm hỗ trợ điều trị, một số loại có thể làm giảm đáng kể hiệu quả của thuốc hoặc thậm chí gây ra phản ứng cực kỳ nguy hiểm:
        </p>

        <ul className="flex flex-col gap-4 mb-10">
          <AvoidListItem 
            icon="🍊" 
            title={<span>Nước bưởi <span className="text-slate-500 font-sans text-sm font-normal ml-1 border pl-2 pr-2 rounded-full hidden sm:inline-block">Grapefruit</span></span>}
            desc="Chứa chất ức chế mạnh enzyme CYP3A4, làm tăng sinh khả dụng của felodipine lên tới 284%, statins (hạ mỡ máu) lên trên 1000%. Cần tránh hoàn toàn khi dùng thuốc huyết áp và tim mạch."
          />
          <AvoidListItem 
            icon="🥛" 
            title="Sữa và các chế phẩm từ sữa"
            desc="Canxi tạo thành phức hợp không hòa tan, ảnh hưởng đến nhóm kháng sinh Tetracycline và Quinolone. Tránh dùng sữa trong vòng 2 giờ trước và sau khi uống thuốc."
          />
          <AvoidListItem 
            icon="🥦" 
            title="Rau xanh giàu vitamin K"
            desc="Làm giảm tác dụng của các thuốc chống đông máu như Warfarin do đặc tính kích thích đông máu của nó. Lưu ý ăn lượng vừa phải và ổn định."
          />
          <AvoidListItem 
            icon="🍷" 
            title="Đồ uống có cồn"
            desc="Tăng nguy hiểm với các nhóm thuốc an thần, trầm cảm. Uống cùng các loại giảm đau có thể kích ứng dạ dày nghiêm trọng."
          />
        </ul>

        {/* Tip Box */}
        <div className="bg-emerald-50/80 border border-emerald-200 border-l-4 border-l-emerald-600 p-6 rounded-r-xl my-10 relative overflow-hidden">
          <div className="font-sans text-[11px] font-bold tracking-[0.2em] uppercase text-emerald-700 mb-2">
            💡 Lời khuyên thực hành
          </div>
          <p className="text-[0.95rem] text-emerald-900 m-0 leading-relaxed font-sans">
            Điều quan trọng nhất là <strong>tính nhất quán</strong>: luôn uống thuốc với cùng một điều kiện ăn uống để tránh biến động nồng độ thuốc trong máu. Nếu đổi thói quen ăn uống (VD: chuyển sang ăn chay hoàn toàn hoặc uống thực phẩm chức năng), hãy báo cho bác sĩ.
          </p>
        </div>

        <div className="text-center text-amber-500/50 tracking-[10px] my-10 text-xl font-serif">
          ✦ ✦ ✦
        </div>

        {/* Conclusion Box */}
        <div id="ket-luan" className="bg-slate-900 text-slate-100 p-8 sm:p-12 rounded-2xl scroll-mt-28 relative">
          <h2 className="font-['Playfair_Display',_Georgia,_serif] text-3xl font-bold text-amber-400 mb-5 pb-4 border-b border-white/10">
            Kết luận
          </h2>
          <p className="text-[1.05rem] text-slate-300 mb-4 font-['Source_Serif_4',_Georgia,_serif]">
            Hiểu đúng về tương tác giữa thực phẩm và thuốc không chỉ giúp bạn dùng thuốc hiệu quả hơn mà còn bảo vệ sức khỏe mỗi ngày. 
          </p>
          <p className="text-[1.05rem] text-slate-300 font-['Source_Serif_4',_Georgia,_serif]">
            Thay vì phải tự ghi nhớ từng tương tác phức tạp, giờ đây bạn có thể chủ động chăm sóc bản thân với gợi ý thực đơn an toàn, được cá nhân hóa theo các đơn thuốc bạn đang dùng!
          </p>
          
          <div className="mt-10 sm:mt-12 flex justify-center">
            <Link
              to="/app/meal-plan"
              className="inline-flex items-center justify-center gap-3 bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold font-sans text-base px-8 py-4 sm:py-5 rounded-full shadow-lg transition-all duration-200 group w-full sm:w-auto"
            >
              Phân tích thực đơn cùng AI FamCare
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

        <p className="text-[13px] text-center text-slate-400 mt-16 pt-8 border-t border-slate-200 font-sans">
          Nội dung mang tính tham khảo, không thay thế tư vấn y tế chuyên nghiệp định kỳ.
        </p>

      </main>

      <PublicFooter />
    </div>
  );
}
