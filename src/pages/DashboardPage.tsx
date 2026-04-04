import { Heart, Activity, Wind, AlertTriangle, CheckCircle2, Footprints } from "lucide-react";

const vitals = [
  { label: "Nhịp tim", value: "78", unit: "BPM", status: "Ổn định", statusClass: "bg-success-container text-success-on-container", icon: Heart },
  { label: "Huyết áp", value: "135/85", unit: "mmHg", status: "Hơi cao", statusClass: "bg-warning/10 text-warning", icon: Activity },
  { label: "Chỉ số SpO2", value: "98", unit: "%", status: "Tốt", statusClass: "bg-success-container text-success-on-container", icon: Wind },
];

const activities = [
  { icon: CheckCircle2, color: "text-success", title: "Uống thuốc buổi sáng", time: "07:00 · Glucophage 500mg" },
  { icon: Footprints, color: "text-primary", title: "Đi bộ nhẹ nhàng", time: "06:15 · 1,500 bước (20 phút)" },
  { icon: Activity, color: "text-destructive", title: "Cập nhật huyết áp", time: "08:30 · 135/85 mmHg" },
];

const DashboardPage = () => {
  return (
    <div className="p-10 animate-fade-up">
      {/* Header */}
      <div className="mb-10">
        <h2 className="text-[2rem] font-display font-bold text-foreground tracking-tight">
          Sức khỏe của người thân
        </h2>
        <p className="text-on-surface-variant text-[0.875rem] mt-1.5 leading-relaxed">
          Chào bạn, các chỉ số sinh tồn hiện tại đang được theo dõi trực tiếp. Mọi thứ đều trong tầm kiểm soát.
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8 mb-8">
        {/* Vitals */}
        <div className="lg:col-span-2 grid sm:grid-cols-3 gap-4">
          {vitals.map((v, i) => (
            <div key={i} className="surface-2 rounded-2xl p-6 shadow-patient transition-shadow duration-300 hover:shadow-elevated">
              <div className="flex items-center justify-between mb-4">
                <v.icon size={20} className="text-primary" />
                <span className={`text-[0.6875rem] font-semibold px-2.5 py-1 rounded-full ${v.statusClass}`}>{v.status}</span>
              </div>
              <p className="text-[0.6875rem] text-on-surface-variant uppercase tracking-wider">{v.label}</p>
              <p className="text-[2.25rem] font-bold text-foreground font-display leading-none mt-1">
                {v.value} <span className="text-sm font-normal text-on-surface-variant">{v.unit}</span>
              </p>
            </div>
          ))}
        </div>

        {/* Health Alerts — Tertiary treatment */}
        <div className="bg-tertiary rounded-2xl p-6 text-tertiary-foreground">
          <div className="flex items-center justify-between mb-5">
            <AlertTriangle size={20} />
            <span className="text-[0.6875rem] font-bold bg-tertiary-foreground/20 px-3 py-1 rounded-full uppercase tracking-wider">Khẩn cấp</span>
          </div>
          <h3 className="text-[1.25rem] font-display font-bold mb-4">Cảnh báo sức khỏe</h3>
          <div className="space-y-3">
            <div className="bg-tertiary-foreground/10 rounded-xl p-4">
              <p className="font-semibold text-sm">Huyết áp cao</p>
              <p className="text-[0.75rem] opacity-75 mt-1 leading-relaxed">Vượt ngưỡng 140/90 lúc 08:30 sáng nay. Cần theo dõi thêm.</p>
            </div>
            <div className="bg-tertiary-foreground/10 rounded-xl p-4">
              <p className="font-semibold text-sm">Bỏ lỡ bữa trưa</p>
              <p className="text-[0.75rem] opacity-75 mt-1 leading-relaxed">Cảm biến tủ lạnh không ghi nhận hoạt động. Vui lòng kiểm tra.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Heart Rate Chart — tonal surface shift */}
      <div className="surface-2 rounded-2xl p-8 shadow-patient mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-[1.125rem] font-display font-semibold text-foreground">Biểu đồ nhịp tim 24h</h3>
            <p className="text-[0.8125rem] text-on-surface-variant mt-1">Theo dõi thời gian thực đồng bộ từ thiết bị đeo</p>
          </div>
          <div className="flex gap-1 surface-1 rounded-xl p-1">
            {["Giờ", "Ngày", "Tuần"].map((t) => (
              <button
                key={t}
                className={`px-4 py-1.5 text-[0.75rem] rounded-lg font-medium transition-all duration-200 ${
                  t === "Giờ" ? "surface-2 text-foreground shadow-patient" : "text-on-surface-variant hover:text-foreground"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
        <div className="h-52 flex items-end gap-2.5 px-4">
          {[40, 35, 30, 45, 38, 65, 50, 42, 55, 70, 48, 36].map((h, i) => (
            <div
              key={i}
              className="flex-1 bg-primary/12 rounded-t-md hover:bg-primary/25 transition-colors duration-200"
              style={{ height: `${h}%` }}
            />
          ))}
        </div>
        <div className="flex justify-between mt-3 px-4 text-[0.6875rem] text-on-surface-variant">
          {["00:00", "06:00", "12:00", "18:00", "HIỆN TẠI"].map((t) => <span key={t}>{t}</span>)}
        </div>
      </div>

      {/* Recent Activities */}
      <div className="surface-2 rounded-2xl p-8 shadow-patient">
        <h3 className="text-[1.125rem] font-display font-semibold text-foreground mb-6">Hoạt động gần đây</h3>
        <div className="space-y-1">
          {activities.map((a, i) => (
            <div key={i} className="flex items-center gap-4 p-4 rounded-xl transition-colors duration-200 hover:surface-1">
              <a.icon size={18} className={a.color} />
              <div>
                <p className="font-medium text-foreground text-[0.875rem]">{a.title}</p>
                <p className="text-[0.75rem] text-on-surface-variant mt-0.5">{a.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
