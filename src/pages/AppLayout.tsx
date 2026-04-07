import { useState } from "react";
import AppSidebar from "@/components/AppSidebar";
import TopNav from "@/components/TopNav";
import DashboardPage from "@/pages/DashboardPage";
import ScannerPage from "@/pages/ScannerPage";
import CabinetPage from "@/pages/CabinetPage";
import MarketplacePage from "@/pages/MarketplacePage";
import ComingSoonPage from "@/pages/ComingSoonPage";
import FoodTestPage from "@/pages/FoodTestPage";
import ProtectedRoute from "@/components/ProtectedRoute";

const AppLayout = () => {
  const [activePage, setActivePage] = useState("scanner");

  const renderPage = () => {
    switch (activePage) {
      case "dashboard": return <DashboardPage />;
      case "scanner": return <ScannerPage />;
      case "cabinet": return <CabinetPage onNavigate={setActivePage} />;
      case "marketplace": return <MarketplacePage />;
      case "food-test": return <FoodTestPage />;
      case "nutrition": return <ComingSoonPage title="Dinh dưỡng" />;
      default: return <ComingSoonPage title="Coming Soon" />;
    }
  };

  return (
    <ProtectedRoute>
      <div className="flex min-h-screen bg-background">
        <AppSidebar activePage={activePage} onNavigate={setActivePage} />
        <div className="flex-1 flex flex-col">
          <TopNav />
          <main className="flex-1 overflow-auto">
            {renderPage()}
          </main>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default AppLayout;
