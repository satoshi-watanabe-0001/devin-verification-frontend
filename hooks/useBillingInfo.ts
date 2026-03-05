'use client';

import { useState, useEffect } from 'react';
import type { BillingInfo } from '@/types/account';
import { AccountApiService } from '@/services/accountService';

/**
 * 請求情報を取得するカスタムフック
 * @returns 請求情報、ローディング状態、エラー状態、再取得関数
 */
export const useBillingInfo = () => {
  const [data, setData] = useState<BillingInfo | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchBillingInfo = async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await AccountApiService.getBillingInfo();
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : '請求情報の取得に失敗しました');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBillingInfo();
  }, []);

  return { billingInfo: data, loading, error, refetch: fetchBillingInfo };
};
