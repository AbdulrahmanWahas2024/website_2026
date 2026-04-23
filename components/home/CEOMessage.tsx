'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import Image from 'next/image';
import { Container } from '@/components/ui/Container';
import { Quote } from 'lucide-react';

export default function CEOMessage() {
  const { t } = useLanguage();

  return (
    <section className="section-padding relative overflow-hidden bg-white">
      <Container>
        <div 
          className="glass-card rounded-2xl overflow-hidden shadow-lg border-border"
        >
          <div className="flex flex-col lg:flex-row items-center">
            {/* Image Side */}
            <div className="w-full lg:w-[350px] xl:w-[400px] relative aspect-square lg:aspect-auto lg:h-[500px] shrink-0 overflow-hidden">
              <Image 
                src="https://picsum.photos/seed/executive/800/800" 
                alt="CEO" 
                fill
                priority
                sizes="(max-width: 768px) 100vw, 400px"
                className="object-cover object-center"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-primary/10" />
            </div>

            {/* Content Side */}
            <div className="p-6 md:p-10 lg:p-16 relative flex-1">
              <Quote size={60} className="absolute top-6 right-6 text-primary/5 -z-10" />
              
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-0.5 bg-accent" />
                <span className="text-accent text-[9px] font-black uppercase tracking-[0.2em]">{t('home.ceo_title')}</span>
              </div>

              <h2 className="text-xl md:text-2xl lg:text-3xl font-black text-primary mb-4 md:mb-6 leading-tight">
                {t('nav.ceo_message')}
              </h2>

              <blockquote className="space-y-3 md:space-y-4 text-text-secondary leading-relaxed text-sm md:text-base italic">
                <p>
                  &quot;نسعى في شركة النفط الوطنية إلى أن نكون الركيزة الأساسية لاستقرار الطاقة في الوطن، من خلال تبني أفضل الممارسات العالمية في التوزيع والخدمات اللوجستية.&quot;
                </p>
                <p>
                  &quot;التزامنا بالشفافية والتميز هو ما يدفعنا للتطوير المستمر لمنظومتنا الرقمية وخدماتنا الميدانية لتلبية تطلعات المواطنين وقطاعات الأعمال.&quot;
                </p>
              </blockquote>

              <div className="mt-6 md:mt-10">
                <cite className="not-italic">
                  <span className="block text-base md:text-lg font-black text-primary">المهندس / طارق عبدالله</span>
                  <span className="text-[10px] md:text-xs font-bold text-text-secondary opacity-60 uppercase tracking-widest">المدير التنفيذي العام</span>
                </cite>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
