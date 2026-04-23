'use client';

import React from 'react';
import { PageHero } from '@/components/ui/PageHero';
import { Container } from '@/components/ui/Container';
import { useLanguage } from '@/context/LanguageContext';
import { motion } from 'motion/react';
import { Quote } from 'lucide-react';
import Image from 'next/image';

export default function CEOMessagePage() {
  const { t } = useLanguage();

  return (
    <main>
      <PageHero 
        title="كلمة المدير العام" 
        subtitle="رؤية القيادة نحو مستقبل طاقة مستدام ومزدهر"
      />
      
      <Container className="py-24">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16 items-start">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2 lg:sticky lg:top-32"
          >
            <div className="relative aspect-[3/4] rounded-[40px] overflow-hidden shadow-2xl border-4 md:border-8 border-white bg-bg-soft">
              <Image 
                src="https://picsum.photos/seed/ceo/800/1000" 
                alt="CEO" 
                fill 
                className="object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="mt-8 text-center lg:text-right rtl:lg:text-left">
              <h3 className="text-2xl font-black text-primary">م. محمد أحمد علي</h3>
              <p className="text-accent font-bold uppercase tracking-widest text-sm mt-2">المدير العام التنفيذي</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-3 space-y-10 bg-white/50 backdrop-blur-sm p-6 md:p-10 rounded-[40px] border border-white/20"
          >
            <div className="w-20 h-20 rounded-3xl bg-primary/5 flex items-center justify-center text-primary">
              <Quote size={40} />
            </div>
            
            <div className="space-y-8 text-lg text-text-secondary leading-relaxed">
              <p className="font-black text-primary text-2xl leading-tight">
                &quot;إن التزامنا بتوفير الطاقة هو التزام ببناء الوطن، ونحن في شركة النفط الوطنية نضع نصب أعيننا دائماً مصلحة المواطن كأولوية قصوى.&quot;
              </p>
              
              <p>
                منذ تأسيس هذه المؤسسة العريقة، كان الهدف دائماً هو ضمان استقرار سوق المشتقات النفطية وتوفير احتياجات كافة القطاعات الحيوية في الوطن. نحن ندرك حجم المسؤولية الملقاة على عاتقنا، خاصة في ظل التحديات الراهنة التي يمر بها العالم في قطاع الطاقة.
              </p>
              
              <p>
                إننا نعمل اليوم وفق استراتيجية طموحة تهدف إلى تحديث البنية التحتية، وتطوير المنشآت النفطية، واعتماد أحدث التقنيات في إدارة الموارد والتوزيع. كما نولي اهتماماً خاصاً بالكوادر الوطنية، إيماناً منا بأن الإنسان هو الركيزة الأساسية لأي نجاح.
              </p>
              
              <p>
                نتطلع إلى المستقبل بثقة، ونعدكم بأن تظل شركة النفط الوطنية هي الصرح الشامخ الذي يضيء دروب التنمية ويساهم في دفع عجلة الاقتصاد الوطني نحو آفاق أرحب من الازدهار والاستقرار.
              </p>
            </div>

            <div className="pt-12 border-t border-border flex items-center gap-8">
              <div className="space-y-1">
                <p className="text-xs font-black text-primary uppercase tracking-widest">التوقيع</p>
                <p className="font-serif italic text-3xl text-primary/40">M. Ahmed Ali</p>
              </div>
            </div>
          </motion.div>
        </div>
      </Container>
    </main>
  );
}
