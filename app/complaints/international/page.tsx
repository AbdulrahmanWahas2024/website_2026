'use client';

import React, { useState } from 'react';
import { Container } from '@/components/ui/Container';
import { BackButton } from '@/components/ui/BackButton';
import { useLanguage } from '@/context/LanguageContext';
import { motion, AnimatePresence } from 'motion/react';
import { Globe, Mail, Lock, User, Send, CheckCircle2 } from 'lucide-react';

export default function InternationalComplaintPage() {
  const { t } = useLanguage();
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <main className="bg-white min-h-screen">
      <Container className="pt-32 pb-20">
        <BackButton className="mb-12" />

        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-8"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/5 text-primary text-xs font-black uppercase tracking-widest">
              <Globe size={14} />
              International Portal
            </div>
            <h1 className="text-5xl font-black text-primary leading-tight">
              Global Feedback & <span className="text-accent">Inquiries</span>
            </h1>
            <p className="text-text-secondary text-lg leading-relaxed">
              We welcome feedback from our international partners and non-resident visitors. Please register with your email to submit your inquiry or proposal.
            </p>
            
            <div className="grid grid-cols-2 gap-6 pt-8">
              <div className="p-6 rounded-3xl bg-bg-soft border border-border">
                <h4 className="font-black text-primary mb-2">Secure</h4>
                <p className="text-xs text-text-secondary">Encrypted data transmission</p>
              </div>
              <div className="p-6 rounded-3xl bg-bg-soft border border-border">
                <h4 className="font-black text-primary mb-2">Fast</h4>
                <p className="text-xs text-text-secondary">Response within 48 hours</p>
              </div>
            </div>
          </motion.div>

          <AnimatePresence mode="wait">
            {!submitted ? (
              <motion.div
                key="form"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-white p-10 rounded-[40px] border border-border shadow-2xl space-y-8"
              >
                <div className="space-y-2">
                  <h2 className="text-2xl font-black text-primary">Register / Sign In</h2>
                  <p className="text-text-secondary text-sm">Please provide your details below</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-xs font-black text-primary uppercase tracking-widest">Full Name</label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary/40" size={18} />
                      <input required type="text" placeholder="John Doe" className="input-field pl-12 text-left" dir="ltr" />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-xs font-black text-primary uppercase tracking-widest">Email Address</label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary/40" size={18} />
                      <input required type="email" placeholder="john@example.com" className="input-field pl-12 text-left" dir="ltr" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-black text-primary uppercase tracking-widest">Message / Inquiry</label>
                    <textarea required rows={4} placeholder="How can we help you?" className="input-field text-left" dir="ltr"></textarea>
                  </div>

                  <button type="submit" className="btn-gov w-full py-4 text-lg flex items-center justify-center gap-3">
                    Submit Inquiry
                    <Send size={20} />
                  </button>
                </form>
              </motion.div>
            ) : (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white p-12 rounded-[40px] border border-border shadow-2xl text-center space-y-8"
              >
                <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 size={40} />
                </div>
                <div className="space-y-2">
                  <h2 className="text-3xl font-black text-primary">Thank You!</h2>
                  <p className="text-text-secondary">Your inquiry has been submitted successfully. We will contact you via email shortly.</p>
                </div>
                <button onClick={() => setSubmitted(false)} className="btn-gov px-10">Back to Portal</button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </Container>
    </main>
  );
}
