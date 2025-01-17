// src/components/layout/Footer.tsx
import React from "react";
import { useTranslation } from "react-i18next";
import { Phone, Mail, Facebook, Twitter, Linkedin, Youtube, Instagram } from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";
import { getMenus } from "../../config/menus";
import { IMAGES } from "../../constants/images";
import LazyImage from "../common/LazyImage";

const Footer: React.FC = () => {
  const { t } = useTranslation();
  const { isAuthenticated } = useAuth();
  const currentYear = new Date().getFullYear();
  const menus = getMenus(t, isAuthenticated);

  return (
    <footer className="bg-[#1E1E1E] text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left Section - Logo and Description */}
          <div className="space-y-4">
            <div className="flex items-center">
              <LazyImage
                src={IMAGES.LOGOS.MAIN}
                alt={t("common.app.name")}
                height={48}
                className="h-12 w-auto object-contain"
              />
            </div>
            <p className="text-sm text-gray-300 mt-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
              do eiusmod tempor incididunt ut labore et dolore magna
              aliquam erat, sed diam voluptua.
            </p>
          </div>

          {/* Middle Section - Menu Items */}
          <div className="space-y-2">
            <h3 className="text-lg font-semibold mb-4">{t('common.app.name')}</h3>
            <ul className="space-y-2">
              {menus.map((menu) => (
                <li key={menu.code}>
                  <a href={`/${menu.code}`} className="hover:text-blue-400">
                    {menu.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Right Section - Contacts and Social */}
          <div>
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">{t('layout.footer.contacts')}</h3>
              <div className="space-y-2">
                <a href={`tel:${t('layout.footer.contact.phone')}`} className="flex items-center gap-2 hover:text-blue-400 transition-colors">
                  <Phone className="h-4 w-4" />
                  {t('layout.footer.contact.phone')}
                </a>
                <a href={`mailto:${t('layout.footer.contact.email')}`} className="flex items-center gap-2 hover:text-blue-400 transition-colors">
                  <Mail className="h-4 w-4" />
                  {t('layout.footer.contact.email')}
                </a>
              </div>
            </div>
            
            <div className="mt-8 space-y-4">
              <h3 className="font-semibold text-lg">{t('layout.footer.followUs')}</h3>
              <div className="flex space-x-4">
                <a
                  href={t('layout.footer.social.links.facebook')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-blue-400 transition-colors"
                >
                  <Facebook className="h-6 w-6" />
                </a>
                <a
                  href={t('layout.footer.social.links.twitter')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-blue-400 transition-colors"
                >
                  <Twitter className="h-6 w-6" />
                </a>
                <a
                  href={t('layout.footer.social.links.instagram')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-pink-400 transition-colors"
                >
                  <Instagram className="h-6 w-6" />
                </a>
                <a
                  href={t('layout.footer.social.links.youtube')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-red-400 transition-colors"
                >
                  <Youtube className="h-6 w-6" />
                </a>
                <a
                  href={t('layout.footer.social.links.linkedin')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-blue-400 transition-colors"
                >
                  <Linkedin className="h-6 w-6" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-8 text-sm text-center text-gray-400">
        &copy;{t('layout.footer.copyright', { year: currentYear })}
      </div>
    </footer>
  );
};

export default Footer;