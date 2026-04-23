'use client';

import React, { useState, useEffect } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Container } from '@/components/ui/Container';
import { BackButton } from '@/components/ui/BackButton';
import { useLanguage } from '@/context/LanguageContext';
import { motion, AnimatePresence } from 'motion/react';
import { FileText, Upload, CheckCircle2, Building2, Globe, Briefcase, MapPin, Send } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { apiService } from '@/lib/api-service';
import { API_CONFIG } from '@/lib/api-config';

export default function TenderApplyClient({ id }: { id: string }) {
  const { t } = useLanguage();
  const [tender, setTender] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [submitted, setSubmitted] = useState(false);

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (loading) return <div className="min-h-screen bg-bg-main" />;

  return (
    <main className="bg-bg-main min-h-screen relative overflow-hidden">
      {/* 3D Animated Background Slider */}
      <div className="fixed inset-0 z-0">
        <motion.div
          animate={{ 
            scale: [1, 1.05, 1],
            rotate: [0, 0.5, 0]
          }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 opacity-10"
        >
          <Image 
            src="https://picsum.photos/seed/oilinfra/1920/1080" 
            alt="Background" 
            fill 
            className="object-cover"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-b from-bg-main via-bg-main/90 to-bg-main" />
      </div>

      <Header />
      
      <Container className="relative z-10 pt-32 pb-20">
        <BackButton className="mb-8" />

        <div className="max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            {!submitted ? (
              <motion.div
                key="form"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-white rounded-[40px] border border-border shadow-2xl overflow-hidden"
              >
                <div className="bg-primary p-10 text-white">
                  <h1 className="text-3xl font-black mb-4">طلب تقديم على مناقصة</h1>
                  <p className="text-white/70 font-bold">
                    أنت الآن بصدد التقديم على: <span className="text-accent">{tender.title}</span> (رقم: {tender.id})
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="p-10 space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Company Name */}
                    <div className="space-y-2">
                      <label className="text-sm font-black text-primary flex items-center gap-2">
                        <Building2 size={16} className="text-accent" />
                        اسم الشركة
                      </label>
                      <input 
                        required
                        type="text" 
                        placeholder="أدخل اسم الشركة بالكامل"
                        className="input-field"
                      />
                    </div>

                    {/* Company Type */}
                    <div className="space-y-2">
                      <label className="text-sm font-black text-primary flex items-center gap-2">
                        <Globe size={16} className="text-accent" />
                        نوع الشركة
                      </label>
                      <select required className="input-field appearance-none">
                        <option value="">اختر نوع الشركة</option>
                        <option value="local">شركة محلية</option>
                        <option value="international">شركة دولية</option>
                        <option value="sme">شركة متوسطة/صغيرة (SME)</option>
                      </select>
                    </div>

                    {/* Commercial Registration */}
                    <div className="space-y-2">
                      <label className="text-sm font-black text-primary flex items-center gap-2">
                        <FileText size={16} className="text-accent" />
                        رقم السجل التجاري
                      </label>
                      <input 
                        required
                        type="text" 
                        placeholder="أدخل رقم السجل التجاري"
                        className="input-field"
                      />
                    </div>

                    {/* Province */}
                    <div className="space-y-2">
                      <label className="text-sm font-black text-primary flex items-center gap-2">
                        <MapPin size={16} className="text-accent" />
                        المحافظة / المقر الرئيسي
                      </label>
                      <select required className="input-field appearance-none">
                        <option value="">اختر المحافظة</option>
                        <option value="sanaa">صنعاء</option>
                        <option value="aden">عدن</option>
                        <option value="taiz">تعز</option>
                        <option value="hadramout">حضرموت</option>
                        <option value="hodeidah">الحديدة</option>
                      </select>
                    </div>
                  </div>

                  {/* Attachments Section */}
                  <div className="pt-6 border-t border-border">
                    <h3 className="text-lg font-black text-primary mb-6 flex items-center gap-2">
                      <Upload size={20} className="text-accent" />
                      الوثائق والمرفقات المطلوبة
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {[
                        'العرض الفني والمالي',
                        'السجل التجاري والبطاقة الضريبية',
                        'شهادة الخبرة السابقة',
                        'الضمان البنكي الابتدائي'
                      ].map((doc, idx) => (
                        <div key={idx} className="relative group">
                          <input type="file" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
                          <div className="p-4 rounded-2xl border-2 border-dashed border-border group-hover:border-primary group-hover:bg-primary/5 transition-all flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-xl bg-bg-soft flex items-center justify-center text-primary">
                                <FileText size={20} />
                              </div>
                              <span className="text-xs font-bold text-text-secondary">{doc}</span>
                            </div>
                            <Upload size={18} className="text-text-secondary/40 group-hover:text-primary" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-8">
                    <button type="submit" className="btn-gov w-full py-5 text-lg flex items-center justify-center gap-4">
                      إرسال طلب التقديم
                      <Send size={20} />
                    </button>
                    <p className="text-center text-text-secondary/60 text-xs mt-4">
                      بالنقر على إرسال، فإنك توافق على كافة الشروط والأحكام الخاصة بالمناقصات العامة.
                    </p>
                  </div>
                </form>
              </motion.div>
            ) : (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white rounded-[40px] border border-border shadow-2xl p-16 text-center space-y-8"
              >
                <div className="w-24 h-24 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-lg">
                  <CheckCircle2 size={48} />
                </div>
                <div className="space-y-4">
                  <h2 className="text-4xl font-black text-primary">شكراً على التقديم!</h2>
                  <p className="text-text-secondary text-lg max-w-md mx-auto leading-relaxed">
                    تم استلام طلبكم بنجاح للمناقصة رقم <span className="text-primary font-black">{tender.id}</span>. سيقوم قسم المشتريات بمراجعة الوثائق والتواصل معكم قريباً.
                  </p>
                </div>
                <div className="pt-8 flex flex-col md:flex-row gap-4 justify-center">
                  <Link 
                    href="/tenders"
                    className="inline-flex items-center justify-center gap-2 px-10 py-3 font-bold transition-all active:scale-95 btn-gov rounded-xl"
                  >
                    العودة للمناقصات
                  </Link>
                  <Link 
                    href="/"
                    className="inline-flex items-center justify-center gap-2 px-10 py-3 font-bold transition-all active:scale-95 btn-gov bg-bg-soft text-primary border-border rounded-xl"
                  >
                    الرئيسية
                  </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </Container>

      <Footer />
    </main>
  );
}
