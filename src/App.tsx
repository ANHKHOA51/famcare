import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";

// Public pages
import Index from "./pages/Index.tsx";
import AppLayout from "./pages/AppLayout.tsx";
import NotFound from "./pages/NotFound.tsx";
import AboutPage from "./pages/AboutPage.tsx";
import ResourcesPage from "./pages/ResourcesPage.tsx";
import TermsPage from "./pages/TermsPage.tsx";
import ContactPage from "./pages/ContactPage.tsx";
import Article1Page from "./pages/Article1Page.tsx";

// App pages (protected, rendered inside AppLayout via <Outlet />)
import DashboardPage from "./pages/DashboardPage.tsx";
import ScannerPage from "./pages/ScannerPage.tsx";
import CabinetPage from "./pages/CabinetPage.tsx";
import MealPlanPage from "./pages/MealPlanPage.tsx";
import AppointmentsPage from "./pages/AppointmentsPage.tsx";
import ProfilePage from "./pages/ProfilePage.tsx";
import SettingsPage from "./pages/SettingsPage.tsx";
import MarketplacePage from "./pages/MarketplacePage.tsx";
import ComingSoonPage from "./pages/ComingSoonPage.tsx";

import { AuthProvider } from "./context/AuthContext.tsx";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import ScrollToTop from "./components/ScrollToTop";

const queryClient = new QueryClient();

const MarqueeBanner = () => (
  <div className="bg-amber-400 text-slate-900 font-bold py-1.5 text-xs tracking-widest uppercase sticky top-0 z-[100] flex overflow-hidden">
    <div className="animate-marquee whitespace-nowrap">
      {Array.from({ length: 8 }).map((_, i) => (
        <span key={i}>ĐÂY LÀ DỰ ÁN MÔN HỌC CỦA SINH VIÊN UEH &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
      ))}
    </div>
  </div>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <MarqueeBanner />
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            {/* ── Public Routes ── */}
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/resources" element={<ResourcesPage />} />
            <Route path="/terms" element={<TermsPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/resources/lua-chon-thuc-pham-dung-de-phat-huy-tac-dung-thuoc" element={<Article1Page />} />

            {/* ── Protected App Routes (nested under AppLayout) ── */}
            {/* AppLayout renders <Outlet /> for each child page.       */}
            {/* Each navigation push creates a real browser history     */}
            {/* entry, so the Back button works correctly.              */}
            <Route path="/app" element={<AppLayout />}>
              {/* Default: redirect /app → /app/scanner */}
              <Route index element={<Navigate to="scanner" replace />} />
              <Route path="dashboard"   element={<DashboardPage />} />
              <Route path="scanner"     element={<ScannerPage />} />
              <Route path="cabinet"     element={<CabinetPage />} />
              <Route path="meal-plan"   element={<MealPlanPage />} />
              <Route path="appointment" element={<AppointmentsPage />} />
              <Route path="profile"     element={<ProfilePage />} />
              <Route path="settings"    element={<SettingsPage />} />
              <Route path="marketplace" element={<MarketplacePage />} />
              <Route path="nutrition"   element={<ComingSoonPage title="Dinh dưỡng" />} />
            </Route>

            {/* ── 404 ── */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
