'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Calendar, Tag } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { API_CONFIG } from '@/lib/api-config';
import { Skeleton } from '@/components/ui/Skeleton';

export default function NewsSection() {
  const { t } = useLanguage();
  const [news, setNews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  /* useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);

        const fields = encodeURIComponent(JSON.stringify([
          "name",
          "title",
          "category",
          "date",
          "image"
        ]));

        const url =
          `${API_CONFIG.BASE_URL}/api/resource/${API_CONFIG.DOC_TYPES.NEWS}` +
          `?fields=${fields}` +
          `&order_by=date desc` +
          `&limit_page_length=3`;

        console.log("API URL:", url);

        const response = await fetch(url, {
          method: "GET",
          cache: "no-store"
        });

        const result = await response.json();

        console.log("API RESULT:", result);

        const rawData = result.data || [];

        console.log("RAW DATA:", rawData);

        const formattedData = rawData.map((item: any) => ({
          name: item.name,
          title: item.title,
          category: item.category || "أخبار",
          date: item.date,
          image: item.image
            ? `${API_CONFIG.BASE_URL}${item.image}`
            : "/placeholder-news.jpg",
          summary: item.title
        }));

        setNews(formattedData);

      } catch (error) {
        console.error("Fetch News Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []); */
  useEffect(() => { // جلب الأخبار مع تحسينات في التعامل مع البيانات والتنسيق
    const fetchNews = async () => {
      try {

        setLoading(true);

        const fields = encodeURIComponent(JSON.stringify([
          "name",
          "title",
          "category",
          "date",
          "image",
          "published"
        ]));

        const filters = encodeURIComponent(JSON.stringify([
          ["published", "=", 1]
        ]));

        const url = // بناء URL مع الحقول والفلاتر المطلوبة
          `${API_CONFIG.BASE_URL}/api/resource/${API_CONFIG.DOC_TYPES.NEWS}` +
          `?fields=${fields}` +
          `&filters=${filters}` +
          `&order_by=date desc` +
          `&limit_page_length=3`;

        console.log("HOME NEWS URL:", url);// تسجيل URL للتحقق من صحته

        /* const response = await fetch(url); */
        const response = await fetch(url, {
          cache: "no-store"
        });
        const result = await response.json();

        console.log("HOME NEWS:", result); // تسجيل النتيجة للتحقق من البيانات المستلمة

        const rawData = result.data || []; // التعامل مع حالة عدم وجود بيانات

        const formattedData = rawData.map((item: any) => ({ // تنسيق البيانات بشكل مناسب مع التعامل مع الحقول الناقصة
          name: item.name,
          title: item.title,
          category: item.category,
          date: item.date,
          image: item.image
            ? `${API_CONFIG.BASE_URL}${item.image}`
            : "/placeholder-news.jpg",
          summary: item.title // 
        }));

        setNews(formattedData);

      } catch (error) {

        console.error("Home News Error:", error);

      } finally {

        setLoading(false);

      }
    };

    fetchNews();

  }, []);
  return (
    <section className="py-24 bg-white">
      <Container>

        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">

          <div className="max-w-2xl">

            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-0.5 bg-accent" />
              <span className="text-accent text-[10px] font-black uppercase tracking-[0.2em]">
                {t('home.news_title')}
              </span>
            </div>

            <h2 className="text-[clamp(1.5rem,4vw,2.5rem)] font-black text-primary leading-tight">
              {t('home.news_title')}
            </h2>

          </div>

          <Link href="/news">

            <Button variant="outline" size="sm">

              {t('common.view_all')}

              <ArrowRight size={16} className="rtl:rotate-180" />

            </Button>

          </Link>

        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">

          {loading ? (

            Array.from({ length: 3 }).map((_, idx) => (

              <div key={idx} className="space-y-6">

                <Skeleton className="h-[200px] md:h-[280px] w-full rounded-2xl bg-primary/5" />

                <Skeleton className="h-6 w-3/4 bg-primary/5" />

                <Skeleton className="h-4 w-full bg-primary/5" />

              </div>

            ))

          ) : (

            news.map((item, idx) => (

              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="group"
              >

                <Link
                  href={`/news/${item.name}`}
                  className="block space-y-4 md:space-y-6"
                >

                  <div className="relative h-[200px] md:h-[280px] w-full overflow-hidden rounded-2xl shadow-lg bg-gray-100">

                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                      unoptimized
                    />

                    <div className="absolute top-4 left-4">

                      <span className="px-3 py-1 rounded-lg bg-accent text-primary-dark text-[9px] font-black uppercase tracking-widest">

                        {item.category}

                      </span>

                    </div>

                  </div>

                  <div className="space-y-4">

                    <div className="flex items-center gap-4 text-text-secondary/60 text-[10px] font-bold uppercase tracking-widest">

                      <div className="flex items-center gap-1.5">

                        <Calendar size={14} className="text-accent" />

                        <span>{item.date}</span>

                      </div>

                      <div className="w-1 h-1 rounded-full bg-border" />

                      <div className="flex items-center gap-1.5">

                        <Tag size={14} className="text-accent" />

                        <span>{item.category}</span>

                      </div>

                    </div>

                    <h3 className="text-xl font-black text-primary leading-tight group-hover:text-accent transition-colors line-clamp-2">

                      {item.title}

                    </h3>

                    <p className="text-text-secondary text-sm leading-relaxed line-clamp-3 opacity-70">

                      {item.summary}

                    </p>

                    <div className="pt-4 flex items-center gap-2 text-primary font-black text-xs uppercase tracking-widest group-hover:gap-4 transition-all">

                      {t('common.read_more')}

                      <ArrowRight size={16} className="rtl:rotate-180 text-accent" />

                    </div>

                  </div>

                </Link>

              </motion.div>

            ))

          )}

        </div>

      </Container>
    </section>
  );
}