import { useState, useEffect } from "react";
import { Search, AlertTriangle, CheckCircle2, Clock, Info, User, ChevronRight, Activity, XCircle, Plus, Minus, UserPlus, Loader2, Edit3, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

export default function DashboardPage() {
  const { token } = useAuth();
  const { toast } = useToast();
  const [profileName, setProfileName] = useState("bạn");
  const [members, setMembers] = useState<any[]>([]);

  // --- Add Member State ---
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [userQuery, setUserQuery] = useState("");
  const [userResults, setUserResults] = useState<{id: string, name?: string, email: string}[]>([]);
  const [selectedUser, setSelectedUser] = useState<{id: string, name?: string, email: string} | null>(null);
  const [relationship, setRelationship] = useState("");
  const [searching, setSearching] = useState(false);
  const [adding, setAdding] = useState(false);

  // --- Edit Member State ---
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editMember, setEditMember] = useState<any>(null);
  const [editFormData, setEditFormData] = useState({
    name: '',
    relationship: '',
    height: '',
    weight: '',
    nextAppointment: '',
    diet: ''
  });

  const fetchProfile = async () => {
    try {
      const res = await fetch('/api/auth/profile', { headers: { 'Authorization': `Bearer ${token}` } });
      const data = await res.json();
      if (res.ok) {
        const names = data.name ? data.name.split(" ") : [];
        setProfileName(names.length > 0 ? names[names.length - 1] : "bạn");
        
        const owned = data.ownedMembers || [];
        const linked = (data.linkedMembers || []).map((m: any) => ({
          ...m,
          name: m.user?.name || m.user?.email || 'Người dùng',
          relationship: m.relationship || 'Liên kết',
          isLinked: true
        }));
        
        let allMembers = [...owned, ...linked];
        
        // Load Local Overrides (for UI persistence in Student Project)
        const localOverrides = JSON.parse(localStorage.getItem('dashboard_member_overrides') || '{}');
        allMembers = allMembers.map(m => {
          const over = localOverrides[m.id] || {};
          return {
            ...m,
            ...over,
            name: over.name || m.name,
            relationship: over.relationship || m.relationship,
            height: over.height || m.height || (m.user?.height) || m.linkedUser?.height || '',
            weight: over.weight || m.weight || (m.user?.weight) || m.linkedUser?.weight || '',
          };
        });

        setMembers(allMembers);
      }
    } catch (e) {}
  };

  useEffect(() => {
    if (token) fetchProfile();
  }, [token]);

  // --- Add Member Logic ---
  const handleUserSearch = async (q: string) => {
    setUserQuery(q);
    setSelectedUser(null);
    if (q.length < 2) { setUserResults([]); return; }
    setSearching(true);
    try {
      const resp = await fetch(`/api/family/search?q=${encodeURIComponent(q)}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (resp.ok) {
        const data = await resp.json();
        setUserResults(Array.isArray(data) ? data : []);
      } else {
        setUserResults([]);
      }
    } catch {}
    finally { setSearching(false); }
  };

  const handleAddMember = async () => {
    if (!selectedUser || !relationship) { 
      toast({title: "Lỗi", description: "Vui lòng chọn người và mối quan hệ", variant: "destructive"}); 
      return; 
    }
    setAdding(true);
    try {
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

  // --- Edit Member Logic ---
  const openEditDialog = (member: any) => {
    setEditMember(member);
    setEditFormData({
      name: member.name || '',
      relationship: member.relationship || '',
      height: member.height?.toString() || '',
      weight: member.weight?.toString() || '',
      nextAppointment: member.nextAppointment || '',
      diet: member.diet || ''
    });
    setEditDialogOpen(true);
  };

  const handleSaveEdit = () => {
    if (!editMember) return;
    const overrides = JSON.parse(localStorage.getItem('dashboard_member_overrides') || '{}');
    overrides[editMember.id] = {
      ...overrides[editMember.id],
      ...editFormData
    };
    localStorage.setItem('dashboard_member_overrides', JSON.stringify(overrides));
    toast({ title: "Thành công", description: "Đã cập nhật thông tin thành viên." });
    setEditDialogOpen(false);
    fetchProfile();
  };

  const getBmiData = (w?: number, h?: number) => {
    if (!w || !h) return { value: 0, label: "Chưa có", cls: "bg-slate-500", text: "text-slate-600", percent: 0 };
    const heightM = h > 3 ? h / 100 : h;
    const bmi = +(w / (heightM * heightM)).toFixed(1);
    if (bmi < 18.5) return { value: bmi, label: "Thiếu cân", cls: "bg-blue-500", text: "text-blue-600", percent: 30 };
    if (bmi < 25) return { value: bmi, label: "Bình thường", cls: "bg-green-500", text: "text-green-600", percent: 50 };
    if (bmi < 30) return { value: bmi, label: "Thừa cân", cls: "bg-amber-500", text: "text-amber-600", percent: 75 };
    return { value: bmi, label: "Béo phì", cls: "bg-red-500", text: "text-red-600", percent: 90 };
  };

  return (
    <div className="p-8 lg:p-10 max-w-7xl mx-auto space-y-10 bg-[#f8fafc] min-h-[calc(100vh-80px)]">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h1 className="text-2xl font-display font-bold text-slate-800">
          Chào {profileName}, hôm nay gia đình thế nào?
        </h1>
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Tìm kiếm hồ sơ..." 
              className="w-full bg-slate-200/50 border-none rounded-full py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/50 transition-all text-slate-600"
            />
          </div>
          
          <Dialog open={addDialogOpen} onOpenChange={setAddDialogOpen}>
            <DialogTrigger asChild>
              <button className="bg-teal-500 hover:bg-teal-600 text-white font-bold py-2.5 px-4 rounded-full text-sm transition-colors flex items-center gap-2 whitespace-nowrap shadow-sm">
                 <UserPlus size={16} /> Thêm người
              </button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md bg-white rounded-[2rem]">
              <DialogHeader>
                <DialogTitle className="text-xl font-display font-bold">Thêm thành viên gia đình</DialogTitle>
                <DialogDescription>Tìm kiếm qua email và chọn mối quan hệ.</DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                 <div className="space-y-2">
                   <label className="text-xs font-bold uppercase text-slate-500">Bước 1: Tìm kiếm</label>
                   <div className="relative">
                     <Search className="absolute left-3 top-3.5 text-slate-400" size={18} />
                     <input type="text" value={userQuery} onChange={e => handleUserSearch(e.target.value)} className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl" placeholder="Email người dùng..." />
                     {searching && <Loader2 className="absolute right-3 top-3.5 animate-spin text-slate-400" size={18} />}
                   </div>
                   {userResults.map(u => (
                     <button key={u.id} onClick={() => { setSelectedUser(u); setUserResults([]); }} className="w-full mt-2 p-3 bg-white border border-slate-200 rounded-xl flex items-center gap-3 text-left hover:border-teal-400 transition-colors">
                       <div className="w-8 h-8 rounded-full bg-teal-100 text-teal-700 font-bold flex items-center justify-center">{u.email[0].toUpperCase()}</div>
                       <div className="flex-1 overflow-hidden"><p className="font-bold text-sm text-slate-800 truncate">{u.name || u.email}</p><p className="text-xs text-slate-500 truncate">{u.email}</p></div>
                     </button>
                   ))}
                 </div>
                 
                 {selectedUser && (
                   <div className="space-y-2 mt-4">
                     <label className="text-xs font-bold uppercase text-slate-500">Bước 2: Mối quan hệ</label>
                     <select value={relationship} onChange={e => setRelationship(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 font-medium">
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
      </div>

      {/* Edit Member Modal */}
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent className="sm:max-w-lg bg-white rounded-[2rem]">
          <DialogHeader>
            <DialogTitle className="text-xl font-display font-bold">Cập nhật thông tin thành viên</DialogTitle>
            <DialogDescription>Chỉnh sửa các chỉ số và kế hoạch chăm sóc cho {editMember?.name}.</DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-4 py-4">
             <div className="space-y-2 col-span-2">
               <label className="text-xs font-bold uppercase text-slate-500">Họ và tên</label>
               <input type="text" value={editFormData.name} onChange={e => setEditFormData({...editFormData, name: e.target.value})} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 font-medium" />
             </div>
             <div className="space-y-2 col-span-2">
               <label className="text-xs font-bold uppercase text-slate-500">Mối quan hệ</label>
               <input type="text" value={editFormData.relationship} onChange={e => setEditFormData({...editFormData, relationship: e.target.value})} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 font-medium" />
             </div>
             <div className="space-y-2">
               <label className="text-xs font-bold uppercase text-slate-500">Chiều cao (cm)</label>
               <input type="number" value={editFormData.height} onChange={e => setEditFormData({...editFormData, height: e.target.value})} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 font-medium" />
             </div>
             <div className="space-y-2">
               <label className="text-xs font-bold uppercase text-slate-500">Cân nặng (kg)</label>
               <input type="number" value={editFormData.weight} onChange={e => setEditFormData({...editFormData, weight: e.target.value})} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 font-medium" />
             </div>
             <div className="space-y-2 col-span-2">
               <label className="text-xs font-bold uppercase text-slate-500">Lịch khám sắp tới (nếu có)</label>
               <input type="text" placeholder="VD: Khám nội tổng quát ngày 25/10" value={editFormData.nextAppointment} onChange={e => setEditFormData({...editFormData, nextAppointment: e.target.value})} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 font-medium" />
             </div>
             <div className="space-y-2 col-span-2">
               <label className="text-xs font-bold uppercase text-slate-500">Chế độ dinh dưỡng (ghi chú)</label>
               <input type="text" placeholder="VD: Giảm đường, giảm mặn..." value={editFormData.diet} onChange={e => setEditFormData({...editFormData, diet: e.target.value})} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 font-medium" />
             </div>
          </div>
          <DialogFooter>
            <button onClick={handleSaveEdit} className="bg-[#0f172a] hover:bg-slate-800 text-white font-bold py-3 px-6 rounded-xl w-full">
              Lưu thay đổi
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Family Health Status */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-display font-bold text-teal-500">Tình trạng sức khỏe gia đình</h2>
          <span className="text-xs font-bold text-teal-600 bg-teal-50 px-3 py-1 rounded-full">Tháng 10, 2026</span>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6">
          {members.map((m: any, idx: number) => {
            const hasIssue = m.chronicIllness || m.allergies;
            return (
              <div key={m.id || idx} onClick={() => openEditDialog(m)} className="bg-white rounded-[2rem] p-6 shadow-sm border border-slate-100/50 flex flex-col h-full cursor-pointer hover:border-teal-300 hover:shadow-md transition-all group relative">
                <button className="absolute top-4 right-4 text-slate-300 group-hover:text-teal-500 transition-colors">
                  <Edit3 size={18} />
                </button>
                <div className="flex justify-between items-start mb-4">
                  <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
                    <User size={24} />
                  </div>
                </div>
                <h3 className="font-bold text-slate-800 text-lg group-hover:text-teal-600 transition-colors">{m.relationship} ({m.name})</h3>
                <p className="text-sm text-slate-500 mb-6 flex-1 mt-1">{m.chronicIllness || m.allergies ? `Lưu ý: ${m.chronicIllness || ''} ${m.allergies || ''}` : "Sức khỏe ổn định"}</p>
                <div className={`flex items-center gap-2 text-xs font-medium w-fit px-3 py-1.5 rounded-lg ${hasIssue ? 'text-amber-600 bg-amber-50' : 'text-blue-600 bg-blue-50'}`}>
                  {hasIssue ? <AlertTriangle size={14} /> : <CheckCircle2 size={14} />} {hasIssue ? "Cần theo dõi" : "Phát triển tốt"}
                </div>
              </div>
            );
          })}
          {members.length === 0 && (
            <div className="bg-white rounded-[2rem] p-6 border border-dashed border-slate-300 col-span-3 flex items-center justify-center min-h-[160px]">
               <p className="text-sm text-slate-500 italic">Chưa có dữ liệu thành viên, hãy thêm người ở góc phải.</p>
            </div>
          )}
        </div>
      </section>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* BMI Column (Col Span 2) */}
        <section className="lg:col-span-2 space-y-4">
          <h2 className="text-xl font-display font-bold text-slate-800">Chỉ số BMI & Theo dõi (Bấm để cập nhật)</h2>
          <div className="bg-white rounded-[2rem] p-6 lg:p-8 shadow-sm border border-slate-100/50">
            <div className="grid sm:grid-cols-3 gap-6 mb-8">
              {members.slice(0, 3).map((m: any, idx: number) => {
                const bmiData = getBmiData(parseFloat(m.weight), parseFloat(m.height));
                return (
                  <div key={m.id || idx} onClick={() => openEditDialog(m)} className={`cursor-pointer group rounded-xl transition-all hover:bg-slate-50 p-2 -mx-2 ${idx > 0 ? "sm:border-l sm:border-slate-100 sm:pl-6" : ""}`}>
                    <p className="text-sm font-bold text-slate-600 mb-1 group-hover:text-blue-600 flex items-center gap-2">
                       {m.relationship} <Edit3 size={12} className="opacity-0 group-hover:opacity-100" />
                    </p>
                    <p className={`text-3xl font-display font-bold mb-3 ${bmiData.text}`}>
                      {bmiData.value > 0 ? bmiData.value : "--"}
                    </p>
                    <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden mb-2">
                      <div className={`h-full ${bmiData.cls} rounded-full transition-all`} style={{ width: `${bmiData.percent}%` }}></div>
                    </div>
                    <p className="text-[0.625rem] text-slate-400 font-medium">{bmiData.label}</p>
                  </div>
                );
              })}
              {members.length === 0 && <p className="text-sm text-slate-400">Vui lòng thêm thành viên để theo dõi BMI.</p>}
            </div>
            
            <p className="w-full bg-slate-50 text-slate-500 font-semibold flex items-center justify-center gap-2 py-3 rounded-xl transition-colors text-sm">
              <Info size={16}/> Bấm vào từng hồ sơ để cập nhật chỉ số BMI
            </p>
          </div>
        </section>

        {/* Calendar & Diet Column */}
        <section className="space-y-4 flex flex-col gap-8">
          <div>
            <h2 className="text-xl font-display font-bold text-slate-800">Lịch khám sắp tới</h2>
            <div className="bg-white rounded-[2rem] p-6 shadow-sm border border-slate-100/50 mt-4">
              <div className="space-y-4">
                {members.filter(m => m.nextAppointment).length === 0 && (
                   <p className="text-sm text-slate-500 italic">Chưa có lịch khám nào. Bấm vào thành viên để thêm.</p>
                )}
                {members.filter(m => m.nextAppointment).map((m: any, idx: number) => (
                  <div key={idx} onClick={() => openEditDialog(m)} className="flex gap-4 cursor-pointer group hover:bg-slate-50 p-2 -mx-2 rounded-xl transition-all">
                    <div className="w-12 h-12 rounded-2xl bg-blue-50 flex flex-col items-center justify-center text-blue-600 flex-shrink-0">
                      <span className="text-lg font-bold leading-none"><Clock size={18}/></span>
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-1">
                        <h4 className="font-bold text-sm text-slate-800 group-hover:text-blue-600">{m.relationship} ({m.name})</h4>
                      </div>
                      <p className="text-[0.8rem] text-slate-500 line-clamp-2">{m.nextAppointment}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-display font-bold text-slate-800">Chế độ dinh dưỡng</h2>
            <div className="bg-[#bfdbfe] rounded-[2rem] p-6 shadow-sm relative overflow-hidden mt-4">
              <div className="absolute inset-0 right-0 top-1/2 -bottom-10 opacity-30 pointer-events-none" 
                   style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&q=80&w=800)', backgroundSize: 'cover', backgroundPosition: 'bottom right' }}>
              </div>
              <div className="relative z-10">
                <ul className="space-y-3">
                  {members.filter(m => m.diet).length === 0 && (
                     <li className="text-sm text-blue-900 italic">Chưa có ghi chú dinh dưỡng. Cập nhật trong hồ sơ thành viên.</li>
                  )}
                  {members.filter(m => m.diet).map((m: any, idx: number) => (
                    <li key={idx} onClick={() => openEditDialog(m)} className="flex items-start gap-2 text-sm text-[#1e3a8a] cursor-pointer hover:bg-blue-300/30 p-2 -mx-2 rounded-lg transition-colors">
                      <div className="mt-1 w-4 h-4 rounded-full bg-blue-500 flex items-center justify-center text-white flex-shrink-0"><Activity size={10} /></div>
                      <span className="font-bold">{m.relationship} <span className="block text-xs font-medium text-blue-800 tracking-wide mt-0.5">{m.diet}</span></span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>
      </div>

    </div>
  );
}
