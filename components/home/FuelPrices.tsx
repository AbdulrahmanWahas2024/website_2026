'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Droplets, Fuel, Gauge, Zap, Clock } from 'lucide-react';
import Image from 'next/image';

import { Container } from '@/components/ui/Container';
import { apiService } from '@/lib/api-service';
import { API_CONFIG } from '@/lib/api-config';
import { Skeleton } from '@/components/ui/Skeleton';

interface FuelPriceItem {
  id: string;
  label: string;
  value: number;
  unit: string;
  icon: any;
  color: string;
  last_updated?: string;
}

const iconMap: Record<string, any> = {
  'diesel': Fuel,
  'petrol': Droplets,
  'gas': Gauge,
};

function CountUp({ value, decimals = 0 }: { value: number, decimals?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = true; // useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const end = value;
      const duration = 2000;
      const increment = end / (duration / 16);
      
      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(start);
        }
      }, 16);
      return () => clearInterval(timer);
    }
  }, [isInView, value]);

  return <span ref={ref}>{count.toFixed(decimals)}</span>;
}

export default function FuelPrices() {
  const { t } = useLanguage();
  const [prices, setPrices] = useState<FuelPriceItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        setLoading(true);
        const data = await apiService.get<any>(API_CONFIG.DOC_TYPES.FUEL_PRICES);
        
        const mappedData = data.map((item: any) => ({
          id: item.id,
          label: item.label,
          value: item.price,
          unit: item.unit,
          icon: iconMap[item.label.toLowerCase()] || Fuel,
          color: 'bg-primary',
          last_updated: 'اليوم، 08:00 صباحاً'
        }));

        setPrices(mappedData);
      } catch (err) {
      } finally {
        setLoading(false);
      }
    };

    fetchPrices();
  }, []);

  return (
    <section className="section-padding relative overflow-hidden bg-bg-soft">
      <Container>
        <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-6">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-10 h-0.5 bg-accent" />
              <span className="text-accent text-[9px] font-black uppercase tracking-[0.2em]">{t('home.fuel_prices')}</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-black text-primary leading-tight">
              {t('home.fuel_prices')}
            </h2>
          </div>
          <div className="flex items-center gap-3 bg-white px-3 py-1.5 rounded-lg border border-border shadow-sm">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-text-secondary text-[8px] font-bold uppercase tracking-widest">
              {t('common.last_updated')}: {prices[0]?.last_updated || '...'}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {loading ? (
            Array.from({ length: 3 }).map((_, idx) => (
              <div key={idx} className="bg-white p-8 rounded-2xl border border-border">
                <Skeleton className="w-12 h-12 rounded-xl mb-6 bg-primary/5" />
                <Skeleton className="h-5 w-24 mb-3 bg-primary/5" />
                <Skeleton className="h-10 w-40 mb-6 bg-primary/5" />
                <Skeleton className="h-px w-full bg-primary/5 mb-4" />
                <Skeleton className="h-3 w-full bg-primary/5" />
              </div>
            ))
          ) : (
            prices.map((item, idx) => (
              <div
                key={item.id}
                className="bg-white p-8 rounded-2xl relative group border border-border hover:border-accent/30 transition-all duration-300 hover:-translate-y-1 shadow-sm"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent pointer-events-none" />
                
                <div className={`w-12 h-12 bg-primary rounded-xl flex items-center justify-center text-white mb-6 shadow-lg relative z-10 group-hover:scale-110 transition-transform`}>
                  <item.icon size={24} />
                </div>
                
                <h3 className="text-[10px] font-black text-text-secondary mb-2 uppercase tracking-widest relative z-10">
                  {t(`common.fuel.${item.label.toLowerCase()}`)}
                </h3>
                
                <div className="flex items-baseline gap-2 relative z-10">
                  <span className="text-3xl md:text-4xl font-black text-primary tracking-tight group-hover:text-accent transition-colors">
                    <CountUp value={item.value} decimals={item.value % 1 === 0 ? 0 : 1} />
                  </span>
                  <span className="text-[10px] font-black text-primary/40 uppercase tracking-widest">
                    {item.unit}
                  </span>
                </div>
                
                <div className="mt-6 h-[1px] w-full bg-primary/10 relative z-10" />
                
                <div className="mt-4 flex items-center gap-2 text-text-secondary/40 text-[9px] font-bold uppercase tracking-widest relative z-10">
                  <Clock size={12} className="text-accent" />
                  <span>{item.last_updated}</span>
                </div>
              </div>
            ))
          )}
        </div>
      </Container>
    </section>
  );
}
