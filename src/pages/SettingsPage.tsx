import { useState, useEffect } from "react";
import { Bell, Moon, Sun, Monitor, Shield, Lock, Globe, HelpCircle, ChevronRight, LogOut, X } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";

export default function SettingsPage() {
  const { logout, token } = useAuth();
  const [theme, setTheme] = useState(() => localStorage.getItem("famcare-theme") || "system");
  const [notifications, setNotifications] = useState(() => localStorage.getItem("famcare-notifications") !== "false");

  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    localStorage.setItem("famcare-theme", theme);
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else if (theme === 'light') {
      root.classList.remove('dark');
    } else {
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        root.classList.add('dark');
      } else {
        root.classList.remove('dark');
      }
    }
  }, [theme]);

  const handleNotificationToggle = () => {
    const newVal = !notifications;
    setNotifications(newVal);
    // Pass 3 Fix #6: persist notification preference to survive reload
    localStorage.setItem("famcare-notifications", String(newVal));
    if (newVal) {
      toast.success("Đã bật thông báo hệ thống");
    } else {
      toast("Đã tắt thông báo");
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError("");
    
    if (newPassword !== confirmPassword) {
      setPasswordError("Mật khẩu mới không khớp.");
      return;
    }
    
    setIsLoading(true);
    try {
      const res = await fetch("/api/auth/change-password", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ oldPassword, newPassword })
      });
      
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Đã có lỗi xảy ra");
      
      toast.success(data.message || "Đổi mật khẩu thành công!");
      closePasswordModal();
    } catch (err: any) {
      setPasswordError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Fix #5: helper to close modal AND reset all state including error
  const closePasswordModal = () => {
    setIsChangingPassword(false);
    setOldPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setPasswordError("");
  };

  return (
    <div className="p-6 md:p-10 max-w-5xl mx-auto animate-fade-in relative container-fluid bg-[#f8fafc] min-h-screen">
      <div className="mb-10">
        <h1 className="text-3xl md:text-4xl font-display font-bold text-slate-900 tracking-tight mb-2">Cài đặt</h1>
        <p className="text-slate-500">Tùy chỉnh trải nghiệm ứng dụng FamCare của bạn.</p>
      </div>

      <div className="space-y-8">
        {/* Appearance preferences */}
        <div className="bg-white rounded-[2rem] p-6 md:p-8 border border-slate-100 shadow-sm">
          <h2 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
            <Monitor className="text-teal-500" size={20} /> Giao diện & Hiển thị
          </h2>
          
          <div className="grid grid-cols-3 gap-4">
            <button 
              onClick={() => setTheme("light")}
              className={`p-4 rounded-2xl flex flex-col items-center justify-center gap-3 border-2 transition-all ${theme === 'light' ? 'border-teal-500 bg-teal-50 text-teal-700' : 'border-slate-100 bg-slate-50 text-slate-500 hover:bg-slate-100'}`}
            >
              <Sun size={24} />
              <span className="text-sm font-bold">Sáng</span>
            </button>
            <button 
              onClick={() => setTheme("dark")}
              className={`p-4 rounded-2xl flex flex-col items-center justify-center gap-3 border-2 transition-all ${theme === 'dark' ? 'border-teal-500 bg-teal-50 text-teal-700' : 'border-slate-100 bg-slate-50 text-slate-500 hover:bg-slate-100'}`}
            >
              <Moon size={24} />
              <span className="text-sm font-bold">Tối</span>
            </button>
            <button 
              onClick={() => setTheme("system")}
              className={`p-4 rounded-2xl flex flex-col items-center justify-center gap-3 border-2 transition-all ${theme === 'system' ? 'border-teal-500 bg-teal-50 text-teal-700' : 'border-slate-100 bg-slate-50 text-slate-500 hover:bg-slate-100'}`}
            >
              <Monitor size={24} />
              <span className="text-sm font-bold">Hệ thống</span>
            </button>
          </div>
        </div>

        {/* Notifications */}
        <div className="bg-white rounded-[2rem] p-6 md:p-8 border border-slate-100 shadow-sm">
          <h2 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
            <Bell className="text-amber-500" size={20} /> Thông báo
          </h2>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 rounded-xl bg-slate-50 border border-slate-100">
              <div>
                <p className="font-bold text-slate-800 text-sm">Thông báo chung</p>
                <p className="text-xs text-slate-500 mt-1">Nội dung hệ thống và cập nhật FamCare</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" checked={notifications} onChange={handleNotificationToggle} />
                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-500"></div>
              </label>
            </div>
            
            <div className="flex items-center justify-between p-4 rounded-xl bg-slate-50 border border-slate-100 opacity-50">
              <div>
                <p className="font-bold text-slate-800 text-sm">Nhắc nhở uống thuốc</p>
                <p className="text-xs text-slate-500 mt-1">Thông báo tới thiết bị (Coming soon)</p>
              </div>
              <label className="relative inline-flex items-center">
                <input type="checkbox" className="sr-only peer" disabled />
                <div className="w-11 h-6 bg-slate-200 rounded-full peer after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
              </label>
            </div>
          </div>
        </div>

        {/* Privacy & Security */}
        <div className="bg-white rounded-[2rem] p-6 md:p-8 border border-slate-100 shadow-sm">
          <h2 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
            <Shield className="text-indigo-500" size={20} /> Quyền riêng tư & Bảo mật
          </h2>
          
          <div 
            onClick={() => setIsChangingPassword(true)}
            className="flex items-center justify-between py-4 cursor-pointer hover:bg-slate-50 rounded-xl px-2 transition-colors -mx-2"
          >
            <div className="flex items-center gap-3">
               <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600">
                 <Lock size={18} />
               </div>
               <div>
                 <p className="font-bold text-slate-800 text-sm">Đổi mật khẩu</p>
                 <p className="text-xs text-slate-500">Cập nhật mật khẩu đang đăng nhập</p>
               </div>
            </div>
            <button className="text-slate-400 hover:text-slate-600"><ChevronRight size={20}/></button>
          </div>
        </div>

        <button onClick={logout} className="w-full bg-red-50 hover:bg-red-100 text-red-600 font-bold py-4 rounded-2xl flex items-center justify-center gap-2 transition-colors">
          <LogOut size={20} />
          Đăng xuất tài khoản
        </button>

        <div className="text-center pb-8 pt-4">
           <p className="text-sm text-slate-400 font-medium">FamCare App Version 1.0.0</p>
        </div>
      </div>

      {isChangingPassword && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-[2rem] w-full max-w-md overflow-hidden animate-fade-in shadow-2xl">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
              <h3 className="font-bold text-slate-800 text-xl">Đổi mật khẩu</h3>
              <button 
                onClick={() => closePasswordModal()}
                className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-500 hover:bg-slate-100"
              >
                <X size={20} />
              </button>
            </div>
            
            <form onSubmit={handleChangePassword} className="p-6 space-y-4">
              {passwordError && (
                <div className="bg-red-50 text-red-600 p-4 rounded-2xl text-sm font-medium">
                  {passwordError}
                </div>
              )}
              
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Mật khẩu hiện tại</label>
                <input 
                  type="password" 
                  required
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  className="w-full h-14 bg-slate-50 border-none rounded-2xl px-4 font-medium text-slate-700 focus:ring-2 focus:ring-teal-500"
                  placeholder="Nhập mật khẩu hiện tại"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Mật khẩu mới</label>
                <input 
                  type="password" 
                  required
                  minLength={6}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full h-14 bg-slate-50 border-none rounded-2xl px-4 font-medium text-slate-700 focus:ring-2 focus:ring-teal-500"
                  placeholder="Nhập mật khẩu mới"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Xác nhận mật khẩu</label>
                <input 
                  type="password" 
                  required
                  minLength={6}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full h-14 bg-slate-50 border-none rounded-2xl px-4 font-medium text-slate-700 focus:ring-2 focus:ring-teal-500"
                  placeholder="Nhập lại mật khẩu mới"
                />
              </div>

              <div className="pt-4 flex gap-3">
                <button 
                  type="button"
                  onClick={() => closePasswordModal()}
                  className="flex-1 h-14 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-2xl transition-colors"
                >
                  Hủy
                </button>
                <button 
                  type="submit"
                  disabled={isLoading}
                  className="flex-1 h-14 bg-teal-500 hover:bg-teal-600 disabled:bg-teal-300 text-white font-bold rounded-2xl transition-colors"
                >
                  {isLoading ? "Đang lưu..." : "Lưu thay đổi"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
