import { Clock, CalendarDays, MapPin, Video, Stethoscope, ChevronRight, Activity, Plus } from "lucide-react";

export default function AppointmentsPage() {
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

  return (
    <div className="p-6 md:p-10 max-w-7xl mx-auto animate-fade-in relative container-fluid bg-[#f8fafc] min-h-screen">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
        <div>
          <h1 className="text-3xl md:text-4xl font-display font-bold text-slate-900 tracking-tight mb-2">Đặt lịch khám</h1>
          <p className="text-slate-500">Quản lý lịch hẹn với bác sĩ và cơ sở y tế cho cả gia đình.</p>
        </div>
        <button className="bg-teal-500 hover:bg-teal-600 text-white font-bold py-3 px-6 rounded-2xl flex items-center justify-center gap-2 shadow-sm transition-transform hover:scale-105 whitespace-nowrap">
          <Plus size={20} />
          Đặt lịch hẹn mới
        </button>
      </div>

      <div className="grid lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-8 space-y-8">
          <div className="bg-white rounded-[2rem] p-8 border border-slate-100 shadow-sm">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2 border-b-2 border-teal-500 pb-1">
                Lịch hẹn sắp tới (2)
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
