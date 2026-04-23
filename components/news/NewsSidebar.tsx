'use client';

import React from 'react';
import { motion } from 'motion/react';
import { useLanguage } from '@/context/LanguageContext';
import { ChevronLeft, Building2, Landmark, Users } from 'lucide-react';

export function NewsSidebar() {
  const { t, dir } = useLanguage();

  const categories = [
    { name: 'الاجتماعات', count: 12, icon: Users },
    { name: 'أخبار', count: 45, icon: Building2 },
    { name: 'بيان', count: 8, icon: Landmark },
  ];

  const partners = [
    { name: 'الشركة', link: '#' },
    { name: 'الوزارة', link: '#' },
    { name: 'أخرى', link: '#' },
  ];

  return (
    <aside className="space-y-12">
      {/* Categories */}
      <div className="glass-card p-8 rounded-[40px] border border-white/5 shadow-xl">
        <h3 className="text-2xl font-black text-white mb-8 flex items-center gap-3">
          <div className="w-2 h-8 bg-primary rounded-full" />
          التصنيفات
        </h3>
        <div className="space-y-4">
          {categories.map((cat, idx) => (
            <button
              key={idx}
              className="w-full flex items-center justify-between p-4 rounded-2xl hover:bg-white/5 transition-all group"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
                  <cat.icon size={18} />
                </div>
                <span className="font-bold text-white/80">{cat.name}</span>
              </div>
              <span className="bg-white/5 text-white/40 text-xs font-black px-3 py-1 rounded-full">
                {cat.count}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Divider with petroleum style */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-white/5 to-transparent" />

      {/* Partners */}
      <div className="glass-card p-8 rounded-[40px] border border-white/5 shadow-xl">
        <h3 className="text-2xl font-black text-white mb-8 flex items-center gap-3">
          <div className="w-2 h-8 bg-primary rounded-full" />
          الشركاء
        </h3>
        <div className="space-y-4">
          {partners.map((partner, idx) => (
            <a
              key={idx}
              href={partner.link}
              className="flex items-center justify-between p-4 rounded-2xl border border-white/5 hover:border-primary transition-all group"
            >
              <span className="font-bold text-white/60 group-hover:text-primary transition-colors">
                {partner.name}
              </span>
              <ChevronLeft size={18} className={dir === 'rtl' ? '' : 'rotate-180'} />
            </a>
          ))}
        </div>
      </div>
    </aside>
  );
}
