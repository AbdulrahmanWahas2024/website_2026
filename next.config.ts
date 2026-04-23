import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone',
  //  https://nextjs.org/docs/pages/building-your-application/configuring-nextjs#typescript-options 
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    formats: ['image/avif', 'image/webp'], // دعم تنسيقات الصور الحديثة لتحسين الأداء

    remotePatterns: [ // السماح بتحميل الصور من مصادر محددة فقط لزيادة الأمان وتحسين الأداء
      {
        protocol: 'http',
        hostname: '192.168.1.128', // السماح بتحميل الصور من الخادم المحلي  
        port: '',
        pathname: '/files/**',// السماح بتحميل الصور من مجلد الملفات في الخادم المحلي 
      },
      {
        protocol: 'https',// السماح بتحميل الصور من مصادر خارجية موثوقة مثل picsum.photos لتحسين تجربة المستخدم
        hostname: 'picsum.photos',  // السماح بتحميل الصور من picsum.photos لتحسين تجربة المستخدم 
        port: '',
        pathname: '/**', // السماح بتحميل أي صورة من picsum.photos لتحسين تجربة المستخدم  
      },
      {
        protocol: 'http', // السماح بتحميل الصور من localhost أثناء التطوير لتحسين تجربة المطور 
        hostname: 'localhost',
      },



    ]
  },
};


export default nextConfig;
