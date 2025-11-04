'use client';

import React, { useState, useCallback } from 'react';
import { useSmartphones } from '@/hooks/useSmartphones';
import { LoadingSpinner } from './LoadingSpinner';
import { ErrorMessage } from './ErrorMessage';
import { GradientButton } from './GradientButton';

/**
 * スマートフォンカルーセルコンポーネント
 */
export const SmartphoneCarousel: React.FC = () => {
  const { smartphones, loading, error } = useSmartphones(1, 10);
  const [currentIndex, setCurrentIndex] = useState(0);

  const itemsPerPage = 3;
  const maxIndex = Math.max(0, Math.ceil(smartphones.length / itemsPerPage) - 1);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => Math.min(prevIndex + 1, maxIndex));
  }, [maxIndex]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  }, []);

  if (loading) {
    return <LoadingSpinner size="large" className="py-12" />;
  }

  if (error) {
    return <ErrorMessage message={error} className="my-4" />;
  }

  if (smartphones.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        現在、スマートフォン情報はありません
      </div>
    );
  }

  const visibleSmartphones = smartphones.slice(
    currentIndex * itemsPerPage,
    (currentIndex + 1) * itemsPerPage
  );

  return (
    <div className="relative">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {visibleSmartphones.map((smartphone) => (
          <div
            key={smartphone.id}
            className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden"
          >
            <div className="aspect-square bg-gray-100 flex items-center justify-center p-4">
              <div className="text-6xl">📱</div>
            </div>
            <div className="p-4">
              <h3 className="text-lg font-bold text-gray-900 mb-1">
                {smartphone.name}
              </h3>
              <p className="text-sm text-gray-600 mb-3">
                {smartphone.manufacturer}
              </p>
              <p className="text-2xl font-bold text-blue-600 mb-4">
                ¥{smartphone.price.toLocaleString()}
              </p>
              <GradientButton
                href={`/smartphones/${smartphone.id}`}
                variant="primary"
                className="w-full text-center"
              >
                詳細を見る
              </GradientButton>
            </div>
          </div>
        ))}
      </div>

      {maxIndex > 0 && (
        <div className="flex justify-center items-center mt-8 space-x-4">
          <button
            onClick={prevSlide}
            disabled={currentIndex === 0}
            className="p-2 rounded-full bg-blue-600 text-white disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-blue-700 transition-colors"
            aria-label="前のページ"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          <span className="text-gray-600">
            {currentIndex + 1} / {maxIndex + 1}
          </span>

          <button
            onClick={nextSlide}
            disabled={currentIndex === maxIndex}
            className="p-2 rounded-full bg-blue-600 text-white disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-blue-700 transition-colors"
            aria-label="次のページ"
          >
            <svg
              className="w-6 h-6"
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
          </button>
        </div>
      )}
    </div>
  );
};
