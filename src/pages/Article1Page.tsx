
import React, { useEffect, useState } from 'react';
import PublicNavbar from "@/components/PublicNavbar";
import PublicFooter from "@/components/PublicFooter";
import { List, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

interface TocItem {
  id: string;
  text: string;
  level: number;
}

const tocItems: TocItem[] = [
  { id: "co-che", text: "Cơ chế tương tác của thực phẩm và thuốc", level: 2 },
  { id: "thuc-pham-vang", text: "Nhóm thực phẩm \u201Cvàng\u201D giúp tăng cường hiệu quả điều trị", level: 2 },
  { id: "chat-beo", text: "Nhóm thực phẩm giàu chất béo lành mạnh", level: 3 },
  { id: "do-uong-axit", text: "Các đồ uống có tính Axit", level: 3 },
  { id: "tinh-duoc", text: "Nhóm các thực phẩm có tính dược", level: 3 },
  { id: "thuc-pham-tranh", text: "Một vài thực phẩm cần tránh trong quá trình điều trị thuốc", level: 2 },
  { id: "nuoc-buoi", text: "Nước bưởi, nguy hiểm với thuốc tim mạch và hạ lipid", level: 3 },
  { id: "sua", text: "Sữa và các sản phẩm từ sữa, vô hiệu hóa thuốc kháng sinh", level: 3 },
  { id: "rau-xanh", text: "Rau xanh giàu vitamin K, ảnh hưởng đến thuốc chống đông máu", level: 3 },
  { id: "do-uong-con", text: "Đồ uống có cồn", level: 3 },
  { id: "ket-luan", text: "Kết luận", level: 2 },
];

const ArticleImage = ({ src, alt }: { src: string; alt: string }) => (
  <figure className="my-8 flex justify-center">
    <img
      src={src}
      alt={alt}
      className="w-full max-w-3xl rounded-xl shadow-sm object-cover"
      loading="lazy"
    />
  </figure>
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
    <div className="min-h-screen bg-sky-50">
      <PublicNavbar />

      <article className="px-4 sm:px-8 lg:px-16 py-12 max-w-4xl mx-auto">
        {/* H1 */}
        <h1 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-display font-bold text-blue-900 leading-tight mb-4">
          Lựa chọn thực phẩm đúng để phát huy tác dụng thuốc
        </h1>

        <p className="text-xs sm:text-sm text-slate-500 italic leading-relaxed mb-8 uppercase tracking-wide">
          Biên soạn dựa trên nghiên cứu của Schmidt & Dalhoff (Tạp chí Drugs, 2002) cùng các cập nhật y khoa từ Tạp chí Lifestyle Medicine (2017) và Tạp chí European Pharmaceutical Science (2019)
        </p>

        {/* Table of Contents */}
        <nav className="bg-white/80 backdrop-blur rounded-2xl p-6 mb-10 border border-blue-100 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <List size={18} className="text-blue-700" />
            <span className="text-sm font-bold text-blue-900 uppercase tracking-widest">Mục lục</span>
          </div>
          <ul className="space-y-1.5">
            {tocItems.map(item => (
              <li key={item.id}>
                <button
                  onClick={() => scrollTo(item.id)}
                  className={`text-left w-full text-sm transition-colors rounded-lg px-3 py-1.5 hover:bg-blue-50 ${
                    item.level === 3 ? "pl-8 text-slate-500" : "font-semibold text-slate-700"
                  } ${activeId === item.id ? "bg-blue-50 text-blue-700" : ""}`}
                >
                  {item.text}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* Intro */}
        <p className="text-base sm:text-lg text-slate-700 leading-relaxed mb-10">
          Tương tác giữa thuốc với thực phẩm là một kiến thức y khoa quan trọng, có thể tạo ra sự khác biệt giữa việc điều trị thành công và thất bại, thậm chí giữa an toàn và nguy hiểm. Hiểu đúng về cơ chế này, người chăm sóc và cả bệnh nhân có thể biến một bữa ăn thông thường thành một công cụ điều trị hiệu quả. Cùng chúng tôi tìm hiểu ngay bây giờ!
        </p>

        {/* H2: Cơ chế */}
        <h2 id="co-che" className="text-2xl sm:text-3xl font-display font-bold text-blue-900 mt-14 mb-4 scroll-mt-24">
          Cơ chế tương tác của thực phẩm và thuốc
        </h2>
        <p className="text-base text-slate-700 leading-relaxed mb-4">
          Thực phẩm không chỉ là nguồn dinh dưỡng mà còn có thể tương tác với thuốc, từ đó làm tăng hiệu quả điều trị hoặc ngược lại gây ra những tác dụng phụ không mong muốn. Các nhà khoa học phân loại các tương tác thành hai nhóm chính: tương tác dược động học (ảnh hưởng đến quá trình hấp thụ, chuyển hóa và đào thải thuốc) và tương tác dược lực học (tác động trực tiếp vào cơ chế hoạt động của thuốc trong cơ thể).
        </p>
        <p className="text-base text-slate-700 leading-relaxed mb-4">
          Các đặc điểm bữa ăn, bao gồm hàm lượng dinh dưỡng, thời điểm ăn so với giờ uống thuốc, đều có thể ảnh hưởng đến mức độ tương tác. Các nhà nghiên cứu cũng nhấn mạnh rằng không thể dự đoán chính xác tương tác thực phẩm với thuốc nếu chỉ dựa vào tính chất hóa lý của thuốc nói chung, cần có các nghiên cứu lâm sàng cho từng loại thuốc.
        </p>
        <ArticleImage src="/bai-1/hinh1.jpg" alt="Cơ chế tương tác thực phẩm và thuốc" />

        {/* H2: Nhóm thực phẩm vàng */}
        <h2 id="thuc-pham-vang" className="text-2xl sm:text-3xl font-display font-bold text-blue-900 mt-14 mb-4 scroll-mt-24">
          Nhóm thực phẩm "vàng" giúp tăng cường hiệu quả điều trị
        </h2>
        <p className="text-base text-slate-700 leading-relaxed mb-6">
          Không phải mọi tương tác thực phẩm với thuốc đều có hại. Với nhiều loại thuốc, ăn đúng loại thực phẩm, đúng thời điểm chính là "chìa khóa" giúp thuốc phát huy tối đa công dụng. Dưới đây là những nhóm thực phẩm được ghi nhận có tác dụng hỗ trợ điều trị rõ rệt:
        </p>

        {/* H3: Chất béo */}
        <h3 id="chat-beo" className="text-xl sm:text-2xl font-display font-bold text-blue-800 mt-10 mb-3 scroll-mt-24">
          Nhóm thực phẩm giàu chất béo lành mạnh
        </h3>
        <ArticleImage src="/bai-1/hinh2.jpg" alt="Thực phẩm giàu chất béo lành mạnh" />
        <p className="text-base text-slate-700 leading-relaxed mb-4">
          Các nhà nghiên cứu đã chỉ ra chất béo kích thích tiết mật, giúp hòa tan thuốc Liphophilic. Đối với các loại thuốc trị nhiễm ký sinh trùng như Albendazole hay thuốc trị nấm Griseofulvin, một bữa ăn giàu chất béo có thể làm tăng khả năng hấp thụ thuốc lên gấp nhiều lần. Tương tự, thuốc điều trị mụn Isotretinoin cũng phát huy tác dụng tốt hơn khi dùng chung với bữa ăn. Đồng thời, các nhóm chất béo cũng làm albendazole tăng tới 295% đến 299%; saquinavir tăng 600% đến 1800% so với khi đói.
        </p>

        {/* H3: Đồ uống axit */}
        <h3 id="do-uong-axit" className="text-xl sm:text-2xl font-display font-bold text-blue-800 mt-10 mb-3 scroll-mt-24">
          Các đồ uống có tính Axit
        </h3>
        <p className="text-base text-slate-700 leading-relaxed mb-4">
          Đối với các bệnh nhân có vấn đề về tiết axit dạ dày (viêm dạ dày), môi trường axit thấp sẽ ngăn cản sự hòa tan của một số thuốc cơ bản yếu. Uống các loại nước giải khát có tính axit như Cola cùng với Itraconazole hoặc Ketoconazole có thể tăng khả năng hấp thụ thuốc từ 38% đến 220% ở những bệnh nhân này, giúp quá trình điều trị bằng đường uống trở nên khả thi.
        </p>
        <ArticleImage src="/bai-1/hinh3.jpg" alt="Đồ uống có tính axit" />

        {/* H3: Tính dược */}
        <h3 id="tinh-duoc" className="text-xl sm:text-2xl font-display font-bold text-blue-800 mt-10 mb-3 scroll-mt-24">
          Nhóm các thực phẩm có tính dược
        </h3>
        <p className="text-base text-slate-700 leading-relaxed mb-4">
          Một số thực phẩm có tính dược tự nhiên khi phối hợp đúng cách có thể hỗ trợ hiệu quả của thuốc chính. Theo Choi and Chang (2017), việc sử dụng các thực phẩm chức catechin (EGCG) thường có trong trà xanh, trà olong, có thể làm tăng nồng độ Tacrolimus trong huyết tương, hỗ trợ duy trì nồng độ thuốc cần thiết cho bệnh nhân ghép tạng. Nghệ cũng là một thực phẩm cần bổ sung trong bữa ăn của người bệnh. Các nhà nghiên cứu cho rằng việc phối hợp nghệ có thể giúp giảm độc tính và tác dụng phụ của các thuốc hóa trị mạnh như Cisplatin và Methotrexate cho các bệnh nhân ung thư.
        </p>
        <ArticleImage src="/bai-1/hinh4.jpg" alt="Thực phẩm có tính dược" />

        {/* H2: Thực phẩm cần tránh */}
        <h2 id="thuc-pham-tranh" className="text-2xl sm:text-3xl font-display font-bold text-blue-900 mt-14 mb-4 scroll-mt-24">
          Một vài thực phẩm cần tránh trong quá trình điều trị thuốc
        </h2>
        <p className="text-base text-slate-700 leading-relaxed mb-6">
          Bên cạnh những thực phẩm hỗ trợ điều trị, một số loại thực phẩm có thể làm giảm đáng kể hiệu quả của thuốc hoặc thậm chí gây ra các phản ứng nguy hiểm đe dọa tính mạng. Dưới đây là những thực phẩm quan trọng cần lưu ý:
        </p>

        {/* H3: Nước bưởi */}
        <h3 id="nuoc-buoi" className="text-xl sm:text-2xl font-display font-bold text-blue-800 mt-10 mb-3 scroll-mt-24">
          Nước bưởi, nguy hiểm với thuốc tim mạch và hạ lipid
        </h3>
        <p className="text-base text-slate-700 leading-relaxed mb-4">
          Các nhà nghiên cứu đã chỉ ra, nước bưởi chất ức chế mạnh enzyme CYP3A4, làm tăng sinh khả dụng của felodipine lên tới 284%, lovastatin lên tới 1.400%, simvastatin lên tới 1.500%. Với terfenadine (một thuốc kháng histamine), tương tác này đã gây ra tử vong ở người trẻ khỏe mạnh. Do đó, cần tránh hoàn toàn nước bưởi khi sử dụng các thuốc statin, thuốc chẹn kênh canxi thường được dùng khi điều trị cao huyết áp và bệnh tim mạch.
        </p>
        <ArticleImage src="/bai-1/hinh5.jpg" alt="Nước bưởi và thuốc tim mạch" />

        {/* H3: Sữa */}
        <h3 id="sua" className="text-xl sm:text-2xl font-display font-bold text-blue-800 mt-10 mb-3 scroll-mt-24">
          Sữa và các sản phẩm từ sữa, vô hiệu hóa thuốc kháng sinh
        </h3>
        <p className="text-base text-slate-700 leading-relaxed mb-4">
          Sữa và các sản phẩm chế biến từ sữa như phô mai có nhiều canxi. Nó có thể liên kết với sắt tạo thành các phức hợp không hòa tan, ảnh hưởng đến khả năng hấp thu của một số nhóm thuốc kháng sinh nhóm Tetracycline và Quinolone (như Ciprofloxacin, Norfloxacin), làm giảm đáng kể sự hấp thụ thuốc. Thậm chí một lượng nhỏ sữa pha vào trà hay cà phê cũng đủ làm giảm 49% sinh khả dụng của tetracycline. Do đó, tránh dùng sữa trong vòng 2 giờ trước và sau khi uống các thuốc này để tránh làm mất khả năng điều trị của thuốc.
        </p>
        <ArticleImage src="/bai-1/hinh6.jpg" alt="Sữa và thuốc kháng sinh" />

        {/* H3: Rau xanh */}
        <h3 id="rau-xanh" className="text-xl sm:text-2xl font-display font-bold text-blue-800 mt-10 mb-3 scroll-mt-24">
          Rau xanh giàu vitamin K, ảnh hưởng đến thuốc chống đông máu
        </h3>
        <p className="text-base text-slate-700 leading-relaxed mb-4">
          Thuốc chống đông máu như warfarin giúp ngăn ngừa hình thành cục máu đông, trong khi vitamin K lại đóng vai trò hỗ trợ quá trình đông máu. Vì vậy, nếu ăn nhiều thực phẩm giàu vitamin K như bắp cải, bông cải xanh, rau bina hay gan động vật, tác dụng của thuốc có thể bị giảm đi. Tuy nhiên, không cần phải kiêng hoàn toàn những thực phẩm này; điều quan trọng là duy trì chế độ ăn ổn định, không tăng hoặc giảm đột ngột lượng vitamin K mỗi ngày. Việc ăn quá nhiều rau giàu vitamin K trong thời gian dài có thể khiến thuốc kém hiệu quả và cần điều chỉnh liều, còn ăn một lượng bình thường và đều đặn thì vẫn an toàn.
        </p>
        <ArticleImage src="/bai-1/hinh7.jpg" alt="Rau xanh giàu vitamin K" />

        {/* H3: Đồ uống có cồn */}
        <h3 id="do-uong-con" className="text-xl sm:text-2xl font-display font-bold text-blue-800 mt-10 mb-3 scroll-mt-24">
          Đồ uống có cồn
        </h3>
        <p className="text-base text-slate-700 leading-relaxed mb-4">
          Rượu có thể gây nhiều tương tác nguy hiểm khi dùng chung với thuốc, nên cần đặc biệt cẩn trọng. Với các thuốc tác động lên thần kinh như thuốc an thần, giảm đau (có codeine hoặc tramadol), thuốc chống trầm cảm hay thuốc dị ứng, rượu sẽ làm tăng cảm giác buồn ngủ, giảm phản xạ, rất nguy hiểm khi lái xe hoặc vận hành máy móc. Ngoài ra, uống rượu cùng thuốc giảm đau, kháng viêm hoặc aspirin có thể gây kích ứng dạ dày và tăng nguy cơ tổn thương gan. Đặc biệt, khi dùng metronidazole, tuyệt đối không uống rượu trong thời gian dùng thuốc và ít nhất 48 giờ sau đó, vì có thể gây phản ứng nghiêm trọng như buồn nôn, đỏ mặt, tim đập nhanh, tụt huyết áp và khó thở.
        </p>
        <ArticleImage src="/bai-1/hinh8.jpg" alt="Đồ uống có cồn và thuốc" />

        {/* H2: Kết luận */}
        <h2 id="ket-luan" className="text-2xl sm:text-3xl font-display font-bold text-blue-900 mt-14 mb-4 scroll-mt-24">
          Kết luận
        </h2>
        <p className="text-base text-slate-700 leading-relaxed mb-4">
          Hiểu đúng về tương tác giữa thực phẩm và thuốc không chỉ giúp bạn dùng thuốc hiệu quả hơn mà còn bảo vệ sức khỏe mỗi ngày.
        </p>
        <p className="text-base text-slate-700 leading-relaxed mb-10">
          Chủ động chăm sóc sức khỏe của mình ngay từ bữa ăn hằng ngày với tính năng gợi ý thực đơn cá nhân hóa theo tình trạng sức khỏe và thuốc đang sử dụng!
        </p>

        {/* CTA */}
        <div className="flex justify-center my-12">
          <Link
            to="/app/meal-plan"
            className="inline-flex items-center gap-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-base sm:text-lg px-8 py-4 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200 group"
          >
            Trải nghiệm ngay AI Nutrition của FamCare
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </article>

      <PublicFooter />
    </div>
  );
}
