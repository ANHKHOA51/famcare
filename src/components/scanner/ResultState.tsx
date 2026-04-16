import { useState, useEffect, useRef } from "react";
import { Plus, X, Loader2 } from "lucide-react";
import { ScanResult } from "@/pages/ScannerPage";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface ResultStateProps {
  result: ScanResult;
  onReset: () => void;
}

interface FamilyMember {
  id: string;
  name: string;
  relationship: string;
}

const ResultState = ({ result, onReset }: ResultStateProps) => {
  const { token } = useAuth();
  const [members, setMembers] = useState<FamilyMember[]>([]);
  // Bug #3 fix: selectedMember now holds a real familyMemberId (string), defaulting to ""
  const [selectedMemberId, setSelectedMemberId] = useState<string>("");
  const [isSaving, setIsSaving] = useState(false);
  const [medications, setMedications] = useState(result.medications);
  const isMounted = useRef(true);

  // Pending save warning
  const [pendingSave, setPendingSave] = useState(false);

  useEffect(() => {
    isMounted.current = true;
    fetchMembers();
    return () => { isMounted.current = false; }; // Bug #10 fix: cleanup prevent state update on unmount
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
      // Bug #3 fix: auto-select "Bản thân" member, or first member if available
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
              isShared: true
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
      setIsSaving(false);
    }
  };

  return (
    <div className="bg-[#e2e8f0]/40 rounded-[2.5rem] p-6 lg:p-8 h-full flex flex-col relative overflow-hidden">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <h2 className="text-xl font-display font-bold text-slate-800">Thông tin trích xuất</h2>
        <div className="bg-[#a5f3fc] text-[#0891b2] text-[0.625rem] font-bold tracking-wider uppercase px-4 py-2 rounded-full w-fit">
          AI Verification Required
        </div>
      </div>

      {/* Meds List */}
      <div className="flex-1 overflow-auto space-y-4 pr-2 pb-24">
        {medications.map((med, index) => (
          <div key={index} className="relative bg-white/40 backdrop-blur-sm rounded-3xl p-6 shadow-sm border border-white/50">
            <button 
              onClick={() => handleRemoveMed(index)}
              className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full text-white flex items-center justify-center shadow-sm hover:bg-red-600 transition-colors"
            >
              <X size={14} strokeWidth={3} />
            </button>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="space-y-1.5">
                <label className="text-[0.6875rem] font-bold text-slate-600 uppercase tracking-wider">Tên thuốc</label>
                <input 
                  type="text" 
                  value={med.name} 
                  onChange={(e) => handleUpdateMed(index, 'name', e.target.value)}
                  className="w-full bg-white border border-slate-200/50 rounded-full px-4 py-2.5 text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-400/50"
                  placeholder="Nhập tên thuốc"
                />
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
      </div>

      {/* Bottom Panel */}
      <div className="absolute bottom-0 left-0 right-0 bg-[#e2e8f0]/95 backdrop-blur-md p-6 border-t border-white/20 rounded-b-[2.5rem] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* Bug #3 fix: real family member selector from API */}
        <div className="flex items-center gap-3">
          <span className="text-[0.6875rem] font-bold text-slate-600 uppercase tracking-wider whitespace-nowrap">Gán cho:</span>
          {members.length === 0 ? (
            <span className="text-xs text-slate-400 italic">Đang tải thành viên...</span>
          ) : (
            <select
              value={selectedMemberId}
              onChange={e => setSelectedMemberId(e.target.value)}
              className="bg-white border border-slate-200 rounded-xl px-3 py-2 text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-400/50 cursor-pointer"
            >
              {members.map(m => (
                <option key={m.id} value={m.id}>{m.name} ({m.relationship})</option>
              ))}
            </select>
          )}
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <button 
            onClick={onReset}
            className="flex-1 sm:flex-none bg-white hover:bg-slate-50 text-slate-700 font-semibold px-6 py-3.5 rounded-2xl transition-colors shadow-sm text-sm"
          >
            Hủy bỏ
          </button>
          <button 
            onClick={handleSaveAll}
            disabled={isSaving || !selectedMemberId}
            className="flex-1 sm:flex-none bg-gradient-to-r from-[#60a5fa] to-[#3b82f6] hover:opacity-90 disabled:opacity-50 text-white font-semibold px-8 py-3.5 rounded-2xl transition-opacity shadow-lg shadow-blue-500/20 text-sm flex items-center justify-center min-w-[140px]"
          >
            {isSaving ? <Loader2 size={18} className="animate-spin" /> : "Lưu đơn thuốc"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResultState;
