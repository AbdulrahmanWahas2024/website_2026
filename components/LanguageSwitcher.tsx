'use client';

import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Globe } from 'lucide-react';

export default function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <button 
      onClick={() => setLanguage(language === 'ar' ? 'en' : 'ar')}
      className="flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1.5 rounded-lg hover:bg-bg-soft transition-all text-text-primary group"
    >
      <Globe size={18} className="text-primary group-hover:rotate-12 transition-transform" />
      <span className="text-[10px] sm:text-xs font-black uppercase tracking-widest">
        {!mounted ? 'EN' : (language === 'ar' ? 'EN' : 'AR')}
      </span>
    </button>
  );
}
