import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Menu, Stethoscope } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetDescription } from '@/components/ui/sheet';

export default function PublicNavbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [open, setOpen] = useState(false);

  const handleCtaClick = () => {
    setOpen(false);
    if (isAuthenticated) {
      navigate('/app');
    } else {
      navigate('/login');
    }
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="surface-glass sticky top-0 z-50 flex items-center justify-between px-4 md:px-8 lg:px-16 py-4 bg-background/80 backdrop-blur-md border-b">
      <Link to="/" className="text-xl flex items-center gap-2 font-bold font-display text-primary tracking-tight">
        <Stethoscope className="w-5 h-5 text-primary" />
        FamCare
      </Link>
    
      <nav className="hidden md:flex items-center gap-8">
        <Link to="/" className={`text-sm ${isActive('/') ? 'font-semibold text-primary' : 'text-muted-foreground hover:text-foreground transition-colors'}`}>Trang chủ</Link>
        <Link to="/about" className={`text-sm ${isActive('/about') ? 'font-semibold text-primary' : 'text-muted-foreground hover:text-foreground transition-colors'}`}>Về chúng tôi</Link>
        <Link to="/resources" className={`text-sm ${isActive('/resources') ? 'font-semibold text-primary' : 'text-muted-foreground hover:text-foreground transition-colors'}`}>Tài liệu</Link>
        <Link to="/contact" className={`text-sm ${isActive('/contact') ? 'font-semibold text-primary' : 'text-muted-foreground hover:text-foreground transition-colors'}`}>Liên hệ</Link>
      </nav>

      <div className="flex items-center gap-2">
        <Button onClick={handleCtaClick} size="sm" className="hidden md:flex">
          {isAuthenticated ? 'Vào ứng dụng' : 'Đăng nhập'}
        </Button>
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden text-foreground">
              <Menu size={20} />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[80vw] sm:w-[350px]">
            <SheetTitle className="sr-only">Menu Điều hướng</SheetTitle>
            <SheetDescription className="sr-only">Menu liên kết trang</SheetDescription>
            <nav className="flex flex-col gap-4 mt-8">
              <Link onClick={() => setOpen(false)} to="/" className={`text-lg ${isActive('/') ? 'font-semibold text-primary' : 'text-muted-foreground'}`}>Trang chủ</Link>
              <Link onClick={() => setOpen(false)} to="/about" className={`text-lg ${isActive('/about') ? 'font-semibold text-primary' : 'text-muted-foreground'}`}>Về chúng tôi</Link>
              <Link onClick={() => setOpen(false)} to="/resources" className={`text-lg ${isActive('/resources') ? 'font-semibold text-primary' : 'text-muted-foreground'}`}>Tài liệu</Link>
              <Link onClick={() => setOpen(false)} to="/contact" className={`text-lg ${isActive('/contact') ? 'font-semibold text-primary' : 'text-muted-foreground'}`}>Liên hệ</Link>
              <Button onClick={handleCtaClick} size="lg" className="mt-4">
                {isAuthenticated ? 'Vào ứng dụng' : 'Đăng nhập'}
              </Button>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
