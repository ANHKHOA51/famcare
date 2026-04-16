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
      case "nutrition": return <ComingSoonPage title="Dinh dưỡng" />;
      default: return <ComingSoonPage title="Coming Soon" />;
    }
  };

  return (
    <ProtectedRoute>
      <div className="flex min-h-screen bg-background">
        <div className="hidden md:flex">
          <AppSidebar activePage={activePage} onNavigate={setActivePage} />
        </div>
        <div className="flex-1 flex flex-col min-w-0 w-full overflow-hidden">
          <TopNav activePage={activePage} onNavigate={setActivePage} />
          <main className="flex-1 overflow-auto">
            {renderPage()}
          </main>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default AppLayout;
