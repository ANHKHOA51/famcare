import { useState, useEffect } from "react";
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
  const [selectedMember, setSelectedMember] = useState<string>("Bo"); // Defaulting for visual
  const [isSaving, setIsSaving] = useState(false);
  const [medications, setMedications] = useState(result.medications);
  
  // Pending save warning
  const [pendingSave, setPendingSave] = useState(false);

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    try {
      const resp = await fetch("/api/family", {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await resp.json();
      setMembers(data);
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

  const handleSaveAll = async () => {
    setIsSaving(true);
    // Simulate save
    setTimeout(() => {
      setIsSaving(false);
      toast.success("Đã phân tích và lưu đơn thuốc thành công!");
      onReset();
    }, 1500);
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
        <div className="flex items-center gap-4">
          <span className="text-[0.6875rem] font-bold text-slate-600 uppercase tracking-wider w-16 sm:w-auto">Gán nhắc nhở cho:</span>
          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="radio" name="member" checked={selectedMember === "Bo"} onChange={() => setSelectedMember("Bo")} className="w-4 h-4 text-slate-800 focus:ring-slate-800" />
              <span className="text-sm font-medium text-slate-800">Bố</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="radio" name="member" checked={selectedMember === "Toi"} onChange={() => setSelectedMember("Toi")} className="w-4 h-4 text-slate-800 focus:ring-slate-800" />
              <span className="text-sm font-medium text-slate-800">Tôi</span>
            </label>
          </div>
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
            disabled={isSaving}
            className="flex-1 sm:flex-none bg-gradient-to-r from-[#60a5fa] to-[#3b82f6] hover:opacity-90 text-white font-semibold px-8 py-3.5 rounded-2xl transition-opacity shadow-lg shadow-blue-500/20 text-sm flex items-center justify-center min-w-[140px]"
          >
            {isSaving ? <Loader2 size={18} className="animate-spin" /> : "Lưu đơn thuốc"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResultState;
