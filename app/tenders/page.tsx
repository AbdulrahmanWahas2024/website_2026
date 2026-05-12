'use client';

import React, { useState, useEffect } from 'react';
import { PageHero } from '@/components/ui/PageHero';
import { Container } from '@/components/ui/Container';
import { useLanguage } from '@/context/LanguageContext';
import { motion } from 'motion/react';
import { FileText, Download, Search, Filter, Calendar, Info } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { fetchTenders } from "@/lib/services/tender.service";
const Skeleton = ({ className }: { className?: string }) => (
  <div className={`animate-pulse bg-gray-200 rounded ${className}`} />
);
import { apiService } from '@/lib/api-service';
import { API_CONFIG } from '@/lib/api-config';

import { BackButton } from '@/components/ui/BackButton';
import { cn } from '@/lib/utils';

export default function TendersPage() {
  const { t } = useLanguage();
  const [tenders, setTenders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('الكل');

  const filters = ['الكل', 'مفتوحة', 'مغلقة', 'جديدة'];
  const years = ['2024', '2023', '2022'];

  // useEffect(() => {
  //   const fetchTenders = async () => {
  //     try {
  //       setLoading(true);
  //       const data = await apiService.get<any>(API_CONFIG.DOC_TYPES.TENDERS);
  //       console.log("TENDERS API RESPONSE:", data);
  //       setTenders(data);
  //     } catch (err) {
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  //   fetchTenders();
  // }, []);
    useEffect(() => {
      const fetchTenders = async () => {
        try {
          setLoading(true);
  
          const fields = encodeURIComponent(JSON.stringify([
            "name",
            "title",
            "status",
            "start_date",
            "closing_date",
            "location",
            "description",
            "file",
            "published",
            "creation"
          ]));
  
          const filters = encodeURIComponent(JSON.stringify([
            ["published", "=", 1]
          ]));
  
          const url =
            `${API_CONFIG.BASE_URL}/api/resource/YPC Tenders` +
            `?fields=${fields}` +
            `&filters=${filters}` +
            `&order_by=creation desc`;
  
          const res = await fetch(url);
          const result = await res.json();
  
          setTenders(result.data || []);
  
        } catch (err) {
          console.error("TENDERS ERROR:", err);
        } finally {
          setLoading(false);
        }
      };
  
      fetchTenders();
    }, []);

  const filteredTenders = tenders.filter(tender => {
    const matchesSearch = tender.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          tender.id.toString().includes(searchQuery);
    const matchesFilter = activeFilter === 'الكل' || tender.status === activeFilter;
    return matchesSearch && matchesFilter;
  });

  return (
    <main className="bg-bg-main min-h-screen">
      <PageHero 
        title={t('nav.tenders')} 
        subtitle="الفرص الاستثمارية والمناقصات العامة لشركة النفط الوطنية"
      />
      
      <Container className="py-16">
        <BackButton />

        <div className="flex flex-col lg:flex-row gap-6 mb-12 mt-8">
          <div className="relative flex-1">
            <Search className="absolute right-6 top-1/2 -translate-y-1/2 text-text-secondary/40" size={20} />
            <input 
              type="text" 
              placeholder="ابحث عن مناقصة بالاسم أو الرقم..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white border border-border rounded-2xl pr-14 pl-6 py-4 focus:outline-none focus:border-primary transition-all shadow-sm"
            />
          </div>
          <div className="flex gap-3 overflow-x-auto pb-2 lg:pb-0">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className={cn(
                  "px-6 py-3 rounded-xl font-bold text-sm transition-all whitespace-nowrap",
                  activeFilter === f 
                    ? "bg-primary text-white shadow-md" 
                    : "bg-white text-text-secondary border border-border hover:border-primary"
                )}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-3xl border border-border overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-right">
              <thead>
                <tr className="bg-primary text-white">
                  <th className="px-8 py-5 font-black text-xs uppercase tracking-widest">رقم المناقصة</th>
                  <th className="px-8 py-5 font-black text-xs uppercase tracking-widest">اسم المناقصة</th>
                  <th className="px-8 py-5 font-black text-xs uppercase tracking-widest">تاريخ الإغلاق</th>
                  <th className="px-8 py-5 font-black text-xs uppercase tracking-widest">الحالة</th>
                  <th className="px-8 py-5 font-black text-xs uppercase tracking-widest text-center">الإجراءات</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {loading ? (
                  Array.from({ length: 5 }).map((_, idx) => (
                    <tr key={idx}>
                      <td colSpan={5} className="px-8 py-6">
                        <Skeleton className="h-12 w-full rounded-lg" />
                      </td>
                    </tr>
                  ))
                ) : filteredTenders.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-8 py-20 text-center text-text-secondary font-bold">
                      لا توجد مناقصات تطابق بحثك
                    </td>
                  </tr>
                ) : (
                  filteredTenders.map((tender, idx) => (
                    <motion.tr 
                      key={tender.name}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      className="hover:bg-bg-soft transition-colors group"
                    >
                      <td className="px-8 py-6 font-bold text-primary">{tender?.name}</td>
                      <td className="px-8 py-6">
                        <div className="flex flex-col">
                          <span className="font-black text-primary group-hover:text-accent transition-colors">{tender.title}</span>
                          <span className="text-[10px] text-text-secondary/60 mt-1">قسم المشتريات المركزية</span>
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <div className="flex items-center gap-2 text-text-primary text-sm font-bold">
                          <Calendar size={14} className="text-accent" />
                          {tender.closing_date}
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <span className={cn(
                          "inline-flex items-center px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest",
                          tender?.status === 'مفتوحة' ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-700"
                        )}>
                          {tender?.status}
                        </span>
                      </td>
                      <td className="px-8 py-6">
                        <div className="flex items-center justify-center gap-3">
                          <Link 
                            href={`/tenders/${tender?.name}`}
                            className="inline-flex items-center justify-center p-2.5 rounded-xl border border-border hover:border-primary text-text-secondary hover:text-primary transition-all"
                            title="تفاصيل"
                          >
                            <Info size={18} />
                          </Link>
                          <Link 
                            href={`/tenders/${tender?.name}/apply`}
                            className="inline-flex items-center justify-center gap-2 px-6 py-2 text-xs font-bold transition-all active:scale-95 btn-gov rounded-xl"
                          >
                            {t('common.apply')}
                          </Link>
                        </div>
                      </td>
                    </motion.tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-12 p-8 rounded-3xl bg-accent/5 border border-accent/20 flex items-start gap-6">
          <div className="w-12 h-12 rounded-2xl bg-accent flex items-center justify-center text-primary-dark shrink-0 shadow-sm">
            <Info size={24} />
          </div>
          <div className="space-y-2">
            <h4 className="font-black text-primary">تعليمات هامة للمتقدمين</h4>
            <p className="text-sm text-text-secondary leading-relaxed">
              يرجى التأكد من تحميل كافة الوثائق المطلوبة والالتزام بالمواعيد المحددة للإغلاق. لن يتم قبول أي طلبات بعد الموعد النهائي. للمساعدة الفنية، يرجى التواصل مع قسم تقنية المعلومات.
            </p>
          </div>
        </div>
      </Container>
    </main>
  );
}
