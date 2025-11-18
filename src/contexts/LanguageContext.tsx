import React, { createContext, useContext, useState } from 'react';

type Language = 'ru' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  ru: {
    nav_home: 'Главная',
    nav_benefits: 'Преимущества',
    nav_works: 'Работы',
    nav_contacts: 'Контакты',
    hero_title: 'Playable Ads, которые действительно играют',
    hero_subtitle: 'Создаём интерактивную рекламу, которая вовлекает с первых секунд.',
    benefits_title: 'Преимущества Playable Ads',
    benefit_1_title: 'Больше вовлечения',
    benefit_1_text: 'Интерактивный опыт удерживает внимание в 10 раз дольше',
    benefit_2_title: 'Игровой опыт вместо баннеров',
    benefit_2_text: 'Пользователи пробуют продукт до установки',
    benefit_3_title: 'Понижаем CPI',
    benefit_3_text: 'Привлекаем качественную аудиторию, снижая стоимость установки',
    benefit_4_title: 'Высокая конверсия',
    benefit_4_text: 'От клика до установки — прямой и увлекательный путь',
    portfolio_title: 'Наши работы',
    portfolio_subtitle: 'Наведите на проект, чтобы посмотреть preview',
    contact_title: 'Свяжитесь с нами',
    contact_description: 'Опишите свой запрос / идею',
    contact_email: 'Email / Telegram',
    contact_button: 'Отправить запрос',
    contact_telegram: 'Или напишите напрямую в Telegram',
    contact_success: 'Запрос отправлен! Мы свяжемся с вами в ближайшее время.',
  },
  en: {
    nav_home: 'Home',
    nav_benefits: 'Benefits',
    nav_works: 'Works',
    nav_contacts: 'Contacts',
    hero_title: 'Playable Ads that truly play',
    hero_subtitle: 'We create interactive advertising that engages from the first seconds.',
    benefits_title: 'Benefits of Playable Ads',
    benefit_1_title: 'More Engagement',
    benefit_1_text: 'Interactive experience holds attention 10x longer',
    benefit_2_title: 'Game Experience Instead of Banners',
    benefit_2_text: 'Users try the product before installation',
    benefit_3_title: 'Lower CPI',
    benefit_3_text: 'Attract quality audience, reducing cost per install',
    benefit_4_title: 'High Conversion',
    benefit_4_text: 'From click to install — a direct and engaging path',
    portfolio_title: 'Our Works',
    portfolio_subtitle: 'Hover over a project to see preview',
    contact_title: 'Contact Us',
    contact_description: 'Describe your request / idea',
    contact_email: 'Email / Telegram',
    contact_button: 'Send Request',
    contact_telegram: 'Or write directly to Telegram',
    contact_success: 'Request sent! We will contact you soon.',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('ru');

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations.ru] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
