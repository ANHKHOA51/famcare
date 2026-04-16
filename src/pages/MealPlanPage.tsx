import { useState, useEffect } from "react";
import { Search, ShoppingBag, Clock, Flame, Star, ChevronRight, Bookmark, ArrowLeft, Loader2, Sparkles, Utensils } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";

interface Meal {
  id: string;
  name: string;
  time: string;
  calories: string;
  difficulty: string;
  tags: string[];
  description: string;
  ingredients: { name: string; amount: string; }[];
  steps: { title: string; desc: string; }[];
  nutritionNotes: { title: string; desc: string; }[];
}

const mockMeals: Meal[] = [
  {
    id: "1",
    name: "Cá hồi hấp xì dầu & Gừng",
    time: "25 phút",
    calories: "320 kcal",
    difficulty: "Dễ",
    tags: ["Ít muối", "Tốt cho người bị Gout"],
    description: "Món ăn thanh đạm, giữ trọn vị ngọt tự nhiên của cá hồi, kết hợp với gừng ấm nóng giúp cân bằng vị giác và hỗ trợ tiêu hóa.",
    ingredients: [
      { name: "Cá hồi tươi", amount: "200g" },
      { name: "Xì dầu (ít muối)", amount: "20ml" },
      { name: "Gừng tươi", amount: "15g" },
      { name: "Hành lá", amount: "10g" }
    ],
    steps: [
      { title: "Sơ chế", desc: "Cá hồi rửa sạch, thấm khô bằng giấy bếp. Gừng gọt vỏ thái sợi. Hành lá cắt khúc 4-5cm." },
      { title: "Ướp gia vị", desc: "Xếp cá vào đĩa sâu lòng, rắc gừng sợi lên mặt cá. Rưới xì dầu." },
      { title: "Hấp cách thủy", desc: "Đun sôi nước trong xửng hấp, cho cá vào hấp lửa vừa khoảng 10-12 phút." }
    ],
    nutritionNotes: [
      { title: "GIÀU OMEGA-3", desc: "Hỗ trợ sức khỏe tim mạch và giảm viêm, cực kỳ tốt cho hệ thần kinh của người cao tuổi." },
      { title: "KIỂM SOÁT NATRI", desc: "Sử dụng xì dầu giảm muối giúp kiểm soát huyết áp." }
    ]
  },
  {
    id: "2",
    name: "Rau củ luộc thập cẩm & Muối vừng",
    time: "15 phút",
    calories: "150 kcal",
    difficulty: "Dễ",
    tags: ["Nhiều chất xơ", "Tốt cho người bị Gout"],
    description: "Nguồn vitamin dồi dào từ súp lơ, cà rốt và đậu bắp giúp thanh lọc cơ thể.",
    ingredients: [],
    steps: [],
    nutritionNotes: []
  }
];

export default function MealPlanPage() {
  const [selectedMeal, setSelectedMeal] = useState<Meal | null>(null);
  const [activeTab, setActiveTab] = useState("all");
  
  // Real Data States
  const [diagnosis, setDiagnosis] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedMeals, setGeneratedMeals] = useState<Meal[]>([]);
  const [generalAdvice, setGeneralAdvice] = useState<string[]>([]);
  const [aiTitle, setAiTitle] = useState("Gợi ý thực đơn hôm nay");
  const { token } = useAuth();

  const handleGenerate = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!diagnosis.trim()) {
      toast.error("Vui lòng nhập tình trạng bệnh lý");
      return;
    }

    setIsGenerating(true);
    setGeneratedMeals([]);
    setGeneralAdvice([]);
    
    try {
      const resp = await fetch("/api/generate-meal-plan", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Bug #2: send auth token so server can authenticate
          ...(token ? { Authorization: `Bearer ${token}` } : {})
        },
        body: JSON.stringify({ diagnosis })
      });
      
      const data = await resp.json();
      if (!resp.ok) {
        toast.error(data.error || "Có lỗi xảy ra khi tạo thực đơn");
        return;
      }

      setGeneralAdvice(data.general_dietary_advice || []);
      setAiTitle(`Gợi ý thực đơn cho hồ sơ bệnh lý: ${diagnosis}`);
      
      // Bug #3: use optional chaining — AI might return unexpected structure
      const todayMeals = data.meal_plan?.[0]?.meals ?? [];
      if (todayMeals.length > 0) {
        const mappedMeals: Meal[] = todayMeals.map((m: any, idx: number) => ({
          // Bug #12: use String() to avoid accidental string concat producing bad keys
          id: `${String(m.food_id ?? 'meal')}-${idx}`,
          name: m.name || m.type || 'Món ăn',
          time: "20 phút",
          calories: m.macros?.calories ? `${m.macros.calories} kcal` : "N/A",
          difficulty: "Vừa",
          tags: [m.type, "Khuyên dùng"].filter(Boolean),
          description: m.reason || m.benefits || "",
          ingredients: [],
          steps: [],
          nutritionNotes: data.general_dietary_advice?.map((adv: string) => ({ title: "Lưu ý AI", desc: adv })) || []
        }));
        setGeneratedMeals(mappedMeals);
      }
    } catch {
      toast.error("Lỗi kết nối đến server AI");
    } finally {
      setIsGenerating(false);
    }
  };

  // Pass 3 Fix #7: filter meals by activeTab — previously activeTab state was set but never used for filtering
  const TAB_KEYWORD_MAP: Record<string, string> = {
    man: "mặn",
    canh: "canh",
    trangmieng: "tráng"
  };
  const allMeals = generatedMeals.length > 0 ? generatedMeals : mockMeals;
  const displayMeals = activeTab === "all"
    ? allMeals
    : allMeals.filter(m =>
        m.tags.some(tag =>
          tag.toLowerCase().includes(TAB_KEYWORD_MAP[activeTab] ?? "")
        )
      );

  const renderDetail = (meal: Meal) => (
    <div className="p-6 md:p-10 max-w-7xl mx-auto space-y-8 animate-fade-in relative container-fluid bg-[#f8fafc]">
      <div className="flex items-center gap-2 text-[0.625rem] font-bold tracking-widest uppercase text-slate-500 mb-4">
        <button onClick={() => setSelectedMeal(null)} className="hover:text-blue-600 transition-colors">Trang chủ</button>
        <ChevronRight size={12} />
        <button onClick={() => setSelectedMeal(null)} className="hover:text-blue-600 transition-colors">Thực đơn dinh dưỡng AI</button>
        <ChevronRight size={12} />
        <span className="text-slate-800">{meal.name}</span>
      </div>

      <div className="grid lg:grid-cols-12 gap-8 items-start">
        {/* Left Column */}
        <div className="lg:col-span-8 space-y-6">
          <div className="relative rounded-[2.5rem] overflow-hidden bg-slate-900 aspect-[16/9] md:aspect-[21/9]">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-slate-800 to-emerald-900"></div>
            <div className="absolute inset-0 opacity-10 flex items-center justify-center">
               <Utensils size={180} />
            </div>
            <div className="absolute bottom-10 left-10 right-10">
              <div className="flex gap-2 mb-4">
                {meal.tags.map((t, i) => (
                   <span key={i} className="bg-blue-500/20 text-blue-100 border border-blue-400/30 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">{t}</span>
                ))}
              </div>
              <h1 className="text-3xl md:text-5xl font-display font-bold text-white mb-3 tracking-tight">{meal.name}</h1>
              <p className="text-slate-300 md:text-lg max-w-2xl line-clamp-2">{meal.description}</p>
            </div>
            <button onClick={() => setSelectedMeal(null)} className="absolute top-6 left-6 bg-white/20 hover:bg-white/30 backdrop-blur-md text-white p-3 rounded-full transition-colors">
               <ArrowLeft size={20} />
            </button>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="bg-white rounded-[2rem] p-4 flex items-center justify-center gap-3 shadow-sm border border-slate-100">
              <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center"><Clock size={18} /></div>
              <div><p className="text-[0.625rem] font-bold text-slate-500 uppercase tracking-widest">Thời gian</p><p className="font-bold text-slate-800">{meal.time}</p></div>
            </div>
            <div className="bg-white rounded-[2rem] p-4 flex items-center justify-center gap-3 shadow-sm border border-slate-100">
              <div className="w-10 h-10 rounded-full bg-orange-50 text-orange-600 flex items-center justify-center"><Flame size={18} /></div>
              <div><p className="text-[0.625rem] font-bold text-slate-500 uppercase tracking-widest">Năng lượng</p><p className="font-bold text-slate-800">{meal.calories}</p></div>
            </div>
            <div className="bg-white rounded-[2rem] p-4 flex items-center justify-center gap-3 shadow-sm border border-slate-100">
              <div className="w-10 h-10 rounded-full bg-green-50 text-green-600 flex items-center justify-center"><Star size={18} /></div>
              <div><p className="text-[0.625rem] font-bold text-slate-500 uppercase tracking-widest">Độ khó</p><p className="font-bold text-slate-800">{meal.difficulty}</p></div>
            </div>
          </div>

          <div className="bg-[#e0f2fe] rounded-[2rem] p-8 shadow-sm border border-blue-100">
            <h3 className="text-lg font-bold text-[#0f172a] mb-6 flex items-center gap-2">Các bước thực hiện</h3>
            <div className="space-y-6 relative before:absolute before:inset-0 before:left-[17px] before:h-full before:w-[2px] before:bg-blue-200">
              {meal.steps.map((step, idx) => (
                <div key={idx} className="relative flex items-start group">
                  <div className="flex items-center justify-center w-9 h-9 rounded-full bg-[#0f172a] text-white font-bold shrink-0 shadow-sm z-10 text-sm">
                    {idx + 1}
                  </div>
                  <div className="ml-6 pt-1">
                    <h4 className="font-bold text-slate-800 text-sm mb-1">{step.title}</h4>
                    <p className="text-slate-600 text-sm leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="lg:col-span-4 space-y-6 sticky top-24">
          <div className="bg-[#f0f9ff] rounded-[2.5rem] p-8 border border-blue-100">
            <h3 className="font-bold text-slate-800 flex items-center gap-2 mb-6">Nguyên liệu</h3>
            <ul className="space-y-4 mb-8">
              {meal.ingredients.map((ing, i) => (
                <li key={i} className="flex justify-between text-sm font-medium border-b border-blue-200/50 pb-3">
                  <span className="text-slate-700">{ing.name}</span>
                  <span className="text-slate-900 font-bold">{ing.amount}</span>
                </li>
              ))}
            </ul>
            <button className="w-full bg-[#60a5fa] hover:bg-[#3b82f6] text-white font-semibold py-3.5 rounded-2xl transition-colors shadow-sm flex items-center justify-center gap-2 text-sm">
              <ShoppingBag size={18} /> Thêm vào giỏ hàng
            </button>
          </div>

          <div className="bg-[#f0fdf4] rounded-[2.5rem] p-8 border border-green-100">
            <h3 className="font-bold text-green-900 flex items-center gap-2 mb-6">Ghi chú dinh dưỡng</h3>
            <div className="space-y-4">
              {meal.nutritionNotes.map((note, i) => (
                <div key={i} className="bg-white/60 p-4 rounded-2xl">
                  <h4 className="text-[0.6875rem] font-bold text-green-700 uppercase tracking-wider mb-1">{note.title}</h4>
                  <p className="text-sm text-green-900 leading-relaxed">{note.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <button className="w-full bg-[#0f172a] hover:bg-slate-800 text-white font-semibold py-4 rounded-2xl transition-colors shadow-lg flex items-center justify-center gap-2 text-sm">
             <Bookmark size={18} /> Lưu công thức vào hồ sơ
          </button>
        </div>
      </div>
    </div>
  );

  return selectedMeal ? renderDetail(selectedMeal) : (
    <div className="p-6 md:p-10 max-w-7xl mx-auto space-y-8 animate-fade-in relative container-fluid bg-[#f8fafc]">
      <form onSubmit={handleGenerate} className="relative w-full">
        <button type="submit" className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-500 hover:text-blue-700 disabled:opacity-50" disabled={isGenerating}>
          {isGenerating ? <Loader2 className="animate-spin" size={18} /> : <Sparkles size={18} />}
        </button>
        <input 
          type="text" 
          value={diagnosis}
          onChange={e => setDiagnosis(e.target.value)}
          placeholder="Nhập bệnh lý để AI tạo Menu (VD: Tiểu đường, Gout, Viêm dạ dày...)" 
          className="w-full bg-white border border-blue-100 shadow-sm rounded-full py-4 pl-12 pr-4 lg:text-base text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all font-medium text-slate-700"
          disabled={isGenerating}
        />
      </form>

      <div className="grid lg:grid-cols-12 gap-10 items-start">
        {/* Left Col */}
        <div className="lg:col-span-8 space-y-8">
          <div className="bg-gradient-to-br from-[#3b82f6] to-[#2563eb] rounded-[2.5rem] p-8 md:p-10 text-white shadow-lg shadow-blue-500/20 relative overflow-hidden">
            <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none">
              <svg width="200" height="200" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
            </div>
            <div className="flex items-center gap-3 mb-6 relative z-10">
              <span className="bg-white text-blue-600 font-bold text-[0.625rem] px-3 py-1.5 rounded-full uppercase tracking-wider">Khuyến nghị AI</span>
              <span className="text-xs text-blue-100 font-medium">Hôm nay</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-display font-bold mb-4 leading-[1.1] tracking-tight relative z-10">
              {generatedMeals.length > 0 ? aiTitle : "Gợi ý thực đơn cho Bố dựa trên hồ sơ bệnh lý Cao huyết áp & Gout"}
            </h1>
            <p className="text-blue-100 md:text-lg max-w-xl relative z-10">
              {generatedMeals.length > 0 
                ? (generalAdvice[0] || "Chọn menu dưới để xem chi tiết dinh dưỡng.")
                : "Chế độ ăn kiêng Purin thấp và kiểm soát Natri giúp ổn định chỉ số Axit Uric."}
            </p>
          </div>

          <div>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
              <h2 className="text-xl font-display font-bold text-slate-800">Thực đơn trưa hôm nay</h2>
              <div className="flex gap-2 text-sm overflow-x-auto hide-scroll pb-2 md:pb-0">
                {/* Bug #9: tab filter now functional with activeTab state */}
                {["Tất cả", "Món mặn", "Món canh", "Tráng miệng"].map((tab, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveTab(["all", "man", "canh", "trangmieng"][i])}
                    className={`px-4 py-2 rounded-full whitespace-nowrap font-semibold transition-colors ${
                      activeTab === ["all", "man", "canh", "trangmieng"][i]
                        ? "bg-[#38bdf8] text-white"
                        : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {isGenerating ? (
                <div className="md:col-span-2 flex flex-col items-center justify-center py-20 text-center border-2 border-dashed border-blue-100 rounded-3xl bg-blue-50/50">
                   <Loader2 className="animate-spin text-blue-400 mb-4" size={32} />
                   <p className="text-blue-600 font-medium animate-pulse">AI đang phân tích và lên thực đơn an toàn...</p>
                </div>
              ) : (
                displayMeals.map((meal) => (
                  <div key={meal.id} className="bg-white border border-slate-100 rounded-[2rem] overflow-hidden group hover:shadow-md transition-shadow">
                    <div className="aspect-[4/3] bg-gradient-to-br from-indigo-100 to-blue-50 relative overflow-hidden flex items-center justify-center text-blue-200">
                      <Utensils size={80} className="group-hover:scale-110 group-hover:rotate-6 transition-all duration-500" />
                      <div className="absolute top-4 left-4 flex gap-2">
                         {meal.tags.map((t, i) => (
                           <span key={i} className="bg-blue-500/80 text-white backdrop-blur-sm px-2.5 py-1 rounded text-[0.625rem] font-bold uppercase tracking-wider">{t}</span>
                         ))}
                      </div>
                    </div>
                    <div className="p-6 h-full flex flex-col">
                      <h3 className="font-bold text-lg text-slate-800 mb-2">{meal.name}</h3>
                      <p className="text-sm text-slate-500 line-clamp-3 mb-4 leading-relaxed flex-grow">{meal.description}</p>
                      <div className="flex items-center justify-between mt-auto">
                        <div className="flex items-center gap-4 text-xs font-semibold text-slate-500">
                          <span className="flex items-center gap-1.5"><Clock size={14} className="text-slate-400"/> {meal.time}</span>
                          <span className="flex items-center gap-1.5"><Flame size={14} className="text-orange-400"/> {meal.calories}</span>
                        </div>
                        <button onClick={() => setSelectedMeal(meal)} className="text-[#0ea5e9] font-bold text-sm hover:text-blue-700 transition-colors flex items-center gap-1">
                          Chi tiết <ChevronRight size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Right Col */}
        <div className="lg:col-span-4 space-y-8 sticky top-24">
          <div className="bg-[#e0f2fe]/50 border border-blue-100 rounded-[2.5rem] p-6 lg:p-8">
            <h3 className="font-bold text-slate-800 flex items-center justify-between mb-6">
              Giỏ hàng thông minh <ShoppingBag size={20} className="text-blue-600" />
            </h3>
            <div className="space-y-4 mb-8">
              {[
                { n: "Dầu thực vật", p: "250ml • Co.op Mart", pr: "55k" },
                { n: "Súp lơ xanh organic", p: "500g • WinMart", pr: "32k" },
                { n: "Bí đỏ hồ lô", p: "1 quả • Chợ truyền thống", pr: "25k" }
              ].map((item, i) => (
                <div key={i} className="flex justify-between items-center bg-white p-3 rounded-2xl shadow-sm border border-slate-50">
                   <div className="flex items-center gap-3">
                     <div className="w-10 h-10 bg-slate-100 rounded-xl"></div>
                     <div>
                       <p className="font-bold text-sm text-slate-800 leading-tight">{item.n}</p>
                       <p className="text-[0.6875rem] text-blue-600 font-medium">{item.p}</p>
                     </div>
                   </div>
                   <span className="font-bold text-slate-700 text-sm shrink-0">{item.pr}</span>
                </div>
              ))}
            </div>
            <div className="flex justify-between items-end mb-4 border-t border-blue-200/50 pt-4">
              <span className="text-blue-600 font-medium text-sm">Tổng cộng<br/>ước tính</span>
              <span className="text-xl font-bold text-slate-800">112.000đ</span>
            </div>
            <button className="w-full bg-[#38bdf8] hover:bg-[#0284c7] text-white font-semibold py-3.5 rounded-2xl transition-colors shadow-sm flex items-center justify-center gap-2 text-sm">
              <Search size={16} /> Đặt mua ngay
            </button>
          </div>

          <div className="bg-[#ffedd5]/50 border border-orange-100 rounded-[2.5rem] p-6 lg:p-8">
            <h3 className="font-bold text-slate-800 mb-6">Chỉ số cần chú ý</h3>
            <div className="space-y-5 mb-6">
              <div>
                <div className="flex justify-between text-sm mb-2 font-semibold text-slate-700">
                  <span>Axit Uric</span>
                  <span className="text-teal-600">tốt</span>
                </div>
                <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                   <div className="h-full bg-teal-500 w-[40%] rounded-full"></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-2 font-semibold text-slate-700">
                  <span>Huyết áp</span>
                  <span className="text-amber-600">128/85 mmHg</span>
                </div>
                <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                   <div className="h-full bg-amber-500 w-[65%] rounded-full"></div>
                </div>
              </div>
            </div>
            <p className="text-[0.8rem] text-slate-600 italic leading-relaxed text-center">
              Thực đơn hôm nay tập trung hạ 0.5mg/dL Axit Uric trong tuần này.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
