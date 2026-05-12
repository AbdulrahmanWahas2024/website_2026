'use client';

import React, { useState, useEffect } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Container } from '@/components/ui/Container';
import { BackButton } from '@/components/ui/BackButton';
import { useLanguage } from '@/context/LanguageContext';
import { motion, AnimatePresence } from 'motion/react';
import { FileText, Upload, CheckCircle2, Building2, Globe, Briefcase, MapPin, Send } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { apiService } from '@/lib/api-service';
import { API_CONFIG } from '@/lib/api-config';
import { fetchTenderById } from "@/lib/services/tender.service";

export default function TenderApplyClient({ id }: { id: string }) {
  const { t } = useLanguage();
  const [tender, setTender] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [submitted, setSubmitted] = useState(false);
  // const [formData, setFormData] = useState({
  //   company_name: '',
  //   company_type: '',
  //   commercial_no: '',
  //   province: ''
  // });
  const [formData, setFormData] = useState<any>({});
  // const [files, setFiles] = useState<{
  //   file1?: File;
  //   file2?: File;
  //   file3?: File;
  //   file4?: File;
  // }>({});
  const [files, setFiles] = useState<Record<string, File | undefined>>({});
  const [dynamicFields, setDynamicFields] = useState<any[]>([]);
  
  useEffect(() => {

    const loadTender = async () => {

      try {

        setLoading(true);

        const data = await fetchTenderById(id);

        setTender(data);

      } catch (error) {

        console.error("APPLY PAGE ERROR:", error);

      } finally {

        setLoading(false);

      }

    };

    const loadFormFields = async () => {

      try {

        const res = await fetch(
          `${API_CONFIG.BASE_URL}/api/method/website_manager.api.tender_forms.get_tender_form_fields`
        );

        const data = await res.json();

        setDynamicFields(data.message || []);

      } catch (error) {

        console.error("FIELDS ERROR:", error);

      }

    };

    loadTender();
    loadFormFields();

  }, [id]);
  if (loading) {
    return (

      <div className="min-h-screen flex flex-col items-center justify-center bg-bg-main">

        {/* دائرة متحركة */}

        <div className="relative w-20 h-20">

          <div className="absolute inset-0 rounded-full border-4 border-primary/20" />

          <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-primary border-r-accent animate-spin" />

        </div>

        {/* النص */}

        <div className="mt-6 text-center">

          <h3 className="text-lg font-black text-primary">
            جاري تحميل صفحة التقديم...
          </h3>

          <p className="text-sm text-text-secondary mt-2">
            يرجى الانتظار قليلاً...
          </p>

        </div>

      </div>

    );
  }
  if (!tender) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        لا توجد بيانات لهذه المناقصة
      </div>
    );
  }
  if (loading) return <div className="min-h-screen bg-bg-main" />;


  // const handleSubmit = (e: React.FormEvent) => {
  //   e.preventDefault();
  //   setSubmitted(true);
  // };
  // التحقق من الايميل
  const isValidEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  // التحقق من الهاتف الدولي
  const isValidPhone = (phone: string) => {
    return /^\+\d{1,4}\d{9}$/.test(phone);
  };

  // التحقق من الملفات
  const allowedFileTypes = [
    "application/pdf",
    "image/jpeg",
    "image/png"
  ];

  const validateFile = (file: File) => {
    return allowedFileTypes.includes(file.type);
  };
  
  const uploadFile = async (file: File) => {
    const formData = new FormData();

    formData.append("file", file);
    formData.append("is_private", "0");

    const res = await fetch(
      `${API_CONFIG.BASE_URL}/api/upload_file`,
      {
        method: "POST",
        body: formData,
        // مهم إذا تستخدم تسجيل دخول ERPNext
        credentials: "include",
      }
    );

    const result = await res.json();

    return result.message.file_url;
  };
  const handleSubmit = async (e: React.FormEvent) => {

    e.preventDefault();
    // التحقق من الحقول
    for (const field of dynamicFields) {

      const value = formData[field.fieldname];

      // التحقق من الايميل
      if (
        field.fieldtype === "Email" &&
        value &&
        !isValidEmail(value)
      ) {
        alert(`صيغة البريد الإلكتروني غير صحيحة: ${field.label}`);
        return;
      }

      // التحقق من الهاتف
      if (
        field.fieldtype === "Phone" &&
        value &&
        !isValidPhone(value)
      ) {
        alert(`رقم الهاتف غير صحيح: ${field.label}`);
        return;
      }

      // التحقق من الملفات
      if (
        field.fieldtype === "Attach" &&
        files[field.fieldname]
      ) {

        const file = files[field.fieldname]!;

        if (!validateFile(file)) {
          alert(`نوع الملف غير مسموح في: ${field.label}`);
          return;
        }
      }
    }

    try {

      const dynamicData: any = {};

      for (const field of dynamicFields) {

        // الملفات
        if (
          field.fieldtype === "Attach" &&
          files[field.fieldname]
        ) {

          dynamicData[field.fieldname] =
            await uploadFile(files[field.fieldname]!);

        } else {

          dynamicData[field.fieldname] =
            formData[field.fieldname] || null;

        }

      }

      const payload = {
        doctype: "Tender Application",
        tender: id,
        applicant_data: JSON.stringify(dynamicData)
      };

      const res = await fetch(
        `${API_CONFIG.BASE_URL}/api/resource/Tender Application`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      const result = await res.json();

      if (result.data) {
        setSubmitted(true);
      }

    } catch (err) {

      console.error("Submit Error:", err);

    }

  };
  if (loading) return <div className="min-h-screen bg-bg-main" />;

        return (
    <main className="bg-bg-main min-h-screen relative overflow-hidden">
      {/* 3D Animated Background Slider */}
      <div className="fixed inset-0 z-0">
        <motion.div
          animate={{ 
            scale: [1, 1.05, 1],
            rotate: [0, 0.5, 0]
          }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 opacity-10"
        >
          <Image 
            src="https://picsum.photos/seed/oilinfra/1920/1080" 
            alt="Background" 
            fill 
            className="object-cover"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-b from-bg-main via-bg-main/90 to-bg-main" />
      </div>

      <Header />
      
      <Container className="relative z-10 pt-32 pb-20">
        <BackButton className="mb-8" />

        <div className="max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            {!submitted ? (
              <motion.div
                key="form"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-white rounded-[40px] border border-border shadow-2xl overflow-hidden"
              >
                <div className="bg-primary p-10 text-white">
                  <h1 className="text-3xl font-black mb-4">طلب تقديم على مناقصة</h1>
                  <p className="text-white/90 font-bold">
                    أنت الآن بصدد التقديم على: <span className="text-accent">{tender.title}</span> (رقم: {tender.id})
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="p-10 space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                    {dynamicFields.map((field) => (

                      <div key={field.fieldname} className="space-y-2">

                        {/* Label */}
                        <label className="text-sm font-black text-primary">
                          {field.label}
                        </label>

                        {/* Data Field */}
                        {field.fieldtype === "Data" && (
                          <input
                            type="text"
                            required={field.required}
                            placeholder={field.placeholder || ""}
                            value={formData[field.fieldname] || ""}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                [field.fieldname]: e.target.value
                              })
                            }
                            className="input-field"
                          />
                        )}

                        {/* Select Field */}
                        {field.fieldtype === "Select" && (
                          <select
                            required={field.required}
                            value={formData[field.fieldname] || ""}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                [field.fieldname]: e.target.value
                              })
                            }
                            className="input-field appearance-none"
                          >
                            <option value="">اختر</option>

                            {field.options?.split("\n").map((option: string) => (
                              <option key={option} value={option}>
                                {option}
                              </option>
                            ))}
                          </select>
                        )}

                        {/* Textarea */}
                        {field.fieldtype === "Text" && (
                          <textarea
                            required={field.required}
                            placeholder={field.placeholder || ""}
                            value={formData[field.fieldname] || ""}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                [field.fieldname]: e.target.value
                              })
                            }
                            className="input-field min-h-[120px]"
                          />
                        )}
                        {/* Email */}
                        {field.fieldtype === "Email" && (
                          <input
                            type="email"
                            required={field.required}
                            placeholder="example@email.com"
                            value={formData[field.fieldname] || ""}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                [field.fieldname]: e.target.value
                              })
                            }
                            className="input-field"
                          />
                        )}
                        {/* Phone */}
                        {field.fieldtype === "Phone" && (
                          <input
                            type="tel"
                            required={field.required}
                            placeholder="+967771234567"
                            value={formData[field.fieldname] || ""}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                [field.fieldname]: e.target.value
                              })
                            }
                            className="input-field"
                          />
                        )}
                        {/* Date */}
                        {field.fieldtype === "Date" && (
                          <input
                            type="date"
                            required={field.required}
                            value={formData[field.fieldname] || ""}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                [field.fieldname]: e.target.value
                              })
                            }
                            className="input-field"
                          />
                        )}

                        {/* Check */}
                        {field.fieldtype === "Check" && (
                          <label className="flex items-center gap-3">
                            <input
                              type="checkbox"
                              checked={formData[field.fieldname] || false}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  [field.fieldname]: e.target.checked
                                })
                              }
                            />
                            <span>{field.label}</span>
                          </label>
                        )}


                        {/* File Upload */}
                        {field.fieldtype === "Attach" && (
                          <div className="relative group">

                            <input
                              type="file"
                              accept=".pdf,.jpg,.jpeg,.png"
                              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                              onChange={(e) =>
                                setFiles({
                                  ...files,
                                  [field.fieldname]: e.target.files?.[0]
                                })
                              }
                            />
                           
                
                            <div className="p-4 rounded-2xl border-2 border-dashed border-border group-hover:border-primary group-hover:bg-primary/5 transition-all flex items-center justify-between">

                              <div className="flex items-center gap-3">

                                <div className="w-10 h-10 rounded-xl bg-bg-soft flex items-center justify-center text-primary">
                                  <FileText size={20} />
                                </div>

                                <span className="text-xs font-bold text-text-secondary">
                                  {field.label}
                                </span>

                              </div>

                              <Upload
                                size={18}
                                className="text-text-secondary/40 group-hover:text-primary"
                              />

                            </div>

                          </div>
                        )}

                      </div>

                    ))}
                   </div>
                   
                  <div className="pt-8">
                    <button type="submit" className="btn-gov w-full py-5 text-lg flex items-center justify-center gap-4">
                      إرسال طلب التقديم
                      <Send size={20} />
                    </button>
                    <p className="text-center text-text-secondary/60 text-xs mt-4">
                      بالنقر على إرسال، فإنك توافق على كافة الشروط والأحكام الخاصة بالمناقصات العامة.
                    </p>
                  </div>
                </form>
              </motion.div>
            ) : (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white rounded-[40px] border border-border shadow-2xl p-16 text-center space-y-8"
              >
                <div className="w-24 h-24 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-lg">
                  <CheckCircle2 size={48} />
                </div>
                <div className="space-y-4">
                  <h2 className="text-4xl font-black text-primary">شكراً على التقديم!</h2>
                  <p className="text-text-secondary text-lg max-w-md mx-auto leading-relaxed">
                    تم استلام طلبكم بنجاح للمناقصة رقم <span className="text-primary font-black">{tender.id}</span>. سيقوم قسم المشتريات بمراجعة الوثائق والتواصل معكم قريباً.
                  </p>
                </div>
                <div className="pt-8 flex flex-col md:flex-row gap-4 justify-center">
                  <Link 
                    href="/tenders"
                    className="inline-flex items-center justify-center gap-2 px-10 py-3 font-bold transition-all active:scale-95 btn-gov rounded-xl"
                  >
                    العودة للمناقصات
                  </Link>
                  <Link 
                    href="/"
                    className="inline-flex items-center justify-center gap-2 px-10 py-3 font-bold transition-all active:scale-95 btn-gov bg-bg-soft text-primary border-border rounded-xl"
                  >
                    الرئيسية
                  </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </Container>

      <Footer />
    </main>
  );
}
