import { useState, useEffect } from "react";
import { ChevronLeft, Calendar, Utensils, Info, CheckCircle2, RefreshCw, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";

interface Macros {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

interface Meal {
  type: string;
  food_id: string;
  name: string;
  image: string;
  benefits: string;
  reason: string;
  macros?: Macros;
  alternatives?: Meal[];
}

interface DayPlan {
  day: string;
  meals: Meal[];
}

interface MealPlanResponse {
  meal_plan: DayPlan[];
  general_dietary_advice?: string[];
}

interface MealPlanPageProps {
  diagnosis?: string;
  recommendedFoods?: string[];
  onBack?: () => void;
}

const MealPlanPage = ({ diagnosis, recommendedFoods = [], onBack }: MealPlanPageProps) => {
  const [loading, setLoading] = useState(false);
  const [mealPlan, setMealPlan] = useState<DayPlan[] | null>(null);
  const [dietaryAdvice, setDietaryAdvice] = useState<string[]>([]);
  const [currentDiagnosis, setCurrentDiagnosis] = useState(diagnosis || "");
  const [inputValue, setInputValue] = useState(diagnosis || "");

  const fetchMealPlan = async (diag: string) => {
    if (!diag) return;
    setLoading(true);
    try {
      const response = await fetch('/api/generate-meal-plan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ diagnosis: diag, recommended_foods: recommendedFoods }),
      });

      if (!response.ok) throw new Error('Failed to generate meal plan');
      
      const data: MealPlanResponse = await response.json();
      setMealPlan(data.meal_plan);
      if (data.general_dietary_advice) {
        setDietaryAdvice(data.general_dietary_advice);
      }
    } catch (error) {
      console.error('Meal Plan Error:', error);
      toast.error('Không thể tạo thực đơn. Vui lòng thử lại sau.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (currentDiagnosis) {
      fetchMealPlan(currentDiagnosis);
    }
  }, []);

  const handleGenerate = () => {
    if (!inputValue.trim()) {
      toast.error("Vui lòng nhập chẩn đoán/tình trạng bệnh.");
      return;
    }
    setCurrentDiagnosis(inputValue);
    fetchMealPlan(inputValue);
  };

  const handleSwapMeal = (dayIdx: number, mealIdx: number) => {
    if (!mealPlan) return;
    const newMealPlan = [...mealPlan];
    const day = newMealPlan[dayIdx];
    const meal = day.meals[mealIdx];

    if (meal.alternatives && meal.alternatives.length > 0) {
      // Pick the first alternative and swap it with the current meal, then put the current meal into alternatives
      const alternatives = [...meal.alternatives];
      const altMeal = alternatives.shift()!;
      
      const newMeal = {
        ...altMeal,
        alternatives: [...alternatives, { ...meal, alternatives: undefined }]
      };
      
      day.meals[mealIdx] = newMeal;
      setMealPlan(newMealPlan);
      toast.success("Đã đổi món thành công!");
    }
  };

  if (loading) {
    return (
      <div className="max-w-5xl mx-auto space-y-8 p-10 animate-fade-up">
        <div className="flex items-center gap-4">
          <Skeleton className="h-10 w-10 rounded-full" />
          <Skeleton className="h-10 w-64" />
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-[300px] rounded-2xl" />
          ))}
        </div>
      </div>
    );
  }

  if (!mealPlan) {
    return (
      <div className="max-w-3xl mx-auto space-y-8 p-10 animate-fade-up min-h-[60vh] flex flex-col justify-center">
        {onBack && (
          <Button variant="ghost" className="self-start -ml-4" onClick={onBack}>
            <ChevronLeft size={20} className="mr-2" /> Quay lại
          </Button>
        )}
        <div className="space-y-4 text-center">
          <Utensils className="w-16 h-16 text-primary mx-auto mb-6 opacity-80" />
          <h2 className="text-3xl font-bold tracking-tight text-foreground">Tạo Thực đơn Dinh dưỡng</h2>
          <p className="text-muted-foreground text-lg">
            Nhập chẩn đoán hoặc tình trạng sức khỏe của bạn để hệ thống có thể gợi ý thực đơn phù hợp nhất cho bạn.
          </p>
        </div>
        
        <div className="flex gap-3 max-w-xl mx-auto w-full mt-8">
          <Input 
            className="flex-1 h-12 text-lg rounded-xl"
            placeholder="VD: Tiểu đường type 2, Máu nhiễm mỡ..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleGenerate()}
          />
          <Button onClick={handleGenerate} size="lg" className="rounded-xl h-12 px-8 font-semibold">
            Tạo thực đơn
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-10 p-10 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-32">
      {/* Header */}
      <div className="flex items-center justify-between border-b pb-6">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" onClick={onBack} className="rounded-full hover:bg-primary hover:text-white transition-all">
            <ChevronLeft size={20} />
          </Button>
          <div>
            <h2 className="text-3xl font-bold text-primary tracking-tight">Gợi ý Dinh dưỡng</h2>
            <p className="text-muted-foreground flex items-center gap-2 mt-1">
              <Calendar size={14} /> Chế độ ăn dành cho: <span className="font-bold text-foreground">{diagnosis}</span>
            </p>
          </div>
        </div>
      </div>

      {dietaryAdvice && dietaryAdvice.length > 0 && (
        <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900 rounded-2xl p-6 shadow-sm">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-amber-100 dark:bg-amber-900/50 flex items-center justify-center shrink-0">
              <AlertTriangle className="w-6 h-6 text-amber-600 dark:text-amber-500" />
            </div>
            <div className="space-y-3 flex-1 pt-1">
              <h3 className="text-lg font-bold text-amber-800 dark:text-amber-500">
                Cảnh báo & Lời khuyên Dinh dưỡng
              </h3>
              <ul className="space-y-2">
                {dietaryAdvice.map((advice, index) => (
                  <li key={index} className="flex items-start gap-2 text-amber-900/80 dark:text-amber-200/80 text-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0" />
                    <span className="leading-relaxed">{advice}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* 3-Day Plan Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {mealPlan.map((day, dayIdx) => (
          <div key={day.day} className="space-y-6">
            <div className="bg-primary/5 border border-primary/20 p-3 rounded-xl text-center">
              <h3 className="font-bold text-primary text-lg">{day.day}</h3>
            </div>
            
            <div className="space-y-4">
              {day.meals.map((meal, idx) => (
                <Card key={idx} className="group border-none shadow-md hover:shadow-xl transition-all duration-300 rounded-2xl bg-card border-l-4 border-l-primary flex flex-col relative overflow-hidden">
                  <CardContent className="p-6 space-y-5 flex-1 flex flex-col">
                    <div className="flex items-start justify-between gap-2">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="px-2 py-0.5 bg-primary/10 text-primary text-[10px] font-bold rounded-full uppercase tracking-wider">
                            {meal.type}
                          </span>
                        </div>
                        <h4 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors leading-tight">
                          {meal.name}
                        </h4>
                      </div>
                      {meal.alternatives && meal.alternatives.length > 0 ? (
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="shrink-0 h-8 gap-1.5 px-2 bg-background hover:bg-primary/10 hover:text-primary rounded-lg text-xs font-semibold"
                          onClick={() => handleSwapMeal(dayIdx, idx)}
                          title="Đổi món ăn tương đương"
                        >
                          <RefreshCw size={14} /> <span className="hidden sm:inline">Đổi món</span>
                        </Button>
                      ) : (
                        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                           <Utensils className="w-5 h-5 text-primary" />
                        </div>
                      )}
                    </div>

                    {meal.macros && (
                      <div className="grid grid-cols-4 gap-2 pt-2 pb-1 border-t border-border">
                        <div className="flex flex-col items-center p-2 rounded-lg bg-red-50 dark:bg-red-950/20 text-red-600 dark:text-red-400">
                           <span className="text-xs font-medium uppercase opacity-70">Kcal</span>
                           <span className="text-sm font-bold">{meal.macros.calories}</span>
                        </div>
                        <div className="flex flex-col items-center p-2 rounded-lg bg-blue-50 dark:bg-blue-950/20 text-blue-600 dark:text-blue-400">
                           <span className="text-xs font-medium uppercase opacity-70">Protein</span>
                           <span className="text-sm font-bold">{meal.macros.protein}g</span>
                        </div>
                        <div className="flex flex-col items-center p-2 rounded-lg bg-green-50 dark:bg-green-950/20 text-green-600 dark:text-green-400">
                           <span className="text-xs font-medium uppercase opacity-70">Carbs</span>
                           <span className="text-sm font-bold">{meal.macros.carbs}g</span>
                        </div>
                        <div className="flex flex-col items-center p-2 rounded-lg bg-orange-50 dark:bg-orange-950/20 text-orange-600 dark:text-orange-400">
                           <span className="text-xs font-medium uppercase opacity-70">Fat</span>
                           <span className="text-sm font-bold">{meal.macros.fat}g</span>
                        </div>
                      </div>
                    )}

                    <div className="space-y-3 flex-1 flex flex-col justify-end">
                      <div className="flex items-start gap-2 text-sm text-primary font-medium mt-1">
                         <CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0" />
                         <span className="leading-snug">{meal.benefits}</span>
                      </div>
                      
                      <div className="p-3 bg-muted/50 rounded-xl border border-border/50">
                        <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider mb-1">Tại sao nên dùng:</p>
                        <p className="text-sm text-foreground italic leading-relaxed">
                          "{meal.reason}"
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Professional Advice */}
      <div className="p-8 rounded-3xl bg-primary/5 border border-primary/10 flex flex-col md:flex-row items-center gap-6 shadow-sm overflow-hidden relative">
        <div className="absolute -right-10 -bottom-10 opacity-5">
           <Utensils size={200} />
        </div>
        <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0">
          <Info size={32} className="text-primary" />
        </div>
        <div className="space-y-2 flex-1 relative z-10">
          <h5 className="font-bold text-foreground text-xl">Lời khuyên Dinh dưỡng chuyên sâu</h5>
          <p className="text-muted-foreground leading-relaxed">
            Danh sách này được chọn lọc kỹ càng dựa trên bệnh lý <strong>{diagnosis}</strong> của bạn. 
            Ngoài việc ăn uống đúng thực đơn, vui lòng đảm bảo uống đủ nước và duy trì thói quen ngủ nghỉ điều độ để nhanh chóng phục hồi sức khỏe.
          </p>
        </div>
      </div>
    </div>
  );
};

export default MealPlanPage;
