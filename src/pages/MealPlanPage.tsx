import { useState, useEffect } from "react";
import { ChevronLeft, Calendar, Utensils, Info, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";

interface Meal {
  type: string;
  food_id: string;
  name: string;
  image: string;
  benefits: string;
  reason: string;
}

interface DayPlan {
  day: string;
  meals: Meal[];
}

interface MealPlanResponse {
  meal_plan: DayPlan[];
}

interface MealPlanPageProps {
  diagnosis: string;
  recommendedFoods: string[];
  onBack: () => void;
}

const MealPlanPage = ({ diagnosis, recommendedFoods, onBack }: MealPlanPageProps) => {
  const [loading, setLoading] = useState(true);
  const [mealPlan, setMealPlan] = useState<DayPlan[] | null>(null);

  useEffect(() => {
    const fetchMealPlan = async () => {
      try {
        const response = await fetch('/api/generate-meal-plan', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ diagnosis, recommended_foods: recommendedFoods }),
        });

        if (!response.ok) throw new Error('Failed to generate meal plan');
        
        const data: MealPlanResponse = await response.json();
        setMealPlan(data.meal_plan);
      } catch (error) {
        console.error('Meal Plan Error:', error);
        toast.error('Không thể tạo thực đơn. Vui lòng thử lại sau.');
      } finally {
        setLoading(false);
      }
    };

    fetchMealPlan();
  }, [diagnosis, recommendedFoods]);

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

  if (!mealPlan) return null;

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

      {/* 3-Day Plan Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {mealPlan.map((day) => (
          <div key={day.day} className="space-y-6">
            <div className="bg-primary/5 border border-primary/20 p-3 rounded-xl text-center">
              <h3 className="font-bold text-primary text-lg">{day.day}</h3>
            </div>
            
            <div className="space-y-4">
              {day.meals.map((meal, idx) => (
                <Card key={idx} className="group border-none shadow-md hover:shadow-xl transition-all duration-300 rounded-2xl bg-card border-l-4 border-l-primary">
                  <CardContent className="p-6 space-y-4">
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="px-2 py-0.5 bg-primary/10 text-primary text-[10px] font-bold rounded-full uppercase tracking-wider">
                            {meal.type}
                          </span>
                        </div>
                        <h4 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                          {meal.name}
                        </h4>
                      </div>
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                         <Utensils className="w-6 h-6 text-primary" />
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-sm text-primary font-medium">
                         <CheckCircle2 className="w-4 h-4" />
                         <span>{meal.benefits}</span>
                      </div>
                      
                      <div className="p-4 bg-muted/50 rounded-xl border border-border/50">
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
