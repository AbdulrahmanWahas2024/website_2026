import { API_CONFIG } from "@/lib/api-config";

export const getImageUrl = (img?: string) => {
  if (!img) return "/news-placeholder.jpg";

  if (img.startsWith("http")) return img;

  if (img.startsWith("/files")) {
    return `${API_CONFIG.BASE_URL}${img}`;
  }

  if (img.startsWith("/private")) {
    return "/news-placeholder.jpg";
  }

  return `${API_CONFIG.BASE_URL}${img}`;
};