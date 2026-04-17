import React, { useCallback, useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Search, Loader2, Link2, Mail, Trash2, Camera, UploadCloud, Users, Sparkles, Filter, Info, Pill, X, HelpCircle } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

// (Keep existing interfaces)
interface FamilyMember {
  id: string;
  name: string;
  relationship: string;
  userId: string;
  linkedUserId?: string | null;
  linkedUser?: { id: string; name: string; email: string };
  isLinked?: boolean;
}

interface Medication {
  id: string;
  name: string;
  dosage: string;
  instructions?: string;
  diagnosis?: string;
  symptoms_treated?: string;
  prescriptionCode?: string | null;
  hospitalName?: string | null;
  isShared?: boolean;
  familyMember: FamilyMember & {
    user: { id: string; name: string; email: string };
  };
  createdAt: string;
}

interface SearchResult {
  top_match?: { name: string; reason: string; instructions: string; owner: string };
  alternatives?: Array<{ name: string; reason: string }>;
  warning?: string;
  message?: string;
}

interface CabinetPageProps {
  onNavigate?: (page: string) => void;
}

const getMockColor = (name: string) => {
  if (name.toLowerCase().includes("panadol")) return "from-rose-100 to-rose-200 text-rose-500";
  if (name.toLowerCase().includes("vitamin")) return "from-amber-100 to-amber-200 text-amber-500";
  if (name.toLowerCase().includes("siro") || name.toLowerCase().includes("ho")) return "from-indigo-100 to-indigo-200 text-indigo-500";
  return "from-teal-100 to-teal-200 text-teal-500";
};

// Bug #4 fix: deterministic "near expiry" check based on med.id hash — stable across re-renders
const isNearExpiry = (id: string) => {
  let hash = 0;
  for (let i = 0; i < id.length; i++) hash = (hash * 31 + id.charCodeAt(i)) >>> 0;
  return hash % 10 > 7; // ~20% chance, but stable for same id
};

const getExplainableDosage = (name: string) => {
  const lowername = name.toLowerCase();
  if (lowername.includes("paracetamol") || lowername.includes("panadol") || lowername.includes("hapacol")) {
    return "Khuyến nghị AI: Người lớn 500mg - 1000mg/lần (cách 4-6h), trẻ em 10-15mg/kg/lần.";
  }
  if (lowername.includes("ibuprofen") || lowername.includes("advil") || lowername.includes("gofen")) {
    return "Khuyến nghị AI: Người lớn 200-400mg/lần. Tránh dùng nếu đau dạ dày.";
  }
  if (lowername.includes("vitamin c") || lowername.includes("c sủi")) {
    return "Khuyến nghị AI: Người lớn thường 500mg-1000mg/ngày. Tốt nhất uống sáng, sau ăn.";
  }
  if (lowername.includes("omeprazol") || lowername.includes("pantoprazol") || lowername.includes("nexium")) {
    return "Khuyến nghị AI: Thường uống trước bữa ăn sáng 30-60 phút để đạt hiệu quả cao nhất.";
  }
  return null;
};

const CabinetPage = ({ onNavigate }: CabinetPageProps) => {
  const { token, user } = useAuth();
  const [activeTab, setActiveTab] = useState("all");
  const [members, setMembers] = useState<FamilyMember[]>([]);
  const [medications, setMedications] = useState<Medication[]>([]);
  const [symptomQuery, setSymptomQuery] = useState("");
  const [searchResult, setSearchResult] = useState<SearchResult | null>(null);
  const [searching, setSearching] = useState(false);
  const [loading, setLoading] = useState(true);

  // Manual Add State
  const [isAddingManual, setIsAddingManual] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [manualForm, setManualForm] = useState({
    name: "",
    dosage: "",
    symptoms_treated: "",
    familyMemberId: ""
  });

  const handleDeleteMedication = async (medId: string) => {
    if (!confirm("Bạn có chắc chắn muốn xóa thuốc này?")) return;
    try {
      const resp = await fetch(`/api/cabinet/${medId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      if (resp.ok) {
        toast.success("Đã xóa thuốc thành công");
        setMedications(prev => prev.filter(m => m.id !== medId));
      } else {
        const data = await resp.json();
        toast.error(data.error || "Không thể xóa thuốc");
      }
    } catch {
      toast.error("Lỗi xóa thuốc");
    }
  };

  const handleManualSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!manualForm.familyMemberId) {
      toast.error("Vui lòng chọn người sử dụng");
      return;
    }
    setIsSubmitting(true);
    try {
      const resp = await fetch("/api/cabinet/save", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({
          ...manualForm,
          diagnosis: "Thêm thủ công",
          isShared: true
        })
      });
      if (resp.ok) {
        toast.success("Thêm thuốc thành công");
        fetchCabinet();
        setIsAddingManual(false);
        setManualForm({ name: "", dosage: "", symptoms_treated: "", familyMemberId: "" });
      } else {
        const data = await resp.json();
        toast.error(data.error || "Không thể thêm thuốc");
      }
    } catch {
      toast.error("Lỗi khi kết nối");
    } finally {
      setIsSubmitting(false);
    }
  };

  const fetchCabinet = useCallback(async () => {
    try {
      const resp = await fetch("/api/cabinet", { headers: { Authorization: `Bearer ${token}` } });
      if (resp.ok) {
        const data = await resp.json();
        setMedications(Array.isArray(data) ? data : []); // Bug #7: guard non-array response
      }
    } catch {
      toast.error("Lỗi khi tải tủ thuốc");
    } finally {
      setLoading(false);
    }
  }, [token]);

  const fetchMembers = useCallback(async () => {
    try {
      const resp = await fetch("/api/family", { headers: { Authorization: `Bearer ${token}` } });
      if (resp.ok) setMembers(await resp.json());
    } catch { }
  }, [token]);

  useEffect(() => {
    fetchCabinet();
    fetchMembers();
  }, [fetchCabinet, fetchMembers]);

  const handleSymptomSearch = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!symptomQuery.trim()) return;
    setSearching(true);
    setSearchResult(null);
    try {
      const resp = await fetch("/api/cabinet/search", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ symptom: symptomQuery })
      });
      if (resp.ok) setSearchResult(await resp.json());
    } catch {
      toast.error("Lỗi khi tìm thuốc");
    } finally {
      setSearching(false);
    }
  };

  const filteredMedications = medications.filter(m => {
    if (activeTab === "all") return true;
    if (activeTab === "mine") {
      const isOwnMedication =
        m.familyMember.linkedUserId === user?.id ||
        (m.familyMember.userId === user?.id && !m.familyMember.linkedUserId && m.familyMember.relationship === "Bản thân");
      const isSharedToMe = m.familyMember.userId !== user?.id && m.isShared !== false;
      return isOwnMedication || isSharedToMe;
    }
    const tabMember = members.find(mbr => mbr.id === activeTab);
    if (tabMember?.isLinked) return m.familyMember.userId === tabMember.userId;
    return m.familyMember.id === activeTab;
  });

  return (
    <div className="p-6 md:p-10 max-w-7xl mx-auto space-y-8 animate-fade-in relative container-fluid">
      {/* Top Universal Search Bar (Like Figma) */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-4">
        <form onSubmit={handleSymptomSearch} className="relative w-full md:w-[400px]">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder="Tìm kiếm thuốc với AI..." 
            value={symptomQuery}
            onChange={(e) => setSymptomQuery(e.target.value)}
            className="w-full bg-slate-100/80 border-none rounded-full py-3.5 pl-12 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/50 transition-all text-slate-700"
          />
        </form>

        <div className="flex bg-slate-100 rounded-full p-1 border border-slate-200/50 relative overflow-x-auto hide-scroll">
          <button 
            onClick={() => setActiveTab("all")} 
            className={`px-6 py-2 rounded-full text-sm font-bold transition-all whitespace-nowrap ${activeTab === "all" ? "bg-teal-500 text-white shadow-sm" : "text-slate-600 hover:text-slate-900"}`}
          >
            Tất cả
          </button>
          <button 
            onClick={() => setActiveTab("mine")} 
            className={`px-6 py-2 rounded-full text-sm font-bold transition-all whitespace-nowrap ${activeTab === "mine" ? "bg-teal-500 text-white shadow-sm" : "text-slate-600 hover:text-slate-900"}`}
          >
            Bạn
          </button>
          {members.map(m => (
            <button 
              key={m.id}
              onClick={() => setActiveTab(m.id)} 
              className={`px-6 py-2 rounded-full text-sm font-bold transition-all whitespace-nowrap ${activeTab === m.id ? "bg-teal-500 text-white shadow-sm" : "text-slate-600 hover:text-slate-900"}`}
            >
              {m.name}
            </button>
          ))}
        </div>
      </div>

      <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-start">
        {/* Main Cabinet Section */}
        <div className="lg:col-span-8 md:col-span-12">
          <div className="mb-8">
            <h1 className="text-3xl font-display font-bold text-teal-500 tracking-tight">Tủ thuốc Gia đình</h1>
            <p className="text-slate-500 mt-2 text-sm max-w-lg leading-relaxed">
              Quản lý kho dược phẩm thông minh dựa trên công nghệ AI của FamCare.
            </p>
          </div>

          {searchResult && (
            <div className="mb-8 bg-[#ecfeff] border border-cyan-200 rounded-3xl p-6 relative">
              <button onClick={() => setSearchResult(null)} className="absolute top-4 right-4 text-cyan-600 hover:bg-cyan-100 p-2 rounded-full transition-colors"><Filter size={18}/></button>
              <h3 className="font-bold text-cyan-800 flex items-center gap-2 mb-4"><Sparkles className="text-cyan-500" size={20}/> Kết quả phân tích AI</h3>
              {searchResult.top_match && (
                <div className="bg-white rounded-2xl p-5 shadow-sm mb-4">
                  <p className="font-bold text-slate-800 text-lg mb-1">{searchResult.top_match.name}</p>
                  <p className="text-sm text-slate-600">{searchResult.top_match.reason}</p>
                </div>
              )}
            </div>
          )}

          {loading ? (
             <div className="flex py-20 justify-center"><Loader2 className="animate-spin text-teal-200" size={40} /></div>
          ) : filteredMedications.length === 0 ? (
             <div className="flex flex-col items-center justify-center py-20 text-center border-2 border-dashed border-slate-200 rounded-3xl bg-slate-50">
               <p className="text-slate-500 font-medium">Chưa có loại thuốc nào trong tủ.</p>
             </div>
          ) : (
             <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
               {filteredMedications.map(med => (
                 <div key={med.id} className="bg-white border border-slate-300 rounded-[1.25rem] p-5 flex flex-col hover:shadow-lg transition-all h-full">
                    {/* Header */}
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex-1 pr-3">
                        <h3 className="font-bold text-slate-800 text-lg leading-tight mb-2 break-words uppercase">
                          {med.name}
                        </h3>
                        <div className="flex flex-wrap gap-2 mb-2">
                           <span className="bg-slate-100/80 text-slate-600 text-xs font-semibold px-3 py-1 rounded-full whitespace-nowrap">
                             {med.diagnosis || "Chưa phân loại"}
                           </span>
                           {isNearExpiry(med.id) && (
                             <span className="bg-orange-50 text-orange-600 text-xs font-semibold px-3 py-1 rounded-full whitespace-nowrap">
                               Sắp hết
                             </span>
                           )}
                        </div>
                        <p className="text-blue-700 font-medium text-[0.9rem]">
                          {med.dosage || "Chưa có liều lượng"}
                        </p>
                      </div>
                      <div className="w-11 h-11 flex-shrink-0 rounded-[0.85rem] border border-slate-200 flex items-center justify-center text-blue-700 bg-[#f8fafc]">
                        <Pill size={22} className="-rotate-45" />
                      </div>
                    </div>

                    {/* Middle Details Boxes */}
                    <div className="space-y-2 mt-1 flex-grow">
                      <div className="border border-slate-500 rounded-xl p-3">
                        <div className="text-[0.65rem] font-bold text-slate-600 uppercase tracking-widest mb-1">
                          Chữa triệu chứng
                        </div>
                        <div className="text-slate-800 text-[0.9rem] font-medium leading-snug overflow-hidden break-words line-clamp-3">
                          {med.symptoms_treated || "Chưa có thông tin"}
                        </div>
                      </div>

                      <div className="border border-slate-500 rounded-xl p-3">
                        <div className="text-[0.65rem] font-bold text-slate-600 uppercase tracking-widest mb-1 flex justify-between items-center">
                          <span>Cách dùng</span>
                          {getExplainableDosage(med.name) && (
                             <TooltipProvider>
                               <Tooltip delayDuration={300}>
                                 <TooltipTrigger asChild>
                                   <HelpCircle size={14} className="text-blue-500 cursor-help" />
                                 </TooltipTrigger>
                                 <TooltipContent side="top" className="max-w-[200px] text-xs">
                                   <p>{getExplainableDosage(med.name)}</p>
                                 </TooltipContent>
                               </Tooltip>
                             </TooltipProvider>
                          )}
                        </div>
                        <div className="text-slate-800 text-[0.9rem] italic leading-snug overflow-hidden break-words line-clamp-3">
                          {med.instructions || med.dosage || "Theo chỉ dẫn bác sĩ"}
                        </div>
                      </div>
                    </div>

                    {/* Prescription Details & Divider */}
                    <div className="w-full border-t border-slate-800 mt-6 pt-4 pb-4 text-center">
                      <span className="text-[0.75rem] text-slate-400 font-medium italic">
                        {(med.hospitalName || med.prescriptionCode) 
                          ? `${med.hospitalName || ''} - Mã: ${med.prescriptionCode || ''}` 
                          : "Không có thông tin đơn thuốc"
                        }
                      </span>
                    </div>

                    {/* Footer & Divider */}
                    <div className="w-full border-t border-slate-400 pt-4 flex justify-between items-center">
                       <span className="text-[0.8rem] text-slate-700 font-medium">
                         Thêm vào {new Date(med.createdAt || Date.now()).toLocaleDateString('vi-VN')}
                       </span>
                       <button 
                         onClick={() => handleDeleteMedication(med.id)}
                         className="text-slate-500 hover:text-red-500 transition-colors"
                       >
                         <Trash2 size={18} />
                       </button>
                    </div>
                 </div>
               ))}
             </div>
          )}
        </div>

        {/* Right Sidebar - Add New Med */}
        <div className="lg:col-span-4 bg-[#f8fafc] rounded-[2.5rem] p-8 mt-12 lg:mt-0 sticky top-24">
           <h2 className="text-2xl font-display font-bold text-slate-800 mb-2">Thêm thuốc mới</h2>
           <p className="text-sm text-slate-500 mb-8 leading-relaxed">
             AI sẽ tự động nhận diện thông tin từ ảnh của bạn.
           </p>

           <button 
             onClick={() => onNavigate?.("scanner")}
             className="w-full bg-[#06b6d4] hover:bg-[#0891b2] text-white font-semibold flex items-center justify-center gap-2 py-4 rounded-2xl transition-colors shadow-lg shadow-cyan-500/20 mb-4"
           >
             <Sparkles size={18} /> Quét bằng Camera AI
           </button>
           <button 
             onClick={() => {
               if (members.length > 0 && !manualForm.familyMemberId) {
                 const myself = members.find(m => m.relationship === "Bản thân");
                 setManualForm(prev => ({ ...prev, familyMemberId: myself ? myself.id : members[0].id }));
               }
               setIsAddingManual(true);
             }}
             className="w-full bg-[#e2e8f0] hover:bg-slate-300 text-slate-800 font-semibold py-4 rounded-2xl transition-colors mb-8"
           >
             Nhập thủ công
           </button>

           <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
             <div className="flex items-center gap-2 text-teal-600 font-bold text-xs uppercase tracking-wider mb-2">
               <Info size={16} /> Mẹo nhỏ từ FamCare
             </div>
             <p className="text-slate-500 text-xs leading-relaxed">
               Chụp ảnh rõ nhãn thuốc và thành phần để AI có thể trích xuất thông tin liều dùng và hạn sử dụng chính xác nhất cho cả gia đình.
             </p>
           </div>
        </div>
      </div>

      {/* Manual Entry Dialog */}
      {isAddingManual && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-[2rem] w-full max-w-md overflow-hidden animate-fade-in shadow-2xl">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
              <h3 className="font-bold text-slate-800 text-xl">Thêm thuốc thủ công</h3>
              <button 
                onClick={() => setIsAddingManual(false)}
                className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-500 hover:bg-slate-100 transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            
            <form onSubmit={handleManualSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Tên thuốc</label>
                <input 
                  type="text" 
                  required
                  value={manualForm.name}
                  onChange={(e) => setManualForm({...manualForm, name: e.target.value})}
                  className="w-full h-14 bg-slate-50 border-none rounded-2xl px-4 font-medium text-slate-700 focus:ring-2 focus:ring-teal-500"
                  placeholder="VD: Paracetamol 500mg"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Tác dụng (Chữa bệnh/Triệu chứng)</label>
                <input 
                  type="text" 
                  value={manualForm.symptoms_treated}
                  onChange={(e) => setManualForm({...manualForm, symptoms_treated: e.target.value})}
                  className="w-full h-14 bg-slate-50 border-none rounded-2xl px-4 font-medium text-slate-700 focus:ring-2 focus:ring-teal-500"
                  placeholder="VD: Hạ sốt, giảm đau"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Số lượng / Liều dùng</label>
                <input 
                  type="text" 
                  value={manualForm.dosage}
                  onChange={(e) => setManualForm({...manualForm, dosage: e.target.value})}
                  className="w-full h-14 bg-slate-50 border-none rounded-2xl px-4 font-medium text-slate-700 focus:ring-2 focus:ring-teal-500"
                  placeholder="VD: 10 viên / Uống 1 viên/lần"
                />
              </div>

              <div>
                 <label className="block text-sm font-bold text-slate-700 mb-2">Chỉ định cho</label>
                 {members.length === 0 ? (
                   <div className="w-full h-14 bg-slate-50 border border-slate-200 rounded-2xl px-4 flex items-center text-sm text-slate-400 italic">
                     Chưa có thành viên nào. Vui lòng thêm thành viên ở trang Hồ sơ trước.
                   </div>
                 ) : (
                   <select 
                     value={manualForm.familyMemberId}
                     onChange={e => setManualForm({...manualForm, familyMemberId: e.target.value})}
                     required
                     className="w-full h-14 bg-slate-50 border-none rounded-2xl px-4 font-medium text-slate-700 focus:ring-2 focus:ring-teal-500 font-sans cursor-pointer"
                   >
                     <option value="" disabled>-- Chọn thành viên --</option>
                     {members.map(m => (
                       <option key={m.id} value={m.id}>{m.name} ({m.relationship})</option>
                     ))}
                   </select>
                 )}
              </div>

              <div className="pt-4 flex gap-3">
                <button 
                  type="button"
                  onClick={() => setIsAddingManual(false)}
                  className="flex-1 h-14 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-2xl transition-colors"
                >
                  Hủy
                </button>
                <button 
                  type="submit"
                  disabled={isSubmitting || members.length === 0}
                  className="flex-1 h-14 bg-teal-500 hover:bg-teal-600 disabled:bg-teal-300 disabled:cursor-not-allowed text-white font-bold rounded-2xl transition-colors"
                >
                  {isSubmitting ? "Đang lưu..." : "Thêm thuốc"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CabinetPage;
