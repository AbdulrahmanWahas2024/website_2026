'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';
import { PageHero } from '@/components/ui/PageHero';
import { Container } from '@/components/ui/Container';
import { motion, AnimatePresence } from 'motion/react';
import { Calendar, Facebook, Twitter, MessageCircle, ArrowRight, Home, ChevronLeft, ChevronRight, Image as ImageIcon } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Toast } from '@/components/ui/Toast';
import { apiService } from '@/lib/api-service';
import { API_CONFIG } from '@/lib/api-config';
import { Skeleton } from '@/components/ui/Skeleton';
import DOMPurify from 'dompurify';
import Image from 'next/image';
import { getImageUrl } from "@/lib/image-utils";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";


export default function NewsDetailsPage() {
  const { slug } = useParams();
  const router = useRouter();
  const { t, dir } = useLanguage();
  const [news, setNews] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [showToast, setShowToast] = useState(false);
  const [activeImage, setActiveImage] = useState(0);
  const [galleryImages, setGalleryImages] = useState<string[]>([]);

  /* const galleryImages = [
    'https://picsum.photos/seed/news1/800/600',
    'https://picsum.photos/seed/news2/800/600',
    'https://picsum.photos/seed/news3/800/600',
    'https://picsum.photos/seed/news4/800/600',
  ]; */

  /*  useEffect(() => {
 
     const fetchNewsDetails = async () => {
       try {
         setLoading(true);
         const fields = encodeURIComponent(JSON.stringify([
           "name",
           "title",
           "category",
           "date",
           "image",
           "content",
           "published"
         ]));
 
         const filters = encodeURIComponent(JSON.stringify([
           ["published", "=", 1],
           ["name", "=", slug]
         ]));
 
         const url =
           `${API_CONFIG.BASE_URL}/api/resource/${API_CONFIG.DOC_TYPES.NEWS}` +
           `?fields=${fields}` +
           `&filters=${filters}`;
 
         console.log("DETAIL URL:", url);
 
         const response = await fetch(url);
 
         const result = await response.json();
 
         console.log("DETAIL RESULT:", result);
 
         const item = result.data?.[0];
 
         if (item) {
 
           setNews({
             id: item.name,
             title: item.title,
             date: item.date,
             category: item.category,
 
             image: item.image
               ? (item.image.startsWith('http')
                 ? item.image
                 : `${API_CONFIG.BASE_URL}${item.image}`)
               : "/placeholder-news.jpg",
 
             content: item.content || item.description
           });
 
         } else {
           setNews(null);
         }
 
       } catch (err) {
 
         console.error("DETAIL ERROR:", err);
 
       } finally {
 
         setLoading(false);
       }
 
     };
 
     if (slug) {
       fetchNewsDetails();
     }
 
   }, [slug]); */
  useEffect(() => {
    const fetchNewsDetails = async () => {

      try {

        setLoading(true);

        const fields = encodeURIComponent(JSON.stringify([
          "name",
          "title",
          "category",
          "date",
          "image",
          "content",
          "description",
          "gallery_images"
        ]));

        const url =
          `${API_CONFIG.BASE_URL}/api/resource/${API_CONFIG.DOC_TYPES.NEWS}/${slug}` +
          `?fields=${fields}`;

        console.log("DETAIL URL:", url);

        const response = await fetch(url);

        const result = await response.json();

        console.log("DETAIL RESULT:", result);

        // const item = Array.isArray(result.data)
        //   ? result.data[0]
        //   : result.data || result.message;
        const item = result.data;

        console.log("ITEM:", item);
        console.log("GALLERY RAW:", item.gallery_images);

        if (item) {

          // تجهيز صور المعرض

          // const galleryImages = (item.gallery_images || [])
          //   .map((img: any) => {
          //     if (!img.image) return null;

          //     return img.image.startsWith("http")
          //       ? img.image
          //       : `${API_CONFIG.BASE_URL}${img.image}`;
          //   })
          const galleryImages = (item.gallery_images || [])
            .map((img: any) => getImageUrl(img.image))
            .filter(Boolean);

          console.log("galleryImages FINAL:", galleryImages);

          setGalleryImages(galleryImages);

          setNews({

            id: item.name,
            title: item.title,
            date: item.date,
            category: item.category,
            // image: item.image
            //   ? `${API_CONFIG.BASE_URL}${item.image}`
            //   : "/news-placeholder.jpg",
            image: getImageUrl(item.image),

            // تأكد من جلب content أو description أيهما يحتوي على النص
            content: item.content || "",
            description: item.description || ""
          });

        }

      } catch (err) {

        console.error("DETAIL ERROR:", err);

      } finally {

        setLoading(false);

      }

    };

    /* const fetchNewsDetails = async () => {

      try {

        setLoading(true);

        const fields = encodeURIComponent(JSON.stringify([
          "name",
          "title",
          "category",
          "date",
          "image",
          "content",
          "description",
          "gallery_images"
        ]));

        const filters = encodeURIComponent(JSON.stringify([
          ["name", "=", slug]
        ]));

        const url =
          `${API_CONFIG.BASE_URL}/api/resource/${API_CONFIG.DOC_TYPES.NEWS}` +
          `?fields=${fields}` +
          `&filters=${filters}`;

        console.log("DETAIL URL:", url);

        const response = await fetch(url);

        const result = await response.json();

        console.log("DETAIL RESULT:", result);

        const item = result.data?.[0];

        if (item) {

          setNews({
            id: item.name,
            title: item.title,
            date: item.date,
            category: item.category,

            image: item.image
              ? `${API_CONFIG.BASE_URL}${item.image}`
              : "/news-placeholder.jpg",

            content: item.content || item.description
          });

        } else {

          setNews(null);

        }

      } catch (err) {

        console.error("DETAIL ERROR:", err);

      } finally {

        setLoading(false);

      }

    }; */

    if (slug) {
      fetchNewsDetails();
    }

  }, [slug]);
  const handleShare = () => {
    setShowToast(true);
  };
  const shareUrl =
    typeof window !== "undefined"
      ? window.location.href
      : "";
  const shareText = news?.title || "";
  const shareLinks = {
    facebook:
      `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`,

    twitter:
      `https://twitter.com/intent/tweet?url=${shareUrl}&text=${shareText}`,

    whatsapp:
      `https://wa.me/?text=${shareText} ${shareUrl}`,

    linkedin:
      `https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`
  };


  if (loading) {
    return (
      <main className="min-h-screen bg-bg-main pb-20">
        <Skeleton className="h-[40vh] w-full" />
        <Container className="mt-12">
          <Skeleton className="h-12 w-3/4 mb-8" />
          <Skeleton className="h-4 w-1/4 mb-12" />
          <div className="space-y-4">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
          </div>
        </Container>
      </main>
    );
  }

  if (!news) return <div className="min-h-screen flex items-center justify-center">News not found</div>;

  return (
    <main className="min-h-screen bg-bg-main pb-20"> 
      <PageHero
        title={news.title}
        image={news.image}
      />

      <Container className="mt-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto"
        >
         
          {/* Meta Info */}
          <div className="flex flex-wrap items-center justify-between gap-6 mb-12 pb-8 border-b border-border">

            {/* معلومات الخبر */}
            <div className="flex items-center gap-6 flex-wrap">

              <div className="flex items-center gap-2 text-text-secondary font-semibold text-sm">
                <Calendar size={18} className="text-primary" />
                <span>{news.date}</span>
              </div>

              <div className="bg-primary/10 text-primary text-xs font-black px-4 py-1.5 rounded-full uppercase tracking-widest">
                {news.category}
              </div>

            </div>

            {/* مشاركة */}
            <div className="flex items-center gap-3">
              <span className="text-text-secondary font-semibold text-sm">
                مشاركة
              </span>
              <button
                onClick={() => window.open(shareLinks.facebook, '_blank')}
                aria-label="Share on Facebook"
                className="w-10 h-10 rounded-xl bg-white border border-border flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all shadow-sm"
              >
                <Facebook size={18} />
              </button>

              <button
                onClick={() => window.open(shareLinks.twitter, '_blank')}
                aria-label="Share on Twitter"
                className="w-10 h-10 rounded-xl bg-white border border-border flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all shadow-sm"
              >
                <Twitter size={18} />
              </button>

              <button
                onClick={() => window.open(shareLinks.whatsapp, '_blank')}
                aria-label="Share on WhatsApp"
                className="w-10 h-10 rounded-xl bg-white border border-border flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all shadow-sm"
              >
                <MessageCircle size={18} />
              </button>

            </div>
          </div>
          
      
          {/* Content Area */}
          <div className="prose prose-lg md:prose-xl max-w-none text-text-primary leading-loose mb-16 bg-white p-8 md:p-12 rounded-[32px] shadow-sm border border-border">

            {/* تفاصيل الخبر */}
            {news.description && (
              <div
                className="text-xl font-black text-primary mb-1"
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(news.description)
                }}
              />
            )}

            {/* محتوى الخبر */}
            {news.content && (
              <div
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(news.content)
                }}
              />
            )}

          </div> 
          {/* Gallery Section */}
          <div className="mb-20 bg-bg-soft p-8 md:p-12 rounded-[40px] border border-border">
            <div className="flex items-center gap-3 mb-8">
              <ImageIcon className="text-accent" size={24} />
              <h3 className="text-2xl font-black text-primary">معرض الصور</h3>
            </div>

            <div className="relative aspect-video rounded-[24px] overflow-hidden bg-black border border-border mb-6 shadow-xl">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeImage}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0"
                > 
                  <Image
                    src={
                      galleryImages.length > 0
                        ? galleryImages[activeImage]
                        : "/news-placeholder.jpg"
                    }
                    alt="Gallery"
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-contain"
                    referrerPolicy="no-referrer"
                    unoptimized
                  />
                </motion.div>
              </AnimatePresence>

              <div className="absolute inset-0 flex items-center justify-between px-4 pointer-events-none">
                <button
                  onClick={() => galleryImages.length > 0 && setActiveImage((prev) => (prev - 1 + galleryImages.length) % galleryImages.length)}
                  className="w-10 h-10 rounded-full bg-white/90 shadow-lg flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all pointer-events-auto"
                >
                  <ChevronLeft size={20} className="rtl:rotate-180" />
                </button>
                <button
                  onClick={() => galleryImages.length > 0 && setActiveImage((prev) => (prev + 1) % galleryImages.length)}
                  className="w-10 h-10 rounded-full bg-white/90 shadow-lg flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all pointer-events-auto"
                >
                  <ChevronRight size={20} className="rtl:rotate-180" />
                </button>
              </div>
            </div>

            <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
              {galleryImages.length > 0 ? (  

                galleryImages.map((img, idx) => ( 
                  <button
                    key={idx}
                    onClick={() => setActiveImage(idx)}// تحديث الصورة النشطة عند النقر على الصورة المصغرة
                    className={`relative w-20 h-20 rounded-xl overflow-hidden border-2 transition-all shrink-0 ${activeImage === idx
                      ? 'border-accent scale-105 shadow-md'
                      : 'border-transparent opacity-50 hover:opacity-100'
                      }`}
                  >
                    <Image
                      src={img}
                      alt={`Thumb ${idx}`}
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  </button>
                ))

              ) : (

                <p className="text-gray-400">
                  لا توجد صور للخبر
                </p>

              )}
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-wrap gap-6 pt-12 border-t border-border">
            <Button
              size="lg"
              className="rounded-2xl px-10 py-7 gap-3"
              onClick={() => router.push('/')}
            >
              <Home size={20} />
              العودة للرئيسية
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="rounded-2xl px-10 py-7 gap-3 border-border"
              onClick={() => router.push('/news')}
            >
              <ArrowRight size={20} className="rtl:rotate-180" />
              كل الأخبار
            </Button>
          </div>
        </motion.div>
      </Container>

      <Toast
        message="تم نشر الخبر بنجاح"
        isVisible={showToast}
        onClose={() => setShowToast(false)}
      />
    </main>
  );
}
