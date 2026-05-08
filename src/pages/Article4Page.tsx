import React, { useEffect } from 'react';
import PublicNavbar from "@/components/PublicNavbar";
import PublicFooter from "@/components/PublicFooter";
import { Link } from "react-router-dom";
import { ArrowRight, AlertTriangle, ShieldCheck, Info } from "lucide-react";

export default function Article4Page() {
  useEffect(() => {
    // SEO Meta
    document.title = "QUÊN UỐNG THUỐC THÌ CÓ SAO KHÔNG? HƯỚNG DẪN XỬ LÝ ĐÚNG TỪ CHUYÊN GIA";
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', 'Quên uống thuốc là tình huống có thể xảy ra trong cuộc sống hằng ngày. Vậy cần uống thuốc bù hay bỏ luôn cử thuốc? Và những loại thuốc nào luôn cần thiết uống đúng liều? Tính năng tủ thuốc AI và Hồ sơ sức khỏe của FamCare.');
    
    // Add keywords
    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (!metaKeywords) {
      metaKeywords = document.createElement('meta');
      metaKeywords.setAttribute('name', 'keywords');
      document.head.appendChild(metaKeywords);
    }
    metaKeywords.setAttribute('content', 'quên uống thuốc, quên uống thuốc tránh thai, quên uống thuốc huyết áp, uống thuốc bù, lịch uống thuốc, hẹn giờ uống thuốc');

    return () => {
      // Cleanup custom meta if needed, or leave it. Usually SPAs overwrite this per page route.
    };
  }, []);

  return (
    <div className="min-h-screen bg-neutral-50 selection:bg-indigo-200 selection:text-indigo-900 font-body">
      <PublicNavbar />

      <main className="relative z-20 bg-white max-w-4xl mx-auto mt-8 sm:mt-12 rounded-[2rem] px-6 sm:px-12 lg:px-20 py-12 sm:py-16 text-[1.125rem] text-slate-800 leading-[1.8] shadow-sm mb-12">
        
        {/* Header Section */}
        <header className="mb-12 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-100 text-cyan-800 text-xs font-bold tracking-widest uppercase mb-6">
            Kiến thức Y khoa
          </div>
          <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 leading-[1.2] mb-6 tracking-tight text-balance">
            QUÊN UỐNG THUỐC THÌ CÓ SAO KHÔNG? HƯỚNG DẪN XỬ LÝ ĐÚNG TỪ CHUYÊN GIA
          </h1>
          <p className="text-sm text-slate-500 italic font-medium leading-relaxed max-w-2xl mx-auto">
            BIÊN SOẠN DỰA TRÊN CÁC NGHIÊN CỨU ĐẾN TỪ TẠP CHÍ PATIENT (2014), TẠP CHÍ THYROID (2014), TẠP CHÍ PHARMACOKINETICS AND PHARMACODYNAMICS(2021) VÀ TỔ CHỨC Y TẾ THẾ GIỚI.
          </p>
        </header>

        {/* Content Body */}
        <article className="prose prose-lg prose-slate max-w-none text-justify">
          
          <p className="lead text-xl sm:text-2xl text-slate-600 font-semibold mb-10 text-center text-balance">
            <strong>Quên uống thuốc</strong> là tình huống rất phổ biến trong cuộc sống bận rộn, nhưng xử lý sai cách có thể đem ảnh hưởng rất lớn đến hiệu quả điều trị. Nên uống bù hay bỏ qua liều đã quên? Những loại thuốc nào bắt buộc phải dùng đúng giờ, đúng liều? Bài viết của FamCare sẽ giúp bạn hiểu rõ cách xử trí an toàn!
          </p>

          <h2 className="font-display text-2xl sm:text-3xl font-bold text-slate-900 mt-12 mb-6 tracking-tight">
            Tại sao chúng ta quên uống thuốc?
          </h2>
          <p>
            Việc <strong>quên uống thuốc</strong> không hẳn xuất phát từ sự chủ quan, mà thường đến từ những xáo trộn rất “đời thường” trong nhịp sống hằng ngày. Theo nghiên cứu đăng trên tạp chí Patient (Brod và cộng sự, 2013-2014) tại Canada, Đức và Trung Quốc, những nguyên nhân phổ biến nhất bao gồm sự thay đổi thói quen sinh hoạt như đi du lịch, có khách đến nhà hay xử lý tình huống khẩn cấp; bị phân tâm bởi các hoạt động xã hội như ăn tối, tụ họp; hoặc đơn giản là những gián đoạn nhỏ như một cuộc điện thoại hay tin nhắn.
          </p>
          <p>
            Bên cạnh đó, trạng thái quá bận rộn: vội vàng vào buổi sáng, mệt mỏi vào buổi tối, cũng khiến việc uống thuốc dễ bị bỏ sót. Đáng chú ý, nhiều người không chỉ “quên hẳn” mà còn rơi vào tình huống không chắc mình đã uống thuốc hay chưa, dẫn đến lo lắng và có thể xử lý sai như uống trùng liều hoặc bỏ qua liều cần thiết.
          </p>

          <EditorialImage 
            src="/bai-4/hinh1.jpg" 
            alt="Tại sao chúng ta quên uống thuốc?" 
          />

          <h2 className="font-display text-2xl sm:text-3xl font-bold text-slate-900 mt-12 mb-6 tracking-tight">
            Uống bù hay bỏ qua?
          </h2>
          <p>
            Khi lỡ quên một liều thuốc, việc nên “uống bù hay bỏ qua” thực ra phụ thuộc vào đặc tính của chính loại thuốc bạn đang dùng. Theo nghiên cứu của Counterman & Lawley (2021), yếu tố quan trọng nhất là “thời gian bán hủy”. Thời gian bán hủy có thể hiểu đơn giản là thời gian thuốc tồn tại trong cơ thể.
          </p>
          <p>
            Nếu thuốc “ở lại” trong cơ thể lâu (vài ngày), bạn có thể uống bù ngay khi nhớ ra vì nồng độ thuốc chỉ tăng nhẹ, gần như không gây nguy hiểm. Ngược lại, nếu thuốc bị đào thải nhanh (chỉ vài giờ), việc uống bù có thể khiến nồng độ thuốc tăng đột ngột, nên cách an toàn hơn trong trường hợp này là bỏ qua liều đã quên và uống liều tiếp theo đúng giờ.
          </p>
          <p>
            Tuy nhiên, đây chỉ là nguyên tắc chung, vì mỗi loại thuốc và mỗi tình trạng sức khỏe sẽ khác nhau. Do đó, bạn vẫn nên hỏi bác sĩ hoặc dược sĩ trước khi tự quyết định để tránh rủi ro không đáng có.
          </p>

          <EditorialImage 
            src="/bai-4/hinh2.jpg" 
            alt="Uống thuốc bù hay nên bỏ qua?" 
          />

          <h2 className="font-display text-2xl sm:text-3xl font-bold text-slate-900 mt-12 mb-6 tracking-tight">
            Vậy, xử lý như thế nào khi quên uống thuốc?
          </h2>

          {/* Subsection 3.1 */}
          <h3 className="font-display text-xl font-bold text-slate-800 mt-8 mb-4">
            3.1. Quên uống thuốc huyết áp thì phải làm sao?
          </h3>
          <p>
            Phần lớn thuốc huyết áp phổ biến như amlodipine, losartan hay lisinopril có thời gian tác dụng khá dài, nên nếu lỡ quên một liều, bạn không cần quá lo lắng. Trường hợp bạn có <strong>lịch uống thuốc</strong> lúc 7h sáng nhưng đến 2h chiều mới nhớ ra, FamCare gợi ý bạn cách giải quyết như sau:
          </p>

          <SafeBox>
            <strong>Cách xử lý an toàn:</strong> Nếu vẫn còn xa thời điểm uống liều tiếp theo, bạn hãy uống ngay khi nhớ ra. Nếu đã gần tới giờ uống liều kế tiếp (còn khoảng 2-3 tiếng), bạn hãy bỏ qua liều đã quên, uống liều tiếp theo như bình thường.
          </SafeBox>

          <DangerBox>
            <strong>Tuyệt đối tránh:</strong> Không uống gấp đôi liều để “bù” lại liều đã quên. Điều này có thể khiến huyết áp tụt nhanh, gây chóng mặt hoặc té ngã.
          </DangerBox>

          {/* Subsection 3.2 */}
          <h3 className="font-display text-xl font-bold text-slate-800 mt-10 mb-4">
            3.2. Quên uống thuốc tránh thai (dạng viên uống hằng ngày) thì phải làm sao?
          </h3>
          <p>
            Thuốc tránh thai là một trong những loại thuốc <strong>phụ thuộc rất chặt vào việc uống đúng giờ</strong>, nên khi quên liều, bạn cần xử lý cẩn thận hơn so với nhiều loại thuốc khác. Với thuốc tránh thai kết hợp (loại phổ biến nhất), nếu bạn quên dưới 24 tiếng, hãy uống ngay khi nhớ ra, kể cả khi bạn phải uống 2 viên trong cùng ngày thì hiệu quả tránh thai vẫn được đảm bảo.
          </p>

          <InfoBox>
            Tuy nhiên, nếu quên quá 24 tiếng hoặc quên liên tiếp 2 ngày, bạn chỉ nên uống viên gần nhất, bỏ qua viên đã quên và <strong>cần dùng thêm biện pháp bảo vệ như bao cao su trong ít nhất 7 ngày</strong>. Trong trường hợp đã có quan hệ không bảo vệ gần đây, nên cân nhắc hỏi bác sĩ về thuốc tránh thai khẩn cấp.
          </InfoBox>

          <p>
            Với thuốc chỉ chứa progestin (mini-pill), nguyên tắc còn nghiêm ngặt hơn: bạn phải uống đúng trong khung giờ cố định mỗi ngày, và chỉ cần trễ quá 3 tiếng là đã cần dùng thêm biện pháp tránh thai bổ sung ngay. Đặc biệt, việc quên thuốc ở tuần đầu tiên của vỉ là rủi ro cao nhất vì cơ thể chưa được bảo vệ hoàn toàn. Do đó, lúc này, tốt nhất bạn nên kiểm tra kỹ hướng dẫn sử dụng hoặc tham khảo ý kiến bác sĩ để đảm bảo an toàn.
          </p>

          {/* Subsection 3.3 */}
          <h3 className="font-display text-xl font-bold text-slate-800 mt-10 mb-4">
            3.3. Quên tiêm Insulin thì phải làm sao?
          </h3>
          <p>
            Insulin và các thuốc điều trị tiểu đường là nhóm <strong>khó xử lý nhất khi quên liều</strong>, vì cách dùng phụ thuộc vào nhiều yếu tố như loại insulin, bữa ăn và mức đường huyết tại thời điểm đó. Nếu là insulin tác dụng nhanh (tiêm trước bữa ăn), bạn có thể tiêm ngay nếu vẫn đang ăn hoặc vừa ăn xong. Nhưng nếu đã qua 1-2 tiếng sau bữa ăn, <strong>không nên tiêm bù</strong> vì có thể gây hạ đường huyết nguy hiểm. Lúc này, cách an toàn hơn là kiểm tra đường huyết và theo dõi cơ thể.
          </p>

          <InfoBox>
            Với insulin tác dụng chậm (tiêm nền mỗi ngày), bạn có thể tiêm ngay khi nhớ ra nếu chưa quá gần thời điểm của liều kế tiếp, sau đó tiếp tục lịch tiêm như bình thường và tuyệt đối không tiêm gấp đôi.
          </InfoBox>

          <p>
            Điều quan trọng là nhiều người bệnh không chỉ quên mà còn <strong>không chắc mình đã tiêm hay chưa</strong>, dẫn đến xử lý sai như tiêm trùng liều hoặc bỏ liều không cần thiết. Vì vậy, việc ghi lại thời gian tiêm hoặc sử dụng công cụ nhắc nhở là rất cần thiết. Và cần nhớ rằng, với insulin, <strong>không nên tự ý điều chỉnh liều</strong> nếu chưa có hướng dẫn từ bác sĩ, vì mỗi quyết định đều ảnh hưởng trực tiếp đến mức đường huyết và an toàn của bạn.
          </p>

          {/* Subsection 3.4 */}
          <h3 className="font-display text-xl font-bold text-slate-800 mt-10 mb-4">
            3.4. Quên uống thuốc HIV thì phải làm sao?
          </h3>
          <p>
            Thuốc điều trị HIV (ARV) đòi hỏi mức độ tuân thủ rất cao, vì chỉ cần bỏ liều không đúng cách cũng có thể khiến virus hoạt động trở lại và tăng nguy cơ kháng thuốc. Nếu bạn nhớ ra sớm, khi vẫn còn cách xa thời điểm uống liều tiếp theo (khoảng trên 8 tiếng), hãy uống ngay liều đã quên rồi tiếp tục lịch uống như bình thường. Ngược lại, nếu đã gần tới giờ uống liều kế tiếp (khoảng dưới 4-6 tiếng), tốt nhất là <strong>bỏ qua liều đã quên và không uống gấp đôi</strong>, sau đó uống liều tiếp theo đúng giờ.
          </p>

          <InfoBox>
            Điều quan trọng là mỗi phác đồ điều trị HIV có thể có hướng dẫn riêng, nên bạn không nên tự ý xử lý theo cảm tính. Nếu lỡ quên thuốc, hãy theo dõi sát và trao đổi với bác sĩ để được hướng dẫn chính xác, đảm bảo hiệu quả điều trị lâu dài và an toàn cho sức khỏe.
          </InfoBox>

          {/* Subsection 3.5 */}
          <h3 className="font-display text-xl font-bold text-slate-800 mt-10 mb-4">
            3.5. Quên uống thuốc kháng sinh thì phải làm sao?
          </h3>
          <p>
            Kháng sinh cần được uống đều đặn để duy trì nồng độ ổn định trong cơ thể, giúp tiêu diệt vi khuẩn hiệu quả. Vì vậy, khi lỡ quên một liều, cách xử lý sẽ phụ thuộc vào thời điểm bạn nhớ ra. Nếu vẫn còn khá xa liều tiếp theo (hơn nửa khoảng cách giữa hai liều), bạn có thể uống ngay khi nhớ rồi tiếp tục lịch uống như bình thường. Nhưng nếu đã gần tới giờ uống liều kế tiếp, tốt nhất là <strong>bỏ qua liều đã quên và không uống gấp đôi</strong>, vì điều này không giúp tăng hiệu quả mà còn có thể gây tác dụng phụ.
          </p>

          <InfoBox>
            Một điều rất quan trọng là <strong>luôn uống đủ liệu trình kháng sinh</strong>, ngay cả khi bạn đã thấy khỏe hơn. Việc tự ý ngưng giữa chừng hoặc uống không đúng cách có thể khiến vi khuẩn chưa bị tiêu diệt hoàn toàn và làm tăng nguy cơ kháng kháng sinh về sau.
          </InfoBox>

          <h2 className="font-display text-2xl sm:text-3xl font-bold text-slate-900 mt-16 mb-8 tracking-tight">
            Làm thế nào để luôn uống thuốc đúng giờ, đúng cử?
          </h2>
          <p className="mb-10">
            Nghiên cứu của Brod et al. ghi nhận rằng khoảng một phần ba bệnh nhân đã chủ động áp dụng chiến lược nhắc nhở trực quan, ví dụ dán giấy ghi chú, đặt hộp thuốc bên cạnh bàn chải, hay di chuyển đồ vật để biết mình đã uống hay chưa. Nhưng những phương pháp thủ công này rất dễ thất bại. Do đó, chúng tôi gợi ý bạn thử các phương pháp sau:
          </p>

          {/* Grid Cards for steps */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
            
            <MethodCard 
              number="01" 
              title="Kết hợp với thói quen cố định" 
              desc="Đặt thuốc cạnh bàn chải đánh răng, cốc cà phê sáng, hoặc chìa khóa. Não bộ liên kết thói quen với kích hoạt (trigger) rất hiệu quả." 
            />
            <MethodCard 
              number="02" 
              title="Cài đặt nhắc nhở trên điện thoại" 
              desc="Báo thức lặp lại hàng ngày đúng giờ uống thuốc. Đặt tên báo thức cụ thể (ví dụ: 'Uống thuốc huyết áp') để tránh nhầm lẫn." 
            />
            <MethodCard 
              number="03" 
              title="Dùng hộp thuốc chia ngăn theo ngày/tuần" 
              desc="Cách đơn giản để kiểm tra ngay: 'Ngăn hôm nay còn thuốc không?' Nếu còn -> chưa uống. Nếu trống -> đã uống." 
            />
            <MethodCard 
              number="04" 
              title="Dùng ứng dụng quản lý thuốc thông minh" 
              desc="Nhắc nhở tự động, ghi lịch sử uống thuốc, cảnh báo khi sắp hết - giải pháp toàn diện nhất để không còn phụ thuộc vào trí nhớ." 
            />

          </div>

          <h2 className="font-display text-2xl sm:text-3xl font-bold text-slate-900 mt-12 mb-6 tracking-tight">
            Kết luận
          </h2>
          <p>
            <strong>Quên uống thuốc</strong> là một điều rất bình thường trong cuộc sống bận rộn. Điều quan trọng là chúng ta biết cách xử lý đúng đối với từng loại thuốc và xây dựng thói quen để giảm bớt tần suất quên. Tại FamCare cung cấp Tủ thuốc AI và Hồ sơ sức khỏe cá nhân - giúp bạn theo dõi <strong>lịch uống thuốc</strong>, nhận nhắc nhở đúng giờ, và quản lý toàn bộ thông tin y tế của cả gia đình trong một nơi duy nhất.
          </p>

        </article>

        {/* Call to Action */}
        <div className="mt-16 pt-12 border-t border-slate-100 flex flex-col justify-center items-center">
          <a
            href="https://famcare.site/app/scanner"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-cyan-600 hover:bg-cyan-700 text-white font-bold px-10 py-5 rounded-full hover:scale-105 hover:shadow-xl transition-all duration-300 uppercase tracking-widest text-sm"
          >
            Trải nghiệm ứng dụng FamCare ngay
            <ArrowRight size={18} />
          </a>
        </div>
      </main>

      {/* Minimal Footer */}
      <footer className="w-full max-w-4xl mx-auto px-6 pb-16 text-center text-slate-500 font-body text-sm space-y-4">
        <p className="font-semibold text-slate-700">Bài viết và hình ảnh được thực hiện bởi FamCare.</p>
        <p className="italic max-w-2xl mx-auto">
          Lưu ý: Bài viết này mang tính thông tin chung và không thay thế cho lời khuyên y tế chuyên nghiệp. Hãy luôn tham khảo bác sĩ hoặc dược sĩ về cách xử lý liều thuốc cụ thể của bạn.
        </p>
        <div className="w-16 h-px bg-slate-300 mx-auto my-6"></div>
        <p className="uppercase tracking-widest font-bold text-slate-800 text-xs">FamCare - Nền tảng y tế thông minh - Chăm sóc gia đình từ xa.</p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-6 mt-4">
          <a href="https://famcare.site/" className="hover:text-cyan-600 transition-colors">Website: https://famcare.site/</a>
          <span className="hidden sm:inline">&bull;</span>
          <a href="mailto:famcare.support@gmail.com" className="hover:text-cyan-600 transition-colors">Email: famcare.support@gmail.com</a>
        </div>
      </footer>

      <PublicFooter />
    </div>
  );
}

// ---- Reusable Custom UI Components for Article 4 ----

const EditorialImage = ({ src, alt }: { src: string, alt: string }) => (
  <figure className="my-10 mx-auto group">
    <div className="overflow-hidden rounded-2xl shadow-lg bg-slate-100 flex justify-center items-center relative">
      <img
        src={src}
        alt={alt}
        className="max-w-full h-auto object-cover transform transition-transform duration-500 group-hover:scale-[1.01]"
        loading="lazy"
      />
      <div className="absolute inset-0 ring-1 ring-inset ring-black/5 rounded-2xl pointer-events-none"></div>
    </div>
    <figcaption className="mt-4 text-center text-[0.95rem] font-body italic text-slate-500 px-4">
      {alt}
    </figcaption>
  </figure>
);

const SafeBox = ({ children }: { children: React.ReactNode }) => (
  <div className="my-6 bg-green-50 border-l-4 border-green-500 rounded-r-xl p-5 sm:p-6 text-green-900 shadow-sm flex items-start gap-4">
    <ShieldCheck className="text-green-500 shrink-0 mt-1" size={24} />
    <div className="text-[1.05rem] leading-relaxed">
      {children}
    </div>
  </div>
);

const DangerBox = ({ children }: { children: React.ReactNode }) => (
  <div className="my-6 bg-red-50 border-l-4 border-red-500 rounded-r-xl p-5 sm:p-6 text-red-900 shadow-sm flex items-start gap-4">
    <AlertTriangle className="text-red-500 shrink-0 mt-1" size={24} />
    <div className="text-[1.05rem] leading-relaxed">
      {children}
    </div>
  </div>
);

const InfoBox = ({ children }: { children: React.ReactNode }) => (
  <div className="my-6 bg-blue-50 border-l-4 border-blue-500 rounded-r-xl p-5 sm:p-6 text-blue-900 shadow-sm flex items-start gap-4">
    <Info className="text-blue-500 shrink-0 mt-1" size={24} />
    <div className="text-[1.05rem] leading-relaxed">
      {children}
    </div>
  </div>
);

const MethodCard = ({ number, title, desc }: { number: string, title: string, desc: string }) => (
  <div className="flex flex-col bg-white border border-slate-100 hover:border-cyan-200 rounded-2xl p-6 sm:p-8 shadow-sm hover:shadow-md transition-all duration-300 relative group overflow-hidden">
    {/* Decorative background element */}
    <div className="absolute -top-6 -right-6 w-24 h-24 bg-cyan-50 rounded-full group-hover:scale-150 transition-transform duration-500 opacity-50 z-0"></div>
    
    <div className="relative z-10 flex gap-4 sm:gap-6 items-start">
      <span className="text-4xl sm:text-5xl font-display font-black text-cyan-200 leading-none select-none shrink-0 group-hover:text-cyan-300 transition-colors">
        {number}
      </span>
      <div>
        <h4 className="font-display font-bold text-slate-800 text-xl mb-2">
          {title}
        </h4>
        <p className="text-slate-600 text-[1rem] leading-relaxed">
          {desc}
        </p>
      </div>
    </div>
  </div>
);