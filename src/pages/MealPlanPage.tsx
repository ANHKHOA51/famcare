import { useState, useEffect } from "react";
import { ChevronLeft, Calendar, Utensils, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";

interface Meal {
  type: string;
  dish_name_vi: string;
  search_keyword_en: string;
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
        const response = await fetch('http://localhost:3001/api/generate-meal-plan', {
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
      <div className="max-w-5xl mx-auto space-y-8 animate-fade-up">
        <div className="flex items-center gap-4">
          <Skeleton className="h-10 w-10 rounded-full" />
          <Skeleton className="h-10 w-64" />
        </div>
        <div className="space-y-4">
          <Skeleton className="h-12 w-full max-w-2xl rounded-xl" />
          <div className="grid md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-[400px] rounded-2xl" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!mealPlan) return null;

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-fade-up pb-20">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={onBack} className="rounded-full">
            <ChevronLeft size={24} />
          </Button>
          <div>
            <h2 className="text-3xl font-display font-bold text-foreground tracking-tight">Thực đơn 7 ngày</h2>
            <p className="text-on-surface-variant flex items-center gap-2 mt-1">
              <Calendar size={14} /> Dành cho: <span className="font-semibold text-primary">{diagnosis}</span>
            </p>
          </div>
        </div>
      </div>

      <Tabs defaultValue={mealPlan[0].day} className="w-full">
        <TabsList className="w-full justify-start overflow-x-auto h-auto p-1 bg-surface-2 rounded-xl mb-8 no-scrollbar flex-nowrap">
          {mealPlan.map((day) => (
            <TabsTrigger 
              key={day.day} 
              value={day.day}
              className="px-6 py-3 rounded-lg data-[state=active]:bg-primary data-[state=active]:text-white transition-all duration-300"
            >
              {day.day}
            </TabsTrigger>
          ))}
        </TabsList>

        {mealPlan.map((day) => (
          <TabsContent key={day.day} value={day.day} className="animate-fade-in mt-0">
            <div className="grid md:grid-cols-3 gap-6">
              {day.meals.map((meal, idx) => (
                <Card key={idx} className="overflow-hidden border-none surface-2 shadow-patient hover:shadow-elevated transition-all duration-300 group rounded-2xl">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img 
                      src={`https://image.pollinations.ai/prompt/${encodeURIComponent(meal.search_keyword_en + " professional food photography hyperrealistic healthy") }?width=600&height=450&nologo=true&seed=${idx + day.day.length}`} 
                      alt={meal.dish_name_vi}
                      className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110"
                      onError={(e) => {
                         (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&auto=format&fit=crop&q=60";
                      }}
                    />
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-white/90 backdrop-blur text-primary text-[0.75rem] font-bold rounded-full shadow-sm">
                        {meal.type}
                      </span>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <h4 className="text-lg font-semibold text-foreground leading-tight min-h-[3.5rem] flex items-center">
                      {meal.dish_name_vi}
                    </h4>
                    <div className="mt-4 pt-4 border-t border-border/50 flex items-center justify-between text-on-surface-variant">
                      <div className="flex items-center gap-1.5 text-[0.8125rem]">
                        <Utensils size={14} className="text-primary" />
                        <span>Dinh dưỡng cao</span>
                      </div>
                      <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                        <Info size={14} />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>

      {/* Advice Section */}
      <div className="p-8 rounded-3xl bg-secondary/30 border border-secondary/20 flex flex-col md:flex-row items-center gap-6">
        <div className="w-16 h-16 rounded-2xl bg-white flex items-center justify-center shrink-0 shadow-sm">
          <Utensils size={32} className="text-primary" />
        </div>
        <div className="space-y-1 text-center md:text-left">
          <h5 className="font-bold text-foreground text-lg">Lời khuyên từ chuyên gia dinh dưỡng</h5>
          <p className="text-on-surface-variant max-w-2xl leading-relaxed">
            Thực đơn này được thiết kế để hỗ trợ quá trình điều trị <strong>{diagnosis}</strong>. 
            Hãy đảm bảo uống đủ 2 lít nước mỗi ngày và kết hợp vận động nhẹ nhàng để đạt hiệu quả tốt nhất.
          </p>
        </div>
      </div>
    </div>
  );
};

export default MealPlanPage;
