import React, { useEffect, useState } from 'react';
import PublicNavbar from "@/components/PublicNavbar";
import PublicFooter from "@/components/PublicFooter";
import { Link } from "react-router-dom";
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
    fetch('/api/articles/thuc-don-cho-nguoi-tieu-duong-len-thuc-don-bang-ai/view', { method: 'POST' })
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
            <h3 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
              Mục lục bài viết
            </h3>
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

          {/* Section 1 */}
          <SectionHeading number="01" id="nguyen-tac" title="Nguyên tắc cốt lõi xây dựng thực đơn cho người tiểu đường" />

          <p className="text-justify mb-6">
            Bản chất của việc điều trị đái tháo đường không nằm ở việc cắt bỏ hoàn toàn các nhóm chất, mà là kiểm soát tốc độ tăng đường huyết sau ăn và duy trì năng lượng ổn định. Khi thiết kế một thực đơn cho người tiểu đường, mục tiêu tối thượng là đảm bảo chỉ số đường huyết (GI) thấp, tải lượng đường (GL) an toàn, đồng thời vẫn phải xây dựng thực đơn khoa học và đủ chất.
          </p>

          <h3 id="khau-phan" className="font-display text-lg sm:text-xl font-bold text-slate-900 leading-snug mt-8 mb-3 scroll-mt-28">
            Lưu ý quan trọng với khẩu phần ăn theo từng buổi
          </h3>
          <p className="text-justify mb-4"><strong>Bữa sáng:</strong> Nên giàu đạm và chất xơ để ổn định đường huyết cho cả ngày dài. Gợi ý: Trứng luộc kèm salad ức gà hoặc bát yến mạch nhỏ không đường.</p>
          <p className="text-justify mb-4"><strong>Người lớn tuổi:</strong> Thức ăn nên được chế biến mềm, ít muối. Ưu tiên các loại sữa hạt không đường hoặc canh rau củ thanh đạm.</p>
          <p className="text-justify mb-6"><strong>Bữa tối:</strong> Nên là bữa ăn nhẹ nhàng để tránh áp lực cho hệ tiêu hóa. Các món canh rau thanh đạm, cá hấp, đậu phụ luộc là sự lựa chọn hoàn hảo.</p>

          {/* Section 2 */}
          <SectionHeading number="02" id="meo-ai" title="Mẹo lên thực đơn 7 ngày bằng AI" />

          <p className="text-justify mb-6">
            Sử dụng mẹo lên thực đơn ăn uống cả tuần bằng AI giúp bạn biến những quy tắc y khoa khô khan thành các món ăn ngon miệng, hợp khẩu vị bản địa. Bạn hoàn toàn có thể yêu cầu AI thiết kế một thực đơn 7 ngày với các nguyên liệu thuần Việt có sẵn trong tủ lạnh.
          </p>

          <div className="overflow-x-auto mb-6">
            <table className="w-full border-collapse border border-slate-300 text-xs">
              <thead className="bg-slate-100">
                <tr>
                  <th className="border border-slate-300 p-2">Ngày</th>
                  <th className="border border-slate-300 p-2">Bữa sáng</th>
                  <th className="border border-slate-300 p-2">Bữa trưa</th>
                  <th className="border border-slate-300 p-2">Bữa tối</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-slate-300 p-2"><strong>Thứ Hai</strong></td>
                  <td className="border border-slate-300 p-2">2 quả trứng luộc + Salad bơ</td>
                  <td className="border border-slate-300 p-2">1 bát cơm lứt + Ức gà + Canh cải xanh</td>
                  <td className="border border-slate-300 p-2">Cá hồi hấp + Đậu bắp luộc</td>
                </tr>
                <tr className="bg-slate-50">
                  <td className="border border-slate-300 p-2"><strong>Thứ Ba</strong></td>
                  <td className="border border-slate-300 p-2">Cháo yến mạch nấu thịt băm</td>
                  <td className="border border-slate-300 p-2">1 bát cơm lứt + Thịt lợn nạc + Bí đao</td>
                  <td className="border border-slate-300 p-2">Đậu phụ sốt cà + Canh rau ngót</td>
                </tr>
                <tr>
                  <td className="border border-slate-300 p-2"><strong>Thứ Tư</strong></td>
                  <td className="border border-slate-300 p-2">Khoai lang luộc + Sữa hạt</td>
                  <td className="border border-slate-300 p-2">1 bát cơm lứt + Gà kho gừng + Bông cải</td>
                  <td className="border border-slate-300 p-2">Tôm nõn xào măng tây + Canh bí đỏ</td>
                </tr>
                <tr className="bg-slate-50">
                  <td className="border border-slate-300 p-2"><strong>Thứ Năm</strong></td>
                  <td className="border border-slate-300 p-2">Phở lứt bò (nhiều rau)</td>
                  <td className="border border-slate-300 p-2">1 bát cơm lứt + Cá thu sốt cà + Cải cúc</td>
                  <td className="border border-slate-300 p-2">Thịt bò xào bông + Nấm hấp</td>
                </tr>
                <tr>
                  <td className="border border-slate-300 p-2"><strong>Thứ Sáu</strong></td>
                  <td className="border border-slate-300 p-2">Salad ức gà + Hạt chia</td>
                  <td className="border border-slate-300 p-2">1 bát cơm lứt + Mực hấp gừng + Rau muống</td>
                  <td className="border border-slate-300 p-2">Trứng đúc thịt nạc + Canh mướp đắng</td>
                </tr>
                <tr className="bg-slate-50">
                  <td className="border border-slate-300 p-2"><strong>Thứ Bảy</strong></td>
                  <td className="border border-slate-300 p-2">Bánh mì nguyên cám + Phô mai</td>
                  <td className="border border-slate-300 p-2">1 bát cơm lứt + Thịt bò áp chảo + Canh bầu</td>
                  <td className="border border-slate-300 p-2">Cá quả nấu ngót (không đường) + Cải</td>
                </tr>
                <tr>
                  <td className="border border-slate-300 p-2"><strong>Chủ Nhật</strong></td>
                  <td className="border border-slate-300 p-2">Súp bắp cải nấu gà xé</td>
                  <td className="border border-slate-300 p-2">1 bát cơm lứt + Tôm rim nhạt + Súp lơ</td>
                  <td className="border border-slate-300 p-2">Thịt viên hấp nấm hương + Canh dền</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Section 3 */}
          <div className="clear-both"></div>
          <SectionHeading number="03" id="he-sinh-thai" title="FamCare - Hệ sinh thái đồng hành" />

          <p className="text-justify mb-6">
            Để biến công nghệ dinh dưỡng cá nhân hóa AI thành trợ thủ đắc lực, FamCare đã tích hợp tính năng thiết lập thực đơn thông minh ngay trên ứng dụng di động.
          </p>
          <ul className="list-disc pl-6 mb-6 space-y-2">
            <li><strong>Lên thực đơn bằng AI cá nhân hóa:</strong> Ứng dụng tự động thiết kế thực đơn 7 ngày, liên tục thay đổi dựa trên sở thích nhưng vẫn đảm bảo chỉ số an toàn</li>
            <li><strong>Cảnh báo tương tác thực phẩm:</strong> Hệ thống nhận diện các mon ăn nguy cơ làm tăng đường huyết</li>
            <li><strong>Đồng bộ hóa hồ sơ gia đình:</strong> Mọi nhật ký ăn uống được đồng bộ tức thì, giúp con cái theo dõi sức khỏe cha mẹ từ xa</li>
          </ul>

          {/* Section 4 */}
          <SectionHeading number="04" id="ket-bai" title="Kết bài" />

          <p className="text-justify mb-6">
            Việc xây dựng một thực đơn cho người tiểu đường khoa học không còn là cuộc chiến cân não khi có sự hỗ trợ của công nghệ hiện đại. Bằng cách áp dụng giải pháp lên thực đơn bằng AI, bạn hoàn toàn có thể làm chủ chỉ số sức khỏe và tận hưởng cuộc sống một cách trọn vẹn nhất.
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
