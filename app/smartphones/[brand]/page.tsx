import React from 'react';
import { notFound } from 'next/navigation';
import { Footer } from '@/components/layout/Footer';

/**
 * ブランド別スマートフォンページ
 * PBI-DP-001: iPhone、Android、docomo-certifiedブランドをサポート
 */

interface BrandConfig {
  title: string;
  description: string;
  backgroundColor: string;
  emoji: string;
}

const brandConfig: Record<string, BrandConfig> = {
  iphone: {
    title: 'iPhone',
    description: 'Apple製の高品質なスマートフォン。最新のiOSと優れたカメラ性能。',
    backgroundColor: 'bg-gradient-to-br from-gray-100 via-gray-50 to-blue-50',
    emoji: '📱',
  },
  android: {
    title: 'Android',
    description: 'さまざまなメーカーから選べるAndroidスマートフォン。',
    backgroundColor: 'bg-gradient-to-br from-green-100 via-blue-50 to-cyan-100',
    emoji: '🤖',
  },
  'docomo-certified': {
    title: 'ドコモ認定リユース品',
    description: '厳格な検査をクリアした高品質なリユーススマートフォン。30日以内無料交換可能。',
    backgroundColor: 'bg-gradient-to-br from-emerald-100 via-teal-50 to-cyan-100',
    emoji: '♻️',
  },
};

interface BrandPageProps {
  params: Promise<{
    brand: string;
  }>;
}

export default async function BrandPage({ params }: BrandPageProps) {
  const { brand } = await params;
  
  const config = brandConfig[brand];

  if (!config) {
    notFound();
  }

  return (
    <>
      <main className={`min-h-screen ${config.backgroundColor}`}>
        <div className="container mx-auto px-4 py-12">
          <div className="text-center mb-12">
            <div className="text-8xl mb-4">{config.emoji}</div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {config.title}
            </h1>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto">
              {config.description}
            </p>
          </div>

          <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-8">
            <p className="text-gray-600 text-center">
              製品一覧は準備中です。
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
