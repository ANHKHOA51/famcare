import { mockAiResponse } from "@/data/mockAiResponse";
import { CheckCircle2, AlertTriangle, Pill, Utensils, RotateCcw, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ResultStateProps {
  onReset: () => void;
}

const ResultState = ({ onReset }: ResultStateProps) => {
  const { patient, medications, nutriHealthPlan, expertNotes } = mockAiResponse;

  return (
    <div className="animate-fade-up space-y-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-[2rem] font-display font-bold text-foreground tracking-tight">Kết quả phân tích</h2>
          <p className="text-on-surface-variant text-[0.875rem] mt-1.5">
            Bệnh nhân: {patient.name} · Chẩn đoán: <span className="font-semibold text-foreground">{patient.diagnosis}</span>
          </p>
        </div>
        <Button variant="outline" onClick={onReset} className="gap-2">
          <RotateCcw size={14} />
          Quét lại
        </Button>
      </div>

      {/* Medications — surface-2 card on surface-0 background */}
      <div className="surface-2 rounded-2xl p-8 shadow-patient">
        <div className="flex items-center gap-2.5 mb-6">
          <Pill size={20} className="text-primary" />
          <h3 className="text-lg font-semibold font-display text-foreground">Thuốc được kê</h3>
        </div>
        <div className="space-y-3">
          {medications.map((med, i) => (
            <div key={i} className="flex items-start gap-4 p-5 surface-1 rounded-xl transition-colors duration-200 hover:surface-2 hover:shadow-patient">
              <div className="w-11 h-11 rounded-xl bg-primary/8 flex items-center justify-center shrink-0">
                <Pill size={18} className="text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-foreground">{med.name}</p>
                <p className="text-[0.8125rem] text-on-surface-variant mt-0.5">{med.dosage} · {med.frequency}</p>
              </div>
              <span className="text-[0.6875rem] bg-primary/8 text-primary px-3 py-1 rounded-full font-medium whitespace-nowrap">{med.purpose}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Nutrition Plan */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Recommended */}
        <div className="surface-2 rounded-2xl p-8 shadow-patient">
          <div className="flex items-center gap-2.5 mb-6">
            <Utensils size={20} className="text-success" />
            <h3 className="text-lg font-semibold font-display text-foreground">Nên ăn</h3>
          </div>
          <div className="space-y-2.5">
            {nutriHealthPlan.recommended.map((item, i) => (
              <div key={i} className="flex items-center gap-4 p-4 rounded-xl bg-success-container/50 transition-colors duration-200 hover:bg-success-container">
                <span className="text-2xl">{item.icon}</span>
                <div className="flex-1">
                  <p className="font-medium text-foreground text-[0.875rem]">{item.name}</p>
                  <p className="text-[0.6875rem] text-on-surface-variant mt-0.5">{item.reason}</p>
                </div>
                <CheckCircle2 size={18} className="text-success shrink-0" />
              </div>
            ))}
          </div>
        </div>

        {/* Avoid */}
        <div className="surface-2 rounded-2xl p-8 shadow-patient">
          <div className="flex items-center gap-2.5 mb-6">
            <AlertTriangle size={20} className="text-destructive" />
            <h3 className="text-lg font-semibold font-display text-foreground">Nên tránh</h3>
          </div>
          <div className="space-y-2.5">
            {nutriHealthPlan.avoid.map((item, i) => (
              <div key={i} className="flex items-center gap-4 p-4 rounded-xl bg-destructive/5 transition-colors duration-200 hover:bg-destructive/8">
                <span className="text-2xl">{item.icon}</span>
                <div className="flex-1">
                  <p className="font-medium text-foreground text-[0.875rem]">{item.name}</p>
                  <p className="text-[0.6875rem] text-on-surface-variant mt-0.5">{item.reason}</p>
                </div>
                <AlertTriangle size={18} className="text-destructive shrink-0" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Expert Notes — tertiary tonal */}
      <div className="bg-tertiary/5 rounded-2xl p-8">
        <div className="flex items-center gap-2.5 mb-6">
          <BookOpen size={20} className="text-tertiary" />
          <h3 className="text-lg font-semibold font-display text-foreground">Lưu ý chuyên gia</h3>
        </div>
        <div className="space-y-4">
          {expertNotes.map((note, i) => (
            <div key={i} className="flex items-start gap-4">
              <div className="w-1 min-h-[44px] rounded-full bg-tertiary shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-foreground">{note.title}</p>
                <p className="text-[0.8125rem] text-on-surface-variant mt-1 leading-relaxed">{note.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ResultState;
