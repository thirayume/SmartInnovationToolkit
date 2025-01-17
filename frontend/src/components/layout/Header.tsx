// src/components/layout/Header.tsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Button } from "../ui/button";
import LanguageSwitcher from "../common/LanguageSwitcher";
import LazyImage from "../common/LazyImage";
import { IMAGES } from "../../constants/images";
import { useAuth } from "../../contexts/AuthContext";

interface HeaderProps {
  menus: Array<{ code: string; name: string }>;
  rightContent?: React.ReactNode;
}

const Header: React.FC<HeaderProps> = ({ menus, rightContent }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { isAuthenticated } = useAuth();

  const renderAuthButtons = () => {
    if (isAuthenticated) {
      return (
        <div className="flex items-center gap-2">
          <LanguageSwitcher />
          {rightContent}
        </div>
      );
    }

    return (
      <div className="flex items-center gap-4">
        <LanguageSwitcher />
        <Button
          variant="ghost"
          onClick={() => navigate("/login")}
        >
          {t("auth.login.title")}
        </Button>
        <Button
          variant="default"
          onClick={() => navigate("/register")}
          className="bg-blue-500 hover:bg-blue-600 text-white"
        >
          {t("auth.register.title")}
        </Button>
      </div>
    );
  };

  return (
    <header className="border-b bg-card sticky top-0 z-50">
      <div className="flex h-16 items-center px-4 md:px-6">
        <div
          className="flex items-center gap-2 font-semibold cursor-pointer"
          onClick={() => navigate("/")}
        >
          <LazyImage
            src={IMAGES.LOGOS.MAIN}
            alt={t("common.app.name")}
            height={48}
            className="h-12 w-auto object-contain"
          />
        </div>

        <div className="flex-1" />

        <nav className="flex space-x-4">
          {menus.map((menu) => (
            <Button
              key={menu.code}
              variant="ghost"
              onClick={() => navigate(`/${menu.code}`)}
              className="text-gray-600 hover:text-blue-500"
            >
              {menu.name}
            </Button>
          ))}
        </nav>

        <div className="flex-1" />
        
        {renderAuthButtons()}
      </div>
    </header>
  );
};

export default React.memo(Header);