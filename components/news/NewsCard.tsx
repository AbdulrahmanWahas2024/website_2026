'use client';

import React from 'react';
import { motion } from 'motion/react';
import Image from 'next/image';
import { Calendar, Share2, Facebook, Twitter, MessageCircle, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';

interface NewsCardProps {
  id: string | number;
  title: string;
  date: string;
  category: string;
  image: string;
  onShare: () => void;
}

export function NewsCard({ id, title, date, category, image, onShare }: NewsCardProps) {
  const { t } = useLanguage();

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group glass-card rounded-[40px] overflow-hidden border border-white/5 shadow-xl hover:shadow-2xl transition-all duration-500"
    >
      <div className="relative h-[288px] overflow-hidden rounded-xl">
        <Image 
          src={image} 
          alt={title} 
          fill 
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover transition-transform duration-700 group-hover:scale-125"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-dark/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        {/* Category Badge */}
        <div className="absolute top-6 left-6 bg-primary text-white text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-full shadow-lg z-10">
          {category}
        </div>

        {/* Share Icons Aligned Bottom-Left */}
        <div className="absolute bottom-6 left-6 flex gap-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
          <button onClick={(e) => { e.preventDefault(); onShare(); }} className="w-8 h-8 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-primary transition-all">
            <Facebook size={14} />
          </button>
          <button onClick={(e) => { e.preventDefault(); onShare(); }} className="w-8 h-8 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-primary transition-all">
            <Twitter size={14} />
          </button>
          <button onClick={(e) => { e.preventDefault(); onShare(); }} className="w-8 h-8 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-primary transition-all">
            <MessageCircle size={14} />
          </button>
        </div>
      </div>
      
      <div className="p-8">
        <div className="flex items-center gap-3 text-white/40 text-xs font-bold uppercase tracking-widest mb-4">
          <Calendar size={14} className="text-primary" />
          {date}
        </div>
        
        <h3 className="text-2xl font-black text-white mb-8 group-hover:text-primary transition-colors line-clamp-2 leading-tight min-h-[4rem]">
          {title}
        </h3>
        
        <Link href={`/news/${id}`} className="flex items-center justify-between w-full group/btn">
          <span className="text-white/60 font-black text-sm border-b-2 border-primary/30 group-hover/btn:border-primary transition-all pb-1">
            {t('common.read_more')}
          </span>
          <div className="w-10 h-10 bg-white/5 border border-white/5 rounded-xl flex items-center justify-center text-primary group-hover/btn:bg-primary group-hover/btn:text-white transition-all">
            <ArrowRight size={18} className="rtl:rotate-180" />
          </div>
        </Link>
      </div>
    </motion.div>
  );
}
