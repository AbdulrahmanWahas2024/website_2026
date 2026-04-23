'use client';

import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import Link from 'next/link';
import { ArrowRight, FileText, Calendar, MapPin, CheckCircle2 } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { apiService } from '@/lib/api-service';
import { API_CONFIG } from '@/lib/api-config';

export default function TendersSection() {
  const { t } = useLanguage();
  const [tenders, setTenders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTenders = async () => {
      try {
        setLoading(true);
        const data = await apiService.get<any>(API_CONFIG.DOC_TYPES.TENDERS);
        setTenders(data.slice(0, 3));
      } catch (err) {
      } finally {
        setLoading(false);
      }
    };
    fetchTenders();
  }, []);

  return (
    <section className="section-padding bg-white relative">
      <Container>
        <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-6">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-10 h-0.5 bg-accent" />
              <span className="text-accent text-[9px] font-black uppercase tracking-[0.2em]">{t('nav.tenders')}</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-black text-primary leading-tight">
              المناقصات والمزايدات المفتوحة
            </h2>
          </div>
          <Link 
            href="/tenders"
            className="inline-flex items-center justify-center gap-2 px-4 py-2 text-xs font-bold transition-all active:scale-95 disabled:opacity-50 disabled:pointer-events-none rounded-lg border border-border hover:bg-bg-soft"
          >
            {t('common.view_all')}
            <ArrowRight size={14} className="rtl:rotate-180" />
          </Link>
        </div>

        <div className="space-y-4">
          {loading ? (
            Array.from({ length: 3 }).map((_, idx) => (
              <div key={idx} className="h-20 w-full bg-bg-soft animate-pulse rounded-xl" />
            ))
          ) : (
            tenders.map((tender, idx) => (
              <div
                key={tender.id}
                className="group bg-bg-soft hover:bg-white border border-border hover:border-accent/30 p-4 md:p-6 rounded-xl flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 md:gap-6 transition-all duration-300 hover:shadow-md"
              >
                <div className="flex items-center gap-4 w-full lg:w-auto">
                  <div className="w-12 h-12 rounded-xl bg-primary/5 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all shrink-0">
                    <FileText size={20} />
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[8px] font-black text-accent uppercase tracking-widest">{tender.id}</span>
                      <div className="w-1 h-1 rounded-full bg-border" />
                      <span className="flex items-center gap-1 text-[8px] font-bold text-emerald-600 uppercase tracking-widest">
                        <CheckCircle2 size={10} />
                        {tender.status}
                      </span>
                    </div>
                    <h3 className="text-base font-black text-primary group-hover:text-accent transition-colors line-clamp-1">
                      {tender.title}
                    </h3>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-4 md:gap-6 w-full lg:w-auto">
                  <div className="flex items-center gap-2 text-text-secondary/60">
                    <Calendar size={14} className="text-primary" />
                    <div className="flex flex-col">
                      <span className="text-[7px] font-black uppercase tracking-widest">تاريخ الإغلاق</span>
                      <span className="text-[10px] font-bold text-text-primary">{tender.date}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 text-text-secondary/60">
                    <MapPin size={14} className="text-primary" />
                    <div className="flex flex-col">
                      <span className="text-[7px] font-black uppercase tracking-widest">الموقع</span>
                      <span className="text-[10px] font-bold text-text-primary">الإدارة العامة</span>
                    </div>
                  </div>

                  <Link 
                    href={`/tenders/${tender.id}/apply`} 
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2 text-xs font-bold transition-all active:scale-95 disabled:opacity-50 disabled:pointer-events-none rounded-lg bg-primary text-white group-hover:bg-accent group-hover:text-primary-dark"
                  >
                    تقديم الآن
                  </Link>
                </div>
              </div>
            ))
          )}
        </div>
      </Container>
    </section>
  );
}
