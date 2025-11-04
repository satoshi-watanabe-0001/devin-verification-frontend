import React from 'react';
import Link from 'next/link';

/**
 * プロモーションバナーコンポーネント
 * トップページのヒーローセクション
 */
export const PromotionBanner: React.FC = () => {
  return (
    <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-purple-600 text-white">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 py-16 md:py-24">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            ahamoで、もっと自由に
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-blue-100">
            月額2,970円で20GB使える。シンプルでわかりやすい料金プラン
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/flow"
              className="w-full sm:w-auto px-8 py-4 bg-white text-blue-600 font-bold rounded-lg hover:bg-blue-50 transition-colors shadow-lg text-lg"
            >
              今すぐ申し込む
            </Link>
            <Link
              href="/plan"
              className="w-full sm:w-auto px-8 py-4 bg-transparent border-2 border-white text-white font-bold rounded-lg hover:bg-white/10 transition-colors text-lg"
            >
              料金プランを見る
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
