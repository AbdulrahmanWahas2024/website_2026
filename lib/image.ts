// lib/utils/image.ts

import { API_CONFIG } from "@/lib/api-config";

/**
 * تحويل مسار الصورة إلى URL كامل
 */
export function getImageUrl(path?: string | null) {
    if (!path) return "/news-placeholder.jpg";

    // إذا الرابط كامل
    if (path.startsWith("http")) {
        return path;
    }

    // إذا من ERPNext
    if (path.startsWith("/files")) {
        return `${API_CONFIG.BASE_URL}${path}`;
    }

    return "/news-placeholder.jpg";
}

/**
 * تجهيز صور المعرض
 */

export function normalizeGalleryImages(
    gallery: any[] = []
): Array<{ type: string; url: string }> {

    return gallery
        .map((item) => {

            const file =
                item.image ||
                item.file ||
                item.media;

            if (!file) return null;

            let url = file;

            if (!file.startsWith("http")) {
                url =
                    API_CONFIG.BASE_URL + file;
            }

            const ext =
                file.split(".").pop()?.toLowerCase();

            const videoExt = [
                "mp4",
                "webm",
                "ogg",
                "mov"
            ];

            const type =
                videoExt.includes(ext || "")
                    ? "video"
                    : "image";

            return {
                type,
                url
            };

        })
        .filter(Boolean) as Array<{
            type: string;
            url: string;
        }>;
}