const MAX_VIDEO_SIZE = 15 * 1024 * 1024; // 15MB

export const validateVideo = (file: File) => {
    if (!file.type.startsWith("video")) return true;

    if (file.size > MAX_VIDEO_SIZE) {
        throw new Error("حجم الفيديو كبير (الحد الأقصى 15MB)");
    }

    return true;
};