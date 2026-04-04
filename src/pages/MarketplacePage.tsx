import { Star, Calendar, Shield, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

const doctors = [
  { name: "Dr. Sarah Nguyen", specialty: "ELDERLY REHABILITATION SPECIALIST", rating: 4.9, reviews: 120, availability: "Today", price: "450,000 VND", badge: "VETTED" },
  { name: "Mark Harrison, RN", specialty: "POST-STROKE CARE SPECIALIST", rating: 4.8, reviews: 85, availability: "Tomorrow 9 AM", price: "380,000 VND", badge: "VETTED" },
  { name: "Dr. Elena Rodriguez", specialty: "GERIATRIC PHYSIOTHERAPIST", rating: 5.0, reviews: 210, availability: "Today", price: "520,000 VND", badge: "VETTED" },
];

const MarketplacePage = () => {
  return (
    <div className="p-8 animate-fade-in">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-heading font-bold text-foreground">Care Marketplace</h2>
          <p className="text-muted-foreground mt-1">Premium clinical expertise delivered to your doorstep.</p>
        </div>
        <span className="bg-success/10 text-success text-xs font-bold px-3 py-1.5 rounded-full">124 SPECIALISTS AVAILABLE</span>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {doctors.map((doc, i) => (
          <div key={i} className="bg-card rounded-2xl border border-border p-6">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-14 h-14 rounded-full bg-muted flex items-center justify-center text-lg font-bold text-muted-foreground">
                {doc.name[0]}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-foreground">{doc.name}</h3>
                  <span className="text-[10px] font-bold bg-success/10 text-success px-2 py-0.5 rounded-full flex items-center gap-1">
                    <Shield size={10} /> {doc.badge}
                  </span>
                </div>
                <p className="text-xs font-semibold text-accent tracking-wider">{doc.specialty}</p>
              </div>
            </div>
            <div className="flex items-center gap-1 mb-3">
              {Array.from({ length: 5 }).map((_, j) => (
                <Star key={j} size={14} className={j < Math.floor(doc.rating) ? "text-warning fill-warning" : "text-muted"} />
              ))}
              <span className="text-sm font-semibold text-foreground ml-1">{doc.rating}/5</span>
              <span className="text-xs text-muted-foreground">({doc.reviews}+ Reviews)</span>
            </div>
            <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
              <span className="flex items-center gap-1"><Calendar size={14} /> Availability: <span className="text-foreground font-medium">{doc.availability}</span></span>
              <span>💰 {doc.price} / visit</span>
            </div>
            <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90">Book Consultation</Button>
          </div>
        ))}

        {/* Urgent Care CTA */}
        <div className="bg-brand-warm rounded-2xl p-8 flex flex-col items-center justify-center text-center text-brand-warm-foreground">
          <Sparkles size={32} className="mb-4" />
          <h3 className="text-xl font-bold mb-2">Need Urgent Care?</h3>
          <p className="text-sm opacity-80 mb-6">Our 24/7 Rapid Response team can be at your location within 60 minutes.</p>
          <Button variant="outline" className="border-brand-warm-foreground/30 text-brand-warm-foreground hover:bg-brand-warm-foreground/10">
            Call Rapid Response
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MarketplacePage;
