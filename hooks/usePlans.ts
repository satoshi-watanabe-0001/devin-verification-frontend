'use client';

import { useState, useEffect } from 'react';
import { Plan } from '@/types/api.types';
import { ContentApiService } from '@/services/api.service';

/**
 * 料金プラン一覧を取得するカスタムフック
 * @returns プランデータ、ローディング状態、エラー状態
 */
export const usePlans = () => {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        setLoading(true);
        setError(null);
        const result = await ContentApiService.getPlans();
        setPlans(result);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch plans');
      } finally {
        setLoading(false);
      }
    };

    fetchPlans();
  }, []);

  return { plans, loading, error };
};
