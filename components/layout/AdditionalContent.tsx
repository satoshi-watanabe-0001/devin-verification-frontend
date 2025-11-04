'use client';

import React from 'react';
import { SectionContainer } from '@/components/ui/SectionContainer';
import { SmartphoneCarousel } from '@/components/ui/SmartphoneCarousel';

/**
 * 追加コンテンツコンポーネント
 * スマートフォンカルーセルと6つのahamo特徴を表示
 */
export const AdditionalContent: React.FC = () => {
  const features = [
    {
      id: 1,
      icon: '💰',
      title: 'コスパ',
      description: '月額2,970円で20GB使える高コスパプラン',
    },
    {
      id: 2,
      icon: '📞',
      title: '通話',
      description: '5分以内の国内通話が無料',
    },
    {
      id: 3,
      icon: '⚡',
      title: '品質',
      description: 'ドコモの高品質ネットワーク',
    },
    {
      id: 4,
      icon: '🌍',
      title: '海外利用',
      description: '追加料金なしで海外82の国・地域でデータ通信可能',
    },
    {
      id: 5,
      icon: '💳',
      title: 'dカード特典',
      description: 'dカードGOLDなら+5GB、dカードなら+1GBボーナス',
    },
    {
      id: 6,
      icon: '💬',
      title: 'チャットサポート',
      description: '24時間365日、チャットでサポート対応',
    },
  ];

  return (
    <>
      <SectionContainer background="gray">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            人気のスマートフォン
          </h2>
          <p className="text-lg text-gray-600">
            ahamoで使えるおすすめ端末
          </p>
        </div>
        <SmartphoneCarousel />
      </SectionContainer>

      <SectionContainer background="white">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            ahamoの特徴
          </h2>
          <p className="text-lg text-gray-600">
            シンプルで使いやすい、充実のサービス
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {features.map((feature) => (
            <div
              key={feature.id}
              className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 p-6 border border-gray-100"
            >
              <div className="text-5xl mb-4 text-center">{feature.icon}</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3 text-center">
                {feature.title}
              </h3>
              <p className="text-gray-600 text-center leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </SectionContainer>
    </>
  );
};
