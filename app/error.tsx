'use client';

import React, { useEffect } from 'react';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Application Error:', error);
  }, [error]);

  return (
    <div className="min-h-[60vh] flex items-center justify-center py-20 bg-bg-main">
      <Container className="text-center">
        <div className="max-w-md mx-auto space-y-8">
          <div className="w-20 h-20 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto">
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
          </div>
          <h2 className="text-3xl font-black text-primary">حدث خطأ ما</h2>
          <p className="text-text-secondary leading-relaxed">
            عذراً، واجهنا مشكلة تقنية أثناء تحميل هذه الصفحة. يرجى المحاولة مرة أخرى.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button onClick={() => reset()} size="lg" className="rounded-full">
              إعادة المحاولة
            </Button>
            <Button variant="outline" onClick={() => window.location.href = '/'} size="lg" className="rounded-full">
              العودة للرئيسية
            </Button>
          </div>
          {process.env.NODE_ENV === 'development' && (
            <div className="mt-12 p-6 bg-red-50 rounded-2xl text-left overflow-auto max-h-48 border border-red-100">
              <p className="text-xs font-mono text-red-800 break-words">
                {error.message}
              </p>
              {error.digest && (
                <p className="text-[10px] font-mono text-red-400 mt-2">
                  Digest: {error.digest}
                </p>
              )}
            </div>
          )}
        </div>
      </Container>
    </div>
  );
}
