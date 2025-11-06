import React from 'react';

/**
 * 価格情報表示コンポーネント
 * 通常価格、キャンペーン価格、月額分割払い金額を表示
 */
interface PriceDisplayProps {
  price: string;
  campaignPrice?: string;
  monthlyPrice?: string;
  className?: string;
}

export const PriceDisplay: React.FC<PriceDisplayProps> = ({
  price,
  campaignPrice,
  monthlyPrice,
  className = '',
}) => {
  return (
    <div className={`space-y-1 ${className}`}>
      {campaignPrice ? (
        <>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-red-600">
              {campaignPrice}
            </span>
          </div>
          <div className="text-sm text-gray-500 line-through">{price}</div>
        </>
      ) : (
        <div className="text-2xl font-bold text-gray-900">{price}</div>
      )}
      {monthlyPrice && (
        <div className="text-sm text-gray-600">分割払い: {monthlyPrice}</div>
      )}
    </div>
  );
};
