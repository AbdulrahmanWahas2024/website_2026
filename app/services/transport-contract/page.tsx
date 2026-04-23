'use client';

import React from 'react';
import Image from 'next/image';
import { useLanguage } from '@/context/LanguageContext';
import { PageSlider } from '@/components/ui/PageSlider';
import { Container } from '@/components/ui/Container';
import { motion } from 'motion/react';
import { Truck, MapPin, Phone, Mail, FileText, CheckCircle2, Info } from 'lucide-react';
import { BackButton } from '@/components/ui/BackButton';

export default function TransportContractPage() {
  const { t } = useLanguage();

  const slides = [
    { image: 'https://picsum.photos/seed/truck-1/1920/1080', title: 'خدمة عقود نقل المشتقات النفطية', subtitle: 'حلول لوجستية متكاملة لنقل الطاقة بكفاءة وأمان' },
    { image: 'https://picsum.photos/seed/truck-2/1920/1080', title: 'أسطول حديث ومتطور', subtitle: 'نلتزم بأعلى معايير السلامة والجودة في عمليات النقل' },
    { image: 'https://picsum.photos/seed/truck-3/1920/1080', title: 'تغطية شاملة لكافة المحافظات', subtitle: 'نصل بطاقتنا إلى كل شبر في الوطن' },
  ];

  const branches = [
    { name: 'فرع الأمانة', location: 'صنعاء - شارع الستين', phone: '+967 1 123456', email: 'sanaa@noc.gov.ye' },
    { name: 'فرع عدن', location: 'عدن - المعلا', phone: '+967 2 654321', email: 'aden@noc.gov.ye' },
    { name: 'فرع الحديدة', location: 'الحديدة - ميناء الحديدة', phone: '+967 3 111222', email: 'hodeidah@noc.gov.ye' },
    { name: 'فرع حضرموت', location: 'المكلا - شارع الميناء', phone: '+967 5 333444', email: 'hadramout@noc.gov.ye' },
    { name: 'فرع تعز', location: 'تعز - الحوبان', phone: '+967 4 555666', email: 'taiz@noc.gov.ye' },
    { name: 'فرع مأرب', location: 'مأرب - المجمع', phone: '+967 6 777888', email: 'marib@noc.gov.ye' },
  ];

  const conditions = [
    'أن تكون الناقلة مملوكة للمتقدم أو لديه تفويض رسمي.',
    'اجتياز الناقلة للفحص الفني الدوري ومعايير السلامة.',
    'وجود رخصة قيادة سارية المفعول للسائق مع شهادة حسن سيرة وسلوك.',
    'الالتزام بالمواصفات الفنية المعتمدة من قبل الشركة لنقل المشتقات.',
    'توفير أدوات السلامة ومكافحة الحريق اللازمة في الناقلة.',
  ];

  return (
    <main className="min-h-screen bg-bg-main">
      <PageSlider slides={slides} effect="3d" />
      
      <Container className="py-16">
        <BackButton />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          {/* Conditions & Procedures */}
          <div className="lg:col-span-2 space-y-12">
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 rounded-2xl bg-primary/5 flex items-center justify-center text-primary">
                  <FileText size={24} />
                </div>
                <h2 className="text-3xl font-black text-primary">الشروط والإجراءات</h2>
              </div>
              
              <div className="bg-white p-10 rounded-[40px] border border-border shadow-sm">
                <ul className="space-y-6">
                  {conditions.map((condition, idx) => (
                    <li key={idx} className="flex gap-4">
                      <CheckCircle2 className="text-accent shrink-0 mt-1" size={20} />
                      <span className="text-lg text-text-primary leading-relaxed">{condition}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.section>

            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-primary text-white p-12 rounded-[40px] shadow-xl relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-6">
                  <Info className="text-accent" size={32} />
                  <h3 className="text-2xl font-black">كيفية التقديم</h3>
                </div>
                <p className="text-xl text-white/80 leading-relaxed mb-8">
                  للحصول على عقد نقل المشتقات النفطية، يرجى زيارة أقرب فرع للشركة لتقديم الوثائق المطلوبة واستكمال الإجراءات القانونية والفنية.
                </p>
                <div className="flex flex-wrap gap-4">
                  <div className="bg-white/10 px-6 py-3 rounded-2xl text-sm font-bold border border-white/10">
                    تقديم الطلب حضورياً
                  </div>
                  <div className="bg-white/10 px-6 py-3 rounded-2xl text-sm font-bold border border-white/10">
                    مراجعة الوثائق الأصلية
                  </div>
                </div>
              </div>
            </motion.section>
          </div>

          {/* Sidebar Info */}
          <div className="space-y-8">
            <div className="bg-bg-soft p-10 rounded-[40px] border border-border">
              <h4 className="text-xl font-black text-primary mb-6">المستندات المطلوبة</h4>
              <div className="space-y-4">
                {[
                  'صورة من البطاقة الشخصية',
                  'صورة من ملكية الناقلة',
                  'شهادة الفحص الفني',
                  'رخصة القيادة للسائق',
                  'السجل التجاري (للمؤسسات)',
                ].map((doc, idx) => (
                  <div key={idx} className="flex items-center gap-3 text-text-secondary">
                    <div className="w-2 h-2 rounded-full bg-accent" />
                    <span className="text-sm font-bold">{doc}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="relative aspect-square rounded-[40px] overflow-hidden group">
              <Image 
                src="https://picsum.photos/seed/truck-side/600/600" 
                alt="Transport Truck" 
                fill 
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent flex items-end p-8">
                <p className="text-white font-bold text-lg">نلتزم بأعلى معايير السلامة</p>
              </div>
            </div>
          </div>
        </div>

      </Container>
    </main>
  );
}
