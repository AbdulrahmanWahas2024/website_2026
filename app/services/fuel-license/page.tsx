'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { PageSlider } from '@/components/ui/PageSlider';
import { Container } from '@/components/ui/Container';
import { motion, AnimatePresence } from 'motion/react';
import { Building2, Upload, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';

import { BackButton } from '@/components/ui/BackButton';
import Link from 'next/link';

export default function FuelLicensePage() {
  const { t } = useLanguage();
  const [isSubmitted, setIsSubmitted] = useState(false);

  const slides = [
    {
      image: "https://picsum.photos/seed/gas-station/1920/600",
      title: t('nav.fuel_license'),
      subtitle: "نظام طلبات تراخيص محطات الوقود الإلكتروني"
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <main className="min-h-screen bg-bg-main">
      <PageSlider slides={slides} effect="3d" />
      
      <Container className="py-16">
        <BackButton />
        
        <AnimatePresence mode="wait">
          {!isSubmitted ? (
            <motion.div 
              key="form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="max-w-4xl mx-auto"
            >
              <div className="bg-white rounded-3xl overflow-hidden shadow-xl border border-border">
                <div className="p-8 md:p-12">
                  <div className="flex items-center gap-4 mb-10 pb-6 border-b border-border">
                    <div className="w-12 h-12 bg-primary/5 rounded-xl flex items-center justify-center text-primary">
                      <Building2 size={28} />
                    </div>
                    <div>
                      <h3 className="text-2xl font-black text-primary">طلب ترخيص محطة وقود</h3>
                      <p className="text-text-secondary text-sm">يرجى تعبئة كافة البيانات المطلوبة بدقة</p>
                    </div>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-8">
                    {/* Applicant Info */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-text-primary">اسم مقدم الطلب</label>
                        <input type="text" required className="input-field" placeholder="الاسم الكامل كما في الهوية" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-text-primary">رقم الهوية الوطنية</label>
                        <input type="text" required className="input-field" placeholder="10 أرقام" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-text-primary">رقم الهاتف</label>
                        <input type="tel" required className="input-field" placeholder="7XXXXXXXX" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-text-primary">المحافظة</label>
                        <select className="input-field">
                          <option>صنعاء</option>
                          <option>عدن</option>
                          <option>تعز</option>
                          <option>حضرموت</option>
                        </select>
                      </div>
                    </div>

                    {/* Location Info */}
                    <div className="space-y-4">
                      <h4 className="font-black text-primary text-lg">موقع المحطة</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-sm font-bold text-text-primary">المديرية / المنطقة</label>
                          <input type="text" required className="input-field" placeholder="اسم المنطقة أو الشارع" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-bold text-text-primary">إحداثيات الموقع (GPS)</label>
                          <input type="text" placeholder="مثال: 15.3694, 44.1910" required className="input-field" />
                        </div>
                      </div>
                    </div>
                    
                    {/* Attachments */}
                    <div className="space-y-4">
                      <h4 className="font-black text-primary text-lg">المرفقات المطلوبة</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="border-2 border-dashed border-border rounded-2xl p-6 text-center hover:border-primary transition-all cursor-pointer bg-bg-soft group">
                          <Upload className="mx-auto mb-2 text-text-secondary group-hover:text-primary transition-colors" size={24} />
                          <p className="text-xs font-bold text-text-primary">وثيقة ملكية الأرض</p>
                          <p className="text-[10px] text-text-secondary mt-1">PDF, JPG (Max 5MB)</p>
                        </div>
                        <div className="border-2 border-dashed border-border rounded-2xl p-6 text-center hover:border-primary transition-all cursor-pointer bg-bg-soft group">
                          <Upload className="mx-auto mb-2 text-text-secondary group-hover:text-primary transition-colors" size={24} />
                          <p className="text-xs font-bold text-text-primary">المخطط الهندسي</p>
                          <p className="text-[10px] text-text-secondary mt-1">PDF, JPG (Max 10MB)</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col md:flex-row justify-between items-center gap-6 pt-8 border-t border-border">
                      <Link 
                        href="/"
                        className="inline-flex items-center justify-center gap-2 px-6 py-3 font-bold transition-all active:scale-95 text-text-secondary hover:bg-bg-soft rounded-xl"
                      >
                        العودة إلى الصفحة الرئيسية
                      </Link>
                      <button type="submit" className="btn-gov px-12 py-4 text-lg">
                        تقديم الطلب
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div 
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="max-w-2xl mx-auto text-center py-20 bg-white rounded-3xl border border-border shadow-xl p-12"
            >
              <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-8">
                <CheckCircle2 size={48} />
              </div>
              <h2 className="text-3xl font-black text-primary mb-6">تم استلام طلبك بنجاح</h2>
              <p className="text-lg text-text-secondary mb-10 leading-relaxed">
                شكراً لتقديم طلب ترخيص محطة وقود. تم تسجيل طلبك برقم مرجعي <span className="text-accent font-black">LIC-2026-4492</span>. سيقوم فريقنا الفني بمراجعة الوثائق والتواصل معك قريباً.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link 
                  href="/"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 font-bold transition-all active:scale-95 border border-border text-text-primary hover:bg-bg-soft rounded-xl w-full sm:w-auto"
                >
                  العودة للرئيسية
                </Link>
                <Button className="btn-gov w-full sm:w-auto" onClick={() => setIsSubmitted(false)}>
                  تقديم طلب جديد
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </Container>
    </main>
  );
}
