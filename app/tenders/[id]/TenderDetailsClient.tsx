'use client';

import React, { useState, useEffect } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Container } from '@/components/ui/Container';
import { BackButton } from '@/components/ui/BackButton';
import { useLanguage } from '@/context/LanguageContext';
import { motion } from 'motion/react';
import { FileText, Download, Calendar, Clock, Building2, ShieldCheck, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { apiService } from '@/lib/api-service';
import { API_CONFIG } from '@/lib/api-config';

export default function TenderDetailsClient({ id }: { id: string }) {
  const { t } = useLanguage();
  const [tender, setTender] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTender = async () => {
      try {
        setLoading(true);
        const data = await apiService.get<any>(API_CONFIG.DOC_TYPES.TENDERS);
        const found = data.find((t: any) => t.id === id);
        setTender(found || data[0]);
      } catch (err) {
      } finally {
        setLoading(false);
      }
    };
    fetchTender();
  }, [id]);

  if (loading) return <div className="min-h-screen bg-bg-main" />;

  return (
    <main className="bg-bg-main min-h-screen">
      <Header />
      
      <section className="pt-32 pb-16 bg-primary text-white">
        <Container>
          <BackButton className="text-white/60 hover:text-white" />
          <div className="mt-8 flex flex-col md:flex-row md:items-center justify-between gap-8">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 rounded-lg bg-accent text-primary-dark text-[10px] font-black uppercase tracking-widest">
                  رقم المناقصة: {tender.id}
                </span>
                <span className="px-3 py-1 rounded-lg bg-white/10 text-white text-[10px] font-black uppercase tracking-widest">
                  {tender.status}
                </span>
              </div>
              <h1 className="text-3xl md:text-4xl font-black leading-tight">
                {tender.title}
              </h1>
            </div>
            <Link 
              href={`/tenders/${tender.id}/apply`}
              className="inline-flex items-center justify-center gap-2 px-10 py-4 text-lg font-bold transition-all active:scale-95 btn-gov bg-accent text-primary-dark border-none rounded-xl"
            >
              تقديم الآن
            </Link>
          </div>
        </Container>
      </section>

      <Container className="py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-12">
            <section className="bg-white p-10 rounded-3xl border border-border shadow-sm">
              <h2 className="text-2xl font-black text-primary mb-6 flex items-center gap-3">
                <FileText className="text-accent" />
                وصف المناقصة
              </h2>
              <p className="text-text-secondary leading-relaxed text-lg">
                تعلن شركة النفط الوطنية عن طرح المناقصة العامة المذكورة أعلاه لتوريد وتجهيز المعدات اللازمة لتطوير المنشآت النفطية. يهدف هذا المشروع إلى رفع الكفاءة التشغيلية وضمان استمرارية العمل وفق أعلى المعايير.
                <br /><br />
                على الشركات الراغبة في التقديم الالتزام بكافة الشروط والمواصفات الفنية الموضحة في كراسة الشروط.
              </p>
            </section>

            <section className="bg-white p-10 rounded-3xl border border-border shadow-sm">
              <h2 className="text-2xl font-black text-primary mb-8 flex items-center gap-3">
                <ShieldCheck className="text-accent" />
                الشروط والمتطلبات
              </h2>
              <ul className="space-y-4">
                {[
                  'أن تكون الشركة مسجلة رسمياً ولديها سجل تجاري ساري المفعول.',
                  'تقديم ضمان بنكي بنسبة 2.5% من قيمة العطاء.',
                  'خبرة سابقة في تنفيذ مشاريع مماثلة لا تقل عن 5 سنوات.',
                  'الالتزام بالجدول الزمني المحدد للتنفيذ.',
                  'تقديم كافة الوثائق الفنية والمالية في مظاريف مغلقة.'
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-4 p-4 rounded-2xl bg-bg-soft border border-border/50">
                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xs shrink-0">
                      {idx + 1}
                    </div>
                    <span className="text-text-secondary font-bold">{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section className="bg-white p-10 rounded-3xl border border-border shadow-sm">
              <h2 className="text-2xl font-black text-primary mb-8 flex items-center gap-3">
                <Download className="text-accent" />
                المرفقات والوثائق
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { name: 'كراسة الشروط والمواصفات', size: '2.4 MB' },
                  { name: 'الملحق الفني للمعدات', size: '1.8 MB' },
                  { name: 'نموذج العرض المالي', size: '540 KB' }
                ].map((doc, idx) => (
                  <div key={idx} className="flex items-center justify-between p-4 rounded-2xl border border-border hover:border-primary transition-all group">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-bg-soft flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
                        <FileText size={20} />
                      </div>
                      <div>
                        <h4 className="font-bold text-primary text-sm">{doc.name}</h4>
                        <span className="text-[10px] text-text-secondary">{doc.size}</span>
                      </div>
                    </div>
                    <button className="p-2 rounded-lg hover:bg-bg-soft text-accent transition-colors">
                      <Download size={18} />
                    </button>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            <div className="bg-white p-8 rounded-3xl border border-border shadow-sm">
              <h3 className="text-xl font-black text-primary mb-6 pb-4 border-b border-border">معلومات هامة</h3>
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center text-accent">
                    <Calendar size={20} />
                  </div>
                  <div>
                    <span className="block text-[10px] text-text-secondary uppercase font-black">تاريخ الإغلاق</span>
                    <span className="font-bold text-primary">{tender.date}</span>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center text-accent">
                    <Clock size={20} />
                  </div>
                  <div>
                    <span className="block text-[10px] text-text-secondary uppercase font-black">الوقت المتبقي</span>
                    <span className="font-bold text-primary">12 يوم و 5 ساعات</span>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center text-accent">
                    <Building2 size={20} />
                  </div>
                  <div>
                    <span className="block text-[10px] text-text-secondary uppercase font-black">الجهة المعلنة</span>
                    <span className="font-bold text-primary">الإدارة العامة للمشتريات</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-8 rounded-3xl bg-primary text-white space-y-6">
              <h3 className="text-xl font-black">جاهز للتقديم؟</h3>
              <p className="text-white/70 text-sm leading-relaxed">
                تأكد من مراجعة كافة الشروط والمرفقات قبل البدء في عملية التقديم الإلكتروني.
              </p>
              <Link 
                href={`/tenders/${tender.id}/apply`} 
                className="inline-flex items-center justify-center gap-2 px-6 py-3 font-bold transition-all active:scale-95 btn-gov w-full bg-accent text-primary-dark border-none rounded-xl"
              >
                ابدأ التقديم الآن
              </Link>
              <Link href="/tenders" className="block text-center text-white/60 hover:text-white text-sm font-bold transition-colors">
                العودة لقائمة المناقصات
              </Link>
            </div>
          </div>
        </div>
      </Container>

      <Footer />
    </main>
  );
}
