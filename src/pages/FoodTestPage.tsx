import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Loader2, RefreshCw, CheckCircle2, Utensils } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Food {
  id: string;
  name: string;
  image: string;
  benefits: string;
}

const FoodTestPage = () => {
  const [foods, setFoods] = useState<Food[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchFoods = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:3001/api/foods");
      const data = await response.json();
      setFoods(data);
    } catch (error) {
      console.error("Error fetching foods:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFoods();
  }, []);

  return (
    <div className="p-8 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex items-center justify-between border-b pb-6">
        <div>
          <h1 className="text-3xl font-bold text-primary tracking-tight">Kiểm tra Kho Dinh dưỡng</h1>
          <p className="text-muted-foreground mt-1 text-lg">
            Duyệt qua tất cả các món ăn trong kho dữ liệu để kiểm tra hình ảnh và nội dung.
          </p>
        </div>
        <Button onClick={fetchFoods} className="rounded-full shadow-lg hover:scale-105 transition-all">
          <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
          Tải lại dữ liệu
        </Button>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
          <Loader2 className="w-10 h-10 text-primary animate-spin" />
          <p className="text-muted-foreground font-medium">Đang tải danh mục món ăn...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {foods.map((food) => (
            <Card key={food.id} className="group border-none shadow-md hover:shadow-xl transition-all duration-300 rounded-2xl bg-card border-t-4 border-t-primary">
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <Badge variant="outline" className="text-[10px] font-bold">
                    ID: {food.id}
                  </Badge>
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Utensils className="w-5 h-5 text-primary" />
                  </div>
                </div>
                
                <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                  {food.name}
                </h3>
                
                <div className="p-3 rounded-xl bg-primary/5 border border-primary/10 text-sm italic">
                  🌟 {food.benefits}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {!loading && foods.length === 0 && (
        <div className="text-center py-20 bg-muted/20 rounded-3xl border-2 border-dashed border-muted">
          <p className="text-muted-foreground text-lg">Không tìm thấy món ăn nào trong kho dữ liệu.</p>
        </div>
      )}
    </div>
  );
};

export default FoodTestPage;
