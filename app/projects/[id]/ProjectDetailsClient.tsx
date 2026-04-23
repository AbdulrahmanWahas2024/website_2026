'use client';

import React, { useState, useEffect } from 'react';
import { Container } from '@/components/ui/Container';
import { BackButton } from '@/components/ui/BackButton';
import { useLanguage } from '@/context/LanguageContext';
import { motion, AnimatePresence } from 'motion/react';
import { MapPin, Calendar, CheckCircle2, Trophy } from 'lucide-react';
import Image from 'next/image';
import { apiService } from '@/lib/api-service';
import { API_CONFIG } from '@/lib/api-config';

export default function ProjectDetailsClient({ id }: { id: string }) {
  const { t } = useLanguage();
  const [project, setProject] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        setLoading(true);
        const data = await apiService.get<any>(API_CONFIG.DOC_TYPES.PROJECTS);
        const found = data.find((p: any) => p.id === id);
        setProject(found || data[0]);
      } catch (err) {
      } finally {
        setLoading(false);
      }
    };
    fetchProject();
  }, [id]);

  if (loading) return <div className="min-h-screen bg-bg-main" />;

  const gallery = [
    project.image,
    `https://picsum.photos/seed/${id}1/1200/800`,
    `https://picsum.photos/seed/${id}2/1200/800`,
    `https://picsum.photos/seed/${id}3/1200/800`,
  ];

  return (
    <main className="bg-bg-main min-h-screen">
      
      {/* Achievement Theme Hero */}
      <section className="relative pt-32 pb-20 bg-primary-dark overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <Image 
            src="https://picsum.photos/seed/success/1920/1080" 
            alt="Success Background" 
            fill 
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary-dark via-primary-dark/60 to-transparent" />
        </div>
        
        <Container className="relative z-10">
          <BackButton className="text-white/60 hover:text-white" />
          <div className="max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-3 mb-6"
            >
              <Trophy className="text-accent" size={32} />
              <span className="text-accent font-black uppercase tracking-widest text-sm">إنجاز وطني استراتيجي</span>
            </motion.div>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-6xl font-black text-white mb-8 leading-tight"
            >
              {project.title}
            </motion.h1>
            <div className="flex flex-wrap gap-8 text-white/70">
              <div className="flex items-center gap-2">
                <MapPin size={20} className="text-accent" />
                <span className="font-bold">المنطقة الوسطى، اليمن</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar size={20} className="text-accent" />
                <span className="font-bold">تاريخ الإنجاز: 2024</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 size={20} className="text-accent" />
                <span className="font-bold">الحالة: مكتمل</span>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <Container className="py-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          {/* Content */}
          <div className="lg:col-span-2 space-y-12">
            <section>
              <h2 className="text-3xl font-black text-primary mb-6">عن المشروع</h2>
              <p className="text-text-secondary text-lg leading-relaxed">
                {project.description}
                <br /><br />
                يعتبر هذا المشروع من أهم المشاريع الاستراتيجية التي نفذتها الشركة في الآونة الأخيرة، حيث يهدف إلى تعزيز القدرة التخزينية وتطوير البنية التحتية لتوزيع المشتقات النفطية في المناطق الحيوية. تم تنفيذ المشروع وفق أعلى المعايير العالمية للجودة والسلامة المهنية.
              </p>
            </section>

            {/* 3D Animated Slider / Gallery */}
            <section>
              <h2 className="text-3xl font-black text-primary mb-8">معرض الصور</h2>
              <div className="space-y-6">
                <div className="relative aspect-video rounded-[40px] overflow-hidden shadow-2xl group bg-black">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeImage}
                      initial={{ opacity: 0, scale: 1.1 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.8 }}
                      className="absolute inset-0"
                    >
                      <Image 
                        src={gallery[activeImage]} 
                        alt="Project Gallery" 
                        fill 
                        className="object-contain"
                        referrerPolicy="no-referrer"
                      />
                    </motion.div>
                  </AnimatePresence>
                </div>
                
                {/* Thumbnails below image */}
                <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
                  {gallery.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImage(idx)}
                      className={`relative w-24 h-16 md:w-32 md:h-20 rounded-2xl overflow-hidden border-2 transition-all shrink-0 ${activeImage === idx ? 'border-accent scale-105 shadow-lg' : 'border-border opacity-50 hover:opacity-100'}`}
                    >
                      <Image src={img} alt="thumb" fill className="object-cover" referrerPolicy="no-referrer" />
                    </button>
                  ))}
                </div>
              </div>
            </section>
          </div>

          {/* Sidebar Info */}
          <div className="space-y-8">
            <div className="bg-white p-8 rounded-3xl border border-border shadow-sm">
              <h3 className="text-xl font-black text-primary mb-6 pb-4 border-b border-border">تفاصيل فنية</h3>
              <ul className="space-y-4">
                <li className="flex justify-between items-center">
                  <span className="text-text-secondary">الجهة المنفذة</span>
                  <span className="font-bold text-primary">شركة النفط الوطنية</span>
                </li>
                <li className="flex justify-between items-center">
                  <span className="text-text-secondary">التكلفة التقديرية</span>
                  <span className="font-bold text-primary">15,000,000 $</span>
                </li>
                <li className="flex justify-between items-center">
                  <span className="text-text-secondary">مدة التنفيذ</span>
                  <span className="font-bold text-primary">24 شهر</span>
                </li>
                <li className="flex justify-between items-center">
                  <span className="text-text-secondary">نسبة الإنجاز</span>
                  <span className="font-bold text-emerald-600">100%</span>
                </li>
              </ul>
            </div>

            <div className="bg-primary p-8 rounded-3xl text-white">
              <h3 className="text-xl font-black mb-4">هل لديك استفسار؟</h3>
              <p className="text-white/70 text-sm mb-6">يمكنكم التواصل مع قسم المشاريع للحصول على مزيد من المعلومات حول هذا المشروع.</p>
              <button className="btn-gov w-full bg-accent text-primary-dark">
                تواصل معنا الآن
              </button>
            </div>
          </div>
        </div>
      </Container>
    </main>
  );
}
