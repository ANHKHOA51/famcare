import React, { useEffect, useState } from 'react';
import PublicNavbar from "@/components/PublicNavbar";
import PublicFooter from "@/components/PublicFooter";
import { List, ArrowRight, ShieldCheck, AlertTriangle, Info } from "lucide-react";
import { Link } from "react-router-dom";

const tocItems = [
  { id: "gioi-thieu", text: "Giới thiệu về bài viết", level: 2 },
  { id: "loi-ich", text: "Lợi ích của việc chăm sóc sức khỏe", level: 2 },
  { id: "phuong-phap", text: "Phương pháp chăm sóc sức khỏe", level: 2 },
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

export default function Article5Page() {
  useEffect(() => {
    document.title = "Lợi ích và phương pháp chăm sóc sức khỏe toàn diện";
    fetch('/api/articles/loi-ich-va-phuong-phap-cham-soc-suc-khoe/view', { method: 'POST' })
      .catch(err => console.error("Failed to track view:", err));
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 selection:bg-cyan-200 selection:text-cyan-900 font-body pb-10">
      <PublicNavbar />

      <header className="bg-slate-900 pt-16 pb-12 sm:pt-20 sm:pb-16 relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-8 relative z-10">
          <div className="inline-block font-body text-xs font-semibold tracking-[0.2em] uppercase text-cyan-400 border border-cyan-400/50 px-3.5 py-1.5 mb-6 rounded-sm">
            Kiến thức Y khoa
          </div>
          <h1 className="font-display text-3xl sm:text-5xl lg:text-[3.2rem] font-black text-cyan-50 leading-[1.2] mb-5 tracking-tight">
            Lợi ích và phương pháp chăm sóc sức khỏe toàn diện
          </h1>
          <p className="text-justify text-[13px] text-slate-400 tracking-wide uppercase font-sans">
            Bài viết cung cấp thông tin về lợi ích và các phương pháp chăm sóc sức khỏe toàn diện, giúp bạn và gia đình luôn khỏe mạnh.
          </p>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-800 via-cyan-500 to-blue-700 h-1 opacity-90"></div>
      </header>

      <main className="px-4 sm:px-8 lg:px-16 py-10 max-w-[860px] mx-auto text-[1.125rem] text-slate-800 leading-[1.85] font-light">
        <SectionHeading number="01" id="gioi-thieu" title="Giới thiệu về bài viết" />
        <p className="text-justify mb-5">
          Chăm sóc sức khỏe toàn diện không chỉ giúp bạn phòng tránh bệnh tật mà còn nâng cao chất lượng cuộc sống. Bài viết này sẽ giúp bạn hiểu rõ hơn về lợi ích và các phương pháp chăm sóc sức khỏe hiệu quả.
        </p>

        <SectionHeading number="02" id="loi-ich" title="Lợi ích của việc chăm sóc sức khỏe" />
        <p className="text-justify mb-5">
          Việc chăm sóc sức khỏe toàn diện mang lại nhiều lợi ích như cải thiện sức khỏe thể chất, tinh thần, và tăng cường tuổi thọ. Ngoài ra, nó còn giúp bạn giảm nguy cơ mắc các bệnh mãn tính.
        </p>

        <SectionHeading number="03" id="phuong-phap" title="Phương pháp chăm sóc sức khỏe" />
        <p className="text-justify mb-5">
          Một số phương pháp chăm sóc sức khỏe hiệu quả bao gồm duy trì chế độ ăn uống lành mạnh, tập thể dục thường xuyên, kiểm tra sức khỏe định kỳ, và quản lý căng thẳng.
        </p>

        <SectionHeading number="04" id="ket-luan" title="Kết luận" />
        <p className="text-justify mb-5">
          Chăm sóc sức khỏe toàn diện là một hành trình dài hạn, đòi hỏi sự kiên trì và nỗ lực. Hãy bắt đầu từ những thay đổi nhỏ trong lối sống để đạt được sức khỏe tốt nhất.
        </p>
      </main>

      <PublicFooter />
    </div>
  );
}