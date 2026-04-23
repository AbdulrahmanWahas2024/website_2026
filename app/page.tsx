'use client';

import React from 'react';
import HeroSlider from '@/components/home/HeroSlider';
import CEOMessage from '@/components/home/CEOMessage';
import FuelPrices from '@/components/home/FuelPrices';
import ServicesSection from '@/components/home/ServicesSection';
import StatsSection from '@/components/home/StatsSection';
import ProjectsGrid from '@/components/home/ProjectsGrid';
import TendersSection from '@/components/home/TendersSection';
import NewsSection from '@/components/home/NewsSection';

export default function Home() {
  return (
    <main className="relative">
      <HeroSlider />
      <CEOMessage />
      <FuelPrices />
      <ServicesSection />
      <StatsSection />
      <NewsSection />
      <ProjectsGrid />
      <TendersSection />
    </main>
  );
}
