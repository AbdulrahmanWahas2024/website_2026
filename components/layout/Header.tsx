'use client';

import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';
import {
  Search,
  Globe,
  Menu,
  X,
  ChevronDown,
  Phone,
  Mail,
  MapPin,
  ArrowRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import ThemeSwitcher from '@/components/ThemeSwitcher';
import NextImage from 'next/image';
import Image from 'next/image';

export default function Header() {
  const { language, setLanguage, t, dir } = useLanguage();
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);// Track which dropdown is open
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  // Get current page title for mobile center
  const getCurrentPageTitle = () => {
    if (pathname === '/') return '';
    const item = navItems.find(i => i.href === pathname);
    if (item) return item.label;
    // Check children
    for (const navItem of navItems) {
      if (navItem.children) {
        const child = navItem.children.find(c => c.href === pathname);
        if (child) return child.label;
      }
    }
    return '';
  };

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'home', label: t('nav.home'), href: '/' },
    {
      id: 'company',
      label: t('nav.company'),
      children: [
        { label: t('nav.about'), href: '/company' },
        { label: t('nav.ceo_message'), href: '/ceo-message' },
        { label: t('nav.branches'), href: '/branches' },
        { label: t('nav.strategic_plan'), href: '/strategy' },
      ]
    },
    {
      id: 'services',
      label: t('nav.services'), //
      children: [
        { label: t('nav.procedures_guide'), href: '/services/procedures-guide' },
        { label: t('nav.user_guide'), href: '/services/user-guide' },
        { label: t('nav.transaction_inquiry'), href: '/services/inquiry' },
        { label: t('nav.fuel_license'), href: '/services/fuel-license' }, 
      ]
    },
    { id: 'projects', label: t('nav.projects'), href: '/projects' },
    { id: 'news', label: t('nav.news'), href: '/news' },
    { id: 'tenders', label: t('nav.tenders'), href: '/tenders' },
    { id: 'complaints', label: t('nav.complaints'), href: '/complaints' },
    { id: 'contact', label: t('nav.contact'), href: '/contact' },
  ];

  return (
    <header
      className={cn(
        "fixed top-0 w-full z-[9999] transition-all duration-300",
        isScrolled
          ? "bg-bg-card shadow-md py-2"
          : "bg-bg-card py-4"
      )}
    >
      <Container className="flex items-center justify-between h-20 lg:h-24 gap-4">
        {/* Logo (Right side in RTL) */}
        <Link href="/" className="flex items-center gap-2 sm:gap-3 group shrink-0">
          {/* <div className="relative w-10 h-10 sm:w-12 sm:h-12 bg-primary rounded-xl flex items-center justify-center text-white font-black text-xl sm:text-2xl shadow-sm group-hover:scale-105 transition-transform">
            <span>O</span>
          </div> */} 
          <div className="relative w-13 h-13 sm:w-13 sm:h-13"> 
            
            <Image
              src="/log_ypc.svg"
              alt="Site Logo"
              fill
             // className="object-contain"
              className="object-contain hover:scale-105 transition-transform duration-500"
              priority
            />
          </div>
          <div className="flex flex-col">
            <span className="font-black text-lg sm:text-xl leading-tight text-text-primary tracking-tight">YPC</span>
            <span className="text-[12px] sm:text-[12px] uppercase tracking-widest text-text-secondary font-bold">شركة النفط اليمنية</span>
          </div>
        </Link>

        {/* Optional Page Title (Center - Mobile only) */}
        <div className="lg:hidden flex-grow text-center overflow-hidden">
          <span className="text-sm font-black text-primary truncate block px-2">
            {getCurrentPageTitle()}
          </span>
        </div>

        {/* Desktop Navigation (Center) */}
        <nav className="hidden lg:flex items-center gap-1 mx-6">
          {navItems.map((item) => (
            <div
              key={item.id}
              className="relative group/nav"
              onMouseEnter={() => setActiveDropdown(item.id)}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <Link
                href={item.href || '#'}
                className={cn(
                  "flex items-center gap-1.5 text - base lg:text-lg font-bold transition-all px-4 py-2 rounded-lg relative overflow-hidden group",
                  activeDropdown === item.id
                    ? "text-primary bg-primary/5"
                    : "text-text-primary hover:bg-primary/10 hover:text-primary"
                )}
              >
                {item.label}
                {item.children && (
                  <ChevronDown
                    size={14}
                    className={cn(
                      "transition-transform duration-300 opacity-50",
                      activeDropdown === item.id && "rotate-180 opacity-100"
                    )}
                  />
                )}
              </Link>

              {/* Standard Dropdown */}
              {item.children && (
                <AnimatePresence>
                  {activeDropdown === item.id && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 5, scale: 0.98 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full right-0 min-w-[220px] bg-bg-card shadow-xl rounded-xl py-2 mt-2 border border-border z-[120]"
                    >
                      {item.children.map((child, idx) => (
                        <Link
                          key={idx}
                          href={child.href}
                          className="block px-5 py-2.5 text-sm text-text-secondary hover:text-primary hover:bg-primary/5 transition-all"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              )}
            </div>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <ThemeSwitcher />
          <div className="hidden sm:block w-px h-6 bg-border mx-1" />

          <LanguageSwitcher />

          {/* Mobile Menu Toggle */}
          <button
            className="lg:hidden p-2 rounded-xl text-text-primary hover:bg-bg-soft transition-all"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle Menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </Container>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <div className="fixed inset-0 z-[10000] lg:hidden">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />

            {/* Menu Content */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className={cn(
                "absolute top-0 bottom-0 right-0 w-[85%] max-w-sm bg-bg-card shadow-2xl p-8 overflow-y-auto border-l border-border"
              )}
            >
              <div className="flex justify-between items-center mb-10">
                <Link href="/" className="flex items-center gap-2" onClick={() => setIsMobileMenuOpen(false)}>
                  <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center text-white font-bold text-xl">O</div>
                  <span className="font-bold text-text-primary">YPC</span>
                </Link>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 rounded-lg text-text-secondary hover:bg-bg-soft hover:text-primary transition-all"
                >
                  <X size={24} />
                </button>
              </div>

              <nav className="space-y-2">
                {navItems
                  .filter(item => ['home', 'company', 'services', 'projects', 'news', 'tenders', 'contact'].includes(item.id))
                  .map((item) => (
                    <div key={item.id} className="border-b border-border/50 last:border-0 pb-2 mb-2">
                      <div className="flex items-center justify-between">
                        <Link
                          href={item.href || '#'}
                          className="text-lg font-bold text-text-primary py-4 hover:text-primary transition-colors flex-grow"
                          onClick={() => !item.children && setIsMobileMenuOpen(false)}
                        >
                          {item.label}
                        </Link>
                      </div>
                      {item.children && (
                        <div className="mt-1 space-y-1 pr-4 border-r-2 border-primary/20">
                          {item.children.map((child, idx) => (
                            <Link
                              key={idx}
                              href={child.href}
                              className="block text-text-secondary hover:text-primary py-3 text-sm transition-colors"
                              onClick={() => setIsMobileMenuOpen(false)}
                            >
                              {child.label}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
              </nav>

              <div className="mt-12 pt-8 border-t border-border">
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-text-secondary text-sm">
                    <Phone size={16} className="text-primary" />
                    <span>+967 1 234567</span>
                  </div>
                  <div className="flex items-center gap-3 text-text-secondary text-sm">
                    <Mail size={16} className="text-primary" />
                    <span>info@noc.gov.ye</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </header>
  );
}
