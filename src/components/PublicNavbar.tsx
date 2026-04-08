import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";

export default function PublicNavbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const handleCtaClick = () => {
    if (isAuthenticated) {
      navigate("/app");
    } else {
      navigate("/login");
    }
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="surface-glass sticky top-0 z-50 flex items-center justify-between px-8 lg:px-16 py-4 bg-background/80 backdrop-blur-md border-b">
      <Link to="/" className="text-xl font-bold font-display text-primary tracking-tight">
        Hệ sinh thái Y tế
      </Link>
      <nav className="hidden md:flex items-center gap-8">
        <Link to="/" className={`text-sm ${isActive('/') ? 'font-semibold text-primary' : 'text-muted-foreground hover:text-foreground transition-colors'}`}>
          Trang chủ
        </Link>
        <Link to="/about" className={`text-sm ${isActive('/about') ? 'font-semibold text-primary' : 'text-muted-foreground hover:text-foreground transition-colors'}`}>
          Về chúng tôi
        </Link>
        <Link to="/resources" className={`text-sm ${isActive('/resources') ? 'font-semibold text-primary' : 'text-muted-foreground hover:text-foreground transition-colors'}`}>
          Tài liệu
        </Link>
        <Link to="/contact" className={`text-sm ${isActive('/contact') ? 'font-semibold text-primary' : 'text-muted-foreground hover:text-foreground transition-colors'}`}>
          Liên hệ
        </Link>
      </nav>
      <Button onClick={handleCtaClick} size="default">
        {isAuthenticated ? "Vào ứng dụng" : "Đăng nhập"}
      </Button>
    </header>
  );
}