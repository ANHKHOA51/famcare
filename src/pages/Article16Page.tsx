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
  { id: "ca-nhan-hoa", text: "Thực đơn dinh dưỡng cá nhân hóa là gì?", level: 2 },
  { id: "chi-so", text: "Các chỉ số được phân tích", level: 3 },
  { id: "bua-an", text: "Thế nào là một bữa ăn dinh dưỡng?", level: 2 },
  { id: "tinh-bot", text: "Nhóm tinh bột - Nguồn năng lượng", level: 3 },
  { id: "chat-dam", text: "Nhóm chất đạm - Xây dựng cơ bắp", level: 3 },
  { id: "chat-beo", text: "Nhóm chất béo tốt - Bảo vệ tim mạch", level: 3 },
  { id: "sai-lam", text: "Những sai lầm phổ biến khi lên thực đơn", level: 2 },
  { id: "tro-ly-ai", text: "Trợ lý dinh dưỡng AI của FamCare", level: 2 },
  { id: "ket-luan", text: "Kết luận", level: 2 },
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

export default function Article16Page() {
  const [activeId, setActiveId] = useState("");

  useEffect(() => {
    fetch('/api/articles/hom-nay-an-gi-thuc-don-dinh-duong-ca-nhan-hoa/view', { method: 'POST' })
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
        <title>"Hôm nay ăn gì?" - Thực đơn dinh dưỡng cá nhân hóa cho người bận rộn</title>
        <meta
          name="description"
          content="Xóa tan nỗi lo 'Hôm nay ăn gì'! Khám phá giải pháp thiết kế thực đơn cá nhân hóa chỉ với 1 chạm. Tiện lợi, khoa học, tiết kiệm thời gian cùng FamCare."
        />
        <meta name="keywords" content="thực đơn dinh dưỡng, lên thực đơn, ăn gì hôm nay, hôm nay ăn gì, dinh dưỡng cá nhân, thực đơn 7 ngày, kế hoạch ăn uống, dinh dưỡng hợp lý" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Lên Thực Đơn Dinh Dưỡng: Hướng Dẫn Ăn Uống Cân Bằng" />
        <meta name="twitter:description" content="Cách lên thực đơn dinh dưỡng hợp lý cho cả gia đình." />
        <meta name="twitter:image" content="https://famcare.site/bai-16/hinh1.jpg" />
        <link rel="canonical" href="https://famcare.site/resources/hom-nay-an-gi-thuc-don-dinh-duong-ca-nhan-hoa" />
        <meta property="og:title" content="'Hôm nay ăn gì?' - Thực đơn dinh dưỡng cá nhân hóa" />
        <meta property="og:description" content="Xóa tan nỗi lo 'Hôm nay ăn gì'! Khám phá giải pháp thiết kế thực đơn cá nhân hóa." />
        <meta property="og:image" content="https://famcare.site/bai-16/hinh1.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:type" content="article" />
        <meta property="og:url" content="https://famcare.site/resources/hom-nay-an-gi-thuc-don-dinh-duong-ca-nhan-hoa" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": "'Hôm nay ăn gì?' - Thực đơn dinh dưỡng cá nhân hóa",
            "description": "Xóa tan nỗi lo 'Hôm nay ăn gì'! Khám phá giải pháp thiết kế thực đơn cá nhân hóa.",
            "image": "https://famcare.site/bai-16/hinh1.jpg",
            "datePublished": "2026-05-15",
            "dateModified": "2026-05-15",
            "author": {"@type": "Organization", "name": "FamCare", "url": "https://famcare.site"},
            "publisher": {"@type": "Organization", "name": "FamCare", "logo": {"@type": "ImageObject", "url": "https://famcare.site/logo.png"}},
            "mainEntityOfPage": {"@type": "WebPage", "@id": "https://famcare.site/resources/hom-nay-an-gi-thuc-don-dinh-duong-ca-nhan-hoa"}
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
              "Hôm nay ăn gì?" - Thực đơn Cá Nhân Hóa
            </h1>
            <p className="text-justify text-[13px] text-slate-400 tracking-wide uppercase font-sans">
              Thiết kế thực đơn dinh dưỡng khoa học chỉ với 1 chạm, phù hợp với mục tiêu và thể trạng của bạn.
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

          {/* Section 1 */}
          <SectionHeading number="01" id="ca-nhan-hoa" title="Thực đơn dinh dưỡng cá nhân hóa là gì?" />

          <p className="text-justify mb-6">
            Hiểu một cách khoa học, đây là phương pháp thiết kế chế độ ăn uống dựa trên các đặc điểm sinh học, thể trạng và lối sống đặc thù của riêng một cá nhân. Thay vì ép buộc cơ thể thích nghi với một thực đơn đại trà, dinh dưỡng cá nhân hóa sẽ đi sâu vào phân tích các chỉ số nền tảng của riêng bạn.
          </p>

          <h3 id="chi-so" className="font-display text-lg sm:text-xl font-bold text-slate-900 leading-snug mt-8 mb-3 scroll-mt-28">
            Các chỉ số được phân tích
          </h3>
          <ul className="list-disc pl-6 mb-6 space-y-2">
            <li>Chỉ số nhân trắc học: Độ tuổi, giới tính, cân nặng, chiều cao, BMI</li>
            <li>Nhịp sống và thói quen: Mức độ vận động, tính chất công việc</li>
            <li>Nền tảng thể chất: Các bệnh lý nền, dị ứng, dung nạp thực phẩm</li>
            <li>Mục tiêu cá nhân: Giảm cân, tăng cơ, eat clean hay giữ dáng</li>
          </ul>

          {/* Section 2 */}
          <SectionHeading number="02" id="bua-an" title="Thế nào là một bữa ăn dinh dưỡng?" />

          <p className="text-justify mb-6">
            Một bữa ăn cân bằng tiêu chuẩn bắt buộc phải có sự góp mặt đầy đủ của các nhóm chất: tinh bột, chất đạm, chất béo tốt, và vitamin khoáng chất. Tuy nhiên, việc đủ chất theo công thức chung là chưa đủ, vì mỗi cá nhân phản ứng khác nhau với thực phẩm.
          </p>

          <h3 id="tinh-bot" className="font-display text-lg sm:text-xl font-bold text-slate-900 leading-snug mt-8 mb-3 scroll-mt-28">
            Nhóm tinh bột - Nguồn năng lượng
          </h3>
          <p className="text-justify mb-6">
            Ưu tiên các loại tinh bột phức hợp (gạo lứt, yến mạch, khoai lang) để duy trì năng lượng ổn định và tạo cảm giác no lâu. Lưu ý: Ngay cả khi ăn cùng lượng tinh bột giống nhau, chỉ số glucose của mỗi người tăng giảm hoàn toàn khác nhau do DNA quyết định.
          </p>

          <h3 id="chat-dam" className="font-display text-lg sm:text-xl font-bold text-slate-900 leading-snug mt-8 mb-3 scroll-mt-28">
            Nhóm chất đạm - Xây dựng cơ bắp
          </h3>
          <p className="text-justify mb-6">
            Protein đóng vai trò cốt lõi trong xây dựng cơ bắp. Kết hợp hài hòa giữa đạm động vật (cá, ức gà, trứng) và đạm thực vật (đậu, hạt) để phù hợp với cơ địa của riêng bạn.
          </p>

          <h3 id="chat-beo" className="font-display text-lg sm:text-xl font-bold text-slate-900 leading-snug mt-8 mb-3 scroll-mt-28">
            Nhóm chất béo tốt - Bảo vệ tim mạch
          </h3>
          <p className="text-justify mb-6">
            Chất béo lành mạnh (từ dầu ô liu, bơ, cá béo, hạt) là dung môi bắt buộc để hấp thu vitamin thiết yếu và bảo vệ hệ tim mạch. Hàm lượng triglyceride có sự biến thiên lớn giữa các cá nhân tùy vào microbiome đường ruột.
          </p>

          {/* Section 3 */}
          <div className="clear-both"></div>
          <SectionHeading number="03" id="sai-lam" title="Những sai lầm phổ biến khi lên thực đơn" />

          <h3 className="font-display text-lg sm:text-xl font-bold text-slate-900 leading-snug mt-8 mb-3">
            Lầm tưởng ăn nhiều thịt là đủ chất
          </h3>
          <p className="text-justify mb-6">
            Nhiều người "cuồng đạm" nhưng lạm dụng các loại thịt đỏ chứa nhiều cholesterol là nguyên nhân hàng đầu gây bệnh tim mạch. Một thực đơn khoa học đòi hỏi sự cân bằng tinh tế.
          </p>

          <h3 className="font-display text-lg sm:text-xl font-bold text-slate-900 leading-snug mt-8 mb-3">
            Lầm tưởng ăn kiêng khắt khe sẽ giảm cân
          </h3>
          <p className="text-justify mb-6">
            Khi bạn cắt giảm khẩu phần cực đoan, cơ thể sẽ bật chế độ "sinh tồn", làm chậm chuyển hóa và ưu tiên đốt cơ bắp. Giảm cân khoa học phải tuân thủ thâm hụt calo an toàn nhưng vẫn đủ dinh dưỡng.
          </p>

          <h3 className="font-display text-lg sm:text-xl font-bold text-slate-900 leading-snug mt-8 mb-3">
            Lầm tưởng ăn lành mạnh rất tốn thời gian
          </h3>
          <p className="text-justify mb-6">
            Trong kỷ nguyên số, rào cản về mặt thời gian đã hoàn toàn bị xóa bỏ nhờ công nghệ. Bạn có thể có lộ trình dinh dưỡng trọn gói: lên thực đơn tự động, tính toán calories, gợi ý món ăn - tất cả chỉ trong vài giây.
          </p>

          {/* Section 4 */}
          <SectionHeading number="04" id="tro-ly-ai" title="Trợ lý dinh dưỡng AI của FamCare" />

          <p className="text-justify mb-6">
            Không còn những thực đơn mang tính "đại trà", Trợ lý AI của FamCare phân tích sâu sắc tình trạng sức khỏe thực tế của bạn, từ các chỉ số xét nghiệm đến các bệnh lý cụ thể, để thiết kế một kế hoạch ăn uống an toàn, khoa học và hỗ trợ điều trị.
          </p>

          {/* Section 5 */}
          <SectionHeading number="05" id="ket-luan" title="Kết luận" />

          <p className="text-justify mb-6">
            Đừng để câu hỏi "Hôm nay ăn gì?" trở thành nỗi lo trong cuộc sống. Với Trợ lý dinh dưỡng AI của FamCare, việc xây dựng một chế độ ăn uống khoa học không còn quá khó khăn. Hãy bắt đầu hành trình ăn uống lành mạnh ngay hôm nay!
          </p>

          <div className="mt-12 pt-8 border-t border-slate-200">
            <p className="text-xs text-slate-500 text-justify mb-3">
              <em>Bài viết và hình ảnh được thực hiện bởi <strong>FamCare</strong></em>
            </p>
            <p className="text-xs text-slate-500 text-justify mb-3">
              <em><strong>Bài viết này mang tính thông tin chung và không thay thế cho lời khuyên y tế chuyên nghiệp.</strong></em>
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
            title="Lên Thực Đơn Dinh Dưỡng: Hướng Dẫn Ăn Uống Cân Bằng"
            url="https://famcare.site/resources/len-thuc-don-dinh-duong-can-bang"
            description="Cách lên thực đơn dinh dưỡng hợp lý cho cả gia đình."
          />

          {/* Related Articles */}
          <div className="mt-20 pt-16 border-t-2 border-slate-200">
            <h2 className="font-display text-2xl font-bold text-slate-900 mb-8">Bài viết liên quan</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Link to="/resources/thuc-pham-nguoi-benh-tieu-duong-nen-tranh-va-che-do-an" className="p-6 border border-slate-200 rounded-xl hover:border-cyan-400 hover:shadow-md transition-all group">
                <h3 className="font-bold text-slate-800 mb-2 group-hover:text-cyan-600 transition-colors">Thực phẩm tiểu đường nên tránh</h3>
                <p className="text-slate-600 text-sm">Xây dựng chế độ ăn chuẩn y khoa.</p>
              </Link>
              <Link to="/resources/theo-doi-chi-so-bmi-dung-cach" className="p-6 border border-slate-200 rounded-xl hover:border-cyan-400 hover:shadow-md transition-all group">
                <h3 className="font-bold text-slate-800 mb-2 group-hover:text-cyan-600 transition-colors">Cách theo dõi chỉ số BMI chuẩn xác</h3>
                <p className="text-slate-600 text-sm">Hiểu rõ ý nghĩa chỉ số BMI.</p>
              </Link>
              <Link to="/resources/lua-chon-thuc-pham-dung-de-phat-huy-tac-dung-thuoc" className="p-6 border border-slate-200 rounded-xl hover:border-cyan-400 hover:shadow-md transition-all group">
                <h3 className="font-bold text-slate-800 mb-2 group-hover:text-cyan-600 transition-colors">Lựa chọn thực phẩm đúng</h3>
                <p className="text-slate-600 text-sm">Tương tác thực phẩm-thuốc.</p>
              </Link>
              <a href="/app/meal-plan" className="p-6 border border-slate-200 rounded-xl hover:border-cyan-400 hover:shadow-md transition-all group">
                <h3 className="font-bold text-slate-800 mb-2 group-hover:text-cyan-600 transition-colors">🍽️ Thực đơn AI</h3>
                <p className="text-slate-600 text-sm">Thiết kế thực đơn cá nhân hóa.</p>
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
