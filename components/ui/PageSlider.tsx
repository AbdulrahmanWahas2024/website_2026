'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Container } from './Container';
import { ChevronRight, ChevronLeft } from 'lucide-react';

interface Slide {
  image: string;
  title: string;
  subtitle?: string;
}

interface PageSliderProps {
  slides: Slide[];
  effect?: 'smooth' | '3d'; // Kept for compatibility, but ignored
}

export const PageSlider = ({ slides }: PageSliderProps) => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const next = () => setCurrent((prev) => (prev + 1) % slides.length);
  const prev = () => setCurrent((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <section className="relative h-[35vh] md:h-[45vh] lg:h-[55vh] max-h-[600px] w-full overflow-hidden bg-primary-dark">
      <div className="absolute inset-0">
        <div className="relative h-full w-full overflow-hidden">
          <Image
            src={slides[current].image}
            alt={slides[current].title}
            fill
            sizes="100vw"
            className="object-cover object-center transition-all duration-1000 scale-105"
            priority
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-primary-dark/30" />
          <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/60 via-transparent to-transparent" />
        </div>

        <div className="absolute inset-0 flex items-center">
          <Container>
            <div className="max-w-2xl animate-in fade-in slide-in-from-bottom-4 duration-700">
              <div className="w-8 md:w-12 h-0.5 md:h-1 bg-accent mb-4 md:mb-6" />
              <h1 className="text-2xl md:text-4xl lg:text-5xl font-black text-white mb-2 md:mb-4 tracking-tight drop-shadow-lg">
                {slides[current].title}
              </h1>
              {slides[current].subtitle && (
                <p className="text-sm md:text-lg text-white/80 font-medium drop-shadow-md">
                  {slides[current].subtitle}
                </p>
              )}
            </div>
          </Container>
        </div>
      </div>

      {slides.length > 1 && (
        <div className="absolute bottom-4 md:bottom-8 left-0 right-0 z-20">
          <Container className="flex justify-center gap-3 md:gap-4">
            <button 
              onClick={prev} 
              className="w-8 h-8 md:w-10 md:h-10 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-primary-dark transition-all active:scale-90"
            >
              <ChevronLeft size={16} className="rtl:rotate-180" />
            </button>
            <div className="flex items-center gap-1.5 md:gap-2">
              {slides.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrent(idx)}
                  className={`h-1 md:h-1.5 transition-all rounded-full ${current === idx ? 'w-6 md:w-8 bg-accent' : 'w-1.5 md:w-2 bg-white/20'}`}
                />
              ))}
            </div>
            <button 
              onClick={next} 
              className="w-8 h-8 md:w-10 md:h-10 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-primary-dark transition-all active:scale-90"
            >
              <ChevronRight size={16} className="rtl:rotate-180" />
            </button>
          </Container>
        </div>
      )}
    </section>
  );
};
