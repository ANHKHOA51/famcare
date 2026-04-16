import React, { useCallback, useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { Search, Pill, UserPlus, Info, AlertTriangle, CheckCircle2, History, Loader2, User, Link2, Mail, Users, Trash2, Stethoscope, PackageOpen } from "lucide-react";

interface FamilyMember {
  id: string;
  name: string;
  relationship: string;
  userId: string;
  linkedUserId?: string | null;
  linkedUser?: { id: string; name: string; email: string };
  isLinked?: boolean;
}

interface Medication {
  id: string;
  name: string;
  dosage: string;
  instructions?: string;
  diagnosis?: string;
  symptoms_treated?: string;
  prescriptionCode?: string | null;
  hospitalName?: string | null;
  isShared?: boolean;
  familyMember: FamilyMember & {
    user: { id: string; name: string; email: string };
  };
  createdAt: string;
}

interface UserSearchResult {
  id: string;
  name?: string;
  email: string;
}

interface SearchResult {
  top_match?: { name: string; reason: string; instructions: string; owner: string };
  alternatives?: Array<{ name: string; reason: string }>;
  warning?: string;
  message?: string;
}

interface CabinetPageProps {
  onNavigate?: (page: string) => void;
}

const CabinetPage = ({ onNavigate }: CabinetPageProps) => {
  const { token, user } = useAuth();
  const [activeTab, setActiveTab] = useState("all");
  const [members, setMembers] = useState<FamilyMember[]>([]);
  const [medications, setMedications] = useState<Medication[]>([]);
  const [symptomQuery, setSymptomQuery] = useState("");
  const [localSearchQuery, setLocalSearchQuery] = useState("");
  const [searchResult, setSearchResult] = useState<SearchResult | null>(null);
  const [searching, setSearching] = useState(false);
  const [loading, setLoading] = useState(true);

  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [userQuery, setUserQuery] = useState("");
  const [userResults, setUserResults] = useState<UserSearchResult[]>([]);
  const [selectedUser, setSelectedUser] = useState<UserSearchResult | null>(null);
  const [relationship, setRelationship] = useState("");
  const [searching2, setSearching2] = useState(false);
  const [adding, setAdding] = useState(false);

  const fetchCabinet = useCallback(async () => {
    try {
      const resp = await fetch("/api/cabinet", { headers: { Authorization: `Bearer ${token}` } });
      if (!resp.ok) {
        const data = await resp.json().catch(() => null);
        throw new Error(data?.error || "Lỗi khi tải tủ thuốc");
      }
      setMedications(await resp.json());
    } catch {
      toast.error("Lỗi khi tải tủ thuốc");
    } finally {
      setLoading(false);
    }
  }, [token]);

  const fetchMembers = useCallback(async () => {
    try {
      const resp = await fetch("/api/family", { headers: { Authorization: `Bearer ${token}` } });
      if (!resp.ok) return;
      setMembers(await resp.json());
    } catch {
      // ignore
    }
  }, [token]);

  useEffect(() => {
    fetchCabinet();
    fetchMembers();
  }, [fetchCabinet, fetchMembers]);

  const handleUserSearch = useCallback(async (q: string) => {
    setUserQuery(q);
    setSelectedUser(null);
    if (q.length < 2) {
      setUserResults([]);
      return;
    }
    setSearching2(true);
    try {
      const resp = await fetch(`/api/family/search?q=${encodeURIComponent(q)}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (resp.ok) {
        setUserResults(await resp.json());
      }
    } catch {
      // ignore
    } finally {
      setSearching2(false);
    }
  }, [token]);

  const handleAddMember = async () => {
    if (!selectedUser || !relationship) {
      toast.error("Vui lòng chọn người và mối quan hệ");
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
        toast.success(`Đã thêm ${selectedUser.name || selectedUser.email} vào gia đình!`);
        await fetchMembers();
        setAddDialogOpen(false);
        setUserQuery("");
        setUserResults([]);
        setSelectedUser(null);
        setRelationship("");
      } else {
        toast.error(data.error || "Lỗi khi thêm thành viên");
      }
    } catch {
      toast.error("Lỗi kết nối");
    } finally {
      setAdding(false);
    }
  };

  const handleSymptomSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!symptomQuery.trim()) return;
    setSearching(true);
    setSearchResult(null);
    try {
      const resp = await fetch("/api/cabinet/search", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ symptom: symptomQuery })
      });
      if (!resp.ok) {
        const errData = await resp.json().catch(() => null);
        throw new Error(errData?.error || "Lỗi khi tìm bằng AI");
      }
      setSearchResult(await resp.json());
    } catch (error: any) {
      toast.error(error?.message || "Lỗi khi tìm thuốc");
    } finally {
      setSearching(false);
    }
  };

  const handleDeleteMedication = async (id: string, name: string) => {
    if (!window.confirm(`Bạn có chắc muốn xóa thuốc "${name}"? Thao tác này không thể hoàn tác.`)) return;
    try {
      const resp = await fetch(`/api/cabinet/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` }
      });
      if (resp.ok) {
        toast.success(`Đã xóa ${name}`);
        setMedications(prev => prev.filter(m => m.id !== id));
      } else {
        const data = await resp.json().catch(() => null);
        toast.error(data?.error || "Không thể xóa thuốc");
      }
    } catch {
      toast.error("Lỗi kết nối");
    }
  };

  const filteredMedications = medications.filter(m => {
    if (localSearchQuery) {
      const q = localSearchQuery.toLowerCase();
      const match =
        m.name.toLowerCase().includes(q) ||
        (m.diagnosis && m.diagnosis.toLowerCase().includes(q)) ||
        (m.symptoms_treated && m.symptoms_treated.toLowerCase().includes(q));
      if (!match) return false;
    }

    if (activeTab === "all") return true;
    if (activeTab === "mine") {
      const isOwnMedication =
        m.familyMember.linkedUserId === user?.id ||
        (m.familyMember.userId === user?.id && !m.familyMember.linkedUserId && m.familyMember.relationship === "Bản thân");

      // Include medications shared to this account from other family owners.
      const isSharedToMe = m.familyMember.userId !== user?.id && m.isShared !== false;

      return isOwnMedication || isSharedToMe;
    }

    const tabMember = members.find(mbr => mbr.id === activeTab);
    if (tabMember?.isLinked) {
      return m.familyMember.userId === tabMember.userId;
    }

    return m.familyMember.id === activeTab;
  });

  const groupedMedications = filteredMedications.reduce((acc, medication) => {
    const groupName = medication.familyMember.name;
    if (!acc[groupName]) acc[groupName] = [];
    acc[groupName].push(medication);
    return acc;
  }, {} as Record<string, Medication[]>);

  return (
    <div className="p-6 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-primary">Tủ thuốc Gia đình</h1>
          <p className="text-muted-foreground mt-1">Quản lý và theo dõi thông tin điều trị của cả nhà dưới tên hiển thị.</p>
        </div>

        <Dialog open={addDialogOpen} onOpenChange={setAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2 shadow-sm">
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
                Tìm thành viên bằng email hoặc tên. Họ phải có tài khoản FamCare.
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
                          {(u.name || u.email)[0].toUpperCase()}
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
      </div>

      {members.length > 0 && (
        <div className="flex items-center gap-3 p-4 bg-muted/30 rounded-2xl border border-border">
          <div className="flex items-center gap-1 shrink-0">
            <Users className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm font-bold text-muted-foreground">Gia đình:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            <div className="flex items-center gap-2 px-3 py-1.5 bg-primary/10 border border-primary/20 rounded-full">
              <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center text-[10px] text-white font-bold">
                {user?.name?.[0]?.toUpperCase()}
              </div>
              <span className="text-xs font-bold text-primary">Bạn</span>
            </div>
            {members.map(m => (
              <div key={m.id} className="flex items-center gap-2 px-3 py-1.5 bg-background border border-border rounded-full group">
                <div className="w-5 h-5 rounded-full bg-muted flex items-center justify-center text-[10px] font-bold">
                  {m.name[0].toUpperCase()}
                </div>
                <span className="text-xs font-semibold">{m.name}</span>
                <span className="text-[10px] text-muted-foreground">({m.relationship})</span>
                {m.linkedUser && (
                  <span title={`Tài khoản: ${m.linkedUser.email}`}>
                    <Link2 className="w-3 h-3 text-primary" />
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative">
        <form onSubmit={handleSymptomSearch} className="flex gap-2 isolate relative bg-background p-[1px] rounded-full shadow-sm ring-1 ring-border/50">
          <div className="relative flex-1">
            <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Hỏi AI: 'Đau đầu sổ mũi uống gì?'"
              className="pl-12 pr-4 h-12 bg-transparent border-0 rounded-l-full focus-visible:ring-0 shadow-none text-base"
              value={symptomQuery}
              onChange={e => setSymptomQuery(e.target.value)}
            />
          </div>
          <Button type="submit" disabled={searching} className="h-12 px-6 rounded-full shadow-none hover:shadow-md transition-shadow">
            {searching ? <div className="animate-spin w-4 h-4 border-2 border-current border-t-transparent rounded-full" /> : "Tìm với AI"}
          </Button>
        </form>

        <div className="flex gap-2 isolate relative bg-background p-[1px] rounded-full shadow-sm ring-1 ring-border/50">
          <div className="relative flex-1">
            <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Bộ lọc: Gõ tên thuốc, bệnh hoặc triệu chứng..."
              className="pl-12 pr-4 h-12 bg-transparent border-0 rounded-full focus-visible:ring-0 shadow-none text-base"
              value={localSearchQuery}
              onChange={e => setLocalSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </div>

      <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-transparent overflow-hidden">
        <CardContent className="p-6 space-y-5">
          <div>
            <h2 className="text-xl font-bold flex items-center gap-2">
              <Search className="w-5 h-5 text-primary" />
              Tìm thuốc theo triệu chứng (AI)
            </h2>
            <p className="text-sm text-muted-foreground mt-1">AI sẽ tìm trong tất cả thuốc của gia đình bạn</p>
          </div>

          <form onSubmit={handleSymptomSearch} className="flex gap-2">
            <Input
              placeholder="Nhập triệu chứng: 'đau bụng', 'sốt', 'nhức đầu'..."
              value={symptomQuery}
              onChange={e => setSymptomQuery(e.target.value)}
              className="h-12 text-base bg-background"
            />
            <Button type="submit" disabled={searching} className="h-12 px-8 shadow-sm">
              {searching ? <Loader2 className="w-4 h-4 animate-spin" /> : "Tìm"}
            </Button>
          </form>

          {searchResult && (
            <div className="animate-in zoom-in-95 fade-in duration-300 space-y-4 pt-2 border-t border-primary/10">
              {searchResult.message ? (
                <div className="p-4 bg-muted rounded-xl flex items-center gap-3">
                  <Info className="w-5 h-5 text-muted-foreground shrink-0" />
                  <p className="text-sm">{searchResult.message}</p>
                </div>
              ) : (
                <>
                  {searchResult.top_match && (
                    <div className="p-5 bg-primary/10 rounded-2xl border border-primary/20 relative">
                      <Badge className="absolute top-4 right-4 bg-primary text-white text-[11px]">Gợi ý tốt nhất</Badge>
                      <div className="flex gap-4">
                        <div className="p-3 bg-primary/20 rounded-xl h-fit">
                          <Pill className="w-6 h-6 text-primary" />
                        </div>
                        <div className="space-y-2 flex-1 pr-24">
                          <h3 className="text-xl font-bold text-primary">{searchResult.top_match.name}</h3>
                          <p className="text-sm text-muted-foreground flex items-center gap-1">
                            <User className="w-3.5 h-3.5" /> Của: <span className="font-semibold text-foreground">{searchResult.top_match.owner}</span>
                          </p>
                          <p className="text-sm italic bg-background/60 p-3 rounded-lg border border-primary/10">"{searchResult.top_match.reason}"</p>
                          <div className="p-3 bg-background border border-primary/15 rounded-xl">
                            <p className="text-[11px] font-bold uppercase text-primary/60 mb-1">Cách dùng:</p>
                            <p className="font-bold text-primary text-sm">{searchResult.top_match.instructions}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  {searchResult.warning && (
                    <div className="p-4 bg-destructive/10 rounded-xl flex items-start gap-3 border border-destructive/20">
                      <AlertTriangle className="w-5 h-5 text-destructive shrink-0 mt-0.5" />
                      <p className="text-sm text-destructive font-medium">{searchResult.warning}</p>
                    </div>
                  )}
                  {searchResult.alternatives && searchResult.alternatives.length > 0 && (
                    <div className="space-y-2">
                      <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground">Lựa chọn thay thế</p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {searchResult.alternatives.map((a, i) => (
                          <div key={i} className="p-3 bg-background border rounded-xl flex gap-3 items-center">
                            <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0" />
                            <div>
                              <p className="font-bold text-sm">{a.name}</p>
                              <p className="text-xs text-muted-foreground">{a.reason}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      <div>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="bg-muted p-1 rounded-xl mb-6 flex flex-wrap h-auto">
            <TabsTrigger value="all" className="rounded-lg px-4 font-bold">
              Tất cả ({medications.length})
            </TabsTrigger>
            <TabsTrigger value="mine" className="rounded-lg px-4 font-bold">
              Của tôi
            </TabsTrigger>
            {members.map(m => (
              <TabsTrigger key={m.id} value={m.id} className="rounded-lg px-4 font-bold">
                {m.name}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value={activeTab}>
            {loading ? (
              <div className="flex flex-col items-center py-20 gap-3">
                <Loader2 className="w-8 h-8 animate-spin text-primary/30" />
                <p className="text-muted-foreground text-sm animate-pulse">Đang tải tủ thuốc...</p>
              </div>
            ) : Object.keys(groupedMedications).length === 0 ? (
              <div className="flex flex-col items-center justify-center py-28 px-6 bg-gradient-to-b from-background to-muted/30 rounded-3xl border border-primary/10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] text-center relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/30 to-transparent"></div>
                <div className="relative mb-8 group">
                  <div className="absolute inset-0 bg-primary/20 blur-2xl rounded-full scale-110 opacity-70 group-hover:opacity-100 transition-opacity duration-700"></div>
                  <div className="w-28 h-28 bg-background rounded-full flex items-center justify-center mx-auto ring-1 ring-border shadow-2xl relative z-10 overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-br before:from-primary/10 before:to-transparent">
                    <PackageOpen className="text-primary w-12 h-12 stroke-[1.5] group-hover:scale-110 transition-transform duration-500" />
                  </div>
                  <div className="w-14 h-14 bg-background rounded-full flex items-center justify-center shadow-lg ring-1 ring-border absolute -bottom-2 -right-2 z-20">
                    <Stethoscope className="text-primary/70 w-6 h-6 stroke-[2]" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-3 font-display tracking-tight">Tủ thuốc gia đình trống</h3>
                <p className="text-muted-foreground max-w-sm mx-auto leading-relaxed text-[15px]">
                  Không tìm thấy loại thuốc nào. Bắt đầu xây dựng tủ thuốc thông minh bằng cách quét đơn thuốc mới.
                </p>
                <div className="mt-10 flex gap-4 justify-center relative z-10">
                  <Button 
                    onClick={() => onNavigate?.("home")} 
                    className="rounded-full shadow-[0_8px_20px_rgb(var(--primary)_/_0.25)] hover:shadow-[0_8px_25px_rgb(var(--primary)_/_0.35)] font-semibold font-display gap-2.5 group transition-all h-12 px-8 bg-primary hover:bg-primary/90 text-primary-foreground"
                  >
                    <History className="w-4 h-4 group-hover:-rotate-12 transition-transform duration-300" />
                    Quét đơn thuốc ngay
                  </Button>
                </div>
                
                {/* Decorative background elements */}
                <div className="absolute top-1/4 -left-12 w-40 h-40 bg-primary/5 rounded-full blur-3xl"></div>
                <div className="absolute bottom-1/4 -right-12 w-40 h-40 bg-primary/5 rounded-full blur-3xl"></div>
              </div>
            ) : (
              <div className="space-y-12">
                {Object.entries(groupedMedications).map(([groupName, meds]) => (
                  <div key={groupName} className="space-y-4">
                    <div className="flex items-center gap-3 pb-2 border-b border-border/50">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold shadow-sm">
                        {groupName[0].toUpperCase()}
                      </div>
                      <h2 className="text-lg font-bold text-foreground">{groupName}</h2>
                      <Badge variant="secondary" className="ml-2 font-mono text-xs rounded-full bg-muted/50">
                        {meds.length} thuốc
                      </Badge>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5">
                      {meds.map(med => (
                        <Card key={med.id} className="border-border/50 hover:border-primary/30 transition-all hover:shadow-md bg-gradient-to-br from-background to-muted/20 group rounded-2xl overflow-hidden relative">
                          <CardContent className="p-6">
                            <div className="flex justify-between items-start mb-4">
                              <div className="flex-1 pr-4 min-w-0">
                                <h3 className="font-bold text-lg text-foreground line-clamp-1 mb-1.5">{med.name}</h3>
                                {med.diagnosis && (
                                  <Badge
                                    variant="outline"
                                    className="text-[10px] font-semibold tracking-wide bg-primary/5 text-primary border-primary/20 mb-2 max-w-full inline-flex"
                                  >
                                    <span className="truncate block">{med.diagnosis}</span>
                                  </Badge>
                                )}
                                <p className="text-sm font-semibold text-primary/80 truncate flex items-center gap-1.5">
                                  {med.dosage}
                                </p>
                              </div>
                              <div className="w-12 h-12 rounded-xl bg-primary/8 flex items-center justify-center shrink-0 border border-primary/10 shadow-sm group-hover:scale-110 transition-transform">
                                <Pill className="text-primary w-6 h-6" />
                              </div>
                            </div>

                            <div className="space-y-3 min-h-[160px] flex flex-col justify-start">
                              {med.symptoms_treated ? (
                                <div className="bg-background rounded-xl p-3 border border-border/50 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] h-[70px]">
                                  <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-1 flex items-center gap-1">Chữa triệu chứng</p>
                                  <p className="text-sm text-foreground font-medium line-clamp-1" title={med.symptoms_treated}>{med.symptoms_treated}</p>
                                </div>
                              ) : (
                                <div className="h-[70px] bg-muted/10 rounded-xl border border-dashed border-border/30 flex items-center justify-center">
                                  <span className="text-[10px] uppercase text-muted-foreground/50 font-bold">Chưa có triệu chứng</span>
                                </div>
                              )}

                              {med.instructions ? (
                                <div className="bg-background rounded-xl p-3 border border-border/50 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] h-[70px]">
                                  <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-1 flex items-center gap-1">Cách dùng</p>
                                  <p className="text-sm text-foreground italic leading-tight line-clamp-2" title={med.instructions}>{med.instructions}</p>
                                </div>
                              ) : (
                                <div className="h-[70px] bg-muted/10 rounded-xl border border-dashed border-border/30 flex items-center justify-center">
                                  <span className="text-[10px] uppercase text-muted-foreground/50 font-bold">Chưa có cách dùng</span>
                                </div>
                              )}
                            </div>

                            <div className="min-h-[44px] mt-4 pt-4 border-t border-border/40 flex flex-col justify-center">
                              {med.prescriptionCode || med.hospitalName ? (
                                <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground w-full">
                                  {med.prescriptionCode && <div className="truncate text-[11px]"><span className="font-medium">Đơn:</span> {med.prescriptionCode}</div>}
                                  {med.hospitalName && <div className="truncate text-[11px]"><span className="font-medium">Nơi khám:</span> {med.hospitalName}</div>}
                                </div>
                              ) : (
                                <div className="text-[11px] text-muted-foreground/40 italic text-center w-full">Không có thông tin đơn thuốc</div>
                              )}
                            </div>

                            <div className="mt-5 pt-4 border-t border-border/50 flex items-center justify-between">
                              <p className="text-[11px] font-medium text-muted-foreground">
                                Thêm vào {new Date(med.createdAt).toLocaleDateString("vi-VN")}
                              </p>
                              {(med.familyMember.userId === user?.id || med.familyMember.linkedUserId === user?.id) && (
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-full"
                                  onClick={() => handleDeleteMedication(med.id, med.name)}
                                  title="Xóa thuốc khỏi tủ"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              )}
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default CabinetPage;
