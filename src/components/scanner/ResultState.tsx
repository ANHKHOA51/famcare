import { mockAiResponse } from "@/data/mockAiResponse";
import { CheckCircle2, AlertTriangle, Pill, Utensils, ClipboardList, RotateCcw, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ResultStateProps {
  onReset: () => void;
}

const ResultState = ({ onReset }: ResultStateProps) => {
  const { patient, medications, nutriHealthPlan, expertNotes } = mockAiResponse;

  return (
    <div className="animate-fade-in space-y-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-heading font-bold text-foreground">Kết quả phân tích</h2>
          <p className="text-muted-foreground mt-1">Bệnh nhân: {patient.name} · Chẩn đoán: <span className="font-semibold text-foreground">{patient.diagnosis}</span></p>
        </div>
        <Button variant="outline" onClick={onReset} className="gap-2">
          <RotateCcw size={14} />
          Quét lại
        </Button>
      </div>

      {/* Medications */}
      <div className="bg-card rounded-2xl border border-border p-6">
        <div className="flex items-center gap-2 mb-4">
          <Pill size={20} className="text-accent" />
          <h3 className="text-lg font-semibold font-body text-foreground">Thuốc được kê</h3>
        </div>
        <div className="grid gap-3">
          {medications.map((med, i) => (
            <div key={i} className="flex items-start gap-4 p-4 bg-secondary/50 rounded-xl">
              <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
                <Pill size={18} className="text-accent" />
              </div>
              <div className="flex-1">
                <p className="font-semibold text-foreground">{med.name}</p>
                <p className="text-sm text-muted-foreground">{med.dosage} · {med.frequency}</p>
              </div>
              <span className="text-xs bg-accent/10 text-accent px-3 py-1 rounded-full font-medium">{med.purpose}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Nutrition Plan */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-card rounded-2xl border border-border p-6">
          <div className="flex items-center gap-2 mb-4">
            <Utensils size={20} className="text-success" />
            <h3 className="text-lg font-semibold font-body text-foreground">Nên ăn</h3>
          </div>
          <div className="space-y-3">
            {nutriHealthPlan.recommended.map((item, i) => (
              <div key={i} className="flex items-center gap-3 p-3 bg-success/5 rounded-xl">
                <span className="text-2xl">{item.icon}</span>
                <div className="flex-1">
                  <p className="font-medium text-foreground">{item.name}</p>
                  <p className="text-xs text-muted-foreground">{item.reason}</p>
                </div>
                <CheckCircle2 size={18} className="text-success shrink-0" />
              </div>
            ))}
          </div>
        </div>

        <div className="bg-card rounded-2xl border border-border p-6">
          <div className="flex items-center gap-2 mb-4">
            <AlertTriangle size={20} className="text-destructive" />
            <h3 className="text-lg font-semibold font-body text-foreground">Nên tránh</h3>
          </div>
          <div className="space-y-3">
            {nutriHealthPlan.avoid.map((item, i) => (
              <div key={i} className="flex items-center gap-3 p-3 bg-destructive/5 rounded-xl">
                <span className="text-2xl">{item.icon}</span>
                <div className="flex-1">
                  <p className="font-medium text-foreground">{item.name}</p>
                  <p className="text-xs text-muted-foreground">{item.reason}</p>
                </div>
                <AlertTriangle size={18} className="text-destructive shrink-0" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Expert Notes */}
      <div className="bg-brand-warm/5 border border-brand-warm/20 rounded-2xl p-6">
        <div className="flex items-center gap-2 mb-4">
          <BookOpen size={20} className="text-brand-warm" />
          <h3 className="text-lg font-semibold font-body text-foreground">Lưu ý chuyên gia</h3>
        </div>
        <div className="space-y-3">
          {expertNotes.map((note, i) => (
            <div key={i} className="flex items-start gap-3">
              <div className="w-1 h-full min-h-[40px] bg-brand-warm rounded-full shrink-0" />
              <div>
                <p className="font-semibold text-foreground">{note.title}</p>
                <p className="text-sm text-muted-foreground">{note.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ResultState;
