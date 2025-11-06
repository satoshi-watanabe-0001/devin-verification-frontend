import React from 'react';

/**
 * キャンペーンバナーコンポーネント
 * ページ上部にキャンペーン情報を表示
 */
interface CampaignBannerProps {
  title: string;
  description?: string;
  className?: string;
}

export const CampaignBanner: React.FC<CampaignBannerProps> = ({
  title,
  description,
  className = '',
}) => {
  return (
    <div
      className={`bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-lg p-6 shadow-lg ${className}`}
    >
      <div className="flex items-center justify-center gap-3">
        <span className="text-3xl">🎉</span>
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-1">{title}</h2>
          {description && (
            <p className="text-sm opacity-90">{description}</p>
          )}
        </div>
        <span className="text-3xl">🎉</span>
      </div>
    </div>
  );
};
