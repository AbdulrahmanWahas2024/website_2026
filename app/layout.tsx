import type { Metadata } from 'next';
import { Cairo, Inter } from 'next/font/google';
import './globals.css';
import { LanguageProvider } from '@/context/LanguageContext';
import { ThemeProvider } from '@/context/ThemeContext';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const cairo = Cairo({
  subsets: ['arabic', 'latin'],
  variable: '--font-cairo',
  weight: ['300', '400', '500', '600', '700', '800'],
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: {
    default: 'National Oil Company | شركة النفط الوطنية',
    template: '%s | National Oil Company'
  },
  description: 'Official portal of the National Oil Company - Providing energy for the future with excellence and sustainability. Explore our services, projects, and latest news.',
  keywords: ['Oil', 'Energy', 'National Oil Company', 'Yemen', 'Fuel', 'Petroleum', 'شركة النفط'],
  authors: [{ name: 'National Oil Company' }],
  openGraph: {
    type: 'website',
    locale: 'ar_YE',
    url: 'https://noc.gov.ye',
    siteName: 'National Oil Company',
    images: [
      {
        url: 'https://picsum.photos/seed/noc-og/1200/630',
        width: 1200,
        height: 630,
        alt: 'National Oil Company',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'National Oil Company | شركة النفط الوطنية',
    description: 'Official portal of the National Oil Company - Providing energy for the future with excellence and sustainability.',
    images: ['https://picsum.photos/seed/noc-twitter/1200/630'],
  },
  robots: 'index, follow',
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl" className={`${cairo.variable} ${inter.variable}`} suppressHydrationWarning>
      <body suppressHydrationWarning className="font-cairo overflow-x-hidden bg-bg-main">
        <ThemeProvider>
          <LanguageProvider>
            <div className="flex flex-col min-h-screen">
              <Header />
              <div className="flex-grow">
                {children}
              </div>
              <Footer />
            </div>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
