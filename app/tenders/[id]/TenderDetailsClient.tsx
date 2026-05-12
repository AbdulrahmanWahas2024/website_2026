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
//import { apiService } from '@/lib/api-service';
import { API_CONFIG } from '@/lib/api-config';
import { fetchTenders } from "@/lib/services/tender.service";
export default function TenderDetailsClient({ id }: { id: string }) {
  const { t } = useLanguage();
  const [tender, setTender] = useState<any>(null); // تخزين تفاصيل المناقصة في حالة عدم وجود بيانات، سيكون null  
  const [loading, setLoading] = useState(true); // حالة التحميل لعرض skeleton أثناء جلب البيانات  
 // دالة لحساب الوقت المتبقي حتى تاريخ الإغلاق وعرضه بشكل مناسب 
  const calculateRemainingTime = (date: string) => { 
    if (!date) return "غير محدد";

    const end = new Date(date).getTime();

    const now = new Date().getTime();

    const diff = end - now;

    if (diff <= 0) {
      return "انتهت المناقصة";
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    const hours = Math.floor(
      (diff % (1000 * 60 * 60 * 24)) /
      (1000 * 60 * 60)
    );
    

    return `${days} يوم و ${hours} ساعة`;

  };
  // تنسيق حجم الملف للعرض */
  const formatFileSize = (bytes?: number) => {

    if (!bytes) return "PDF";

    const kb = bytes / 1024;

    if (kb < 1024) {
      return `${kb.toFixed(0)} KB`;
    }

    return `${(kb / 1024).toFixed(1)} MB`;

  }; // تجهيز قائمة المرفقات للعرض في قسم المرفقات، مع فلترة العناصر الفارغة
  const attachments = [
    tender?.terms_file && {
      name: "كراسة الشروط والمواصفات",
      url: tender.terms_file,
    },

    tender?.technical_file && {
      name: "الملحق الفني للمعدات",
      url: tender.technical_file,
    },

    tender?.financial_file && {
      name: "نموذج العرض المالي",
      url: tender.financial_file,
    }

  ].filter(Boolean);
  useEffect(() => {
    const loadTender = async () => {
      try {
        setLoading(true);

        const data = await fetchTenders();

        const found = data.find((item: any) => item.id === id);

        setTender(found || null);

      } catch (err) {
        console.error("Tender Details Error:", err);
        setTender(null);
      } finally {
        setLoading(false);
      }
    };

    loadTender();
  }, [id]);
  // if (loading) {
  //   return (
  //     <div className="min-h-screen flex items-center justify-center">
  //       جاري تحميل المناقصة...
  //     </div>
  //   );
  // }
if (loading) {
  return (

    <div className="min-h-screen flex flex-col items-center justify-center bg-bg-main">

      {/* دائرة متحركة */}

      <div className="relative w-20 h-20">

        <div className="absolute inset-0 rounded-full border-4 border-primary/20" />

        <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-primary border-r-accent animate-spin" />

      </div>

      {/* النص */}

      <div className="mt-6 text-center">

        <h3 className="text-lg font-black text-primary">
          جاري تحميل المناقصة
        </h3>

        <p className="text-sm text-text-secondary mt-2">
          يرجى الانتظار قليلاً...
        </p>

      </div>

    </div>

  );
}
  if (!tender) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        لا توجد بيانات لهذه المناقصة
      </div>
    );
  }

  if (loading) return <div className="min-h-screen bg-bg-main" />;

  return (
    <main className="bg-bg-main min-h-screen">
      <Header />
      
      {/* <section className="pt-40 pb-16 bg-primary text-white"> */}
      <motion.section
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="relative pt-40 pb-20 overflow-hidden text-white"
      >
                
        <div className="absolute inset-0">

          {/* صورة أو خلفية بسيطة */}
          <motion.img
            src="/5.jpg"
            alt="tenders background"
            className="absolute inset-0 w-full h-full object-cover object-[center_5%] scale-125 sm:scale-115 md:scale-110 lg:scale-105"
            initial={{ scale: 1.15 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            // initial={{ opacity: 0 }}
            // animate={{ opacity: 1 }}
            // transition={{ duration: 1 }}
          />
          {/* <div className="absolute inset-0 bg-gradient-to-r from-white/5 via-transparent to-primary/10" /> */}
          {/* <div className="absolute inset-0 bg-white/5" />

          {/* الشفافية*/}

          {/* <div className="absolute inset-0 bg-gradient-to-t from-blue-800/90 via-primary/40 to-transparent" />                  </div> */}
          {/* <div className="absolute inset-0 bg-gradient-to-t from-navy-dark/85 via-primary/40 to-transparent" /></div> */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-primary/20 to-transparent mix-blend-multiply" /></div>
        <div className="absolute inset-0 bg-gradient-to-t from-blue-950/50 via-primary/40 to-transparent" />
        <Container className="relative z-10">
          {/* <BackButton className="text-white/60 hover:text-white" /> */}
          <div className="mt-8 flex flex-col md:flex-row md:items-center justify-between gap-8">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 rounded-lg bg-accent text-primary-dark text-[10px] font-black uppercase tracking-widest">
                  رقم المناقصة: {tender.id}
                </span>
                <span className="px-3 py-1 rounded-lg bg-white/10 text-white text-[10px] font-black uppercase tracking-widest">
                  {tender?.status}
                  </span>
                </div>
              <h1 className="text-3xl md:text-4xl font-black leading-tight">
                {tender?.title}
              </h1>
            </div>
            <Link 
              href={`/tenders/${tender?.id}/apply`}
              className="inline-flex items-center justify-center gap-2 px-10 py-4 text-lg font-bold transition-all active:scale-95 btn-gov bg-accent text-primary-dark border-none rounded-xl"
            >
              تقديم الآن
            </Link>
          </div>
        </Container>
      </motion.section>

      <Container className="py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-12">
            <section className="bg-white p-10 rounded-3xl border border-border shadow-sm">
              <h2 className="text-2xl font-black text-primary mb-6 flex items-center gap-3">
                <FileText className="text-accent" />
                وصف المناقصة
              </h2>
              
              <div
                className="
              text-text-secondary
              text-sm md:text-base lg:text-lg
               leading-7 md:leading-8
               break-words
               overflow-hidden
                max-w-full "
                dangerouslySetInnerHTML={{
                  __html: tender.description || ""
                }}
              />
            </section>

            <section className="bg-white p-10 rounded-3xl border border-border shadow-sm">
              <h2 className="text-2xl font-black text-primary mb-8 flex items-center gap-3">
                <ShieldCheck className="text-accent" />
                الشروط والمتطلبات
              </h2>
          
              <div className="space-y-4"> 

                {tender?.requirements && (

                  (() => {

                    // تنظيف HTML من ERPNext
                    const html = tender.requirements;

                    // تحويل HTML إلى DOM
                    const doc = new DOMParser().parseFromString(html, "text/html");

                    // أخذ كل النصوص داخل الفقرات والعناصر
                    const items = Array.from(doc.body.querySelectorAll("p, li"))
                      .map(el => el.textContent?.trim())
                     // .filter(Boolean);
                      

                    // 🔴 فلترة السطور الفارغة + <br>
                    .filter(text =>
                      text &&
                      text !== "" &&
                      text !== "\n"
                    );

                    return items.map((text: string, idx: number) => (

                      <div
                        key={idx}
                        className="
            flex items-start gap-4
            p-4
            rounded-2xl
            bg-bg-soft
            border border-border/50
          "
                      >

                        <div className="
            w-6 h-6 rounded-full
            bg-primary/10
            flex items-center justify-center
            text-primary
            font-bold text-xs shrink-0
          ">
                          {idx + 1}
                        </div>

                        <span className="text-text-secondary font-bold">
                          {text}
                        </span>

                      </div>

                    ));

                  })()

                )}

              </div>
                     
            </section>

            <section className="bg-white p-10 rounded-3xl border border-border shadow-sm">
              <h2 className="text-2xl font-black text-primary mb-8 flex items-center gap-3">
                <Download className="text-accent" />
                المرفقات والوثائق
              </h2>
         
              {/* إذا لا توجد مرفقات */}
              {attachments.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 text-center text-text-secondary">

                  <div className="w-16 h-16 rounded-2xl bg-bg-soft flex items-center justify-center mb-4">
                    <FileText className="text-primary opacity-50" size={28} />
                  </div>

                  <h3 className="font-black text-primary mb-2">
                    لا توجد مرفقات حالياً
                  </h3>

                  <p className="text-sm text-text-secondary">
                    لم يتم إضافة أي ملفات أو وثائق لهذه المناقصة حتى الآن
                  </p>

                </div>
              ) : (

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                    {attachments.map((file: any, idx: number) => (

                    <a
                      key={idx}
                      href={file.url}
                      target="_blank"
                      className="flex items-center justify-between p-4 rounded-2xl border border-border hover:border-primary transition-all group"
                    >

                      <div className="flex items-center gap-4">

                        <div className="w-10 h-10 rounded-xl bg-bg-soft flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
                          <FileText size={20} />
                        
                        </div>

                        <div>
                          <h4 className="font-bold text-primary text-sm">
                            {file.name}
                          </h4>
                          <span className="text-[10px] text-text-secondary">
                            {file.size || ""}
                          </span>
                        
                        </div>
                          -( PDF )
                      </div>

                      <Download size={18} className="text-accent" />

                    </a>

                  ))}


              </div>
              )}
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
                    <span className="font-bold text-primary">{tender.closing_date || "غير محدد"}</span>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center text-accent">
                    <Clock size={20} />
                  </div>
                  <div>
                    <span className="block text-[10px] text-text-secondary uppercase font-black">الوقت المتبقي</span>
                    <span className="font-bold text-primary">{calculateRemainingTime(tender.closing_date)}</span>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center text-accent">
                    <Building2 size={20} />
                  </div>
                  <div>
                    <span className="block text-[10px] text-text-secondary uppercase font-black">الجهة المعلنة</span>
                    <span className="font-bold text-primary">{tender.location || "غير محدد"} </span>
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
