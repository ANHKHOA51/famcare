import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Loader2, User, Activity, Users, UserPlus, Search, Mail, Link2 } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function ProfilePage() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

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

  const [familyMembers, setFamilyMembers] = useState<{
    id: string;
    name: string;
    relationship: string;
    linkedUser: { email: string } | null;
  }[]>([]);

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
        setFamilyMembers(data.ownedMembers || []);
      }
    } catch (error) {
      toast({
        title: "Lỗi",
        description: "Không thể lấy thông tin cá nhân",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, [toast]);

  // Handle Add Member
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
      setUserResults(await resp.json());
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

  // Handle Remove Member
  const handleRemoveMember = async (id: string, name: string) => {
    if (!window.confirm(`Bạn có chắc muốn xóa "${name}" khỏi gia đình? Toàn bộ hồ sơ thuốc của họ cũng sẽ bị xóa.`)) return;
    try {
      const token = localStorage.getItem('aura_token');
      const resp = await fetch(`/api/family/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` }
      });
      if (resp.ok) {
        toast({ title: "Thành công", description: `Đã xóa ${name} khỏi gia đình.` });
        fetchProfile(); // Refresh the list
      } else {
        const data = await resp.json();
        toast({ title: "Lỗi", description: data.error || "Không thể xóa thành viên", variant: "destructive" });
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
        toast({
          title: "Thành công",
          description: "Đã cập nhật thông tin cá nhân",
        });
      } else {
        throw new Error('Failed to save');
      }
    } catch (error) {
      toast({
        title: "Lỗi",
        description: "Có lỗi xảy ra khi lưu thông tin. Vui lòng thử lại sau.",
        variant: "destructive"
      });
    } finally {
      setSaving(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  if (loading) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 max-w-4xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Hồ sơ cá nhân</h1>
        <p className="text-muted-foreground mt-1">Quản lý thông tin chung, hồ sơ y tế và kết nối gia đình của bạn.</p>
      </div>

      <Tabs defaultValue="personal" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="personal" className="flex items-center gap-2">
            <User className="h-4 w-4" />
            <span className="hidden sm:inline">Thông tin chung</span>
          </TabsTrigger>
          <TabsTrigger value="medical" className="flex items-center gap-2">
            <Activity className="h-4 w-4" />
            <span className="hidden sm:inline">Dữ liệu y tế</span>
          </TabsTrigger>
          <TabsTrigger value="family" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            <span className="hidden sm:inline">Gia đình</span>
          </TabsTrigger>
        </TabsList>

        <form onSubmit={handleSave}>
          <TabsContent value="personal">
            <Card>
              <CardHeader>
                <CardTitle>Thông tin chung</CardTitle>
                <CardDescription>Cập nhật thông tin nhận diện cơ bản của bạn</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Họ và tên</Label>
                    <Input id="name" name="name" value={formData.name} onChange={handleChange} placeholder="VD: Nguyễn Văn A" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" value={formData.email} disabled className="bg-muted" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Số điện thoại</Label>
                    <Input id="phone" name="phone" value={formData.phone} onChange={handleChange} placeholder="VD: 0912345678" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="dob">Ngày sinh</Label>
                    <Input id="dob" name="dob" type="date" value={formData.dob} onChange={handleChange} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="gender">Giới tính</Label>
                    <Select value={formData.gender} onValueChange={(v) => setFormData(p => ({ ...p, gender: v }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Chọn giới tính" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="nam">Nam</SelectItem>
                        <SelectItem value="nu">Nữ</SelectItem>
                        <SelectItem value="khac">Khác</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="address">Địa chỉ</Label>
                    <Input id="address" name="address" value={formData.address} onChange={handleChange} placeholder="VD: 123 Đường ABC, Quận XYZ..." />
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end border-t p-4">
                <Button type="submit" disabled={saving}>
                  {saving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                  Lưu thay đổi
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="medical">
            <Card>
              <CardHeader>
                <CardTitle>Dữ liệu y tế</CardTitle>
                <CardDescription>Hồ sơ sức khỏe giúp các bác sĩ và hệ thống AI tối ưu tư vấn cho bạn.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                   <div className="space-y-2">
                    <Label htmlFor="bloodType">Nhóm máu</Label>
                    <Select value={formData.bloodType} onValueChange={(v) => setFormData(p => ({ ...p, bloodType: v }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Chọn nhóm máu" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="a">A</SelectItem>
                        <SelectItem value="b">B</SelectItem>
                        <SelectItem value="ab">AB</SelectItem>
                        <SelectItem value="o">O</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="flex gap-4">
                    <div className="space-y-2 flex-1">
                      <Label htmlFor="height">Chiều cao (cm)</Label>
                      <Input id="height" name="height" type="number" value={formData.height} onChange={handleChange} placeholder="VD: 170" />
                    </div>
                    <div className="space-y-2 flex-1">
                      <Label htmlFor="weight">Cân nặng (kg)</Label>
                      <Input id="weight" name="weight" type="number" value={formData.weight} onChange={handleChange} placeholder="VD: 65" />
                    </div>
                  </div>

                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="allergies">Dị ứng thuốc/thức ăn</Label>
                    <Input id="allergies" name="allergies" value={formData.allergies} onChange={handleChange} placeholder="VD: Dị ứng Penicillin, Hải sản..." />
                  </div>
                  
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="chronicIllness">Tiểu sử bệnh mãn tính</Label>
                    <Input id="chronicIllness" name="chronicIllness" value={formData.chronicIllness} onChange={handleChange} placeholder="VD: Huyết áp cao, Tiểu đường type 2..." />
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end border-t p-4">
                <Button type="submit" disabled={saving}>
                  {saving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                  Lưu hồ sơ y tế
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </form>

        <TabsContent value="family">
          <Card>
            <CardHeader>
              <CardTitle>Kết nối gia đình</CardTitle>
              <CardDescription>Những tài khoản gia đình được quản lý bởi bạn.</CardDescription>
            </CardHeader>
            <CardContent>
              {familyMembers.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  Chưa có thành viên gia đình nào được liên kết.
                </div>
              ) : (
                <div className="space-y-4">
                  {familyMembers.map((member) => (
                    <div key={member.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <p className="font-medium">{member.name}</p>
                        <p className="text-sm text-muted-foreground">Quan hệ: {member.relationship} {member.linkedUser ? `(${member.linkedUser.email})` : ''}</p>
                      </div>
                      <div className="flex gap-2">
                        {member.relationship !== 'Bản thân' && (
                          <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={() => handleRemoveMember(member.id, member.name)}
                            className="text-destructive hover:bg-destructive hover:text-white"
                          >
                            Xóa
                          </Button>
                        )}
                        <Button variant="outline" size="sm">Xem hồ sơ</Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
            <CardFooter className="flex justify-start border-t p-4">
              <Dialog open={addDialogOpen} onOpenChange={setAddDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="gap-2">
                    <UserPlus className="w-4 h-4" />
                    Thêm thành viên
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                      <Users className="w-5 h-5 text-primary" />
                      Thêm thành viên gia đình
                    </DialogTitle>
                    <DialogDescription>
                      Tìm thành viên bằng email hoặc tên (Yêu cầu phải có tài khoản FamCare).
                    </DialogDescription>
                  </DialogHeader>
      
                  <div className="space-y-4 py-2">
                    <div className="space-y-2">
                      <Label className="text-sm font-bold uppercase tracking-wider text-muted-foreground">
                        Bước 1: Tìm kiếm người dùng
                      </Label>
                      <div className="relative">
                        <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                        <Input
                          placeholder="Nhập email hoặc tên..."
                          value={userQuery}
                          onChange={e => handleUserSearch(e.target.value)}
                          className="pl-9"
                        />
                        {searching2 && <Loader2 className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 animate-spin text-muted-foreground" />}
                      </div>
      
                      {userResults.length > 0 && !selectedUser && (
                        <div className="border border-border rounded-xl overflow-hidden shadow-sm">
                          {userResults.map(u => (
                            <button
                              key={u.id}
                              onClick={() => { setSelectedUser(u); setUserResults([]); }}
                              className="w-full flex items-center gap-3 p-3 hover:bg-primary/5 transition-colors text-left border-b border-border last:border-0"
                            >
                              <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm shrink-0">
                                {u.name ? u.name[0].toUpperCase() : u.email[0].toUpperCase()}
                              </div>
                              <div>
                                <p className="font-bold text-sm">{u.name || "Chưa đặt tên"}</p>
                                <p className="text-xs text-muted-foreground flex items-center gap-1">
                                  <Mail className="w-3 h-3" />{u.email}
                                </p>
                              </div>
                            </button>
                          ))}
                        </div>
                      )}
      
                      {userQuery.length >= 2 && userResults.length === 0 && !searching2 && !selectedUser && (
                        <p className="text-sm text-muted-foreground text-center py-3 border border-dashed border-border rounded-xl">
                          Không tìm thấy người dùng nào
                        </p>
                      )}
                    </div>
      
                    {selectedUser && (
                      <div className="p-3 bg-primary/5 border border-primary/20 rounded-xl flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                            {(selectedUser.name || selectedUser.email)[0].toUpperCase()}
                          </div>
                          <div>
                            <p className="font-bold text-sm">{selectedUser.name || "Chưa đặt tên"}</p>
                            <p className="text-xs text-muted-foreground">{selectedUser.email}</p>
                          </div>
                        </div>
                        <Badge className="bg-primary text-white gap-1">
                          <Link2 className="w-3 h-3" /> Đã chọn
                        </Badge>
                      </div>
                    )}
      
                    {selectedUser && (
                      <div className="space-y-2">
                        <Label className="text-sm font-bold uppercase tracking-wider text-muted-foreground">
                          Bước 2: Mối quan hệ
                        </Label>
                        <Select onValueChange={setRelationship} value={relationship}>
                          <SelectTrigger>
                            <SelectValue placeholder="Họ là ai với bạn?" />
                          </SelectTrigger>
                          <SelectContent>
                            {["Vợ", "Chồng", "Con", "Bố", "Mẹ", "Anh", "Chị", "Em", "Ông", "Bà", "Khác"].map(r => (
                              <SelectItem key={r} value={r}>{r}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    )}
                  </div>
      
                  <DialogFooter>
                    <Button variant="outline" onClick={() => { setAddDialogOpen(false); setSelectedUser(null); setUserQuery(""); setRelationship(""); }}>
                      Hủy
                    </Button>
                    <Button onClick={handleAddMember} disabled={!selectedUser || !relationship || adding}>
                      {adding ? <Loader2 className="animate-spin w-4 h-4 mr-2" /> : <UserPlus className="w-4 h-4 mr-2" />}
                      Thêm vào gia đình
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}