'use client';

import React, { useState } from 'react';
import { Container } from '@/components/ui/Container';
import { BackButton } from '@/components/ui/BackButton';
import { useLanguage } from '@/context/LanguageContext';
import { motion, AnimatePresence } from 'motion/react';
import { User, CreditCard, Phone, Mail, FileText, Send, CheckCircle2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function CitizenComplaintPage() {
  const { t } = useLanguage();
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <main className="bg-[#F8F9FA] min-h-screen relative overflow-hidden">
      {/* Government Style Background Elements */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-5">
        <div className="absolute top-20 left-10 w-96 h-96 border-[40px] border-primary rounded-full" />
        <div className="absolute bottom-20 right-10 w-96 h-96 border-[40px] border-accent rounded-full" />
      </div>

      <Container className="relative z-10 pt-32 pb-20">
        <BackButton className="mb-8" />

        <div className="max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            {!submitted ? (
              <motion.div
                key="form"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-white rounded-[40px] border border-border shadow-2xl overflow-hidden"
              >
                <div className="bg-primary p-12 text-white text-center">
                  <h1 className="text-3xl font-black mb-4">نموذج تقديم (مواطن / مقيم)</h1>
                  <p className="text-white/70 font-bold">يرجى تعبئة البيانات التالية بدقة لضمان سرعة المعالجة</p>
                </div>

                <form onSubmit={handleSubmit} className="p-12 space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <label className="text-sm font-black text-primary flex items-center gap-2">
                        <User size={16} className="text-accent" />
                        الاسم الكامل
                      </label>
                      <input required type="text" placeholder="أدخل اسمك الرباعي" className="input-field" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-black text-primary flex items-center gap-2">
                        <CreditCard size={16} className="text-accent" />
                        الرقم الوطني / الإقامة
                      </label>
                      <input required type="text" placeholder="11 رقم" className="input-field" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-black text-primary flex items-center gap-2">
                        <Phone size={16} className="text-accent" />
                        رقم الهاتف
                      </label>
                      <input required type="tel" placeholder="7XXXXXXXX" className="input-field" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-black text-primary flex items-center gap-2">
                        <Mail size={16} className="text-accent" />
                        البريد الإلكتروني
                      </label>
                      <input required type="email" placeholder="example@mail.com" className="input-field" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-black text-primary flex items-center gap-2">
                      <FileText size={16} className="text-accent" />
                      تفاصيل المقترح / الشكوى
                    </label>
                    <textarea 
                      required 
                      rows={5} 
                      placeholder="اكتب هنا بالتفصيل..." 
                      className="input-field resize-none"
                    ></textarea>
                  </div>

                  <div className="pt-8">
                    <button type="submit" className="btn-gov w-full py-5 text-lg flex items-center justify-center gap-4">
                      إرسال الطلب
                      <Send size={20} />
                    </button>
                  </div>
                </form>
              </motion.div>
            ) : (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white rounded-[40px] border border-border shadow-2xl p-20 text-center space-y-8"
              >
                <div className="w-24 h-24 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-lg">
                  <CheckCircle2 size={48} />
                </div>
                <div className="space-y-4">
                  <h2 className="text-4xl font-black text-primary">تم الإرسال بنجاح</h2>
                  <p className="text-text-secondary text-lg max-w-md mx-auto leading-relaxed">
                    {t('complaints.success_msg')}
                  </p>
                </div>
                <div className="pt-8">
                  <Link 
                    href="/complaints"
                    className="inline-flex items-center justify-center gap-2 px-12 py-3 font-bold transition-all active:scale-95 btn-gov rounded-xl"
                  >
                    العودة للمنصة
                  </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </Container>
    </main>
  );
}
