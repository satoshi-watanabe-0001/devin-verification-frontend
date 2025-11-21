'use client';

import { useEffect, useState } from 'react';

/**
 * MSWプロバイダー
 * 開発環境でUSE_MOCK=trueの場合のみMSWを初期化
 */
export function MSWProvider({ children }: { children: React.ReactNode }) {
  const [mswReady, setMswReady] = useState(false);

  useEffect(() => {
    const initMSW = async () => {
      const isDevelopment = process.env.NODE_ENV === 'development';
      const useMock = process.env.NEXT_PUBLIC_USE_MOCK === 'true';

      if (isDevelopment && useMock) {
        const { worker } = await import('@/mocks/browser');
        await worker.start({
          onUnhandledRequest: 'bypass',
        });
        console.log('[MSW] Mock Service Worker started');
      }
      
      setMswReady(true);
    };

    initMSW();
  }, []);

  if (!mswReady) {
    return null;
  }

  return <>{children}</>;
}
