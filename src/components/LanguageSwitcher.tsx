'use client';

import { useRouter } from 'next/router';
import { useState } from 'react';

export default function LanguageSwitcher() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const languages = [
    { code: 'en', label: 'English', flag: '🇬🇧' },
    { code: 'hi', label: 'हिंदी', flag: '🇮🇳' },
  ];

  const currentLang = languages.find((lang) => lang.code === router.locale) || languages[0];

  const handleLanguageChange = (langCode: string) => {
    router.push(router.asPath, router.asPath, { locale: langCode });
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors"
      >
        <span className="text-lg">{currentLang.flag}</span>
        <span className="font-semibold text-sm text-gray-700">{currentLang.label}</span>
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-2 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => handleLanguageChange(lang.code)}
              className={`w-full text-left px-4 py-2 flex items-center gap-3 hover:bg-gray-50 transition-colors ${
                router.locale === lang.code ? 'bg-blue-50' : ''
              }`}
            >
              <span className="text-lg">{lang.flag}</span>
              <span className={router.locale === lang.code ? 'font-bold' : ''}>{lang.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
