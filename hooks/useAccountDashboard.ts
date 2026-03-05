'use client';

import { useState, useEffect } from 'react';
import type { AccountDashboard } from '@/types/account';
import { AccountApiService } from '@/services/accountService';

/**
 * ダッシュボード集約データを取得するカスタムフック
 * @returns ダッシュボードデータ、ローディング状態、エラー状態、再取得関数
 */
export const useAccountDashboard = () => {
  const [data, setData] = useState<AccountDashboard | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDashboard = async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await AccountApiService.getDashboard();
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'ダッシュボードデータの取得に失敗しました');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  return { dashboard: data, loading, error, refetch: fetchDashboard };
};
