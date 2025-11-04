'use client';

import { useState, useEffect } from 'react';
import { News, PaginatedResponse } from '@/types/api.types';
import { ContentApiService } from '@/services/api.service';

/**
 * ニュース一覧を取得するカスタムフック
 * @param page - ページ番号
 * @param pageSize - ページサイズ
 * @returns ニュースデータ、ローディング状態、エラー状態
 */
export const useNews = (page: number = 1, pageSize: number = 5) => {
  const [data, setData] = useState<PaginatedResponse<News>>({
    data: [],
    total: 0,
    page,
    pageSize,
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);
        setError(null);
        const result = await ContentApiService.getNews(page, pageSize);
        setData(result);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch news');
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [page, pageSize]);

  return { news: data.data, total: data.total, loading, error };
};
