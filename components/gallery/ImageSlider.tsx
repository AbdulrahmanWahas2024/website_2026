// إنشاء Slider احترافي موحد لعرض الصور في كل مكان في الموقع
"use client";

import Image from "next/image";

import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";

type Props = {
    images: string[];
};

export default function ImageSlider({
    images
}: Props) {

    if (!images.length) {

        return (
            <div className="text-gray-400">
                لا توجد صور
            </div>
        );

    }

    return (

        <Swiper
            spaceBetween={10}
            slidesPerView={1}
        >

            {images.map((img, idx) => (

                <SwiperSlide key={idx}>

                    <div className="relative aspect-video">

                        <Image
                            src={img}
                            alt={`Gallery ${idx}`}
                            fill
                            className="object-contain"
                            unoptimized
                        />

                    </div>

                </SwiperSlide>

            ))}

        </Swiper>

    );
}