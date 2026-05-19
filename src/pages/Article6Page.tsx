import React, { useEffect, useState } from 'react';
import PublicNavbar from "@/components/PublicNavbar";
import PublicFooter from "@/components/PublicFooter";
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import SocialShareButtons from '@/components/SocialShareButtons';

interface TocItem {
  id: string;
  text: string;
  level: number;
}

const tocItems: TocItem[] = [
  { id: "tai-sao-can", text: "Tại sao mỗi nhà đều cần một tủ thuốc gia đình", level: 2 },
  { id: "danh-muc-thiet-yeu", text: "Danh mục các loại thuốc thiết yếu", level: 2 },
  { id: "giam-dau-ha-sot", text: "Tên các loại thuốc thường dùng: Danh mục giảm đau và hạ sốt", level: 3 },
  { id: "tieu-hoa", text: "Nhóm thuốc hỗ trợ tiêu hóa và bù dịch", level: 3 },
  { id: "tre-nho", text: "Những loại thuốc cần có trong nhà khi có trẻ nhỏ", level: 2 },
  { id: "quan-ly-thong-minh", text: "Quản lý thuốc thiết yếu thông minh hơn cùng FamCare", level: 2 },
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

export default function Article6Page() {
  const [activeId, setActiveId] = useState("");

  useEffect(() => {
    document.title = "Tủ Thuốc Gia Đình Cần Có Gì? Danh Mục Thuốc Thiết Yếu 2026";
    fetch('/api/articles/danh-muc-thuoc-thiet-yeu-cho-tu-thuoc-gia-dinh-2026/view', { method: 'POST' })
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
          Tủ Thuốc Gia Đình Cần Có Gì? Danh Mục Thuốc Thiết Yếu 2026
        </title>

        <meta
          name="description"
          content="Khám phá danh mục thuốc thiết yếu cho tủ thuốc gia đình năm 2026. Cập nhật các loại thuốc nên có sẵn trong nhà để bảo vệ sức khỏe cùng FamCare."
        />

        <meta
          name="keywords"
          content="thuốc thiết yếu, tủ thuốc gia đình, tên các loại thuốc thường dùng, những loại thuốc cần có trong nhà khi có trẻ nhỏ, thuốc nên có sẵn trong nhà, thuốc căn bản cần có, quản lý tủ thuốc, danh mục thuốc, thuốc cấp cứu, sắp xếp tủ thuốc hợp lý"
        />

        <link
          rel="canonical"
          href="https://famcare.site/resources/danh-muc-thuoc-thiet-yeu-cho-tu-thuoc-gia-dinh-2026"
        />

        <meta
          property="og:title"
          content="Tủ Thuốc Gia Đình Cần Có Gì? Danh Mục Thuốc Thiết Yếu 2026"
        />

        <meta
          property="og:description"
          content="Khám phá danh mục thuốc thiết yếu cho tủ thuốc gia đình năm 2026. Cập nhật các loại thuốc nên có sẵn trong nhà để bảo vệ sức khỏe cùng FamCare."
        />

        <meta
          property="og:image"
          content="https://famcare.site/bai-6/hinh1.jpg"
        />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />

        <meta
          name="twitter:card"
          content="summary_large_image"
        />

        <meta
          name="twitter:title"
          content="Tủ Thuốc Gia Đình Cần Có Gì? Danh Mục Thuốc Thiết Yếu 2026"
        />

        <meta
          name="twitter:description"
          content="Khám phá danh mục thuốc thiết yếu cho tủ thuốc gia đình năm 2026 từ FamCare."
        />

        <meta
          name="twitter:image"
          content="https://famcare.site/bai-6/hinh1.jpg"
        />

        <meta
          property="og:type"
          content="article"
        />

        <meta
          property="og:url"
          content="https://famcare.site/resources/danh-muc-thuoc-thiet-yeu-cho-tu-thuoc-gia-dinh-2026"
        />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": "Tủ Thuốc Gia Đình Cần Có Gì? Danh Mục Thuốc Thiết Yếu 2026",
            "description": "Khám phá danh mục thuốc thiết yếu cho tủ thuốc gia đình năm 2026. Cập nhật các loại thuốc nên có sẵn trong nhà để bảo vệ sức khỏe cùng FamCare.",
            "image": "https://famcare.site/bai-6/hinh1.jpg",
            "datePublished": "2026-05-15",
            "dateModified": "2026-05-15",
            "author": {"@type": "Organization", "name": "FamCare", "url": "https://famcare.site"},
            "publisher": {"@type": "Organization", "name": "FamCare", "logo": {"@type": "ImageObject", "url": "https://famcare.site/logo.png"}},
            "mainEntityOfPage": {"@type": "WebPage", "@id": "https://famcare.site/resources/danh-muc-thuoc-thiet-yeu-cho-tu-thuoc-gia-dinh-2026"}
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
              Tủ Thuốc Gia Đình Cần Có Gì? Danh Mục Thuốc Thiết Yếu 2026
            </h1>
            <p className="text-justify text-[13px] text-slate-400 tracking-wide uppercase font-sans">
              Cập nhật danh mục các loại thuốc thiết yếu nên chuẩn bị sẵn trong nhà để bảo vệ sức khỏe gia đình một cách chủ động và khoa học.
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
              Trong bối cảnh y tế hiện đại năm 2026, việc sở hữu một <strong>tủ thuốc gia đình</strong> khoa học không chỉ dừng lại ở vài viên giảm đau hay băng gạc thông thường. Việc chuẩn bị sẵn các loại <strong>thuốc thiết yếu</strong> chính là "hàng rào" bảo vệ đầu tiên, giúp bạn xử lý kịp thời các tình huống sức khỏe khẩn cấp ngay tại nhà trước khi cần đến sự can thiệp chuyên sâu. Tuy nhiên, liệu bạn đã biết danh mục <strong>thuốc nên có sẵn trong nhà</strong> đã thay đổi như thế nào để phù hợp với môi trường sống hiện nay? Bài viết này sẽ cung cấp cẩm nang chi tiết giúp bạn kiện toàn kho lưu trữ y tế gia đình. Hãy cùng <strong>FamCare</strong> nâng cấp tủ thuốc thông minh, bảo vệ trọn vẹn từng khoảnh khắc bình yên cho những người thân yêu ngay hôm nay!
            </p>
          </div>

          <ArticleImage src="/bai-6/hinh1.jpg" alt="Trang bị đầy đủ các loại thuốc thiết yếu giúp tủ thuốc gia đình trở thành trợ thủ đắc lực trong việc chăm sóc sức khỏe" />

          <SectionHeading number="01" id="tai-sao-can" title="Tại sao mỗi nhà đều cần một tủ thuốc gia đình với đầy đủ thuốc thiết yếu?" />

          <p className="text-justify mb-5">
            Sở hữu một <strong>tủ thuốc gia đình</strong> được trang bị đầy đủ các loại <strong>thuốc thiết yếu</strong> là yếu tố then chốt trong việc quản lý sức khỏe chủ động. Cuộc sống bận rộn đôi khi khiến chúng ta lơ là các dấu hiệu bệnh nhẹ, nhưng chính những triệu chứng nhỏ nếu không được xử lý kịp thời có thể dẫn đến các biến chứng phức tạp. Việc chuẩn bị sẵn các loại <strong>thuốc căn bản cần có trong tủ thuốc gia đình</strong> không chỉ giúp giảm bớt lo lắng trong những tình huống khẩn cấp giữa đêm khuya mà còn tiết kiệm thời gian và chi phí y tế không cần thiết.
          </p>

          <p className="text-justify mb-5">
            Năm 2026, khái niệm về danh mục thuốc tại gia đã được mở rộng. Không chỉ dừng lại ở thuốc chữa bệnh, tủ thuốc hiện đại còn bao gồm các sản phẩm hỗ trợ và thiết bị theo dõi thông minh. Tuy nhiên, cốt lõi vẫn nằm ở việc bạn nắm vững <strong>tên các loại thuốc thường dùng</strong> để có thể sử dụng chính xác và an toàn. Việc xây dựng một tủ thuốc khoa học cần sự thấu hiểu về nhu cầu sức khỏe riêng biệt của từng thành viên, đặc biệt là khi trong nhà có đối tượng nhạy cảm như trẻ nhỏ hoặc người cao tuổi.
          </p>

          <ArticleImage src="/bai-6/hinh2.jpg" alt="Mỗi nhà cần một tủ thuốc gia đình với đầy đủ các loại thuốc thiết yếu" />

          <SectionHeading number="02" id="danh-muc-thiet-yeu" title="Danh mục các loại thuốc thiết yếu nên có sẵn trong nhà" />

          <p className="text-justify mb-6">
            Dưới đây là bảng tổng hợp các nhóm <strong>thuốc thiết yếu</strong> và công dụng cụ thể mà mọi gia đình nên trang bị:
          </p>

          <div className="overflow-x-auto mb-8">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-cyan-50 border border-cyan-200">
                  <th className="border border-cyan-200 px-4 py-3 text-left font-bold text-slate-900">Nhóm thuốc</th>
                  <th className="border border-cyan-200 px-4 py-3 text-left font-bold text-slate-900">Ví dụ tiêu biểu</th>
                  <th className="border border-cyan-200 px-4 py-3 text-left font-bold text-slate-900">Công dụng chính</th>
                  <th className="border border-cyan-200 px-4 py-3 text-left font-bold text-slate-900">Lưu ý quan trọng</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border border-cyan-100 hover:bg-cyan-50/50">
                  <td className="border border-cyan-100 px-4 py-3 font-semibold text-cyan-700">Hạ sốt - Giảm đau</td>
                  <td className="border border-cyan-100 px-4 py-3">Paracetamol (Efferalgan, Hapacol)</td>
                  <td className="border border-cyan-100 px-4 py-3">Hạ sốt, giảm đau đầu, đau răng</td>
                  <td className="border border-cyan-100 px-4 py-3">Thường cách nhau ít nhất 4-6 tiếng mỗi liều</td>
                </tr>
                <tr className="border border-cyan-100 hover:bg-cyan-50/50">
                  <td className="border border-cyan-100 px-4 py-3 font-semibold text-cyan-700">Tiêu hóa</td>
                  <td className="border border-cyan-100 px-4 py-3">Oresol, Men vi sinh, Smecta</td>
                  <td className="border border-cyan-100 px-4 py-3">Bù nước, hỗ trợ tiêu hóa, cầm tiêu chảy</td>
                  <td className="border border-cyan-100 px-4 py-3">Pha Oresol đúng tỷ lệ nước quy định</td>
                </tr>
                <tr className="border border-cyan-100 hover:bg-cyan-50/50">
                  <td className="border border-cyan-100 px-4 py-3 font-semibold text-cyan-700">Dị ứng</td>
                  <td className="border border-cyan-100 px-4 py-3">Cetirizine, Loratadine</td>
                  <td className="border border-cyan-100 px-4 py-3">Giảm ngứa, mề đay, sổ mũi dị ứng</td>
                  <td className="border border-cyan-100 px-4 py-3">Có thể gây buồn ngủ nhẹ tùy cơ địa</td>
                </tr>
                <tr className="border border-cyan-100 hover:bg-cyan-50/50">
                  <td className="border border-cyan-100 px-4 py-3 font-semibold text-cyan-700">Sơ cứu ngoài da</td>
                  <td className="border border-cyan-100 px-4 py-3">Povidine, Oxy già, Băng cá nhân</td>
                  <td className="border border-cyan-100 px-4 py-3">Sát trùng vết thương, chống nhiễm trùng</td>
                  <td className="border border-cyan-100 px-4 py-3">Kiểm tra hạn dùng của thuốc sát trùng</td>
                </tr>
                <tr className="border border-cyan-100 hover:bg-cyan-50/50">
                  <td className="border border-cyan-100 px-4 py-3 font-semibold text-cyan-700">Hô hấp</td>
                  <td className="border border-cyan-100 px-4 py-3">Nước muối sinh lý, Siro ho thảo dược</td>
                  <td className="border border-cyan-100 px-4 py-3">Vệ sinh mũi họng, giảm ho nhẹ</td>
                  <td className="border border-cyan-100 px-4 py-3">Ưu tiên thành phần thảo dược cho bé</td>
                </tr>
              </tbody>
            </table>
          </div>

          <SubHeading id="giam-dau-ha-sot" title="Tên các loại thuốc thường dùng: Danh mục giảm đau và hạ sốt" />

          <p className="text-justify mb-5">
            Nhắc đến các loại thuốc thiết yếu, nhóm hạ sốt và giảm đau luôn đứng đầu danh sách. Paracetamol là cái tên phổ biến nhất nhờ tính an toàn cao khi sử dụng đúng liều lượng. Đây là loại thuốc không thể thiếu để xử lý các cơn đau đầu, đau cơ hoặc sốt do thay đổi thời tiết.
          </p>

          <p className="text-justify mb-5">
            Bên cạnh đó, Ibuprofen cũng được xem là loại thuốc nên có sẵn trong nhà để hỗ trợ giảm đau và chống viêm mạnh hơn trong các trường hợp đau răng hoặc chấn thương phần mềm. Tuy nhiên, bạn tuyệt đối không tự ý dùng kéo dài quá 5 ngày mà không có chỉ định của y bác sĩ.
          </p>

          <SubHeading id="tieu-hoa" title="Nhóm thuốc hỗ trợ tiêu hóa và bù dịch" />

          <p className="text-justify mb-5">
            Các sự cố về đường ruột thường xảy ra bất ngờ sau các bữa ăn. Việc tích trữ sẵn tên các loại thuốc thường dùng như men vi sinh hay thuốc kháng acid (Antacid) sẽ giúp giảm ngay tình trạng đầy hơi, ợ chua. Đặc biệt, Oresol là sản phẩm "sống còn" trong tủ thuốc để phòng ngừa mất nước khi tiêu chảy cấp hoặc sốt cao kéo dài.
          </p>

          <ArticleImage src="/bai-6/hình3.jpg" alt="Một số loại thuốc thường dùng có thể được chuẩn bị ở tủ thuốc gia đình" />

          <SectionHeading number="03" id="tre-nho" title="Những loại thuốc cần có trong nhà khi có trẻ nhỏ" />

          <p className="text-justify mb-5">
            Đối với các bậc phụ huynh, việc chuẩn bị những loại thuốc cần có trong nhà khi có trẻ nhỏ đòi hỏi sự chi tiết và cẩn trọng hơn bao giờ hết. Trẻ em có hệ miễn dịch chưa hoàn thiện, vì vậy tủ thuốc của bé cần được phân loại riêng biệt:
          </p>

          <ul className="space-y-4 mb-6">
            <li className="flex gap-3 text-justify">
              <span className="text-cyan-500 font-bold shrink-0">•</span>
              <div>
                <strong className="text-slate-900">Dụng cụ y tế thiết yếu:</strong> Một chiếc nhiệt kế điện tử hồng ngoài (đo trán hoặc tai) cho kết quả sau 1 giây là vật dụng ưu tiên hàng đầu để theo dõi sốt kịp thời.
              </div>
            </li>
            <li className="flex gap-3 text-justify">
              <span className="text-cyan-500 font-bold shrink-0">•</span>
              <div>
                <strong className="text-slate-900">Vệ sinh đường hô hấp:</strong> Dung dịch nhỏ mũi (nước muối sinh lý 0.9%) giúp làm sạch dịch nhầy, hỗ trợ bé thở dễ dàng hơn khi bị cảm.
              </div>
            </li>
            <li className="flex gap-3 text-justify">
              <span className="text-cyan-500 font-bold shrink-0">•</span>
              <div>
                <strong className="text-slate-900">Thuốc hạ sốt chuyên dụng:</strong> Luôn có sẵn Paracetamol dạng gói bột sủi hoặc siro với hương vị trái cây để trẻ dễ hợp tác khi uống.
              </div>
            </li>
            <li className="flex gap-3 text-justify">
              <span className="text-cyan-500 font-bold shrink-0">•</span>
              <div>
                <strong className="text-slate-900">Sơ cứu và bảo vệ da:</strong> Các loại kem bôi trị vết côn trùng đốt và thuốc mỡ sát trùng cho các vết trầy xước nhỏ khi bé vận động.
              </div>
            </li>
          </ul>

          <p className="text-justify mb-5">
            Theo khuyến cáo từ các chuyên gia nhi khoa, cha mẹ cần kiểm tra hạn sử dụng định kỳ và bảo quản thuốc ở vị trí cao, tránh xa tầm tay trẻ em để đảm bảo an toàn tuyệt đối.
          </p>

          <ArticleImage src="/bai-6/hinh4.jpg" alt="Cần có sẵn một số loại thuốc và dụng cụ y tế khi nhà có trẻ nhỏ" />

          <SectionHeading number="04" id="quan-ly-thong-minh" title="Quản lý thuốc thiết yếu thông minh hơn cùng FamCare" />

          <p className="text-justify mb-5">
            Khi số lượng <strong>thuốc thiết yếu</strong> trong nhà ngày càng nhiều, việc ghi nhớ hạn sử dụng và liều dùng thủ công cho từng thành viên trở nên vô cùng khó khăn. Thực tế, nhiều gia đình đã phải bỏ đi một lượng lớn thuốc quá hạn chỉ vì quên không kiểm tra định kỳ. Đây chính là lúc các giải pháp công nghệ như <strong>FamCare</strong> phát huy giá trị, giúp việc chăm sóc gia đình trở nên dễ dàng và khoa học hơn.
          </p>

          <p className="text-justify mb-5">
            Thay vì phải lục tìm thông tin trên vỏ hộp cũ, tính năng <strong>Tủ thuốc AI</strong> của FamCare cho phép bạn số hóa toàn bộ danh mục <strong>thuốc nên có sẵn trong nhà</strong> chỉ qua vài thao tác đơn giản. Hệ thống sẽ tự động gửi thông báo nhắc nhở khi thuốc sắp hết, giúp bạn kịp thời thay mới và loại bỏ các sản phẩm không còn an toàn. Đặc biệt, thông qua việc quét đơn thuốc và đồng bộ vào <strong>Hồ sơ gia đình</strong>, bạn có thể quản lý lộ trình dùng thuốc của từng thành viên một cách thảnh thơi, tránh nhầm lẫn liều lượng – một giải pháp cực kỳ tinh tế cho những gia đình hiện đại bận rộn.
          </p>

          <SectionHeading number="05" id="ket-luan" title="Kết luận" />

          <p className="text-justify mb-5">
            Kiện toàn danh mục <strong>thuốc thiết yếu</strong> trong <strong>tủ thuốc gia đình</strong> là bước đi quan trọng nhất trong việc xây dựng một môi trường sống an toàn năm 2026. Bằng việc chủ động trang bị các loại <strong>thuốc nên có sẵn trong nhà</strong> và nắm vững <strong>tên các loại thuốc thường dùng</strong>, bạn đã nắm trong tay chìa khóa để bảo vệ sức khỏe người thân một cách chủ động. Đừng để những sự cố bất ngờ làm gián đoạn hạnh phúc gia đình; hãy để công nghệ của <strong>FamCare</strong> đồng hành cùng bạn trong việc quản lý y tế thông minh và bền vững. Khám phá ngay các tính năng Tủ thuốc Gia đình tại website để bắt đầu hành trình chăm sóc sức khỏe chuyên nghiệp ngay hôm nay: <a href="https://famcare.site/app/cabinet" className="text-cyan-600 hover:text-cyan-700 underline">https://famcare.site/app/cabinet</a>
          </p>

          <div className="mt-12 pt-8 border-t border-slate-200">
            <p className="text-xs text-slate-500 text-justify mb-3">
              <em>Bài viết và hình ảnh được thực hiện bởi <strong>FamCare</strong></em>
            </p>
            <p className="text-xs text-slate-500 text-justify mb-3">
              <em><strong>Danh mục thuốc trên chỉ mang tính tham khảo và nên được điều chỉnh theo tình trạng sức khỏe từng gia đình</strong></em>
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
            title="Tủ Thuốc Gia Đình Cần Có Gì? Danh Mục Thuốc Thiết Yếu 2026"
            url="https://famcare.site/resources/danh-muc-thuoc-thiet-yeu-cho-tu-thuoc-gia-dinh-2026"
            description="Khám phá danh mục thuốc thiết yếu cho tủ thuốc gia đình"
          />

          {/* Related Articles Section */}
          <div className="mt-20 pt-16 border-t-2 border-slate-200">
            <h2 className="font-display text-2xl font-bold text-slate-900 mb-8">Bài viết liên quan</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Link to="/resources/cach-doc-don-thuoc-giay" className="p-6 border border-slate-200 rounded-xl hover:border-cyan-400 hover:shadow-md transition-all group">
                <h3 className="font-bold text-slate-800 mb-2 group-hover:text-cyan-600 transition-colors">Cách đọc đơn thuốc giấy: 5 sai lầm phổ biến</h3>
                <p className="text-slate-600 text-sm">Học cách đọc đơn thuốc chuẩn xác và tránh sai lầm.</p>
              </Link>
              <Link to="/resources/lua-chon-thuc-pham-dung-de-phat-huy-tac-dung-thuoc" className="p-6 border border-slate-200 rounded-xl hover:border-cyan-400 hover:shadow-md transition-all group">
                <h3 className="font-bold text-slate-800 mb-2 group-hover:text-cyan-600 transition-colors">Lựa chọn thực phẩm đúng để phát huy tác dụng thuốc</h3>
                <p className="text-slate-600 text-sm">Hiểu cơ chế tương tác thực phẩm-thuốc.</p>
              </Link>
              <Link to="/resources/quen-uong-thuoc-thi-co-sao-khong" className="p-6 border border-slate-200 rounded-xl hover:border-cyan-400 hover:shadow-md transition-all group">
                <h3 className="font-bold text-slate-800 mb-2 group-hover:text-cyan-600 transition-colors">Quên uống thuốc thì có sao không?</h3>
                <p className="text-slate-600 text-sm">Hướng dẫn xử lý an toàn khi quên liều thuốc.</p>
              </Link>
              <a href="/app/cabinet" className="p-6 border border-slate-200 rounded-xl hover:border-cyan-400 hover:shadow-md transition-all group">
                <h3 className="font-bold text-slate-800 mb-2 group-hover:text-cyan-600 transition-colors">✨ Tủ thuốc AI</h3>
                <p className="text-slate-600 text-sm">Quản lý thông minh lịch uống thuốc.</p>
              </a>
              <a href="/app/scanner" className="p-6 border border-cyan-200 bg-cyan-50/50 rounded-xl hover:border-cyan-400 hover:shadow-md transition-all group">
                <h3 className="font-bold text-slate-800 mb-2 group-hover:text-cyan-600 transition-colors">Quét đơn thuốc AI</h3>
                <p className="text-slate-600 text-sm">Số hóa đơn thuốc giấy tự động.</p>
              </a>
              <a href="/app/meal-plan" className="p-6 border border-slate-200 rounded-xl hover:border-cyan-400 hover:shadow-md transition-all group">
                <h3 className="font-bold text-slate-800 mb-2 group-hover:text-cyan-600 transition-colors">Lập kế hoạch ăn uống</h3>
                <p className="text-slate-600 text-sm">Nhận gợi ý thực đơn cá nhân hóa.</p>
              </a>
            </div>
          </div>
        </main>

        <PublicFooter />
      </div>
    </>
  );
}
