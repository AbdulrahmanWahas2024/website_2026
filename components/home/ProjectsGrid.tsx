'use client';

import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, ExternalLink } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { apiService } from '@/lib/api-service';
import { API_CONFIG } from '@/lib/api-config';
import { Skeleton } from '@/components/ui/Skeleton';

export default function ProjectsGrid() {
  const { t } = useLanguage();
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const data = await apiService.get<any>(API_CONFIG.DOC_TYPES.PROJECTS);
        setProjects(data.slice(0, 3));
      } catch (err) {
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  return (
    <section className="section-padding bg-bg-soft relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-primary/5 -skew-x-12 translate-x-1/2 pointer-events-none" />

      <Container>
        <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-6">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-10 h-0.5 bg-accent" />
              <span className="text-accent text-[9px] font-black uppercase tracking-[0.2em]">{t('home.projects_title')}</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-black text-primary leading-tight">
              {t('home.projects_title')}
            </h2>
          </div>
          <Link 
            href="/projects"
            className="inline-flex items-center justify-center gap-2 px-4 py-2 text-xs font-bold transition-all active:scale-95 disabled:opacity-50 disabled:pointer-events-none rounded-lg border border-border hover:bg-bg-soft"
          >
            {t('common.view_all')}
            <ArrowRight size={14} className="rtl:rotate-180" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {loading ? (
            Array.from({ length: 3 }).map((_, idx) => (
              <Skeleton key={idx} className="aspect-[3/4] md:aspect-[4/5] w-full rounded-2xl bg-primary/5" />
            ))
          ) : (
            projects.map((project, idx) => (
              <div
                key={project.id}
                className="group relative aspect-[3/4] md:aspect-[4/5] rounded-2xl overflow-hidden shadow-lg"
              >
                <Image 
                  src={project.image} 
                  alt={project.title} 
                  fill 
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-1000 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary-dark via-primary-dark/40 to-transparent opacity-80 group-hover:opacity-95 transition-opacity" />
                
                <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-end">
                  <div className="space-y-3 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <span className="inline-block px-2 py-0.5 rounded-md bg-accent/20 text-accent text-[8px] font-black uppercase tracking-widest backdrop-blur-sm border border-accent/30">
                      مشروع استراتيجي
                    </span>
                    <h3 className="text-xl font-black text-white leading-tight">
                      {project.title}
                    </h3>
                    <p className="text-white/70 text-xs leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 line-clamp-2">
                      {project.description}
                    </p>
                    <div className="pt-2">
                      <Link 
                        href={`/projects/${project.id}`}
                        className="inline-flex items-center justify-center gap-2 px-4 py-2 text-xs font-bold transition-all active:scale-95 disabled:opacity-50 disabled:pointer-events-none rounded-lg bg-white text-primary hover:bg-accent hover:text-primary-dark"
                      >
                        تفاصيل المشروع
                        <ExternalLink size={14} />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </Container>
    </section>
  );
}
