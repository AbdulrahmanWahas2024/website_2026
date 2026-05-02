'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation'; // استيراد useParams للوصول إلى معرف المشروع من الرابط
import Header from '@/components/layout/Header'; // استيراد الهيدر
import Footer from '@/components/layout/Footer'; // استيراد الفوتر
import { Container } from '@/components/ui/Container';  // استيراد الحاوية لتنسيق المحتوى
import { BackButton } from '@/components/ui/BackButton';//  استيراد زر العودة للتنقل السلس
import { useLanguage } from '@/context/LanguageContext'; // استيراد السياق الخاص باللغة لترجمة النصوص
import { motion, AnimatePresence } from 'motion/react'; // استيراد مكتبة الحركة لتأثيرات الدخول والخروج
import { MapPin, Calendar, CheckCircle2, Trophy } from 'lucide-react'; // استيراد الأيقونات المستخدمة في عرض تفاصيل المشروع
import Image from 'next/image'; // استيراد مكون الصورة من Next.js لتحسين الأداء والتعامل مع الصور بشكل أفضل
import Link from "next/link"; // استيراد مكون الرابط من Next.js للتنقل بين الصفحات
import { API_CONFIG } from '@/lib/api-config'; // استيراد تكوينات API للوصول إلى البيانات من ERPNex
import {
  getMediaUrl,
  normalizeGallery
} from "@/lib/media"; // استيراد دوال معالجة الوسائط لتحويل روابط الصور إلى روابط كاملة والتعامل مع المعرض  

export default function ProjectDetailsPage() { // مكون صفحة تفاصيل المشروع

  const { id } = useParams(); // الحصول على معرف المشروع من الرابط لاستخدامه في جلب بيانات المشروع المحدد
  const { t } = useLanguage(); // الحصول على دالة الترجمة من سياق اللغة لاستخدامها في ترجمة النصوص في الصفحة

  const [project, setProject] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState(0);


  /* ==============================
     جلب المشروع من ERPNext
  ============================== */

  useEffect(() => {

    const fetchProject = async () => {

      try {

        setLoading(true);

        const fields = encodeURIComponent(JSON.stringify([ // تحديد الحقول المطلوبة فقط لتحسين الأداء
          "name",
          "title",
          "category",
          "status",
          "date",
          "image",
          "description",
          "content",
          "completion_percentage",
          "start_date",
          "gallery_images",
          "contractor"
        ]));

        const url =
          `${API_CONFIG.BASE_URL}/api/resource/YPC Project/${id}` + // جلب مشروع محدد بناءً على المعرف
          `?fields=${fields}`; // تحديد الحقول المطلوبة فقط لتحسين الأداء

        console.log("PROJECT DETAIL URL:", url); // تسجيل URL للتحقق من صحته قبل الجلب

        const res = await fetch(url); // جلب بيانات المشروع من API

        if (!res.ok) {  // التحقق من نجاح الاستجابة والتعامل مع الأخطاء بشكل مناسب
          throw new Error("API Error " + res.status); // التعامل مع الأخطاء في حالة فشل الجلب
        }

        const result = await res.json(); // تحويل الاستجابة إلى JSON

        console.log("PROJECT DETAIL RESULT:", result);// تسجيل النتيجة للتحقق من البيانات المستلمة

        setProject(result.data); // تخزين بيانات المشروع في الحالة لعرضها في الواجهة
      }

      catch (err) {

        console.error("PROJECT DETAIL ERROR:", err); // تسجيل الخطأ في حالة فشل جلب البيانات

      }

      finally {

        setLoading(false); // إيقاف حالة التحميل بعد الانتهاء من المحاولة سواء نجحت أو فشلت

      }

    };

    if (id) fetchProject(); // جلب المشروع فقط إذا كان هناك معرف صالح في الرابط

  }, [id]);

  if (loading)
    return <div className="min-h-screen bg-bg-main" />;

  if (!project)
    return (
      <div className="min-h-screen flex items-center justify-center">
        لا يوجد مشاريع حالياً
      </div>
    );

  /* ==============================
     Gallery من ERPNext
  ============================== */

  const gallery = [
    project.image
      ? {
        type: "image",
        url: getMediaUrl(project.image),
      }
      : null,

    ...normalizeGallery(project.gallery_images || []),
  ].filter((item): item is { type: string; url: string } => !!item);
  const activeItem = gallery[activeImage] ?? null;
  return (
 
    <main className="bg-bg-main min-h-screen">   

      <Header />

      {/* ================= HERO ================= */}

      {/* <section className="relative pt-32 pb-20 bg-primary-dark overflow-hidden"> */}
      {/* <section className="relative h-[60vh] md:h-[80vh] flex items-center bg-primary-dark overflow-hidden"> */}
<section className="
  relative 
  h-[55vh] sm:h-[60vh] md:h-[70vh] lg:h-[75vh] xl:h-[80vh]
  flex items-center 
  overflow-hidden 
  bg-primary-dark
">
        <div className="absolute inset-0 opacity-80">
          <h1 className="
  text-2xl 
  sm:text-3xl 
  md:text-5xl 
  lg:text-6xl 
  xl:text-7xl
  font-black 
  text-white 
  leading-tight
"></h1>

          <Image
            src={getMediaUrl(project.image)}
            alt={project.title || "عنوان مشروع"}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover transition-transform duration-1000 group-hover:scale-110"
            referrerPolicy="no-referrer"
          />
          <div className="
  max-w-2xl 
  md:max-w-3xl 
  lg:max-w-4xl 
  xl:max-w-5xl
"></div>
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/80 via-primary-dark/40 to-transparent" />
          </div>
        </div>

        <Container className="relative z-10  md:text-right">

          {/* <BackButton className="text-white/60 hover:text-white" /> */}

          <div className="max-w-4xl">
            

            <motion.div // شارة الإنجاز مع تأثير دخول جذاب
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-3 mb-6"
            >

              <Trophy className="text-accent" size={32} />

              <span className="text-accent font-black uppercase tracking-widest text-sm bg-white/10 px-3 py-1 rounded-full backdrop-blur-sm">
                إنجاز وطني استراتيجي
              </span>

            </motion.div>
            
            {/* عنوان المشروع */}

            <motion.h1 // عنوان المشروع مع تأثير دخول جميل
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-3xl md:text-5xl font-black text-white mb-8 leading-tight"
            >

              {project.title}

            </motion.h1>

            {/* معلومات المشروع */}

            <div className="flex flex-wrap gap-8 text-white/90">

              <div className="flex items-center gap-2 bg-white/5 px-3 py-1 rounded-xl backdrop-blur-sm">
                <MapPin size={20} className="text-accent" />
                <span className="font-bold text-white drop-shadow-sm">
                  المنطقة : اليمن - صنعاء
                </span>
              </div>

              <div className="flex items-center gap-2 bg-white/5 px-3 py-1 rounded-xl backdrop-blur-sm">
                <Calendar size={20} className="text-accent" />
                <span className="font-bold text-white drop-shadow-sm">
                  {project.start_date || "2024"}
                </span>
              </div>

              <div className="flex items-center gap-2 bg-white/5 px-3 py-1 rounded-xl backdrop-blur-sm">
                <CheckCircle2 size={20} className="text-accent" />
                <span className="font-bold text-white drop-shadow-sm">
                  {project.status || "قيد التنفيذ"}
                </span>
              </div>

            </div>

          </div>

        </Container>

      </section>

      {/* ================= CONTENT ================= */}

      <Container className="py-20">

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">

          {/* LEFT */}

          <div className="lg:col-span-2 space-y-12">

            {/* ================= وصف المشروع ================= */}
            <div className="flex justify-end mb-4">
              {/* <BackButton /> */}
              <BackButton className="bg-white shadow-md px-4 py-2 rounded-xl hover:scale-105 transition" />
            </div>
            <section>

              {/* ✅ صندوق شفاف جميل */}

              <div className="bg-white/60 backdrop-blur-md border border-border rounded-3xl p-10 shadow-xl">

                {/* عنوان */}

                <h2 className="text-2xl font-black text-primary mb-6">
                  {project.title}
                </h2>

                {/* وصف */}

                <p className="text-text-secondary text-lg leading-relaxed mb-8">

                  {project.description}

                </p>

                {/* محتوى المشروع */}


                <div
                  className="
    max-w-none
    text-text-secondary
    leading-relaxed
    text-right
    text-base

    [&_p]:mb-4
    [&_p]:text-base

    [&_ul]:mb-4
    [&_li]:mb-2
    [&_li]:text-base

    [&_h1]:text-xl
    [&_h2]:text-lg
    [&_h3]:text-base

    [&_strong]:text-primary
  "
                  style={{
                    background: "transparent",
                  }}
                  dangerouslySetInnerHTML={{
                    __html: project.content || ""
                  }}
                />

              </div>

            </section>

            {/* ================= معرض الصور ================= */}

            <section>

              <h2 className="text-3xl font-black text-primary mb-8">
                معرض صورالمشاريع
              </h2>

              <div className="space-y-6">

                <div className="relative aspect-video rounded-[40px] overflow-hidden shadow-2xl group bg-black">

                  <AnimatePresence mode="wait">

                    <motion.div
                      key={activeImage}
                      initial={{ opacity: 0, scale: 1.1 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.8 }}
                      className="absolute inset-0"
                    >
                     
                      {activeItem?.url && (
                        activeItem.type === "video" ? (

                          <video
                            src={activeItem.url}
                            controls
                            playsInline
                            preload="metadata"
                            className="w-full h-full object-contain"
                          />

                        ) : activeItem.type === "pdf" ? (

                          <iframe
                            src={activeItem.url}
                            className="w-full h-full"
                          />

                        ) : activeItem.type === "youtube" ? (

                          <iframe
                            src={activeItem.url
                              .replace("watch?v=", "embed/")
                              .replace("youtu.be/", "youtube.com/embed/")
                            }
                            className="w-full h-full"
                            allowFullScreen
                          />

                        ) : (

                          <Image
                            src={activeItem.url}
                            alt="Project"
                            fill
                            className="object-contain"
                            unoptimized
                          />

                        )
                      )}

                    </motion.div>

                  </AnimatePresence>

                </div>

                {/* thumbnails */}

                <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">

                 
                    

                      {gallery.map((item, idx) => (
                        <button
                          key={idx}
                          onClick={() => setActiveImage(idx)}
                          className={`relative w-24 h-16 md:w-32 md:h-20 rounded-2xl overflow-hidden border-2 transition-all shrink-0 ${activeImage === idx
                              ? 'border-accent scale-105 shadow-lg'
                              : 'border-border opacity-50 hover:opacity-100'
                            }`}
                        >

                          {item?.type === "video" ? ( // عرض الفيديو في thumbnail باستخدام عنصر video مع التحكم في التشغيل عند المرور بالماوس

                            <video
                              src={item.url}
                              muted
                              playsInline
                              preload="metadata"
                              className="w-full h-full object-cover"
                              onMouseEnter={(e) => e.currentTarget.play()}
                              onMouseLeave={(e) => {
                                e.currentTarget.pause();
                                e.currentTarget.currentTime = 0;
                              }}
                            />

                          ) : item?.type === "pdf" ? (

                            <div className="flex items-center justify-center w-full h-full bg-black text-white text-xs">
                              PDF
                            </div>

                          ) : (

                            <Image // عرض الصورة في thumbnail باستخدام مكون Image من Next.js لتحسين الأداء 
                              src={item?.url}
                              alt="thumb"
                              fill
                              className="object-cover"
                              unoptimized
                            />

                          )}

                        </button>
                      ))}

                    

                

                </div>

              </div>

            </section>

          </div>

          {/* RIGHT SIDEBAR */}

          <div className="space-y-8">

            {/* تفاصيل فنية */}

            <div className="bg-white p-8 rounded-3xl border border-border shadow-sm">

              <h3 className="text-xl font-black text-primary mb-6 pb-4 border-b border-border">
                تفاصيل فنية
              </h3>

              <ul className="space-y-4">

                <li className="flex justify-between items-center">
                  <span className="text-text-secondary">
                    الجهة المنفذة
                  </span>

                  <span className="font-bold text-primary">
                    {project.contractor || "غير محدد"}
                  </span>
                </li>

                <li className="flex justify-between items-center">
                  <span className="text-text-secondary">
                    نسبة الإنجاز
                  </span>

                  <span className="font-bold text-emerald-600">
                    {project.completion_percentage || 0}%
                  </span>
                </li>

              </ul>

            </div>

            {/* لم يتم حذف هذا الجزء */}

            <div className="bg-primary p-8 rounded-3xl text-white">

              <h3 className="text-xl font-black mb-4">
                هل لديك استفسار؟
              </h3>

              <p className="text-white/70 text-sm mb-6">
                يمكنكم التواصل مع قسم المشاريع للحصول على مزيد من المعلومات حول هذا المشروع.
              </p>
              <Link href="/contact">
                <button className="btn-gov w-full bg-accent text-primary-dark">
                  تواصل معنا الآن
                </button>
              </Link>

            </div>

          </div>

        </div>

      </Container>

      <Footer />

    </main>

  );

}