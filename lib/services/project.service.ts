// lib/services/project.service.ts

import { API_CONFIG } from "@/lib/api-config";
import { getImageUrl } from "@/lib/image-utils";


export async function fetchProjectDetails(slug: string) {

    try {

        const fields = encodeURIComponent(
            JSON.stringify([
                "name",
                "title",
                "category",
                "date",
                "image",
                "description",
                "content",
                "gallery_images"
            ])
        );

        const url =
            `${API_CONFIG.BASE_URL}/api/resource/Projects/${slug}` +
            `?fields=${fields}`;

        console.log("PROJECT URL:", url);

        const response =
            await fetch(url);

        const result =
            await response.json();

        const item =
            result.data;

        if (!item) return null;

        /**
         * تجهيز الصور والوسائط
         */

        const gallery =
            normalizeMediaFiles(
                item.gallery_images
            );

        return {

            id: item.name,

            title: item.title,

            category: item.category,

            date: item.date,

            image:
                getImageUrl(
                    item.image
                ),

            description:
                item.description || "",

            content:
                item.content || "",

            gallery

        };

    }

    catch (error) {

        console.error(
            "PROJECT FETCH ERROR:",
            error
        );

        return null;

    }

}

function normalizeMediaFiles(gallery_images: any) {
    throw new Error("Function not implemented.");
}
