'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { PageSlider } from '@/components/ui/PageSlider';
import { Container } from '@/components/ui/Container';
import { motion } from 'motion/react';
import { Plane, ShieldCheck, Zap, BarChart, CheckCircle2, Info, Clock, Globe } from 'lucide-react';
import { BackButton } from '@/components/ui/BackButton';
import Image from 'next/image';

export default function AircraftFuelPage() {
  const { t } = useLanguage();

  const slides = [
    { image: 'https://picsum.photos/seed/plane-1/1920/1080', title: 'خدمة تزويد الطائرات بالوقود', subtitle: 'نلتزم بأعلى معايير السلامة والجودة العالمية في المطارات' },
    { image: 'https://picsum.photos/seed/plane-2/1920/1080', title: 'دقة وكفاءة في التشغيل', subtitle: 'نعمل على مدار الساعة لضمان استمرارية حركة الطيران' },
    { image: 'https://picsum.photos/seed/plane-3/1920/1080', title: 'معايير جودة عالمية', subtitle: 'فحوصات مخبرية دقيقة لضمان سلامة الرحلات الجوية' },
  ];

  const standards = [
    { icon: ShieldCheck, title: 'معايير JIG العالمية', desc: 'نطبق أدق المعايير الدولية في تخزين ومناولة وقود الطائرات.' },
    { icon: Clock, title: 'خدمة على مدار الساعة', desc: 'فرقنا متواجدة في المطارات لتقديم الخدمة في أي وقت.' },
    { icon: Globe, title: 'تغطية المطارات الدولية', desc: 'نتواجد في كافة المطارات الدولية لخدمة شركات الطيران العالمية.' },
  ];

  const features = [
    'توفير وقود الطائرات (Jet A-1) عالي الجودة.',
    'فحوصات مخبرية دورية قبل كل عملية تزويد.',
    'أسطول حديث من شاحنات التزويد المجهزة بأحدث التقنيات.',
    'كوادر فنية مدربة ومعتمدة دولياً.',
    'نظام تتبع ومراقبة دقيق لعمليات التزويد.',
  ];

  return (
    <main className="min-h-screen bg-bg-main">
      <PageSlider slides={slides} effect="3d" />
      
      <Container className="py-16">
        <BackButton />

        <div className="max-w-4xl mx-auto text-center mb-20">
          <h2 className="text-4xl font-black text-primary mb-6">نحلق معكم بأمان وكفاءة</h2>
          <p className="text-xl text-text-secondary leading-relaxed">
            تعد خدمة تزويد الطائرات بالوقود من أهم الخدمات الاستراتيجية التي تقدمها شركة النفط الوطنية، حيث نلتزم بتطبيق أعلى معايير السلامة والجودة العالمية لضمان سلامة الرحلات الجوية.
          </p>
        </div>

        {/* Standards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
          {standards.map((standard, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white p-10 rounded-[40px] border border-border hover:border-accent transition-all hover:shadow-2xl hover:shadow-primary/5 text-center group"
            >
              <div className="w-20 h-20 rounded-3xl bg-primary/5 flex items-center justify-center text-primary mx-auto mb-8 group-hover:bg-primary group-hover:text-white transition-all">
                <standard.icon size={40} />
              </div>
              <h3 className="text-2xl font-black text-primary mb-4">{standard.title}</h3>
              <p className="text-text-secondary leading-relaxed">{standard.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Detailed Explanation Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center mb-24">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-3xl font-black text-primary mb-8">خدماتنا ومعايير الجودة</h3>
            <div className="space-y-6">
              {features.map((feature, idx) => (
                <div key={idx} className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center text-accent shrink-0">
                    <CheckCircle2 size={18} />
                  </div>
                  <p className="text-lg text-text-primary font-medium">{feature}</p>
                </div>
              ))}
            </div>
          </motion.div>
          
          <div className="grid grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative aspect-[3/4] rounded-[40px] overflow-hidden shadow-2xl mt-12"
            >
              <Image 
                src="https://picsum.photos/seed/plane-side-1/600/800" 
                alt="Aircraft Fueling" 
                fill 
                className="object-cover"
                referrerPolicy="no-referrer"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="relative aspect-[3/4] rounded-[40px] overflow-hidden shadow-2xl"
            >
              <Image 
                src="https://picsum.photos/seed/plane-side-2/600/800" 
                alt="Aircraft Fueling" 
                fill 
                className="object-cover"
                referrerPolicy="no-referrer"
              />
            </motion.div>
          </div>
        </div>

        {/* Safety First Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-24 bg-primary text-white p-12 md:p-20 rounded-[4rem] relative overflow-hidden shadow-2xl shadow-primary/20"
        >
          <div className="absolute top-0 right-0 w-full h-full opacity-5 pointer-events-none">
            <Plane className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white" size={600} />
          </div>
          
          <div className="relative z-10 flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
            <div className="relative shrink-0">
              <div className="w-32 h-32 rounded-[2rem] bg-accent flex items-center justify-center shadow-2xl shadow-accent/40 rotate-12">
                <ShieldCheck size={64} className="text-primary-dark -rotate-12" />
              </div>
              <div className="absolute -bottom-4 -right-4 w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20">
                <Zap size={24} className="text-accent" />
              </div>
            </div>
            
            <div className="space-y-8 text-center lg:text-right">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-accent text-xs font-black uppercase tracking-widest">
                <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                أولوية قصوى
              </div>
              <h3 className="text-4xl md:text-5xl font-black leading-tight">السلامة أولاً.. <br /> <span className="text-accent">دائماً وأبداً</span></h3>
              <p className="text-xl md:text-2xl text-white/70 font-medium leading-relaxed max-w-3xl">
                نحن ندرك أن الدقة في قطاع الطيران ليست مجرد خيار، بل هي حياة. لذا فإن كافة عملياتنا تخضع لرقابة صارمة وتدقيق دوري لضمان خلو الوقود من أي شوائب أو ملوثات قد تؤثر على سلامة المحركات.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-8">
                <div className="flex items-center gap-4 p-6 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-sm">
                  <CheckCircle2 className="text-accent" size={24} />
                  <span className="text-lg font-bold">فحوصات مخبرية دقيقة</span>
                </div>
                <div className="flex items-center gap-4 p-6 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-sm">
                  <CheckCircle2 className="text-accent" size={24} />
                  <span className="text-lg font-bold">رقابة دولية مستمرة</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </Container>
    </main>
  );
}
