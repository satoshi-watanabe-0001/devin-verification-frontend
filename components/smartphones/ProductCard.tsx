import React from 'react';
import Link from 'next/link';
import { SmartphoneProduct } from '@/types/smartphone';
import { ColorDots } from './ColorDots';
import { PriceDisplay } from './PriceDisplay';

/**
 * 製品カード表示コンポーネント
 * iPhone製品の情報を1枚のカードとして表示
 */
interface ProductCardProps {
  product: SmartphoneProduct;
  className?: string;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  className = '',
}) => {
  return (
    <div
      className={`bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden ${className}`}
    >
      {product.saleLabel && (
        <div className="bg-gradient-to-r from-red-500 to-orange-500 text-white text-sm font-bold px-3 py-1.5 text-center">
          {product.saleLabel}
        </div>
      )}
      
      <div className="relative aspect-square bg-gray-50 flex items-center justify-center p-6">
        <div className="w-full h-full flex items-center justify-center">
          <div className="text-6xl">📱</div>
        </div>
      </div>

      <div className="p-4 space-y-3">
        <div>
          <h3 className="text-lg font-bold text-gray-900 mb-1">
            {product.name}
          </h3>
          <p className="text-sm text-gray-600">{product.brand}</p>
        </div>

        <div className="flex items-center gap-2 text-sm text-gray-600">
          <span>容量:</span>
          <div className="flex gap-1.5">
            {product.storageOptions.map((storage, index) => (
              <span
                key={index}
                className="px-2 py-0.5 bg-gray-100 rounded text-xs"
              >
                {storage}
              </span>
            ))}
          </div>
        </div>

        <div>
          <p className="text-xs text-gray-500 mb-1.5">カラー:</p>
          <ColorDots colors={product.colorOptions} maxVisible={5} />
        </div>

        <PriceDisplay
          price={product.price}
          campaignPrice={product.campaignPrice}
          monthlyPrice={product.monthlyPrice}
        />

        <Link
          href={product.link}
          className="block w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white text-center py-2.5 rounded-md font-medium hover:from-blue-700 hover:to-blue-800 transition-all duration-300"
          target="_blank"
          rel="noopener noreferrer"
        >
          ドコモオンラインショップで購入
        </Link>
      </div>
    </div>
  );
};
