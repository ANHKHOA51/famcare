import { Star, Calendar, Shield, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

const doctors = [
  { name: "Dr. Sarah Nguyen", specialty: "ELDERLY REHABILITATION SPECIALIST", rating: 4.9, reviews: 120, availability: "Today", price: "450,000 VND", badge: "VETTED" },
  { name: "Mark Harrison, RN", specialty: "POST-STROKE CARE SPECIALIST", rating: 4.8, reviews: 85, availability: "Tomorrow 9 AM", price: "380,000 VND", badge: "VETTED" },
  { name: "Dr. Elena Rodriguez", specialty: "GERIATRIC PHYSIOTHERAPIST", rating: 5.0, reviews: 210, availability: "Today", price: "520,000 VND", badge: "VETTED" },
];

const MarketplacePage = () => {
  return (
    <div className="p-10 animate-fade-up">
      {/* Header */}
      <div className="flex items-center justify-between mb-10">
        <div>
          <h2 className="text-[2rem] font-display font-bold text-foreground tracking-tight">Care Marketplace</h2>
          <p className="text-on-surface-variant text-[0.875rem] mt-1.5">Premium clinical expertise delivered to your doorstep.</p>
        </div>
        <span className="bg-success-container text-success-on-container text-[0.6875rem] font-bold px-4 py-2 rounded-full uppercase tracking-wider">
          124 Specialists Available
        </span>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {doctors.map((doc, i) => (
          <div key={i} className="surface-2 rounded-2xl p-7 shadow-patient transition-shadow duration-300 hover:shadow-elevated">
            <div className="flex items-start gap-4 mb-5">
              <div className="w-14 h-14 rounded-xl surface-1 flex items-center justify-center text-lg font-bold text-on-surface-variant font-display">
                {doc.name[0]}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2.5">
                  <h3 className="font-semibold text-foreground font-display">{doc.name}</h3>
                  <span className="text-[0.625rem] font-bold bg-success-container text-success-on-container px-2 py-0.5 rounded-full flex items-center gap-1">
                    <Shield size={9} /> {doc.badge}
                  </span>
                </div>
                <p className="text-[0.6875rem] font-semibold text-secondary tracking-wider mt-1">{doc.specialty}</p>
              </div>
            </div>
            <div className="flex items-center gap-1 mb-4">
              {Array.from({ length: 5 }).map((_, j) => (
                <Star key={j} size={14} className={j < Math.floor(doc.rating) ? "text-warning fill-warning" : "text-surface-high"} />
              ))}
              <span className="text-sm font-semibold text-foreground ml-1.5">{doc.rating}/5</span>
              <span className="text-[0.75rem] text-on-surface-variant ml-1">({doc.reviews}+ Reviews)</span>
            </div>
            <div className="flex items-center justify-between text-[0.8125rem] text-on-surface-variant mb-6">
              <span className="flex items-center gap-1.5">
                <Calendar size={14} /> Availability: <span className="text-foreground font-medium">{doc.availability}</span>
              </span>
              <span>💰 {doc.price} / visit</span>
            </div>
            <Button className="w-full">Book Consultation</Button>
          </div>
        ))}

        {/* Urgent Care CTA — tertiary */}
        <div className="bg-tertiary rounded-2xl p-10 flex flex-col items-center justify-center text-center text-tertiary-foreground">
          <Sparkles size={32} className="mb-5 opacity-90" />
          <h3 className="text-xl font-display font-bold mb-3">Need Urgent Care?</h3>
          <p className="text-sm opacity-75 mb-8 max-w-xs leading-relaxed">Our 24/7 Rapid Response team can be at your location within 60 minutes.</p>
          <Button variant="outline-light">
            Call Rapid Response
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MarketplacePage;
