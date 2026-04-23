'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { PageSlider } from '@/components/ui/PageSlider';
import { Container } from '@/components/ui/Container';
import { motion } from 'motion/react';
import { Truck, Users, Building2, Factory, ShieldCheck, Zap, BarChart, CheckCircle2 } from 'lucide-react';
import { BackButton } from '@/components/ui/BackButton';
import Image from 'next/image';

export default function PetroleumTransportPage() {
  const { t } = useLanguage();

  const slides = [
    { image: 'https://picsum.photos/seed/tanker-1/1920/1080', title: 'خدمة نقل المشتقات النفطية', subtitle: 'أسطول متكامل لنقل الطاقة بكفاءة وأمان' },
    { image: 'https://picsum.photos/seed/tanker-2/1920/1080', title: 'تغطية شاملة وموثوقة', subtitle: 'نصل بطاقتنا إلى كافة الوكلاء والمؤسسات' },
    { image: 'https://picsum.photos/seed/tanker-3/1920/1080', title: 'معايير سلامة صارمة', subtitle: 'نلتزم بأعلى معايير الجودة في عمليات النقل' },
  ];

  const targets = [
    { icon: Users, title: 'الوكلاء المعتمدون', desc: 'تزويد محطات الوكلاء باحتياجاتهم اليومية من الوقود.' },
    { icon: Building2, title: 'المؤسسات والشركات', desc: 'حلول نقل مخصصة للمؤسسات الكبرى والشركات التجارية.' },
    { icon: Factory, title: 'المصانع والمنشآت', desc: 'دعم القطاع الصناعي بوقود الديزل والمازوت والزيوت.' },
  ];

  return (
    <main className="min-h-screen bg-bg-main">
      <PageSlider slides={slides} effect="3d" />
      
      <Container className="py-16">
        <div className="flex justify-end items-center mb-12">
          <BackButton />
        </div>

        <div className="max-w-4xl mx-auto text-center mb-20">
          <h2 className="text-4xl font-black text-primary mb-6">شريان الطاقة النابض في الوطن</h2>
          <p className="text-xl text-text-secondary leading-relaxed">
            تعد خدمة نقل المشتقات النفطية من الخدمات الحيوية التي تقدمها شركة النفط الوطنية، حيث نمتلك أسطولاً ضخماً من الناقلات الحديثة المجهزة بأحدث تقنيات التتبع والأمان لضمان وصول الطاقة لوجهتها بكفاءة عالية.
          </p>
        </div>

        {/* Target Audience */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
          {targets.map((target, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white p-10 rounded-[40px] border border-border hover:border-accent transition-all hover:shadow-2xl hover:shadow-primary/5 text-center group"
            >
              <div className="w-20 h-20 rounded-3xl bg-primary/5 flex items-center justify-center text-primary mx-auto mb-8 group-hover:bg-primary group-hover:text-white transition-all">
                <target.icon size={40} />
              </div>
              <h3 className="text-2xl font-black text-primary mb-4">{target.title}</h3>
              <p className="text-text-secondary leading-relaxed">{target.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Service Description Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-3xl font-black text-primary mb-8">مميزات خدمة النقل</h3>
            <div className="space-y-6">
              {[
                'أسطول حديث ومتنوع الأحجام والسعات.',
                'أنظمة تتبع (GPS) لمراقبة حركة الناقلات.',
                'فريق عمل مدرب على التعامل مع المواد الخطرة.',
                'الالتزام التام بمواعيد التسليم المحددة.',
                'تغطية جغرافية واسعة تشمل كافة المحافظات.',
              ].map((feature, idx) => (
                <div key={idx} className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center text-accent shrink-0">
                    <CheckCircle2 size={18} />
                  </div>
                  <p className="text-lg text-text-primary font-medium">{feature}</p>
                </div>
              ))}
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative aspect-video rounded-[40px] overflow-hidden shadow-2xl"
          >
            <Image 
              src="https://picsum.photos/seed/tanker-side/800/600" 
              alt="Oil Tanker" 
              fill 
              className="object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-primary/10 backdrop-blur-[1px]" />
          </motion.div>
        </div>
      </Container>
    </main>
  );
}
