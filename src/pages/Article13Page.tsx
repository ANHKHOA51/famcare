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
  { id: "tai-sao-quan-trong", text: "Tại sao việc nhận diện thực phẩm nên tránh lại quan trọng?", level: 2 },
  { id: "danh-muc", text: "Danh mục thực phẩm nên tránh", level: 2 },
  { id: "tinh-bot", text: "Tinh bột tinh chế", level: 3 },
  { id: "trai-cay", text: "Trái cây người tiểu đường không nên ăn", level: 3 },
  { id: "che-do-an", text: "Xây dựng chế độ ăn theo từng buổi", level: 2 },
  { id: "an-sang", text: "Người tiểu đường nên ăn sáng bằng gì?", level: 3 },
  { id: "nguoi-gia", text: "Người già bị tiểu đường nên ăn gì?", level: 3 },
  { id: "giai-phap", text: "Giải pháp FamCare", level: 2 },
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

export default function Article13Page() {
  const [activeId, setActiveId] = useState("");

  useEffect(() => {
    fetch('/api/articles/thuc-pham-nguoi-benh-tieu-duong-nen-tranh-va-che-do-an/view', { method: 'POST' })
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
        <title>Thực Phẩm Người Tiểu Đường Nên Tránh Để Ổn Định Đường Huyết</title>
        <meta
          name="description"
          content="Khám phá danh mục thực phẩm người bệnh tiểu đường nên tránh cập nhật 2026. Xây dựng chế độ ăn cá nhân hóa cùng FamCare."
        />
        <meta name="keywords" content="thực phẩm tiểu đường, tiểu đường nên ăn gì, người tiểu đường kiêng ăn gì, chế độ ăn tiểu đường, tiểu đường nên tránh, ổn định đường huyết, đường huyết cao, kiểm soát đường huyết" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Thực Phẩm Người Tiểu Đường Nên Tránh Để Ổn Định Đường Huyết" />
        <meta name="twitter:description" content="Khám phá danh mục thực phẩm người bệnh tiểu đường nên tránh cập nhật 2026." />
        <meta name="twitter:image" content="https://famcare.site/bai-13/hinh1.jpg" />
        <link rel="canonical" href="https://famcare.site/resources/thuc-pham-nguoi-benh-tieu-duong-nen-tranh-va-che-do-an" />
        <meta property="og:title" content="Thực Phẩm Người Tiểu Đường Nên Tránh Để Ổn Định Đường Huyết" />
        <meta property="og:description" content="Khám phá danh mục thực phẩm người bệnh tiểu đường nên tránh cập nhật 2026." />
        <meta property="og:image" content="https://famcare.site/bai-13/hinh1.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:type" content="article" />
        <meta property="og:url" content="https://famcare.site/resources/thuc-pham-nguoi-benh-tieu-duong-nen-tranh-va-che-do-an" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": "Thực Phẩm Người Tiểu Đường Nên Tránh Để Ổn Định Đường Huyết",
            "description": "Khám phá danh mục thực phẩm người bệnh tiểu đường nên tránh cập nhật 2026.",
            "image": "https://famcare.site/bai-13/hinh1.jpg",
            "datePublished": "2026-05-15",
            "dateModified": "2026-05-15",
            "author": {"@type": "Organization", "name": "FamCare", "url": "https://famcare.site"},
            "publisher": {"@type": "Organization", "name": "FamCare", "logo": {"@type": "ImageObject", "url": "https://famcare.site/logo.png"}},
            "mainEntityOfPage": {"@type": "WebPage", "@id": "https://famcare.site/resources/thuc-pham-nguoi-benh-tieu-duong-nen-tranh-va-che-do-an"}
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
              Thực Phẩm Người Tiểu Đường Nên Tránh
            </h1>
            <p className="text-justify text-[13px] text-slate-400 tracking-wide uppercase font-sans">
              Danh mục chi tiết về những món ăn cần tránh và cách thiết kế thực đơn chuẩn y khoa cho người bệnh tiểu đường.
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
          <p className="text-justify mb-6">
            Xây dựng một chế độ dinh dưỡng lành mạnh chính là "chìa khóa vàng" để chung sống hòa bình với căn bệnh đái tháo đường. Tuy nhiên, giữa vô vàn thông tin trái chiều, việc xác định chính xác các loại <strong>thực phẩm người bệnh tiểu đường nên tránh</strong> thường khiến người bệnh và thân nhân bối rối.
          </p>
          <p className="text-justify mb-6">
            Trong bối cảnh y khoa năm 2026, khi các xu hướng như theo dõi đường huyết liên tục (CGM) và dinh dưỡng cá nhân hóa lên ngôi, việc hiểu rõ bản chất thực phẩm là điều bắt buộc. Bài viết này <strong>FamCare</strong> sẽ cung cấp danh mục chi tiết về những món ăn "đại kỵ" và cách thiết kế thực đơn chuẩn y khoa.
          </p>

          {/* Section 1 */}
          <SectionHeading number="01" id="tai-sao-quan-trong" title="Tại sao việc nhận diện thực phẩm nên tránh lại quan trọng?" />

          <p className="text-justify mb-6">
            Kiểm soát chỉ số đường huyết không đồng nghĩa với việc nhịn ăn cực đoan, mà là thấu hiểu chỉ số đường huyết (GI) và tải lượng đường (GL) của thực phẩm. Các loại thực phẩm người bệnh tiểu đường nên tránh thường là những món có chỉ số GI cao, khiến đường huyết tăng vọt ngay sau khi ăn, gây áp lực nặng nề lên tuyến tụy và mạch máu.
          </p>
          <p className="text-justify mb-6">
            Ngày nay, với sự hỗ trợ của công nghệ theo dõi đường huyết liên tục (CGM), chúng ta biết rằng mỗi cá nhân có một mức đáp ứng đường huyết khác nhau. Tuy nhiên, nhóm tinh bột tinh chế và đường bổ sung vẫn là "kẻ thù" hàng đầu gây ra các biến chứng về tim mạch và thận. Việc chủ động nhận diện các nhóm thực phẩm này giúp bạn tránh được những đợt tăng đường huyết đột ngột, từ đó duy trì sức khỏe bền vững.
          </p>
          <ArticleImage src="/bai-13/hinh1.jpeg" alt="Hiểu rõ thực phẩm người bệnh tiểu đường nên tránh giúp kiểm soát chỉ số đường huyết ổn định" />

          {/* Section 2 */}
          <SectionHeading number="02" id="danh-muc" title="Danh mục thực phẩm người bệnh tiểu đường nên tránh" />
          <p className="text-justify mb-6">
            Dưới đây là bảng tổng hợp các nhóm thực phẩm dễ làm mất kiểm soát đường huyết nhất mà người bệnh cần lưu tâm:
          </p>
          <h3 className="font-display text-lg sm:text-xl font-bold text-slate-900 leading-snug mt-8 mb-3">
            Bảng tác động của thực phẩm đối với đường huyết
          </h3>
          <div className="overflow-x-auto mb-6">
            <table className="w-full border-collapse border border-slate-300 text-sm">
              <thead className="bg-slate-100">
                <tr>
                  <th className="border border-slate-300 p-3 text-left">Nhóm thực phẩm</th>
                  <th className="border border-slate-300 p-3 text-left">Ví dụ cụ thể</th>
                  <th className="border border-slate-300 p-3 text-left">Tác động y khoa</th>
                  <th className="border border-slate-300 p-3 text-left">Giải pháp thay thế (Low GI)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-slate-300 p-3 font-semibold">Đồ uống ngọt</td>
                  <td className="border border-slate-300 p-3">Trà sữa, nước ngọt, nước ép đóng chai</td>
                  <td className="border border-slate-300 p-3">Tăng đường huyết nhanh, gây tích mỡ gan</td>
                  <td className="border border-slate-300 p-3">Nước lọc, trà thảo mộc, nước ép xanh nguyên xơ</td>
                </tr>
                <tr className="bg-slate-50/50">
                  <td className="border border-slate-300 p-3 font-semibold">Tinh bột trắng</td>
                  <td className="border border-slate-300 p-3">Bánh mì trắng, cơm trắng, bún, phở</td>
                  <td className="border border-slate-300 p-3">Chỉ số GI cao, gây nhanh đói và kháng Insulin</td>
                  <td className="border border-slate-300 p-3">Gạo lứt, yến mạch, khoai lang luộc</td>
                </tr>
                <tr>
                  <td className="border border-slate-300 p-3 font-semibold">Trái cây ngọt</td>
                  <td className="border border-slate-300 p-3">Sầu riêng, mít, nhãn, vải chín</td>
                  <td className="border border-slate-300 p-3">Chứa nhiều Fructose, tăng tải lượng đường</td>
                  <td className="border border-slate-300 p-3">Táo xanh, bưởi, ổi, thanh long</td>
                </tr>
                <tr className="bg-slate-50/50">
                  <td className="border border-slate-300 p-3 font-semibold">Chất béo xấu</td>
                  <td className="border border-slate-300 p-3">Đồ chiên rán, mỡ động vật, nội tạng</td>
                  <td className="border border-slate-300 p-3">Gây xơ vữa mạch máu, tăng biến chứng tim mạch</td>
                  <td className="border border-slate-300 p-3">Cá béo, hạt hạnh nhân, dầu oliu</td>
                </tr>
              </tbody>
            </table>
          </div>

          <ArticleImage src="/bai-13/hinh2.jpg" alt="Máy đo đường huyết liên tục" />

          <h3 id="tinh-bot" className="font-display text-lg sm:text-xl font-bold text-slate-900 leading-snug mt-8 mb-3 scroll-mt-28">
            2.1 Tinh bột tinh chế: Bệnh tiểu đường nên ăn gì thay cơm?
          </h3>
          <p className="text-justify mb-6">
            Tinh bột là thành phần khó kiểm soát nhất trong bữa ăn của người Việt. Vậy người bệnh tiểu đường nên ăn gì thay cơm để vừa đủ năng lượng vừa không làm tăng đường huyết?
          </p>
          <p className="text-justify mb-6">
            Xu hướng dinh dưỡng 2026 ưu tiên các loại tinh bột phức hợp. Bạn có thể thay thế gạo trắng bằng gạo lứt, diêm mạch (Quinoa) hoặc yến mạch. Những thực phẩm này giàu chất xơ, tạo cảm giác no lâu và giúp giải phóng năng lượng từ từ vào máu. Khi chế biến món ăn dành cho người tiểu đường, hãy ưu tiên phương pháp hấp hoặc luộc thay vì chiên xào để bảo toàn giá trị dinh dưỡng.
          </p>

          <h3 id="trai-cay" className="font-display text-lg sm:text-xl font-bold text-slate-900 leading-snug mt-8 mb-3 scroll-mt-28">
            2.2 Trái cây người bệnh tiểu đường không nên ăn
          </h3>
          <p className="text-justify mb-6">
            Mặc dù chứa nhiều vitamin, nhưng danh mục trái cây người bệnh tiểu đường không nên ăn bao gồm các loại quả có hàm lượng đường fructose quá cao hoặc quả quá chín. Sầu riêng, mít, nhãn, vải là những ví dụ điển hình. Thay vì uống nước ép (đã bị loại bỏ chất xơ), người bệnh nên ăn trái cây nguyên miếng để tận dụng lượng xơ giúp làm chậm quá trình hấp thụ đường.
          </p>
          <ArticleImage src="/bai-13/hinh3.jpg" alt="Một số loại trái cây không phù hợp cho người tiểu đường (Hình minh họa)" />

          {/* Section 3 */}
          <div className="clear-both"></div>
          <SectionHeading number="03" id="che-do-an" title="Xây dựng chế độ ăn cho người tiểu đường theo đối tượng đặc thù" />

          <p className="text-justify mb-6">
            Một <strong>chế độ ăn cho người tiểu đường</strong> chuẩn xác cần được cá nhân hóa dựa trên độ tuổi và mức độ vận động.
          </p>

          <h3 id="an-sang" className="font-display text-lg sm:text-xl font-bold text-slate-900 leading-snug mt-8 mb-3 scroll-mt-28">
            Người bị tiểu đường nên ăn gì vào bữa sáng?
          </h3>
          <p className="text-justify mb-6">
            Một bữa sáng lý tưởng nên giàu đạm và chất xơ để ổn định đường huyết cho cả ngày dài. Gợi ý: Trứng luộc kèm salad ức gà hoặc một bát yến mạch nhỏ không đường.
          </p>

          <h3 id="nguoi-gia" className="font-display text-lg sm:text-xl font-bold text-slate-900 leading-snug mt-8 mb-3 scroll-mt-28">
            Người già bị tiểu đường nên ăn gì?
          </h3>
          <p className="text-justify mb-6">
            Với người cao tuổi, hệ tiêu hóa thường kém hơn, thức ăn nên được chế biến mềm, ít muối. Ưu tiên các loại sữa hạt không đường hoặc canh rau củ thanh đạm để bổ sung vi chất mà không gây áp lực cho thận.
          </p>
          <p className="text-justify mb-6">
            Việc nắm vững <strong>tiểu đường nên ăn gì và kiêng ăn gì</strong> không chỉ giúp ổn định chỉ số mà còn cải thiện tâm trạng, giúp người bệnh không cảm thấy bị "cô lập" trong chính bữa ăn của mình.
          </p>
          <ArticleImage src="/bai-13/hinh4.png" alt="Cần có một thực đơn dinh dưỡng hợp lý cho người tiểu đường" />

          {/* Section 4 */}
          <SectionHeading number="04" id="giai-phap" title="FamCare: Trợ lý thiết kế thực đơn AI và cá nhân hóa dinh dưỡng 2026" />

          <p className="text-justify mb-6">
            Việc ghi nhớ danh sách <strong>thực phẩm người bệnh tiểu đường nên tránh</strong> hay tính toán calo mỗi ngày là một áp lực rất lớn. Trong bối cảnh y tế số năm 2026, <strong>FamCare</strong> mang đến giải pháp <strong>Thực đơn dinh dưỡng AI</strong> vượt trội, giúp bạn thảnh thơi quản lý dinh dưỡng.
          </p>
          <p className="text-justify mb-4">
            Thay vì chỉ đưa ra những lời khuyên chung chung, tính năng <strong>Thực đơn dinh dưỡng AI</strong> của FamCare sẽ:
          </p>
          <ul className="list-disc pl-6 mb-6 space-y-2 text-justify">
            <li><strong>Cá nhân hóa thực đơn:</strong> Đề xuất các món ăn dành cho người tiểu đường dựa trên sở thích và chỉ số đường huyết thực tế của bạn.</li>
            <li><strong>Cảnh báo thông minh:</strong> Hệ thống nhận diện các loại trái cây người bệnh tiểu đường không nên ăn và đưa ra các lựa chọn thay thế giàu chất xơ, giúp bạn tiểu đường ăn gì tốt cho sức khỏe mà vẫn ngon miệng.</li>
            <li><strong>Đồng bộ hồ sơ gia đình:</strong> Giúp người thân dễ dàng theo dõi và chuẩn bị bữa ăn chuẩn y khoa cho người bệnh, biến cuộc chiến với tiểu đường trở thành hành trình sống khỏe chủ động.</li>
          </ul>

          {/* Section 5 */}
          <SectionHeading number="05" id="ket-bai" title="Kết bài" />

          <p className="text-justify mb-6">
            Tóm lại, thấu hiểu danh mục thực phẩm người bệnh tiểu đường nên tránh là bước đi tiên quyết để ngăn ngừa biến chứng. Bằng cách áp dụng một chế độ ăn cho người tiểu đường khoa học và tận dụng công nghệ AI từ FamCare, bạn hoàn toàn có thể kiểm soát tốt sức khỏe của mình.
          </p>
          <p className="text-justify mb-6">
            Hãy để FamCare đồng hành cùng bạn trong việc thiết kế thực đơn và quản lý y tế thông minh. Khám phá ngay các tính năng Thực đơn dinh dưỡng AI của chúng tôi để bắt đầu hành trình sống khỏe, thảnh thơi bên những người thân yêu ngay tại: <a href="https://famcare.site/app/meal-plan" className="text-cyan-600 hover:text-cyan-700 underline">https://famcare.site/app/meal-plan</a>
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
            title="Thực Phẩm Người Tiểu Đường Nên Tránh Để Ổn Định Đường Huyết"
            url="https://famcare.site/resources/thuc-pham-nguoi-benh-tieu-duong-nen-tranh-va-che-do-an"
            description="Khám phá danh mục thực phẩm người bệnh tiểu đường nên tránh cập nhật 2026."
          />

          {/* Related Articles */}
          <div className="mt-20 pt-16 border-t-2 border-slate-200">
            <h2 className="font-display text-2xl font-bold text-slate-900 mb-8">Bài viết liên quan</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Link to="/resources/theo-doi-chi-so-bmi-dung-cach" className="p-6 border border-slate-200 rounded-xl hover:border-cyan-400 hover:shadow-md transition-all group">
                <h3 className="font-bold text-slate-800 mb-2 group-hover:text-cyan-600 transition-colors">Cách theo dõi chỉ số BMI chuẩn xác</h3>
                <p className="text-slate-600 text-sm">Hiểu rõ ý nghĩa chỉ số BMI.</p>
              </Link>
              <Link to="/resources/lua-chon-thuc-pham-dung-de-phat-huy-tac-dung-thuoc" className="p-6 border border-slate-200 rounded-xl hover:border-cyan-400 hover:shadow-md transition-all group">
                <h3 className="font-bold text-slate-800 mb-2 group-hover:text-cyan-600 transition-colors">Lựa chọn thực phẩm đúng để phát huy tác dụng thuốc</h3>
                <p className="text-slate-600 text-sm">Hiểu cơ chế tương tác.</p>
              </Link>
              <Link to="/resources/len-thuc-don-dinh-duong-can-bang" className="p-6 border border-slate-200 rounded-xl hover:border-cyan-400 hover:shadow-md transition-all group">
                <h3 className="font-bold text-slate-800 mb-2 group-hover:text-cyan-600 transition-colors">Lên Thực Đơn Dinh Dưỡng Cân Bằng</h3>
                <p className="text-slate-600 text-sm">Hướng dẫn ăn uống khoa học.</p>
              </Link>
              <a href="/app/meal-plan" className="p-6 border border-slate-200 rounded-xl hover:border-cyan-400 hover:shadow-md transition-all group">
                <h3 className="font-bold text-slate-800 mb-2 group-hover:text-cyan-600 transition-colors">🍽️ Thực đơn AI</h3>
                <p className="text-slate-600 text-sm">Thiết kế thực đơn cá nhân hóa.</p>
              </a>
              <a href="/app/cabinet" className="p-6 border border-slate-200 rounded-xl hover:border-cyan-400 hover:shadow-md transition-all group">
                <h3 className="font-bold text-slate-800 mb-2 group-hover:text-cyan-600 transition-colors">✨ Tủ thuốc AI</h3>
                <p className="text-slate-600 text-sm">Quản lý thông minh.</p>
              </a>
              <a href="/app/scanner" className="p-6 border border-slate-200 rounded-xl hover:border-cyan-400 hover:shadow-md transition-all group">
                <h3 className="font-bold text-slate-800 mb-2 group-hover:text-cyan-600 transition-colors">📱 Quét đơn thuốc AI</h3>
                <p className="text-slate-600 text-sm">Số hóa đơn thuốc giấy.</p>
              </a>
            </div>
          </div>
        </main>

        <PublicFooter />
      </div>
    </>
  );
}
