'use client';

import React, { useState, useEffect } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { PageHero } from '@/components/ui/PageHero';
import { Container } from '@/components/ui/Container';
import { useLanguage } from '@/context/LanguageContext';
import { motion, AnimatePresence } from 'motion/react';
import { Calendar, Tag, ArrowRight, Search, Share2, Facebook, Twitter, MessageCircle, Linkedin, ChevronRight, ChevronLeft, Mail, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import Image from 'next/image';
import Link from 'next/link';
import { apiService } from '@/lib/api-service';
import { API_CONFIG } from '@/lib/api-config';
import { Skeleton } from '@/components/ui/Skeleton';
import { cn } from '@/lib/utils';

import { BackButton } from '@/components/ui/BackButton';

export default function NewsPage() {
  const { t } = useLanguage();
  const [news, setNews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('الكل');
  const [currentPage, setCurrentPage] = useState(1);
  const [showShareSuccess, setShowShareSuccess] = useState(false);

  /* const categories = ['الكل', 'أخبار الشركة', 'الفعاليات', 'التعاميم']; */
  const categories = [  // فلترة الاخبار حسب الفئات الموجودة في النظام erpnext
    'الكل',
    ...Array.from(
      new Set(news.map(n => n.category).filter(Boolean))
    )
  ];
  /* const archiveYears = ['2024', '2023', '2022', '2021']; */
  // ارشفت الاخبار حسب السنوات الموجودة في النظام erpnext
  const archiveYears = Object.entries(
    news.reduce((acc: any, item: any) => {

      const year = new Date(item.date).getFullYear();

      if (!acc[year]) acc[year] = 0;

      acc[year]++;

      return acc;

    }, {})
  );

  useEffect(() => {
    const fetchNews = async () => {

      try {

        setLoading(true);

        const fields = encodeURIComponent(JSON.stringify([
          "name",
          "title",
          "category",
          "date",
          "image",
          "description",
          "published"
        ]));

        const filters = encodeURIComponent(JSON.stringify([
          ["published", "=", 1]
        ]));

        const url =
          `${API_CONFIG.BASE_URL}/api/resource/${API_CONFIG.DOC_TYPES.NEWS}` +
          `?fields=${fields}` +
          `&filters=${filters}` +
          `&order_by=date desc`;

        console.log("ALL NEWS URL:", url);

        const response = await fetch(url);

        const result = await response.json();

        console.log("ALL NEWS:", result);

        setNews(result.data || []);

      } catch (error) {

        console.error("All News Error:", error);

      } finally {

        setLoading(false);

      }

    };
    fetchNews();
  }, []);

  const filteredNews = news.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === 'الكل' || item.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const handleShare = () => {
    setShowShareSuccess(true);
    setTimeout(() => setShowShareSuccess(false), 3000);
  };

  return (
    <main className="bg-bg-main min-h-screen">
      <Header />

      {/* Animated Hero Section */}
      <section className="relative h-[400px] flex items-center overflow-hidden bg-primary-dark">
        <div className="absolute inset-0">
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
              rotate: [0, 1, 0]
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 opacity-30"
          >
            <Image
              src="https://picsum.photos/seed/oilnews/1920/1080"
              alt="News Hero"
              fill
              className="object-cover"
            />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-l from-primary-dark via-primary-dark/80 to-transparent" />
        </div>

        <Container className="relative z-10">
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            className="max-w-2xl"
          >
            <h1 className="text-5xl font-black text-white mb-6 leading-tight">
              {t('nav.news')}
            </h1>
            <p className="text-white/70 text-xl leading-relaxed">
              ابقَ على اطلاع دائم بآخر التطورات والفعاليات في شركة النفط الوطنية
            </p>
          </motion.div>
        </Container>
      </section>

      <Container className="py-16">
        <BackButton />

        <div className="flex flex-col lg:flex-row gap-12 mt-8">
          {/* Main Content */}
          <div className="flex-1 space-y-8">
            {/* Live Search & Filter */}
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-white p-4 rounded-2xl border border-border">
              <div className="relative w-full md:w-96">
                <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-text-secondary/40" size={18} />
                <input
                  type="text"
                  placeholder={t('common.search')}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-bg-soft border border-border rounded-xl pr-12 pl-4 py-3 focus:outline-none focus:border-primary transition-all text-sm"
                />
              </div>
              <div className="flex gap-2 w-full md:w-auto overflow-x-auto pb-2 md:pb-0">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={cn(
                      "px-4 py-2 rounded-lg text-xs font-bold whitespace-nowrap transition-all",
                      activeCategory === cat
                        ? "bg-primary text-white"
                        : "bg-bg-soft text-text-secondary hover:bg-border"
                    )}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* News Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {loading ? (
                Array.from({ length: 4 }).map((_, idx) => (
                  <Skeleton key={idx} className="h-[350px] w-full rounded-2xl" />
                ))
              ) : (
                filteredNews.map((item, idx) => (
                  <motion.article
                    key={item.name}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    className="group bg-white rounded-2xl overflow-hidden border border-border hover:border-accent transition-all hover:shadow-lg"
                  >
                    <div className="relative h-48 overflow-hidden bg-gray-100">
                      {item.image ? (

                        item.image.includes("/private/") ? (

                          // 🔒 صورة Private
                          <div className="flex flex-col items-center justify-center h-full text-red-500 text-sm font-bold text-center p-4">
                            🔒 الصورة محمية
                            <span className="text-xs text-gray-500 mt-2">
                              يرجى إزالة Private من ERPNext
                            </span>
                          </div>

                        ) : (

                          <Image
                            src={
                              item.image.startsWith("http")
                                ? item.image
                                : `${API_CONFIG.BASE_URL}${item.image}`
                            }
                            alt={item.title || "news image"}
                            fill
                            sizes="(max-width: 768px) 100vw, 33vw"
                            className="object-cover"
                            referrerPolicy="no-referrer"
                          />

                        )
                      ) : (
                        // 📦 لا توجد صورة
                        <div className="flex items-center justify-center h-full text-gray-400 text-sm">
                          لا توجد صورة
                        </div>
                      )
                      }

                      <div className="absolute top-3 right-3 px-2 py-1 rounded bg-primary/90 text-white text-[8px] font-black uppercase tracking-widest">
                        {item.category}
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="flex items-center gap-2 text-text-secondary/60 text-[10px] mb-3">
                        <Calendar size={12} />
                        {item.date}
                      </div>
                      <h2 className="text-lg font-black text-primary mb-3 group-hover:text-accent transition-colors line-clamp-2 leading-snug">
                        {item.title}
                      </h2>
                      <p className="text-text-secondary text-xs leading-relaxed mb-6 line-clamp-2">
                        {item.description || 'تفاصيل الخبر تظهر هنا بشكل مختصر وواضح للقارئ...'}
                      </p>

                      <div className="flex items-center justify-between pt-4 border-t border-border">
                        <Link href={`/news/${item.name}`} className="text-accent font-bold text-xs flex items-center gap-1 hover:gap-2 transition-all">
                          {t('common.read_more')}
                          <ArrowRight size={14} className="rtl:rotate-180" />
                        </Link>

                        <div className="flex items-center gap-2">
                          <button onClick={handleShare} className="p-2 rounded-full hover:bg-bg-soft text-text-secondary transition-colors" title="Share on Facebook">
                            <Facebook size={14} />
                          </button>
                          <button onClick={handleShare} className="p-2 rounded-full hover:bg-bg-soft text-text-secondary transition-colors" title="Share on X">
                            <Twitter size={14} />
                          </button>
                          <button onClick={handleShare} className="p-2 rounded-full hover:bg-bg-soft text-text-secondary transition-colors" title="Share on WhatsApp">
                            <MessageCircle size={14} />
                          </button>
                          <button onClick={handleShare} className="p-2 rounded-full hover:bg-bg-soft text-text-secondary transition-colors" title="Share on LinkedIn">
                            <Linkedin size={14} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.article>
                ))
              )}
            </div>

            {/* Pagination Slider */}
            <div className="flex items-center justify-center gap-4 pt-8">
              <button className="p-3 rounded-xl border border-border hover:bg-white hover:border-primary transition-all text-text-secondary disabled:opacity-30" disabled>
                <ChevronRight size={20} />
              </button>
              <div className="flex gap-2">
                {[1, 2, 3].map((p) => (
                  <button
                    key={p}
                    onClick={() => setCurrentPage(p)}
                    className={cn(
                      "w-10 h-10 rounded-xl font-bold transition-all",
                      currentPage === p ? "bg-primary text-white shadow-md" : "bg-white border border-border text-text-secondary hover:border-primary"
                    )}
                  >
                    {p}
                  </button>
                ))}
              </div>
              <button className="p-3 rounded-xl border border-border hover:bg-white hover:border-primary transition-all text-text-secondary">
                <ChevronLeft size={20} />
              </button>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="lg:w-80 space-y-8">
            {/* Archive Section */}
            <div className="bg-white p-6 rounded-2xl border border-border shadow-sm">
              <h3 className="text-lg font-black text-primary mb-6 flex items-center gap-2">
                <Calendar size={18} className="text-accent" />
                الأرشيف السنوي
              </h3>
              <div className="space-y-2">
                {
                  archiveYears.map(([year, count]) => (
                    <button
                      key={year}
                      className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-bg-soft text-text-secondary font-bold transition-all group"
                    >
                      <span>أخبار عام {year}</span>
                      <span className="text-[10px] bg-border px-2 py-0.5 rounded-full group-hover:bg-primary group-hover:text-white">{String(count)}</span>
                    </button>
                  ))
                }
              </div>
            </div>

            {/* Newsletter */}
            <div className="bg-primary p-6 rounded-2xl text-white">
              <h3 className="text-lg font-black mb-4">النشرة البريدية</h3>
              <p className="text-white/70 text-xs mb-6 leading-relaxed">
                اشترك في نشرتنا البريدية لتصلك آخر أخبار الشركة والفعاليات مباشرة إلى بريدك الإلكتروني.
              </p>
              <div className="space-y-3">
                <input
                  type="email"
                  placeholder="بريدك الإلكتروني"
                  className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-accent transition-all placeholder:text-white/40"
                />
                <button className="btn-gov w-full bg-accent text-primary-dark border-none">
                  اشتراك
                </button>
              </div>
            </div>
          </aside>
        </div>
      </Container>

      {/* Share Success Toast */}
      <AnimatePresence>
        {showShareSuccess && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 bg-emerald-600 text-white px-8 py-4 rounded-2xl shadow-2xl font-bold flex items-center gap-3"
          >
            <CheckCircle2 size={20} />
            {t('common.share_success')}
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </main>
  );
}
