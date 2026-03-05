'use client';

import { useState, useEffect } from 'react';
import type { DataUsage } from '@/types/account';
import { AccountApiService } from '@/services/accountService';

/**
 * データ使用量を取得するカスタムフック
 * @returns データ使用量、ローディング状態、エラー状態、再取得関数
 */
export const useDataUsage = () => {
  const [data, setData] = useState<DataUsage | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDataUsage = async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await AccountApiService.getDataUsage();
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'データ使用量の取得に失敗しました');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDataUsage();
  }, []);

  return { dataUsage: data, loading, error, refetch: fetchDataUsage };
};
