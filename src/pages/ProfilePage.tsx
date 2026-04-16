import React, { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Loader2, User, Activity, Users, UserPlus, Search, Mail, Link2, Calendar, Phone, MapPin, Edit3, Trash2 } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

export default function ProfilePage() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState('personal');

  // Modal State
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [userQuery, setUserQuery] = useState("");
  const [userResults, setUserResults] = useState<{id: string, name?: string, email: string}[]>([]);
  const [selectedUser, setSelectedUser] = useState<{id: string, name?: string, email: string} | null>(null);
  const [relationship, setRelationship] = useState("");
  const [searching2, setSearching2] = useState(false);
  const [adding, setAdding] = useState(false);

  // Profile Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    dob: '',
    gender: '',
    bloodType: '',
    height: '',
    weight: '',
    allergies: '',
    chronicIllness: ''
  });

  const [familyMembers, setFamilyMembers] = useState<any[]>([]);

  const fetchProfile = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('aura_token');
      const res = await fetch('/api/auth/profile', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      
      if (res.ok && data) {
        setFormData({
          name: data.name || '',
          email: data.email || '',
          phone: data.phone || '',
          address: data.address || '',
          dob: data.dob ? new Date(data.dob).toISOString().split('T')[0] : '',
          gender: data.gender || '',
          bloodType: data.bloodType || '',
          height: data.height || '',
          weight: data.weight || '',
          allergies: data.allergies || '',
          chronicIllness: data.chronicIllness || ''
        });
        
        const owned = data.ownedMembers || [];
        const linked = (data.linkedMembers || []).map((m: any) => ({
          id: m.id,
          name: m.user?.name || m.user?.email || 'Người dùng',
          relationship: 'Chủ hộ',
          linkedUser: m.user,
          isLinked: true,
          originalUserId: m.user?.id
        }));

        setFamilyMembers([...owned, ...linked]);
      }
    } catch (error) {
      toast({ title: "Lỗi", description: "Không thể lấy thông tin cá nhân", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleUserSearch = async (q: string) => {
    setUserQuery(q);
    setSelectedUser(null);
    if (q.length < 2) { setUserResults([]); return; }
    setSearching2(true);
    try {
      const token = localStorage.getItem('aura_token');
      const resp = await fetch(`/api/family/search?q=${encodeURIComponent(q)}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      // Pass 3 Fix #5: guard resp.ok — error response is an object, not an array → would crash .map()
      if (resp.ok) {
        const data = await resp.json();
        setUserResults(Array.isArray(data) ? data : []);
      } else {
        setUserResults([]);
      }
    } catch {}
    finally { setSearching2(false); }
  };

  const handleAddMember = async () => {
    if (!selectedUser || !relationship) { 
      toast({title: "Lỗi", description: "Vui lòng chọn người và mối quan hệ", variant: "destructive"}); 
      return; 
    }
    setAdding(true);
    try {
      const token = localStorage.getItem('aura_token');
      const resp = await fetch("/api/family/add", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ linkedUserId: selectedUser.id, relationship })
      });
      const data = await resp.json();
      if (resp.ok) {
        toast({title: "Thành công", description: `Đã thêm ${selectedUser.name || selectedUser.email} vào gia đình!`});
        fetchProfile();
        setAddDialogOpen(false);
        setUserQuery(""); setUserResults([]); setSelectedUser(null); setRelationship("");
      } else {
        toast({title: "Lỗi", description: data.error || "Lỗi khi thêm thành viên", variant: "destructive"});
      }
    } catch { 
      toast({title: "Lỗi", description: "Lỗi kết nối", variant: "destructive"}); 
    }
    finally { setAdding(false); }
  };

  const handleRemoveMember = async (id: string, name: string) => {
    if (!window.confirm(`Bạn có chắc muốn xóa "${name}" khỏi gia đình?`)) return;
    try {
      const token = localStorage.getItem('aura_token');
      const resp = await fetch(`/api/family/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` }
      });
      if (resp.ok) {
        toast({ title: "Thành công", description: `Đã xóa ${name} khỏi gia đình.` });
        fetchProfile();
      } else {
        toast({ title: "Lỗi", description: "Không thể xóa thành viên", variant: "destructive" });
      }
    } catch {
      toast({ title: "Lỗi", description: "Lỗi kết nối", variant: "destructive" });
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const token = localStorage.getItem('aura_token');
      const res = await fetch('/api/auth/profile', {
        method: 'PUT',
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      
      if (res.ok) {
        toast({ title: "Thành công", description: "Đã cập nhật hồ sơ cá nhân", });
      } else {
        toast({ title: "Lỗi", description: "Lỗi khi lưu thông tin.", variant: "destructive" });
      }
    } catch {
      toast({ title: "Lỗi", description: "Không thể kết nối lưu trữ.", variant: "destructive" });
    } finally {
      setSaving(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const renderBMI = () => {
    if (!formData.height || !formData.weight) return null;
    const heightInMeters = parseFloat(formData.height) / 100;
    const weightInKg = parseFloat(formData.weight);
    if (heightInMeters <= 0 || weightInKg <= 0 || isNaN(heightInMeters) || isNaN(weightInKg)) return null;
    
    const bmiNum = weightInKg / (heightInMeters * heightInMeters);
    const bmi = bmiNum.toFixed(1);
    let status = "";
    let colorClass = "";
    
    if (bmiNum < 18.5) {
      status = "Thiếu cân"; colorClass = "bg-blue-100 text-blue-700";
    } else if (bmiNum < 22.9) {
      status = "Bình thường"; colorClass = "bg-emerald-100 text-emerald-700";
    } else if (bmiNum < 24.9) {
      status = "Thừa cân"; colorClass = "bg-amber-100 text-amber-700";
    } else {
      status = "Béo phì"; colorClass = "bg-rose-100 text-rose-700";
    }
    
    return (
      <div className={`mt-4 p-4 rounded-xl flex items-center justify-between ${colorClass}`}>
        <div className="flex items-center gap-2">
          <Activity size={20} />
          <span className="font-bold text-sm">Chỉ số BMI: {bmi}</span>
        </div>
        <span className="text-[0.6875rem] font-bold uppercase tracking-wider px-2 py-1 bg-white/50 rounded-lg">{status}</span>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f8fafc]">
        <Loader2 className="h-10 w-10 animate-spin text-teal-400" />
      </div>
    );
  }

  return (
    <div className="p-6 md:p-10 max-w-6xl mx-auto animate-fade-in relative container-fluid bg-[#f8fafc] min-h-screen">
      
      <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-3xl md:text-4xl font-display font-bold text-slate-900 tracking-tight mb-2">Hồ sơ cá nhân</h1>
          <p className="text-slate-500">Quản lý định danh, dữ liệu y tế và thành viên gia đình.</p>
        </div>
        {activeTab !== 'family' && (
           <button onClick={handleSave} disabled={saving} className="bg-teal-500 hover:bg-teal-600 text-white font-bold py-3 px-8 rounded-2xl flex items-center justify-center gap-2 shadow-sm transition-transform hover:scale-105 whitespace-nowrap">
             {saving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Edit3 size={18} />}
             Lưu thay đổi hồ sơ
           </button>
        )}
      </div>

      <div className="grid lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-3 space-y-2">
           <button onClick={() => setActiveTab('personal')} className={`w-full flex items-center gap-3 px-5 py-4 rounded-2xl font-bold transition-all text-sm ${activeTab === 'personal' ? 'bg-[#0f172a] text-white shadow-md' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900 border border-transparent'}`}>
              <User size={20} /> Thực thể & Liên hệ
           </button>
           <button onClick={() => setActiveTab('medical')} className={`w-full flex items-center gap-3 px-5 py-4 rounded-2xl font-bold transition-all text-sm ${activeTab === 'medical' ? 'bg-[#0f172a] text-white shadow-md' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900 border border-transparent'}`}>
              <Activity size={20} /> Hồ sơ Y tế
           </button>
           <button onClick={() => setActiveTab('family')} className={`w-full flex items-center gap-3 px-5 py-4 rounded-2xl font-bold transition-all text-sm ${activeTab === 'family' ? 'bg-[#0f172a] text-white shadow-md' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900 border border-transparent'}`}>
              <Users size={20} /> Thành viên gia đình
           </button>
        </div>

        <div className="lg:col-span-9">
           <div className="bg-white rounded-[2rem] p-8 border border-slate-100 shadow-sm">
             
             {activeTab === 'personal' && (
                <div className="space-y-6 animate-fade-in">
                  <h2 className="text-xl font-bold text-slate-800 border-b border-slate-100 pb-4 mb-6">Thông tin nhận diện</h2>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Họ và tên</label>
                      <input type="text" name="name" value={formData.name} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal-500/30 font-medium text-slate-800" placeholder="VD: Nguyễn Văn A" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Email (Cố định)</label>
                      <input type="email" value={formData.email} disabled className="w-full bg-slate-100 border border-slate-200 rounded-xl px-4 py-3 font-medium text-slate-500 cursor-not-allowed" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Điện thoại</label>
                      <input type="text" name="phone" value={formData.phone} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal-500/30 font-medium text-slate-800" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Giới tính</label>
                      <select name="gender" value={formData.gender} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal-500/30 font-medium text-slate-800">
                         <option value="">Chưa chọn</option>
                         <option value="nam">Nam</option>
                         <option value="nu">Nữ</option>
                         <option value="khac">Khác</option>
                      </select>
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Ngày sinh</label>
                      <input type="date" name="dob" value={formData.dob} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal-500/30 font-medium text-slate-800" />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Địa chỉ cư trú</label>
                      <textarea name="address" value={formData.address} onChange={handleChange} rows={3} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal-500/30 font-medium text-slate-800" placeholder="Số nhà, đường, quận, thành phố..." />
                    </div>
                  </div>
                </div>
             )}

             {activeTab === 'medical' && (
                <div className="space-y-6 animate-fade-in">
                  <h2 className="text-xl font-bold text-slate-800 border-b border-slate-100 pb-4 mb-6">Chỉ số sức khỏe AI</h2>
                  
                  <div className="bg-gradient-to-br from-[#f8fafc] to-[#e0f2fe]/30 p-6 rounded-2xl border border-blue-100 mb-8">
                     <div className="grid md:grid-cols-2 gap-4">
                       <div className="space-y-2">
                         <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Chiều cao (cm)</label>
                         <input type="number" name="height" value={formData.height} onChange={handleChange} className="w-full bg-white border border-blue-200/50 rounded-xl px-4 py-3 font-medium text-slate-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400/30" />
                       </div>
                       <div className="space-y-2">
                         <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Cân nặng (kg)</label>
                         <input type="number" name="weight" value={formData.weight} onChange={handleChange} className="w-full bg-white border border-blue-200/50 rounded-xl px-4 py-3 font-medium text-slate-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400/30" />
                       </div>
                     </div>
                     {renderBMI()}
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Nhóm máu</label>
                      <select name="bloodType" value={formData.bloodType} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 font-medium text-slate-800">
                         <option value="">Chưa chọn</option><option value="a">A</option><option value="b">B</option><option value="ab">AB</option><option value="o">O</option>
                      </select>
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-red-500">Dị ứng (Thuốc/Thức ăn)</label>
                      <input type="text" name="allergies" value={formData.allergies} onChange={handleChange} className="w-full bg-rose-50/50 border border-red-200 rounded-xl px-4 py-3 font-medium text-slate-800" placeholder="VD: Dị ứng Penicillin, Hải sản..." />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Bệnh lý nền / Mãn tính</label>
                      <textarea name="chronicIllness" value={formData.chronicIllness} onChange={handleChange} rows={3} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 font-medium text-slate-800" placeholder="VD: Huyết áp cao, Gout..." />
                    </div>
                  </div>
                </div>
             )}

             {activeTab === 'family' && (
                <div className="space-y-6 animate-fade-in">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-6">
                    <h2 className="text-xl font-bold text-slate-800">Liên kết gia đình</h2>
                    <Dialog open={addDialogOpen} onOpenChange={setAddDialogOpen}>
                      <DialogTrigger asChild>
                        <button className="bg-[#0f172a] hover:bg-slate-800 text-white font-semibold py-2 px-4 rounded-xl text-sm transition-colors flex items-center gap-2">
                           <UserPlus size={16} /> Thêm người mới
                        </button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-md bg-white rounded-[2rem]">
                        <DialogHeader>
                          <DialogTitle className="flex items-center gap-2 text-xl font-display font-bold">
                             Thêm thành viên gia đình
                          </DialogTitle>
                          <DialogDescription>Nhập email tài khoản FamCare của họ</DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4 py-4">
                           <div className="space-y-2">
                             <label className="text-xs font-bold uppercase text-slate-500">Bước 1: Tìm kiếm</label>
                             <div className="relative">
                               <Search className="absolute left-3 top-3.5 text-slate-400" size={18} />
                               <input type="text" value={userQuery} onChange={e => handleUserSearch(e.target.value)} className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl" placeholder="Email người dùng..." />
                               {searching2 && <Loader2 className="absolute right-3 top-3.5 animate-spin text-slate-400" size={18} />}
                             </div>
                             {userResults.map(u => (
                               <button key={u.id} onClick={() => { setSelectedUser(u); setUserResults([]); }} className="w-full mt-2 p-3 bg-white border border-slate-200 rounded-xl flex items-center gap-3 text-left hover:border-teal-400">
                                 <div className="w-8 h-8 rounded-full bg-teal-100 text-teal-700 font-bold flex items-center justify-center">{u.email[0].toUpperCase()}</div>
                                 <div className="flex-1 overflow-hidden"><p className="font-bold text-sm text-slate-800 truncate">{u.name || u.email}</p><p className="text-xs text-slate-500 truncate">{u.email}</p></div>
                               </button>
                             ))}
                           </div>
                           
                           {selectedUser && (
                             <div className="space-y-2 mt-4">
                               <label className="text-xs font-bold uppercase text-slate-500">Bước 2: Mối quan hệ</label>
                               <select value={relationship} onChange={e => setRelationship(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3">
                                 <option value="">Chọn quan hệ...</option>
                                 <option value="Bố">Bố</option><option value="Mẹ">Mẹ</option><option value="Vợ">Vợ</option><option value="Chồng">Chồng</option><option value="Con">Con</option>
                               </select>
                             </div>
                           )}
                        </div>
                        <DialogFooter>
                          <button onClick={handleAddMember} disabled={adding || !selectedUser || !relationship} className="bg-teal-500 hover:bg-teal-600 disabled:opacity-50 text-white font-bold py-3 px-6 rounded-xl w-full">
                            {adding ? "Đang thêm..." : "Liên kết ngay"}
                          </button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </div>

                  {familyMembers.length === 0 ? (
                    <div className="text-center py-10 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
                      <p className="text-slate-500">Chưa có thành viên nào.</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {familyMembers.map((member) => (
                        <div key={member.id} className="flex items-center justify-between p-5 bg-white border border-slate-100 shadow-sm rounded-2xl group hover:border-blue-200 transition-colors">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-full bg-blue-50 text-blue-600 font-bold flex items-center justify-center text-lg">
                              {(member.name?.[0] ?? '?').toUpperCase()}
                            </div>
                            <div>
                               <p className="font-bold text-slate-800 flex items-center gap-2">
                                 {member.name}
                                 {member.isLinked && <span className="bg-slate-100 text-slate-500 px-2 py-0.5 rounded text-[0.625rem] font-bold uppercase">Người thân</span>}
                               </p>
                               <p className="text-sm text-slate-500">{member.relationship} • {member.linkedUser ? member.linkedUser.email : 'Tài khoản giả định'}</p>
                            </div>
                          </div>
                          
                          {member.relationship !== 'Bản thân' && (
                             <button onClick={() => handleRemoveMember(member.id, member.name)} className="w-10 h-10 rounded-xl bg-slate-50 text-slate-400 hover:bg-red-50 hover:text-red-500 flex items-center justify-center transition-colors">
                               <Trash2 size={18} />
                             </button>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
             )}

           </div>
        </div>
      </div>
    </div>
  );
}