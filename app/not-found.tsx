import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex items-center justify-center py-20 bg-bg-main min-h-[60vh]">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-9xl font-black text-primary mb-4">404</h1>
        <h2 className="text-3xl font-bold text-text-primary mb-8">الصفحة غير موجودة</h2>
        <p className="text-text-secondary mb-12 max-w-md mx-auto">
          عذراً، الصفحة التي تبحث عنها غير موجودة أو تم نقلها.
        </p>
        <Link 
          href="/" 
          className="inline-flex items-center justify-center px-12 font-bold text-white transition-all bg-primary h-14 rounded-full hover:bg-primary-light hover:shadow-lg active:scale-95"
        >
          العودة للرئيسية
        </Link>
      </div>
    </div>
  );
}
