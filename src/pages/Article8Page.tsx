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
  { id: "mat-don-thuoc", text: "Mất đơn thuốc thì phải làm sao?", level: 2 },
  { id: "lien-he-co-so", text: "Liên hệ lại cơ sở y tế đã kê đơn", level: 3 },
  { id: "kiem-tra-app", text: "Kiểm tra ứng dụng quản lý cá nhân", level: 3 },
  { id: "hoi-nha-thuoc", text: "Hỏi nhà thuốc nơi bạn thường mua", level: 3 },
  { id: "mat-benh-an", text: "Mất hồ sơ bệnh án thì phải làm sao?", level: 2 },
  { id: "sao-chep-ho-so", text: "Bước 1: Yêu cầu sao chép hồ sơ tại bệnh viện", level: 3 },
  { id: "lien-he-luutru", text: "Bước 2: Liên hệ phòng Lưu trữ hoặc CNTT", level: 3 },
  { id: "dvu-dien-tu", text: "Bước 3: Dùng dịch vụ y tế điện tử", level: 3 },
  { id: "mat-giaykham", text: "Mất giấy khám sức khỏe thì phải làm sao?", level: 2 },
  { id: "giai-phap-famcare", text: "Giải pháp lưu trữ hồ sơ y tế từ FamCare", level: 2 },
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

export default function Article8Page() {
  const [activeId, setActiveId] = useState("");

  useEffect(() => {
    document.title = "Mất giấy khám sức khỏe thì phải làm sao? Giải pháp tìm lại hồ sơ y tế";
    fetch('/api/articles/mat-giay-kham-suc-khoe-va-ho-so-y-te/view', { method: 'POST' })
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
          Mất giấy khám sức khỏe thì phải làm sao? Giải pháp tìm lại hồ sơ y tế trong 30 giây với AI Scanner
        </title>

        <meta
          name="description"
          content="Mất các giấy tờ hồ sơ bệnh án là vấn đề thường xuyên xảy ra ở nhiều gia đình, đặc biệt là các gia đình lớn chung sống nhiều thế hệ. FamCare hướng dẫn cách xử lý và giải pháp số hóa hồ sơ."
        />

        <meta
          name="keywords"
          content="mất đơn thuốc thì phải làm sao, mất hồ sơ bệnh án, mất giấy khám sức khỏe, cách xử lý"
        />

        <link
          rel="canonical"
          href="https://famcare.site/bai-viet/mat-giay-kham-suc-khoe-va-ho-so-y-te"
        />

        <meta
          property="og:title"
          content="Mất giấy khám sức khỏe thì phải làm sao? Giải pháp tìm lại hồ sơ y tế trong 30 giây"
        />

        <meta
          property="og:description"
          content="Mất các giấy tờ hồ sơ bệnh án là vấn đề thường xuyên xảy ra ở nhiều gia đình. FamCare hướng dẫn cách xử lý và giải pháp số hóa hồ sơ."
        />

        <meta
          property="og:image"
          content="https://famcare.site/bai-8/hinh1.jpg"
        />

        <meta
          property="og:type"
          content="article"
        />

        <meta
          property="og:url"
          content="https://famcare.site/bai-viet/mat-giay-kham-suc-khoe-va-ho-so-y-te"
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
              Mất giấy khám sức khỏe thì phải làm sao? Giải pháp tìm lại hồ sơ y tế trong 30 giây
            </h1>
            <p className="text-justify text-[13px] text-slate-400 tracking-wide uppercase font-sans">
              Mất các giấy tờ hồ sơ bệnh án là vấn đề thường xuyên xảy ra ở nhiều gia đình. Hãy cùng FamCare tìm hiểu cách xử lý và giải pháp số hóa hồ sơ y tế.
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
              Mất các giấy tờ hồ sơ bệnh án là vấn đề thường xuyên xảy ra ở nhiều gia đình, đặc biệt là các gia đình lớn chung sống nhiều thế hệ và các gia đình người lớn tuổi sống một mình. Trong bài viết này, hãy cùng FamCare hướng dẫn bạn cách xử lý những tình huống trên!
            </p>
          </div>

          <SectionHeading number="01" id="mat-don-thuoc" title="Mất đơn thuốc thì phải làm sao?" />

          <p className="text-justify mb-5">
            Đơn thuốc là tài liệu y tế quan trọng, đặc biệt với người mắc bệnh mãn tính cần sử dụng thuốc hằng ngày như tiểu đường, huyết áp hay tim mạch. Trong thời gian chờ xử lý, tuyệt đối <strong>không tự ý sử dụng thuốc thay thế</strong> khi chưa có hướng dẫn của bác sĩ vì điều này có thể ảnh hưởng đến quá trình điều trị và sức khỏe của bạn.
          </p>

          <p className="text-justify mb-6">
            Khi bị mất, bạn có thể thực hiện các bước sau:
          </p>

          <SubHeading id="lien-he-co-so" title="Liên hệ lại cơ sở y tế đã kê đơn" />

          <p className="text-justify mb-5">
            Đây là bước đầu tiên và nhanh nhất. Bệnh viện, phòng khám hoặc bác sĩ gia đình đều lưu trữ lịch sử kê đơn trong hệ thống. Bạn chỉ cần:
          </p>

          <ul className="space-y-3 mb-6">
            <li className="flex gap-3">
              <span className="text-cyan-500 font-bold shrink-0">•</span>
              <span>Mang theo <strong>CCCD/CMND</strong> và <strong>thẻ BHYT</strong> (nếu có)</span>
            </li>
            <li className="flex gap-3">
              <span className="text-cyan-500 font-bold shrink-0">•</span>
              <span>Cung cấp tên, ngày sinh và ngày khám gần nhất</span>
            </li>
            <li className="flex gap-3">
              <span className="text-cyan-500 font-bold shrink-0">•</span>
              <span>Yêu cầu bác sĩ cấp lại hoặc tái khám để có đơn mới</span>
            </li>
          </ul>

          <p className="text-justify mb-5">
            Hầu hết cơ sở y tế sẽ hỗ trợ bạn tra cứu và cấp lại đơn trong cùng buổi làm việc.
          </p>

          <SubHeading id="kiem-tra-app" title="Kiểm tra ứng dụng quản lý cá nhân" />

          <p className="text-justify mb-5">
            Nếu bạn đã chụp ảnh hoặc lưu đơn thuốc trên điện thoại trước đó, hãy kiểm tra ngay thư viện ảnh, email, hoặc các ứng dụng lưu trữ. Đây là lý do vì sao nhiều chuyên gia y tế khuyến nghị mọi người nên số hóa đơn thuốc ngay sau khi nhận.
          </p>

          <SubHeading id="hoi-nha-thuoc" title="Hỏi nhà thuốc nơi bạn thường mua" />

          <p className="text-justify mb-5">
            Nhiều nhà thuốc lưu lại lịch sử mua hàng của khách quen. Nếu bạn mua đúng nhà thuốc đó nhiều lần, họ có thể cung cấp lại thông tin thuốc bạn đã dùng để bạn mang đến bác sĩ xác nhận lại.
          </p>

          <ArticleImage src="/bai-8/hinh1.jpg" alt="Quên mất đơn thuốc thì phải làm sao?" />

          <WarningBox>
            <strong>⚠️ Lưu ý:</strong> Tuyệt đối <strong>không tự ý mua lại</strong> thuốc theo trí nhớ mà không có đơn, đặc biệt với các thuốc kê toa như kháng sinh, thuốc tim mạch hay thuốc tâm thần kinh. Việc dùng sai liều hoặc sai thuốc có thể gây nguy hiểm nghiêm trọng.
          </WarningBox>

          <SectionHeading number="02" id="mat-benh-an" title="Mất hồ sơ bệnh án thì phải làm sao?" />

          <p className="text-justify mb-5">
            <strong>Mất hồ sơ bệnh án</strong> là vấn đề nghiêm trọng hơn, đặc biệt khi bạn chuẩn bị phẫu thuật, xin việc, hoặc chuyển viện. Mất hồ sơ bệnh án làm tăng thời gian chờ đợi chữa trị của người bệnh, dẫn đến sự mệt mỏi và tệ hơn là cứu chữa không kịp thời trong nhiều trường hợp quan trọng. Nếu bạn gặp tình huống đó, dưới đây là cách xử lý:
          </p>

          <SubHeading id="sao-chep-ho-so" title="Bước 1: Yêu cầu sao chép hồ sơ tại bệnh viện" />

          <p className="text-justify mb-5">
            Theo quy định của Bộ Y tế Việt Nam, bệnh nhân hoặc người đại diện hợp pháp có quyền yêu cầu <strong>sao chụp hồ sơ bệnh án</strong>. Bạn cần:
          </p>

          <ul className="space-y-3 mb-6">
            <li className="flex gap-3">
              <span className="text-cyan-500 font-bold shrink-0">•</span>
              <span>Điền mẫu đơn yêu cầu cấp bản sao hồ sơ bệnh án tại phòng Hành chính bệnh viện</span>
            </li>
            <li className="flex gap-3">
              <span className="text-cyan-500 font-bold shrink-0">•</span>
              <span>Xuất trình giấy tờ tùy thân</span>
            </li>
            <li className="flex gap-3">
              <span className="text-cyan-500 font-bold shrink-0">•</span>
              <span>Chờ từ 3–7 ngày làm việc tùy bệnh viện</span>
            </li>
          </ul>

          <ArticleImage src="/bai-8/hinh2.jpg" alt="Mất hồ sơ bệnh án thì phải làm sao?" />

          <SubHeading id="lien-he-luutru" title="Bước 2: Liên hệ phòng Lưu trữ hoặc Công nghệ thông tin" />

          <p className="text-justify mb-5">
            Các bệnh viện hiện đại đã số hóa dữ liệu bệnh án. Phòng CNTT hoặc lưu trữ có thể tra cứu và in lại toàn bộ lịch sử thăm khám, xét nghiệm, chẩn đoán hình ảnh của bạn.
          </p>

          <SubHeading id="dvu-dien-tu" title="Bước 3: Dùng dịch vụ y tế điện tử" />

          <p className="text-justify mb-5">
            Nhiều tỉnh thành đã triển khai hệ thống hồ sơ sức khỏe điện tử quốc gia. Bạn có thể đăng nhập qua cổng <strong>VNeID</strong> hoặc <strong>Cổng Dịch vụ Công</strong> để tra cứu lịch sử khám chữa bệnh BHYT.
          </p>

          <SectionHeading number="03" id="mat-giaykham" title="Mất giấy khám sức khỏe thì phải làm sao?" />

          <p className="text-justify mb-5">
            <strong>Giấy khám sức khỏe</strong> thường cần cho các mục đích như xin việc, cấp bằng lái xe, nhập học,... Mất giấy khám sức khỏe dẫn đến trì trệ các công việc, kéo dài thời gian chờ đợi. Trong trường hợp giấy khám sức khỏe, khi bị mất:
          </p>

          <ul className="space-y-4 mb-6">
            <li className="flex gap-3">
              <span className="text-cyan-500 font-bold shrink-0">•</span>
              <div>
                <strong>Nếu còn trong hạn sử dụng:</strong> Liên hệ ngay cơ sở y tế đã cấp, mang theo CCCD và phí dịch vụ để được cấp lại bản sao có chứng thực.
              </div>
            </li>
            <li className="flex gap-3">
              <span className="text-cyan-500 font-bold shrink-0">•</span>
              <div>
                <strong>Nếu đã hết hạn:</strong> Đặt lịch khám lại tại cơ sở y tế đủ điều kiện (thường là bệnh viện đa khoa hoặc phòng khám được Sở Y tế cấp phép) để được cấp giấy mới.
              </div>
            </li>
          </ul>

          <ArticleImage src="/bai-8/hinh3.jpg" alt="Mất giấy khám sức khỏe thì phải làm sao?" />

          <WarningBox>
            <strong>Lưu ý:</strong> Giấy khám sức khỏe thường có giá trị <strong>6–12 tháng</strong> tùy mục đích sử dụng. Hãy chụp ảnh và lưu file PDF ngay sau khi nhận.
          </WarningBox>

          <SectionHeading number="04" id="giai-phap-famcare" title="Giải pháp lưu trữ hồ sơ y tế đến từ FamCare" />

          <p className="text-justify mb-5">
            FamCare mang đến giải pháp quản lý và lưu trữ hồ sơ y tế cho cả gia đình một cách tiện lợi, an toàn và dễ sử dụng. Với các tính năng ứng dụng AI thông minh, FamCare giúp việc chăm sóc sức khỏe trở nên đơn giản hơn bao giờ hết.
          </p>

          <ul className="space-y-4 mb-6">
            <li className="flex gap-3">
              <div>
                <strong>AI Quét Đơn Thuốc</strong> giúp người dùng dễ dàng chụp ảnh đơn thuốc để hệ thống tự động nhận diện, lưu trữ và nhắc nhở lịch uống thuốc. Chỉ cần upload hình ảnh lên hệ thống, đồng ý với các điều khoản sử dụng, bạn sẽ không còn nỗi lo thất lạc đơn thuốc hay quên liều dùng cho các thành viên trong gia đình.
              </div>
            </li>
            <li className="flex gap-3">
              <div>
                <strong>AI Tủ Thuốc</strong> hỗ trợ quản lý toàn bộ thuốc trong nhà trên một nền tảng duy nhất: theo dõi hạn sử dụng, số lượng thuốc còn lại và lịch sử sử dụng của từng thành viên, giúp gia đình chủ động hơn trong việc chăm sóc sức khỏe mỗi ngày.
              </div>
            </li>
          </ul>

          <SectionHeading number="05" id="ket-luan" title="Kết Luận" />

          <p className="text-justify mb-5">
            Mất đơn thuốc, hồ sơ bệnh án hay giấy khám sức khỏe đều có thể xử lý được nếu bạn biết đúng quy trình. Tuy nhiên, cách tốt nhất vẫn là số hóa và lưu trữ toàn bộ hồ sơ y tế của gia đình ngay hôm nay với FamCare.
          </p>

          <p className="text-justify mb-5">
            Sử dụng FamCare ngay hôm nay để bảo vệ sức khỏe cả nhà một cách chủ động và thông minh hơn! Khám phá ngay các tính năng Tủ thuốc Gia đình và quét đơn thuốc AI tại: <a href="https://famcare.site/app/cabinet" className="text-cyan-600 hover:text-cyan-700 underline">https://famcare.site/app/cabinet</a>
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
