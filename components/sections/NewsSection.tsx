'use client';

import React from 'react';
import Link from 'next/link';
import { SectionContainer } from '@/components/ui/SectionContainer';
import { useNews } from '@/hooks/useNews';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { ErrorMessage } from '@/components/ui/ErrorMessage';

/**
 * ニュースセクションコンポーネント
 * 最新3-5件のニュースを表示
 */
export const NewsSection: React.FC = () => {
  const { news, loading, error } = useNews(1, 5);

  return (
    <SectionContainer background="gray">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          お知らせ
        </h2>
        <p className="text-lg text-gray-600">
          最新のニュースとお知らせ
        </p>
      </div>

      {loading && <LoadingSpinner size="large" className="py-12" />}
      {error && <ErrorMessage message={error} className="my-4" />}

      {!loading && !error && news.length > 0 && (
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            {news.map((item, index) => (
              <Link
                key={item.id}
                href={`/news/${item.id}`}
                className={`block hover:bg-gray-50 transition-colors ${
                  index !== news.length - 1 ? 'border-b border-gray-200' : ''
                }`}
              >
                <div className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                    <div className="flex items-center space-x-3 mb-2 md:mb-0">
                      <span className="text-sm text-gray-500">{item.date}</span>
                      <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full">
                        {item.category}
                      </span>
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 hover:text-blue-600 transition-colors">
                    {item.title}
                  </h3>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link
              href="/news"
              className="inline-flex items-center px-6 py-3 bg-white border-2 border-blue-600 text-blue-600 font-medium rounded-lg hover:bg-blue-50 transition-colors"
            >
              すべてのお知らせを見る
              <svg
                className="w-5 h-5 ml-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </Link>
          </div>
        </div>
      )}

      {!loading && !error && news.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          現在、お知らせはありません
        </div>
      )}
    </SectionContainer>
  );
};
