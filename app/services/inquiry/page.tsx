'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { PageHero } from '@/components/ui/PageHero';
import { Container } from '@/components/ui/Container';
import { motion, AnimatePresence } from 'motion/react';
import { Search, FileSearch, CheckCircle2, Clock, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/Button';

import { BackButton } from '@/components/ui/BackButton';
import { PageSlider } from '@/components/ui/PageSlider';

export default function InquiryPage() {
  const { t } = useLanguage();
  const [inquiryId, setInquiryId] = useState('');
  const [status, setStatus] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const slides = [
    {
      image: "https://picsum.photos/seed/inquiry/1920/600",
      title: "استعلام عن المعاملات",
      subtitle: "تابع حالة معاملتك وطلباتك الإلكترونية بكل سهولة ويسر"
    }
  ];

  const handleInquiry = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Mock API call
    setTimeout(() => {
      setStatus({
        id: inquiryId,
        status: 'قيد المراجعة',
        date: '2026-02-15',
        step: 2,
        totalSteps: 4,
        desc: 'تم استلام طلبك وهو حالياً قيد المراجعة الفنية من قبل القسم المختص.'
      });
      setLoading(false);
    }, 1500);
  };

  return (
    <main className="min-h-screen bg-bg-main">
      <PageSlider slides={slides} effect="3d" />
      
      <Container className="py-16">
        <BackButton />
        
        <div className="max-w-4xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-8 md:p-12 rounded-3xl border border-border shadow-xl mb-12"
          >
            <h3 className="text-2xl font-black text-primary mb-8 text-center">أدخل بيانات الاستعلام</h3>
            <form onSubmit={handleInquiry} className="flex flex-col md:flex-row gap-6">
              <div className="flex-1 relative">
                <FileSearch className="absolute right-4 top-1/2 -translate-y-1/2 text-text-secondary" size={20} />
                <input 
                  type="text" 
                  placeholder="أدخل الرقم المرجعي للمعاملة (مثال: NOC-2026-8842)"
                  value={inquiryId}
                  onChange={(e) => setInquiryId(e.target.value)}
                  className="input-field pr-12"
                  required
                />
              </div>
              <button type="submit" className="btn-gov px-10" disabled={loading}>
                {loading ? 'جاري البحث...' : 'بحث'}
              </button>
            </form>
          </motion.div>

          <AnimatePresence>
            {status && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-white p-8 md:p-12 rounded-3xl border border-border shadow-xl"
              >
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
                  <div>
                    <h4 className="text-text-secondary font-bold mb-2 uppercase tracking-widest text-xs">حالة المعاملة</h4>
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
                      <span className="text-3xl font-black text-primary">{status.status}</span>
                    </div>
                  </div>
                  <div className="md:text-left">
                    <h4 className="text-text-secondary font-bold mb-2 uppercase tracking-widest text-xs">تاريخ التقديم</h4>
                    <span className="text-xl font-bold text-primary">{status.date}</span>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="relative h-3 bg-bg-soft rounded-full mb-12 overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${(status.step / status.totalSteps) * 100}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="absolute h-full bg-accent rounded-full"
                  />
                </div>

                <div className="grid grid-cols-4 gap-4 mb-12">
                  {[1, 2, 3, 4].map((s) => (
                    <div key={s} className="text-center">
                      <div className={`w-10 h-10 rounded-full mx-auto flex items-center justify-center mb-3 transition-all ${s <= status.step ? 'bg-primary text-white shadow-lg' : 'bg-bg-soft text-text-secondary/30'}`}>
                        {s < status.step ? <CheckCircle2 size={20} /> : s}
                      </div>
                      <span className={`text-[10px] font-bold ${s <= status.step ? 'text-primary' : 'text-text-secondary/30'}`}>
                        {s === 1 ? 'استلام' : s === 2 ? 'مراجعة' : s === 3 ? 'اعتماد' : 'إنجاز'}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="p-6 bg-bg-soft rounded-2xl border border-border flex items-start gap-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary shrink-0">
                    <Clock size={20} />
                  </div>
                  <p className="text-text-secondary leading-relaxed">{status.desc}</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </Container>
    </main>
  );
}
