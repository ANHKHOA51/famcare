import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Clock, CalendarDays, MapPin, Video, Stethoscope, ChevronRight, Activity, Plus, Search } from "lucide-react";
import { toast } from "sonner";

const DOCTORS = [
  { name: "Ngô Trung Nam", title: "CK II", academicTitle: "CK II", department: "Sản", location: "Online", hospital: "Phòng khám tư", district: "Quận 1", gender: "Nam", schedule: "Thứ 2.4.5", time: "09:30", price: "200.000đ" },
  { name: "Trương Duy Thái", title: "BS", academicTitle: "BS", department: "Tai-Mũi-Họng", location: "Bệnh viện Đa khoa quốc tế Hoàn Mỹ", hospital: "Bệnh viện Đa khoa quốc tế Hoàn Mỹ", district: "Phú Nhuận", gender: "Nam", schedule: "Thứ 5.6.7", time: "7:00 - 11:00", price: "450.000đ" },
  { name: "Trịnh Xuân Quân", title: "Ths.Bs", academicTitle: "ThS", department: "Tai-Mũi-Họng", location: "Online", hospital: "Phòng khám tư", district: "Quận 3", gender: "Nam", schedule: "Cả tuần", time: "18:00 - 20:00", price: "150.000đ" },
  { name: "Nguyễn Thị Lam", title: "CK II", academicTitle: "CK II", department: "Khoa y học cổ truyền - phục hồi chức năng", location: "Bệnh Viện Đa Khoa Hồng Đức II", hospital: "Bệnh Viện Đa Khoa Hồng Đức II", district: "Gò Vấp", gender: "Nữ", schedule: "Thứ 2.3.4.5.6.7", time: "7:00 - 11:00", price: "300.000đ" },
  { name: "Lê Khánh Điền", title: "Trưởng Khoa", academicTitle: "CK II", department: "Phục Hồi Chức Năng", location: "Bệnh viện An Bình", hospital: "Bệnh viện An Bình", district: "Quận 5", gender: "Nam", schedule: "2026-05-03", time: "13:00-17:00", price: "300.000đ" },
  { name: "Vũ Thị Hà", title: "CK I", academicTitle: "CK I", department: "Mắt", location: "Online", hospital: "Phòng khám tư", district: "Quận 10", gender: "Nữ", schedule: "Cả tuần", time: "Cả ngày", price: "150.000đ" },
  { name: "Nguyễn Lê Nguyên", title: "Ths.Bs", academicTitle: "ThS", department: "Da liễu", location: "Bệnh viện Da liễu TP.HCM", hospital: "Bệnh viện Da liễu TP.HCM", district: "Quận 3", gender: "Nam", schedule: "Thứ 3.5.7", time: "17:00 - 20:00", price: "250.000đ" },
  { name: "Phạm Thành Trung", title: "BS", academicTitle: "BS", department: "Răng-Hàm-Mặt", location: "Nha khoa Kim", hospital: "Nha khoa Kim", district: "Quận 1", gender: "Nam", schedule: "Cả tuần", time: "08:00 - 20:00", price: "100.000đ" },
  { name: "Đặng Huy Quốc Thịnh", title: "CK II", academicTitle: "CK II", department: "Ung bướu", location: "Bệnh viện Ung bướu TP.HCM", hospital: "Bệnh viện Ung bướu TP.HCM", district: "Bình Thạnh", gender: "Nam", schedule: "Thứ 2.4.6", time: "07:30 - 11:30", price: "500.000đ" },
  { name: "Nguyễn Hữu Tùng", title: "BS", academicTitle: "BS", department: "Nội tổng quát", location: "Bệnh viện Đa khoa Tâm Anh", hospital: "Bệnh viện Đa khoa Tâm Anh", district: "Tân Bình", gender: "Nam", schedule: "Thứ 2.3.4.5.6", time: "07:00 - 16:00", price: "400.000đ" },
  { name: "Trần Thị Minh Hạnh", title: "Ths.Bs", academicTitle: "ThS", department: "Dinh dưỡng", location: "Online", hospital: "Phòng khám tư", district: "Quận 5", gender: "Nữ", schedule: "Thứ 7, Chủ nhật", time: "08:00 - 11:00", price: "300.000đ" },
  { name: "Huỳnh Thanh Hiển", title: "BS", academicTitle: "BS", department: "Tâm thần", location: "Bệnh viện Tâm thần TP.HCM", hospital: "Bệnh viện Tâm thần TP.HCM", district: "Quận 5", gender: "Nam", schedule: "Thứ 2.4.6", time: "16:00 - 19:00", price: "350.000đ" },
  { name: "Nguyễn Anh Tuấn", title: "PGS.TS.BS", academicTitle: "PGS", department: "Tiêu hóa", location: "Bệnh viện Đại học Y Dược", hospital: "Bệnh viện Đại học Y Dược", district: "Quận 5", gender: "Nam", schedule: "Thứ 3.5", time: "07:00 - 11:00", price: "600.000đ" },
  { name: "Lê Thị Tuyết Phượng", title: "CK II", academicTitle: "CK II", department: "Nội tiêu hóa", location: "Bệnh viện Nhân dân 115", hospital: "Bệnh viện Nhân dân 115", district: "Quận 10", gender: "Nữ", schedule: "Thứ 2.4.6", time: "07:00 - 11:30", price: "450.000đ" },
  { name: "Đỗ Quang Huân", title: "PGS.TS.BS", academicTitle: "PGS", department: "Tim mạch", location: "Viện Tim TP.HCM", hospital: "Viện Tim TP.HCM", district: "Quận 10", gender: "Nam", schedule: "Thứ 2.4", time: "07:30 - 11:30", price: "700.000đ" },
  { name: "Nguyễn Thị Thanh Hà", title: "PGS.TS.BS", academicTitle: "PGS", department: "Sản phụ khoa", location: "Bệnh viện Từ Dũ", hospital: "Bệnh viện Từ Dũ", district: "Quận 1", gender: "Nữ", schedule: "Thứ 3.5.7", time: "16:30 - 19:30", price: "550.000đ" },
  { name: "Trương Hữu Khanh", title: "BS", academicTitle: "BS", department: "Nội nhi", location: "Bệnh viện Nhi đồng 1", hospital: "Bệnh viện Nhi đồng 1", district: "Quận 10", gender: "Nam", schedule: "Thứ 2.4.6", time: "16:00 - 18:00", price: "400.000đ" },
  { name: "Nguyễn Trọng Hào", title: "TS.BS", academicTitle: "TS", department: "Da liễu", location: "Bệnh viện Da liễu TP.HCM", hospital: "Bệnh viện Da liễu TP.HCM", district: "Quận 3", gender: "Nam", schedule: "Thứ 2.4.6", time: "07:00 - 11:00", price: "500.000đ" },
  { name: "Võ Văn Thành", title: "PGS.TS.BS", academicTitle: "PGS", department: "Chấn thương chỉnh hình", location: "Bệnh viện Chấn thương chỉnh hình", hospital: "Bệnh viện Chấn thương chỉnh hình", district: "Quận 5", gender: "Nam", schedule: "Thứ 3.5", time: "08:00 - 11:00", price: "800.000đ" },
  { name: "Nguyễn Ty Phương", title: "Ths.Bs", academicTitle: "ThS", department: "Nội tiết", location: "Online", hospital: "Phòng khám tư", district: "Tân Bình", gender: "Nữ", schedule: "Thứ 2.4.6", time: "19:00 - 21:00", price: "250.000đ" },
  { name: "Phan Thanh Hải", title: "BS", academicTitle: "BS", department: "Chẩn đoán hình ảnh", location: "Trung tâm Y khoa Medic", hospital: "Trung tâm Y khoa Medic", district: "Quận 10", gender: "Nam", schedule: "Cả tuần", time: "07:00 - 19:00", price: "300.000đ" },
  { name: "Nguyễn Hoài Nam", title: "PGS.TS.BS", academicTitle: "PGS", department: "Lồng ngực - Mạch máu", location: "Bệnh viện Đại học Y Dược", hospital: "Bệnh viện Đại học Y Dược", district: "Quận 5", gender: "Nam", schedule: "Thứ 2.4.6", time: "07:00 - 11:00", price: "600.000đ" },
  { name: "Trần Ngọc Ánh", title: "PGS.TS.BS", academicTitle: "PGS", department: "Da liễu", location: "Phòng khám Da liễu Trần Ngọc Ánh", hospital: "Phòng khám Da liễu", district: "Tiếp Tân", gender: "Nữ", schedule: "Cả tuần", time: "16:00 - 20:00", price: "400.000đ" },
  { name: "Cao Hữu Thịnh", title: "BS", academicTitle: "BS", department: "Sản phụ khoa - Hiếm muộn", location: "Bệnh viện An Sinh", hospital: "Bệnh viện An Sinh", district: "Phú Nhuận", gender: "Nam", schedule: "Thứ 2.3.4.5.6", time: "08:00 - 17:00", price: "500.000đ" },
  { name: "Lương Lễ Hoàng", title: "BS", academicTitle: "BS", department: "Nội khoa - Y học dân tộc", location: "Trung tâm Oxy cao áp", hospital: "Trung tâm Oxy cao áp", district: "Quận 10", gender: "Nam", schedule: "Thứ 3.5", time: "08:00 - 11:00", price: "450.000đ" },
  { name: "Nguyễn Thị Ngọc Phượng", title: "GS.TS.BS", academicTitle: "GS", department: "Sản phụ khoa", location: "Bệnh viện Mỹ Đức", hospital: "Bệnh viện Mỹ Đức", district: "Tân Bình", gender: "Nữ", schedule: "Thứ 2.4.6", time: "08:00 - 11:00", price: "1.000.000đ" },
  { name: "Trần Đông A", title: "GS.TS.BS", academicTitle: "GS", department: "Ngoại nhi", location: "Bệnh viện Nhi đồng 2", hospital: "Bệnh viện Nhi đồng 2", district: "Quận 1", gender: "Nam", schedule: "Theo lịch hẹn", time: "Theo lịch hẹn", price: "800.000đ" },
  { name: "Nguyễn Chấn Hùng", title: "GS.TS.BS", academicTitle: "GS", department: "Ung bướu", location: "Bệnh viện Ung bướu TP.HCM", hospital: "Bệnh viện Ung bướu TP.HCM", district: "Bình Thạnh", gender: "Nam", schedule: "Theo lịch hẹn", time: "Theo lịch hẹn", price: "1.000.000đ" },
  { name: "Đỗ Hồng Ngọc", title: "BS", academicTitle: "BS", department: "Nhi khoa", location: "Online/Tư vấn", hospital: "Phòng khám tư", district: "Quận 3", gender: "Nam", schedule: "Theo lịch hẹn", time: "Theo lịch hẹn", price: "500.000đ" },
  { name: "Nguyễn Lân Hiếu", title: "PGS.TS.BS", academicTitle: "PGS", department: "Tim mạch", location: "Bệnh viện Đại học Y Hà Nội", hospital: "Bệnh viện Đại học Y Hà Nội", district: "Hà Nội", gender: "Nam", schedule: "Thứ 2.4", time: "07:30 - 11:30", price: "700.000đ" }
];

export default function AppointmentsPage() {
  const [searchParams] = useSearchParams();
  const [view, setView] = useState("my"); // "my" or "search"
  const [searchTerm, setSearchTerm] = useState("");
  const [deptFilter, setDeptFilter] = useState("Tất cả");
  const [titleFilter, setTitleFilter] = useState("Tất cả");
  const [hospitalFilter, setHospitalFilter] = useState("Tất cả");
  const [districtFilter, setDistrictFilter] = useState("Tất cả");
  const [genderFilter, setGenderFilter] = useState("Tất cả");

  // Read ?filter= query param from URL (e.g. navigated from Scanner or MealPlan CTA)
  useEffect(() => {
    const filter = searchParams.get("filter");
    if (filter) {
      setView("search");
      setSearchTerm(filter);
    }
  }, [searchParams]);

  const appointments = [
    {
      id: 1,
      doctor: "BS. Nguyễn Văn An",
      specialty: "Nội Tim Mạch",
      hospital: "Bệnh viện Đa khoa Tâm Anh",
      date: "10:30 AM • 20/05/2026",
      type: "online",
      status: "upcoming"
    },
    {
      id: 2,
      doctor: "BS. Trần Thị Bình",
      specialty: "Cơ Xương Khớp",
      hospital: "Bệnh viện Chấn thương Chỉnh hình",
      date: "14:00 PM • 15/05/2026",
      type: "offline",
      status: "upcoming"
    }
  ];

  const filteredDoctors = DOCTORS.filter(doc => {
    const matchesSearch = doc.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          doc.department.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDept = deptFilter === "Tất cả" || doc.department.includes(deptFilter);
    const matchesTitle = titleFilter === "Tất cả" || doc.academicTitle === titleFilter;
    const matchesHospital = hospitalFilter === "Tất cả" || doc.hospital.includes(hospitalFilter);
    const matchesDistrict = districtFilter === "Tất cả" || doc.district === districtFilter;
    const matchesGender = genderFilter === "Tất cả" || doc.gender === genderFilter;
    
    return matchesSearch && matchesDept && matchesTitle && matchesHospital && matchesDistrict && matchesGender;
  });

  const departments = ["Tất cả", ...Array.from(new Set(DOCTORS.map(d => d.department.split(" - ")[0])))];
  const academicTitles = ["Tất cả", ...Array.from(new Set(DOCTORS.map(d => d.academicTitle)))];
  const hospitals = ["Tất cả", ...Array.from(new Set(DOCTORS.map(d => d.hospital)))];
  const districts = ["Tất cả", ...Array.from(new Set(DOCTORS.map(d => d.district)))];
  const genders = ["Tất cả", "Nam", "Nữ"];

  return (
    <div className="p-6 md:p-10 max-w-7xl mx-auto animate-fade-in relative container-fluid bg-[#f8fafc] min-h-screen">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
        <div>
          <h1 className="text-3xl md:text-4xl font-display font-bold text-slate-900 tracking-tight mb-2">Hệ thống Y tế</h1>
          <p className="text-slate-500">Đặt lịch khám với các chuyên gia hàng đầu và quản lý sức khỏe gia đình.</p>
        </div>
        <div className="flex bg-slate-200/50 p-1 rounded-2xl">
          <button 
            onClick={() => setView("my")}
            className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${view === 'my' ? 'bg-white text-teal-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
          >
            Lịch của tôi
          </button>
          <button 
            onClick={() => setView("search")}
            className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${view === 'search' ? 'bg-white text-teal-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
          >
            Tìm bác sĩ
          </button>
        </div>
      </div>

      {view === 'search' && (
        <div className="mb-10 space-y-4 animate-in fade-in slide-in-from-top-4 duration-500">
          <div className="flex flex-col md:flex-row gap-4">
             <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input 
                  type="text" 
                  placeholder="Tìm theo tên bác sĩ, chuyên khoa..." 
                  className="w-full bg-white border border-slate-200 rounded-2xl py-3.5 pl-12 pr-4 focus:ring-2 focus:ring-teal-500/20 transition-all font-medium"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
             </div>
             <select 
               className="bg-white border border-slate-200 rounded-2xl px-6 py-3.5 font-bold text-slate-700 focus:ring-2 focus:ring-teal-500/20 outline-none w-full md:w-auto"
               value={deptFilter}
               onChange={(e) => setDeptFilter(e.target.value)}
             >
               <option value="Tất cả">Chuyên khoa</option>
               {departments.filter(d => d !== "Tất cả").map(d => <option key={d} value={d}>{d}</option>)}
             </select>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-white/60 border border-slate-200/60 rounded-2xl">
            <select 
               className="bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-medium text-slate-700 focus:ring-2 focus:ring-teal-500/20 outline-none"
               value={titleFilter}
               onChange={(e) => setTitleFilter(e.target.value)}
             >
               <option value="Tất cả">Học vị / Học hàm</option>
               {academicTitles.filter(d => d !== "Tất cả").map(d => <option key={d} value={d}>{d}</option>)}
             </select>
             <select 
               className="bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-medium text-slate-700 focus:ring-2 focus:ring-teal-500/20 outline-none truncate"
               value={hospitalFilter}
               onChange={(e) => setHospitalFilter(e.target.value)}
             >
               <option value="Tất cả">Bệnh viện / Cơ sở</option>
               {hospitals.filter(d => d !== "Tất cả").map(d => <option key={d} value={d} className="truncate">{d}</option>)}
             </select>
             <select 
               className="bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-medium text-slate-700 focus:ring-2 focus:ring-teal-500/20 outline-none"
               value={districtFilter}
               onChange={(e) => setDistrictFilter(e.target.value)}
             >
               <option value="Tất cả">Khu vực / Quận</option>
               {districts.filter(d => d !== "Tất cả").map(d => <option key={d} value={d}>{d}</option>)}
             </select>
             <select 
               className="bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-medium text-slate-700 focus:ring-2 focus:ring-teal-500/20 outline-none"
               value={genderFilter}
               onChange={(e) => setGenderFilter(e.target.value)}
             >
               <option value="Tất cả">Giới tính</option>
               {genders.filter(d => d !== "Tất cả").map(d => <option key={d} value={d}>{d}</option>)}
             </select>
          </div>
        </div>
      )}

      <div className="grid lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-8 space-y-8">
          {view === 'my' ? (
            <div className="bg-white rounded-[2rem] p-8 border border-slate-100 shadow-sm animate-in fade-in duration-500">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2 border-b-2 border-teal-500 pb-1">
                  Lịch hẹn sắp tới ({appointments.length})
                </h2>
              </div>

              <div className="space-y-6">
                {appointments.map((apt) => (
                  <div key={apt.id} className="group relative bg-[#f8fafc] border border-slate-200 hover:border-teal-300 rounded-[1.5rem] p-6 transition-all">
                    <div className="absolute top-4 right-6 flex items-center gap-2">
                       <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${apt.type === 'online' ? 'bg-blue-100 text-blue-700' : 'bg-orange-100 text-orange-700'}`}>
                         {apt.type === 'online' ? 'Khám Online' : 'Tại phòng khám'}
                       </span>
                    </div>
                    
                    <div className="flex flex-col md:flex-row md:items-center gap-6">
                      <div className="w-16 h-16 bg-gradient-to-br from-slate-200 to-slate-300 rounded-full flex items-center justify-center text-slate-600 shrink-0 shadow-inner">
                         <Stethoscope size={28} />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-lg text-slate-900">{apt.doctor}</h3>
                        <p className="text-sm font-medium text-teal-600 mb-3">{apt.specialty}</p>
                        
                        <div className="grid sm:grid-cols-2 gap-3 text-sm text-slate-600">
                          <div className="flex items-center gap-2">
                             <Clock size={16} className="text-slate-400" />
                             <span className="font-medium">{apt.date}</span>
                          </div>
                          <div className="flex items-center gap-2">
                             {apt.type === 'online' ? <Video size={16} className="text-slate-400" /> : <MapPin size={16} className="text-slate-400" />}
                             <span className="truncate">{apt.type === 'online' ? "Google Meet Link" : apt.hospital}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-6 flex items-center gap-3 border-t border-slate-200 pt-5">
                      <button className="flex-1 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold py-2.5 rounded-xl transition-colors">
                        Đổi lịch
                      </button>
                      <button className="flex-1 bg-slate-900 hover:bg-slate-800 text-white font-semibold py-2.5 rounded-xl transition-colors">
                        {apt.type === 'online' ? 'Vào phòng khám' : 'Mở bản đồ'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 gap-6 animate-in fade-in duration-500">
               {filteredDoctors.map((doc, i) => (
                 <div key={i} className="bg-white border border-slate-100 rounded-[2rem] p-6 hover:shadow-xl hover:shadow-teal-500/5 transition-all group flex flex-col">
                    <div className="flex items-start justify-between mb-6">
                       <div className="w-14 h-14 bg-teal-50 text-teal-600 rounded-2xl flex items-center justify-center shrink-0">
                          <Stethoscope size={28} />
                       </div>
                       <div className="text-right">
                          <p className="text-[0.65rem] font-bold text-slate-400 uppercase tracking-widest mb-1">Giá khám</p>
                          <p className="text-teal-600 font-bold">{doc.price}</p>
                       </div>
                    </div>

                    <div className="mb-6">
                       <h3 className="font-bold text-slate-900 group-hover:text-teal-600 transition-colors">{doc.title}. {doc.name}</h3>
                       <p className="text-sm text-slate-500 font-medium">{doc.department}</p>
                    </div>

                    <div className="space-y-3 mb-8 flex-grow">
                       <div className="flex items-start gap-2 text-[0.8rem] text-slate-600">
                          <MapPin size={14} className="mt-0.5 text-slate-400 shrink-0" />
                          <span className="leading-tight">{doc.location}</span>
                       </div>
                       <div className="flex items-start gap-2 text-[0.8rem] text-slate-600">
                          <Clock size={14} className="mt-0.5 text-slate-400 shrink-0" />
                          <span className="leading-tight">{doc.schedule} | {doc.time}</span>
                       </div>
                    </div>

                    <button 
                      onClick={() => toast.success(`Đã đăng ký tư vấn với ${doc.title}. ${doc.name}!`)}
                      className="w-full bg-gradient-to-r from-orange-500 to-amber-400 hover:from-orange-600 hover:to-amber-500 text-white font-bold py-3.5 rounded-2xl transition-all hover:-translate-y-0.5 shadow-md shadow-orange-500/20 flex items-center justify-center gap-2"
                    >
                      Đặt lịch ngay <ChevronRight size={18} />
                    </button>
                 </div>
               ))}
               {filteredDoctors.length === 0 && (
                 <div className="col-span-2 py-20 text-center border-2 border-dashed border-slate-200 rounded-[2rem] bg-slate-50">
                    <p className="text-slate-500 font-medium">Không tìm thấy bác sĩ phù hợp.</p>
                 </div>
               )}
            </div>
          )}
        </div>

        <div className="lg:col-span-4 space-y-6">
           <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100 rounded-[2rem] p-8 relative overflow-hidden">
             <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
                <CalendarDays size={100} />
             </div>
             <h3 className="font-bold text-blue-900 mb-2 relative z-10 text-xl">Lịch thông minh AI</h3>
             <p className="text-sm text-blue-800/80 mb-6 relative z-10">
               FamCare nhắc nhở lịch tái khám dựa trên thời hạn thuốc trong Tủ thuốc AI của gia đình.
             </p>
             
             <div className="space-y-4 relative z-10">
               <div className="bg-white/80 backdrop-blur border border-white p-4 rounded-xl shadow-sm">
                 <div className="flex gap-3">
                   <div className="w-10 h-10 bg-rose-100 text-rose-600 rounded-lg flex items-center justify-center shrink-0">
                     <Activity size={20} />
                   </div>
                   <div>
                     <p className="font-bold text-sm text-slate-800">Tái khám Cao Huyết Áp (Bố)</p>
                     <p className="text-xs text-slate-500 mt-1">Dự kiến hết đơn thuốc vào tuần tới.</p>
                     <button className="text-rose-600 text-xs font-bold mt-2 hover:underline">Lên lịch ngay</button>
                   </div>
                 </div>
               </div>
             </div>
           </div>
        </div>
      </div>
    </div>
  );
}
