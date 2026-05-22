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
import Article2Page from "./pages/Article2Page.tsx";
import Article3Page from "./pages/Article3Page.tsx";
import Article4Page from "./pages/Article4Page.tsx";
import Article5Page from "./pages/Article5Page.tsx";
import Article6Page from "./pages/Article6Page.tsx";
import Article7Page from "./pages/Article7Page.tsx";
import Article8Page from "./pages/Article8Page.tsx";
import Article9Page from "./pages/Article9Page.tsx";
import Article10Page from "./pages/Article10Page.tsx";
import Article11Page from "./pages/Article11Page.tsx";
import Article12Page from "./pages/Article12Page.tsx";
import Article13Page from "./pages/Article13Page.tsx";
import Article14Page from "./pages/Article14Page.tsx";
import Article15Page from "./pages/Article15Page.tsx";
import Article16Page from "./pages/Article16Page.tsx";
import Article17Page from "./pages/Article17Page.tsx";
import Article18Page from "./pages/Article18Page.tsx";

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
import AuthInterceptor from "./components/AuthInterceptor";

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
          <AuthInterceptor />
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
            <Route path="/resources/cach-doc-don-thuoc-giay" element={<Article2Page />} />
            <Route path="/resources/he-sinh-thai-famcare" element={<Article3Page />} />
            <Route path="/resources/quen-uong-thuoc-va-cach-xu-ly" element={<Article4Page />} />
            <Route path="/resources/uong-khang-sinh-voi-sua-co-nguy-hiem-khong" element={<Article5Page />} />
            <Route path="/resources/danh-muc-thuoc-thiet-yeu-cho-tu-thuoc-gia-dinh-2026" element={<Article6Page />} />
            <Route path="/resources/3-dau-hieu-luu-tru-don-thuoc-sai-cach-va-giai-phap" element={<Article7Page />} />
            <Route path="/resources/mat-giay-kham-suc-khoe-va-ho-so-y-te" element={<Article8Page />} />
            <Route path="/resources/quan-ly-tu-thuoc-gia-dinh-an-toan" element={<Article9Page />} />
            <Route path="/resources/co-nen-uong-thuoc-bang-nuoc-tra" element={<Article10Page />} />
            <Route path="/resources/quen-ten-thuoc-cu-ai-famcare" element={<Article11Page />} />
            <Route path="/resources/theo-doi-chi-so-bmi-dung-cach" element={<Article12Page />} />
            <Route path="/resources/thuc-pham-nguoi-benh-tieu-duong-nen-tranh-va-che-do-an" element={<Article13Page />} />
            <Route path="/resources/quet-don-thuoc-ai-so-hoa-ho-so" element={<Article14Page />} />
            <Route path="/resources/dat-lich-kham-truc-tuyen-online" element={<Article15Page />} />
            <Route path="/resources/len-thuc-don-dinh-duong-can-bang" element={<Article16Page />} />
            <Route path="/resources/cach-chon-bac-si-gioi-uy-tin" element={<Article17Page />} />
            <Route path="/resources/thuc-don-tieu-duong-7-ngay-kh-hoc" element={<Article18Page />} />

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
