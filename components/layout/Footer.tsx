'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Container } from '@/components/ui/Container';
import { Phone, Mail, MapPin, Facebook, Twitter, Instagram, Linkedin, ArrowUp } from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
  const { t } = useLanguage();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-primary-dark text-white pt-8 md:pt-12 pb-6 md:pb-8 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
      </div>

      <Container className="relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mb-8 md:mb-10">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center text-primary font-black text-xl">O</div>
              <div className="flex flex-col">
                <span className="font-black text-lg leading-tight tracking-tight">NOC</span>
                <span className="text-[8px] uppercase tracking-widest text-white/60 font-bold">National Oil Company</span>
              </div>
            </Link>
            <p className="text-white/60 text-xs leading-relaxed max-w-xs">
              {t('hero.subtitle')}
            </p>
            <div className="flex gap-3">
              {[
                { Icon: Facebook, label: 'Facebook' },
                { Icon: Twitter, label: 'Twitter' },
                { Icon: Instagram, label: 'Instagram' },
                { Icon: Linkedin, label: 'LinkedIn' }
              ].map(({ Icon, label }, idx) => (
                <a 
                  key={idx} 
                  href="#" 
                  aria-label={label}
                  className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center hover:bg-accent hover:text-primary-dark transition-all"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-base font-black mb-6 border-b border-white/10 pb-3">{t('footer.quick_links')}</h3>
            <ul className="space-y-3">
              {[
                { id: 'home', path: '/' },
                { id: 'about', path: '/company' },
                { id: 'services', path: '/services' },
                { id: 'projects', path: '/projects' },
                { id: 'news', path: '/news' },
                { id: 'tenders', path: '/tenders' },
                { id: 'contact', path: '/contact' }
              ].map((item) => (
                <li key={item.id}>
                  <Link href={item.path} className="text-white/60 hover:text-accent transition-colors flex items-center gap-2 text-xs">
                    <div className="w-1 h-1 rounded-full bg-accent/40" />
                    {t(`nav.${item.id}`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-base font-black mb-6 border-b border-white/10 pb-3">{t('nav.services')}</h3>
            <ul className="space-y-3">
              {[
                { id: 'procedures_guide', path: '/services/procedures-guide' },
                { id: 'user_guide', path: '/services/user-guide' },
                { id: 'transaction_inquiry', path: '/services/inquiry' },
                { id: 'fuel_license', path: '/services/fuel-license' },
                { id: 'complaints', path: '/complaints' }
              ].map((item) => (
                <li key={item.id}>
                  <Link href={item.path} className="text-white/60 hover:text-accent transition-colors flex items-center gap-2 text-xs">
                    <div className="w-1 h-1 rounded-full bg-accent/40" />
                    {t(`nav.${item.id}`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-base font-black mb-6 border-b border-white/10 pb-3">{t('footer.contact_info')}</h3>
            <ul className="space-y-4">
              <li className="flex gap-3">
                <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center shrink-0">
                  <MapPin size={16} className="text-accent" />
                </div>
                <div className="text-xs text-white/60">
                  <span className="block text-white font-bold mb-0.5">العنوان</span>
                  الجمهورية اليمنية، صنعاء، شارع الستين
                </div>
              </li>
              <li className="flex gap-3">
                <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center shrink-0">
                  <Phone size={16} className="text-accent" />
                </div>
                <div className="text-xs text-white/60">
                  <span className="block text-white font-bold mb-0.5">الهاتف</span>
                  +967 1 234567
                </div>
              </li>
              <li className="flex gap-3">
                <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center shrink-0">
                  <Mail size={16} className="text-accent" />
                </div>
                <div className="text-xs text-white/60">
                  <span className="block text-white font-bold mb-0.5">البريد الإلكتروني</span>
                  info@noc.gov.ye
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/40 text-[10px] font-bold uppercase tracking-widest text-center md:text-start">
            {t('footer.rights')}
          </p>
          <button 
            onClick={scrollToTop}
            aria-label="Scroll to top"
            className="w-10 h-10 rounded-full bg-accent flex items-center justify-center text-primary-dark hover:scale-110 transition-all shadow-lg active:scale-90"
          >
            <ArrowUp size={18} />
          </button>
        </div>
      </Container>
    </footer>
  );
}
