import { notFound } from 'next/navigation';
import { Footer } from '@/components/layout/Footer';
import { BrandPageClient } from '@/components/smartphones/BrandPageClient';
import { ContentApiService } from '@/services/api.service';
import { transformProductCardDtos } from '@/utils/dataTransforms';
import { SmartphoneProduct } from '@/types/smartphone';
import { mockiPhoneData } from '@/data/mockiPhoneData';

/**
 * ブランド別スマートフォンページ
 * PBI-DP-001: iPhone、Android、docomo-certifiedブランドをサポート
 * PBI-DP-002: iPhoneカテゴリページ閲覧機能 (DEVIN-7)
 * DEVIN-30: バックエンドAPI統合
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

  let initialProducts: SmartphoneProduct[] = [];

  if (brand === 'iphone') {
    try {
      const response = await ContentApiService.getCategoryProducts(brand);
      
      if (response.products && response.products.length > 0) {
        initialProducts = transformProductCardDtos(response.products);
      } else {
        initialProducts = mockiPhoneData;
      }
    } catch (err) {
      console.error('Error fetching products:', err);
      initialProducts = mockiPhoneData;
    }
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

          <BrandPageClient brand={brand} initialProducts={initialProducts} />
        </div>
      </main>
      <Footer />
    </>
  );
}
