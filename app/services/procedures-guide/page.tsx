'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Container } from '@/components/ui/Container';
import { motion } from 'motion/react';
import { FileText, Download, Home, Info, ShieldCheck, Truck, Droplets } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { PageSlider } from '@/components/ui/PageSlider';
import Link from 'next/link';

import { BackButton } from '@/components/ui/BackButton';

export default function ProceduresGuidePage() {
  const { t } = useLanguage();

  const slides = [
    { 
      image: 'https://picsum.photos/seed/proc1/1920/1080', 
      title: 'دليل الإجراءات الموحد',
      subtitle: 'نعمل بوضوح وشفافية لتسهيل كافة الإجراءات والخدمات'
    },
    { 
      image: 'https://picsum.photos/seed/proc2/1920/1080', 
      title: 'الشفافية والوضوح',
      subtitle: 'خطوات واضحة ومحددة لكل خدمة نقدمها لعملائنا'
    }
  ];

  const guides = [
    { 
      title: 'دليل تراخيص محطات الوقود', 
      description: 'يتضمن كافة الشروط والمتطلبات الفنية والقانونية للحصول على ترخيص إنشاء أو تشغيل محطة وقود.',
      size: '2.4 MB', 
      date: '2025-10-15',
      icon: ShieldCheck
    },
    { 
      title: 'دليل عقود نقل المشتقات النفطية', 
      description: 'يوضح الإجراءات المتبعة لإبرام عقود النقل واللوائح المنظمة لعملية توزيع المشتقات.',
      size: '1.8 MB', 
      date: '2025-11-20',
      icon: Truck
    },
    { 
      title: 'دليل إجراءات الاستيراد والتوزيع', 
      description: 'دليل شامل يغطي مراحل استيراد المشتقات النفطية وآليات التوزيع في السوق المحلية.',
      size: '3.1 MB', 
      date: '2026-01-05',
      icon: Droplets
    },
  ];

  return (
    <main className="min-h-screen bg-bg-main">
      <PageSlider slides={slides} effect="3d" />
      
      <Container className="py-16">
        <BackButton />

        <div className="max-w-4xl mx-auto text-center mb-20">
          <h2 className="text-4xl font-black text-primary mb-6">
            {t('procedures_guide.title')}
          </h2>
          <p className="text-xl text-text-secondary leading-relaxed">
            {t('procedures_guide.subtitle')}
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
                <FileText size={40} />
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
            <Info className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white" size={400} />
          </div>
          <div className="relative z-10">
            <h3 className="text-3xl md:text-4xl font-black mb-8">هل تحتاج إلى مساعدة إضافية؟</h3>
            <p className="text-xl md:text-2xl text-white/90 mb-12 max-w-2xl mx-auto leading-relaxed font-medium">
              إذا لم تجد ما تبحث عنه في الأدلة المذكورة أعلاه، يمكنك التواصل مع فريق الدعم الفني لدينا أو زيارة أقرب فرع للشركة.
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              <Link 
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-12 py-7 text-lg font-black transition-all active:scale-95 bg-accent text-primary-dark hover:bg-white rounded-2xl"
              >
                اتصل بنا
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

