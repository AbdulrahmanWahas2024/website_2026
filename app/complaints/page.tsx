'use client';

import React, { useState } from 'react';
import { Container } from '@/components/ui/Container';
import { BackButton } from '@/components/ui/BackButton';
import { useLanguage } from '@/context/LanguageContext';
import { motion } from 'motion/react';
import { MessageSquare, AlertTriangle, Lightbulb, HelpCircle, Users, Globe, Building2, TrendingUp, CheckCircle, FileText } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export default function ComplaintsPlatformPage() {
  const { t } = useLanguage();
  const [activeUserType, setActiveUserType] = useState<string | null>(null);

  const platformTypes = [
    { id: 'suggestion', title: t('complaints.suggestion'), icon: Lightbulb, color: 'text-amber-500', bg: 'bg-amber-50' },
    { id: 'complaint', title: t('complaints.complaint'), icon: MessageSquare, color: 'text-red-500', bg: 'bg-red-50' },
    { id: 'report', title: t('complaints.report'), icon: AlertTriangle, color: 'text-orange-500', bg: 'bg-orange-50' },
    { id: 'inquiry', title: t('complaints.inquiry'), icon: HelpCircle, color: 'text-blue-500', bg: 'bg-blue-50' },
  ];

  const userTypes = [
    { id: 'citizen', title: t('complaints.citizen'), icon: Users, path: '/complaints/citizen' },
    { id: 'international', title: t('complaints.non_resident'), icon: Globe, path: '/complaints/international' },
    { id: 'company', title: t('complaints.company'), icon: Building2, path: '/complaints/company' },
  ];

  const stats = [
    { label: 'عدد الطلبات المقدمة', value: '12,450', icon: FileText },
    { label: 'عدد الخدمات', value: '45', icon: TrendingUp },
    { label: 'عدد المؤسسات الحكومية', value: '120', icon: CheckCircle },
  ];

  return (
    <main className="bg-bg-main min-h-screen">
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-primary text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-accent rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent rounded-full blur-[120px] translate-x-1/2 translate-y-1/2" />
        </div>
        
        <Container className="relative z-10 text-center">
          <BackButton className="text-white/60 hover:text-white mb-8" />
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-black mb-6"
          >
            {t('complaints.title')}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-white/70 text-xl max-w-3xl mx-auto leading-relaxed"
          >
            صوتك مسموع.. نهدف من خلال منصة &quot;تجاوب&quot; إلى تعزيز الشفافية وتطوير خدماتنا من خلال مقترحاتكم وبلاغاتكم.
          </motion.p>
        </Container>
      </section>

      <Container className="py-20">
        {/* Platform Types Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {platformTypes.map((type, idx) => (
            <motion.div
              key={type.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white p-8 rounded-[32px] border border-border hover:border-primary transition-all hover:shadow-xl group text-center"
            >
              <div className={cn("w-16 h-16 rounded-2xl mx-auto mb-6 flex items-center justify-center transition-transform group-hover:scale-110", type.bg)}>
                <type.icon size={32} className={type.color} />
              </div>
              <h3 className="text-xl font-black text-primary mb-2">{type.title}</h3>
              <p className="text-text-secondary text-xs">نستقبل {type.title} بكل اهتمام</p>
            </motion.div>
          ))}
        </div>

        {/* User Type Selection */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black text-primary mb-4">اختر فئة المستخدم</h2>
            <p className="text-text-secondary">يرجى اختيار الفئة المناسبة لمتابعة تقديم طلبك</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {userTypes.map((type, idx) => (
              <Link href={type.path} key={type.id}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-white p-10 rounded-[40px] border-2 border-border hover:border-accent transition-all hover:shadow-2xl text-center group"
                >
                  <div className="w-20 h-20 rounded-full bg-bg-soft mx-auto mb-6 flex items-center justify-center text-primary group-hover:bg-accent group-hover:text-primary-dark transition-all">
                    <type.icon size={40} />
                  </div>
                  <h3 className="text-2xl font-black text-primary mb-4">{type.title}</h3>
                  <button className="btn-gov w-full py-3 text-sm">
                    اختيار
                  </button>
                </motion.div>
              </Link>
            ))}
          </div>
        </section>

        {/* Statistics Section */}
        <section className="bg-white rounded-[40px] border border-border p-12 shadow-sm overflow-hidden relative">
          <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative z-10">
            {stats.map((stat, idx) => (
              <div key={idx} className="text-center space-y-4">
                <div className="w-12 h-12 rounded-xl bg-primary/5 mx-auto flex items-center justify-center text-primary">
                  <stat.icon size={24} />
                </div>
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  className="text-4xl font-black text-primary"
                >
                  {stat.value}
                </motion.div>
                <div className="text-text-secondary font-bold text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </section>
      </Container>
    </main>
  );
}
