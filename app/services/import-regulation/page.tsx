'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { PageHero } from '@/components/ui/PageHero';
import { Container } from '@/components/ui/Container';
import { motion } from 'motion/react';
import { ShieldCheck, FileText, Building2, Users, Info, ArrowRight, CheckCircle2 } from 'lucide-react';
import { BackButton } from '@/components/ui/BackButton';
import { PageSlider } from '@/components/ui/PageSlider';

export default function ImportRegulationPage() {
  const { t } = useLanguage();

  const slides = [
    {
      image: "https://picsum.photos/seed/port/1920/600",
      title: "خدمة تنظيم استيراد المشتقات النفطية",
      subtitle: "نعمل على تنظيم وتأمين احتياجات السوق المحلية وفق أعلى المعايير العالمية"
    }
  ];

  const processSteps = [
    { title: 'تقديم طلب استيراد', desc: 'تقديم طلب رسمي للإدارة العامة للشركة يتضمن الكميات والنوعية المطلوبة.' },
    { title: 'مراجعة الوثائق', desc: 'فحص الوثائق القانونية والفنية للشركة المستوردة ومطابقتها للمعايير.' },
    { title: 'الموافقة المبدئية', desc: 'إصدار موافقة مبدئية بعد التأكد من توفر شروط الاستيراد والتخزين.' },
    { title: 'فحص الجودة', desc: 'إجراء الفحوصات المخبرية اللازمة للشحنات المستوردة لضمان مطابقتها للمواصفات.' },
    { title: 'الإفراج النهائي', desc: 'إصدار تصريح الإفراج النهائي عن الشحنة بعد اجتياز كافة الفحوصات.' },
  ];

  const services = [
    { icon: Building2, title: 'خدمات الشركات', desc: 'تنظيم عمليات الاستيراد التجاري وتوفير التراخيص اللازمة للشركات المؤهلة.' },
    { icon: Users, title: 'خدمات المواطنين', desc: 'ضمان توفر المشتقات النفطية في السوق المحلية بجودة عالية وأسعار عادلة.' },
    { icon: ShieldCheck, title: 'الرقابة والامتثال', desc: 'متابعة التزام كافة الجهات المستوردة باللوائح والقوانين المنظمة لقطاع النفط.' },
  ];

  return (
    <main className="min-h-screen bg-bg-main">
      <PageSlider slides={slides} effect="3d" />
      
      <Container className="py-16">
        <BackButton />

        <div className="max-w-4xl mx-auto text-center mb-20">
          <h2 className="text-4xl font-black text-primary mb-6">تنظيم الاستيراد لضمان أمن الطاقة</h2>
          <p className="text-xl text-text-secondary leading-relaxed">
            تتولى شركة النفط الوطنية مسؤولية تنظيم عمليات استيراد المشتقات النفطية لضمان استقرار السوق المحلية وحماية المستهلك من خلال فرض رقابة صارمة على الجودة والمواصفات.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
          {services.map((service, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white p-10 rounded-[40px] border border-border hover:border-accent transition-all hover:shadow-2xl hover:shadow-primary/5 text-center group"
            >
              <div className="w-20 h-20 rounded-3xl bg-primary/5 flex items-center justify-center text-primary mx-auto mb-8 group-hover:bg-primary group-hover:text-white transition-all">
                <service.icon size={40} />
              </div>
              <h3 className="text-2xl font-black text-primary mb-4">{service.title}</h3>
              <p className="text-text-secondary leading-relaxed">{service.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Regulation Process */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start mb-24">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-3xl font-black text-primary mb-12">إجراءات تنظيم الاستيراد</h3>
            <div className="space-y-12">
              {processSteps.map((step, idx) => (
                <div key={idx} className="flex gap-8 group">
                  <div className="relative">
                    <div className="w-14 h-14 rounded-2xl bg-white border-2 border-accent flex items-center justify-center text-accent font-black text-xl group-hover:bg-accent group-hover:text-white transition-all">
                      {idx + 1}
                    </div>
                    {idx < processSteps.length - 1 && (
                      <div className="absolute top-14 left-1/2 w-0.5 h-12 bg-border -translate-x-1/2" />
                    )}
                  </div>
                  <div className="pt-2">
                    <h4 className="text-xl font-black text-primary mb-2">{step.title}</h4>
                    <p className="text-text-secondary leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
          
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-primary text-white p-12 rounded-[40px] shadow-xl relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-6">
                  <Info className="text-accent" size={32} />
                  <h3 className="text-2xl font-black">تنبيه هام للشركات</h3>
                </div>
                <p className="text-xl text-white/80 leading-relaxed mb-8">
                  يجب على كافة الشركات الراغبة في استيراد المشتقات النفطية تقديم طلب رسمي إلى المركز الرئيسي للشركة في العاصمة لاستكمال الإجراءات القانونية.
                </p>
                <div className="flex items-center gap-3 text-accent font-black">
                  <ArrowRight size={20} className="rtl:rotate-180" />
                  <span>المركز الرئيسي - الإدارة العامة</span>
                </div>
              </div>
            </motion.div>

            <div className="bg-bg-soft p-10 rounded-[40px] border border-border">
              <h4 className="text-xl font-black text-primary mb-6">معايير القبول</h4>
              <div className="space-y-4">
                {[
                  'مطابقة الشحنة للمواصفات الفنية المعتمدة.',
                  'توفر منشآت تخزين كافية وآمنة.',
                  'الالتزام بالحصص المقررة للاستيراد.',
                  'تقديم الضمانات المالية اللازمة.',
                  'الامتثال للوائح البيئية والسلامة.',
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3 text-text-secondary">
                    <CheckCircle2 className="text-accent" size={18} />
                    <span className="text-sm font-bold">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </main>
  );
}
