'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { useLanguage } from '@/context/LanguageContext';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, ExternalLink } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { API_CONFIG } from '@/lib/api-config';
import { Skeleton } from '@/components/ui/Skeleton';

export default function ProjectsGrid() {

  const { t } = useLanguage();

  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // ✅ جلب المشاريع من ERPNext
  useEffect(() => {

    const fetchProjects = async () => {

      try {

        setLoading(true);

        const fields = encodeURIComponent(JSON.stringify([
          "name",
          "title",
          "image",
          "description",
          "published",
          "creation"
        ]));

        const filters = encodeURIComponent(JSON.stringify([
          ["published", "=", 1]
        ]));

        // ترتيب حسب الأحدث
        const url =
          `${API_CONFIG.BASE_URL}/api/resource/YPC Project` +
          `?fields=${fields}` +
          `&filters=${filters}` +
          `&order_by=creation desc` + // ترتيب المشاريع حسب تاريخ الإنشاء من الأحدث إلى الأقدم
          `&limit_page_length=3`; // جلب 3 مشاريع فقط لعرضها في الصفحة الرئيسية
        console.log("HOME PROJECTS URL:", url);

        const res = await fetch(url);

        const result = await res.json();

        console.log("HOME PROJECTS RESPONSE:", result);

        // ✅ عرض أحدث  مشاريع بناءً على تاريخ الإنشاء مع التعامل مع حالة عدم وجود بيانات
        setProjects(result.data || []);

      }

      catch (err) {

        console.error("HOME PROJECTS ERROR:", err);

      }

      finally {

        setLoading(false);

      }

    };

    fetchProjects();

  }, []);

  // دالة معالجة الصور من ERPNext
  const getImageUrl = (img?: string) => {

    if (!img) return "/placeholder.jpg";

    // إذا الصورة Private
    if (img.includes("/private/")) {

      console.warn(
        "⚠ صورة Private لا يمكن عرضها — يرجى جعلها Public في ERPNext"
      );

      return "/placeholder.jpg";
    }

    // إذا الرابط كامل
    if (img.startsWith("http")) return img;

    // إذا الرابط نسبي من ERP
    return `${API_CONFIG.BASE_URL}${img}`;

  };
  return (

    <section className="py-24 bg-bg-soft relative overflow-hidden">

      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-primary/5 -skew-x-12 translate-x-1/2 pointer-events-none" />

      <Container>

        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">

          <div className="max-w-2xl">

            <div className="flex items-center gap-2 mb-4">

              <div className="w-10 h-0.5 bg-accent" />

              <span className="text-accent text-[10px] font-black uppercase tracking-[0.2em]">
                {t('home.projects_title')}
              </span>

            </div>

            <h2 className="text-[clamp(1.5rem,4vw,2.5rem)] font-black text-primary leading-tight">
              {t('home.projects_title')}
            </h2>

          </div>

          <Link href="/projects">

            <Button variant="outline" size="sm">

              {t('common.view_all')}

              <ArrowRight size={16} className="rtl:rotate-180" />

            </Button>

          </Link>

        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">

          {loading ? (

            Array.from({ length: 3 }).map((_, idx) => (

              <Skeleton
                key={idx}
                className="h-[400px] md:h-[500px] w-full rounded-[32px] bg-primary/5"
              />

            ))

          ) : (

            projects.map((project, idx) => (

              <motion.div
                key={project.name}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="group relative h-[400px] md:h-[500px] rounded-[32px] overflow-hidden shadow-2xl shadow-primary/10"
              >

                {/* ✅ صورة المشروع */}

                {/* معالجة الصور Private */}

                <Image
                  src={getImageUrl(project.image)}
                  alt={project.title || "صورة مشروع"}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-750 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary-dark via-primary-dark/40 to-transparent opacity-90 group-hover:opacity-100 transition-opacity" />
                <div className="absolute inset-0 p-10 flex flex-col justify-end">

                  <div className="space-y-4 transform translate-y-8 group-hover:translate-y-0 transition-transform duration-500">

                    <span className="inline-block px-3 py-1 rounded-lg 
                    bg-primary/70 
                    text-white 
                    text-[9px] 
                    font-black 
                    uppercase 
                    tracking-widest 
                    backdrop-blur-md 
                    border border-white/20">

                      {project.category || "مشروع استراتيجي"}

                    </span>

                    <h3 className="text-2xl font-black text-white leading-tight">
                      {project.title}
                    </h3>

                    <p className="text-white/60 text-sm leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                      {project.description}
                    </p>

                    <div className="pt-4">

                      {/* ✅ رابط التفاصيل */}

                      <Link href={`/projects/${project.name}`}>

                        <Button
                          size="sm"
                          className="bg-white text-primary hover:bg-accent hover:text-primary-dark"
                        >

                          تفاصيل المشروع

                          <ExternalLink size={16} />

                        </Button>

                      </Link>

                    </div>

                  </div>

                </div>

              </motion.div>

            ))

          )}

        </div>

      </Container>

    </section>

  );

}