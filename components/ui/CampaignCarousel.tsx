'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useCampaigns } from '@/hooks/useCampaigns';
import { LoadingSpinner } from './LoadingSpinner';
import { ErrorMessage } from './ErrorMessage';

/**
 * キャンペーンカルーセルコンポーネント
 * 4秒ごとに自動再生
 */
export const CampaignCarousel: React.FC = () => {
  const { campaigns, loading, error } = useCampaigns(1, 10);
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = useCallback(() => {
    if (campaigns.length > 0) {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % campaigns.length);
    }
  }, [campaigns.length]);

  const prevSlide = useCallback(() => {
    if (campaigns.length > 0) {
      setCurrentIndex((prevIndex) => (prevIndex - 1 + campaigns.length) % campaigns.length);
    }
  }, [campaigns.length]);

  const goToSlide = useCallback((index: number) => {
    setCurrentIndex(index);
  }, []);

  useEffect(() => {
    if (campaigns.length > 0) {
      const interval = setInterval(nextSlide, 4000);
      return () => clearInterval(interval);
    }
  }, [campaigns.length, nextSlide]);

  if (loading) {
    return <LoadingSpinner size="large" className="py-12" />;
  }

  if (error) {
    return <ErrorMessage message={error} className="my-4" />;
  }

  if (campaigns.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        現在、キャンペーン情報はありません
      </div>
    );
  }

  const currentCampaign = campaigns[currentIndex];

  return (
    <div className="relative w-full">
      <div className="relative h-64 md:h-96 overflow-hidden rounded-lg bg-gradient-to-r from-blue-500 to-purple-600">
        <div className="absolute inset-0 flex items-center justify-center p-8 text-white">
          <div className="text-center max-w-3xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {currentCampaign.title}
            </h2>
            <p className="text-lg md:text-xl mb-6">
              {currentCampaign.description}
            </p>
            {currentCampaign.discountRate && (
              <div className="inline-block bg-white text-blue-600 px-6 py-2 rounded-full font-bold text-xl">
                {currentCampaign.discountRate}% OFF
              </div>
            )}
          </div>
        </div>
      </div>

      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg transition-all"
        aria-label="前のキャンペーン"
      >
        <svg
          className="w-6 h-6 text-gray-800"
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

      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg transition-all"
        aria-label="次のキャンペーン"
      >
        <svg
          className="w-6 h-6 text-gray-800"
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

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
        {campaigns.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              index === currentIndex
                ? 'bg-white w-8'
                : 'bg-white/50 hover:bg-white/75'
            }`}
            aria-label={`キャンペーン ${index + 1} に移動`}
          />
        ))}
      </div>
    </div>
  );
};
