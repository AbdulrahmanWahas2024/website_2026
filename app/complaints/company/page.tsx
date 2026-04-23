'use client';

import React, { useState } from 'react';
import { Container } from '@/components/ui/Container';
import { BackButton } from '@/components/ui/BackButton';
import { useLanguage } from '@/context/LanguageContext';
import { motion, AnimatePresence } from 'motion/react';
import { Building2, FileText, Hash, Phone, Mail, Send, CheckCircle2 } from 'lucide-react';
import Image from 'next/image';

export default function CompanyComplaintPage() {
  const { t } = useLanguage();
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <main className="bg-bg-main min-h-screen">
      <Container className="pt-32 pb-20">
        <BackButton className="mb-12" />

        <div className="bg-white rounded-[40px] border border-border shadow-2xl overflow-hidden flex flex-col lg:flex-row">
          {/* Left Side: Form */}
          <div className="flex-1 p-10 md:p-16 space-y-10">
            <AnimatePresence mode="wait">
              {!submitted ? (
                <motion.div
                  key="form"
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="space-y-8"
                >
                  <div className="space-y-2">
                    <h1 className="text-3xl font-black text-primary">بوابة الشركات والمؤسسات</h1>
                    <p className="text-text-secondary font-bold">يرجى تزويدنا ببيانات المنشأة وتفاصيل الطلب</p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-sm font-black text-primary flex items-center gap-2">
                          <Building2 size={16} className="text-accent" />
                          اسم الشركة / المؤسسة
                        </label>
                        <input required type="text" placeholder="أدخل اسم المنشأة" className="input-field" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-black text-primary flex items-center gap-2">
                          <FileText size={16} className="text-accent" />
                          رقم السجل التجاري
                        </label>
                        <input required type="text" placeholder="رقم السجل" className="input-field" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-black text-primary flex items-center gap-2">
                          <Hash size={16} className="text-accent" />
                          الرقم الضريبي / الوطني
                        </label>
                        <input required type="text" placeholder="الرقم التعريفي" className="input-field" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-black text-primary flex items-center gap-2">
                          <Phone size={16} className="text-accent" />
                          رقم التواصل
                        </label>
                        <input required type="tel" placeholder="رقم الهاتف" className="input-field" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-black text-primary flex items-center gap-2">
                        <Mail size={16} className="text-accent" />
                        البريد الإلكتروني الرسمي
                      </label>
                      <input required type="email" placeholder="company@mail.com" className="input-field" />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-black text-primary flex items-center gap-2">
                        <FileText size={16} className="text-accent" />
                        موضوع الطلب
                      </label>
                      <textarea required rows={4} placeholder="اكتب تفاصيل الطلب هنا..." className="input-field resize-none"></textarea>
                    </div>

                    <button type="submit" className="btn-gov w-full py-5 text-lg flex items-center justify-center gap-4">
                      إرسال الطلب الرسمي
                      <Send size={20} />
                    </button>
                  </form>
                </motion.div>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="h-full flex flex-col items-center justify-center text-center space-y-8 py-20"
                >
                  <div className="w-24 h-24 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shadow-lg">
                    <CheckCircle2 size={48} />
                  </div>
                  <div className="space-y-4">
                    <h2 className="text-4xl font-black text-primary">تم استلام طلبكم</h2>
                    <p className="text-text-secondary text-lg max-w-md mx-auto leading-relaxed">
                      شكراً لتواصلكم معنا. تم تسجيل طلب منشأتكم بنجاح، وسيقوم فريق علاقات الشركات بمراجعته والرد عليكم قريباً.
                    </p>
                  </div>
                  <button onClick={() => setSubmitted(false)} className="btn-gov px-12">تقديم طلب آخر</button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Right Side: Image */}
          <div className="lg:w-2/5 relative min-h-[400px] bg-primary">
            <Image 
              src="https://picsum.photos/seed/corporate/800/1200" 
              alt="Corporate" 
              fill 
              className="object-cover opacity-60"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary via-transparent to-transparent" />
            <div className="absolute bottom-12 left-12 right-12 text-white">
              <h3 className="text-2xl font-black mb-4">شريكنا الاستراتيجي</h3>
              <p className="text-white/70 text-sm leading-relaxed">
                نحن في شركة النفط الوطنية نؤمن بأن نجاحنا مرتبط بنجاح شركائنا من الشركات والمؤسسات. تواصلكم معنا يساعدنا على تقديم خدمات أفضل لقطاع الأعمال.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </main>
  );
}
