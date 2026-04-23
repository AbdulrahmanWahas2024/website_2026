'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { PageSlider } from '@/components/ui/PageSlider';
import { Container } from '@/components/ui/Container';
import { motion } from 'motion/react';
import { Zap, Battery, Car, ShieldCheck, CheckCircle2, Info, Settings, Cpu, MapPin } from 'lucide-react';
import { BackButton } from '@/components/ui/BackButton';
import Image from 'next/image';

export default function EVChargingPage() {
  const { t } = useLanguage();

  const slides = [
    { image: 'https://picsum.photos/seed/ev-1/1920/1080', title: 'خدمة تراخيص محطات شحن السيارات الكهربائية', subtitle: 'نحو مستقبل أخضر ومستدام للطاقة' },
    { image: 'https://picsum.photos/seed/ev-2/1920/1080', title: 'تقنيات شحن ذكية ومتطورة', subtitle: 'حلول شحن سريعة وآمنة لكافة أنواع السيارات الكهربائية' },
    { image: 'https://picsum.photos/seed/ev-3/1920/1080', title: 'دعم التحول للطاقة النظيفة', subtitle: 'نساهم في بناء البنية التحتية لمستقبل النقل الكهربائي' },
  ];

  const chargingTypes = [
    { 
      title: 'الشحن السريع (Fast Charging)', 
      icon: Zap,
      desc: 'شحن عالي السرعة باستخدام التيار المستمر (DC)، يتيح شحن البطارية بنسبة تصل إلى 80% في وقت قصير جداً (20-40 دقيقة).',
      features: ['مثالي للمحطات على الطرق السريعة', 'قدرة شحن عالية تصل لـ 240kW', 'يدعم كافة أنواع الموصلات السريعة']
    },
    { 
      title: 'الشحن المتوسط (Medium Charging)', 
      icon: Battery,
      desc: 'شحن باستخدام التيار المتردد (AC)، مناسب للمواقف العامة والمجمعات السكنية والتجارية، يستغرق وقتاً أطول (4-8 ساعات).',
      features: ['تكلفة تركيب وتشغيل أقل', 'مثالي للشحن أثناء التوقف الطويل', 'يحافظ على عمر البطارية على المدى الطويل']
    },
  ];

  const specs = [
    { label: 'نطاق القدرة (Power Range)', value: '60kW to 240kW' },
    { label: 'الأبعاد (Dimension)', value: '1900×2200×1000 mm' },
    { label: 'جهد الإدخال (Input Voltage)', value: '400V (±10%)' },
    { label: 'جهد الإخراج (Output Voltage)', value: '300–1000V DC' },
    { label: 'الموصلات (Connectors)', value: 'Dual-gun | 250A | 5m cable' },
    { label: 'سعة البطارية (Battery Capacity)', value: '76.8kWh LFP' },
  ];

  return (
    <main className="min-h-screen bg-white">
      <PageSlider slides={slides} effect="3d" />
      
      <Container className="py-16 relative">
        {/* Background Icons Decor */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none overflow-hidden">
          <Car className="absolute top-20 left-10 rotate-12" size={200} />
          <Zap className="absolute bottom-40 right-20 -rotate-12" size={300} />
          <Battery className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" size={400} />
        </div>

        <BackButton />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24 relative z-10">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 text-emerald-600 text-xs font-black uppercase tracking-widest">
              <MapPin size={14} />
              مواقعنا
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-emerald-900 leading-tight">
              المحطة النموذجية <br /> <span className="text-emerald-500">لشحن السيارات الكهربائية</span>
            </h2>
            <p className="text-emerald-800/70 leading-relaxed text-lg">
              نفخر بتدشين أول محطة نموذجية متكاملة لشحن السيارات الكهربائية في العاصمة صنعاء، مجهزة بأحدث تقنيات الشحن السريع والمتوسط لتلبية احتياجات عملائنا.
            </p>
            
            <div className="flex items-start gap-4 p-6 rounded-3xl bg-white border border-emerald-100 shadow-sm">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-500 shrink-0">
                <MapPin size={24} />
              </div>
              <div>
                <h4 className="font-black text-emerald-900 mb-1">العنوان بالتفصيل</h4>
                <p className="text-emerald-800/70 text-sm">شارع الستين الجنوبي - بجوار فج عطان - صنعاء، اليمن</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative rounded-[3rem] overflow-hidden border-8 border-white shadow-2xl group"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="aspect-video lg:aspect-square"
            >
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3847.884545293246!2d44.1784!3d15.3268!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTXCsDE5JzM2LjUiTiA0NMKwMTAnNDIuMiJF!5e0!3m2!1sen!2sye!4v1620000000000!5m2!1sen!2sye" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen={true} 
                loading="lazy"
                className="grayscale hover:grayscale-0 transition-all duration-700"
              ></iframe>
            </motion.div>
            <div className="absolute top-6 right-6">
              <div className="bg-white/90 backdrop-blur-md px-4 py-2 rounded-full shadow-lg text-emerald-900 text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                موقع مباشر
              </div>
            </div>
          </motion.div>
        </div>

        <div className="max-w-4xl mx-auto text-center mb-20 relative z-10">
          <h2 className="text-4xl font-black text-emerald-900 mb-6">مستقبل النقل الكهربائي يبدأ من هنا</h2>
          <p className="text-xl text-emerald-800/70 leading-relaxed">
            تلتزم شركة النفط الوطنية بدعم التحول نحو الطاقة النظيفة من خلال تنظيم وتوفير تراخيص محطات شحن السيارات الكهربائية، وتوفير أحدث التقنيات العالمية في هذا المجال.
          </p>
        </div>

        {/* Charging Types */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-24 relative z-10">
          {chargingTypes.map((type, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="bg-emerald-50 p-12 rounded-[40px] border border-emerald-100 hover:border-emerald-300 transition-all hover:shadow-2xl hover:shadow-emerald-500/10 group"
            >
              <div className="w-20 h-20 rounded-3xl bg-emerald-500 flex items-center justify-center text-white mb-8 group-hover:scale-110 transition-transform">
                <type.icon size={40} />
              </div>
              <h3 className="text-2xl font-black text-emerald-900 mb-6">{type.title}</h3>
              <p className="text-emerald-800/70 leading-relaxed mb-8">{type.desc}</p>
              <div className="space-y-4">
                {type.features.map((feature, fIdx) => (
                  <div key={fIdx} className="flex items-center gap-3 text-emerald-900 font-bold">
                    <CheckCircle2 className="text-emerald-500" size={18} />
                    <span className="text-sm">{feature}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Product Specs Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center relative z-10">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-500">
                <Settings size={24} />
              </div>
              <h3 className="text-3xl font-black text-emerald-900">شاحن EVMS ONE</h3>
            </div>
            
            <p className="text-lg text-emerald-800/70 leading-relaxed mb-10">
              يعد شاحن EVMS ONE من أحدث حلول الشحن السريع المتكاملة، حيث يجمع بين القوة العالية والكفاءة في استهلاك الطاقة مع نظام حماية متطور.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {specs.map((spec, idx) => (
                <div key={idx} className="bg-white p-6 rounded-3xl border border-emerald-100 shadow-sm">
                  <p className="text-xs font-black text-emerald-500 uppercase tracking-widest mb-2">{spec.label}</p>
                  <p className="text-lg font-black text-emerald-900">{spec.value}</p>
                </div>
              ))}
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative aspect-square rounded-[60px] overflow-hidden shadow-3xl border-8 border-emerald-50"
          >
            <Image 
              src="https://picsum.photos/seed/ev-charger/800/800" 
              alt="EVMS ONE Charger" 
              fill 
              className="object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-emerald-500/10 backdrop-blur-[1px]" />
            <div className="absolute bottom-10 left-10 right-10 bg-white/90 backdrop-blur-md p-8 rounded-[40px] border border-white">
              <div className="flex items-center gap-4">
                <Cpu className="text-emerald-500" size={32} />
                <div>
                  <h4 className="font-black text-emerald-900">تقنية الشحن الذكي</h4>
                  <p className="text-xs text-emerald-800/60">نظام إدارة طاقة متطور يحمي البطارية</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </Container>
    </main>
  );
}
