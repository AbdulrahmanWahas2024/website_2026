'use client';

import React from 'react';
import { PageHero } from '@/components/ui/PageHero';
import { Container } from '@/components/ui/Container';
import { useLanguage } from '@/context/LanguageContext';
import { motion } from 'motion/react';
import { Phone, Mail, MapPin, Clock, Send } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export default function ContactPage() {
  const { t } = useLanguage();

  const contactInfo = [
    { icon: Phone, title: 'اتصل بنا', detail: '+967 1 123456', sub: 'متاح من 8:00 ص - 3:00 م' },
    { icon: Mail, title: 'البريد الإلكتروني', detail: 'info@noc.gov.ye', sub: 'نرد خلال 24 ساعة' },
    { icon: MapPin, title: 'الموقع', detail: 'صنعاء، شارع الستين', sub: 'الإدارة العامة' },
    { icon: Clock, title: 'ساعات العمل', detail: 'الأحد - الخميس', sub: '8:00 صباحاً - 3:00 مساءً' },
  ];

  const branches = [
    { name: 'فرع صنعاء', address: 'شارع الستين، الإدارة العامة', phone: '+967 1 123456', email: 'sanaa@noc.gov.ye' },
    { name: 'فرع عدن', address: 'المعلا، الشارع الرئيسي', phone: '+967 2 654321', email: 'aden@noc.gov.ye' },
    { name: 'فرع الحديدة', address: 'شارع الميناء', phone: '+967 3 987654', email: 'hodeidah@noc.gov.ye' },
    { name: 'فرع حضرموت', address: 'المكلا، حي السلام', phone: '+967 5 332211', email: 'hadramout@noc.gov.ye' },
  ];

  return (
    <main className="bg-bg-main">
      <PageHero 
        title={t('nav.contact')} 
        subtitle="نحن هنا للاستماع إليكم وتقديم المساعدة في أي وقت"
      />
      
      <Container className="py-24">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 mb-24">
          <div className="lg:col-span-1 space-y-8">
            <div className="space-y-4">
              <h2 className="text-3xl font-black text-primary">معلومات التواصل</h2>
              <p className="text-text-secondary leading-relaxed">
                يمكنكم التواصل معنا عبر القنوات الرسمية الموضحة أدناه أو زيارة مقرنا الرئيسي.
              </p>
            </div>

            <div className="space-y-6">
              {contactInfo.map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="flex items-start gap-6 p-6 rounded-2xl bg-white border border-border shadow-sm hover:shadow-md transition-all"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center text-white shrink-0">
                    <item.icon size={24} />
                  </div>
                  <div>
                    <h3 className="font-black text-primary mb-1">{item.title}</h3>
                    <p className="text-lg font-bold text-text-primary mb-1">{item.detail}</p>
                    <p className="text-xs text-text-secondary/60 uppercase tracking-widest">{item.sub}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white p-8 md:p-12 rounded-[40px] shadow-2xl shadow-primary/5 border border-border"
            >
              <h2 className="text-3xl font-black text-primary mb-10">أرسل لنا رسالة</h2>
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-black text-primary uppercase tracking-widest">الاسم الكامل</label>
                    <input 
                      type="text" 
                      placeholder="أدخل اسمك هنا"
                      className="w-full bg-bg-soft border border-border rounded-xl px-6 py-4 focus:outline-none focus:border-accent transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-black text-primary uppercase tracking-widest">البريد الإلكتروني</label>
                    <input 
                      type="email" 
                      placeholder="email@example.com"
                      className="w-full bg-bg-soft border border-border rounded-xl px-6 py-4 focus:outline-none focus:border-accent transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-black text-primary uppercase tracking-widest">الموضوع</label>
                  <input 
                    type="text" 
                    placeholder="كيف يمكننا مساعدتك؟"
                    className="w-full bg-bg-soft border border-border rounded-xl px-6 py-4 focus:outline-none focus:border-accent transition-all"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-black text-primary uppercase tracking-widest">الرسالة</label>
                  <textarea 
                    rows={5}
                    placeholder="اكتب رسالتك هنا بالتفصيل..."
                    className="w-full bg-bg-soft border border-border rounded-xl px-6 py-4 focus:outline-none focus:border-accent transition-all resize-none"
                  />
                </div>

                <Button className="w-full py-6 text-lg group rounded-2xl">
                  إرسال الرسالة
                  <Send size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </Button>
              </form>
            </motion.div>
          </div>
        </div>

        {/* Map Section */}
        <div className="mb-24">
          <h2 className="text-3xl font-black text-primary mb-10 text-center">موقعنا على الخريطة</h2>
          <div className="w-full h-[500px] rounded-[40px] overflow-hidden border border-border shadow-xl grayscale hover:grayscale-0 transition-all duration-700">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3847.882142279!2d44.18!3d15.35!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTXCsDIxJzAwLjAiTiA0NMKwMTAnNDguMCJF!5e0!3m2!1sen!2sye!4v1615000000000!5m2!1sen!2sye" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen={true} 
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>

        {/* Branches Section */}
        <div>
          <h2 className="text-3xl font-black text-primary mb-10 text-center">فروعنا في المحافظات</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {branches.map((branch, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="p-8 rounded-[32px] bg-white border border-border shadow-sm hover:shadow-xl hover:border-accent transition-all group"
              >
                <div className="w-12 h-12 rounded-2xl bg-primary/5 flex items-center justify-center text-primary mb-6 group-hover:bg-primary group-hover:text-white transition-all">
                  <MapPin size={24} />
                </div>
                <h3 className="text-xl font-black text-primary mb-4">{branch.name}</h3>
                <div className="space-y-3 text-sm text-text-secondary">
                  <p className="flex items-center gap-2">
                    <MapPin size={14} className="text-accent" />
                    {branch.address}
                  </p>
                  <p className="flex items-center gap-2">
                    <Phone size={14} className="text-accent" />
                    {branch.phone}
                  </p>
                  <p className="flex items-center gap-2">
                    <Mail size={14} className="text-accent" />
                    {branch.email}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </Container>
    </main>
  );
}
