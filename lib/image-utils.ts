import { API_CONFIG } from "./api-config";

export function getImageUrl(path?: string | null) {
    if (!path) return "/news-placeholder.jpg";

    // لو رابط كامل
    if (path.startsWith("http")) return path;

    // لو يبدأ بـ /files
    if (path.startsWith("/files")) {
        return `${API_CONFIG.BASE_URL}${path}`;
    }

    return "/news-placeholder.jpg";
}