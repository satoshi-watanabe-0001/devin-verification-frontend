'use client';

import React, { useEffect, useState } from 'react';
import { CampaignBanner } from '@/components/smartphones/CampaignBanner';
import { IPhoneGrid } from '@/components/smartphones/iPhoneGrid';
import { ContentApiService } from '@/services/api.service';
import { transformProductCardDtos } from '@/utils/dataTransforms';
import { SmartphoneProduct } from '@/types/smartphone';

interface BrandPageClientProps {
  brand: string;
  initialProducts: SmartphoneProduct[];
}

export const BrandPageClient: React.FC<BrandPageClientProps> = ({
  brand,
  initialProducts,
}) => {
  const [products, setProducts] = useState<SmartphoneProduct[]>(initialProducts);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (brand === 'iphone' && initialProducts.length === 0) {
      const fetchProducts = async () => {
        try {
          setLoading(true);
          setError(null);
          
          const response = await ContentApiService.getCategoryProducts(brand);
          
          if (response.products && response.products.length > 0) {
            const transformedProducts = transformProductCardDtos(response.products);
            setProducts(transformedProducts);
          }
        } catch (err) {
          console.error('Error fetching products:', err);
          setError('製品情報の取得に失敗しました。');
        } finally {
          setLoading(false);
        }
      };

      fetchProducts();
    }
  }, [brand, initialProducts.length]);

  if (brand !== 'iphone') {
    return (
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-8">
        <p className="text-gray-600 text-center">
          製品一覧は準備中です。
        </p>
      </div>
    );
  }

  return (
    <>
      <CampaignBanner
        title="iPhone特別キャンペーン実施中！"
        description="対象機種が最大15,000円引き"
        className="mb-8"
      />
      
      {error && (
        <div className="mb-4 p-4 bg-yellow-100 border border-yellow-400 text-yellow-700 rounded">
          {error}
        </div>
      )}
      
      {loading ? (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
        </div>
      ) : (
        <IPhoneGrid products={products} />
      )}
    </>
  );
};
