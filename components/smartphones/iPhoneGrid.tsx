'use client';

import React, { useState } from 'react';
import { SmartphoneProduct } from '@/types/smartphone';
import { ProductCard } from './ProductCard';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { ErrorMessage } from '@/components/ui/ErrorMessage';

/**
 * iPhoneグリッド表示コンポーネント
 * iPhone製品をグリッドレイアウトで表示
 */
interface IPhoneGridProps {
  products: SmartphoneProduct[];
  loading?: boolean;
  error?: string;
  className?: string;
}

export const IPhoneGrid: React.FC<IPhoneGridProps> = ({
  products,
  loading = false,
  error,
  className = '',
}) => {
  const [sortBy, setSortBy] = useState<'name' | 'price'>('name');

  const sortedProducts = [...products].sort((a, b) => {
    if (sortBy === 'name') {
      return a.name.localeCompare(b.name);
    }
    const priceA = parseInt(a.price.replace(/[^0-9]/g, ''));
    const priceB = parseInt(b.price.replace(/[^0-9]/g, ''));
    return priceB - priceA;
  });

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <LoadingSpinner size="large" />
      </div>
    );
  }

  if (error) {
    return <ErrorMessage message={error} className="my-8" />;
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">製品が見つかりませんでした。</p>
      </div>
    );
  }

  return (
    <div className={className}>
      <div className="flex justify-between items-center mb-6">
        <p className="text-gray-600">
          {products.length}件の製品が見つかりました
        </p>
        <div className="flex items-center gap-2">
          <label htmlFor="sort" className="text-sm text-gray-600">
            並び替え:
          </label>
          <select
            id="sort"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as 'name' | 'price')}
            className="px-3 py-1.5 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="name">名前順</option>
            <option value="price">価格順</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {sortedProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};
