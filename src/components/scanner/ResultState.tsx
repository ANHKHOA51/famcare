import { CheckCircle2, AlertTriangle, Pill, Utensils, RotateCcw, BookOpen, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScanResult } from "@/pages/ScannerPage";

interface ResultStateProps {
  result: ScanResult;
  onReset: () => void;
  onGenerateMealPlan: () => void;
}

const ResultState = ({ result, onReset, onGenerateMealPlan }: ResultStateProps) => {
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
        <div className="flex items-center gap-2.5 mb-6">
          <Pill size={20} className="text-primary" />
          <h3 className="text-lg font-semibold font-display text-foreground">Đơn thuốc của bạn</h3>
        </div>
        <div className="space-y-3">
          {result.medications.map((med, i) => (
            <div key={i} className="flex items-start gap-4 p-5 surface-1 rounded-xl transition-colors duration-200 hover:surface-2 hover:shadow-patient">
              <div className="w-11 h-11 rounded-xl bg-primary/8 flex items-center justify-center shrink-0">
                <Pill size={18} className="text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-foreground">{med.name}</p>
                <p className="text-[0.8125rem] text-on-surface-variant mt-0.5">{med.dosage}</p>
              </div>
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
            <h3 className="text-lg font-semibold font-display text-foreground">Thực phẩm nên ăn</h3>
          </div>
          <div className="space-y-2.5">
            {result.nutrition.recommended_foods.map((item, i) => (
              <div key={i} className="flex items-center gap-4 p-4 rounded-xl bg-success-container/50 transition-colors duration-200 hover:bg-success-container">
                <div className="w-8 h-8 rounded-full bg-success/10 flex items-center justify-center shrink-0">
                  <CheckCircle2 size={16} className="text-success" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-foreground text-[0.875rem]">{item}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Avoid */}
        <div className="surface-2 rounded-2xl p-8 shadow-patient">
          <div className="flex items-center gap-2.5 mb-6">
            <AlertTriangle size={20} className="text-destructive" />
            <h3 className="text-lg font-semibold font-display text-foreground">Thực phẩm nên tránh</h3>
          </div>
          <div className="space-y-2.5">
            {result.nutrition.foods_to_avoid.map((item, i) => (
              <div key={i} className="flex items-center gap-4 p-4 rounded-xl bg-destructive/5 transition-colors duration-200 hover:bg-destructive/8">
                <div className="w-8 h-8 rounded-full bg-destructive/10 flex items-center justify-center shrink-0">
                  <AlertTriangle size={16} className="text-destructive" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-foreground text-[0.875rem]">{item}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Action CTA */}
      <div className="flex justify-center pt-4">
        <Button 
          size="lg" 
          className="h-14 px-10 rounded-full text-lg shadow-elevated gap-3 animate-pulse-ring"
          onClick={onGenerateMealPlan}
        >
          <Sparkles size={20} />
          Tạo thực đơn 7 ngày
        </Button>
      </div>

      {/* Expert Note Disclaimer */}
      <div className="bg-primary/5 rounded-2xl p-8">
        <div className="flex items-center gap-2.5 mb-4">
          <BookOpen size={20} className="text-primary" />
          <h3 className="text-lg font-semibold font-display text-foreground">Lưu ý quan trọng</h3>
        </div>
        <p className="text-[0.875rem] text-on-surface-variant leading-relaxed">
          Kết quả này được tạo bởi Trí tuệ nhân tạo (AI) dựa trên hình ảnh đơn thuốc bạn cung cấp.
          Thông tin dinh dưỡng chỉ mang tính chất tham khảo. Vui lòng tham khảo ý kiến bác sĩ hoặc chuyên gia dinh dưỡng trước khi thay đổi chế độ ăn uống của bạn.
        </p>
      </div>
    </div>
  );
};

export default ResultState;
