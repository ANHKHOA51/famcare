import { Heart, Activity, Wind, AlertTriangle, CheckCircle2, Footprints, Pill } from "lucide-react";

const vitals = [
  { label: "Nhịp tim", value: "78", unit: "BPM", status: "Ổn định", statusColor: "bg-success/10 text-success", icon: Heart },
  { label: "Huyết áp", value: "135/85", unit: "mmHg", status: "Hơi cao", statusColor: "bg-warning/10 text-warning", icon: Activity },
  { label: "Chỉ số SpO2", value: "98", unit: "%", status: "Tốt", statusColor: "bg-success/10 text-success", icon: Wind },
];

const activities = [
  { icon: CheckCircle2, color: "text-success", title: "Uống thuốc buổi sáng", time: "07:00 · Glucophage 500mg" },
  { icon: Footprints, color: "text-accent", title: "Đi bộ nhẹ nhàng", time: "06:15 · 1,500 bước (20 phút)" },
  { icon: Activity, color: "text-destructive", title: "Cập nhật huyết áp", time: "08:30 · 135/85 mmHg" },
];

const DashboardPage = () => {
  return (
    <div className="p-8 animate-fade-in">
      <div className="mb-8">
        <h2 className="text-3xl font-heading font-bold text-foreground">Sức khỏe của người thân</h2>
        <p className="text-muted-foreground mt-1">Chào bạn, các chỉ số sinh tồn hiện tại đang được theo dõi trực tiếp.</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6 mb-8">
        {/* Vitals */}
        <div className="lg:col-span-2 grid sm:grid-cols-3 gap-4">
          {vitals.map((v, i) => (
            <div key={i} className="bg-card rounded-2xl border border-border p-5">
              <div className="flex items-center justify-between mb-3">
                <v.icon size={20} className="text-accent" />
                <span className={`text-xs font-medium px-2 py-1 rounded-full ${v.statusColor}`}>{v.status}</span>
              </div>
              <p className="text-xs text-muted-foreground">{v.label}</p>
              <p className="text-3xl font-bold text-foreground">{v.value} <span className="text-sm font-normal text-muted-foreground">{v.unit}</span></p>
            </div>
          ))}
        </div>

        {/* Health Alerts */}
        <div className="bg-brand-warm rounded-2xl p-5 text-brand-warm-foreground">
          <div className="flex items-center justify-between mb-4">
            <AlertTriangle size={20} />
            <span className="text-xs font-semibold bg-brand-warm-foreground/20 px-2 py-1 rounded-full">KHẨN CẤP</span>
          </div>
          <h3 className="text-lg font-semibold mb-3">Cảnh báo sức khỏe</h3>
          <div className="space-y-3">
            <div className="bg-brand-warm-foreground/10 rounded-xl p-3">
              <p className="font-semibold text-sm">Huyết áp cao</p>
              <p className="text-xs opacity-80">Vượt ngưỡng 140/90 lúc 08:30 sáng nay.</p>
            </div>
            <div className="bg-brand-warm-foreground/10 rounded-xl p-3">
              <p className="font-semibold text-sm">Bỏ lỡ bữa trưa</p>
              <p className="text-xs opacity-80">Cảm biến tủ lạnh không ghi nhận hoạt động.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Heart Rate Chart Placeholder */}
      <div className="bg-card rounded-2xl border border-border p-6 mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold font-body text-foreground">Biểu đồ nhịp tim 24h</h3>
            <p className="text-sm text-muted-foreground">Theo dõi thời gian thực đồng bộ từ thiết bị đeo</p>
          </div>
          <div className="flex gap-1 bg-muted rounded-lg p-1">
            {["Giờ", "Ngày", "Tuần"].map((t) => (
              <button key={t} className={`px-3 py-1 text-xs rounded-md font-medium ${t === "Giờ" ? "bg-card text-foreground shadow-sm" : "text-muted-foreground"}`}>{t}</button>
            ))}
          </div>
        </div>
        <div className="h-48 flex items-end gap-2 px-4">
          {[40, 35, 30, 45, 38, 65, 50, 42, 55, 70, 48, 36].map((h, i) => (
            <div key={i} className="flex-1 bg-accent/20 rounded-t-md hover:bg-accent/40 transition-colors" style={{ height: `${h}%` }} />
          ))}
        </div>
        <div className="flex justify-between mt-2 px-4 text-xs text-muted-foreground">
          {["00:00", "06:00", "12:00", "18:00", "HIỆN TẠI"].map((t) => <span key={t}>{t}</span>)}
        </div>
      </div>

      {/* Recent Activities */}
      <div className="bg-card rounded-2xl border border-border p-6">
        <h3 className="text-lg font-semibold font-body text-foreground mb-4">Hoạt động gần đây</h3>
        <div className="space-y-4">
          {activities.map((a, i) => (
            <div key={i} className="flex items-center gap-3">
              <a.icon size={18} className={a.color} />
              <div>
                <p className="font-medium text-foreground text-sm">{a.title}</p>
                <p className="text-xs text-muted-foreground">{a.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
