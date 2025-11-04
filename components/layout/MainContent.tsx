'use client';

import React from 'react';
import { SectionContainer } from '@/components/ui/SectionContainer';
import { GradientButton } from '@/components/ui/GradientButton';
import { CampaignCarousel } from '@/components/ui/CampaignCarousel';
import { usePlans } from '@/hooks/usePlans';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { ErrorMessage } from '@/components/ui/ErrorMessage';

/**
 * メインコンテンツコンポーネント
 * 料金プラン基本情報とキャンペーンカルーセルを表示
 */
export const MainContent: React.FC = () => {
  const { plans, loading, error } = usePlans();

  return (
    <>
      <SectionContainer background="gradient">
        <div className="mb-12">
          <CampaignCarousel />
        </div>
      </SectionContainer>

      <SectionContainer background="white">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            シンプルでわかりやすい料金プラン
          </h2>
          <p className="text-lg text-gray-600">
            あなたに合ったプランをお選びください
          </p>
        </div>

        {loading && <LoadingSpinner size="large" className="py-12" />}
        {error && <ErrorMessage message={error} className="my-4" />}

        {!loading && !error && plans.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {plans.map((plan) => (
              <div
                key={plan.id}
                className={`relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300 overflow-hidden ${
                  plan.isPopular ? 'border-4 border-blue-500' : 'border border-gray-200'
                }`}
              >
                {plan.isPopular && (
                  <div className="absolute top-0 right-0 bg-blue-500 text-white px-4 py-1 text-sm font-bold rounded-bl-lg">
                    人気
                  </div>
                )}

                <div className="p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    {plan.name}
                  </h3>

                  <div className="mb-6">
                    <div className="flex items-baseline">
                      <span className="text-5xl font-bold text-blue-600">
                        ¥{plan.price.toLocaleString()}
                      </span>
                      <span className="text-gray-600 ml-2">/月</span>
                    </div>
                    <p className="text-lg text-gray-600 mt-2">
                      {plan.dataCapacity}
                    </p>
                  </div>

                  <div className="mb-8">
                    <h4 className="font-semibold text-gray-900 mb-3">プラン内容</h4>
                    <ul className="space-y-2">
                      {plan.features.map((feature, index) => (
                        <li key={index} className="flex items-start">
                          <svg
                            className="w-5 h-5 text-blue-600 mr-2 flex-shrink-0 mt-0.5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                          <span className="text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="space-y-3">
                    <GradientButton
                      href={`/plan/${plan.id}`}
                      variant="primary"
                      className="w-full text-center"
                    >
                      詳細を見る
                    </GradientButton>
                    <GradientButton
                      href="/flow"
                      variant="secondary"
                      className="w-full text-center"
                    >
                      申し込む
                    </GradientButton>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading && !error && plans.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            現在、料金プラン情報はありません
          </div>
        )}
      </SectionContainer>
    </>
  );
};
