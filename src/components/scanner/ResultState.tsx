import { useState, useEffect } from "react";
import { CheckCircle2, AlertTriangle, Pill, Utensils, RotateCcw, BookOpen, Sparkles, Save, User, Loader2, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScanResult } from "@/pages/ScannerPage";
import { useAuth } from "@/context/AuthContext";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

interface ResultStateProps {
  result: ScanResult;
  onReset: () => void;
  onGenerateMealPlan: () => void;
}

interface FamilyMember {
  id: string;
  name: string;
  relationship: string;
}

const ResultState = ({ result, onReset, onGenerateMealPlan }: ResultStateProps) => {
  const { token } = useAuth();
  const [members, setMembers] = useState<FamilyMember[]>([]);
  const [selectedMember, setSelectedMember] = useState<string>("");
  const [isSaving, setIsSaving] = useState(false);
  const [savedMedications, setSavedMedications] = useState<string[]>([]);
  const [loadingMembers, setLoadingMembers] = useState(false);

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    setLoadingMembers(true);
    try {
      const resp = await fetch("/api/family", {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await resp.json();
      setMembers(data);
      if (data.length > 0) setSelectedMember(data[0].id);
    } catch (e) {
      console.error(e);
    } finally {
      setLoadingMembers(false);
    }
  };

  const handleSaveToCabinet = async (med: any) => {
    if (!selectedMember) {
      toast.error("Vui lòng chọn thành viên");
      return;
    }

    setIsSaving(true);
    try {
      const resp = await fetch("/api/cabinet/save", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}` 
        },
        body: JSON.stringify({
          name: med.name,
          dosage: med.dosage,
          instructions: med.instructions,
          diagnosis: result.diagnosis,
          symptoms_treated: med.suggested_symptoms?.join(", "),
          familyMemberId: selectedMember
        })
      });

      if (resp.ok) {
        setSavedMedications(prev => [...prev, med.name]);
        toast.success(`Đã lưu ${med.name} vào tủ thuốc`);
      } else {
        toast.error("Lỗi khi lưu thuốc");
      }
    } catch (e) {
      toast.error("Lỗi kết nối");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="animate-fade-up space-y-8 max-w-5xl mx-auto pb-20">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-[2rem] font-display font-bold text-foreground tracking-tight">Kết quả phân tích</h2>
          <p className="text-on-surface-variant text-[0.875rem] mt-1.5">
            Chẩn đoán: <span className="font-semibold text-foreground">{result.diagnosis}</span>
          </p>
        </div>
        <Button variant="outline" onClick={onReset} className="gap-2">
          <RotateCcw size={14} />
          Quét lại
        </Button>
      </div>

      {/* Medications */}
      <div className="surface-2 rounded-2xl p-8 shadow-patient">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2.5 text-primary">
            <Pill size={20} />
            <h3 className="text-lg font-semibold font-display text-foreground">Đơn thuốc của bạn</h3>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-[0.8125rem] text-on-surface-variant font-medium">Lưu cho:</span>
            <Select value={selectedMember} onValueChange={setSelectedMember}>
              <SelectTrigger className="w-[180px] h-9 text-[0.8125rem] bg-background">
                <SelectValue placeholder="Chọn thành viên" />
              </SelectTrigger>
              <SelectContent>
                {members.map(m => (
                  <SelectItem key={m.id} value={m.id}>{m.name} ({m.relationship})</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-4">
          {result.medications.map((med, i) => (
            <div key={i} className="flex items-center gap-4 p-5 surface-1 rounded-xl transition-all duration-200 hover:surface-2 hover:shadow-patient group">
              <div className="w-12 h-12 rounded-xl bg-primary/8 flex items-center justify-center shrink-0 group-hover:bg-primary/15 transition-colors">
                <Pill size={20} className="text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-bold text-foreground text-lg">{med.name}</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-[0.8125rem] font-bold text-primary px-2 py-0.5 bg-primary/5 rounded border border-primary/10">{med.dosage}</span>
                  {med.instructions && (
                    <span className="text-[0.8125rem] text-on-surface-variant italic truncate">
                      • {med.instructions}
                    </span>
                  )}
                </div>
              </div>
              
              <Button 
                onClick={() => handleSaveToCabinet(med)}
                disabled={savedMedications.includes(med.name) || isSaving}
                variant={savedMedications.includes(med.name) ? "secondary" : "outline"}
                className="gap-2 shrink-0 h-10 px-4 rounded-xl border-primary/20 hover:bg-primary/5"
              >
                {savedMedications.includes(med.name) ? (
                  <><Check size={16} className="text-success" /> Đã lưu</>
                ) : (
                  <><Save size={16} className="text-primary" /> Lưu tủ thuốc</>
                )}
              </Button>
            </div>
          ))}
        </div>
      </div>

      {/* Nutrition Plan */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="surface-2 rounded-2xl p-8 shadow-patient">
          <div className="flex items-center gap-2.5 mb-6 text-success">
            <Utensils size={20} />
            <h3 className="text-lg font-semibold font-display text-foreground">Thực phẩm nên ăn</h3>
          </div>
          <div className="space-y-2.5">
            {result.nutrition.recommended_foods.map((item, i) => (
              <div key={i} className="flex items-center gap-4 p-4 rounded-xl bg-success/5 border border-success/10">
                <CheckCircle2 size={16} className="text-success" />
                <p className="font-medium text-foreground text-[0.875rem]">{item}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="surface-2 rounded-2xl p-8 shadow-patient">
          <div className="flex items-center gap-2.5 mb-6 text-destructive">
            <AlertTriangle size={20} />
            <h3 className="text-lg font-semibold font-display text-foreground">Thực phẩm nên tránh</h3>
          </div>
          <div className="space-y-2.5">
            {result.nutrition.foods_to_avoid.map((item, i) => (
              <div key={i} className="flex items-center gap-4 p-4 rounded-xl bg-destructive/5 border border-destructive/10">
                <AlertTriangle size={16} className="text-destructive" />
                <p className="font-medium text-foreground text-[0.875rem]">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Action CTA */}
      <div className="flex flex-col items-center gap-4 pt-4">
        <Button 
          size="lg" 
          className="h-14 px-12 rounded-full text-lg shadow-elevated gap-3 animate-pulse-ring"
          onClick={onGenerateMealPlan}
        >
          <Sparkles size={20} />
          Tạo thực đơn 7 ngày
        </Button>
        <p className="text-xs text-on-surface-variant font-medium">Bổ sung dinh dưỡng tăng tốc khả năng phục hồi</p>
      </div>

      <div className="bg-primary/5 rounded-2xl p-8 border border-primary/10">
        <div className="flex items-center gap-2.5 mb-4 text-primary">
          <BookOpen size={20} />
          <h3 className="text-lg font-semibold font-display text-foreground">Lưu ý quan trọng</h3>
        </div>
        <p className="text-[0.875rem] text-on-surface-variant leading-relaxed opacity-80">
          Kết quả này được tạo bởi Trí tuệ nhân tạo (AI) dựa trên hình ảnh đơn thuốc bạn cung cấp.
          Thông tin dinh dưỡng chỉ mang tính chất tham khảo. Vui lòng tham khảo ý kiến bác sĩ hoặc chuyên gia dinh dưỡng trước khi thay đổi chế độ ăn uống của bạn.
        </p>
      </div>
    </div>
  );
};

export default ResultState;
