'use client';

import { useState, useEffect } from 'react';
import { Smartphone, PaginatedResponse } from '@/types/api.types';
import { ContentApiService } from '@/services/api.service';

/**
 * スマートフォン一覧を取得するカスタムフック
 * @param page - ページ番号
 * @param pageSize - ページサイズ
 * @returns スマートフォンデータ、ローディング状態、エラー状態
 */
export const useSmartphones = (page: number = 1, pageSize: number = 10) => {
  const [data, setData] = useState<PaginatedResponse<Smartphone>>({
    data: [],
    total: 0,
    page,
    pageSize,
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSmartphones = async () => {
      try {
        setLoading(true);
        setError(null);
        const result = await ContentApiService.getSmartphones(page, pageSize);
        setData(result);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch smartphones');
      } finally {
        setLoading(false);
      }
    };

    fetchSmartphones();
  }, [page, pageSize]);

  return { smartphones: data.data, total: data.total, loading, error };
};
