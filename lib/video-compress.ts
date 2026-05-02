import { FFmpeg } from "@ffmpeg/ffmpeg";
import { fetchFile, toBlobURL } from "@ffmpeg/util";

const ffmpeg = new FFmpeg();

let loaded = false;

export const compressVideo = async (file: File) => {
    try {
        if (!loaded) {
            await ffmpeg.load({
                coreURL: await toBlobURL(
                    "https://unpkg.com/@ffmpeg/core@0.12.6/dist/ffmpeg-core.js",
                    "text/javascript"
                ),
            });
            loaded = true;
        }

        // إدخال الملف
        await ffmpeg.writeFile("input.mp4", await fetchFile(file));

        // ضغط الفيديو
        await ffmpeg.exec([
            "-i",
            "input.mp4",
            "-vcodec",
            "libx264",
            "-crf",
            "23", // جودة ممتازة
            "-preset",
            "medium",
            "-movflags",
            "faststart",
            "output.mp4",
        ]);

        // قراءة الناتج
        const data = await ffmpeg.readFile("output.mp4");

        // إجبار التحويل إلى Uint8Array أولاً
        const uint8 = new Uint8Array(data as any);

        // تحويل آمن إلى ArrayBuffer (بدون SharedArrayBuffer)
        const buffer = uint8.buffer.slice(
            uint8.byteOffset,
            uint8.byteOffset + uint8.byteLength
        );

        const blob = new Blob([buffer as ArrayBuffer], {
            type: "video/mp4",
        });

        return new File([blob], file.name, {
            type: "video/mp4",
        });
    } catch (err) {
        console.error("خطأ في ضغط الفيديو:", err);
        throw new Error("فشل ضغط الفيديو");
    }
};