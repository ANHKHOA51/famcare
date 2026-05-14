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
  { id: "tai-sao-can", text: "Tại sao cần lưu trữ đơn thuốc đúng cách", level: 2 },
  { id: "gia-tri-bao-lau", text: "Đơn thuốc có giá trị bao lâu và những hiểu lầm", level: 3 },
  { id: "thoi-gian-luu-tru", text: "Thời gian lưu trữ đơn thuốc chuẩn theo quy định", level: 3 },
  { id: "3-dau-hieu", text: "3 Dấu hiệu báo động", level: 2 },
  { id: "giai-phap-famcare", text: "FamCare: Giải pháp số hóa hồ sơ y tế", level: 2 },
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

export default function Article7Page() {
  const [activeId, setActiveId] = useState("");

  useEffect(() => {
    document.title = "3 Dấu Hiệu Lưu Trữ Đơn Thuốc Sai Cách: Rủi Ro Tiềm Ẩn Và Cách Xử Lý";
    fetch('/api/articles/3-dau-hieu-luu-tru-don-thuoc-sai-cach-va-giai-phap/view', { method: 'POST' })
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
          3 Dấu Hiệu Lưu Trữ Đơn Thuốc Sai Cách: Rủi Ro Tiềm Ẩn Và Cách Xử Lý
        </title>

        <meta
          name="description"
          content="Bạn có đang lưu trữ đơn thuốc đúng quy định? Khám phá ngay 3 dấu hiệu sai lầm phổ biến và giải pháp số hóa hồ sơ y tế từ FamCare để bảo vệ sức khỏe gia đình."
        />

        <meta
          name="keywords"
          content="lưu trữ đơn thuốc, thời gian lưu trữ đơn thuốc, quy định lưu trữ đơn thuốc, lưu trữ đơn thuốc trong bao lâu, lưu trữ đơn thuốc tại nhà thuốc, đơn thuốc có giá trị bao lâu, dùng đơn thuốc cũ, tra cứu đơn thuốc"
        />

        <link
          rel="canonical"
          href="https://famcare.site/bai-viet/3-dau-hieu-luu-tru-don-thuoc-sai-cach-va-giai-phap"
        />

        <meta
          property="og:title"
          content="3 Dấu Hiệu Lưu Trữ Đơn Thuốc Sai Cách: Rủi Ro Tiềm Ẩn Và Cách Xử Lý"
        />

        <meta
          property="og:description"
          content="Bạn có đang lưu trữ đơn thuốc đúng quy định? Khám phá ngay 3 dấu hiệu sai lầm phổ biến và giải pháp số hóa hồ sơ y tế từ FamCare để bảo vệ sức khỏe gia đình."
        />

        <meta
          property="og:image"
          content="https://famcare.site/bai-7/hinh1.jpg"
        />

        <meta
          property="og:type"
          content="article"
        />

        <meta
          property="og:url"
          content="https://famcare.site/bai-viet/3-dau-hieu-luu-tru-don-thuoc-sai-cach-va-giai-phap"
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
              3 Dấu Hiệu Bạn Đang Lưu Trữ Đơn Thuốc Sai Cách: Rủi Ro Tiềm Ẩn Và Cách Xử Lý
            </h1>
            <p className="text-justify text-[13px] text-slate-400 tracking-wide uppercase font-sans">
              Khám phá 3 dấu hiệu báo động khi lưu trữ đơn thuốc không đúng quy định và giải pháp số hóa hồ sơ y tế để bảo vệ sức khỏe gia đình.
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
              Nhiều gia đình thường có thói quen giữ lại tập đơn thuốc cũ trong ngăn kéo hoặc tủ thuốc mà không biết rằng việc <strong>lưu trữ đơn thuốc</strong> không khoa học có thể dẫn đến những hệ lụy nghiêm trọng cho sức khỏe. Từ việc thất lạc thông tin điều trị đến rủi ro dùng nhầm thuốc đã hết giá trị, tất cả đều đe dọa trực tiếp đến sự an toàn của người thân. Bạn có chắc chắn mình đang quản lý hồ sơ y tế đúng chuẩn? Bài viết này của FamCare sẽ chỉ ra 3 dấu hiệu báo động và cung cấp cẩm nang về <strong>quy định lưu trữ đơn thuốc</strong> hiện nay để cùng nâng cấp hệ thống quản lý sức khỏe gia đình, biến những xấp giấy lộn xộn thành dữ liệu số an toàn và tiện lợi ngay hôm nay!
            </p>
          </div>

          <ArticleImage src="/bai-7/hinh1.jpg" alt="Việc lưu trữ đơn thuốc giấy truyền thống dễ dẫn đến tình trạng hư hỏng và gây khó khăn khi cần tra cứu" />

          <SectionHeading number="01" id="tai-sao-can" title="Tại sao cần lưu trữ đơn thuốc đúng cách trong gia đình?" />

          <p className="text-justify mb-5">
            Trong hành trình chăm sóc sức khỏe, đơn thuốc không chỉ là một tờ giấy để mua thuốc mà còn là "bản đồ" ghi lại tiền sử bệnh lý, các loại dược phẩm cơ thể từng phản ứng và phác đồ điều trị của bác sĩ. Việc <strong>lưu trữ đơn thuốc</strong> đúng cách giúp người chăm sóc gia đình chủ động cung cấp thông tin chính xác cho bác sĩ trong các lần tái khám, từ đó tối ưu hóa hiệu quả điều trị và tránh các tương tác thuốc nguy hiểm.
          </p>

          <p className="text-justify mb-5">
            Tuy nhiên, ở một số gia đình, thói quen lưu trữ hồ sơ y tế vẫn còn khá rời rạc. Đa số người dùng chỉ giữ lại đơn thuốc trong một thời gian ngắn hoặc để lẫn lộn với các loại hóa đơn khác. Điều này dẫn đến tình trạng khi cần <strong>tra cứu đơn thuốc</strong> cũ để đối soát triệu chứng hoặc cung cấp cho bác sĩ chuyên khoa, người dùng thường rơi vào trạng thái bối rối vì không tìm thấy thông tin. Việc thiếu một quy trình quản lý hồ sơ y tế gia đình tập trung không chỉ gây lãng phí thời gian mà còn tiềm ẩn nguy cơ <strong>dùng đơn thuốc cũ</strong> cho những đợt bệnh mới, dẫn đến tình trạng kháng thuốc hoặc phản ứng phụ nghiêm trọng.
          </p>

          <SubHeading id="gia-tri-bao-lau" title="Đơn thuốc có giá trị bao lâu và những hiểu lầm thường gặp" />

          <p className="text-justify mb-5">
            Trước đây, theo các quy chuẩn y tế truyền thống, người dùng thường phải tuân thủ nghiêm ngặt quy định đơn thuốc chỉ có giá trị mua thuốc trong vòng 05 ngày kể từ ngày kê đơn. Tuy nhiên, với lộ trình hiện đại hóa của Bộ Y tế và sự ra đời của <strong>Thông tư 26/2025/TT-BYT</strong> (có hiệu lực từ 1/7/2025) cùng hệ thống đơn thuốc điện tử quốc gia, việc quản lý thời hạn này đã có những bước chuyển mình mạnh mẽ. Hiện nay, giá trị của một đơn thuốc không chỉ nằm ở số ngày để mua thuốc tại quầy, mà quan trọng hơn là tính kết nối dữ liệu liên thông giữa bác sĩ, người bệnh và hệ thống quản lý dược phẩm toàn quốc.
          </p>

          <p className="text-justify mb-5">
            Dù quy định về thời gian có thể linh hoạt hơn để phù hợp với các bệnh mạn tính hoặc lộ trình điều trị dài ngày, nhưng rủi ro lớn nhất vẫn là thói quen <strong>dùng đơn thuốc cũ</strong> của người dân. Nhiều người vẫn giữ đơn từ nhiều tháng trước để tự ý mua lại thuốc khi thấy triệu chứng tái phát. Việc này cực kỳ nguy hiểm bởi cùng một biểu hiện lâm sàng nhưng nguyên nhân bệnh lý có thể đã thay đổi hoàn toàn theo thời gian. Thay vì chỉ nhìn vào "thời hạn mua thuốc", việc lưu trữ đơn thuốc lúc này đóng vai trò giúp bác sĩ đối soát dữ liệu cũ để đưa ra chỉ định mới chính xác nhất.
          </p>

          <ArticleImage src="/bai-7/hinh2.jpg" alt="Việc dùng lại toa thuốc cũ có thể không an toàn đối với người bệnh" />

          <SubHeading id="thoi-gian-luu-tru" title="Thời gian lưu trữ đơn thuốc chuẩn theo quy định ngành y" />

          <p className="text-justify mb-5">
            Nếu bạn băn khoăn về việc <strong>lưu trữ đơn thuốc trong bao lâu</strong> là đủ, hãy nhìn vào <strong>quy định lưu trữ đơn thuốc tại nhà thuốc</strong> và bệnh viện. Thông thường, các cơ sở y tế phải lưu trữ đơn thuốc (đặc biệt là thuốc kiểm soát đặc biệt như thuốc gây nghiện, hướng thần) trong thời gian từ 01 đến 02 năm kể từ ngày thuốc hết hạn sử dụng.
          </p>

          <p className="text-justify mb-5">
            Đối với cá nhân và hộ gia đình, <strong>thời gian lưu trữ đơn thuốc</strong> nên được duy trì tối thiểu từ 3 đến 5 năm để tạo thành một bộ hồ sơ tiền sử bệnh lý hoàn chỉnh. Việc hiểu rõ <strong>quy định lưu trữ đơn thuốc</strong> giúp bạn phân loại được đâu là tài liệu cần giữ lại lâu dài và đâu là thông tin có thể loại bỏ. Tuy nhiên, việc lưu trữ giấy trong thời gian dài tại nhà thường gặp trở ngại do khí hậu nóng ẩm dễ gây mục nát, mờ chữ. Đây là lý do tại sao xu hướng số hóa hồ sơ y tế đang trở thành yêu cầu cấp thiết để bảo tồn giá trị thông tin theo thời gian.
          </p>

          <SectionHeading number="02" id="3-dau-hieu" title="3 Dấu Hiệu Báo Động Bạn Đang Lưu Trữ Đơn Thuốc Sai Cách" />

          <p className="text-justify mb-8">
            Dưới đây là 3 dấu hiệu cho thấy hệ thống quản lý y tế tại gia của bạn đang gặp vấn đề nghiêm trọng, cần được khắc phục ngay để tránh rủi ro cho người thân.
          </p>

          <div className="mb-8">
            <h3 className="text-lg font-bold text-slate-900 mb-3">Dấu hiệu thứ nhất: Thất lạc hoặc tốn quá nhiều thời gian để tìm kiếm đơn thuốc cũ</h3>
            <p className="text-justify mb-0">
              Nếu bạn mất hơn 5 phút để tìm lại đơn thuốc của lần khám trước khi con trẻ bị sốt lại, đó là dấu hiệu của việc lưu trữ không có hệ thống. Trong các tình huống y tế khẩn cấp, sự chậm trễ này có thể làm mất đi "thời gian vàng" của người bệnh.
            </p>
          </div>

          <div className="mb-8">
            <h3 className="text-lg font-bold text-slate-900 mb-3">Dấu hiệu thứ hai: Đơn thuốc bị hư hỏng vật lý hoặc mờ chữ</h3>
            <p className="text-justify mb-0">
              Giấy in nhiệt tại nhiều phòng khám hiện nay rất nhanh bị mờ dưới tác động của ánh sáng và độ ẩm. Một đơn thuốc mờ chữ không thể đọc chính xác liều lượng là một "quả bom nổ chậm", vì chỉ cần đọc sai một con số 0 trong liều dùng cũng có thể dẫn đến quá liều cấp tính.
            </p>
          </div>

          <div className="mb-8">
            <h3 className="text-lg font-bold text-slate-900 mb-3">Dấu hiệu thứ ba: Lưu trữ lẫn lộn đơn thuốc của nhiều thành viên mà không phân loại</h3>
            <WarningBox>
              Dấu hiệu này cực kỳ nguy hiểm đối với các gia đình đa thế hệ. Việc để chung đơn thuốc của ông bà, cha mẹ và con cái trong cùng một túi đựng dễ dẫn đến tình trạng lấy nhầm đơn khi đi mua thuốc hoặc uống nhầm thuốc của nhau.
            </WarningBox>
          </div>

          <ArticleImage src="/bai-7/hinh3.jpg" alt="Đơn thuốc bị hư hỏng vật lý hoặc mờ chữ gây khó khăn cho người bệnh" />

          <SectionHeading number="03" id="giai-phap-famcare" title="FamCare: Giải pháp số hóa hồ sơ y tế gia đình" />

          <p className="text-justify mb-5">
            Khi số lượng đơn thuốc tăng lên theo thời gian, việc ghi nhớ và quản lý thủ công trở nên gần như bất khả thi. Đây là lúc các giải pháp số hóa như FamCare trở nên hữu ích, loại bỏ nỗi lo về việc <strong>lưu trữ đơn thuốc trong bao lâu</strong> hay sợ giấy tờ bị hư hỏng theo thời gian.
          </p>

          <p className="text-justify mb-5">
            Thông qua tính năng Máy quét đơn thuốc AI, FamCare hỗ trợ bạn chuyển đổi mọi tờ đơn thuốc giấy sang định dạng số chỉ trong vài giây nhờ khả năng tự động nhận diện tên thuốc, hàm lượng và chỉ dẫn từ bác sĩ. Điểm tinh tế của ứng dụng nằm ở chỗ sau khi quét, bạn có thể chủ động lựa chọn những loại thuốc cần thiết để lưu trực tiếp vào <strong>Tủ thuốc</strong> riêng của từng thành viên trong gia đình. Mọi dữ liệu sau đó sẽ được đồng bộ hóa tức thì vào <strong>Hồ sơ gia đình</strong>, cho phép bạn dễ dàng kiểm tra danh sách thuốc đã lưu hoặc theo dõi lộ trình điều trị cá nhân hóa của bất kỳ ai mà không còn lo lắng về việc thất lạc hay đơn thuốc hết hiệu lực mua sắm.
          </p>

          <SectionHeading number="04" id="ket-luan" title="Kết Luận" />

          <p className="text-justify mb-5">
            Tóm lại, việc nhận diện 3 dấu hiệu <strong>lưu trữ đơn thuốc</strong> sai cách là bước đi quan trọng để bảo vệ an toàn sức khỏe cho cả gia đình. Đừng để những xấp giấy cũ kỹ và các quy tắc <strong>quy định lưu trữ đơn thuốc</strong> phức tạp làm khó bạn. Với sự đồng hành của <strong>FamCare</strong>, bạn hoàn toàn có thể số hóa mọi hồ sơ y tế, thảnh thơi quản lý lịch sử bệnh lý của người thân một cách khoa học nhất. Hãy bắt đầu hành trình chăm sóc sức khỏe hiện đại và an toàn ngay hôm nay bằng cách trải nghiệm các tính năng ưu việt của chúng tôi tại website FamCare với tính năng Tủ thuốc Gia đình: <a href="https://famcare.site/app/cabinet" className="text-cyan-600 hover:text-cyan-700 underline">https://famcare.site/app/cabinet</a>
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
