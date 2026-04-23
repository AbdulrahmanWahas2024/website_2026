'use client';

import React from 'react';
import { PageSlider } from '@/components/ui/PageSlider';
import { Container } from '@/components/ui/Container';
import { useLanguage } from '@/context/LanguageContext';
import { motion } from 'motion/react';
import { History, Target, Eye, Award, Shield, Users } from 'lucide-react';
import { BackButton } from '@/components/ui/BackButton';
import Image from 'next/image';

export default function AboutPage() {
  const { t } = useLanguage();

  const slides = [
    {
      image: "https://picsum.photos/seed/building/1920/600",
      title: "مبنى الشركة الرئيسي",
      subtitle: "صرح وطني شامخ يخدم مسيرة التنمية"
    },
    {
      image: "https://picsum.photos/seed/tanks/1920/600",
      title: "منشآت التخزين الاستراتيجية",
      subtitle: "تأمين احتياجات الوطن من الطاقة بكفاءة عالية"
    },
    {
      image: "https://picsum.photos/seed/facility/1920/600",
      title: "مرافقنا الحيوية",
      subtitle: "بنية تحتية متطورة تغطي كافة أرجاء البلاد"
    }
  ];

  const values = [
    { icon: Shield, title: 'النزاهة', desc: 'نلتزم بأعلى معايير النزاهة والشفافية في كافة تعاملاتنا.' },
    { icon: Eye, title: 'الرؤية', desc: 'نتطلع دائماً للمستقبل ونسعى للابتكار في قطاع الطاقة.' },
    { icon: Award, title: 'الجودة', desc: 'نحرص على تقديم أفضل المنتجات والخدمات لعملائنا.' },
    { icon: Users, title: 'المسؤولية', desc: 'نؤمن بمسؤوليتنا تجاه المجتمع والبيئة.' },
  ];

  return (
    <main className="bg-bg-main min-h-screen">
      <PageSlider slides={slides} effect="3d" />
      
      <Container className="py-16">
        <BackButton />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent text-xs font-black uppercase tracking-widest">
              <History size={14} />
              تاريخنا العريق
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-primary leading-tight">
              أكثر من نصف قرن في <br /> <span className="text-accent">خدمة التنمية الوطنية</span>
            </h2>
            <p className="text-text-secondary leading-relaxed text-lg">
              تعتبر شركة النفط اليمنية إحدى الركائز الأساسية للاقتصاد الوطني، حيث تأسست لتتولى مسؤولية تأمين احتياجات البلاد من المشتقات النفطية وتوزيعها بكفاءة في كافة المحافظات.
              <br /><br />
              على مر العقود، نجحت الشركة في بناء بنية تحتية متطورة تشمل منشآت التخزين، وأساطيل النقل، وشبكة واسعة من المحطات، مع الالتزام الدائم بأعلى معايير السلامة والجودة.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative aspect-video rounded-[3rem] overflow-hidden shadow-2xl"
          >
            <Image 
              src="https://picsum.photos/seed/company/800/600" 
              alt="Company History" 
              fill
              className="object-cover"
              referrerPolicy="no-referrer"
            />
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-24">
          {values.map((value, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white p-10 rounded-[2.5rem] border border-border shadow-sm hover:shadow-xl transition-all group"
            >
              <div className="w-14 h-14 rounded-2xl bg-bg-soft flex items-center justify-center text-primary mb-6 group-hover:bg-primary group-hover:text-white transition-colors">
                <value.icon size={28} />
              </div>
              <h3 className="text-xl font-black text-primary mb-4">{value.title}</h3>
              <p className="text-text-secondary text-sm leading-relaxed">
                {value.desc}
              </p>
            </motion.div>
          ))}
        </div>

        <div className="bg-primary rounded-[3rem] p-12 md:p-20 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-accent/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-black leading-tight">
                رؤيتنا للمستقبل <br /> <span className="text-accent">نحو طاقة مستدامة</span>
              </h2>
              <p className="text-white/70 leading-relaxed text-lg">
                نسعى لأن نكون الشركة الرائدة في تقديم حلول الطاقة المتكاملة، مع التركيز على التحول الرقمي، وتحسين كفاءة العمليات، وتبني تقنيات صديقة للبيئة تساهم في بناء مستقبل أفضل لليمن.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/5 backdrop-blur-sm p-6 rounded-3xl border border-white/10 text-center">
                <div className="text-3xl font-black text-accent mb-1">100%</div>
                <div className="text-[10px] uppercase font-black tracking-widest text-white/60">تغطية وطنية</div>
              </div>
              <div className="bg-white/5 backdrop-blur-sm p-6 rounded-3xl border border-white/10 text-center">
                <div className="text-3xl font-black text-accent mb-1">50+</div>
                <div className="text-[10px] uppercase font-black tracking-widest text-white/60">عام من الخبرة</div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </main>
  );
}
