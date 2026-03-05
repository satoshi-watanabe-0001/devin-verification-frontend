'use client';

import { useState, useEffect } from 'react';
import type { ContractInfo } from '@/types/account';
import { AccountApiService } from '@/services/accountService';

/**
 * 契約情報を取得するカスタムフック
 * @returns 契約情報データ、ローディング状態、エラー状態、再取得関数
 */
export const useContractInfo = () => {
  const [data, setData] = useState<ContractInfo | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchContractInfo = async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await AccountApiService.getContractInfo();
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : '契約情報の取得に失敗しました');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContractInfo();
  }, []);

  return { contractInfo: data, loading, error, refetch: fetchContractInfo };
};
