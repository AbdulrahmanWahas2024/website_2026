'use client';

import React from 'react';
import Image from 'next/image';
import { useLanguage } from '@/context/LanguageContext';
import { PageSlider } from '@/components/ui/PageSlider';
import { Container } from '@/components/ui/Container';
import { motion } from 'motion/react';
import { Building2, Landmark, Factory, ShieldCheck, Zap, BarChart, CheckCircle2, Phone, Mail, Users } from 'lucide-react';
import { BackButton } from '@/components/ui/BackButton';

export default function DirectMarketingPage() {
  const { t } = useLanguage();

  const targets = [
    { icon: Landmark, title: 'الجهات الحكومية', desc: 'تزويد كافة الوزارات والمؤسسات الحكومية باحتياجاتها من الوقود والزيوت.' },
    { icon: Building2, title: 'المؤسسات والشركات', desc: 'حلول طاقة مخصصة للمؤسسات الكبرى والشركات الخدمية والتجارية.' },
    { icon: Factory, title: 'القطاع الصناعي', desc: 'دعم المصانع والمنشآت الإنتاجية بوقود الديزل والمازوت والزيوت الصناعية.' },
  ];

  const features = [
    'توفير كميات كبيرة ومستمرة من المشتقات النفطية.',
    'أسعار تنافسية مخصصة للتعاقدات المباشرة.',
    'خدمة توصيل سريعة وموثوقة للمنشآت.',
    'تقارير دورية عن الاستهلاك والفواتير.',
    'دعم فني واستشاري متخصص.',
  ];

  const slides = [
    {
      image: "https://picsum.photos/seed/marketing/1920/600",
      title: "خدمة التسويق المباشر",
      subtitle: "شريككم الموثوق لتزويد منشآتكم بالطاقة اللازمة للنمو والتميز"
    }
  ];

  return (
    <main className="min-h-screen bg-bg-main">
      <PageSlider slides={slides} effect="3d" />
      
      <Container className="py-16">
        <BackButton />

        <div className="max-w-4xl mx-auto text-center mb-20">
          <h2 className="text-4xl font-black text-primary mb-6">حلول طاقة مخصصة للقطاعات الكبرى</h2>
          <p className="text-xl text-text-secondary leading-relaxed">
            تقدم شركة النفط الوطنية خدمة التسويق المباشر لتلبية احتياجات الجهات الحكومية والمؤسسات والشركات الصناعية والتجارية من المشتقات النفطية والزيوت، لضمان استمرارية أعمالهم بكفاءة عالية.
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

        {/* Features Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-3xl font-black text-primary mb-8">مميزات التعاقد المباشر</h3>
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
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative aspect-video rounded-[40px] overflow-hidden shadow-2xl"
          >
            <Image 
              src="https://picsum.photos/seed/industry/800/600" 
              alt="Industrial Energy" 
              fill 
              className="object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-primary/20 backdrop-blur-[2px]" />
          </motion.div>
        </div>

        {/* CTA Box - Partner with us */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-24 bg-accent text-primary-dark p-12 md:p-20 rounded-[4rem] text-center relative overflow-hidden shadow-2xl shadow-accent/20"
        >
          <div className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none">
            <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary-dark rounded-full blur-[100px] translate-x-1/2 translate-y-1/2" />
          </div>
          
          <div className="relative z-10 max-w-3xl mx-auto space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-dark/10 text-primary-dark text-xs font-black uppercase tracking-widest">
              <Users size={14} />
              فرص الشراكة
            </div>
            <h3 className="text-4xl md:text-5xl font-black leading-tight">هل ترغب في الشراكة معنا؟</h3>
            <p className="text-xl md:text-2xl text-primary-dark/80 font-medium leading-relaxed">
              نحن نؤمن بأن النجاح يكتمل بالشراكات الاستراتيجية. انضم إلينا كشريك معتمد واستفد من خبراتنا وبنيتنا التحتية الواسعة.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <div className="bg-primary-dark text-white px-10 py-5 rounded-3xl flex items-center justify-center gap-4 shadow-lg hover:scale-105 transition-transform cursor-pointer group">
                <Phone className="text-accent group-hover:rotate-12 transition-transform" size={24} />
                <div className="text-right">
                  <span className="block text-[10px] uppercase font-black opacity-60">اتصل بنا مباشرة</span>
                  <span className="text-xl font-black">800-1234</span>
                </div>
              </div>
              <div className="bg-white text-primary-dark px-10 py-5 rounded-3xl flex items-center justify-center gap-4 shadow-lg hover:scale-105 transition-transform cursor-pointer group">
                <Mail className="text-accent group-hover:-rotate-12 transition-transform" size={24} />
                <div className="text-right">
                  <span className="block text-[10px] uppercase font-black opacity-60">راسلنا عبر البريد</span>
                  <span className="text-xl font-black">partner@noc.gov.ye</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </Container>
    </main>
  );
}
