import React, { useEffect, useState } from 'react';
import PublicNavbar from "@/components/PublicNavbar";
import PublicFooter from "@/components/PublicFooter";
import { Helmet } from 'react-helmet-async';

interface TocItem {
  id: string;
  text: string;
  level: number;
}

const tocItems: TocItem[] = [
  { id: "tai-sao-khong-nen", text: "Tại sao không nên uống thuốc bằng nước trà?", level: 2 },
  { id: "loai-thuoc-tranh", text: "Những loại thuốc tránh kết hợp với trà", level: 2 },
  { id: "khang-sinh", text: "Thuốc kháng sinh", level: 3 },
  { id: "chong-tram-cam", text: "Thuốc chống trầm cảm", level: 3 },
  { id: "chong-dong-mau", text: "Thuốc chống đông máu", level: 3 },
  { id: "tieu-duong", text: "Thuốc điều trị bệnh tiểu đường", level: 3 },
  { id: "tac-hai-tra", text: "Tác hại của việc uống trà gần thời điểm uống thuốc", level: 2 },
  { id: "nuoc-nao-tot", text: "Uống thuốc với nước gì tốt nhất?", level: 2 },
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

const SubHeading = ({ title, id }: { title: string, id: string }) => (
  <div id={id} className="mt-10 mb-4 scroll-mt-28">
    <h3 className="font-display text-lg sm:text-xl font-bold text-slate-900 leading-snug">
      {title}
    </h3>
  </div>
);

const WarningBox = ({ children }: { children: React.ReactNode }) => (
  <div className="bg-red-50/50 border-l-[3px] border-red-500 p-5 rounded-r-xl my-6">
    <p className="text-justify text-[0.95rem] text-slate-700 leading-relaxed m-0 font-body">
      {children}
    </p>
  </div>
);

export default function Article10Page() {
  const [activeId, setActiveId] = useState("");

  useEffect(() => {
    document.title = "Có nên uống thuốc bằng nước trà? Những tương tác thuốc bạn nhất định phải biết";
    fetch('/api/articles/co-nen-uong-thuoc-bang-nuoc-tra/view', { method: 'POST' })
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
          Có nên uống thuốc bằng nước trà? Những tương tác thuốc bạn nhất định phải biết
        </title>

        <meta
          name="description"
          content="Việc uống thuốc bằng nước trà có thể làm giảm hiệu quả điều trị hoặc gây ra các phản ứng phụ nguy hiểm. Khám phá những tương tác thuốc cần tránh để bảo vệ sức khỏe."
        />

        <meta
          name="keywords"
          content="uống thuốc bằng nước trà, tương tác thuốc và trà, có nên uống thuốc bằng trà không, uống thuốc với nước gì tốt nhất, tác hại của việc uống thuốc bằng trà"
        />

        <link
          rel="canonical"
          href="https://famcare.site/bai-viet/co-nen-uong-thuoc-bang-nuoc-tra"
        />

        <meta
          property="og:title"
          content="Có nên uống thuốc bằng nước trà? Những tương tác thuốc bạn nhất định phải biết"
        />

        <meta
          property="og:description"
          content="Việc uống thuốc bằng nước trà có thể làm giảm hiệu quả điều trị hoặc gây ra các phản ứng phụ nguy hiểm. Khám phá những tương tác thuốc cần tránh."
        />

        <meta
          property="og:image"
          content="https://famcare.site/bai-10/hinh1.jpg"
        />

        <meta
          property="og:type"
          content="article"
        />

        <meta
          property="og:url"
          content="https://famcare.site/bai-viet/co-nen-uong-thuoc-bang-nuoc-tra"
        />
      </Helmet>

      <div className="min-h-screen bg-slate-50 selection:bg-cyan-200 selection:text-cyan-900 font-body pb-10">
        <PublicNavbar />

        <header className="bg-slate-900 pt-16 pb-12 sm:pt-20 sm:pb-16 relative overflow-hidden">
          <div className="max-w-4xl mx-auto px-4 sm:px-8 relative z-10">
            <div className="inline-block font-body text-xs font-semibold tracking-[0.2em] uppercase text-cyan-400 border border-cyan-400/50 px-3.5 py-1.5 mb-6 rounded-sm">
              Kiến thức Y khoa
            </div>
            <h1 className="font-display text-3xl sm:text-5xl lg:text-[3.2rem] font-black text-cyan-50 leading-[1.2] mb-5 tracking-tight">
              Có nên uống thuốc bằng nước trà? Những tương tác thuốc bạn nhất định phải biết
            </h1>
            <p className="text-justify text-[13px] text-slate-400 tracking-wide uppercase font-sans">
              Khám phá những tương tác thuốc với trà, tác hại và nước uống nào tốt nhất khi dùng thuốc để bảo vệ sức khỏe gia đình.
            </p>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-800 via-cyan-500 to-blue-700 opacity-90"></div>
        </header>

        <main className="px-4 sm:px-8 lg:px-16 py-10 max-w-[860px] mx-auto text-[1.125rem] text-slate-800 leading-[1.85] font-light">
          <nav className="bg-white/60 backdrop-blur rounded-xl p-6 mb-14 border border-cyan-100 shadow-sm float-none md:float-right md:ml-8 md:mb-8 md:w-64 font-sans text-sm">
            <h3 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
              Mục lục bài viết
            </h3>
            <ul className="space-y-2">
              {tocItems.map((item) => (
                <li key={item.id} style={{ marginLeft: item.level === 3 ? '16px' : '0' }}>
                  <button
                    onClick={() => scrollTo(item.id)}
                    className={`text-left hover:text-cyan-600 transition-colors ${
                      activeId === item.id ? 'text-cyan-600 font-semibold' : 'text-slate-600'
                    }`}
                  >
                    {item.text}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          <div className="mb-14">
            <p className="text-justify text-base leading-relaxed text-slate-700 italic">
              Nhiều người có thói quen tiện tay sử dụng nước trà để uống thuốc hoặc uống trà ngay sau khi dùng thuốc bởi suy nghĩ "cũng chỉ là nước uống thông thường". Tuy nhiên, một số hoạt chất trong trà có thể làm giảm hấp thu thuốc, khiến thuốc mất tác dụng hoặc tăng nguy cơ phản ứng phụ. Vậy thực hư việc <strong>uống thuốc bằng nước trà</strong> có tác hại gì và <strong>uống thuốc với nước gì tốt nhất</strong>? Hãy cùng FamCare tìm hiểu chi tiết trong bài viết dưới đây.
            </p>
          </div>

          <SectionHeading number="01" id="tai-sao-khong-nen" title="Tại sao không nên uống thuốc bằng nước trà?" />

          <p className="text-justify mb-5">
            Lý do chính khiến việc dùng nước trà để uống thuốc bị nhiều chuyên gia y tế khuyến cáo hạn chế nằm ở thành phần hóa học của trà. Trong lá trà chứa một lượng lớn <strong>Tanin</strong> – một loại hợp chất Polyphenol có khả năng liên kết mạnh mẽ với các hoạt chất trong thuốc. Khi Tanin gặp các thành phần của thuốc, chúng tạo thành các <strong>phức hợp không hòa tan</strong>. Hệ quả của quá trình này bao gồm:
          </p>

          <ul className="space-y-3 mb-6">
            <li className="flex gap-3">
              <span className="text-cyan-500 font-bold shrink-0">•</span>
              <div>
                <strong>Giảm khả năng hấp thu:</strong> Thuốc không thể hòa tan để đi vào máu, khiến hiệu quả điều trị bị giảm sút nghiêm trọng.
              </div>
            </li>
            <li className="flex gap-3">
              <span className="text-cyan-500 font-bold shrink-0">•</span>
              <div>
                <strong>Gây ngộ độc:</strong> Trong một số trường hợp, sự biến đổi hóa học giữa trà và thuốc có thể làm giảm khả năng hấp thụ và chuyển hóa thuốc trong cơ thể hoặc gây kích ứng dạ dày.
              </div>
            </li>
            <li className="flex gap-3">
              <span className="text-cyan-500 font-bold shrink-0">•</span>
              <div>
                <strong>Tác động đến thần kinh:</strong> Caffeine trong trà có thể làm tăng nhịp tim hoặc gây hưng phấn quá mức khi dùng chung với các thuốc kích thích hoặc thuốc điều trị đặc biệt.
              </div>
            </li>
          </ul>

          <ArticleImage src="/bai-10/hinh1.jpg" alt="Uống thuốc với nước trà tiềm ẩn những rủi ro về sức khỏe" />

          <SectionHeading number="02" id="loai-thuoc-tranh" title="Những loại thuốc tránh kết hợp với trà" />

          <p className="text-justify mb-6">
            Dưới đây là danh sách các loại thuốc đặc biệt nhạy cảm với chất Tanin và Caffeine trong trà mà bạn tuyệt đối không nên dùng chung:
          </p>

          <SubHeading id="khang-sinh" title="Thuốc kháng sinh" />

          <p className="text-justify mb-6">
            Các loại thuốc như <strong>Tetracyclin, Doxycycline, Minocycline...</strong> rất dễ bị kết tủa khi gặp trà. Điều này làm thuốc mất tác dụng diệt khuẩn, khiến bệnh tình kéo dài và dễ dẫn đến tình trạng kháng thuốc.
          </p>

          <SubHeading id="chong-tram-cam" title="Thuốc chống trầm cảm" />

          <p className="text-justify mb-6">
            Các nhóm thuốc phổ biến như <strong>Citalopram, Sertraline, Fluoxetine...</strong> sẽ bị giảm khả năng hấp thu đáng kể. Nếu cơ thể không nhận đủ liều lượng cần thiết do sự cản trở của trà, tình trạng tâm lý của người bệnh có thể không được cải thiện.
          </p>

          <ArticleImage src="/bai-10/hinh2.jfif" alt="Sử dụng trà với các loại thuốc chống trầm cảm làm giảm khả năng hấp thụ thuốc" />

          <SubHeading id="chong-dong-mau" title="Thuốc chống đông máu" />

          <p className="text-justify mb-6">
            Một số loại trà có thể làm tăng hoặc thay đổi tác dụng của các thuốc chống đông máu như Warfarin hoặc Aspirin, từ đó làm tăng nguy cơ xuất huyết và chảy máu khó kiểm soát. Bên cạnh đó, thành phần trong trà cũng có thể ảnh hưởng đến hiệu quả điều trị của thuốc nếu sử dụng thường xuyên hoặc không đúng cách. Vì vậy, người đang điều trị bằng thuốc chống đông máu nên tham khảo ý kiến bác sĩ về chế độ ăn uống và các loại đồ uống phù hợp để đảm bảo an toàn trong quá trình sử dụng thuốc.
          </p>

          <SubHeading id="tieu-duong" title="Thuốc điều trị bệnh tiểu đường" />

          <p className="text-justify mb-6">
            Việc uống <strong>Metformin hay Glibenclamide</strong> chung với trà làm giảm sự hấp thu thuốc, khiến lượng đường trong máu dao động thất thường, gây khó khăn cho việc kiểm soát bệnh lý.
          </p>

          <ArticleImage src="/bai-10/hinh3.jpg" alt="Sử dụng Metformin với trà làm giảm chức năng thuốc" />

          <SectionHeading number="03" id="tac-hai-tra" title="Tác hại của việc uống trà gần thời điểm uống thuốc" />

          <p className="text-justify mb-5">
            Không chỉ việc dùng trà để uống thuốc mới gây ảnh hưởng đến sức khỏe, mà việc uống trà ngay trước hoặc sau khi dùng thuốc cũng có thể làm giảm hiệu quả điều trị. Các thành phần trong trà như caffeine và tannin có khả năng can thiệp vào quá trình phân rã, hấp thụ thuốc tại dạ dày và ruột non, từ đó khiến thuốc hoạt động không đúng như mong muốn.
          </p>

          <p className="text-justify mb-5">
            Tuy nhiên, <strong>không phải loại trà nào cũng giống nhau</strong> và mức độ tương tác còn phụ thuộc vào từng loại thức uống. Ví dụ, <strong>trà xanh</strong> chứa nhiều caffeine và tannin nên dễ ảnh hưởng đến khả năng hấp thụ thuốc. <strong>Trà đen hoặc trà pha quá đặc</strong> có thể làm tăng nguy cơ tương tác với một số thuốc điều trị tim mạch, thiếu máu hoặc thuốc chống đông máu. Trong khi đó, <strong>một số loại trà thảo mộc</strong> lại có thể ảnh hưởng đến thuốc an thần hoặc thuốc hỗ trợ giấc ngủ.
          </p>

          <ArticleImage src="/bai-10/hinh4.jpg" alt="Một số loại trà thảo mộc ảnh hưởng đến hiệu quả thuốc an thần" />

          <WarningBox>
            <strong>⚠️ Lời khuyên từ chuyên gia:</strong> Để đảm bảo an toàn, bạn nên đợi ít nhất <strong>30 đến 60 phút</strong> sau khi uống thuốc rồi mới nên dùng trà. Nếu đang điều trị bệnh mãn tính hoặc sử dụng thuốc kê đơn dài ngày, người bệnh nên tham khảo thêm ý kiến bác sĩ về chế độ ăn uống phù hợp trong quá trình điều trị.
          </WarningBox>

          <SectionHeading number="04" id="nuoc-nao-tot" title="Uống thuốc với nước gì tốt nhất?" />

          <p className="text-justify mb-6">
            Để thuốc phát huy tối đa công dụng và đảm bảo an toàn cho cơ thể, <strong>nước lọc (hoặc nước đun sôi để nguội)</strong> là sự lựa chọn số một.
          </p>

          <ul className="space-y-4 mb-6">
            <li className="flex gap-3">
              <div>
                <strong>Nước lọc:</strong> Không chứa các chất gây tương tác hóa học, giúp thuốc dễ dàng hòa tan và hấp thụ.
              </div>
            </li>
            <li className="flex gap-3">
              <div>
                <strong>Nhiệt độ:</strong> Nên dùng nước ở nhiệt độ phòng hoặc nước ấm nhẹ. Tránh dùng nước quá nóng vì có thể làm phân hủy một số loại thuốc nhạy cảm với nhiệt độ.
              </div>
            </li>
          </ul>

          <div className="bg-red-50/50 border-l-[3px] border-red-500 p-5 rounded-r-xl my-6">
            <p className="font-bold text-red-700 mb-3">Tránh tuyệt đối các loại nước sau khi uống thuốc:</p>
            <ul className="space-y-2">
              <li className="flex gap-3">
                <span className="text-red-500 shrink-0">•</span>
                <span className="text-slate-700">Nước trà, cà phê</span>
              </li>
              <li className="flex gap-3">
                <span className="text-red-500 shrink-0">•</span>
                <span className="text-slate-700">Nước ép trái cây (đặc biệt là nước bưởi chùm)</span>
              </li>
              <li className="flex gap-3">
                <span className="text-red-500 shrink-0">•</span>
                <span className="text-slate-700">Sữa và các sản phẩm từ sữa (trừ khi có chỉ định cụ thể)</span>
              </li>
              <li className="flex gap-3">
                <span className="text-red-500 shrink-0">•</span>
                <span className="text-slate-700">Nước ngọt có gas và rượu bia</span>
              </li>
            </ul>
          </div>

          <SectionHeading number="05" id="ket-luan" title="Kết Luận" />

          <p className="text-justify mb-5">
            Câu trả lời cho thắc mắc "<strong>có nên uống thuốc bằng trà không</strong>" là hoàn toàn <strong>KHÔNG</strong>. Để bảo vệ sức khỏe và đảm bảo lộ trình điều trị hiệu quả, hãy hình thành thói quen uống thuốc với nước lọc và tuân thủ đúng thời gian cách ly với các loại nước uống chứa chất kích thích như trà.
          </p>

          <p className="text-justify mb-5">
            Sử dụng FamCare ngay hôm nay để chăm sóc sức khỏe toàn diện hơn với tính năng Quản lý tủ thuốc AI và theo dõi lộ trình điều trị của cả gia đình: <a href="https://famcare.site/app/cabinet" className="text-cyan-600 hover:text-cyan-700 underline">https://famcare.site/app/cabinet</a>
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
        </main>

        <PublicFooter />
      </div>
    </>
  );
}
