'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Truck, Droplets, Factory, ArrowRight, Plane, Car, Landmark } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import Link from 'next/link';

const services = [
  { 
    icon: Truck, 
    title: 'عقود نقل المشتقات', 
    desc: 'خدمات لوجستية متكاملة لنقل الطاقة بكفاءة وأمان.',
    href: '/services/transport-contract'
  },
  { 
    icon: Landmark, 
    title: 'التسويق المباشر', 
    desc: 'حلول طاقة مخصصة للجهات الحكومية والمؤسسات والشركات.',
    href: '/services/direct-marketing'
  },
  { 
    icon: Droplets, 
    title: 'تنظيم الاستيراد', 
    desc: 'تنظيم وتأمين احتياجات السوق المحلية وفق أعلى المعايير.',
    href: '/services/import-regulation'
  },
  { 
    icon: Plane, 
    title: 'تزويد الطائرات بالوقود', 
    desc: 'نلتزم بأعلى معايير السلامة والجودة العالمية في المطارات.',
    href: '/services/aircraft-fuel'
  },
  { 
    icon: Factory, 
    title: 'نقل المشتقات النفطية', 
    desc: 'أسطول متكامل لنقل الطاقة لكافة الوكلاء والمؤسسات.',
    href: '/services/petroleum-transport'
  },
  { 
    icon: Car, 
    title: 'تراخيص شحن EV', 
    desc: 'نحو مستقبل أخضر ومستدام للطاقة الكهربائية.',
    href: '/services/ev-charging'
  },
];

export default function ServicesSection() {
  const { t } = useLanguage();

  return (
    <section className="section-padding bg-white">
      <Container>
        <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-2xl md:text-3xl font-black text-primary mb-4 tracking-tight">
              خدماتنا المتكاملة
            </h2>
            <p className="text-base text-text-secondary leading-relaxed">
              نقدم مجموعة واسعة من الخدمات اللوجستية والفنية في قطاع النفط والطاقة، ملتزمين بأعلى معايير الجودة والسلامة.
            </p>
          </div>
          <Link 
            href="/services"
            className="flex items-center gap-2 text-primary font-black text-xs uppercase tracking-widest hover:text-accent transition-colors"
          >
            عرض كافة الخدمات
            <ArrowRight size={20} className="rtl:rotate-180" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {services.map((service, idx) => (
            <div
              key={idx}
              className="p-5 md:p-6 rounded-2xl bg-bg-main border border-border hover:border-accent/30 transition-all duration-300 hover:-translate-y-1 group"
            >
              <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform">
                <service.icon size={24} />
              </div>
              
              <h3 className="text-xl font-bold text-primary mb-3">
                {service.title}
              </h3>
              
              <p className="text-sm text-text-secondary leading-relaxed mb-6">
                {service.desc}
              </p>
              
              <Link 
                href={service.href}
                className="text-primary font-bold text-xs flex items-center gap-2 hover:text-accent transition-colors"
              >
                اكتشف المزيد
                <ArrowRight size={14} className="rtl:rotate-180" />
              </Link>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
