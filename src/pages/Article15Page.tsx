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
  { id: "tiet-kiem-thoi-gian", text: "Tiết kiệm thời gian chờ đợi", level: 2 },
  { id: "han-che-qua-tai", text: "Hạn chế quá tải tại bệnh viện", level: 2 },
  { id: "lua-chon-gio", text: "Dễ dàng lựa chọn giờ khám", level: 2 },
  { id: "thanh-toan", text: "Thanh toán bằng nhiều hình thức", level: 2 },
  { id: "dat-cho-nguoi-than", text: "Dễ dàng đặt lịch cho người thân", level: 2 },
  { id: "famcare", text: "Đặt lịch khám online với FamCare", level: 2 },
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

export default function Article15Page() {
  const [activeId, setActiveId] = useState("");

  useEffect(() => {
    fetch('/api/articles/dat-lich-kham-truc-tuyen-online/view', { method: 'POST' })
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
        <title>5 Lợi Ích Vượt Trội Khi Đặt Lịch Khám Trực Tuyến Dành Cho Người Bận Rộn</title>
        <meta
          name="description"
          content="Khám bệnh không lo chờ đợi! Khám phá 5 lợi ích vượt trội của đặt lịch khám trực tuyến giúp tiết kiệm thời gian và tối ưu chi phí cùng FamCare."
        />
        <meta name="keywords" content="đặt lịch khám trực tuyến, khám bệnh online, đặt lịch khám bệnh, telemedicine, đặt lịch khám, khám bệnh từ xa, tư vấn y tế online, bác sĩ trực tuyến" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Đặt Lịch Khám Trực Tuyến: Hướng Dẫn Khám Bệnh Online Hiệu Quả" />
        <meta name="twitter:description" content="Cách đặt lịch khám trực tuyến an toàn và tiện lợi." />
        <meta name="twitter:image" content="https://famcare.site/bai-15/hinh1.jpg" />
        <link rel="canonical" href="https://famcare.site/resources/5-loi-ich-dat-lich-kham-truc-tuyen-nguoi-ban-ron" />
        <meta property="og:title" content="5 Lợi Ích Vượt Trội Khi Đặt Lịch Khám Trực Tuyến" />
        <meta property="og:description" content="Khám phá 5 lợi ích vượt trội của đặt lịch khám trực tuyến giúp tiết kiệm thời gian." />
        <meta property="og:image" content="https://famcare.site/bai-15/hinh1.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:type" content="article" />
        <meta property="og:url" content="https://famcare.site/resources/5-loi-ich-dat-lich-kham-truc-tuyen-nguoi-ban-ron" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": "5 Lợi Ích Vượt Trội Khi Đặt Lịch Khám Trực Tuyến",
            "description": "Khám phá 5 lợi ích vượt trội của đặt lịch khám trực tuyến.",
            "image": "https://famcare.site/bai-15/hinh1.jpg",
            "datePublished": "2026-05-15",
            "dateModified": "2026-05-15",
            "author": {"@type": "Organization", "name": "FamCare", "url": "https://famcare.site"},
            "publisher": {"@type": "Organization", "name": "FamCare", "logo": {"@type": "ImageObject", "url": "https://famcare.site/logo.png"}},
            "mainEntityOfPage": {"@type": "WebPage", "@id": "https://famcare.site/resources/5-loi-ich-dat-lich-kham-truc-tuyen-nguoi-ban-ron"}
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
              5 Lợi Ích Đặt Lịch Khám Trực Tuyến
            </h1>
            <p className="text-justify text-[13px] text-slate-400 tracking-wide uppercase font-sans">
              Khám phá những lợi ích vượt trội của đặt lịch khám online dành cho người bận rộn.
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
          <div className="mb-14">
            <p className="text-justify text-base leading-relaxed text-slate-700 italic">
              Trong nhịp sống hiện đại, việc dành hàng giờ chờ đợi tại bệnh viện hay phòng khám khiến nhiều người e ngại mỗi khi cần đi khám bệnh. Chính vì vậy, việc đặt lịch khám trực tuyến đang ngày càng được nhiều người quan tâm, đặc biệt là dân văn phòng, phụ huynh có con nhỏ hay người có lịch trình bận rộn. Không chỉ giúp tiết kiệm thời gian, hình thức đặt lịch khám bệnh online còn mang đến trải nghiệm khám chữa bệnh thuận tiện, chủ động và hiện đại hơn. Hãy cùng khám phá 5 lợi ích nổi bật của dịch vụ này và trải nghiệm đặt lịch khám online với FamCare nha!
            </p>
          </div>

          {/* Section 1 */}
          <SectionHeading number="01" id="tiet-kiem-thoi-gian" title="Tiết kiệm thời gian chờ đợi ở bệnh viện" />

          <p className="text-justify mb-6">
            Một trong những "nỗi ám ảnh" lớn nhất của người bệnh khi đi khám bệnh truyền thống là phải đến bệnh viện từ 3-4 giờ sáng, xếp hàng dài mệt mỏi chỉ để lấy số thứ tự. Thời gian chờ đợi đến lượt khám, đợi kết quả xét nghiệm, rồi lại đợi lấy thuốc có thể ngốn mất cả ngày làm việc. Với lẽ đó, dịch vụ đặt lịch khám bệnh online ra đời như một giải pháp cứu cánh, giúp giải quyết triệt để bài toán thời gian này. Thay vì chen chúc mệt mỏi, người dùng giờ đây hoàn toàn có thể chủ động lựa chọn chính xác khung giờ khám phù hợp với lịch trình cá nhân. Chỉ cần vài phút thao tác mượt mà trên điện thoại hoặc máy tính, bạn đã hoàn tất lịch hẹn với bác sĩ chuyên khoa mà mình mong muốn. Khi đến bệnh viện hoặc phòng khám, bạn được vào thẳng phòng chờ theo đúng giờ đã hẹn. Quy trình này giúp rút ngắn đến 70% thời gian chờ đợi vô nghĩa tại bệnh viện, giúp quá trình khám chữa bệnh trở nên nhanh gọn, văn minh hơn.
          </p>
          <ArticleImage src="/bai-15/hinh1.jpg" alt="Đặt lịch khám online giúp tiết kiệm thời gian hơn" />

          <p className="text-justify mb-6">
            Đây chính là lý do vì sao xu hướng khám bệnh tiết kiệm thời gian thông qua các nền tảng đặt lịch khám trực tuyến đang trở thành lựa chọn hàng đầu của những người làm việc toàn thời gian, các quản lý hoặc bất kỳ ai có lịch trình dày đặc. Bạn không còn phải xin nghỉ phép cả ngày, không lo trễ deadline mà vẫn có thể chăm sóc sức khỏe bản thân một cách vẹn toàn nhất.
          </p>

          {/* Section 2 */}
          <SectionHeading number="02" id="han-che-qua-tai" title="Hạn chế tình trạng quá tải tại bệnh viện" />

          <p className="text-justify mb-4">
            Sự dịch chuyển sang xu hướng đặt lịch khám bệnh online đang tạo ra một bước ngoặt lớn, giúp giải quyết triệt để bài toán quá tải này nhờ cơ chế phân luồng thông minh. Bằng cách chủ động hẹn giờ trước, lượng bệnh nhân đến khám sẽ được điều tiết và phân bổ đều theo từng khung giờ cố định trong ngày, thay vì đổ dồn vào cùng một thời điểm. Hệ thống quản lý thông minh này mang lại những thay đổi tích cực rõ rệt:
          </p>
          <ul className="list-disc pl-6 mb-6 space-y-2 text-justify">
            <li><strong>Tối ưu hóa quy trình tiếp nhận:</strong> Khi dòng người được phân lưu khoa học, không gian tại các sảnh chờ trở nên thông thoáng, trật tự và văn minh hơn, xóa bỏ hoàn toàn cảnh chen lấn, xô đẩy.</li>
            <li><strong>Nâng cao chất lượng chăm sóc y tế:</strong> Đội ngũ y bác sĩ và nhân viên tiếp đón giảm bớt áp lực điều phối, từ đó có thêm thời gian và tâm trí để hỗ trợ, tư vấn cho từng người bệnh một cách chu đáo, kỹ lưỡng hơn.</li>
            <li><strong>An toàn cho sức khỏe cộng đồng:</strong> Việc hạn chế tập trung quá đông người trong không gian kín của bệnh viện còn giúp giảm thiểu đáng kể nguy cơ lây nhiễm chéo các bệnh qua đường hô hấp.</li>
          </ul>
          <p className="text-justify mb-6">
            Đây không chỉ đơn thuần là một tiện ích cá nhân, mà còn là một mắt xích quan trọng trong xu hướng chuyển đổi số y tế đang được Bộ Y tế và các cơ sở y khoa toàn quốc khuyến khích.
          </p>

          {/* Section 3 */}
          <SectionHeading number="03" id="lua-chon-gio" title="Dễ dàng lựa chọn giờ khám" />

          <p className="text-justify mb-6">
            Nếu như trước đây, đi khám bệnh đồng nghĩa với việc "bệnh viện xếp giờ nào, mình đi giờ đó" một cách thụ động, thì sự ra đời của các ứng dụng đặt lịch khám trực tuyến đã hoàn toàn đảo ngược quy trình này, trao lại quyền chủ động tối đa cho người bệnh. Không còn cảnh phải nghỉ làm, hủy lịch hẹn hay điều chỉnh toàn bộ sinh hoạt cá nhân để khớp với giờ mở cửa của bệnh viện, người dùng giờ đây có thể tự thiết kế một lộ trình chăm sóc sức khỏe "may đo" riêng cho chính mình.
          </p>
          <ArticleImage src="/bai-15/hinh2.jpg" alt="Người dùng có thể dễ dàng lựa chọn giờ khám, khoa khám theo nhu cầu" />

          <p className="text-justify mb-4">
            Ngay trên giao diện thông minh của ứng dụng, chỉ với vài thao tác chạm, bạn đã có thể tự do sàng lọc và lựa chọn các yếu tố phù hợp nhất với quỹ thời gian và nhu cầu thực tế:
          </p>
          <ul className="list-disc pl-6 mb-6 space-y-2 text-justify">
            <li><strong>Chủ động chọn ngày và khung giờ khám:</strong> Bạn có thể linh hoạt đặt lịch vào các ngày trong tuần hoặc thậm chí là các ngày cuối tuần, chọn khung giờ sáng sớm hoặc cuối chiều tùy thuộc vào lịch trình làm việc và sinh hoạt của bản thân.</li>
            <li><strong>Chính xác chuyên khoa mong muốn:</strong> Hệ thống phân loại khoa phòng rõ ràng giúp bạn tiếp cận đúng nơi, đúng bệnh (từ nội khoa, ngoại khoa, da liễu đến tai mũi họng) mà không phải bỡ ngỡ hỏi đường hay đi lòng vòng tìm kiếm khi đến viện.</li>
            <li><strong>Lựa chọn bác sĩ theo nhu cầu cá nhân:</strong> Bạn hoàn toàn có quyền xem trước hồ sơ năng lực, kinh nghiệm, học hàm học vị (Thạc sĩ, Tiến sĩ, Thầy thuốc ưu tú...) và đánh giá của các bệnh nhân trước để gửi gắm niềm tin vào vị bác sĩ mà mình cảm thấy an tâm nhất.</li>
          </ul>
          <p className="text-justify mb-6">
            Sự linh hoạt này mang lại giá trị thực tế rất lớn cho các gia đình hiện đại. Ví dụ, đối với các bậc phụ huynh bận rộn, bạn có thể dễ dàng hẹn lịch khám khoa nhi cho con vào ngày thứ Bảy hoặc Chủ Nhật. Điều này giúp trẻ không phải nghỉ học, bố mẹ không phải xin nghỉ phép năm mà vẫn đảm bảo con được thăm khám trong điều kiện tốt nhất. Tương tự, đối với các mẹ bầu văn phòng, việc chủ động hẹn lịch khám khoa sản định kỳ theo từng cột mốc phát triển của thai nhi sẽ giúp các mẹ vừa theo dõi sát sao sức khỏe của bé yêu, vừa cân bằng tuyệt đối với lịch trình dày đặc tại công sở mà không lo trễ nải công việc.
          </p>
          <p className="text-justify mb-6">
            Việc loại bỏ được tâm lý lo lắng về thời gian và sự thụ động không chỉ giúp người bệnh giảm tải áp lực tinh thần, mà còn là chìa khóa quan trọng giúp họ duy trì thói quen kiểm tra sức khỏe định kỳ một cách đều đặn, khoa học và chủ động hơn bao giờ hết.
          </p>

          {/* Section 4 */}
          <div className="clear-both"></div>
          <SectionHeading number="04" id="thanh-toan" title="Thanh toán bằng nhiều hình thức" />

          <p className="text-justify mb-6">
            Nhiều nền tảng và ứng dụng đặt lịch khám hiện nay đã tích hợp các phương thức thanh toán online như:
          </p>
          <ul className="list-disc pl-6 mb-6 space-y-2 text-justify">
            <li>Ví điện tử</li>
            <li>Thẻ ngân hàng</li>
            <li>Internet Banking</li>
          </ul>
          <p className="text-justify mb-6">
            Điều này giúp người dùng thanh toán phí khám nhanh chóng mà không cần chuẩn bị nhiều tiền mặt. Ngoài ra, việc lưu trữ hóa đơn điện tử cũng giúp dễ dàng theo dõi lịch sử khám chữa bệnh sau này. Đối với những người bận rộn, đây là một tiện ích giúp tối ưu trải nghiệm khám bệnh hiện đại và tiện lợi hơn rất nhiều.
          </p>

          {/* Section 5 */}
          <SectionHeading number="05" id="dat-cho-nguoi-than" title="Dễ dàng đặt lịch khám cho người thân" />

          <p className="text-justify mb-6">
            Thấu hiểu sâu sắc nỗi lòng muốn chăm sóc sức khỏe cho người thân trong gia đình, các nền tảng y tế thông minh hiện nay đã không còn dừng lại ở việc phục vụ cá nhân. Tính năng tích hợp và quản lý đa hồ sơ cho phép người dùng dễ dàng trở thành "điều dưỡng tại gia" của gia đình bằng cách chủ động đăng ký và quản lý lịch hẹn cho mọi thành viên.
          </p>
          <ArticleImage src="/bai-15/hinh3.jpg" alt="Dễ dàng đặt lịch khám cho người thân" />

          <p className="text-justify mb-6">
            Đặt lịch khám online là một tính năng đặc biệt hữu ích đối với các người dùng trong bối cảnh những người lớn tuổi thường gặp nhiều rào cản và e ngại khi tiếp xúc với các ứng dụng công nghệ hiện đại. Thay vì để người già phải lặn lội từ quê lên sớm, chen chúc xếp hàng mệt mỏi tại các sảnh bệnh viện ngột ngạt để lấy số, thì giờ đây, mọi việc đã có bạn gánh vác.
          </p>
          <p className="text-justify mb-6">
            Dù bạn đang ngồi ở văn phòng, đi công tác xa hay bận rộn với những dự án riêng, chỉ cần vài thao tác chạm nhẹ nhàng trên màn hình điện thoại, bạn đã có thể thay mặt người thân hoàn tất toàn bộ quy trình. Từ việc lựa chọn bệnh viện tuyến đầu, hẹn lịch khám khoa sản/nhi cho vợ và con nhỏ, đến việc chọn các chuyên khoa xương khớp, tim mạch cho bố mẹ, tất cả đều được xác nhận nhanh chóng mà không cần bất kỳ ai phải trực tiếp đến bệnh viện đứng chờ đăng ký.
          </p>
          <p className="text-justify mb-6">
            Có thể nói, đây không chỉ là một giải pháp công nghệ giúp các gia đình tối ưu hóa thời gian, mà còn là chiếc cầu nối yêu thương, giúp những người bận rộn vẹn toàn bổn phận hiếu thảo, chủ động chăm sóc và bảo vệ sức khỏe cho những người thân yêu một cách thuận tiện, chu đáo nhất trong kỷ nguyên số.
          </p>

          {/* Section 6 */}
          <SectionHeading number="06" id="famcare" title="Đặt lịch khám online với FamCare" />

          <p className="text-justify mb-4">
            Không còn cảnh mơ hồ về chi phí hay mất thời gian sàng lọc thông tin bác sĩ, tính năng "Đặt lịch khám" trên hệ thống y tế của FamCare mang đến một trải nghiệm đặt lịch khám trực tuyến hoàn toàn khác biệt.
          </p>
          <ArticleImage src="/bai-15/hinh4.jpg" alt="Đặt lịch khám online dễ dàng cùng FamCare" />
          <ul className="list-disc pl-6 mb-6 space-y-2 text-justify">
            <li><strong>Tìm kiếm thông minh với bộ lọc chuyên sâu:</strong> FamCare cho phép người dùng chủ động tìm kiếm và sắp xếp lịch hẹn theo đúng nhu cầu thực tế. Bạn có thể dễ dàng lọc bác sĩ theo Chuyên khoa, Học vị/Học hàm (CK II, Thạc sĩ, Tiến sĩ...), Bệnh viện/Cơ sở y tế, Khu vực/Quận và cả Giới tính. Mọi thông tin về lịch khám (ví dụ: Thứ 2.4.5 lúc 09:30) đều hiển thị rõ ràng, giúp bạn khớp lịch trình cá nhân chỉ trong vài giây.</li>
            <li><strong>Công khai giá khám minh bạch:</strong> Một trong những điểm cộng lớn nhất của FamCare là tính năng hiển thị công khai, rõ ràng chi phí khám bệnh của từng bác sĩ ngay trên giao diện. Điều này giúp người dùng hoàn toàn chủ động về mặt tài chính trước khi đưa ra quyết định đặt lịch.</li>
            <li><strong>Tích hợp công nghệ AI vượt trội:</strong> Vượt trội hơn các nền tảng thông thường, FamCare tích hợp công nghệ AI kết nối trực tiếp với Tủ thuốc AI của gia đình bạn. Hệ thống sẽ tự động theo dõi, tính toán thời hạn sử dụng của đơn thuốc hiện tại (ví dụ: "Dự kiến hết đơn thuốc Cao Huyết Áp của Bố vào tuần tới") để chủ động đưa ra nhắc nhở và gợi ý "Lên lịch ngay".</li>
          </ul>

          {/* Section 7 */}
          <SectionHeading number="07" id="ket-luan" title="Kết luận" />

          <p className="text-justify mb-6">
            Sự phát triển của công nghệ đã giúp việc khám chữa bệnh trở nên nhanh chóng và thuận tiện hơn bao giờ hết. Với hàng loạt lợi ích đặt lịch khám trực tuyến như tiết kiệm thời gian, chủ động lịch trình, giảm tải bệnh viện và hỗ trợ thanh toán online, đây đang trở thành lựa chọn ưu tiên của nhiều người bận rộn.
          </p>
          <p className="text-justify mb-6">
            Nếu bạn đang tìm kiếm giải pháp khám bệnh tiết kiệm thời gian, hãy thử trải nghiệm FamCare ngay hôm nay với tính năng đặt lịch khám uy tín để chăm sóc sức khỏe chủ động hơn cho bản thân và gia đình.
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
            title="Đặt Lịch Khám Trực Tuyến: Hướng Dẫn Khám Bệnh Online Hiệu Quả"
            url="https://famcare.site/resources/dat-lich-kham-truc-tuyen-online"
            description="Cách đặt lịch khám trực tuyến an toàn và tiện lợi."
          />

          {/* Related Articles */}
          <div className="mt-20 pt-16 border-t-2 border-slate-200">
            <h2 className="font-display text-2xl font-bold text-slate-900 mb-8">Bài viết liên quan</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Link to="/resources/cach-chon-bac-si-gioi-uy-tin" className="p-6 border border-slate-200 rounded-xl hover:border-cyan-400 hover:shadow-md transition-all group">
                <h3 className="font-bold text-slate-800 mb-2 group-hover:text-cyan-600 transition-colors">Bí quyết chọn bác sĩ giỏi</h3>
                <p className="text-slate-600 text-sm">Cách đọc hiểu học hàm học vị.</p>
              </Link>
              <Link to="/resources/quet-don-thuoc-ai-so-hoa-ho-so" className="p-6 border border-slate-200 rounded-xl hover:border-cyan-400 hover:shadow-md transition-all group">
                <h3 className="font-bold text-slate-800 mb-2 group-hover:text-cyan-600 transition-colors">Quản lý hồ sơ y tế bằng AI</h3>
                <p className="text-slate-600 text-sm">Số hóa hồ sơ bệnh án thông minh.</p>
              </Link>
              <Link to="/resources/cach-doc-don-thuoc-giay" className="p-6 border border-slate-200 rounded-xl hover:border-cyan-400 hover:shadow-md transition-all group">
                <h3 className="font-bold text-slate-800 mb-2 group-hover:text-cyan-600 transition-colors">Cách đọc đơn thuốc giấy</h3>
                <p className="text-slate-600 text-sm">Hiểu rõ thông tin đơn thuốc.</p>
              </Link>
              <a href="/app/appointment" className="p-6 border border-slate-200 rounded-xl hover:border-cyan-400 hover:shadow-md transition-all group">
                <h3 className="font-bold text-slate-800 mb-2 group-hover:text-cyan-600 transition-colors">📅 Đặt lịch khám</h3>
                <p className="text-slate-600 text-sm">Đặt lịch khám trực tuyến.</p>
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
