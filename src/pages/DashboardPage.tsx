import { useState, useEffect } from "react";
import { Search, AlertTriangle, CheckCircle2, Clock, Info, User, ChevronRight, Activity, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";

export default function DashboardPage() {
  const { token } = useAuth();
  const [profileName, setProfileName] = useState("Lan Anh");
  const [members, setMembers] = useState<any[]>([]);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch('/api/auth/profile', { headers: { 'Authorization': `Bearer ${token}` } });
        const data = await res.json();
        if (res.ok) {
          const names = data.name ? data.name.split(" ") : [];
          setProfileName(names.length > 0 ? names[names.length - 1] : "bạn");
          const owned = data.ownedMembers || [];
          const linked = (data.linkedMembers || []).map((m: any) => ({
            ...m,
            name: m.user?.name || m.user?.email || 'Người dùng',
            relationship: 'Liên kết',
            isLinked: true
          }));
          setMembers([...owned, ...linked]);
        }
      } catch (e) {}
    };
    if (token) fetchProfile();
  }, [token]);

  const getBmiData = (w?: number, h?: number) => {
    if (!w || !h) return { value: 0, label: "Chưa có", cls: "bg-slate-500", text: "text-slate-600", percent: 0 };
    const heightM = h > 3 ? h / 100 : h;
    const bmi = +(w / (heightM * heightM)).toFixed(1);
    if (bmi < 18.5) return { value: bmi, label: "Thiếu cân", cls: "bg-blue-500", text: "text-blue-600", percent: 30 };
    if (bmi < 25) return { value: bmi, label: "Bình thường", cls: "bg-green-500", text: "text-green-600", percent: 50 };
    if (bmi < 30) return { value: bmi, label: "Thừa cân", cls: "bg-amber-500", text: "text-amber-600", percent: 75 };
    return { value: bmi, label: "Béo phì", cls: "bg-red-500", text: "text-red-600", percent: 90 };
  };

  return (
    <div className="p-8 lg:p-10 max-w-7xl mx-auto space-y-10 bg-[#f8fafc]">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h1 className="text-2xl font-display font-bold text-slate-800">
          Chào {profileName}, hôm nay gia đình thế nào?
        </h1>
        <div className="relative w-full md:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder="Tìm kiếm hồ sơ, thuốc..." 
            className="w-full bg-slate-200/50 border-none rounded-full py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/50 transition-all text-slate-600"
          />
        </div>
      </div>

      {/* Family Health Status */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-display font-bold text-teal-500">Tình trạng sức khỏe gia đình</h2>
          <span className="text-xs font-bold text-teal-600 bg-teal-50 px-3 py-1 rounded-full">Tháng 10, 2026</span>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6">
          {members.slice(0, 3).map((m: any, idx: number) => {
            const hasIssue = m.chronicIllness || m.allergies;
            return (
              <div key={m.id || idx} className="bg-white rounded-[2rem] p-6 shadow-sm border border-slate-100/50 flex flex-col h-full">
                <div className="flex justify-between items-start mb-4">
                  <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
                    <User size={24} />
                  </div>
                  <span className={`text-[0.625rem] font-bold px-3 py-1 rounded-full uppercase tracking-wider ${hasIssue ? 'text-amber-600 bg-amber-50' : 'text-blue-600 bg-blue-50'}`}>
                    {hasIssue ? "Cần lưu ý" : "Bình thường"}
                  </span>
                </div>
                <h3 className="font-bold text-slate-800">{m.relationship} ({m.name})</h3>
                <p className="text-sm text-slate-500 mb-6 flex-1">{m.chronicIllness || m.allergies ? `Lưu ý: ${m.chronicIllness || ''} ${m.allergies || ''}` : "Sức khỏe ổn định"}</p>
                <div className={`flex items-center gap-2 text-xs font-medium w-fit px-3 py-1.5 rounded-lg ${hasIssue ? 'text-amber-600 bg-amber-50' : 'text-blue-600 bg-blue-50'}`}>
                  {hasIssue ? <AlertTriangle size={14} /> : <CheckCircle2 size={14} />} {hasIssue ? "Cần theo dõi" : "Phát triển tốt"}
                </div>
              </div>
            );
          })}
          {members.length === 0 && (
            <p className="text-sm text-slate-500 italic col-span-3">Đang tải dữ liệu gia đình...</p>
          )}
        </div>
      </section>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* BMI Column (Col Span 2) */}
        <section className="lg:col-span-2 space-y-4">
          <h2 className="text-xl font-display font-bold text-slate-800">Chỉ số BMI & Theo dõi</h2>
          <div className="bg-white rounded-[2rem] p-6 lg:p-8 shadow-sm border border-slate-100/50">
            <div className="grid sm:grid-cols-3 gap-6 mb-8">
              {members.slice(0, 3).map((m: any, idx: number) => {
                const bmiData = getBmiData(m.weight, m.height);
                return (
                  <div key={m.id || idx} className={idx > 0 ? "sm:border-l sm:border-slate-100 sm:pl-6" : ""}>
                    <p className="text-sm text-slate-500 mb-1">{m.relationship} ({m.name})</p>
                    <p className={`text-3xl font-display font-bold mb-3 ${bmiData.text}`}>
                      {bmiData.value > 0 ? bmiData.value : "--"}
                    </p>
                    <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden mb-2">
                      <div className={`h-full ${bmiData.cls} rounded-full transition-all`} style={{ width: `${bmiData.percent}%` }}></div>
                    </div>
                    <p className="text-[0.625rem] text-slate-400 font-medium">{bmiData.label}</p>
                  </div>
                );
              })}
              {members.length === 0 && <p className="text-sm text-slate-400">Vui lòng cập nhật thông tin BMI trong Hồ sơ.</p>}
            </div>
            
            <button className="w-full bg-[#0ea5e9] hover:bg-[#0284c7] text-white font-semibold flex items-center justify-center gap-2 py-3.5 rounded-xl transition-colors text-sm">
              Cập nhật chỉ số hôm nay
            </button>
          </div>
        </section>

        {/* Calendar Column */}
        <section className="space-y-4">
          <h2 className="text-xl font-display font-bold text-slate-800">Lịch khám sắp tới</h2>
          <div className="bg-white rounded-[2rem] p-6 lg:p-8 shadow-sm border border-slate-100/50">
            <div className="space-y-6 mb-8">
              {/* Event 1 */}
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-2xl bg-blue-50 flex flex-col items-center justify-center text-blue-600 flex-shrink-0">
                  <span className="text-[0.625rem] font-bold uppercase">T10</span>
                  <span className="text-lg font-bold leading-none">25</span>
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-1">
                    <h4 className="font-bold text-sm text-slate-800">Khám nội tổng quát</h4>
                    <span className="text-[0.625rem] font-medium text-blue-500 bg-blue-50 px-2 py-0.5 rounded">08:30 AM</span>
                  </div>
                  <p className="text-[0.8rem] text-slate-500 line-clamp-1">Bệnh viện Vinmec - Ba Nam</p>
                </div>
              </div>
              
              {/* Event 2 */}
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-2xl bg-slate-100 flex flex-col items-center justify-center text-slate-600 flex-shrink-0">
                  <span className="text-[0.625rem] font-bold uppercase">T10</span>
                  <span className="text-lg font-bold leading-none">28</span>
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-1">
                    <h4 className="font-bold text-sm text-slate-800">Kiểm tra đường huyết</h4>
                    <span className="text-[0.625rem] font-medium text-slate-500">14:15 PM</span>
                  </div>
                  <p className="text-[0.8rem] text-slate-500 line-clamp-1">Phòng khám Đa khoa - Mẹ Vân</p>
                </div>
              </div>
            </div>

            <button className="w-full bg-white border border-slate-200 hover:bg-slate-50 text-blue-600 font-semibold py-3 rounded-xl transition-colors text-sm">
              Xem toàn bộ lịch
            </button>
          </div>
        </section>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <section className="lg:col-span-2 space-y-4">
          <h2 className="text-xl font-display font-bold text-slate-800">Bệnh lý & Giai đoạn</h2>
          <div className="bg-white rounded-[2rem] p-6 lg:p-8 shadow-sm border border-slate-100/50 space-y-8">
            <div>
              <div className="flex justify-between items-center text-sm mb-2">
                <span className="font-bold text-slate-800">Huyết áp (Ba Nam)</span>
                <span className="text-slate-500 text-xs">Giai đoạn 1</span>
              </div>
              <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden mb-3">
                <div className="h-full bg-blue-600 w-[30%] rounded-full"></div>
              </div>
              <p className="text-xs text-slate-500">Lưu ý: Chỉ số đang có xu hướng giảm nhẹ, duy trì lối sống hiện tại.</p>
            </div>
            
            <div>
              <div className="flex justify-between items-center text-sm mb-2">
                <span className="font-bold text-slate-800">Tiền tiểu đường (Mẹ Vân)</span>
                <span className="text-amber-600 font-bold text-xs uppercase tracking-wider">Cảnh báo</span>
              </div>
              <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden mb-3">
                <div className="h-full bg-amber-600 w-[65%] rounded-full"></div>
              </div>
              <p className="text-xs text-slate-500">Lưu ý: Cần kiểm soát chặt chẽ lượng tinh bột trong 2 tuần tới.</p>
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-display font-bold text-slate-800">Thực phẩm</h2>
          <div className="bg-[#bfdbfe] rounded-[2rem] p-6 lg:p-8 shadow-sm relative overflow-hidden h-[calc(100%-40px)]">
            <div className="absolute inset-0 right-0 top-1/2 -bottom-10 opacity-30 pointer-events-none" 
                 style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&q=80&w=800)', backgroundSize: 'cover', backgroundPosition: 'bottom right' }}>
            </div>
            <div className="relative z-10 flex flex-col h-full">
              <div className="space-y-4 flex-1">
                <div className="flex items-center gap-2 text-[#1e3a8a] font-bold text-sm">
                  <Utensils size={16} /> Chế độ ăn
                </div>
                
                <ul className="space-y-3">
                  <li className="flex items-start gap-2 text-sm text-[#1e3a8a]">
                    <div className="mt-1 w-4 h-4 rounded-full bg-blue-500 flex items-center justify-center text-white flex-shrink-0"><Plus size={10} /></div>
                    <span className="font-medium">Bổ sung Omega-3 <span className="block text-xs font-normal text-blue-800 tracking-wide">Cá hồi, các loại hạt (Bố)</span></span>
                  </li>
                  <li className="flex items-start gap-2 text-sm text-[#1e3a8a]">
                    <div className="mt-1 w-4 h-4 rounded-full bg-red-500 flex items-center justify-center text-white flex-shrink-0"><Minus size={10} /></div>
                    <span className="font-medium">Kiêng đường tinh luyện <span className="block text-xs font-normal text-blue-800 tracking-wide">Bánh kẹo, nước ngọt (Mẹ)</span></span>
                  </li>
                </ul>
              </div>

              <div className="mt-8 pt-4 border-t border-blue-300/30">
                <button className="text-sm font-bold text-[#1e3a8a] hover:text-blue-900 transition-colors flex items-center gap-1">
                  Xem thực đơn chi tiết <ChevronRight size={16} />
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>

      <section className="space-y-4">
        <h2 className="text-xl font-display font-bold text-slate-800">Lịch sử hoạt động</h2>
        <div className="bg-white rounded-[2rem] p-6 lg:p-8 shadow-sm border border-slate-100/50">
          <div className="space-y-8 relative before:absolute before:inset-0 before:ml-12 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-slate-200 before:to-transparent">
            
            {/* Timeline item */}
            <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
              <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white bg-blue-500 text-slate-50 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 absolute left-4 md:left-1/2 -mt-5 md:mt-0"></div>
              <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] ml-[4rem] md:ml-0 p-4 rounded-2xl bg-slate-50 border border-slate-100 flex gap-4 items-center">
                <div className="w-16 flex-shrink-0 text-center">
                   <p className="text-sm font-bold text-blue-600">Hôm nay</p>
                </div>
                <div>
                   <p className="text-sm font-medium text-slate-800">Ba Nam đã uống thuốc Amlodipin 5mg</p>
                   <p className="text-xs text-slate-500 mt-0.5">Ghi nhận lúc: 08:00 AM kèm nước lọc</p>
                </div>
              </div>
            </div>

            {/* Timeline item */}
            <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
              <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white bg-slate-200 text-slate-50 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 absolute left-4 md:left-1/2 -mt-5 md:mt-0"></div>
              <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] ml-[4rem] md:ml-0 p-4 rounded-2xl bg-white border border-slate-100 flex gap-4 items-center">
                <div className="w-16 flex-shrink-0 text-center">
                   <p className="text-sm font-bold text-slate-500">Hôm qua</p>
                </div>
                <div>
                   <p className="text-sm font-medium text-slate-800">Cập nhật kết quả xét nghiệm máu cho Mẹ Vân</p>
                   <p className="text-xs text-slate-500 mt-0.5">Hệ thống AI đã phân tích và cập nhật biểu đồ</p>
                </div>
              </div>
            </div>

            {/* Timeline item */}
            <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
              <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white bg-slate-200 text-slate-50 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 absolute left-4 md:left-1/2 -mt-5 md:mt-0"></div>
              <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] ml-[4rem] md:ml-0 p-4 rounded-2xl bg-white border border-slate-100 flex gap-4 items-center">
                 <div className="w-16 flex-shrink-0 text-center">
                   <p className="text-sm font-bold text-slate-500">20 Th.10</p>
                </div>
                <div>
                   <p className="text-sm font-medium text-slate-800">Hoàn thành tiêm chủng định kỳ cho Con Khôi</p>
                   <p className="text-xs text-slate-500 mt-0.5">Địa điểm: Trung tâm tiêm chủng VNVC</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Footer Info */}
      <div className="bg-slate-100 border border-slate-200 rounded-2xl p-6 flex flex-col md:flex-row justify-between items-center gap-4">
        <div>
          <h4 className="font-bold text-slate-800 text-sm">Trợ giúp 24/7</h4>
          <p className="text-xs text-slate-500 max-w-sm mt-1">Kết nối ngay với bác sĩ nếu có dấu hiệu hoặc diễn biến bất thường bất kỳ.</p>
        </div>
        <Button variant="outline" className="bg-white">Gọi Hotline Y tế</Button>
      </div>

    </div>
  );
}

// Inline Utensils Icon for local component, missing imports in previous scope
function Utensils(props: any) {
  return <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"/><path d="M7 2v20"/><path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7"/></svg>
}
function Plus(props: any) {
  return <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
}
function Minus(props: any) {
  return <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line></svg>
}
