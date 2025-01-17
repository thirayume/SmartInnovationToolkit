import { TFunction } from 'i18next';

export const getMenus = (t: TFunction, isAuthenticated: boolean) => {
  const commonMenus = [
    { code: 'contact', name: t('layout.menu.contact') },
    // { code: 'promotion', name: t('layout.menu.promotion') },
  ];

  const authenticatedMenus = [
    { code: 'dashboard', name: t('layout.menu.dashboard') },
    { code: 'classroom', name: t('layout.menu.classroom') },
    // { code: 'summary', name: t('layout.menu.summary') },
    ...commonMenus,
    { code: 'admin/users', name: t('layout.menu.user') },
  ];

  const anonymousMenus = [
    { code: 'intro', name: t('layout.menu.intro') },
    ...commonMenus,
  ];

  return isAuthenticated ? authenticatedMenus : anonymousMenus;
};
