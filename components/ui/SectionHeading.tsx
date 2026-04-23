'use client';

import React from 'react';
import { motion } from 'motion/react';
import { cn } from '@/lib/utils';

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
  light?: boolean;
  className?: string;
}

export const SectionHeading = ({ 
  title, 
  subtitle, 
  centered = false, 
  light = false,
  className 
}: SectionHeadingProps) => {
  return (
    <div className={cn(
      'mb-8 md:mb-10',
      centered ? 'text-center' : 'text-start',
      className
    )}>
      {subtitle && (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className={cn(
            'font-black uppercase tracking-[0.2em] mb-2 flex items-center gap-2 text-[9px]',
            centered ? 'justify-center' : 'justify-start',
            'text-primary'
          )}
        >
          {!centered && <div className="w-6 h-[2px] bg-current" />}
          {subtitle}
          {centered && <div className="w-6 h-[2px] bg-current" />}
        </motion.div>
      )}
      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className={cn(
          'text-xl md:text-3xl font-black leading-tight',
          light ? 'text-white' : 'text-text-primary'
        )}
      >
        {title}
      </motion.h2>
      {centered && (
        <motion.div 
          initial={{ width: 0 }}
          whileInView={{ width: 60 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="h-1 bg-primary mx-auto rounded-full mt-3 shadow-sm"
        />
      )}
    </div>
  );
};
