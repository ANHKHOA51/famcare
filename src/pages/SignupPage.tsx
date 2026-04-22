import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { HeartPulse, Loader2, ShieldCheck, X } from "lucide-react";

const SignupPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [showTermsModal, setShowTermsModal] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreedToTerms) {
      toast.error("Vui lòng đồng ý với Điều khoản & Chính sách bảo mật để tiếp tục.");
      return;
    }
    setLoading(true);

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, name }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Đăng ký thành công! Hãy đăng nhập.");
        navigate("/login");
      } else {
        toast.error(data.error || "Đăng ký thất bại");
      }
    } catch (error) {
      toast.error("Lỗi kết nối đến máy chủ");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-muted/40 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1 text-center">
          <div className="flex justify-center mb-2">
            <div className="p-3 bg-primary/10 rounded-2xl">
              <HeartPulse className="w-10 h-10 text-primary" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold tracking-tight text-primary">FamCare</CardTitle>
          <CardDescription>Bắt đầu xây dựng tủ thuốc gia đình từ hôm nay.</CardDescription>
        </CardHeader>
        <form onSubmit={handleSignup}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Họ và tên</Label>
              <Input id="name" placeholder="Nguyễn Văn A" value={name} onChange={(e) => setName(e.target.value)} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="name@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required autoComplete="email" inputMode="email" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Mật khẩu</Label>
              <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>

            {/* Terms & Conditions checkbox */}
            <div className="flex items-start gap-3 pt-1">
              <input
                id="terms-checkbox"
                type="checkbox"
                checked={agreedToTerms}
                onChange={(e) => setAgreedToTerms(e.target.checked)}
                className="mt-0.5 w-4 h-4 accent-primary cursor-pointer shrink-0"
              />
              <label htmlFor="terms-checkbox" className="text-sm text-muted-foreground leading-snug cursor-pointer">
                Tôi đã đọc và đồng ý với{" "}
                <button
                  type="button"
                  onClick={() => setShowTermsModal(true)}
                  className="text-primary hover:underline font-medium"
                >
                  Điều khoản sử dụng
                </button>{" "}
                và{" "}
                <button
                  type="button"
                  onClick={() => setShowTermsModal(true)}
                  className="text-primary hover:underline font-medium"
                >
                  Chính sách bảo mật
                </button>{" "}
                của FamCare.
              </label>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button type="submit" className="w-full" disabled={loading || !agreedToTerms}>
              {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Đăng ký tài khoản"}
            </Button>
            <div className="text-sm text-center text-muted-foreground">
              Đã có tài khoản?{" "}
              <Link to="/login" className="text-primary hover:underline transition-all">
                Đăng nhập
              </Link>
            </div>
          </CardFooter>
        </form>
      </Card>

      {/* Terms & Privacy Modal */}
      {showTermsModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg max-h-[80vh] flex flex-col shadow-2xl overflow-hidden">
            <div className="flex items-center justify-between p-6 border-b shrink-0">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-primary" />
                <h2 className="font-bold text-slate-800 text-lg">Điều khoản & Chính sách bảo mật</h2>
              </div>
              <button
                onClick={() => setShowTermsModal(false)}
                className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-slate-200 transition-colors"
              >
                <X size={16} />
              </button>
            </div>
            <div className="overflow-y-auto p-6 space-y-5 text-sm text-slate-600 leading-relaxed flex-1">
              <section>
                <h3 className="font-bold text-slate-800 mb-2">1. Thu thập thông tin</h3>
                <p>FamCare chỉ thu thập thông tin cá nhân (tên, email) và dữ liệu sức khỏe (đơn thuốc, lịch sử khám) với sự đồng ý rõ ràng của bạn, nhằm mục đích cung cấp dịch vụ chăm sóc sức khỏe gia đình.</p>
              </section>
              <section>
                <h3 className="font-bold text-slate-800 mb-2">2. Bảo mật dữ liệu</h3>
                <p>Mọi dữ liệu y tế của bạn được mã hóa theo tiêu chuẩn AES-256 và lưu trữ trên máy chủ bảo mật tại Việt Nam. Chúng tôi không bán hay chia sẻ thông tin cá nhân cho bên thứ ba.</p>
              </section>
              <section>
                <h3 className="font-bold text-slate-800 mb-2">3. Sử dụng AI</h3>
                <p>Tính năng Quét đơn thuốc AI sử dụng hình ảnh bạn cung cấp để nhận dạng thông tin thuốc. Hình ảnh được xử lý và không lưu trữ lâu dài sau khi hoàn thành phân tích. Kết quả AI chỉ mang tính tham khảo, không thay thế tư vấn y tế chuyên nghiệp.</p>
              </section>
              <section>
                <h3 className="font-bold text-slate-800 mb-2">4. Quyền của người dùng</h3>
                <p>Bạn có quyền yêu cầu xem, chỉnh sửa hoặc xóa toàn bộ dữ liệu cá nhân của mình bất kỳ lúc nào bằng cách liên hệ <span className="text-primary font-medium">support@famcare.vn</span>.</p>
              </section>
              <section>
                <h3 className="font-bold text-slate-800 mb-2">5. Trách nhiệm miễn trừ</h3>
                <p>FamCare không chịu trách nhiệm về các quyết định y tế được đưa ra dựa trên kết quả phân tích AI. Người dùng cần tham khảo ý kiến bác sĩ trước khi thay đổi phác đồ điều trị.</p>
              </section>
            </div>
            <div className="p-6 border-t shrink-0 flex gap-3">
              <Button
                variant="outline"
                onClick={() => setShowTermsModal(false)}
                className="flex-1"
              >
                Đóng
              </Button>
              <Button
                onClick={() => {
                  setAgreedToTerms(true);
                  setShowTermsModal(false);
                  toast.success("Đã xác nhận đồng ý điều khoản!");
                }}
                className="flex-1"
              >
                Tôi đồng ý
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SignupPage;
