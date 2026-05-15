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
  { id: "uong-nham-nguy-hiem", text: "Uống nhầm thuốc nguy hiểm như thế nào?", level: 2 },
  { id: "dau-hieu-nhan-biet", text: "Dấu hiệu nhận biết bạn đã uống nhầm thuốc", level: 2 },
  { id: "xu-ly-khan-cap", text: "Xử lý khẩn cấp khi uống nhầm thuốc", level: 2 },
  { id: "quan-ly-tu-thuoc", text: "Quản lý tủ thuốc hiệu quả cùng FamCare", level: 2 },
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

const WarningBox = ({ children }: { children: React.ReactNode }) => (
  <div className="bg-red-50/50 border-l-[3px] border-red-500 p-5 rounded-r-xl my-6">
    <p className="text-justify text-[0.95rem] text-slate-700 leading-relaxed m-0 font-body">
      {children}
    </p>
  </div>
);

const DangerBox = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="bg-red-50/50 border-l-[3px] border-red-600 p-5 rounded-r-xl my-6">
    <p className="text-justify text-[0.95rem] font-semibold text-red-700 mb-2">
      ⚠️ {title}
    </p>
    <p className="text-justify text-[0.95rem] text-slate-700 leading-relaxed m-0 font-body">
      {children}
    </p>
  </div>
);

export default function Article9Page() {
  const [activeId, setActiveId] = useState("");

  useEffect(() => {
    document.title = "Nguy hiểm từ việc dùng nhầm thuốc: Bí quyết quản lý tủ thuốc riêng biệt";
    fetch('/api/articles/quan-ly-tu-thuoc-gia-dinh-an-toan/view', { method: 'POST' })
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
          Nguy hiểm từ việc dùng nhầm thuốc: Bí quyết quản lý tủ thuốc riêng biệt cho từng thành viên
        </title>

        <meta
          name="description"
          content="Đừng để sự bất cẩn dẫn đến hậu quả đáng tiếc. Khám phá bí quyết quản lý tủ thuốc thông minh và cách phân loại thuốc riêng biệt cho từng thành viên để bảo vệ sức khỏe gia đình."
        />

        <meta
          name="keywords"
          content="uống nhầm thuốc, quản lý tủ thuốc gia đình, phân loại thuốc cho thành viên, nguy hiểm khi dùng nhầm thuốc, cách sắp xếp tủ thuốc gia đình, an toàn sử dụng thuốc tại nhà"
        />

        <link
          rel="canonical"
          href="https://famcare.site/resources/quan-ly-tu-thuoc-gia-dinh-an-toan"
        />

        <meta
          property="og:title"
          content="Nguy hiểm từ việc dùng nhầm thuốc: Bí quyết quản lý tủ thuốc riêng biệt"
        />

        <meta
          property="og:description"
          content="Khám phá bí quyết quản lý tủ thuốc thông minh và cách phân loại thuốc riêng biệt cho từng thành viên để bảo vệ sức khỏe gia đình."
        />

        <meta
          property="og:image"
          content="https://famcare.site/bai-9/hinh1.jfif"
        />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />

        <meta
          property="og:type"
          content="article"
        />

        <meta
          property="og:url"
          content="https://famcare.site/resources/quan-ly-tu-thuoc-gia-dinh-an-toan"
        />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": "Nguy hiểm từ việc dùng nhầm thuốc: Bí quyết quản lý tủ thuốc riêng biệt",
            "description": "Khám phá bí quyết quản lý tủ thuốc thông minh và cách phân loại thuốc riêng biệt cho từng thành viên để bảo vệ sức khỏe gia đình.",
            "image": "https://famcare.site/bai-9/hinh1.jfif",
            "datePublished": "2026-05-15",
            "dateModified": "2026-05-15",
            "author": {"@type": "Organization", "name": "FamCare", "url": "https://famcare.site"},
            "publisher": {"@type": "Organization", "name": "FamCare", "logo": {"@type": "ImageObject", "url": "https://famcare.site/logo.png"}},
            "mainEntityOfPage": {"@type": "WebPage", "@id": "https://famcare.site/resources/quan-ly-tu-thuoc-gia-dinh-an-toan"}
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
              Nguy hiểm từ việc dùng nhầm thuốc: Bí quyết quản lý tủ thuốc riêng biệt cho từng thành viên
            </h1>
            <p className="text-justify text-[13px] text-slate-400 tracking-wide uppercase font-sans">
              Khám phá cách phân loại thuốc riêng biệt và quản lý tủ thuốc gia đình an toàn để bảo vệ sức khỏe cả nhà.
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
              Nhỡ uống nhầm thuốc không phải là trường hợp hiếm gặp, thường gặp nhất là ở gia đình có cả người già và trẻ em. Điều cần lưu ý là khi sơ cứu cho người uống nhầm thuốc cần phải bình tĩnh, tránh hoảng loạn để xử lý được chính xác. Bài viết này của FamCare sẽ giúp bạn hiểu rõ tại sao việc quản lý tủ thuốc gia đình đúng cách lại quan trọng đến vậy, và đưa ra những bước cụ thể để phân loại, sắp xếp thuốc an toàn cho từng thành viên.
            </p>
          </div>

          <SectionHeading number="01" id="uong-nham-nguy-hiem" title="Uống nhầm thuốc nguy hiểm như thế nào?" />

          <p className="text-justify mb-5">
            Nhiều người nghĩ rằng uống nhầm thuốc chỉ xảy ra với trẻ nhỏ tò mò lấy thuốc ra nghịch, hoặc người cao tuổi hay quên. Thực tế, đây là tai nạn phổ biến hơn chúng ta tưởng và hậu quả phụ thuộc rất lớn vào loại thuốc bị uống nhầm.
          </p>

          <p className="text-justify mb-5">
            Đối với trường hợp <strong>uống nhầm các loại vitamin hoặc thuốc bổ</strong>, thông thường sẽ không gây nguy hiểm nghiêm trọng nếu được phát hiện sớm. Người dùng nên theo dõi cơ thể và uống nhiều nước để hỗ trợ đào thải các chất dư thừa ra ngoài. Tuy nhiên, nếu xuất hiện các dấu hiệu bất thường như buồn nôn, chóng mặt hoặc đau bụng kéo dài, cần đến cơ sở y tế để kiểm tra.
          </p>

          <p className="text-justify mb-5">
            Việc sử dụng sai các loại <strong>thuốc kê đơn</strong> như <strong>thuốc giảm đau, kháng sinh hoặc thuốc tim mạch</strong> nguy hiểm hơn nhiều. Khi dùng không đúng chỉ định hoặc sai liều lượng, người bệnh có thể gặp các biến chứng như tổn thương gan, thận, tụt huyết áp đột ngột hoặc ảnh hưởng nghiêm trọng đến sức khỏe tổng thể. Vì vậy, tuyệt đối không tự ý sử dụng thuốc khi chưa có hướng dẫn từ bác sĩ.
          </p>

          <ArticleImage src="/bai-9/hinh1.jfif" alt="Uống nhầm thuốc có thể gây ra những tình huống nguy hiểm" />

          <DangerBox title="Nguy hiểm nhất">
            Trường hợp uống nhầm các hóa chất độc hại như thuốc diệt cỏ hoặc thuốc trừ sâu. Đặc biệt, <strong>paraquat</strong> - một loại thuốc diệt cỏ phổ biến. Chỉ cần uống khoảng 15ml dung dịch 20% cũng có thể dẫn đến tử vong trong vòng 1–5 ngày do suy đa tạng. Hiện nay vẫn chưa có thuốc giải độc đặc hiệu cho paraquat, nên việc cấp cứu sớm là vô cùng quan trọng.
          </DangerBox>

          <SectionHeading number="02" id="dau-hieu-nhan-biet" title="Dấu hiệu nhận biết bạn đã uống nhầm thuốc" />

          <p className="text-justify mb-5">
            Hãy chú ý nếu người thân có các biểu hiện sau sau khi uống thuốc:
          </p>

          <ul className="space-y-3 mb-6">
            <li className="flex gap-3">
              <span className="text-cyan-500 font-bold shrink-0">•</span>
              <span>Ho sặc sụa, khó thở, tức ngực</span>
            </li>
            <li className="flex gap-3">
              <span className="text-cyan-500 font-bold shrink-0">•</span>
              <span>Da, môi tím tái</span>
            </li>
            <li className="flex gap-3">
              <span className="text-cyan-500 font-bold shrink-0">•</span>
              <span>Hơi thở có mùi hóa chất lạ</span>
            </li>
            <li className="flex gap-3">
              <span className="text-cyan-500 font-bold shrink-0">•</span>
              <span>Buồn nôn, nôn mửa, đau bụng dữ dội</span>
            </li>
            <li className="flex gap-3">
              <span className="text-cyan-500 font-bold shrink-0">•</span>
              <span>Vết bỏng hoặc tái nhợt quanh miệng (dấu hiệu nuốt phải chất ăn mòn)</span>
            </li>
            <li className="flex gap-3">
              <span className="text-cyan-500 font-bold shrink-0">•</span>
              <span>Co giật, hôn mê, sốc phản vệ</span>
            </li>
          </ul>

          <ArticleImage src="/bai-9/hinh2.jfif" alt="Đau bụng là dấu hiệu thường gặp khi uống nhầm thuốc" />

          <WarningBox>
            Nếu thấy bất kỳ dấu hiệu nào trong số này, hãy gọi cấp cứu ngay lập tức!
          </WarningBox>

          <SectionHeading number="03" id="xu-ly-khan-cap" title="Xử lý khẩn cấp khi uống nhầm thuốc" />

          <p className="text-justify mb-5">
            Bất kể là người bệnh đã uống nhầm loại gì thì nguyên tắc xử lý là phải hết sức nhanh chóng ngăn chặn việc thuốc hấp thụ vào cơ thể bằng biện pháp gây nôn, nếu cần rửa sạch dạ dày và giải độc. Việc xử lý như vậy có thể làm giảm bớt tác động của thuốc đến cơ thể, đặc biệt với những loại thuốc có tính ăn mòn cao.
          </p>

          <p className="text-justify mb-6">
            Việc mà bạn có thể làm tại nhà:
          </p>

          <ul className="space-y-3 mb-6">
            <li className="flex gap-3">
              <span className="text-cyan-500 font-bold shrink-0">•</span>
              <span>Có thể gây nôn bằng cách móc họng, rồi cho người bệnh uống nhiều nước ấm, rồi lại tiếp tục gây nôn.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-cyan-500 font-bold shrink-0">•</span>
              <span>Nếu người bệnh đã hôn mê thì phải đặt nằm nghiêng, tránh để chất nôn và dịch tiết chảy vào khí quản gây tắc nghẽn đường thở.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-cyan-500 font-bold shrink-0">•</span>
              <span>Sau khi đã cấp cứu sớm như vậy, nhất thiết phải đưa vào bệnh viện ngay để được xử lý các biện pháp giải độc. Ghi nhớ mang theo vỏ loại thuốc đã uống nhầm để việc điều trị của các bác sĩ được nhanh chóng.</span>
            </li>
          </ul>

          <WarningBox>
            Việc sơ cấp cứu ban đầu này nên làm ngay từ khi còn ở nhà, vì nếu để nguyên tình trạng như vậy mà đưa tới bệnh viện thì vô hình chung sẽ có thể mất thời điểm vàng trong cấp cứu. Đó là còn chưa kể đến một khoảng thời gian dài chờ đợi xe cứu thương, khiến việc uống nhầm thuốc càng gây tác hại lớn hơn.
          </WarningBox>

          <SectionHeading number="04" id="quan-ly-tu-thuoc" title="Quản lý tủ thuốc hiệu quả cùng FamCare" />

          <p className="text-justify mb-5">
            FamCare mang đến giải pháp <strong>quản lý tủ thuốc thông minh</strong>, giúp bạn chăm sóc sức khỏe cho cả bản thân và những người thân yêu một cách trọn vẹn nhất. Mọi loại thuốc trong nhà đều được lưu trữ tập trung, dễ dàng tìm kiếm và kiểm soát. Nhờ công nghệ nhận diện hình ảnh hiện đại, hệ thống sẽ giúp bạn theo dõi sát sao liều lượng, công dụng và đưa ra những cảnh báo thông minh kịp thời.
          </p>

          <ArticleImage src="/bai-9/hinh3.jpg" alt="Quản lý tủ thuốc gia đình hiệu quả hơn với FamCare" />

          <p className="text-justify mb-5">
            Hãy để FamCare trở thành người trợ lý đắc lực, đảm bảo an toàn tối đa cho tủ thuốc gia đình bạn. Khám phá ngay các tính năng Tủ thuốc AI và quét đơn thuốc tại: <a href="https://famcare.site/app/cabinet" className="text-cyan-600 hover:text-cyan-700 underline">https://famcare.site/app/cabinet</a>
          </p>

          <SectionHeading number="05" id="ket-luan" title="Kết Luận" />

          <p className="text-justify mb-5">
            Uống nhầm thuốc có thể mang đến những vấn đề vô cùng nguy hiểm cho sức khỏe của bản thân. Do đó, việc quản lý tủ thuốc gia đình cần có hệ thống và duy trì thói quen. Và trong trường hợp không may xảy ra sự cố, hãy nhớ giữ bình tĩnh, xác định loại thuốc, sơ cứu đúng cách và đến bệnh viện ngay cùng với vỏ thuốc đã uống nhầm.
          </p>

          <p className="text-justify mb-5">
            Để FamCare với tính năng Quản lý tủ thuốc AI giúp bạn phòng tránh những tình huống này nhé!
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

          {/* Related Articles Section */}
          <div className="mt-20 pt-16 border-t-2 border-slate-200">
            <h2 className="font-display text-2xl font-bold text-slate-900 mb-8">Bài viết liên quan</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Link to="/resources/cach-doc-don-thuoc-giay" className="p-6 border border-slate-200 rounded-xl hover:border-cyan-400 hover:shadow-md transition-all group">
                <h3 className="font-bold text-slate-800 mb-2 group-hover:text-cyan-600 transition-colors">Cách đọc đơn thuốc giấy</h3>
                <p className="text-slate-600 text-sm">Học cách đọc đơn thuốc chuẩn xác.</p>
              </Link>
              <Link to="/resources/lua-chon-thuc-pham-dung-de-phat-huy-tac-dung-thuoc" className="p-6 border border-slate-200 rounded-xl hover:border-cyan-400 hover:shadow-md transition-all group">
                <h3 className="font-bold text-slate-800 mb-2 group-hover:text-cyan-600 transition-colors">Lựa chọn thực phẩm đúng để phát huy tác dụng thuốc</h3>
                <p className="text-slate-600 text-sm">Hiểu cơ chế tương tác thực phẩm-thuốc.</p>
              </Link>
              <a href="/app/cabinet" className="p-6 border border-slate-200 rounded-xl hover:border-cyan-400 hover:shadow-md transition-all group">
                <h3 className="font-bold text-slate-800 mb-2 group-hover:text-cyan-600 transition-colors">✨ Tủ thuốc AI</h3>
                <p className="text-slate-600 text-sm">Quản lý thông minh phân loại.</p>
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
