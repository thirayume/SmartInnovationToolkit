// src/components/layout/DashboardLayout.tsx
import React from "react";
import { useNavigate, Outlet } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useAuth } from "../../contexts/AuthContext";
import { getMenus } from "../../config/menus";
import {
  User,
  ChevronDown,
  LogOut,
  Lock,
  Settings,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import Header from "./Header";
import Footer from "./Footer";
import { useEffect } from "react";

const DashboardLayout: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { user, logout, isAuthenticated, isLoading } = useAuth();

  // Redirect if not authenticated
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, isLoading, navigate]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">{t('common.actions.loading')}</div>
      </div>
    );
  }

  const menus = getMenus(t, isAuthenticated);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const userMenu = (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="flex items-center gap-2">
          <User className="h-5 w-5" />
          <span>{user ? `${user.firstName} ${user.lastName}` : t("auth.login.title")}</span>
          <ChevronDown className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuItem onClick={() => navigate("/profile")}>
          <User className="mr-2 h-4 w-4" />
          {t("profile.title")}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => navigate("/change-password")}>
          <Lock className="mr-2 h-4 w-4" />
          {t("profile.changePassword.title")}
        </DropdownMenuItem>
        {user?.roles?.some(role => role === "admin" || role === "super_admin") && (
          <DropdownMenuItem onClick={() => navigate("/settings")}>
            <Settings className="mr-2 h-4 w-4" />
            {t("layout.menu.settings")}
          </DropdownMenuItem>
        )}
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout}>
          <LogOut className="mr-2 h-4 w-4" />
          {t("auth.logout.title")}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header menus={menus} rightContent={userMenu} />
      <main className="container mx-auto p-4 md:p-6 flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default DashboardLayout;