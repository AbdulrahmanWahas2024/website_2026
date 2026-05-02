import { API_CONFIG } from "@/lib/api-config";
export function getMediaUrl(file: string) {
    if (!file) return "";

    if (file.startsWith("http")) return file;

    // أهم سطر في ERPNext
    if (!file.startsWith("/files/")) {
        file = `/files/${file}`;
    }

    return `${API_CONFIG.BASE_URL}${file}`;
}
// export function normalizeGallery(items: any[]) {
//     if (!Array.isArray(items)) return [];

//     return items
//         .map((item) => {
//             const file =
//                 typeof item === "string"
//                     ? item
//                     : item?.image || item?.file || item?.video;

//             if (!file) return null;

//             const url = getMediaUrl(file);

//             const ext = file.split(".").pop()?.toLowerCase();

//             let type: "image" | "video" | "pdf" = "image";

//             if (["mp4", "webm", "ogg"].includes(ext)) type = "video";
//             if (ext === "pdf") type = "pdf";

//             return { type, url };
//         })
//         .filter(Boolean) as { type: string; url: string }[];
// }
export function normalizeGallery(items: any[]) {
    if (!items) return [];

    return items.map((item) => {
        const file = item.file || item.image || item.url;
        if (!file) return null;

        const url = getMediaUrl(file);
        const lower = file.toLowerCase();

        if (lower.includes(".mp4") || lower.includes(".webm")) {
            return { type: "video", url };
        }

        if (lower.includes("youtube") || lower.includes("youtu.be")) {
            return { type: "youtube", url: file }; // مهم: لا نحول الرابط
        }

        if (lower.includes(".pdf")) {
            return { type: "pdf", url };
        }

        return { type: "image", url };
    });
}