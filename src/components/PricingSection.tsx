import { Button } from "@/components/ui/button";
import { CheckCircle, Star, Gem } from "lucide-react";
import { useNavigate } from "react-router-dom";

const plans = [
  {
    name: "Miễn phí",
    price: "0₫",
    features: [
      "Quản lý tủ thuốc cơ bản",
      "Quét đơn thuốc AI giới hạn",
      "1 thành viên gia đình",
    ],
    highlight: false,
    cta: "Dùng thử ngay",
  },
  {
    name: "Cơ bản",
    price: "49.000₫/tháng",
    features: [
      "Tất cả tính năng miễn phí",
      "Quét đơn thuốc AI không giới hạn",
      "Theo dõi sức khỏe 24/7",
      "Thêm tối đa 5 thành viên",
    ],
    highlight: true,
    cta: "Đăng ký Cơ bản",
  },
  {
    name: "Cao cấp",
    price: "99.000₫/tháng",
    features: [
      "Tất cả tính năng Cơ bản",
      "Tư vấn bác sĩ trực tuyến",
      "Chia sẻ dữ liệu cho bác sĩ",
      "Không giới hạn thành viên",
    ],
    highlight: false,
    cta: "Đăng ký Cao cấp",
  },
];

export default function PricingSection() {
  const navigate = useNavigate();

  return (
    <section id="pricing" className="px-8 lg:px-16 py-20 surface-0 border-t">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <h2 className="text-3xl lg:text-[2.5rem] font-display font-bold text-foreground tracking-tight mb-3">Bảng giá dịch vụ</h2>
          <p className="text-on-surface-variant text-[0.875rem]">Chọn gói phù hợp cho gia đình bạn. Không phí ẩn, không ràng buộc.</p>
        </div>
        <div className="grid lg:grid-cols-3 gap-8">
          {plans.map((plan, idx) => (
            <div
              key={plan.name}
              className={`rounded-2xl p-8 shadow-patient flex flex-col items-center bg-white/90 border transition-all duration-300 ${
                plan.highlight
                  ? "border-primary scale-105 bg-primary/10 shadow-elevated"
                  : "border-border"
              }`}
            >
              <div className="mb-4">
                {plan.name === "Miễn phí" && <CheckCircle className="text-success w-8 h-8" />}
                {plan.name === "Cơ bản" && <Star className="text-primary w-8 h-8" />}
                {plan.name === "Cao cấp" && <Gem className="text-purple-600 w-8 h-8" />}
              </div>
              <h3 className="text-xl font-bold font-display mb-2 text-foreground">{plan.name}</h3>
              <div className="text-3xl font-extrabold text-primary mb-6">{plan.price}</div>
              <ul className="mb-8 space-y-2 text-on-surface-variant text-sm">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-center gap-2">
                    <span className="inline-block w-2 h-2 rounded-full bg-primary/60" />
                    {f}
                  </li>
                ))}
              </ul>
              <Button onClick={() => navigate("/login")} size="lg" className={`w-full rounded-full ${plan.highlight ? "bg-primary text-white hover:bg-primary/90" : ""}`}>
                {plan.cta}
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
