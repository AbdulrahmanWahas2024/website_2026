'use client';

import { useState } from "react";
import { compressVideo } from "@/lib/video-compress";
import { validateVideo } from "@/lib/validate-media";

export default function MediaUploader() {
    const [loading, setLoading] = useState(false);

    const handleUpload = async (file: File) => {
        try {
            setLoading(true);

            // 1️⃣ التحقق
            validateVideo(file);

            let finalFile = file;

            // 2️⃣ ضغط الفيديو إذا كبير
            if (file.type.startsWith("video") && file.size > 8 * 1024 * 1024) {
                alert("جاري ضغط الفيديو لتحسين الأداء...");
                finalFile = await compressVideo(file);
            }

            // 3️⃣ رفع الملف
            const formData = new FormData();
            formData.append("file", finalFile);

            const res = await fetch("/api/upload", {
                method: "POST",
                body: formData,
            });

            if (!res.ok) throw new Error("فشل رفع الملف");

            alert("تم رفع الفيديو بنجاح 🎉");

        } catch (err: any) {
            alert(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <input
                type="file"
                accept="image/*,video/*"
                onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleUpload(file);
                }}
            />

            {loading && (
                <p className="text-blue-500 mt-2">
                    جاري المعالجة...
                </p>
            )}
        </div>
    );
}