'use client';

import React from 'react';
import { motion } from 'motion/react';
import { Share2, FileText, ArrowRight } from 'lucide-react';
import Link from 'next/link';

interface Tender {
  id: string;
  serial: string;
  number: string;
  title: string;
  entity: string;
  type: string;
  deadline: string;
}

interface TendersTableProps {
  tenders: Tender[];
}

export function TendersTable({ tenders }: TendersTableProps) {
  return (
    <div className="w-full overflow-x-auto rounded-[32px] border border-white/5 shadow-xl bg-navy-light/40">
      <table className="w-full text-right border-collapse min-w-[1000px]">
        <thead>
          <tr className="bg-navy-dark text-white">
            <th className="p-6 font-black text-sm uppercase tracking-widest">الرقم التسلسلي</th>
            <th className="p-6 font-black text-sm uppercase tracking-widest">رقم المناقصة</th>
            <th className="p-6 font-black text-sm uppercase tracking-widest">اسم المناقصة</th>
            <th className="p-6 font-black text-sm uppercase tracking-widest">الجهة</th>
            <th className="p-6 font-black text-sm uppercase tracking-widest">نوع المناقصة</th>
            <th className="p-6 font-black text-sm uppercase tracking-widest">تاريخ نهاية التقديم</th>
            <th className="p-6 font-black text-sm uppercase tracking-widest text-center">مشاركة</th>
            <th className="p-6 font-black text-sm uppercase tracking-widest text-center">تقديم</th>
          </tr>
        </thead>
        <tbody>
          {tenders.map((tender, idx) => (
            <motion.tr 
              key={tender.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              className={`border-b border-white/5 hover:bg-white/5 transition-colors ${idx % 2 === 0 ? 'bg-white/5' : 'bg-transparent'}`}
            >
              <td className="p-6 font-bold text-white/40">{tender.serial}</td>
              <td className="p-6 font-black text-white">{tender.number}</td>
              <td className="p-6 font-bold text-white max-w-xs">{tender.title}</td>
              <td className="p-6 text-white/60">{tender.entity}</td>
              <td className="p-6">
                <span className="px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-black uppercase tracking-widest">
                  {tender.type}
                </span>
              </td>
              <td className="p-6 font-bold text-rose-500">{tender.deadline}</td>
              <td className="p-6 text-center">
                <button className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-white/40 hover:bg-primary hover:text-white transition-all mx-auto">
                  <Share2 size={18} />
                </button>
              </td>
              <td className="p-6 text-center">
                <Link 
                  href={`/tenders/apply/${tender.id}`}
                  className="inline-flex items-center gap-2 bg-primary text-white px-6 py-2.5 rounded-xl font-black text-sm hover:bg-primary-dark transition-all shadow-lg"
                >
                  <FileText size={16} />
                  تقديم
                </Link>
              </td>
            </motion.tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
