import { useState } from "react";
import AppSidebar from "@/components/AppSidebar";
import TopNav from "@/components/TopNav";
import DashboardPage from "@/pages/DashboardPage";
import ScannerPage from "@/pages/ScannerPage";
import MarketplacePage from "@/pages/MarketplacePage";
import ComingSoonPage from "@/pages/ComingSoonPage";

const Index = () => {
  const [activePage, setActivePage] = useState("scanner");

  const renderPage = () => {
    switch (activePage) {
      case "dashboard": return <DashboardPage />;
      case "scanner": return <ScannerPage />;
      case "marketplace": return <MarketplacePage />;
      case "nutrition": return <ComingSoonPage title="Dinh dưỡng" />;
      case "alerts": return <ComingSoonPage title="Thông báo" />;
      default: return <ComingSoonPage title="Coming Soon" />;
    }
  };

  return (
    <div className="flex min-h-screen bg-background">
      <AppSidebar activePage={activePage} onNavigate={setActivePage} />
      <div className="flex-1 flex flex-col">
        <TopNav />
        <main className="flex-1 overflow-auto">
          {renderPage()}
        </main>
      </div>
    </div>
  );
};

export default Index;
