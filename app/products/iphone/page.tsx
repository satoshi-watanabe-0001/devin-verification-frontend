import { Footer } from '@/components/layout/Footer';
import { BrandPageClient } from '@/components/smartphones/BrandPageClient';
import { ContentApiService } from '@/services/api.service';
import { transformProductCardDtos } from '@/utils/dataTransforms';
import { SmartphoneProduct } from '@/types/smartphone';

export const dynamic = 'force-dynamic';

/**
 * iPhoneカテゴリページ
 * PBI-DP-002: iPhoneカテゴリページ閲覧機能 (EC-269)
 * 
 * iPhone製品をグリッド形式で表示し、以下の情報を含む:
 * - ストレージオプション
 * - カラーバリエーション
 * - 価格情報（通常価格、キャンペーン価格、月額料金）
 * - キャンペーン情報
 * - ドコモオンラインショップリンク
 */

export default async function IPhoneCategoryPage() {
  let initialProducts: SmartphoneProduct[] = [];
  let dataSource: 'msw' | 'backend' | 'error' = 'backend';

  try {
    const response = await ContentApiService.getCategoryProducts('iphone');
    initialProducts = transformProductCardDtos(response.products ?? []);
    
    const useMock = process.env.NEXT_PUBLIC_USE_MOCK === 'true';
    dataSource = useMock ? 'msw' : 'backend';
    
    console.log(`[DATA SOURCE] Using ${dataSource} (${initialProducts.length} products)`);
  } catch (err) {
    console.error('[DATA SOURCE] Error fetching products:', err);
    initialProducts = [];
    dataSource = 'error';
  }

  return (
    <>
      <main 
        className="min-h-screen bg-gradient-to-br from-gray-100 via-gray-50 to-blue-50" 
        data-source={dataSource} 
        data-use-mock={process.env.NEXT_PUBLIC_USE_MOCK}
      >
        <div className="container mx-auto px-4 py-12">
          <div className="text-center mb-12">
            <div className="text-8xl mb-4">📱</div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              iPhone
            </h1>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto">
              Apple製の高品質なスマートフォン。最新のiOSと優れたカメラ性能。
            </p>
          </div>

          <BrandPageClient brand="iphone" initialProducts={initialProducts} />
        </div>
      </main>
      <Footer />
    </>
  );
}
