'use client';

import React from 'react';
import { Container } from './Container';
import Image from 'next/image';
import { motion } from 'motion/react';

interface PageHeroProps {
  title: string;
  subtitle?: string;
  image?: string;
}

export const PageHero = ({ title, subtitle, image = 'https://picsum.photos/seed/oil/1920/600' }: PageHeroProps) => {
  return (
    <section className="relative h-[320px] md:h-[420px] lg:h-[480px] max-h-[500px] w-full overflow-hidden bg-primary-dark">
      <div className="relative h-full w-full overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/60" />
        <Image 
          src={image} 
          alt={title} 
          fill 
          priority
          sizes="100vw"
          className="object-cover object-center scale-105"
          referrerPolicy="no-referrer"
        />
        {/* Subtle overlay for text readability */}
        <div className="absolute inset-0 bg-primary-dark/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/60 via-transparent to-transparent" />
      </div>
      
      <div className="absolute inset-0 flex items-center">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl"
          >
            <div className="w-8 md:w-12 h-0.5 md:h-1 bg-accent mb-4 md:mb-6" />
            <h1 className="text-2xl md:text-4xl lg:text-5xl font-black text-white mb-2 md:mb-4 tracking-tight drop-shadow-lg">
              {title}
            </h1>
            {subtitle && (
              <p className="text-sm md:text-lg text-white/80 font-medium drop-shadow-md">
                {subtitle}
              </p>
            )}
          </motion.div>
        </Container>
      </div>
    </section>
  );
};
