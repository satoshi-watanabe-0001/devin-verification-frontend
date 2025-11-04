'use client';

import { useState, useEffect } from 'react';
import { Campaign, PaginatedResponse } from '@/types/api.types';
import { ContentApiService } from '@/services/api.service';

/**
 * キャンペーン一覧を取得するカスタムフック
 * @param page - ページ番号
 * @param pageSize - ページサイズ
 * @returns キャンペーンデータ、ローディング状態、エラー状態
 */
export const useCampaigns = (page: number = 1, pageSize: number = 10) => {
  const [data, setData] = useState<PaginatedResponse<Campaign>>({
    data: [],
    total: 0,
    page,
    pageSize,
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        setLoading(true);
        setError(null);
        const result = await ContentApiService.getCampaigns(page, pageSize);
        setData(result);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch campaigns');
      } finally {
        setLoading(false);
      }
    };

    fetchCampaigns();
  }, [page, pageSize]);

  return { campaigns: data.data, total: data.total, loading, error };
};
