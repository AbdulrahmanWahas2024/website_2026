'use client';

import React from 'react';
import { PageHero } from '@/components/ui/PageHero';
import { Container } from '@/components/ui/Container';
import { useLanguage } from '@/context/LanguageContext';
import { motion } from 'motion/react';
import { Truck, Droplets, Factory, ShieldCheck, Zap, BarChart } from 'lucide-react';

export default function ServicesPage() {
  const { t } = useLanguage();

  const services = [
    { icon: Truck, title: 'نقل المشتقات النفطية', desc: 'أسطول متكامل من الناقلات الحديثة المجهزة بأحدث تقنيات التتبع والأمان لنقل الوقود.' },
    { icon: Droplets, title: 'توزيع الوقود', desc: 'شبكة واسعة من محطات التوزيع تغطي كافة المحافظات لضمان وصول الطاقة للجميع.' },
    { icon: Factory, title: 'إدارة المنشآت النفطية', desc: 'تشغيل وصيانة منشآت التخزين الاستراتيجية وفق أعلى معايير السلامة العالمية.' },
    { icon: ShieldCheck, title: 'فحص الجودة', desc: 'مختبرات متطورة لضمان مطابقة المشتقات النفطية للمواصفات والمقاييس المعتمدة.' },
    { icon: Zap, title: 'خدمات الطاقة المتكاملة', desc: 'حلول مبتكرة لتزويد المصانع والشركات الكبرى باحتياجاتها من الطاقة.' },
    { icon: BarChart, title: 'الاستشارات الفنية', desc: 'تقديم الدعم الفني والاستشاري في مجالات تخزين وتوزيع المشتقات النفطية.' },
  ];

  return (
    <main>
      <PageHero 
        title={t('nav.services')} 
        subtitle="حلول طاقة متكاملة وخدمات لوجستية احترافية تلبي تطلعاتكم"
      />
      
      <Container className="py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {services.map((service, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="group relative p-12 rounded-[40px] bg-white border border-border hover:border-accent transition-all hover:shadow-3xl hover:shadow-primary/10"
            >
              <div className="w-20 h-20 rounded-3xl bg-primary/5 flex items-center justify-center text-primary mb-10 group-hover:bg-primary group-hover:text-white transition-all">
                <service.icon size={40} />
              </div>
              
              <h3 className="text-2xl font-black text-primary mb-6 group-hover:text-accent transition-colors">
                {service.title}
              </h3>
              
              <p className="text-text-secondary leading-relaxed text-lg">
                {service.desc}
              </p>
              
              <div className="mt-10 pt-10 border-t border-border">
                <button className="text-primary font-black text-sm uppercase tracking-widest flex items-center gap-2 hover:text-accent transition-colors">
                  اكتشف المزيد
                  <div className="w-8 h-8 rounded-full bg-primary/5 flex items-center justify-center group-hover:bg-accent group-hover:text-primary transition-all">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="rtl:rotate-180">
                      <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                  </div>
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </main>
  );
}
