'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Fuel, Users, Building2, Truck, Zap } from 'lucide-react';

import { Container } from '@/components/ui/Container';

const stats = [
  { id: 'stations', labelKey: 'home.stats.stations', value: 1250, icon: Fuel, suffix: '+' },
  { id: 'agents', labelKey: 'home.stats.agents', value: 3400, icon: Users, suffix: '+' },
  { id: 'entities', labelKey: 'home.stats.entities', value: 850, icon: Building2, suffix: '+' },
  { id: 'tankers', labelKey: 'home.stats.tankers', value: 450, icon: Truck, suffix: '' },
  { id: 'ev_stations', labelKey: 'home.stats.ev_stations', value: 4, icon: Zap, suffix: '' },
];

function Counter({ value }: { value: number }) {
  const [mounted, setMounted] = React.useState(false);
  const ref = useRef(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <span ref={ref}>{value}</span>;
  }

  return <span ref={ref}>{value.toLocaleString('en-US')}</span>;
}

export default function StatsSection() {
  const { t } = useLanguage();

  return (
    <section className="section-padding relative overflow-hidden bg-bg-soft">
      <Container className="relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-8 md:mb-10 gap-4 md:gap-6">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-2 md:mb-3">
              <div className="w-10 h-0.5 bg-accent" />
              <span className="text-accent text-[8px] md:text-[9px] font-black uppercase tracking-[0.2em]">{t('home.stats_title')}</span>
            </div>
            <h2 className="text-xl md:text-3xl font-black text-primary leading-tight">
              أرقام وإنجازات <span className="text-accent">تعكس ريادتنا</span>
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 md:gap-4 lg:gap-5">
          {stats.map((stat, idx) => (
            <div
              key={stat.id}
              className="bg-white p-4 md:p-6 rounded-2xl relative group border border-border hover:border-accent/30 transition-all duration-300 hover:-translate-y-1 shadow-sm"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent pointer-events-none" />
              
              <div className="w-10 h-10 md:w-12 md:h-12 bg-primary rounded-xl flex items-center justify-center text-white mb-4 md:mb-6 shadow-lg relative z-10 group-hover:scale-110 transition-transform">
                <stat.icon size={20} className="md:w-6 md:h-6" />
              </div>
              
              <h3 className="text-[10px] font-black text-text-secondary mb-2 uppercase tracking-widest relative z-10">
                {t(stat.labelKey)}
              </h3>
              
              <div className="flex items-baseline gap-2 relative z-10">
                <span className="text-3xl md:text-4xl font-black text-primary tracking-tight group-hover:text-accent transition-colors">
                  <Counter value={stat.value} />
                </span>
                <span className="text-[10px] font-black text-primary/40 uppercase tracking-widest">
                  {stat.suffix}
                </span>
              </div>
              
              <div className="mt-6 h-[1px] w-full bg-primary/10 relative z-10" />
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
