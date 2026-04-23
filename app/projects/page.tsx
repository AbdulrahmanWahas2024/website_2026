'use client';

import React, { useState, useEffect } from 'react';
import { PageHero } from '@/components/ui/PageHero';
import { Container } from '@/components/ui/Container';
import { useLanguage } from '@/context/LanguageContext';
import { motion } from 'motion/react';
import { ExternalLink, MapPin, Calendar, Layers } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import Image from 'next/image';
import Link from 'next/link';
import { apiService } from '@/lib/api-service';
import { API_CONFIG } from '@/lib/api-config';
import { Skeleton } from '@/components/ui/Skeleton';
import { cn } from '@/lib/utils';

import { BackButton } from '@/components/ui/BackButton';

export default function ProjectsPage() {
  const { t } = useLanguage();
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('الكل');

  const categories = ['الكل', 'إنشاء المحطات', 'خزانات استراتيجية', 'منشآت نفطية', 'توسعة أسطول النقل'];

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const data = await apiService.get<any>(API_CONFIG.DOC_TYPES.PROJECTS);
        setProjects(data);
      } catch (err) {
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  const filteredProjects = activeCategory === 'الكل' 
    ? projects 
    : projects.filter(p => p.category === activeCategory);

  return (
    <main className="bg-bg-main min-h-screen">
      <PageHero 
        title={t('nav.projects')} 
        subtitle="مشاريعنا الاستراتيجية لتطوير البنية التحتية لقطاع الطاقة"
      />
      
      <Container className="py-16">
        <BackButton />

        {/* Categories Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {loading ? (
            Array.from({ length: 6 }).map((_, idx) => (
              <Skeleton key={idx} className="h-[450px] w-full rounded-3xl" />
            ))
          ) : (
            filteredProjects.map((project, idx) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="group bg-white rounded-3xl overflow-hidden border border-border hover:border-accent transition-all hover:shadow-xl"
              >
                <div className="relative h-[250px] overflow-hidden">
                  <Image 
                    src={project.image} 
                    alt={project.title} 
                    fill 
                    className="object-cover transition-transform duration-1000 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-4 right-4 px-3 py-1.5 rounded-lg bg-white/90 backdrop-blur-md text-primary text-[9px] font-black uppercase tracking-widest shadow-sm">
                    {project.category || 'بنية تحتية'}
                  </div>
                </div>
                
                <div className="p-8 space-y-4">
                  <div className="flex items-center gap-4 text-[9px] font-black text-text-secondary/60 uppercase tracking-widest">
                    <div className="flex items-center gap-1.5">
                      <MapPin size={12} className="text-accent" />
                      المنطقة الوسطى
                    </div>
                    <div className="w-1 h-1 rounded-full bg-border" />
                    <div className="flex items-center gap-1.5">
                      <Calendar size={12} className="text-accent" />
                      2024 - 2026
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-black text-primary leading-tight group-hover:text-accent transition-colors line-clamp-1">
                    {project.title}
                  </h3>
                  
                  <p className="text-text-secondary text-sm leading-relaxed line-clamp-2">
                    {project.description}
                  </p>
                  
                  <div className="pt-4">
                    <Link 
                      href={`/projects/${project.id}`}
                      className="inline-flex items-center justify-center gap-2 px-6 py-3 font-bold transition-all active:scale-95 btn-gov w-full rounded-xl"
                    >
                      {t('common.details')}
                      <ExternalLink size={16} />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </Container>
    </main>
  );
}
