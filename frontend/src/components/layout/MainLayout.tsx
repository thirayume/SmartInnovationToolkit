// src/components/layout/MainLayout.tsx
import { useNavigate, Outlet } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useAuth } from "../../contexts/AuthContext";
import { getMenus } from "../../config/menus";
import { Button } from "../ui/button";
import Header from "./Header";
import Footer from "./Footer";

const MainLayout = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { isAuthenticated } = useAuth();

  const menus = getMenus(t, isAuthenticated);

  const authButtons = (
    <>
      <Button
        variant="ghost"
        onClick={() => navigate("/login")}
        className="text-gray-700"
      >
        {t("auth.login.title")}
      </Button>
      <Button
        onClick={() => navigate("/register")}
        className="bg-blue-500 hover:bg-blue-600 text-white"
      >
        {t("auth.register.title")}
      </Button>
    </>
  );

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header menus={menus} rightContent={authButtons} />
      <main className="container mx-auto p-4 md:p-6 flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;