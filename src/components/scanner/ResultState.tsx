import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, X, Loader2, Pill, ShieldCheck, AlertTriangle, Utensils, Stethoscope } from "lucide-react";
import { ScanResult } from "@/pages/ScannerPage";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import MedicineAutocomplete from "@/components/MedicineAutocomplete";
import { Button } from "@/components/ui/button";

interface ResultStateProps {
  result: ScanResult;
  onReset: () => void;
}

interface FamilyMember {
  id: string;
  name: string;
  relationship: string;
}

// ── Drug Interaction Checker ──────────────────────────────────────────────────
const INTERACTION_PAIRS: [string, string, string][] = [
  ["warfarin", "aspirin", "Tăng nguy cơ chảy máu nghiêm trọng"],
  ["metformin", "alcohol", "Nguy cơ hạ đường huyết nếu dùng cùng"],
  ["ibuprofen", "aspirin", "Tăng nguy cơ xuất huyết tiêu hóa"],
  ["ibuprofen", "paracetamol", "Cần thận về liều lượng khi dùng cùng"],
  ["codeine", "benzodiazepine", "Nguy hiểm: [ức chế hô hấp nếu dùng cùng"],
  ["simvastatin", "clarithromycin", "Tăng nguy cơ tổn thương cơ"],
];

const checkInteractions = (meds: { name: string }[]) => {
  const names = meds.map(m => m.name.toLowerCase());
  return INTERACTION_PAIRS.filter(([a, b]) =>
    names.some(n => n.includes(a)) && names.some(n => n.includes(b))
  );
};

// ── Main Component ──────────────────────────────────────────────────────────────────
const ResultState = ({ result, onReset }: ResultStateProps) => {
  const navigate = useNavigate();
  const { token, user } = useAuth();
  const [members, setMembers] = useState<FamilyMember[]>([]);
  const [selectedMemberId, setSelectedMemberId] = useState<string>("");
  const [isShared, setIsShared] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [medications, setMedications] = useState(result.medications);
  const [confirmed, setConfirmed] = useState(false); // human-in-the-loop gate
  
  const [prescriptionCode, setPrescriptionCode] = useState(result.prescription_code || "");
  const [hospitalName, setHospitalName] = useState(result.hospital_name || "");

  const interactions = checkInteractions(medications);

  const isMounted = useRef(true);

  useEffect(() => {
    isMounted.current = true;
    fetchMembers();
    return () => { isMounted.current = false; };
  }, []);

  const fetchMembers = async () => {
    try {
      const resp = await fetch("/api/family", {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (!resp.ok) return;
      const data: FamilyMember[] = await resp.json();
      if (!isMounted.current) return;
      setMembers(data);
      if (data.length > 0) {
        const selfMember = data.find(m => m.relationship === "Bản thân");
        setSelectedMemberId(selfMember ? selfMember.id : data[0].id);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleRemoveMed = (index: number) => {
    setMedications(meds => meds.filter((_, i) => i !== index));
  };

  const handleUpdateMed = (index: number, field: string, value: string) => {
    setMedications(meds => {
      const newMeds = [...meds];
      newMeds[index] = { ...newMeds[index], [field]: value };
      return newMeds;
    });
  };

  const handleAddMed = () => {
    setMedications([...medications, { name: "", dosage: "", instructions: "" }]);
  };

  // Bug #2 fix: real API call instead of fake setTimeout
  const handleSaveAll = async () => {
    if (!selectedMemberId) {
      toast.error("Vui lòng chọn thành viên gia đình để gán thuốc");
      return;
    }

    const validMeds = medications.filter(m => m.name.trim());
    if (validMeds.length === 0) {
      toast.error("Không có thuốc nào để lưu");
      return;
    }

    setIsSaving(true);
    let savedCount = 0;
    let failCount = 0;

    try {
      // Save each medication as a separate entry
      await Promise.all(validMeds.map(async (med) => {
        try {
          const resp = await fetch("/api/cabinet/save", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({
              name: med.name,
              dosage: med.dosage || "Chưa rõ",
              instructions: med.instructions || "",
              diagnosis: result.diagnosis || "Chưa xác định",
              symptoms_treated: med.suggested_symptoms?.join(", ") || "",
              familyMemberId: selectedMemberId,
              prescriptionCode: prescriptionCode,
              hospitalName: hospitalName,
              isShared: isShared
            })
          });
          if (resp.ok) {
            savedCount++;
          } else {
            failCount++;
          }
        } catch {
          failCount++;
        }
      }));

      if (savedCount > 0) {
        toast.success(`Đã lưu ${savedCount} thuốc vào tủ thành công!`);
        onReset();
      }
      if (failCount > 0) {
        toast.error(`${failCount} thuốc không thể lưu. Vui lòng thử lại.`);
      }
    } catch {
      toast.error("Lỗi kết nối, không thể lưu đơn thuốc");
    } finally {
      if (isMounted.current) {
        setIsSaving(false);
      }
    }
  };

  return (
    <>
      <div className="bg-[#e2e8f0]/40 rounded-[2.5rem] p-6 lg:p-8 h-full flex flex-col relative overflow-hidden">
        
        {/* ── Mandatory Human-in-the-Loop Warning ── */}
        <div className="bg-amber-50 border border-amber-300 rounded-2xl px-5 py-3 flex items-start gap-3 mb-4">
          <ShieldCheck className="text-amber-500 shrink-0 mt-0.5" size={18} />
          <p className="text-xs text-amber-800 leading-relaxed">
            <strong className="text-amber-900">Bước xác thực bắt buộc:</strong> Vui lòng kiểm tra và chỉnh sửa tên thuốc trước khi lưu để đảm bảo an toàn y tế.
          </p>
        </div>

        {/* ── Drug Interaction Warnings ── */}
        {interactions.length > 0 && (
          <div className="bg-red-50 border-2 border-red-400 rounded-2xl p-4 mb-4">
            <p className="font-bold text-red-700 flex items-center gap-2 mb-2 text-sm">
              <AlertTriangle size={16} /> ⚠️ Cảnh báo tương tác thuốc
            </p>
            {interactions.map(([a, b, warn], i) => (
              <p key={i} className="text-xs text-red-700 leading-relaxed">
                • <strong>{a}</strong> + <strong>{b}</strong>: {warn}
              </p>
            ))}
          </div>
        )}
        
        {/* Header */}
        <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-2">
            <Pill className="text-[#0a429b]" size={20} strokeWidth={2.5} />
            <h2 className="text-xl font-display font-medium text-slate-800">Đơn thuốc của bạn</h2>
          </div>
          
          <div className="flex flex-wrap items-center gap-3">
            {/* Member Selector */}
            <div className="flex items-center gap-2 bg-slate-50 border border-slate-200/80 rounded-xl px-4 py-2">
              <span className="text-[0.8rem] font-medium text-slate-600">Lưu cho:</span>
              {members.length === 0 ? (
                <span className="text-[0.8rem] text-slate-400 italic">Đang tải...</span>
              ) : (
                <select
                  value={selectedMemberId}
                  onChange={e => setSelectedMemberId(e.target.value)}
                  className="bg-transparent text-[0.8rem] font-medium text-slate-700 outline-none cursor-pointer max-w-[150px] truncate"
                >
                  {members.map(m => (
                    <option key={m.id} value={m.id}>{m.name}</option>
                  ))}
                </select>
              )}
            </div>

            {/* Share Toggle */}
            <div className="flex items-center gap-3 bg-slate-50 border border-slate-200/80 rounded-xl px-4 py-2">
              <span className="text-[0.8rem] font-medium text-slate-600">Chia sẻ với gia đình</span>
              <button 
                onClick={() => setIsShared(!isShared)}
                className={`w-10 h-5 flex items-center rounded-full p-0.5 transition-colors ${isShared ? 'bg-[#0a429b]' : 'bg-slate-300'}`}
              >
                <div className={`bg-white w-4 h-4 rounded-full shadow-sm transform transition-transform ${isShared ? 'translate-x-5' : 'translate-x-0'}`}></div>
              </button>
            </div>
          </div>
        </div>
        
        {/* General Prescription Fields */}
        <div className="grid grid-cols-2 gap-4 mb-6">
           <div className="space-y-1.5">
             <label className="text-[0.6875rem] font-bold text-slate-600 uppercase tracking-wider">Mã đơn thuốc</label>
             <input 
               type="text" 
               value={prescriptionCode} 
               onChange={(e) => setPrescriptionCode(e.target.value)}
               className="w-full bg-white/70 border border-slate-200/50 rounded-full px-4 py-2.5 text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-400/50"
               placeholder="Nhập mã đơn thuốc (tùy chọn)"
             />
           </div>
           <div className="space-y-1.5">
             <label className="text-[0.6875rem] font-bold text-slate-600 uppercase tracking-wider">Tên bệnh viện / Phòng khám</label>
             <input 
               type="text" 
               value={hospitalName} 
               onChange={(e) => setHospitalName(e.target.value)}
               className="w-full bg-white/70 border border-slate-200/50 rounded-full px-4 py-2.5 text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-400/50"
               placeholder="Nhập bệnh viện (tùy chọn)"
             />
           </div>
        </div>

        {/* Meds List */}
        <div className="flex-1 overflow-auto space-y-4 pr-2 pb-24">
          {medications.map((med, index) => (
            <div key={index} className={`relative bg-white/40 backdrop-blur-sm rounded-3xl p-6 shadow-sm border ${med.confidence_score && med.confidence_score < 80 ? 'border-red-400/60' : 'border-white/50'}`}>
              <button 
                onClick={() => handleRemoveMed(index)}
                className="absolute top-4 right-4 w-7 h-7 bg-white/80 hover:bg-red-50 text-slate-400 hover:text-red-500 rounded-full flex items-center justify-center transition-all border border-slate-100 shadow-sm z-10"
                title="Xóa thuốc"
              >
                <X size={14} strokeWidth={2.5} />
              </button>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="space-y-1.5">
                  <div className="flex flex-col gap-1">
                    <label className="text-[0.6875rem] font-bold text-slate-600 uppercase tracking-wider">Tên thuốc</label>
                    {typeof med.confidence_score === 'number' && med.confidence_score < 80 && (
                       <div className="bg-red-50 border border-red-200 text-red-600 text-xs font-semibold px-3 py-1.5 rounded-lg flex items-start gap-2 mb-1 animate-in fade-in duration-300">
                         <span className="text-red-500 mt-0.5">⚠️</span>
                         <span>
                           AI phát hiện chữ mờ hoặc không rõ (Tin cậy: {med.confidence_score}%). Vui lòng kiểm tra lại.
                         </span>
                       </div>
                    )}
                  </div>
                  {/* Autocomplete medicine name input */}
                  <MedicineAutocomplete
                    value={med.name}
                    onChange={(val) => handleUpdateMed(index, 'name', val)}
                    placeholder="Nhập tên thuốc"
                    className={`w-full bg-white border ${typeof med.confidence_score === 'number' && med.confidence_score < 80 ? 'border-red-300 ring-1 ring-red-100' : 'border-slate-200/50'} rounded-2xl px-4 py-2.5 text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-400/50`}
                  />
                  {/* Suggested Alternatives */}
                  {typeof med.confidence_score === 'number' && med.confidence_score < 80 && med.suggested_alternatives && med.suggested_alternatives.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-2">
                      <span className="text-[0.65rem] text-slate-500 font-medium pt-1">Gợi ý từ AI:</span>
                      {med.suggested_alternatives.map((alt, i) => (
                        <button 
                          key={i}
                          onClick={() => handleUpdateMed(index, 'name', alt)}
                          className="bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 text-xs font-medium px-2 py-1 rounded-lg transition-colors"
                        >
                          {alt}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                <div className="space-y-1.5">
                  <label className="text-[0.6875rem] font-bold text-slate-600 uppercase tracking-wider">Liều lượng</label>
                  <input 
                    type="text" 
                    value={med.dosage} 
                    onChange={(e) => handleUpdateMed(index, 'dosage', e.target.value)}
                    className="w-full bg-white border border-slate-200/50 rounded-full px-4 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-400/50"
                    placeholder="VD: 1 viên"
                  />
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-[0.6875rem] font-bold text-slate-600 uppercase tracking-wider">Tần suất & Hướng dẫn</label>
                <input 
                  type="text" 
                  value={med.instructions || ""} 
                  onChange={(e) => handleUpdateMed(index, 'instructions', e.target.value)}
                  className="w-full bg-white border border-slate-200/50 rounded-full px-4 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-400/50"
                  placeholder="VD: Uống sau khi ăn"
                />
              </div>
            </div>
          ))}

          <button 
            onClick={handleAddMed}
            className="w-full border-2 border-dashed border-blue-300 hover:border-blue-500 hover:bg-blue-50/50 text-blue-600 font-semibold py-4 rounded-3xl transition-colors flex items-center justify-center gap-2 text-sm"
          >
            <Plus size={18} /> Thêm thuốc mới
          </button>

          {/* ── Nutrition CTA ── */}
          <div className="mt-4 bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-200 rounded-3xl p-5 flex items-start gap-4">
            <div className="w-9 h-9 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center shrink-0">
              <Utensils size={16} />
            </div>
            <div className="flex-1">
              <p className="text-sm font-bold text-emerald-900 mb-1">💡 Gợi ý tiếp theo</p>
              <p className="text-xs text-emerald-800 leading-relaxed mb-3">
                Chế độ ăn uống ảnh hưởng <strong>40%</strong> đến tốc độ hồi phục. Bạn có muốn xem thực đơn phù hợp không?
              </p>
              <button
                onClick={() => navigate(`/app/meal-plan?disease=${encodeURIComponent(result.diagnosis)}`)}
                className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-4 py-2 rounded-xl transition-colors"
              >
                Xem thực đơn AI gợi ý →
              </button>
            </div>
          </div>

          {/* ── Appointments CTA ── */}
          <div className="mt-3 bg-gradient-to-br from-violet-50 to-indigo-50 border border-violet-200 rounded-3xl p-5 flex items-start gap-4">
            <div className="w-9 h-9 bg-violet-100 text-violet-600 rounded-full flex items-center justify-center shrink-0">
              <Stethoscope size={16} />
            </div>
            <div className="flex-1">
              <p className="text-sm font-bold text-violet-900 mb-1">🩺 Hỗ trợ chuyên môn</p>
              <p className="text-xs text-violet-800 leading-relaxed mb-3">
                Bạn gặp tác dụng phụ hoặc muốn tìm hiểu kỹ hơn về lộ trình điều trị?
              </p>
              <button
                onClick={() => navigate(`/app/appointment?filter=${encodeURIComponent(result.diagnosis)}`)}
                className="bg-violet-600 hover:bg-violet-700 text-white text-xs font-bold px-4 py-2 rounded-xl transition-colors"
              >
                Tư vấn cùng Bác sĩ chuyên khoa →
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Panel */}
        <div className="absolute bottom-0 left-0 right-0 bg-[#e2e8f0]/95 backdrop-blur-md p-6 border-t border-white/20 rounded-b-[2.5rem] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          {/* Verification Status Badge */}
          <div className="bg-[#a5f3fc] text-[#0891b2] text-[0.625rem] font-bold tracking-wider uppercase px-4 py-2 rounded-full w-fit shadow-sm">
            AI Verification Required
          </div>

          <div className="flex items-center gap-5 w-full sm:w-auto flex-wrap">
            {/* Human-in-the-loop confirmation gate */}
            <label className="flex items-center gap-2 cursor-pointer text-xs font-medium text-slate-700 select-none">
              <input
                type="checkbox"
                checked={confirmed}
                onChange={e => setConfirmed(e.target.checked)}
                className="w-4 h-4 accent-blue-600 rounded"
              />
              Tôi đã kiểm tra và xác nhận thông tin
            </label>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                onClick={onReset}
                className="flex-1 sm:flex-none bg-white hover:bg-slate-50 text-slate-700 font-semibold px-6 py-3.5 rounded-2xl transition-colors shadow-sm text-sm"
              >
                Hủy bỏ
              </button>
              <button
                onClick={handleSaveAll}
                disabled={isSaving || !selectedMemberId || !confirmed}
                className="flex-1 sm:flex-none bg-gradient-to-r from-orange-500 to-rose-500 hover:from-orange-600 hover:to-rose-600 disabled:opacity-50 text-white font-semibold px-8 py-3.5 rounded-2xl transition-opacity shadow-lg shadow-orange-500/20 text-sm flex items-center justify-center min-w-[140px]"
              >
                {isSaving ? <Loader2 size={18} className="animate-spin" /> : "Lưu đơn thuốc"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ResultState;
