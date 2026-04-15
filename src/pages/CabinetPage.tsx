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
import { Search, Pill, UserPlus, Info, AlertTriangle, CheckCircle2, History, Loader2, User, Link2, Mail, Users, Trash2 } from "lucide-react";

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
      return m.familyMember.linkedUserId === user?.id ||
        (m.familyMember.userId === user?.id && !m.familyMember.linkedUserId && m.familyMember.relationship === "Bản thân");
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
              <div className="text-center py-24 px-6 border-2 border-dashed border-border rounded-3xl bg-muted/20">
                <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner ring-4 ring-primary/5">
                  <Pill className="text-primary w-10 h-10" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">Tủ thuốc đang trống</h3>
                <p className="text-muted-foreground max-w-md mx-auto leading-relaxed">
                  Chưa có loại thuốc nào được thêm vào. Bắt đầu bằng cách quét đơn thuốc hoặc thêm thủ công.
                </p>
                <div className="mt-8 flex gap-3 justify-center">
                  <Button onClick={() => onNavigate?.("home")} className="rounded-full shadow-md font-semibold font-display gap-2 group hover:shadow-lg transition-all h-11 px-6">
                    <History className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    Quét đơn thuốc ngay
                  </Button>
                </div>
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
                              <div className="flex-1 pr-4">
                                <div className="flex items-center gap-2 mb-1.5">
                                  <h3 className="font-bold text-lg text-foreground line-clamp-1">{med.name}</h3>
                                  {med.diagnosis && (
                                    <Badge variant="outline" className="text-[10px] font-semibold tracking-wide bg-primary/5 text-primary border-primary/20 shrink-0">
                                      {med.diagnosis}
                                    </Badge>
                                  )}
                                </div>
                                <p className="text-sm font-semibold text-primary/80 truncate flex items-center gap-1.5">
                                  {med.dosage}
                                </p>
                              </div>
                              <div className="w-12 h-12 rounded-xl bg-primary/8 flex items-center justify-center shrink-0 border border-primary/10 shadow-sm group-hover:scale-110 transition-transform">
                                <Pill className="text-primary w-6 h-6" />
                              </div>
                            </div>

                            <div className="space-y-3">
                              {med.symptoms_treated && (
                                <div className="bg-background rounded-xl p-3 border border-border/50 shadow-sm">
                                  <p className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground mb-1.5 flex items-center gap-1">Chữa triệu chứng</p>
                                  <p className="text-sm font-medium text-foreground line-clamp-1">{med.symptoms_treated}</p>
                                </div>
                              )}

                              {med.instructions && (
                                <div className="bg-background rounded-xl p-3 border border-border/50 shadow-sm">
                                  <p className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground mb-1.5 flex items-center gap-1">Cách dùng</p>
                                  <p className="text-sm text-foreground italic leading-relaxed line-clamp-2">{med.instructions}</p>
                                </div>
                              )}
                            </div>

                            {(med.prescriptionCode || med.hospitalName) && (
                              <div className="mt-4 pt-4 border-t border-border/40 grid grid-cols-2 gap-2 text-xs text-muted-foreground">
                                {med.prescriptionCode && <div className="truncate"><span className="font-medium">Mã Đơn:</span> {med.prescriptionCode}</div>}
                                {med.hospitalName && <div className="truncate"><span className="font-medium">Khám tại:</span> {med.hospitalName}</div>}
                              </div>
                            )}

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
