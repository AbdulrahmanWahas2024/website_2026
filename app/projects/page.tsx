'use client';

import React, { useState, useEffect } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { PageHero } from '@/components/ui/PageHero';
import { Container } from '@/components/ui/Container';
import { useLanguage } from '@/context/LanguageContext';
import { motion } from 'motion/react';
import { ExternalLink, MapPin, Calendar } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { API_CONFIG } from '@/lib/api-config';
import { Skeleton } from '@/components/ui/Skeleton';
import { cn } from '@/lib/utils';
import { BackButton } from '@/components/ui/BackButton';
import { getMediaUrl } from "@/lib/media";
import {
  getImageUrl,
  normalizeGalleryImages
} from "@/lib/image";

export default function ProjectsPage() {
  const { t } = useLanguage();

  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('الكل');

  // 🔥 Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const categories = [
    'الكل',
    'إنشاء المحطات',
    'خزانات استراتيجية',
    'منشآت نفطية',
    'توسعة أسطول النقل'
  ];

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);

        const fields = encodeURIComponent(JSON.stringify([
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
          "published"
        ]));

        const filters = encodeURIComponent(JSON.stringify([
          ["published", "=", 1]
        ]));

        const url =
          `${API_CONFIG.BASE_URL}/api/resource/YPC Project` +
          `?fields=${fields}` +
          `&filters=${filters}` +
          `&order_by=creation desc`;

        const res = await fetch(url);
        const result = await res.json();

        setProjects(result.data || []);

      } catch (err) {
        console.error("PROJECTS ERROR:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  //  فلترة التصنيف
  const filteredProjects =
    activeCategory === 'الكل'
      ? projects
      : projects.filter((p) =>
        (p.category || '').trim() === activeCategory.trim()
      );

  // Pagination حسابات
  const totalPages = Math.ceil(filteredProjects.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentProjects = filteredProjects.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const changePage = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // دالة معالجة الصور من ERPNext
  // const getImageUrl = (img?: string) => {

  //   if (!img) return "/placeholder.jpg";

  //   // إذا الصورة Private
  //   if (img.includes("/private/")) {

  //     console.warn(
  //       "⚠ صورة Private لا يمكن عرضها — يرجى جعلها Public في ERPNext"
  //     );

  //     return "/placeholder.jpg";
  //   }

  //   // إذا الرابط كامل
  //   if (img.startsWith("http")) return img;

  //   // إذا الرابط نسبي من ERP
  //   return `${API_CONFIG.BASE_URL}${img}`;

  // };
  
  return (
    <main className="bg-bg-main min-h-screen">
      <Header />

      <PageHero
        title={t('nav.projects')}
        subtitle="مشاريعنا الاستراتيجية لتطوير البنية التحتية لقطاع الطاقة"
      />

      <Container className="py-16">
        <BackButton />

        {/* Categories */}
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setActiveCategory(cat);
                setCurrentPage(1);
              }}
              className={cn(
                "px-6 py-3 rounded-xl font-bold transition-all text-sm",
                activeCategory === cat
                  ? "bg-primary text-white shadow-lg"
                  : "bg-white text-text-secondary border border-border hover:border-primary"
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

          {loading ? (
            Array.from({ length: 6 }).map((_, idx) => (
              <Skeleton key={idx} className="h-[450px] w-full rounded-3xl" />
            ))
          ) : currentProjects.length === 0 ? (
            <div className="col-span-full text-center text-gray-500">
              لا توجد مشاريع حالياً
            </div>
          ) : (
            currentProjects.map((project, idx) => (
              <motion.div
                key={project.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="
                  group bg-white rounded-3xl overflow-hidden
                  border border-border
                  hover:border-orange-500
                  hover:shadow-2xl
                  transition-all duration-300
                "
              >
                {/* Image */}
                <div className="relative h-[250px] overflow-hidden">
                  
                  <Image
                    src={getMediaUrl(project.image)}
                    alt={project.title || "صورة مشروع"}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-1000 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />

                  <div className="absolute top-4 right-4 px-3 py-1.5 rounded-lg bg-white/90 text-primary text-[10px] font-black">
                    {project.category || 'بنية تحتية'}
                  </div>
                </div>

                {/* Content */}
                <div className="p-8 space-y-4">

                  <div className="flex items-center gap-4 text-[10px] font-black text-text-secondary/60 uppercase">
                    <div className="flex items-center gap-1.5">
                      <MapPin size={12} className="text-accent" />
                      {project.location || 'اليمن'}
                    </div>

                    <div className="w-1 h-1 rounded-full bg-border" />

                    <div className="flex items-center gap-1.5">
                      <Calendar size={12} className="text-accent" />
                      {project.start_date || '2024'}
                    </div>
                  </div>

                  {/*  عنوان يتغير لونه عند hover */}
                  <h3 className="
                    text-xl font-black line-clamp-1
                    text-primary
                    group-hover:text-orange-500
                    transition-colors
                  ">
                    {project.title}
                  </h3>

                  <p className="text-text-secondary text-sm line-clamp-2">
                    {project.description}
                  </p>

                  <Link href={`/projects/${project.name}`}>
                    <button className="btn-gov w-full">
                      {t('common.details')}
                      <ExternalLink size={16} />
                    </button>
                  </Link>
                </div>
              </motion.div>
            ))
          )}
        </div>

        {/* Pagination */}
        {!loading && totalPages > 1 && (
          <div className="flex justify-center gap-2 mt-12 flex-wrap">
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                onClick={() => changePage(i + 1)}
                className={cn(
                  "px-4 py-2 rounded-lg border font-bold transition-all",
                  currentPage === i + 1
                    ? "bg-primary text-white"
                    : "bg-white text-text-secondary hover:border-primary"
                )}
              >
                {i + 1}
              </button>
            ))}
          </div>
        )}
      </Container>

      <Footer />
    </main>
  );
}