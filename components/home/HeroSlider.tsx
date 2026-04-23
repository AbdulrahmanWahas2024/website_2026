'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import Link from 'next/link';

export default function HeroSlider() {
  const { t } = useLanguage();

  return (
    <section className="relative h-[50vh] md:h-[70vh] max-h-[600px] w-full overflow-hidden bg-primary-dark">
      <div className="absolute inset-0">
        {/* Background */}
        <div className="relative h-full w-full overflow-hidden">
          <Image
            src="https://picsum.photos/seed/oil-refinery/1920/1080"
            alt="Hero Image"
            fill
            sizes="100vw"
            className="object-cover object-center"
            priority
            referrerPolicy="no-referrer"
          />
          {/* Reduced transparency overlays */}
          <div className="absolute inset-0 bg-primary-dark/20" />
          <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/60 via-transparent to-transparent" />
        </div>

        {/* Content */}
        <div className="absolute inset-0 flex items-center">
          <Container>
            <div className="max-w-2xl space-y-4 md:space-y-6">
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
                <span className="inline-block px-3 py-1 rounded-full bg-accent text-primary-dark text-[8px] md:text-[10px] font-black uppercase tracking-[0.2em] mb-3 md:mb-5">
                  National Oil Company
                </span>
                <h1 className="text-2xl md:text-4xl lg:text-6xl font-black text-white leading-tight mb-3 md:mb-5 tracking-tight drop-shadow-lg">
                  حلول الطاقة للمستقبل
                </h1>
                <p className="text-sm md:text-lg text-white/90 leading-relaxed font-medium max-w-xl drop-shadow-md">
                  نعمل بتميز واستدامة لتوفير احتياجات الوطن من الطاقة
                </p>
              </div>

              <div className="flex flex-wrap gap-3 animate-in fade-in slide-in-from-bottom-6 duration-1000">
                <Link 
                  href="/projects"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 text-sm md:text-base font-bold transition-all active:scale-95 bg-accent text-primary-dark hover:bg-white shadow-xl rounded-xl"
                >
                  {t('hero.cta_projects')}
                  <ArrowRight size={18} className="rtl:rotate-180" />
                </Link>
                <Link 
                  href="/services"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 text-sm md:text-base font-bold transition-all active:scale-95 border border-white text-white hover:bg-white hover:text-primary-dark backdrop-blur-sm rounded-xl"
                >
                  {t('hero.cta_services')}
                </Link>
              </div>
            </div>
          </Container>
        </div>
      </div>
    </section>
  );
}
