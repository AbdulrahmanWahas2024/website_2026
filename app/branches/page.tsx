'use client';

import React from 'react';
import { PageHero } from '@/components/ui/PageHero';
import { Container } from '@/components/ui/Container';
import { useLanguage } from '@/context/LanguageContext';
import { motion } from 'motion/react';
import { MapPin, Phone, Mail, Globe } from 'lucide-react';

export default function BranchesPage() {
  const { t } = useLanguage();

  const branches = [
    { name: 'فرع الأمانة', location: 'صنعاء - شارع الستين', phone: '+967 1 123456', email: 'sanaa@noc.gov.ye' },
    { name: 'فرع عدن', location: 'عدن - المعلا', phone: '+967 2 654321', email: 'aden@noc.gov.ye' },
    { name: 'فرع الحديدة', location: 'الحديدة - ميناء الحديدة', phone: '+967 3 111222', email: 'hodeidah@noc.gov.ye' },
    { name: 'فرع حضرموت', location: 'المكلا - شارع الميناء', phone: '+967 5 333444', email: 'hadramout@noc.gov.ye' },
    { name: 'فرع تعز', location: 'تعز - الحوبان', phone: '+967 4 555666', email: 'taiz@noc.gov.ye' },
    { name: 'فرع مأرب', location: 'مأرب - المجمع', phone: '+967 6 777888', email: 'marib@noc.gov.ye' },
  ];

  return (
    <main>
      <PageHero 
        title="الفروع والمكاتب" 
        subtitle="شبكة واسعة من الفروع تغطي كافة أنحاء الوطن لخدمتكم"
      />
      
      <Container className="py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {branches.map((branch, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05 }}
              className="group bg-white p-10 rounded-[32px] border border-border hover:border-accent transition-all hover:shadow-2xl hover:shadow-primary/5"
            >
              <div className="w-14 h-14 rounded-2xl bg-primary/5 flex items-center justify-center text-primary mb-8 group-hover:bg-primary group-hover:text-white transition-all">
                <MapPin size={28} />
              </div>
              
              <h3 className="text-2xl font-black text-primary mb-6 group-hover:text-accent transition-colors">
                {branch.name}
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-center gap-4 text-text-secondary">
                  <MapPin size={18} className="text-accent" />
                  <span className="text-sm font-bold">{branch.location}</span>
                </div>
                <div className="flex items-center gap-4 text-text-secondary">
                  <Phone size={18} className="text-accent" />
                  <span className="text-sm font-bold">{branch.phone}</span>
                </div>
                <div className="flex items-center gap-4 text-text-secondary">
                  <Mail size={18} className="text-accent" />
                  <span className="text-sm font-bold">{branch.email}</span>
                </div>
              </div>
              
              <div className="mt-8 pt-8 border-t border-border flex items-center justify-between">
                <span className="text-[10px] font-black text-text-secondary/40 uppercase tracking-widest">مفتوح الآن</span>
                <button className="text-primary font-black text-xs uppercase tracking-widest flex items-center gap-2 hover:text-accent transition-colors">
                  عرض على الخريطة
                  <Globe size={14} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </main>
  );
}
