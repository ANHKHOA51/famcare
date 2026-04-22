import { Outlet, useLocation } from "react-router-dom";
import AppSidebar from "@/components/AppSidebar";
import TopNav from "@/components/TopNav";
import ProtectedRoute from "@/components/ProtectedRoute";

/**
 * AppLayout — the authenticated shell.
 *
 * ROUTING CHANGE (v2):
 * Instead of an `activePage` state + renderPage() switch, this component
 * now uses react-router-dom's <Outlet />. Each child route (/app/scanner,
 * /app/meal-plan, etc.) pushes a real history entry, so the browser
 * Back button correctly navigates between app tabs instead of exiting.
 *
 * `activePage` is derived from the URL pathname for sidebar highlighting only.
 */
const AppLayout = () => {
  const location = useLocation();

  // e.g. "/app/scanner" → "scanner",  "/app/meal-plan" → "meal-plan"
  const segments = location.pathname.split("/");
  const activePage = segments[2] ?? "scanner";

  return (
    <ProtectedRoute>
      <div className="flex flex-col min-h-screen bg-[#f8fafc]">
        {/* Top Navigation — full width, sticky */}
        <TopNav activePage={activePage} />

        <div className="flex flex-1 overflow-hidden">
          {/* Sidebar — desktop only */}
          <div className="hidden md:flex w-[260px] flex-shrink-0">
            <AppSidebar activePage={activePage} />
          </div>

          {/* Main Content — react-router renders the matched child here */}
          <main className="flex-1 overflow-auto bg-[#f8fafc] md:rounded-tl-2xl">
            <Outlet />
          </main>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default AppLayout;
