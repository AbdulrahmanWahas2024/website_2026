'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { PageHero } from '@/components/ui/PageHero';
import { Container } from '@/components/ui/Container';
import { motion, AnimatePresence } from 'motion/react';
import { BookOpen, HelpCircle, ChevronDown, ChevronUp, Download, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';

import { BackButton } from '@/components/ui/BackButton';
import { Search, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { PageSlider } from '@/components/ui/PageSlider';

export default function UserGuidePage() {
  const { t, dir } = useLanguage();

  const slides = [
    {
      image: 'https://picsum.photos/seed/guide1/1920/1080',
      title: t('user_guide.slides.title1'),
      subtitle: t('user_guide.slides.subtitle1')
    },
    {
      image: 'https://picsum.photos/seed/guide2/1920/1080',
      title: t('user_guide.slides.title2'),
      subtitle: t('user_guide.slides.subtitle2')
    }
  ];

  const guides = [
    {
      title: t('user_guide.guides.guide1_title'),
      description: t('user_guide.guides.guide1_desc'),
      size: '1.2 MB',
      icon: BookOpen
    },
    {
      title: t('user_guide.guides.guide2_title'),
      description: t('user_guide.guides.guide2_desc'),
      size: '2.1 MB',
      icon: ShieldCheck
    },
    {
      title: t('user_guide.guides.guide3_title'),
      description: t('user_guide.guides.guide3_desc'),
      size: '0.9 MB',
      icon: HelpCircle
    }
  ];
  return (
    <main className="min-h-screen bg-bg-main">
      <PageSlider slides={slides} effect="3d" />
      
      <Container className="py-16">
        <BackButton />

        <div className="max-w-4xl mx-auto text-center mb-20">
          <h2 className="text-4xl font-black text-primary mb-6">دليل المستخدم والمساعدة</h2>
          <p className="text-xl text-text-secondary leading-relaxed">
            نهدف من خلال هذا الدليل إلى تبسيط رحلة المستخدم عبر منصتنا الإلكترونية وتوفير كافة الإرشادات اللازمة لاستخدام خدماتنا بفعالية.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
          {guides.map((guide, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white p-10 rounded-[40px] border border-border flex flex-col h-full hover:border-accent transition-all group hover:shadow-2xl hover:shadow-primary/5"
            >
              <div className="w-20 h-20 bg-primary/5 rounded-3xl flex items-center justify-center text-primary mb-8 group-hover:bg-primary group-hover:text-white transition-all">
                <guide.icon size={40} />
              </div>
              <h3 className="text-2xl font-black text-primary mb-4">{guide.title}</h3>
              <p className="text-text-secondary leading-relaxed mb-8 flex-grow">
                {guide.description}
              </p>
              <div className="pt-8 border-t border-border flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="text-xs text-text-secondary font-black uppercase tracking-widest mb-1">حجم الملف</span>
                  <span className="text-sm font-bold text-primary">{guide.size}</span>
                </div>
                <Button className="rounded-2xl gap-2 bg-primary text-white hover:bg-accent hover:text-primary-dark">
                  <Download size={18} />
                  تحميل PDF
                </Button>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="bg-primary text-white p-12 md:p-20 rounded-[60px] text-center relative overflow-hidden shadow-2xl shadow-primary/20">
          <div className="absolute top-0 right-0 w-full h-full opacity-5 pointer-events-none">
            <HelpCircle className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white" size={400} />
          </div>
          <div className="relative z-10">
            <h3 className="text-3xl md:text-4xl font-black mb-8">هل واجهت أي مشكلة تقنية؟</h3>
            <p className="text-xl md:text-2xl text-white/90 mb-12 max-w-2xl mx-auto leading-relaxed font-medium">
              فريق الدعم الفني لدينا متاح لمساعدتكم في حل أي مشكلات قد تواجهكم أثناء استخدام المنصة الإلكترونية.
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              <Link 
                href="/complaints"
                className="inline-flex items-center justify-center gap-2 px-12 py-7 text-lg font-black transition-all active:scale-95 bg-accent text-primary-dark hover:bg-white rounded-2xl"
              >
                تقديم بلاغ تقني
              </Link>
              <Link 
                href="/"
                className="inline-flex items-center justify-center gap-2 px-12 py-7 text-lg font-black transition-all active:scale-95 border border-white/20 text-white hover:bg-white/10 rounded-2xl"
              >
                العودة للرئيسية
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </main>
  );
}
