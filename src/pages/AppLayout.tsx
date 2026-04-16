import { useState } from "react";
import AppSidebar from "@/components/AppSidebar";
import TopNav from "@/components/TopNav";
import DashboardPage from "@/pages/DashboardPage";
import ScannerPage from "@/pages/ScannerPage";
import CabinetPage from "@/pages/CabinetPage";
import MarketplacePage from "@/pages/MarketplacePage";
import ComingSoonPage from "@/pages/ComingSoonPage";
import FoodTestPage from "@/pages/FoodTestPage";
import ProfilePage from "@/pages/ProfilePage";
import MealPlanPage from "@/pages/MealPlanPage";
import AppointmentsPage from "@/pages/AppointmentsPage";
import SettingsPage from "@/pages/SettingsPage";
import ProtectedRoute from "@/components/ProtectedRoute";

const AppLayout = () => {
  const [activePage, setActivePage] = useState("scanner");

  const renderPage = () => {
    switch (activePage) {
      case "dashboard": return <DashboardPage />;
      case "scanner": return <ScannerPage />;
      case "cabinet": return <CabinetPage onNavigate={setActivePage} />;
      case "meal-plan": return <MealPlanPage />;
      case "marketplace": return <MarketplacePage />;
      case "food-test": return <FoodTestPage />;
      case "profile": return <ProfilePage />;
      case "appointment": return <AppointmentsPage />;
      case "settings": return <SettingsPage />;
      case "nutrition": return <ComingSoonPage title="Dinh dưỡng" />;
      default: return <ComingSoonPage title="Coming Soon" />;
    }
  };

  return (
    <ProtectedRoute>
      <div className="flex flex-col min-h-screen bg-[#f8fafc]">
        {/* Top Navigation Spanning Full Width */}
        <TopNav activePage={activePage} onNavigate={setActivePage} />
        
        <div className="flex flex-1 overflow-hidden">
          {/* Sidebar */}
          <div className="hidden md:flex w-[260px] flex-shrink-0">
            <AppSidebar activePage={activePage} onNavigate={setActivePage} />
          </div>
          
          {/* Main Content Area */}
          <main className="flex-1 overflow-auto bg-[#f8fafc] md:rounded-tl-2xl">
            {renderPage()}
          </main>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default AppLayout;
