'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { cn } from '@/lib/utils';

interface BackButtonProps {
  className?: string;
  variant?: 'default' | 'home';
}

export const BackButton = ({ className, variant = 'default' }: BackButtonProps) => {
  const router = useRouter();
  const { t, dir } = useLanguage();

  const handleBack = () => {
    if (variant === 'home') {
      router.push('/');
    } else {
      router.back();
    }
  };

  return (
    <div className="flex justify-end w-full">
      <button
        onClick={handleBack}
        className={cn(
          "flex items-center gap-2 text-text-secondary hover:text-primary transition-colors font-bold text-sm mb-8 group",
          className
        )}
      >
        {dir === 'rtl' ? (
          <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
        ) : (
          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
        )}
        <span>{variant === 'home' ? t('common.back_home') : t('common.back')}</span>
      </button>
    </div>
  );
};
