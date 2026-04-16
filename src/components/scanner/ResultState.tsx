import { useState, useEffect } from "react";
import { CheckCircle2, AlertTriangle, Pill, Utensils, RotateCcw, BookOpen, Sparkles, Save, User, Loader2, Check, Shield, Pencil, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScanResult } from "@/pages/ScannerPage";
import { useAuth } from "@/context/AuthContext";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

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
  const [isShared, setIsShared] = useState(true);
  const [prescriptionCode, setPrescriptionCode] = useState("");
  const [hospitalName, setHospitalName] = useState("");
  const [editedMedications, setEditedMedications] = useState<Record<number, string>>({});
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editValue, setEditValue] = useState<string>("");
  const [pendingMed, setPendingMed] = useState<{ med: any, index: number, finalName: string } | null>(null);

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

  const handleSaveToCabinet = (med: any, index: number, showWarning: boolean) => {
    const finalName = editedMedications[index] || med.name;
    if (showWarning) {
      setPendingMed({ med, index, finalName });
      return;
    }
    confirmSaveToCabinet(med, index, finalName);
  };

  const confirmSaveToCabinet = async (med: any, index: number, finalName: string) => {
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
          name: finalName,
          dosage: med.dosage,
          instructions: med.instructions,
          diagnosis: result.diagnosis,
          symptoms_treated: med.suggested_symptoms?.join(", "),
          prescriptionCode,
          hospitalName,
          isShared,
          familyMemberId: selectedMember
        })
      });

      if (resp.ok) {
        setSavedMedications(prev => [...prev, finalName]);
        toast.success(`Đã lưu ${finalName} vào tủ thuốc`);
      } else {
        toast.error("Lỗi khi lưu thuốc");
      }
    } catch (e) {
      toast.error("Lỗi kết nối");
    } finally {
      setIsSaving(false);
      setPendingMed(null);
    }
  };

  return (
    <div className="animate-fade-up space-y-8 max-w-5xl mx-auto pb-20">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
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

      {/* Meta Information */}
      <div className="surface-2 rounded-2xl p-4 sm:p-6 shadow-patient space-y-4">
        <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
          <Shield size={16} className="text-primary"/> 
          Thông tin xác thực (Tuỳ chọn)
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="hospital" className="text-xs text-on-surface-variant font-medium">Bệnh viện / Phòng khám</Label>
            <Input 
              id="hospital" 
              placeholder="VD: Bệnh viện Chợ Rẫy" 
              value={hospitalName}
              onChange={(e) => setHospitalName(e.target.value)}
              className="bg-background h-10 border-primary/20"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="presCode" className="text-xs text-on-surface-variant font-medium">Mã đơn thuốc</Label>
            <Input 
              id="presCode" 
              placeholder="VD: PK-123456" 
              value={prescriptionCode}
              onChange={(e) => setPrescriptionCode(e.target.value)}
              className="bg-background h-10 border-primary/20"
            />
          </div>
        </div>
      </div>

      {/* Medications */}
      <div className="surface-2 rounded-2xl p-4 sm:p-8 shadow-patient">
        <div className="flex flex-col xl:flex-row items-start xl:items-center justify-between gap-6 mb-6">
          <div className="flex items-center gap-2.5 text-primary">
            <Pill size={20} />
            <h3 className="text-lg font-semibold font-display text-foreground">Đơn thuốc của bạn</h3>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="flex flex-col sm:flex-row items-center gap-3 bg-background p-2 px-3 rounded-lg border border-primary/10 w-full sm:w-auto">
              <span className="text-[0.8125rem] text-on-surface-variant font-medium whitespace-nowrap">Lưu cho:</span>
              <Select value={selectedMember} onValueChange={setSelectedMember}>
                <SelectTrigger className="w-full sm:w-[150px] h-8 text-[0.8125rem] border-0 bg-transparent focus:ring-0">
                  <SelectValue placeholder="Chọn thành viên" />
                </SelectTrigger>
                <SelectContent>
                  {members.map(m => (
                    <SelectItem key={m.id} value={m.id}>{m.name} ({m.relationship})</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center gap-3 bg-background p-2 rounded-lg border border-primary/10 px-3 w-full sm:w-auto mt-2 sm:mt-0 justify-between">
              <Label htmlFor="privacy-toggle" className="text-[0.8125rem] text-on-surface-variant font-medium cursor-pointer">
                Chia sẻ với gia đình
              </Label>
              <Switch 
                id="privacy-toggle" 
                checked={isShared} 
                onCheckedChange={setIsShared}
              />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {result.medications.map((med, i) => {
            const isLowConfidence = med.confidence_score !== undefined && med.confidence_score < 75;
            const hasBeenEdited = !!editedMedications[i];
            const finalName = editedMedications[i] || med.name;
            const showWarning = isLowConfidence && !hasBeenEdited;
            const isEditing = editingIndex === i;

            return (
              <div key={i} className={`flex items-center gap-4 p-5 min-h-[88px] rounded-xl transition-all duration-300 hover:surface-2 hover:-translate-y-0.5 hover:shadow-[0_10px_30px_-10px_rgba(0,0,0,0.1)] group ${showWarning ? "surface-1 border-2 border-destructive/40 bg-destructive/5" : "surface-1 border border-transparent"}`}>
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-colors shadow-[0_2px_8px_-4px_rgba(var(--primary),0.3)] ${showWarning ? "bg-destructive/10 text-destructive group-hover:bg-destructive/15" : "bg-primary/8 text-primary group-hover:bg-primary/15"}`}>
                  <Pill size={20} className="group-hover:scale-110 transition-transform duration-300" />
                </div>
                <div className="flex-1 min-w-0 flex flex-col justify-center">
                  <div className="flex items-center gap-2">
                    {isEditing ? (
                      <Input
                        value={editValue}
                        onChange={(e) => setEditValue(e.target.value)}
                        onBlur={() => {
                          if (editValue.trim() && editValue !== med.name) {
                            setEditedMedications(prev => ({ ...prev, [i]: editValue.trim() }));
                          }
                          setEditingIndex(null);
                        }}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            if (editValue.trim() && editValue !== med.name) {
                              setEditedMedications(prev => ({ ...prev, [i]: editValue.trim() }));
                            }
                            setEditingIndex(null);
                          } else if (e.key === 'Escape') {
                            setEditingIndex(null);
                          }
                        }}
                        autoFocus
                        className="w-full h-auto py-1 font-bold text-lg px-2 shadow-none border-dashed border-primary/50"
                      />
                    ) : (
                      <>
                        <p 
                          className={`font-bold text-lg tracking-tight line-clamp-1 cursor-pointer hover:underline decoration-dashed underline-offset-4 ${showWarning ? "text-destructive" : "text-foreground"}`}
                          onClick={() => {
                            setEditingIndex(i);
                            setEditValue(finalName);
                          }}
                          title="Nhấn để sửa tên thuốc"
                        >
                          {finalName}
                        </p>
                        {showWarning && (
                          <div 
                            className="flex items-center gap-1.5 px-2 py-0.5 bg-destructive/10 rounded-md text-destructive text-xs font-semibold border border-destructive/20 cursor-pointer hover:bg-destructive/20 transition-colors"
                            onClick={() => {
                              setEditingIndex(i);
                              setEditValue(finalName);
                            }}
                            title="Độ tin cậy thấp, vui lòng kiểm tra lại"
                          >
                            <AlertTriangle size={12} className="shrink-0" />
                            <span>Sửa tên</span>
                          </div>
                        )}
                        {(!showWarning) && (
                          <button 
                            onClick={() => {
                              setEditingIndex(i);
                              setEditValue(finalName);
                            }}
                            className="text-muted-foreground/70 hover:text-primary transition-colors p-1 rounded hover:bg-primary/10 ml-1"
                            title="Sửa tên thuốc"
                          >
                            <Pencil size={14} />
                          </button>
                        )}
                      </>
                    )}
                  </div>
                  <div className="flex items-center gap-2 mt-1.5 h-[24px] overflow-hidden">
                    <span className="text-[0.8125rem] font-bold text-primary px-2.5 py-0.5 bg-primary/10 rounded-md border border-primary/15 whitespace-nowrap flex items-center gap-1">
                      {med.dosage}
                      <TooltipProvider>
                        <Tooltip delayDuration={300}>
                          <TooltipTrigger asChild>
                            <Info size={12} className="text-primary/60 hover:text-primary cursor-help" />
                          </TooltipTrigger>
                          <TooltipContent side="top" className="max-w-[250px] p-3 text-left bg-popover shadow-elevated border-primary/20">
                            <p className="text-[11px] font-bold text-primary mb-1 uppercase tracking-wider">💡 Tham khảo nhanh</p>
                            <p className="text-xs text-muted-foreground leading-relaxed">
                              Theo dược thư: <br/>
                              - Người lớn: Liều chuẩn 500mg.<br/>
                              - Trẻ em: 10-15mg/kg.<br/>
                              <span className="italic block mt-1 text-[10px]">*Chỉ mang tính chất tham khảo*</span>
                            </p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </span>
                    {med.instructions ? (
                      <span className="text-[0.8125rem] text-muted-foreground italic truncate">
                        • {med.instructions}
                      </span>
                    ) : (
                      <span className="text-[0.8125rem] text-muted-foreground/40 italic truncate">
                        • Không có cách dùng cụ thể
                      </span>
                    )}
                  </div>
                </div>
                
                <Button 
                  onClick={() => handleSaveToCabinet(med, i, showWarning)}
                  disabled={savedMedications.includes(finalName) || isSaving}
                  variant={savedMedications.includes(finalName) ? "secondary" : "outline"}
                  className={`gap-2 shrink-0 h-11 px-5 rounded-xl transition-all font-semibold ${savedMedications.includes(finalName) ? "bg-success/10 text-success border-transparent hover:bg-success/15" : "border-primary/20 hover:bg-primary/5 hover:border-primary/40 shadow-sm"}`}
                >
                  {savedMedications.includes(finalName) ? (
                    <><Check size={16} className="text-success" /> Đã lưu</>
                  ) : (
                    <><Save size={16} className="text-primary" /> Lưu tủ thuốc</>
                  )}
                </Button>
              </div>
            );
          })}
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

      {/* Confirmation Dialog for Low Confidence */}
      <AlertDialog open={!!pendingMed} onOpenChange={(open) => !open && setPendingMed(null)}>
        <AlertDialogContent className="rounded-2xl max-w-md">
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-destructive" /> Xác nhận tên thuốc
            </AlertDialogTitle>
            <AlertDialogDescription className="text-on-surface-variant pt-2">
              AI nhận diện ảnh này có độ tin cậy thấp cho thuốc <span className="font-bold text-foreground">"{pendingMed?.finalName}"</span>. 
              Bạn có chắc chắn đây là tên thuốc đúng trong đơn không?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="mt-4 gap-3">
            <AlertDialogCancel className="rounded-xl">Kiểm tra lại</AlertDialogCancel>
            <AlertDialogAction 
              onClick={() => pendingMed && confirmSaveToCabinet(pendingMed.med, pendingMed.index, pendingMed.finalName)}
              className="rounded-xl bg-primary text-primary-foreground hover:bg-primary/90"
            >
              Đúng, hãy lưu
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default ResultState;
