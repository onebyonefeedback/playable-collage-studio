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
    nav_benefits: 'Почему мы?',
    nav_works: 'Портфолио',
    nav_contacts: 'Контакты',
    hero_title: 'Playable ads на аутсорс для студий и паблишеров',
    hero_subtitle: 'От идеи до готового к запуску креатива. Масштабируйте креативы без найма и лишних процессов.',
    benefits_title: 'Почему мы?',
    benefit_1_title: 'Любой жанр. Любая сложность.',
    benefit_1_text: 'Если это можно собрать в playable — мы возьмёмся.',
    benefit_2_title: 'Нужен быстрый скейл креативов?',
    benefit_2_text: 'Без проблем, оставь команду компактной, отдай на аутсорс.',
    benefit_3_title: 'Своя команда не нужна.',
    benefit_3_text: 'Аниматоры, разработчики, тестировщики — всё у нас.',
    benefit_4_title: 'Одна точка входа. Никакого хаоса.',
    benefit_4_text: 'Наш менеджер будет с вами на всех этапах - от идеи до готовности.',
    benefit_5_title: 'Без риска.',
    benefit_5_text: 'Начните с одного плеебла. Осторожно. Можно втянуться.',
    benefit_6_title: 'Мы остаемся с вами.',
    benefit_6_text: 'Поддерживаем playable и после сдачи — правки, апдейты, помощь с площадками.',
    portfolio_title: 'Портфолио',
    portfolio_subtitle: '',
    contact_title: 'Свяжитесь с нами',
    contact_description: 'Опишите свой запрос / идею',
    contact_email: 'Email / Telegram',
    contact_button: 'Отправить запрос',
    contact_telegram: 'Или напишите напрямую в Telegram',
    contact_success: 'Запрос отправлен! Мы свяжемся с вами в ближайшее время.',
    workflow_title: 'Work flow',
    workflow_subtitle: 'Все прозрачно и просто',
    workflow_step_1: 'Бриф: обсуждаем концепцию',
    workflow_step_2: 'Подписываем NDA',
    workflow_step_3: 'Пишем техническое ТЗ и изучаем ассеты для оптимизации',
    workflow_step_4: 'Согласование статики',
    workflow_step_5: 'Согласование динамики',
    workflow_step_6: 'Согласование готового playable',
    workflow_step_7: 'Финальная доставка',
  },
  en: {
    nav_home: 'Home',
    nav_benefits: 'Why us?',
    nav_works: 'Our Works',
    nav_contacts: 'Contacts',
    hero_title: 'Outsourced playable ads for studios and publishers',
    hero_subtitle: 'Outsourced creatives, end to end. Scale creatives without hiring or extra processes.',
    benefits_title: 'Why us?',
    benefit_1_title: 'Any genre. Any complexity.',
    benefit_1_text: 'If it can be turned into a playable — we’re in.',
    benefit_2_title: 'Need fast creative scale?',
    benefit_2_text: 'Easy, no hiring in-house needed.',
    benefit_3_title: 'No extra team needed.',
    benefit_3_text: 'Animators, developers, testers — we got them all.',
    benefit_4_title: 'One point of contact. No chaos.',
    benefit_4_text: 'Our manager will be with you at every stage — from idea to final delivery.',
    benefit_5_title: 'Risk free.',
    benefit_5_text: 'Test us with a single order. Careful. You might get hooked :)',
    benefit_6_title: 'We don’t disappear.',
    benefit_6_text: 'Support, fixes, updates — even after delivery.',
    portfolio_title: 'Our Works',
    portfolio_subtitle: '',
    contact_title: 'Contact Us',
    contact_description: 'Describe your request / idea',
    contact_email: 'Email / Telegram',
    contact_button: 'Send Request',
    contact_telegram: 'Or write directly to Telegram',
    contact_success: 'Request sent! We will contact you soon.',
    workflow_title: 'Work flow',
    workflow_subtitle: 'All transparent and simple',
    workflow_step_1: 'Brief: discussing the concept',
    workflow_step_2: 'Signing NDA',
    workflow_step_3: 'Writing technical specification and studying assets for optimization',
    workflow_step_4: 'Static approval',
    workflow_step_5: 'Dynamic approval',
    workflow_step_6: 'Final playable approval',
    workflow_step_7: 'Final delivery',
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
